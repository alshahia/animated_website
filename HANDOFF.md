# HANDOFF — animated-website project

**Date:** 2026-08-05
**For:** a fresh agent (or the next session) resuming work with no prior conversation context
**Repo:** https://github.com/alshahia/animated_website

## What this repo is

The **animated-website generator**. Reads a brief, emits an ordered build plan (which of 12 "kinds" to mount + which starter + which token profile), scaffolds against `kit/dossier-agent-kit/dossier-agent-kit/starters/nextjs-gsap-lenis/`, then validates against `forbidden_patterns.json` + Playwright + Lighthouse.

`agents_manager/` is **vendored tooling** (orchestrator runtime), not the project. Think `node_modules/` to a Next.js app — it ships with this repo because the agent runs on it.

## Read these first (3 files, 5 minutes)

1. `README.md` — elevator pitch, 8-step workflow, what's in the box
2. `AGENTS.md` — operational rules, "two halves" framing
3. `kit/dossier-agent-kit/dossier-agent-kit/README.md` — 7-step agent workflow inside the kit

Then if relevant: `INDEX.md`, `kit/USAGE_GUIDE.md`, `FINAL_VISION.md`.

## Repo state at handoff (8 commits on master)

```
d64008d perf: defer gsap+Lenis via dynamic import + requestIdleCallback (Lighthouse TBT fix)  ← latest
7aa3394 kit: fix 8 Playwright test failures (real source fixes + better kind-vii mocks)
89601b4 docs: re-orient — animated-website project is the foreground, agents-manager is vendored
ef34de8 kit: defensively harden /cta (use client + error boundary), document browser smoke
51b93a5 lint: tighten block-scope heuristic via awk brace tracking (40 -> 20)
d3f34c2 kit: remove broken iPhone glTF, sync docs post-swap, motion ^11->^12, validators green
8bb819d kit: swap placeholders for real assets, add source media + LLM prompt spec
4bed1b8 initial: controller + animated-website project (kit/resources cleanup)
```

## What is DONE (do not redo)

- **Kit/resources cleanup** — removed shell-glob garbage folder, AR/kind-xi surface (4 files), empty `05_build_guides` duplicate
- **Tier 2/3 freshness re-verification** — `npm view` for every dep; 2 license patches (gsap: Standard No-Charge, ogl: Unlicense); 1 major bump deferred (p5 v1→v2); 1 done (motion v11→v12)
- **Sample validation** — `kit/SAMPLE_VALIDATION.md` covers all 6 site_types; 5 router gaps documented (non-blocking)
- **Asset swap** — poster.jpg 77 KB (from JPEG), product.glb 3.38 MB (Apple Watch glTF via `gltf-transform copy`), track.mp3 74 KB (24 kbps mono 16 kHz), onboarding.lottie 2.6 KB
- **Doc re-orientation** — animated-website framed as foreground, agents-manager as vendored (was inverted before commit `89601b4`)
- **/cta hardening** — `"use client"` directive + `app/cta/error.tsx` boundary after motion v12 + React 19 SSR glitch surfaced in prod
- **Lighthouse TBT fix** — dynamic import of gsap/ScrollTrigger/Lenis inside `initScroll()` + `registerReveal()`; `requestIdleCallback({timeout: 200})` wrap in `app/page.tsx`. Initial bundle for `/`: **64.3 kB → 15.2 kB** (76% smaller)
- **8 Playwright failures fixed** in commit `7aa3394` (see `kit/VERIFICATION.md` → "Browser smoke 2026-08-05" for the table)

## What is NOT done yet (resume here)

### Needs the human's machine to verify (sandbox blocks Chromium)

1. **Re-run Playwright** after commit `7aa3394` (fixes the 8 failures) and `d64008d` (TBT fix changes timing). Should be 144/144 pass. If anything fails, paste output.
   ```bash
   cd kit/dossier-agent-kit/dossier-agent-kit/starters/nextjs-gsap-lenis
   npm install
   npx playwright install chromium
   npm run test:e2e
   npm run lighthouse:ci
   ```

2. **Lighthouse CI on real network** — TBT target ≤ 200 ms; last run was 720/213/392 ms (FAIL). My fix (`d64008d`) should drop this significantly. Verify locally.

### Low-priority follow-ups

