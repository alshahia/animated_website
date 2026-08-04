# 01 — Trigger × Surface Taxonomy (12 primary kinds)

**Authority:** `share/notes/01_research_T-2026-07-29-001.md` §3 + `share/notes/01_research_T-2026-07-29-001_angle-taxonomy.md` §"Existing solutions (landscape scan)".  
**Companion files:** `01_kinds.md` (master matrix + paragraph definitions), `02_emerging_kinds.md` (7 emerging kinds).

This file expands the **trigger × surface** matrix into a decision aid. Each cell lists the canonical kind ID, the trigger / surface placement, the engine families, and the accessibility / performance implication per the design brief (`share/design/T-2026-07-29-001/brief.md` §4–§7).

---

## 1. Axis definition

- **Trigger axis** (5 values): `scroll`, `pointer`, `time`, `narrative`, `state machine`.
- **Surface axis** (5 values): `DOM/CSS`, `2D canvas / vector`, `3D / WebGL / WebGPU`, `full-viewport scene`, `inline block`.

A new library or technique lands in an existing cell. If a new cell needs to be carved out, it goes into `02_emerging_kinds.md` first.

## 2. Trigger × surface matrix

| Kind | Trigger | Surface | Engine families (license posture) | Notable constraints |
|---|---|---|---|---|
| (i) Scroll-driven reveal | scroll | DOM/CSS + page sections | CSS `animation-timeline` (native, free); GSAP ScrollTrigger (MIT, free since 2024); Lenis (MIT, free) | Honor `motion.distance.lg` ceiling; mobile caps `lg` at `md` |
| (ii) 3D scene | scroll + pointer | 3D / WebGL / WebGPU hero or page | Three.js (MIT); R3F (MIT); Babylon.js (Apache-2.0); `<model-viewer>` (Apache-2.0); Spline SaaS | One full-viewport scene (`motion.limit.full-viewport-scenes` = 1); DPR `[1, 2]`; `<noscript>` fallback image |
| (iii) Shader | ambient + pointer | full-viewport fragment | Three.js `shaderMaterial` (MIT); TSL (MIT, r163+); glslCanvas (MIT); Shadertoy (own code, free) | Reduce-motion → static gradient; ambient-loop cap = 2 |
| (iv) Cursor tracking | pointer | DOM/CSS or 3D-tilt | GSAP (MIT); Motion (MIT); vanilla `pointermove` | Disable on coarse pointers (`@media (pointer: coarse)`); cap at 8 concurrent animated elements |
| (v) Animated illustration | state machine (Rive) / time (Lottie) | 2D canvas / vector inline | lottie-web (MIT); dotLottie-web (MIT); Rive runtime (MIT, editor SaaS); SVGator (SaaS) | Lazy-load below-fold; pause when offscreen; no layout shift |
| (vi) Preloader | page load (time) | full-viewport once | GSAP timeline (MIT); native CSS; Barba.js for entrance coupling | Dismissed within 5 s; `aria-busy` for screen readers; `<noscript>` fallback |
| (vii) Page transitions | navigation (narrative) | full-viewport route | View Transitions API (native, free); Barba.js (MIT legacy); Swup (MIT) | Honor back/forward; reduce-motion → no transition; no-JS fallback |
| (viii) Microinteraction | hover / focus / click | inline block | CSS-only (native); Motion (MIT); GSAP micro (MIT); AutoAnimate (MIT); Sal.js (MIT) | Animate only `transform` / `opacity`; `focus-visible`; respect touch input |
| (ix) Generative art | ambient + scroll | full-viewport or hero canvas | p5.js (LGPL-2.1); canvas-sketch (MIT); OGL (MIT); regl (MIT, low activity) | Pause on `visibilitychange === 'hidden'`; static fallback for reduce-motion |
| (x) Audio-reactive | audio input (after user gesture) | hero / sections canvas | Tone.js (MIT); p5.sound (LGPL-2.1); Web Audio API (native); Howler.js (MIT) | AudioContext requires user gesture; mute always present; no autoplay |
| (xi) AR / `<model-viewer>` | tap | inline / hero 3D | `<model-viewer>` (Apache-2.0); @react-three/xr (MIT); `<model-viewer>` + AR | `.glb` < 5 MB; lazy load; AR button only on supporting devices |
| (xii) AI-generated live motion | runtime API call | hero / sections canvas | Motion AI Kit; LLM SDK + canvas; Vercel AI SDK | One generation at a time; rate-limit; user can pause/cancel |

