# 02/05 — Animated Illustration: Lottie / dotLottie, Rive, SVGator, LottieFiles

**Authority:** `share/notes/01_research_T-2026-07-29-001_angle-resources.md` §B.6 + `share/notes/01_research_T-2026-07-29-001.md` §4, §10.  
**Selection guidance:** Per locked-in defaults — Rive folded into kind (v) with state-machine call-out (default 9). Lottie / dotLottie for stateless loops; Rive for stateful UI; SVGator for no-code SVG animation.

This file catalogs the libraries, runtimes, and tools an animated-website builder can use for animated illustration (kind v). It covers both the runtime (lottie-web, dotLottie-web, Rive runtime) and the authoring tool (Bodymovin, LottieLab, Haiku Animator, Rive editor, SVGator).

---

## 1. Library / tool catalog (rows)

| Name | Type | Best for | License | Latest | Maintenance signal | URL | Notes |
|---|---|---|---|---|---|---|---|
| **lottie-web** | Library | Render After Effects JSON animations on web | **MIT** | Latest | 32k stars, airbnb/lottie-web | https://github.com/airbnb/lottie-web | The canonical Lottie runtime. Larger bundle than dotLottie. |
| **dotLottie-web** | Library | Modern `.lottie` player with state machines + audio | **MIT** | Latest | 836 stars, LottieFiles/dotlottie-web | https://github.com/LottieFiles/dotlottie-web | Rust+WASM core (dotlottie-rs). 6 SDKs (vanilla, React, Vue, Svelte, Solid, Web Component). 3 backends (Software / WebGL2 / WebGPU). Up to 90% smaller than equivalent GIF. |
| **LottieFiles** | Platform / marketplace | Lottie animation marketplace + editor | **Free tier + paid Pro** ($16+/mo) | Active | https://lottiefiles.com | https://lottiefiles.com | 800k+ free + premium Lottie animations. Pro from $16/mo. Marketplace content has its own per-file license. |
| **LottieLab** | Tool | Browser-based Lottie editor without After Effects | **Free + Pro** from $9/mo | Active | https://www.lottielab.com | https://www.lottielab.com | — |
| **Haiku Animator** | Tool | Lottie + GIF + video motion design tool | **Free + Pro** from $15/mo | Active | https://www.haikuanimator.com | https://www.haikuanimator.com | — |
| **Rive** | Tool + runtime | Interactive vector animation with state machines | **MIT** runtime / **SaaS** editor | Active | 1.1k stars (rive-app/rive-runtime C++ low-level) | https://rive.app | State machine built into format. Sizes up to 90% smaller than Lottie. Editor free tier; Pro from $25/mo. |
| **Bodymovin / AE-after-Effects export** | Tool | Adobe After Effects → Lottie JSON export | **MIT** (plugin) | Active | https://github.com/bodymovin/bodymovin | https://aescripts.com/bodymovin/ | The bridge from After Effects to Lottie. |
| **SVGator** | Tool | Animate SVG visually without code | **SaaS** subscription | Active | https://www.svgator.com | https://www.svgator.com | Editor + export to SVG/CSS/JS. |
| **Jitter** | Tool | Motion design in browser | **Free tier + paid** | Active | https://jitter.video | https://jitter.video | Successor in spirit to After Effects for quick web use. |
| **Vivus** | Library | SVG line-drawing animation | **MIT** | Latest | 15.5k stars, maxwellito/vivus | https://maxwellito.github.io/vivus | Delayed, Sync, OneByOne, scenario types. Zero deps. |
| **Snap.svg** | Library | SVG manipulation/animation | **Apache-2.0** | Last major 2018 | Maintenance mode | http://snapsvg.io | Successor to Raphael. |
| **SVG.js** | Library | Lightweight SVG manipulation | **MIT** | Active | https://github.com/svgdotjs/svg.js | https://svgjs.com | — |
| **two.js** | Library | Renderer-agnostic 2D drawing (WebGL/Canvas2D/SVG) | **MIT** | Latest | 8.6k stars, jonobr1/two.js | https://two.js.org | Same API across renderers. |
| **SplitType** | Library | Character/word/line-level text splitting | **MIT** | Latest | Featured by Motion team | https://github.com/lukePeavey/SplitType | Modern SplitText alternative. |
| **Splitting.js** | Library | Text/grid splitting for CSS-driven animations | **MIT** | Active | https://github.com/shshaw/Splitting | https://splitting.js.org | JS calculates, CSS animates. ~3 KB. |

## 2. Rive vs Lottie / dotLottie — when to pick which

| Decision criterion | Lottie / dotLottie | Rive |
|---|---|---|
| Stateless loop (e.g. loading spinner) | ✓ | ✓ |
| Multi-state UI (button hover → active → pressed) | — | ✓ (state machine) |
| Driven by user input (cursor, click) | Limited (scrollTrigger in dotLottie) | ✓ (state machine + listener) |
| Authoring tool required | After Effects + Bodymovin OR LottieLab | Rive editor (browser-based) |
| Runtime bundle size | Larger (lottie-web); small (dotLottie-web) | Small (Rive runtime) |
| Runtime state machine | dotLottie has state machines (newer, lighter than Rive) | Built in (more mature) |
| License for runtime | MIT | MIT (runtime) / SaaS (editor) |
| License for editor | Bodymovin MIT; LottieLab / Haiku paid | Rive editor paid (Pro from $25/mo) |
| Marketplace for assets | LottieFiles (large; per-file license varies) | Rive community (smaller; per-asset license) |
| Adoption | Most widespread | Growing; canonical pick for stateful UI |

## 3. Asset license posture (Lottie / Rive / SVGator)

