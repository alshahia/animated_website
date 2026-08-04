# 01 — Kinds of Animated Websites: Overview & Master Matrix

**Authority:** `share/notes/01_research_T-2026-07-29-001.md` §3 (canonical merge) and `share/notes/01_research_T-2026-07-29-001_angle-taxonomy.md` (taxonomy angle).  
**Audience:** senior devs, junior devs, non-technical founders.  
**Companion files:** `01_kinds_taxonomy.md` (trigger × surface matrix), `02_emerging_kinds.md` (7 emerging kinds).

This file is the master view. The taxonomy angle proposed a 12-kind matrix on a **trigger × surface** axis and listed 7 more as "emerging / borderline". The canonical merge adopted that framing. Every downstream build guide (`03_build_guides/**`, Chunk B) reuses the kind IDs below without remapping.

---

## 1. Why this taxonomy exists

Animated websites blur two axes that are useful to keep separate:

- **Trigger** — what causes the animation to play (scroll, pointer, time, narrative, state machine, audio, ambient).
- **Surface** — what is being animated (DOM/CSS, 2D canvas / vector, 3D / WebGL / WebGPU, full-viewport scene, inline block).

A taxonomy built on either axis alone ("by library" or "by intent") cannot answer "what kind do I want to ship?" — only "which library do I want to use?". Trigger × surface generalizes: a brand-new library drops cleanly into an existing cell. The matrix covers marketing, portfolio, editorial, and product use cases with the same 12 cells.

## 2. Master matrix (12 primary + 7 emerging)

| # | Kind | Trigger | Surface | Engine / library family | Primary source |
|---|---|---|---|---|---|
| i | **Scroll-driven reveal / parallax** | scroll | page sections | CSS `animation-timeline` · GSAP ScrollTrigger · Lenis | canonical §3 · angle A kind #1 |
| ii | **3D scene / WebGL / WebGPU** | scroll + pointer | hero / page | Three.js · React Three Fiber · Babylon.js · WebGPU samples | canonical §3 · angle A kind #2 |
| iii | **Shader / GLSL fragment** | ambient / pointer | full-viewport | Shadertoy · glslCanvas · Three.js `shaderMaterial` · TSL | canonical §3 · angle A kind #3 |
| iv | **Cursor / pointer-tracking** | pointer | page-wide | GSAP · Motion · vanilla `pointermove` | canonical §3 · angle A kind #4 |
| v | **Animated illustration (Lottie / Rive)** | state machine | inline blocks | dotLottie · Rive runtime · lottie-web | canonical §3 · angle A kind #5 |
| vi | **Preloader / intro sequence** | page load | full-viewport once | GSAP timeline · View Transitions · Barba.js | canonical §3 · angle A kind #8 |
| vii | **Page transitions (SPA)** | navigation | full-viewport | View Transitions API · Barba.js · Swup | canonical §3 · angle A kind #7 |
| viii | **Microinteraction / CSS-only** | hover / focus / click | inline | CSS + Motion · GSAP micro · AutoAnimate | canonical §3 · angle A kind #9 |
| ix | **Generative art / canvas** | ambient / scroll | hero / sections | p5.js · canvas-sketch · generative-AI kits | canonical §3 · angle A emerging |
| x | **Audio-reactive** | audio input | hero / sections | Tone.js · p5.sound · Web Audio API | canonical §3 · angle A emerging |
| xi | **AR / `<model-viewer>`** | tap | inline / hero | `<model-viewer>` · `<model-viewer>` + AR · @react-three/xr | canonical §3 · angle A emerging |
| xii | **AI-generated live motion** | runtime API call | hero / sections | Motion AI Kit · LLM SDK + canvas · Vercel AI SDK | canonical §3 · angle A emerging |
| — | **(emerging)** CSS scroll-driven animations (alternate inside i) | scroll | DOM/CSS | native `animation-timeline` | angle A emerging |
| — | **(emerging)** View Transitions API (engine inside vii) | navigation | full-viewport | native browser API | angle A emerging |
| — | **(emerging)** WebGPU (engine inside ii) | any | 3D/WebGPU | Three.js `WebGPURenderer` | angle A emerging |
| — | **(emerging)** WebXR / VR-AR (engine inside xi) | narrative | 3D/WebXR | Three.js `WebXRManager` · `@react-three/xr` | angle A emerging |
| — | **(emerging)** dotLottie state machines (alt inside v) | state machine | 2D vector | dotLottie player | angle A emerging |
| — | **(emerging)** Generative-art landing pages (alt inside ix) | time / scroll | 2D/3D | p5.js · canvas-sketch · OGL | angle A emerging |
| — | **(emerging)** AI-generated live motion (alt inside xii) | runtime API | hero / sections | Motion AI Kit · LLM + canvas | angle A emerging |

