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
- `prompts.json` — full array, one entry per prompt
- `<slug>.md` — one Markdown file per prompt

Re-running is safe: existing titles in `prompts.json` are skipped, so it only captures new ones.

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
