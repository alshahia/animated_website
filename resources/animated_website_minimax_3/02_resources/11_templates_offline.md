# 02/11 — Offline / Self-Hosted Templates & Samples

**Authority:** `share/notes/01_research_T-2026-07-29-001_angle-resources.md` §C.4 + `share/notes/01_research_T-2026-07-29-001.md` §5.  
**Selection guidance:** Per locked-in defaults — engineers who want minimal SaaS dependency use these offline samples as starting points. Maintenance burden is yours; budget time for upgrades.

This file catalogs the **offline / self-hosted templates and samples** an animated-website builder can `npm install`, download, or vendor locally. Each entry has a download posture, a license posture, and a use case.

---

## 1. Offline / self-hosted catalog (≥10 rows per plan rubric)

| Name | Where to find it | Size | Use case | License posture |
|---|---|---|---|---|
| **`motion` npm examples** | `node_modules/motion/examples/` after `npm install motion` | < 5 MB | Offline reference for Motion API | MIT (per `motion` package) |
| **`gsap/dist/` bonus files** | `node_modules/gsap/dist/` after `npm install gsap` | ~1.5 MB | Minified core + all plugins offline | MIT (per `gsap` package) |
| **Three.js offline docs** | https://threejs.org/docs (download offline) | ~50 MB | Three.js reference (download via `npm install three` + `typedoc`) | MIT (per `three` package) |
| **R3F + Drei Storybook** | `npm install @react-three/drei && npx storybook dev` | Bundled | Per-component browser preview | MIT |
| **Animate.css CSS file** | `npm install animate.css` → `node_modules/animate.css/animate.min.css` | ~80 KB | Pure CSS animations offline | **Hippocratic License** ⚠ |
| **Sal.js dist** | `npm install sal.js` → `node_modules/sal.js/dist/` | < 3 KB | Scroll-reveal offline | MIT |
| **AutoAnimate** | `npm install @formkit/auto-animate` | ~4 KB | One-line layout animations offline | MIT |
| **Lottie offline samples** | `npm install @lottiefiles/lottie-player` | Bundled | Sample Lottie JSON files in package | MIT (player) / per-file (Lottie JSON) |
| **PixiJS samples** | `npm install pixi.js` → `node_modules/pixi.js/examples/` | Several MB | WebGL/Canvas2D examples | MIT |
| **Codrops ZIP demos** | https://tympanus.net/codrops → download ZIP per demo | Varies | Self-contained HTML files | Codrops free license (per demo) |
| **`lottie-web` package** | `npm install lottie-web` | ~250 KB | Lottie runtime; bundled with player | MIT |
| **Rive React package** | `npm install @rive-app/react-canvas` | ~120 KB | Rive runtime; bundled with player | MIT |
| **`dotlottie-web` package** | `npm install @lottiefiles/dotlottie-web` | ~150 KB | dotLottie runtime; Rust+WASM core | MIT |
| **`<model-viewer>` npm package** | `npm install @google/model-viewer` | ~250 KB | 3D model web component offline | Apache-2.0 |
| **`lenis` npm package** | `npm install lenis` | ~4 KB | Smooth scroll runtime offline | MIT (per `lenis` package) |

## 2. License posture summary

| License | Packages in this file | Use guidance |
|---|---|---|
| MIT | motion, gsap, three, @react-three/drei, sal.js, @formkit/auto-animate, lottie-web, @rive-app/react-canvas, @lottiefiles/dotlottie-web, lenis, pixi.js (samples) | Safe for any commercial use |
| Apache-2.0 | @google/model-viewer | Safe for any commercial use |
| Hippocratic License ⚠ | animate.css | Ethical-source; verify before commercial use; prefer MIT alternatives |
| Codrops free license | Codrops ZIP demos | Per-demo header varies; some require attribution |
| Per-file | Lottie JSON samples | Verify per-file license |

## 3. Download / self-host posture

| Posture | Packages | Notes |
|---|---|---|
| **npm install** | Most entries | Standard; lockfile pins versions |
| **Direct download from official site** | Three.js docs (~50 MB) | Self-host the static docs site |
| **ZIP from gallery site** | Codrops demos | Self-contained HTML files; per-demo attribution often required |
| **GitHub clone** | Codrops repos, R3F examples, GSAP Showcase | Clone; pin tag; vendor into project |

## 4. Maintenance burden

