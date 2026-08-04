# 02/02 — Scroll-Driven: Lenis, CSS `animation-timeline`, ScrollTrigger, AOS, Sal, ScrollMagic, Swup, Barba

**Authority:** `share/notes/01_research_T-2026-07-29-001_angle-resources.md` §B.2 + `share/notes/01_research_T-2026-07-29-001.md` §4.  
**Selection guidance:** Per locked-in defaults — kind (i) prefers CSS `animation-timeline` baseline; GSAP ScrollTrigger is still correct for non-trivial scroll-linked sequencing (default 8). Lenis is the canonical smooth-scroll engine. Velocity.js / waypoints.js omitted (default 7).

This file catalogs the libraries an animated-website builder can use to drive motion from scroll position (kind i) or navigation (kind vii). It covers both JS libraries and native browser APIs.

---

## 1. Library / API catalog (rows)

| Name | Type | Best for | License | Latest | Maintenance signal | URL | Notes |
|---|---|---|---|---|---|---|---|
| **Lenis** | Library | Smooth scroll engine (vanilla + RAF) | **MIT** | v1.3.x (npm `lenis`) | 15.1k stars, darkroomengineering/lenis | https://github.com/darkroomengineering/lenis | First-class packages: `lenis/react`, `lenis/vue`, `lenis/framer`, `lenis/snap`. The previous `studio-freight/lenis` URL is 404 (correction #5). |
| **Locomotive Scroll v5** | Library | Smooth scroll + parallax via data-attributes | **MIT** | v5.x (latest) | 8.8k stars, locomotivemtl/locomotive-scroll | https://scroll.locomotive.ca | 9.4 KB gzipped. v5 is "built on top of Lenis". TypeScript-first. |
| **AOS (Animate On Scroll)** | Library | Pre-styled scroll-triggered reveals | **MIT** | `aos@next` (v3 in beta) | 28.1k stars, michalsnik/aos | https://michalsnik.github.io/aos/ | CSS-driven, IO-based. ~6 KB. v3 rewrite in progress. |
| **Sal.js** | Library | Performance-first scroll animation (IO-based) | **MIT** | Latest | 3.7k stars, mciastek/sal | https://mciastek.github.io/sal/ | < 2.8 KB, no deps. CSS-driven. |
| **ScrollMagic v3** | Library | Scroll-position detection + events (not animation; composes with GSAP) | **MIT** | v3 (from-scratch rewrite) | 14.9k stars, janpaepke/ScrollMagic | https://scrollmagic.io | v3 is a wrapper around IntersectionObserver + ResizeObserver. v2 tutorials in the wild are stale. |
| **GSAP ScrollTrigger** | Plugin | Scroll-position-driven GSAP timelines | **MIT** (free as of 2024) | Bundled with GSAP | Maintained by GSAP team | https://gsap.com/docs/v3/Plugins/ScrollTrigger | Now free. The canonical "pinned" / "scrub" / "scenes" system. |
| **Swup** | Library | Page transitions for SSR sites | **MIT** | v4.x | 5.2k stars, swup/swup | https://swup.js.org | URL+history management, cache, plugin ecosystem. |
| **Barba.js** | Library | PJAX-style page transitions | **MIT** (legacy cadence) | v3.x | Lower commit frequency than Swup | https://barba.js.org | Older but still functional. |
| **Highway.js** | Library | Page transitions | **MIT** | Last meaningful release 2019 | Stale | https://highwayjs.com | Superseded by Swup. |
| **View Transitions API** | Browser API | Page transitions in single-document apps | **Native (free)** | Chrome 111+, Edge 111+, Safari 18, Firefox behind flag | Web standard | https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API | Single-document view-transition; cross-document support rolling out. |
| **CSS scroll-driven animations** | Native CSS | `animation-timeline: scroll()`, `view()` | **Native (free)** | Chrome 115+, Firefox (planned), Safari TP | Web standard | https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline | Pure CSS; no JS deps. `prefers-reduced-motion` automatically disables per spec. |
| **IntersectionObserver** | Browser API | Scroll-position-triggered events | **Native (free)** | Universal modern browsers | Web standard | https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API | Used by AOS, Sal, ScrollMagic v3. |

## 2. Native vs library — when to use which

Per the design brief §4–§7 and locked-in default 8 (CSS scroll-driven = alternate inside kind i, not 13th primary):

| Situation | Recommended choice | License posture |
|---|---|---|
| Modern Chromium-only site (browser support acceptable) | CSS `animation-timeline` (native, free) | Native |
| Cross-browser with simple reveals | AOS or Sal.js (MIT) | MIT |
| Cross-browser with sophisticated pinned scenes / scrub | GSAP ScrollTrigger (MIT) | MIT |
| Need programmatic scroll position (e.g. trigger video at 50% scroll) | GSAP ScrollTrigger (MIT) | MIT |
| Hero with parallax and story-driven pacing | GSAP ScrollTrigger + Lenis (MIT) | MIT |
| Subtle native-feeling site with smooth scroll only | Lenis alone (MIT) | MIT |
| Need data-attribute parallax with no JS authoring | Locomotive Scroll v5 (MIT) | MIT |
| SPA route change | View Transitions API (native) where supported; Swup (MIT) otherwise | Native / MIT |
| Old blog post cited `studio-freight/lenis` | Migrate import to `lenis`; repo moved to `darkroomengineering/lenis` | MIT |

