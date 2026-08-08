import { chromium } from 'playwright';
import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, 'prompts');
const MD_DIR = join(OUT, 'prompts');
const SUPABASE_BASE = 'https://xgdzyqfalbibzelpdpvr.supabase.co';
const SITE = 'https://motionsites.ai';

mkdirSync(MD_DIR, { recursive: true });

const sleep = ms => new Promise(r => setTimeout(r, ms));

// 1. Capture anon JWT from browser (it ships in the site's JS bundle).
async function captureAnonKey() {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  let key = null;
  page.on('request', req => {
    if (key) return;
    const u = req.url();
    if (u.startsWith(SUPABASE_BASE + '/')) {
      const k = req.headers().apikey;
      if (k && k.startsWith('eyJ')) key = k;
    }
  });
  await page.goto(SITE, { waitUntil: 'networkidle', timeout: 30000 });
  await sleep(1500);
  await browser.close();
  if (!key) throw new Error('Failed to capture anon key');
  return key;
}

// 2. List all prompts (paginated).
async function listPrompts(key) {
  const headers = { apikey: key, Authorization: `Bearer ${key}` };
  const all = [];
  let offset = 0;
  const pageSize = 1000;
  while (true) {
    const u = `${SUPABASE_BASE}/rest/v1/prompts?select=id,title,category,types,page_type,is_free,image_preview_url,created_at&order=created_at.desc&limit=${pageSize}&offset=${offset}`;
    const r = await fetch(u, { headers });
    if (!r.ok) throw new Error(`List ${r.status}: ${await r.text()}`);
    const batch = await r.json();
    all.push(...batch);
    if (batch.length < pageSize) break;
    offset += pageSize;
  }
  return all;
}

// 3. Fetch one prompt body.
async function fetchPrompt(key, id, retries = 2) {
  for (let i = 0; i <= retries; i++) {
    try {
      const r = await fetch(`${SUPABASE_BASE}/functions/v1/get-prompt`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', apikey: key, Authorization: `Bearer ${key}` },
        body: JSON.stringify({ prompt_id: id }),
      });
      if (r.ok) {
        const body = await r.json();
        if (body.prompt_text) return body.prompt_text;
      } else if (r.status === 404) {
        return null;
      }
    } catch (e) {
      if (i === retries) throw e;
    }
    await sleep(300 * (i + 1));
  }
  return null;
}

// 4. Concurrency pool.
async function pool(items, limit, fn) {
  const out = new Array(items.length);
  let i = 0;
  const workers = Array.from({ length: limit }, async () => {
    while (true) {
      const idx = i++;
      if (idx >= items.length) return;
      out[idx] = await fn(items[idx], idx);
    }
  });
  await Promise.all(workers);
  return out;
}

const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 80);

async function main() {
  console.log('>> Capturing anon key...');
  const key = await captureAnonKey();
  console.log('>> OK (key length', key.length, ')');

  console.log('>> Listing prompts...');
  const all = await listPrompts(key);
  const free = all.filter(p => p.is_free === true);
  console.log(`>> Total: ${all.length}, Free: ${free.length}`);

  console.log('>> Fetching prompt bodies (5 concurrent)...');
  const t0 = Date.now();
  const seen = new Set();
  const unique = free.filter(p => {
    const k = p.title?.toLowerCase().trim();
    if (!k || seen.has(k)) return false;
    seen.add(k);
    return true;
  });
  console.log(`>> After dedupe: ${unique.length}`);

  let done = 0, skipped = 0;
  const results = await pool(unique, 5, async (p) => {
    const text = await fetchPrompt(key, p.id);
    done++;
    if (done % 10 === 0) console.log(`   ${done}/${unique.length}`);
    if (!text) { skipped++; return { ...p, prompt_text: null }; }
    return { ...p, prompt_text: text };
  });

  const ok = results.filter(r => r.prompt_text);
  console.log(`>> Fetched: ${ok.length}, Skipped: ${skipped}, Elapsed: ${((Date.now() - t0) / 1000).toFixed(1)}s`);

  const enriched = ok.map(r => ({ ...r, fetched_at: new Date().toISOString() }));
  writeFileSync(join(OUT, 'all.json'), JSON.stringify(enriched, null, 2));

  // Markdown files
  const usedSlugs = new Set();
  for (const r of enriched) {
    let s = slug(r.title);
    while (!s || usedSlugs.has(s)) s = s + '-' + Math.random().toString(36).slice(2, 6);
    usedSlugs.add(s);
    const md = matter(r, s);
    writeFileSync(join(MD_DIR, s + '.md'), md);
  }

  // Index
  const index = ['# motionsites.ai — Free Prompts', '', `Total: ${enriched.length}`, '', '| Title | Category | Page Type | File |', '|---|---|---|---|',
    ...enriched.map(r => `| ${r.title} | ${r.category || ''} | ${r.page_type || ''} | [${slug(r.title)}.md](./prompts/${slug(r.title)}.md) |`)
  ].join('\n');
  writeFileSync(join(OUT, 'README.md'), index + '\n');

  console.log('>> Done. Output in', OUT);
}

function matter(r, s) {
  const fm = ['---',
    `id: ${r.id}`,
    `title: "${r.title.replace(/"/g, '\\"')}"`,
    `category: ${r.category || ''}`,
    `page_type: ${r.page_type || ''}`,
    `types: ${(r.types || []).join(', ')}`,
    `is_free: ${r.is_free}`,
    `fetched_at: ${r.fetched_at}`,
    '---', '', `# ${r.title}`, ''].join('\n');
  return fm + r.prompt_text + '\n';
}

main().catch(e => { console.error(e); process.exit(1); });
