# motionsites-scraper

Pulls free prompts from motionsites.ai. Clicks every "Copy prompt" button, captures the would-be clipboard write, dumps JSON + one Markdown file per prompt.

## Setup

```bash
cd utils/motionsites-scraper
npm install
npx playwright install chromium
```

## Run

```bash
npm run scrape
```

Output goes to `prompts/`:
- `all.json` — full array, one entry per prompt
- `README.md` — index of all captured prompts (table of title · category · page_type · file)
- `prompts/<slug>.md` — one Markdown file per prompt

Re-running is safe: existing titles in `all.json` are skipped, so it only captures new ones.

## What's in the captured corpus

- **134 generation prompts** (page_type `hero` / `landing`) — the motionsites.ai corpus that `kit/AGENT_SYSTEM_PROMPT.md` references.
- **2 critique prompts** (page_type `report`, category `Critique`) — hand-written, NOT scraped:
  - `prompts/criticism.md` (`id: criticism-comprehensive`) — full multi-dimensional audit (10 review dimensions, 9 mandatory output sections, severity rubric 🔴🟠🟡🔵⚪, license report). Use for deep review of an already-built site.
  - `prompts/criticism-quick.md` (`id: criticism-quick-scan`) — ≤15 min Ship / Fix / Block verdict. Use as a fast pre-flight gate.

Total: **136** prompts (`README.md` "Total: 136"). Do not modify the two critique prompts without a clear use case — they are the single source of truth for review output shape.

## How it works

The site has no API. Each card on `/`, `/sections`, `/apps` has one of two buttons:

- **Copy prompt** — free, calls `navigator.clipboard.writeText(prompt)`
- **Unlock prompt** — paywalled, ignored

We override `navigator.clipboard.writeText` via `addInitScript` and read the captured text after each click. Pages lazy-load cards on scroll, so we scrolldown in steps until the card count stops growing before sweeping.

## Routes scraped

| Route | What it covers |
|---|---|
| `/` | Featured/curated grid |
| `/sections` | Section blocks (hero, footer, CTA, etc.) |
| `/apps` | Full app-level designs |

Categories shown per card are read from the small label next to the title; often blank on the homepage.

## Limits

- Only free "Copy prompt" buttons. Premium cards are skipped.
- Title is the dedupe key. If two cards share a title across routes, the second is skipped.
- No retries on transient network errors — re-run the script.