3. **`p5` ^1.11 → ^2 major bump** — last deferred Tier-3 follow-up. v2 changed instance-mode API (breaking). Needs Playwright on unblocked network to validate. Documented in `package.json` `freshness_verified_against_npm_registry.deferred_major_bumps`.
4. **Git tag** — no `v0.0.1` release tag yet. Would automate per `agents_manager/release.yml`.
5. **`resources/media/` is still ~50 MB** in git (11 MB Apple Watch OBJ + 4.7 MB glTF + 4 source MP3s at 3-5 MB each). No git-lfs. Future clones download the full size.
6. **5 documented router gaps** in `kit/SAMPLE_VALIDATION.md` — by design, not blocking. Includes: R5 portfolio coverage, R8 is_spa default for Next.js App Router, R6 illustration gate narrow, no `starters/nextjs-css-native/` (would close strict-perf editorial_longform gap), kind-xi opt-in (already correct).
7. **20 advisory `bin/lint-design.sh` violations** in `agents_manager/design/resources/mockup-templates/*.html` — false positives the heuristic doesn't catch (brand swatches, window chrome, annotation highlights). Documented in the script header. Does not fail CI.
8. **`scripts/validate-trace.sh` + `scripts/validate-memory.sh`** — never run locally (validate-trace: 0 trace files; validate-memory: 7 entries passed).

## How the kit is organized

```
kit/
├── README.md (from dossier-agent-kit/, the actual kit readme)
├── ASSETS_README.md (×2)              # placeholder inventory + swap notes
├── ASSET_SPECS.md                     # real-asset handoff (poster/product.glb/MP3/lottie specs + §5 LLM prompts)
├── CLEANUP_LIST.md                    # cleanup status table + do-not-use list
├── USAGE_GUIDE.md                     # 8-step workflow + what to use / not
├── VERIFICATION.md (×2)               # what was actually run + bugs caught
├── poster.jpg, poster.webp            # 77 KB / 31 KB (from JPEG source)
├── product.glb                        # 3.38 MB (Apple Watch glTF)
├── track.mp3                          # 74 KB (24 kbps mono)
├── icons/onboarding.lottie            # 2.6 KB
└── dossier-agent-kit/dossier-agent-kit/
    ├── README.md                      # 7-step agent workflow
    ├── freshness_protocol.md          # Tier 1/2/3 freshness rules
    ├── VERIFICATION.md
    ├── schemas/
    │   ├── router.json                # 12-rule decision tree (R1-R12)
    │   ├── kinds.json                 # 12-kind matrix (kind-i through kind-xii)
    │   ├── composition_matrix.json    # init order + 3 budget caps + 4 engine conflicts
    │   └── forbidden_patterns.json    # 10 cross-cutting + per-kind additions
    ├── starters/nextjs-gsap-lenis/    # full Next.js 15 + React 19 + GSAP + Lenis starter
    │   ├── app/                       # 8 routes: /, /cta, /product, /shader-demo, /audio-demo, /ai-hero-demo, /loading-demo
    │   ├── components/                # 12 components (kind-i through kind-xii)
    │   ├── lib/                       # scroll-setup.ts (dynamic imports), use-reduced-motion.ts
    │   ├── tests/                     # 14 Playwright spec files (3 projects × ~5-8 tests each)
    │   ├── public/                    # placeholder + real assets
    │   └── package.json               # all licenses documented + freshness_verified_against_npm_registry
    └── examples/golden-trace-saas-marketing/TRACE.md  # end-to-end worked example
```

## The 12 kinds (quick reference)

i. Scroll reveal (GSAP ScrollTrigger + Lenis — now dynamic-imported)
ii. 3D scene (Three.js r185+ / R3F / `<model-viewer>`)
iii. Shader (Three.js shaderMaterial / OGL / glslCanvas) — needs GLSL capacity
iv. Cursor tracking (GSAP quickTo / Motion useMotionValue) — desktop-only
v. Animated illustration (dotLottie-web MIT / Rive runtime MIT)
vi. Preloader (GSAP timeline on window.load) — only if real load > 1s
vii. Page transitions (View Transitions API / Swup)
viii. Microinteraction (CSS transition / Motion) — **always included** (R2)
ix. Generative art (p5.js LGPL / canvas-sketch MIT)
x. Audio-reactive (Tone.js / Web Audio)
xi. AR (`<model-viewer>`) — **manual opt-in only** (R11) — no starter demo since AR files removed
xii. AI live motion — **never auto-selected** (R12); reachable via `/ai-hero-demo` for demo/test only

## The 3 budget caps (forbidden to exceed)

- `motion.limit.full-viewport-scenes` = **1** (kinds ii, iii, ix, vi, xi compete for this slot)
- `motion.limit.ambient-loops` = **2** (kinds iii, ix, x, v compete for this)
- `motion.limit.concurrent` = **8** (simultaneous animated tracks in one viewport, all kinds)

## License posture (8 corrections, current as of 2026-08-04)