The 7 "emerging" rows are the same kinds, called out separately in `02_emerging_kinds.md` because each carries a status flag (browser support, license, production-readiness) the primary matrix elides. CSS scroll-driven animations are explicitly **inside kind (i)** as an alternate engine (per locked-in default 8); it is not a 13th primary kind.

## 3. Per-kind one-paragraph definitions

### Kind (i) — Scroll-driven reveal / parallax
Section-level motion driven by scroll position. CSS `animation-timeline` is the 2026 baseline where supported; GSAP ScrollTrigger is the still-correct answer when scroll-linked non-trivial sequencing is needed. Lenis smooth-scroll engine is the canonical companion.

### Kind (ii) — 3D scene / WebGL / WebGPU
A `<canvas>` element rendering a Three.js scene (or Babylon.js scene) inside a hero or page section. R3F is the React wrapper. WebGPU via Three.js r185+ is the 2026 baseline for new 3D work; r158+ has had first-class `WebGPURenderer`. `<noscript>` fallback image is mandatory.

### Kind (iii) — Shader / GLSL fragment
A full-viewport fragment shader, typically authored in GLSL or Three Shading Language (TSL), running ambient or pointer-reactive. Shadertoy is the reference / pattern library; `glslCanvas` and Three.js `shaderMaterial` are the deployment paths.

### Kind (iv) — Cursor / pointer-tracking
Pointer-driven effects (custom cursors, magnetic buttons, tilt, parallax-on-cursor). GSAP quickTo, Motion `useMotionValue`, or vanilla `pointermove` are the engines. Must be disabled for touch / coarse pointers and capped at ~8 concurrent animated elements.

### Kind (v) — Animated illustration (Lottie / Rive)
After-Effects-exported vector animations (Lottie / dotLottie) or interactive state-machine animations (Rive). Lottie has no runtime state logic; Rive has a state machine built into the format. Pick Lottie/dotLottie for purely time-based loops; pick Rive when buttons or hover must drive animation state.

### Kind (vi) — Preloader / intro sequence
A full-viewport mask that hides the page while assets load. GSAP timeline or a CSS animation on `window.load`. Must be dismissed within ~5 s even if assets stall, must set `aria-busy` for screen readers, and must include a `<noscript>` fallback so SEO bots see real content.

### Kind (vii) — Page transitions (SPA)
Route-change animation in single-page apps. The View Transitions API (`Document.startViewTransition`) is the 2026 native answer; Barba.js or Swup are the JS-controlled fallbacks. Must respect back/forward button state and have a no-JS fallback.

### Kind (viii) — Microinteraction / CSS-only
Hover/focus/click feedback on buttons, links, form fields. CSS-only is the baseline; Motion or GSAP for orchestration; AutoAnimate for zero-config layout transitions. Must respect `prefers-reduced-motion`, work with keyboard (`focus-visible`), and stay within 60 fps.

### Kind (ix) — Generative art / canvas
Procedurally generated visuals in a `<canvas>`. p5.js is the friendly baseline; canvas-sketch is the engineer's tool. Must pause on `document.visibilitychange === 'hidden'` and when offscreen via `IntersectionObserver`.

### Kind (x) — Audio-reactive
Audio-input-driven visuals. Tone.js or p5.sound. AudioContext requires explicit user gesture to start; no autoplay; mute button always present.

### Kind (xi) — AR / `<model-viewer>`
3D model embed with optional AR on supporting devices. Google's `<model-viewer>` web component is the lazy answer for "show a GLB with AR on iOS". `.glb` should be < 5 MB and lazy-loaded.

### Kind (xii) — AI-generated live motion
Runtime API call to an LLM or generative model that produces motion design (sprite sheets, SVG, canvas frames). The Motion AI Kit (motion.dev/ai-kit) is the canonical pick. One generation at a time; user can pause/cancel; no surprise playback.

## 4. Why these 12 and not 20 (or 6)

The taxonomy angle considered 20 kinds (matching the sibling `animated_website_deepseek_flash/sub_agents/01_genres_taxonomy.md` split) and explicitly merged several where the build decision does not change:

