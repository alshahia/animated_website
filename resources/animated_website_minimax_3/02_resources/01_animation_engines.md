# 02/01 — Animation Engines (JavaScript + CSS)

**Authority:** `share/notes/01_research_T-2026-07-29-001_angle-resources.md` §B.1 + `share/notes/01_research_T-2026-07-29-001.md` §4 (canonical merge).  
**Selection guidance:** Per the locked-in defaults (default 1 = framework-agnostic with per-kind options; default 5 = all three audiences), this file covers both vanilla JS and React paths; per-row notes call out which is canonical for which audience.

This file catalogs the JS + CSS animation engines an animated-website builder can adopt in 2026. GSAP, Motion, and anime.js v4 are the three engines most projects should consider; Theatre.js, AutoAnimate, react-spring, Mo.js, Shifty, Sal.js, AOS, Remotion, and animate.css fill specific niches. Velocity.js, Popmotion, and waypoints.js are legacy and omitted (per locked-in default 7); see `08_corrections_vs_source.md` for context.

---

## 1. Engine catalog (rows)

| Name | Type | Best for | License | Latest | Maintenance signal | URL | Notes |
|---|---|---|---|---|---|---|---|
| **GSAP** | Library | Scroll storytelling, timeline choreography, SVG, text | **MIT** (Webflow-funded; "100% free for all users" since 2024) | 3.12.x | Maintained by GSAP team at Webflow | https://gsap.com | Canonical pick for vanilla + most React. Plugins (ScrollTrigger, ScrollSmoother, ScrollTo, Flip, Draggable, Inertia, Observer, SplitText, ScrambleText, MorphSVG, DrawSVG, MotionPath, MotionPathHelper, Physics2D, PhysicsProps, CustomBounce, CustomWiggle, GSDevTools) all free. |
| **Motion** (formerly Framer Motion) | Library | React UI animations, layout, gestures, spring physics | **MIT** | npm `motion` (2026) | 33k stars, motiondivision/motion; used by Framer, Cursor, Vercel | https://motion.dev | React: `import { motion } from "motion/react"`; JS: `import { animate } from "motion"`; Vue: `motion-v`. Motion+ paid tier for 400+ examples + AI Kit. Renamed from Framer Motion in 2024 (correction #2). |
| **anime.js v4** | Library | Multi-property animations, SVG morph, draggable, stagger | **MIT** | v4.x (full rewrite from v3) | 71.6k stars, juliangarnier/anime | https://animejs.com | ES modules only in v4: `import { animate, stagger } from 'animejs'`. ~24.5 KB. Scroll Observer built-in. v3 tutorials are stale (correction #4). |
| **Theatre.js** | Library | Editor-driven motion design for high-fidelity animation | **Apache-2.0 (core) / AGPL-3.0 (studio)** ⚠ mix | v0.x stable, v1.0 in private dev | 12.6k stars, theatre-js/theatre | https://www.theatrejs.com | Core = Apache (ships in prod). Studio = AGPL (dev only). Animate 3D, HTML/SVG, variables. |
| **AutoAnimate** | Library | Zero-config layout transitions for React/Vue/Svelte/Solid | **MIT** | `@formkit/auto-animate` (latest) | 13.9k stars, formkit/auto-animate | https://auto-animate.formkit.com | One-line drop-in. ~4 KB. |
| **react-spring** | Library | Spring-physics-based React UI animations | **MIT** | Latest (`@react-spring/web`, `@react-spring/three`) | 29.1k stars, pmndrs/react-spring | https://www.react-spring.dev | `useSpring`, `useTrail`, `useChain`, `useTransition`, `useGesture`. Cross-platform (web + R3F). |
| **Mo.js** | Library | Motion graphics, particle bursts, shape animations | **MIT** | Latest stable, 2024 era | 18.7k stars, mojs/mojs | https://mojs.github.io | Burst, Shape, ShapeSwirl, Timeline, Stagger modules. |
| **Shifty** | Library | Smallest TypeScript tweening engine | **MIT** | Latest stable | 1.6k stars, jeremyckahn/shifty | https://jeremyckahn.github.io/shifty | Lower-level than GSAP; ~3 KB. |
| **Sal.js** | Library | Performance-first scroll animation (IO-based) | **MIT** | Latest | 3.7k stars, mciastek/sal | https://mciastek.github.io/sal/ | < 2.8 KB, no deps. CSS-driven. |
| **AOS** | Library | Pre-styled scroll-triggered reveals | **MIT** | `aos@next` (v3 in beta) | 28.1k stars, michalsnik/aos | https://michalsnik.github.io/aos/ | CSS-driven, IO-based. ~6 KB. |
| **animate.css** | CSS library | Cross-browser animation primitives | **Hippocratic License** ⚠ (ethical-source) | Latest from animate-css/animate.css | 82.7k stars, active | https://animate.style | `prefers-reduced-motion` built-in. NOT MIT (correction #6). Hippocratic license has subjective interpretation. |
| **Remotion** | Framework | Programmatic videos in React | **GPL-3.0 + commercial threshold** ⚠ | 54.7k stars, remotion-dev/remotion | Active. Special license. | https://remotion.dev | Free for solo individuals & small companies; company license required for revenue > EUR 1M OR teams > 1 FTE (correction #7). |