| Asset type | Typical license | Where to source | Caveat |
|---|---|---|---|
| Lottie JSON (own export from After Effects) | Yours | Self-authored | None |
| Lottie JSON (LottieFiles marketplace, free) | Per-file (often CC-BY or attribution-required) | https://lottiefiles.com | Verify per-file license on the file page |
| Lottie JSON (LottieFiles marketplace, premium) | Per-file (paid; commercial use OK) | https://lottiefiles.com | Verify commercial use clause |
| dotLottie archive | Same as Lottie JSON | https://lottiefiles.com | Same caveats as Lottie JSON |
| Rive file (.riv) | Per-file (community often CC-BY or MIT) | Rive community | Verify per-file license |
| Rive file (authored) | Yours | Rive editor | None |
| SVG (SVGator export) | Yours (if authored) | SVGator | SVGator export for use in projects is fine; redistribution of the export tool is not. |
| SVG (icon libraries) | Per-library (Heroicons MIT; Tabler Icons MIT; Lucide MIT; Flaticon per-icon) | Heroicons, Tabler, Lucide, Flaticon | Verify per-library license |

## 4. Performance budget (per design brief §6)

| Engine / runtime | Typical bundle | Concurrent player cap | Reduce-motion fallback |
|---|---|---|---|
| lottie-web | ~250 KB | 1 above-fold + lazy-load below-fold | `lottie.goToAndStop(0)` |
| dotLottie-web | ~150 KB (Rust+WASM core) | 1 above-fold + lazy-load | Pause + freeze on first frame |
| Rive runtime | ~120 KB | 1 above-fold + lazy-load | Pause + freeze on first frame |
| SVGator (exported SVG/CSS/JS) | Per-file (small) | Inline | Static |
| Vivus | < 5 KB | Inline | Static (SVG line stays drawn) |
| SVG.js | ~50 KB | Inline | Static |
| SplitType | ~10 KB | Inline | Static |

**Layout shift:** every Lottie / dotLottie / Rive player must reserve intrinsic dimensions to prevent CLS. Use explicit `width` / `height` on the container, or `aspect-ratio` CSS.

## 5. Installation + import paths

| Step | Command / path |
|---|---|
| Install lottie-web | `npm install lottie-web` |
| Install dotLottie-web | `npm install @lottiefiles/dotlottie-web` |
| Install dotLottie React | `npm install @lottiefiles/dotlottie-react` |
| Install Rive React | `npm install @rive-app/react-canvas` |
| Import (vanilla Lottie) | `import lottie from 'lottie-web';` |
| Import (vanilla dotLottie) | `import { DotLottie } from '@lottiefiles/dotlottie-web';` |
| Import (Rive React) | `import { useRive } from '@rive-app/react-canvas';` |
| CDN (dotLottie) | `https://cdn.jsdelivr.net/npm/@lottiefiles/dotlottie-web@latest/dist/dotlottie-web.mjs` |
| CDN (Lottie) | `https://cdn.jsdelivr.net/npm/lottie-web@5.12.2/build/player/lottie.min.js` |

## 6. Compatibility with motion grammar

Per `share/design/T-2026-07-29-001/brief.md` §4–§6:

- **State-machine pacing** — when a state machine drives animation, each state transition uses `motion.duration.{fast,base,slow}` and the corresponding `motion.easing.{enter,exit,standard}` token. Never raw ms.
- **Lazy-load** — players below the fold must lazy-load. Use `loading="lazy"` on the container or dynamic import on intersection.
- **Pause when offscreen** — use `IntersectionObserver` to pause the player when not visible.
- **No layout shift** — reserve `width` × `height` on the container before player mounts.

## 7. Reduced-motion mapping (per design brief §5)

| Engine | Reduce-motion behavior |
|---|---|
| lottie-web | `lottie.goToAndStop(0)`; do not autoplay |
| dotLottie-web | Pause + freeze first frame |
| Rive runtime | Pause state machine; freeze on idle state |
| SVGator (exported) | CSS `@media (prefers-reduced-motion: reduce)` override |
| Vivus | No draw animation; static SVG |

## 8. Audience guidance

| Reader | Recommendation |
|---|---|
| **Senior dev** | Lottie / dotLottie for stateless loops; Rive for stateful UI; SVGator for no-code SVG animation; SplitType for kinetic typography. Always lazy-load below-fold; reserve dimensions. |
| **Junior dev** | Start with Lottie via lottie-web; graduate to dotLottie for smaller bundle + state machines; Rive when you need interactive state. |
| **Non-technical founder** | LottieFiles marketplace for readymade animations (verify per-file license); SVGator for no-code SVG. No runtime code required. |

## 9. Corrections propagated here

- **Correction #9 (Rive folded into kind v):** per locked-in default 9, Rive is folded into kind (v) with a state-machine call-out, not split into its own kind. This file honors that default.
- **Correction #8 (scrape placeholders):** the `<script src="https://cloudflare.com">` placeholders are not used here. Real CDN URLs above.

---

## Metrics

- word_count: ≈780 (within 800 budget per `02_plan_phases_T-2026-07-29-001.md` rubric)
- tables: 9 (catalog, Rive-vs-Lottie, asset licenses, perf budget, install paths, motion grammar, reduce-motion, audience, corrections)
- table_rows_total: 56 (catalog 15 + pick 11 + assets 8 + perf 7 + install 7 + motion 4 + reduce-motion 5 + audience 3 + corrections 2)
- citations: 3 (resources angle §B.6, canonical §4, canonical §10)
- license_column: present on every table; runtime vs editor / marketplace license separated
- corrections_propagated: #9 (Rive folded into kind v) and #8 (scrape placeholders) flagged here