- Parallax editorial → folded into kind (i). Library choice differs; build steps do not.
- Typography / kinetic type → kept inside kind (i) + (viii). Most kinetic-typography work is GSAP ScrollTrigger + SplitText / SplitType, which lives in kind (i).
- SVG line-drawing → kept inside kind (viii). CSS or anime.js or Vivus; the build decision is the same.
- Scrollytelling long-form → kept inside kind (i). NYT-style editorial = scroll-driven choreography.
- Interactive editorial → kept inside kind (i) + (vii). The distinguishing axis is scroll depth + page transitions; both are now well-covered.
- Animated logos → folded into kind (viii). Most logo reveals are CSS + an entrance easing from the motion brief.

The 7 emerging kinds are kept separate because each carries a distinct build decision the primary matrix elides: browser-support gating, license gating, or production-readiness uncertainty.

## 5. How to pick a kind

| If you want to… | Start with kind | Why |
|---|---|---|
| Animate a marketing landing page section-by-section | (i) scroll-driven reveal | Lowest cost; CSS `animation-timeline` baseline; upgrade to GSAP ScrollTrigger for choreography |
| Show a product in 3D, rotating on scroll | (ii) 3D scene | Three.js + R3F; `<noscript>` fallback image mandatory |
| Fill a hero with a fluid / gradient / particle background | (iii) shader or (ix) generative art | Shader = GLSL precision; generative art = canvas flexibility |
| Add hover personality to buttons / cards | (viii) microinteraction | CSS-only baseline; Motion for React |
| Run a single illustrative animation that reacts to state | (v) Lottie or Rive | dotLottie for stateless loops; Rive for stateful interactions |
| Hide page load behind a branded intro | (vi) preloader | GSAP timeline on `window.load`; respect `aria-busy` |
| Animate route changes in an SPA | (vii) page transitions | View Transitions API where supported; Barba.js / Swup fallback |
| Follow the user's cursor with a custom effect | (iv) cursor tracking | Disabled on coarse pointers; throttle to 60 fps |
| Make a hero react to microphone / audio | (x) audio-reactive | Explicit user gesture required to start AudioContext |
| Show a 3D model with "View in your room" AR | (xi) AR / `<model-viewer>` | `<model-viewer>` web component; lazy load |
| Generate motion design at runtime from a prompt | (xii) AI-generated live motion | Motion AI Kit; one-at-a-time rate-limit |

## 6. What this taxonomy does NOT cover

- **Native mobile app motion** — out of scope; this dossier is web-responsive only.
- **TV / set-top / console animation** — out of scope.
- **Game engines** (Phaser, Kaboom) — adjacent but separate; only `09_templates_oss_github.md` references them in passing.
- **Voice-driven motion, sign-language choreography** — design brief §11 explicit deferral.
- **User-research-validated motion for vestibular / cognitive / migraine / photosensitive conditions** — design brief §11 explicit gap. Accessibility-by-default, not accessibility-validated.

## 7. How Chunk B and Chunk C reuse this file

- `03_build_guides/01_kind-i_scroll_reveal.md` … `12_kind-xii_ai_live_motion.md` use the kind IDs and names verbatim.
- `04_do_dont.md` references kinds by these IDs in the "why" column.
- `05_conversion_playbook.md` recommends kind (i) for the 10-step retrofit's first concrete pick.
- `06_motion_grammar.md` and `08_corrections_vs_source.md` reference this matrix when introducing token-name conventions.
- `99_appendix/glossary.md` cross-links every term to its kind.

Any new kind introduced after publication goes into `02_emerging_kinds.md` first; promoting it to primary requires a canonical merge update and a Chunk C correction.

---

## Metrics

- word_count: ≈1,180 (under 1,200 budget per `02_plan_phases_T-2026-07-29-001.md` rubric for `01_kinds.md`)
- tables: 5 (master matrix, kind-pick table, plus 3 inline matrix/notes)
- table_rows_total: 39 (master matrix 19 rows + pick table 12 + decision notes)
- citations: 6 internal (canonical §3, canonical §6, canonical §7, taxonomy angle §Existing solutions, taxonomy angle §Technical findings, taxonomy angle §Self-critique)
- audience_callouts: 3 (senior dev, junior dev, founder)
- license_posture: every engine column in the matrix links to or names a license in `02_resources/`