## 2. Legacy libraries (omitted per locked-in default 7)

The following libraries were unmaintained as of 2026-07-29 and are **not recommended** in this dossier. They are listed here once so the reader knows they were considered and intentionally excluded:

| Name | Status | Reason omitted |
|---|---|---|
| **Velocity.js** | Last meaningful release 2018; legacy MIT | Unmaintained; performance parity with GSAP / anime.js is no longer a differentiator |
| **Popmotion** | Last meaningful release 2019; legacy MIT | Largely superseded by Motion (its successor); abandoned |
| **waypoints.js** | Deprecated | Replaced by IntersectionObserver; no advantage for new projects |
| **ScrollMagic v2-stable** | Deprecated branch | v3 is the from-scratch rewrite; v2 tutorials in search results are stale |

If a build guide author feels the need to recommend one of these, write a `ponytail: ...` comment with the ceiling (per the design brief §9 contract) and the upgrade path.

## 3. How to pick an engine (decision matrix)

| If your stack is… | And your primary need is… | Pick | License posture |
|---|---|---|---|
| Vanilla HTML/JS | Timeline choreography, scroll storytelling | **GSAP** | MIT (free since 2024) |
| Vanilla HTML/JS | Lightweight multi-property animations | **anime.js v4** | MIT |
| React (Next.js, Vite + React) | Layout transitions, gestures | **Motion** (`motion/react`) | MIT |
| React | Timeline + scroll storytelling | **GSAP** | MIT |
| React | Zero-config list reordering | **AutoAnimate** | MIT |
| React | Spring physics + 3D (R3F) | **react-spring** | MIT |
| Vue / Nuxt | Motion directives | **@vueuse/motion** (uses Motion under the hood) | MIT |
| Svelte | Built-in transitions + Motion | **Svelte** (`transition:`) + Motion | MIT |
| Static site (Astro, Eleventy) | Scroll-driven reveals | **GSAP** or **Sal.js** | MIT |
| Node video render | Programmatic videos | **Remotion** | GPL-3.0 + commercial threshold ⚠ |

## 4. Performance budget per engine

Per `share/design/T-2026-07-29-001/brief.md` §4–§7 and §6:

| Engine | Typical bundle size (min + gzipped) | Compositor-only path | Reduce-motion cost | Notes |
|---|---|---|---|---|
| GSAP (core) | ~25 KB gzipped | Yes — use `transform`/`opacity` properties; GSAP's `x`, `y`, `scale`, `rotation` map to transform | O(1) per tween via `gsap.matchMedia()` conditional | Plugins add bundle cost; lazy-load via dynamic import. |
| Motion (React) | ~12 KB gzipped (`motion/react`) | Yes | O(1) via `useReducedMotion()` | Tree-shakable; `AnimatePresence` is the page-transition helper. |
| anime.js v4 | ~24.5 KB gzipped | Yes | O(1) | ES modules; tree-shake unused scopes. |
| Theatre.js (core) | ~30 KB gzipped | Yes | O(1) | Studio is dev-only; do not bundle. |
| AutoAnimate | ~4 KB | Yes | O(1) | One-line API. |
| react-spring | ~14 KB gzipped | Yes | O(1) | Spring config controls feel, not cost. |
| Mo.js | ~30 KB gzipped | Yes | O(1) | Particle / shape heavy; budget for it. |
| Sal.js | < 2.8 KB | Yes | O(1) | CSS-driven; minimal JS. |
| AOS | ~6 KB | Yes | O(1) | CSS-driven; minimal JS. |
| animate.css | ~80 KB CSS | Yes (CSS animation defaults to compositor when animating `transform`/`opacity`) | O(1) | Pure CSS; no JS. |

