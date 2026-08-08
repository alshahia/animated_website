// Smoke test: load each prototype in a headless browser, check for errors and that key elements render.
import { chromium } from 'playwright';

const cases = [
  {
    name: 'daisy-wild',
    url: 'http://localhost:8765/daisy-wild/',
    check: (page) => Promise.all([
      page.locator('h3').count().then(() => null).catch(() => null).then(() => null),
      page.evaluate(() => {
        const v = document.querySelector('video');
        const lime = document.querySelector('style')?.textContent?.includes('#bde84f');
        const btn = document.querySelector('.shop-btn');
        return { hasVideo: !!v, hasLime: lime, hasBtn: !!btn, title: document.title };
      }),
    ]),
  },
  {
    name: 'subscription-agency',
    url: 'http://localhost:8765/subscription-agency/',
    check: (page) => page.evaluate(() => {
      const logo = document.querySelector('.logo')?.textContent;
      const title = document.querySelector('.title')?.textContent?.trim();
      const leftLines = document.querySelectorAll('#leftLines .line').length;
      const rightLines = document.querySelectorAll('#rightLines .line').length;
      const ticker = document.querySelector('.ticker-track')?.textContent?.trim().slice(0, 60);
      const menuBtn = !!document.querySelector('.menu-btn');
      return { logo, title, leftLines, rightLines, ticker, menuBtn };
    }),
  },
  {
    name: 'impact-ventures',
    url: 'http://localhost:8765/impact-ventures/',
    check: (page) => page.evaluate(() => {
      const v = document.querySelector('video');
      const title = document.querySelector('.hero-title')?.textContent?.trim();
      const ham = !!document.querySelector('.hamburger');
      const seeBtn = document.querySelector('.btn-primary')?.textContent?.trim();
      return { hasVideo: !!v, title, ham, seeBtn };
    }),
  },
];

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext();
const page = await ctx.newPage();

const errors = {};
page.on('pageerror', e => { errors.pageError = e.message; });
page.on('requestfailed', r => { errors[r.url()] = r.failure()?.errorText; });

for (const c of cases) {
  errors[c.name] = [];
  page.removeAllListeners('pageerror');
  page.removeAllListeners('requestfailed');
  console.log(`\n=== ${c.name} ===`);
  await page.goto(c.url, { waitUntil: 'domcontentloaded', timeout: 15000 }).catch(e => console.log('NAV FAIL:', e.message));
  await page.waitForTimeout(800);
  const result = await c.check(page);
  console.log(JSON.stringify(result, null, 2));
}

await browser.close();