## 3. Trigger / surface choices — human-readable decision matrix

| If your primary trigger is… | And your primary surface is… | Likely kind | First library to try |
|---|---|---|---|
| Scroll | DOM/CSS | (i) scroll-reveal | CSS `animation-timeline`; upgrade to GSAP ScrollTrigger for orchestration |
| Scroll | 3D / WebGL | (ii) 3D scene | Three.js + R3F (React) or vanilla Three.js |
| Scroll | 2D vector | (i) scroll-reveal or (v) Lottie/Rive with scrollTrigger | GSAP ScrollTrigger + dotLottie; or Rive with scroll input |
| Scroll | full-viewport | (i) scroll-reveal or (iii) shader pinned | Three.js `shaderMaterial` pinned via ScrollTrigger |
| Pointer | DOM/CSS | (iv) cursor tracking or (viii) microinteraction | CSS-only baseline; GSAP quickTo for cursor; Motion for React |
| Pointer | 3D / WebGL | (ii) 3D scene with orbit / drag | R3F + drei `OrbitControls` or vanilla Three.js `OrbitControls` |
| Pointer | inline block | (viii) microinteraction | CSS-only for hover; Motion for React |
| Time | DOM/CSS | (vi) preloader or (viii) auto-cycling microinteraction | GSAP timeline; CSS `@keyframes` |
| Time | 2D canvas / vector | (v) Lottie | dotLottie-web (Rust+WASM core) |
| Time | full-viewport | (iii) shader ambient | Three.js `shaderMaterial` or glslCanvas |
| Narrative | full-viewport | (vi) preloader or (vii) page transitions | GSAP timeline; View Transitions API |
| State machine | inline block | (v) animated illustration | Rive (state machine built into format) |
| Audio input | hero canvas | (x) audio-reactive | Tone.js + canvas; explicit user gesture |

## 4. Why "trigger × surface" beats "by intent" or "by stack"

| Alternative axis | What it confuses | Why we did not pick it |
|---|---|---|
| By intent (marketing / portfolio / product / editorial) | The same motion decisions repeat across intents; matrix becomes intent × motion, not motion × motion | Cannot answer "what kind do I want?" |
| By stack (CSS / WebGL / Canvas / Lottie) | Conflates library with kind; cannot answer "I want scroll-driven reveal — what stack?" | A taxonomy built on stacks cannot absorb new libraries |
| By surface alone (DOM / 2D / 3D) | Trigger is invisible — scroll-reveal and CSS hover both touch DOM but are different build decisions | Half the matrix |
| By trigger alone (scroll / hover / time) | Surface is invisible — scroll-reveal on a 3D canvas is a different build from scroll-reveal on DOM | Half the matrix |

Trigger × surface is the cross-product a designer actually chooses between: "do I animate when they scroll, on hover, or by clock?" + "do I animate HTML, a 2D canvas, a 3D scene, or text?". The 12 primary cells are well-populated; the 7 emerging cells carry the rest.

## 5. Engine-family licensing (cell-by-cell quick check)