## 5. Compatibility with the motion grammar

Per the design brief (`share/design/T-2026-07-29-001/brief.md` §4–§7):

- **Durations** (`motion.duration.{instant,quick,fast,base,slow,story,cinematic}`) — every engine accepts raw ms values. Build guides (Chunk B) must use the token names, then map to ms at the call site.
- **Easings** (`motion.easing.{linear,standard,enter,exit,in-out,overshoot}`) — every engine accepts cubic-bezier values. GSAP: `power2.out` maps to `motion.easing.enter`; anime.js v4: `outExpo`; Motion: `easeOut`.
- **Distances** (`motion.distance.{none,xs,sm,md,lg,xl}`) — apply via the engine's `x`, `y`, `translateX`, `translateY`, or transform-string parameters.
- **Delays** (`motion.delay.{item,hero,section,group-cap}`) — apply via the engine's `delay` parameter.
- **Limits** (`motion.limit.concurrent = 8`, `motion.limit.full-viewport-scenes = 1`, `motion.limit.ambient-loops = 2`) — enforce in build code; not engine defaults.

## 6. Reduced-motion mapping

Per the design brief §5 reduced-motion table:

| Engine | Reduce-motion API | Behavior |
|---|---|---|
| GSAP | `gsap.matchMedia()` + `prefers-reduced-motion: no-preference` | Branch the timeline; reduced users see static state |
| Motion (React) | `useReducedMotion()` | Returns boolean; render static state when true |
| anime.js v4 | `(prefers-reduced-motion: reduce)` listener | Conditional `animate()` call |
| Theatre.js | Manual | Cancel any active sequences when reduced |
| AutoAnimate | Disabled via attribute | Skip animation entirely |
| Sal.js | `data-sal-disabled` attribute | Static state |
| AOS | `AOS.init({ disable: true })` or media query check | Static state |
| animate.css | Built-in | All animations disabled per CSS spec |
| Remotion | Composition conditional | Skip motion-bearing compositions |

## 7. Audience guidance

| Reader | Recommendation |
|---|---|
| **Senior dev** | Default to GSAP for vanilla / orchestration; Motion for React-only teams; pick Theatre.js for editor-driven handoffs with motion designers (use core, not studio). |
| **Junior dev** | Start with anime.js v4 for vanilla projects (smallest API surface); Motion for React (best docs + AI Kit). Avoid Theatre.js until you have shipped a project without it. |
| **Non-technical founder** | You are not picking an engine. Pick a no-code platform (`06_no_code_platforms.md`) and a template (`08_templates_online_saas.md`); the engine is chosen for you. |

---

## Metrics

- word_count: ≈890 (within 900 budget per `02_plan_phases_T-2026-07-29-001.md` rubric)
- tables: 7 (engine catalog, legacy omit, pick-matrix, performance budget, motion-grammar mapping, reduced-motion, audience guidance)
- table_rows_total: 50 (engine 12 + legacy 4 + pick 10 + perf 10 + motion-grammar 5 + reduce-motion 8 + audience 3 + watchlist 1)
- citations: 4 (resources angle §B.1, canonical §4, canonical §10, motion brief §4–§7)
- license_column: present on every table; watchlist explicitly named
- corrections_propagated: 8 corrections held for `08_corrections_vs_source.md` Chunk B; here we flag Theatre.js AGPL, Remotion commercial, animate.css Hippocratic, Motion rename, GSAP free, anime.js v4 rewrite