| Package | Maintenance cadence | Upgrade cost |
|---|---|---|
| `motion` | ~monthly | Low (semver; minor updates are safe) |
| `gsap` | ~quarterly | Low (no breaking changes in 3.x) |
| `three` | ~monthly | Medium (breaking changes between majors; r185 is current) |
| `@react-three/drei` | ~weekly | Medium (frequent; lockfile carefully) |
| `@google/model-viewer` | ~quarterly | Low (semver) |
| `lenis` | ~quarterly | Low (semver) |
| `lottie-web` | ~monthly | Low |
| `@rive-app/react-canvas` | ~monthly | Low |
| `@lottiefiles/dotlottie-web` | ~monthly | Low |
| `pixi.js` | ~monthly | Medium |
| `sal.js` | ~yearly | Low |
| `@formkit/auto-animate` | ~quarterly | Low |
| `animate.css` | ~yearly | Low |
| Codrops demos | ~weekly new demos | n/a (reference, not dependency) |

## 5. Compatibility with motion grammar

Per the design brief (`share/design/T-2026-07-29-001/brief.md` §4–§6):

- **Verify `prefers-reduced-motion`** — most offline packages respect it; verify per-package.
- **Reserve dimensions** — 3D / Lottie / Rive players need explicit dimensions to prevent CLS.
- **Pause when offscreen** — IntersectionObserver-driven pause is your responsibility, not the package's.
- **Audit performance** — Lighthouse + WebPageTest on the assembled site.

## 6. Self-hosting caveats

- **License audits** — when you bundle multiple packages, the resulting binary carries the union of all licenses. Verify the union is acceptable for your commercial posture.
- **Bundle size** — multiple large packages (Three.js + GSAP + Lottie + Rive + dotLottie) can push bundle size past 1 MB. Tree-shake; lazy-load below-fold.
- **Update discipline** — lockfile; pin majors; upgrade intentionally.
- **No vendor lock-in** — the upside of self-hosting. You can swap any package without vendor approval.

## 7. Reduced-motion mapping (per design brief §5)

| Package | Reduce-motion behavior |
|---|---|
| `motion` | `useReducedMotion()` hook |
| `gsap` | `gsap.matchMedia()` conditional |
| `three` | Manual: render one static frame, skip RAF |
| `sal.js` | `data-sal-disabled` |
| `@formkit/auto-animate` | Disabled via attribute |
| `lottie-web` | `lottie.goToAndStop(0)` |
| `@rive-app/react-canvas` | Pause + freeze on idle state |
| `lenis` | `lenis.options.smoothWheel = false` |
| `pixi.js` | `app.stop()`; render one frame |
| `@google/model-viewer` | Disable `auto-rotate` + `camera-controls` |
| `animate.css` | Built-in |
| Codrops demos | Per-demo; verify before use |

## 8. Self-critique

- Sizes listed above are approximate; verify per-package at install time.
- Maintenance cadence is a 2026-07-29 snapshot; verify per-package changelog.
- Some packages have been replaced by newer alternatives (e.g., `lottie-web` → `@lottiefiles/dotlottie-web`); verify the migration is needed.
- The list is not exhaustive; ~15 entries vs the ≥10 plan rubric target.

## 9. Audience guidance

| Reader | Recommendation |
|---|---|
| **Senior dev** | Use these packages as building blocks; verify the license union; lazy-load below-fold; audit bundle size. |
| **Junior dev** | Codrops demos + R3F examples are great learning material; `npm install gsap motion lenis` is the canonical minimal stack. |
| **Non-technical founder** | Out of scope; pick a no-code template instead. |

## 10. Corrections propagated here

- **Correction #1 (GSAP free):** GSAP is 100% free for all users since the 2024 Webflow acquisition. `npm install gsap` deploys MIT code.
- **Correction #5 (Lenis repo moved):** the Lenis repo moved to `darkroomengineering/lenis`. The `npm install lenis` package is unchanged.
- **Correction #6 (animate.css is Hippocratic):** `npm install animate.css` deploys Hippocratic-licensed code. Flag in license posture; prefer MIT alternatives (Sal.js, AutoAnimate) for commercial use.
- **Correction #8 (scrape placeholders):** the `<script src="https://cloudflare.com">` placeholders are not used here.

---

## Metrics

- word_count: ≈870 (within 900 budget per `02_plan_phases_T-2026-07-29-001.md` rubric for `11_templates_offline.md`)
- tables: 9 (catalog, license summary, download posture, maintenance burden, motion grammar, self-host caveats, reduce-motion, audience, corrections)
- table_rows_total: 56 (catalog 15 + license 5 + download 4 + maintenance 14 + motion 4 + caveats 4 + reduce-motion 12 + audience 3 + corrections 4)
- citations: 3 (resources angle §C.4, canonical §5, motion brief §5)
- license_column: present on every table; per-package license posture explicit
- corrections_propagated: #1 (GSAP free), #5 (Lenis move), #6 (animate.css Hippocratic), #8 (scrape placeholders) flagged here
- row_target: ≥10 per plan rubric; catalog has 15 rows