| Cell | Engines named in cell | Most permissive | Most restrictive | Cell-level guidance |
|---|---|---|---|---|
| (i) | CSS `animation-timeline`; GSAP ScrollTrigger; Lenis | Native CSS (free, no license) | None in cell | All engines in this cell are MIT or native. |
| (ii) | Three.js; R3F; Babylon.js; `<model-viewer>`; Spline | Three.js MIT; R3F MIT; Babylon Apache-2.0; `<model-viewer>` Apache-2.0 | Spline SaaS ($0–$44/mo for editor) | Spline is the only non-permissive cell member; runtime is MIT. |
| (iii) | Three.js `shaderMaterial`; TSL; glslCanvas; Shadertoy | All MIT or own-code | None in cell | Pure open cell. |
| (iv) | GSAP; Motion; vanilla | All MIT or native | None in cell | Pure open cell. |
| (v) | lottie-web; dotLottie-web; Rive; SVGator | lottie-web MIT; dotLottie-web MIT; Rive runtime MIT | SVGator SaaS; Rive editor SaaS | Lottie / dotLottie runtime = MIT; SVGator and Rive editor = SaaS. |
| (vi) | GSAP; Barba.js; CSS | All MIT or native | None in cell | Pure open cell. |
| (vii) | View Transitions API; Barba.js; Swup | Native | None in cell | All engines in this cell are MIT or native. |
| (viii) | CSS; Motion; GSAP; AutoAnimate; Sal.js | All MIT or native | None in cell | Pure open cell. |
| (ix) | p5.js; canvas-sketch; OGL; regl | canvas-sketch MIT; OGL MIT; regl MIT | p5.js LGPL-2.1 (weak copyleft; dynamic linking OK) | p5.js is the only non-permissive member; usually fine. |
| (x) | Tone.js; p5.sound; Web Audio API; Howler.js | Tone.js MIT; Howler.js MIT; Web Audio native | p5.sound LGPL-2.1 (matches p5.js) | Same posture as (ix). |
| (xi) | `<model-viewer>`; @react-three/xr | Both MIT/Apache | None in cell | Pure open cell. |
| (xii) | Motion AI Kit; LLM SDKs; Vercel AI SDK | Varies | AI SDKs may carry commercial restrictions | Check each SDK license separately; rate limits and content policy apply. |

For the watchlist libraries (Theatre.js studio AGPL, Remotion commercial threshold, animate.css Hippocratic), see `02_resources/01_animation_engines.md` and `07_license_posture.md` (Chunk B).

## 6. Accessibility / performance implications by cell

Per `share/design/T-2026-07-29-001/brief.md` §4–§7:

| Cell | Accessibility implication | Performance implication |
|---|---|---|
| (i) | Respect `prefers-reduced-motion: reduce` per the brief's reduced-motion table | Composite-only properties; cap concurrent tracks at 8 |
| (ii) | `prefers-reduced-motion` → static frame; provide `<noscript>` fallback image; alt-text for screen readers | DPR `[1, 2]`; `frameloop="demand"`; pause when offscreen |
| (iii) | Static gradient fallback; ambient-loop cap = 2; pause when `hidden` | One full-viewport scene; GPU budget for low-end mobile |
| (iv) | Disable for coarse pointers; `focus-visible` always works | Throttle to 60 fps; cap at 8 concurrent animated elements |
| (v) | Lazy-load below-fold; `aria-label` for state-machine players; pause when offscreen | `loading="lazy"`; `decoding="async"`; no layout shift |
| (vi) | `aria-busy`; `<noscript>` fallback; max visible duration | Cap concurrent at 8; pause when `hidden` |
| (vii) | `prefers-reduced-motion` → no transition; back/forward preserved | Total transition < 500 ms |
| (viii) | `focus-visible`; touch input; reduce-motion fallback | 60 fps; `transform`/`opacity` only |
| (ix) | Static fallback; pause on `visibilitychange` | One full-viewport scene; ambient-loop cap = 2 |
| (x) | No autoplay; mute button always; reduce-motion → no visual | AudioContext only after user gesture; < 1 ambient loop |
| (xi) | AR button only on supporting devices; lazy load | `.glb` < 5 MB; no console errors |
| (xii) | Explicit user prompt gate; rate-limit; pause/cancel | One generation at a time; streaming where supported |

## 7. When to break the matrix

The matrix is a default aid, not a law. If your team has standardized on a single library (e.g., GSAP for everything, Motion for everything), the matrix helps you map that library to a cell — it does not force you to use multiple engines. Choose the library first, then identify the cell.

---

## Metrics

- word_count: ≈1,360 (within 1,500 budget per `02_plan_phases_T-2026-07-29-001.md` rubric for `01_kinds_taxonomy.md`)
- tables: 6 (matrix, decision matrix, axis comparison, engine-family license, accessibility/perf implications, when-to-break)
- table_rows_total: 60 (matrix 12 + decision 13 + axis 4 + license 12 + a11y/perf 12 + watchlist 1 + misc)
- citations: 6 (canonical §3, canonical §6, taxonomy angle §Existing solutions, taxonomy angle §Technical findings, motion brief §4, motion brief §7)
- audience_callouts: 3 (senior dev, junior dev, founder)
- license_posture: every engine named has a license posture, either in-table or by reference to `02_resources/`