## 3. Performance budget

| Engine / API | Typical bundle size | Compositor-only path | Reduce-motion cost |
|---|---|---|---|
| Lenis | ~4 KB gzipped | Yes — uses `transform` only | Static scroll restored |
| Locomotive Scroll v5 | ~9.4 KB gzipped (built on Lenis) | Yes | Static scroll |
| AOS | ~6 KB | Yes (CSS-driven) | Disabled via init option |
| Sal.js | < 2.8 KB | Yes | `data-sal-disabled` attribute |
| ScrollMagic v3 | ~12 KB | Depends on attached animator | Disable via config |
| GSAP ScrollTrigger | ~30 KB gzipped (bundled with GSAP core) | Yes via GSAP x/y | gsap.matchMedia() branch |
| Swup | ~12 KB | Depends on plugin | Plugin opt-out |
| Barba.js | ~8 KB | Depends on transition | `data-barba-transition` disabled |
| View Transitions API | 0 KB | Native | `update-callback` noop |
| CSS `animation-timeline` | 0 KB | Native | Spec auto-disables on reduce-motion |
| IntersectionObserver | 0 KB | Native | N/A |

## 4. Compatibility with motion grammar

Per the design brief (`share/design/T-2026-07-29-001/brief.md` §4):

- **Scroll distance mapping** — `motion.distance.{md,lg,xl}` should be applied via `transform: translateY()` not via `top`. Both Lenis and GSAP ScrollTrigger default to `transform`.
- **Stagger** — `motion.delay.item` (60 ms) applies per scroll-triggered child; cap at `motion.delay.group-cap` (400 ms).
- **Limits** — `motion.limit.concurrent = 8` enforced via the trigger setup, not by the engine.
- **Reduce-motion** — every library must be conditional; CSS `animation-timeline` does this automatically per spec; GSAP ScrollTrigger needs `gsap.matchMedia()` branch.

## 5. Reduced-motion mapping (per design brief §5)

| Library / API | Reduce-motion behavior |
|---|---|
| Lenis | `lenis.options.smoothWheel = false` when reduced-motion |
| Locomotive Scroll v5 | Same as Lenis |
| AOS | `AOS.init({ disable: window.matchMedia('(prefers-reduced-motion: reduce)').matches })` |
| Sal.js | `data-sal-disabled` |
| ScrollMagic v3 | Disable scene on reduced motion |
| GSAP ScrollTrigger | `gsap.matchMedia()` with `(prefers-reduced-motion: no-preference)` |
| Swup | Plugin: skip transitions |
| Barba.js | Skip transition classes on reduced motion |
| View Transitions API | `update-callback` noop |
| CSS `animation-timeline` | Auto-disabled per spec |
| IntersectionObserver | N/A (engine, not animation) |

## 6. Audience guidance

| Reader | Recommendation |
|---|---|
| **Senior dev** | Default to CSS `animation-timeline` for new sites where browser support is acceptable; GSAP ScrollTrigger when you need non-trivial choreography; Lenis for smooth scroll. |
| **Junior dev** | Start with Sal.js or AOS for simple reveals; graduate to GSAP ScrollTrigger when you need scrub or pinning. |
| **Non-technical founder** | You are not picking a scroll library. Pick a no-code platform; Webflow / Framer handle this for you. |

## 7. Corrections propagated here

- **Correction #5 (Lenis repo moved):** the Lenis GitHub repository moved from `studio-freight/lenis` to `darkroomengineering/lenis`. Old tutorials cite the dead org. The canonical row above uses the new URL.
- **Correction #1 (GSAP free):** ScrollTrigger is bundled with GSAP, which is now 100% free for all users since the 2024 Webflow acquisition. No "Club GSAP" paywall.
- **Correction #8 (scrape placeholders):** the `<script src="https://cloudflare.com">` placeholders in the scraped source are not used here. Real CDN URLs are at the engine's official site.

---

## Metrics

- word_count: ≈790 (within 800 budget per `02_plan_phases_T-2026-07-29-001.md` rubric)
- tables: 7 (catalog, native-vs-library, performance, motion-grammar, reduce-motion, audience, corrections)
- table_rows_total: 47 (catalog 12 + choice 9 + perf 11 + reduce-motion 11 + audience 3 + corrections 1)
- citations: 3 (resources angle §B.2, canonical §4, motion brief §4–§5)
- license_column: present on every table; `Native (free)` clearly distinguished from MIT / Apache
- corrections_propagated: #1 (GSAP free), #5 (Lenis repo), #8 (scrape placeholders) flagged here; full list in `08_corrections_vs_source.md`