Tier-1 trust: 12-kind taxonomy, motion tokens, reduced-motion mapping, perf patterns, license CATEGORY defs.
Tier-2 re-verify per project: specific library license, SaaS pricing.
Tier-3 re-verify every time: package versions, CDN URLs, browser support %.

Last `npm view <pkg> version license peerDependencies` run: 2026-08-04. **gsap** is "Standard No-Charge License (Webflow-owned since 2024 — free for all uses including commercial; NOT standard SPDX MIT/Apache)" — not pure MIT. **ogl** is "Unlicense (public domain)" — equivalent to MIT permissive. See `kit/dossier-agent-kit/dossier-agent-kit/starters/nextjs-gsap-lenis/package.json` → `license_posture` + `freshness_verified_against_npm_registry`.

Watchlist (always flag these to the human before using in production):

- `@theatre/studio` is AGPL-3.0 (network copyleft) → use `@theatre/core` Apache-2.0 instead
- **Remotion** has GPL-3.0 + commercial threshold (1 FTE / EUR 1M revenue) — not free at scale
- Lottie marketplace content has per-file license terms
- Rive runtime = MIT, Rive editor = SaaS (separate)
- Spline runtime = MIT, Spline editor = SaaS (separate)
- Webflow / Framer / Wix / Squarespace / SVGator = SaaS subscription (not source ownership)

## Common commands

```bash
# Smoke (sandbox-safe, no browser needed)
cd kit/dossier-agent-kit/dossier-agent-kit/starters/nextjs-gsap-lenis
npm install
npx tsc --noEmit
npx next build        # 10 static routes expected

# Browser smoke (sandbox CANNOT run this — needs human's machine with network access)
npm run test:e2e      # 144 tests, 3 projects (chromium / chromium-reduced-motion / mobile-chrome-touch)
npm run lighthouse:ci # TBT target ≤ 200 ms

# Kit freshness (run from repo root, not the starter)
python3 scripts/validate-frontmatter.py agents_manager/*/SKILL.md   # 12 SKILL.md files
bash bin/lint-design.sh agents_manager/design/resources/mockup-templates/  # advisory only
```

## Gotchas that will trip up a fresh agent

1. **PowerShell `-m` chaining** — multi-line `git commit -m 'a' -m 'b'` gets split into separate commands. Use a temp msg file via `git commit -F <file>` instead.
2. **PowerShell wraps git stderr as RemoteException** — the push succeeds, the warning is cosmetic. Check `git log --oneline -1 origin/master` to verify.
3. **`/usr/bin/sh` is not on PATH by default** on Windows. Use `& "C:\Program Files\Git\bin\bash.exe"` explicitly.
4. **`python3` is the Microsoft Store alias** — real Python is at `C:\Python313\python.exe`.
5. **asset files in `resources/media/` use Windows-reserved chars** in filenames (`?`, `(1)`). PowerShell `Copy-Item` and Python `open()` choke on these. Use `shutil.copy` from Python.
6. **`<model-viewer>` AR path is removed** — `kind-xi` is now manual-opt-in only via R11 (was the same for kind-xii). If a brief explicitly requests AR Quick Look, scaffold manually + ship USDZ from a real Apple pipeline (no open-source writer).
7. **The /cta route is the only one with `"use client"`** — motion v12 + React 19 SSR-prerender glitches. Other 6 demo routes are server components.
8. **git's autocrlf=true** on Windows will re-normalize line endings in some binary-ish files (e.g. `.obj`). If `git status` shows phantom modifications after `git checkout --`, it's noise.
9. **`/test-results/`, `/playwright-report/`, etc. with leading slash** are root-only in gitignore. Always check `git check-ignore -v <path>` before assuming.
10. **Browsermcp click actions time out** on CDP WebSocket in this sandbox; navigate + snapshot + screenshot + get_console_logs work. For page interactions, use Playwright on a real network.

## Files NOT to edit

- `agents_manager/<role>/SKILL.md` — vendored upstream territory. Edits here break the vendored controller's contract.
- `resources/animated_website_minimax_2.7/` — pre-correction research, kept for historical reference only. Do not use as canonical.
- `kit/dossier-agent-kit/dossier-agent-kit/starters/nextjs-gsap-lenis/public/ASSETS_README.md` — duplicate of root `kit/ASSETS_README.md`. Edit root, mirror if needed.

## Next session checklist

When the human returns:
1. Confirm they re-ran Playwright after `d64008d` (expect 144/144 pass).
2. If anything failed, fix + commit + push.
3. If 144/144 pass, the project's `master` is **release-ready**. Tag v0.0.1 next.
4. Then: p5 major bump, or accept the deferred Tier-3 follow-up and move on.
</content>
</invoke>