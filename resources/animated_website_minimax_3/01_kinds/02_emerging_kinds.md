# 02 — Emerging & Borderline Kinds (7)

**Authority:** `share/notes/01_research_T-2026-07-29-001.md` §3 (canonical merge's "Emerging / borderline kinds" line) + `share/notes/01_research_T-2026-07-29-001_angle-taxonomy.md` §"Emerging / borderline kinds".  
**Companion files:** `01_kinds.md` (master matrix), `01_kinds_taxonomy.md` (trigger × surface).

These 7 rows are **kept separate from the primary 12** because each carries a status flag (browser support, license, or production-readiness uncertainty) that the primary matrix would elide. None of them is a 13th primary kind. CSS scroll-driven animations are explicitly the alternate engine inside kind (i), not a 13th cell (per locked-in default 8).

---

## 1. Why these are emerging, not primary

- They are real production kinds in 2026 (some shipped at scale).
- Each one blurs either the trigger axis, the surface axis, or both — so placing it inside a primary cell is ambiguous.
- Each carries at least one of: (a) **browser support gate**, (b) **license gate**, (c) **production-readiness uncertainty** that downstream readers must verify before adopting.

## 2. Emerging kinds table

| # | Emerging kind | Primary cell | Trigger | Surface | Status (2026-07-29) | License posture | Caveat |
|---|---|---|---|---|---|---|---|
| E1 | **CSS scroll-driven animations** (`animation-timeline: scroll()` / `view()`) | inside (i) | scroll | DOM/CSS | Chrome 115+, Edge 115+, Safari TP; Firefox planned | Native (free) | Use as alternate engine inside kind (i) per locked-in default 8. |
| E2 | **View Transitions API** (`Document.startViewTransition()`, `@view-transition`) | inside (vii) | navigation | full-viewport route | Chrome 111+, Edge 111+, Safari 18 (2024), Firefox behind flag | Native (free) | Cross-document support landed in Chrome 126+ (2024); single-document stable everywhere. |
| E3 | **WebGPU scenes** | inside (ii) | any | 3D / WebGPU | Chrome stable, Safari TP, Firefox behind flag | Native (free) | Three.js `WebGPURenderer` is in main since r158 (2024); r185+ has first-class WebGPU per canonical §3. |
| E4 | **WebXR / VR-AR** | inside (xi) | narrative | 3D / WebXR | Chrome, Edge; Safari limited; mostly brand experiments | Mostly MIT (Three.js `WebXRManager`, @react-three/xr) | Adoption is brand-experiment tier; not a default for marketing sites. |
| E5 | **dotLottie state machines** | inside (v) | state machine + time + hover | 2D vector | Production-ready; LottieFiles 2025 | MIT (runtime) | Adds runtime state to Lottie; competitor to Rive for stateful illustrations. |
| E6 | **Generative-art landing pages** (procedural per-visit visuals) | inside (ix) | time / scroll | 2D / 3D canvas | Production-ready; used by portfolio + brand sites | Library-dependent (mostly MIT) | Each visitor may see different output; SEO bots see static content via `<noscript>`. |
| E7 | **AI-generated live motion** | inside (xii) | runtime API | hero / sections canvas | Production-emerging; Motion AI Kit, LLM SDK + canvas | Varies (SDK-specific) | One generation at a time; rate-limit; user can pause/cancel. No surprise playback. |

## 3. Per-kind status and adoption caveats

### E1 — CSS scroll-driven animations (alternate engine inside kind i)

`animation-timeline: scroll()` and `animation-timeline: view()` are W3C specs that make CSS animations drive from scroll progress without any JS. As of 2026-07-29:

- **Chrome / Edge:** stable since v115 (2023).
- **Safari:** Technology Preview; stable in Safari 18.x.
- **Firefox:** behind a flag; planned.

`prefers-reduced-motion` automatically disables `animation-timeline` per the spec; no extra code needed. Use as the default inside kind (i) where browser support is acceptable; fall back to GSAP ScrollTrigger otherwise.

### E2 — View Transitions API (engine inside kind vii)

Single-document view transitions (`document.startViewTransition()`) are stable in Chromium and Safari 18. Cross-document view transitions (`@view-transition` CSS) landed in Chrome 126+ (mid-2024) and Safari 18 (2024). Firefox is behind a flag as of 2026-07-29 per MDN. The API handles back/forward button state by default. `prefers-reduced-motion` triggers `update-callback` to skip animation if not opted in.

### E3 — WebGPU scenes (engine inside kind ii)

Three.js r185+ has first-class `WebGPURenderer` per canonical §3. The Three Shading Language (TSL) is the node-based shader authoring path; it replaces the older GLSL `shaderMaterial` flow for new projects. WebGPU support lets modern Chromium / Safari TP run shader-heavy sites without WebGL polyfills.

### E4 — WebXR / VR-AR (engine inside kind xi)

`<model-viewer>` is the lazy answer for "GLB with AR on iOS" — it ships AR Quick Look on iOS and Scene Viewer on Android with one tag. `@react-three/xr` is the R3F WebXR path. WebXR adoption is brand-experiment tier; most marketing sites should stick with `<model-viewer>`.

### E5 — dotLottie state machines (alt inside kind v)

`dotLottie` (`.lottie` archive) bundles states, themes, audio, and is up to 90% smaller than equivalent GIF. The Rust+WASM core (`dotlottie-rs`) is the same engine across iOS/Android/native. State machines were added in 2025 by LottieFiles. Rive remains the canonical pick for richer state-machine UI; dotLottie state machines are the lighter alternative.

### E6 — Generative-art landing pages (alt inside kind ix)

Per-visit procedural visuals — each visitor sees a slightly different hero. The technique is widely used in agency portfolios (lusion.co, activetheory.net). SEO bots see static content via `<noscript>`; accessibility users see a deterministic fallback. Production-ready; the build decision is library choice (p5.js, canvas-sketch, OGL) + asset budget + per-frame cost.

### E7 — AI-generated live motion (alt inside kind xii)

Runtime API call to an LLM or generative model that produces motion design (sprite sheets, SVG, canvas frames). The Motion AI Kit (motion.dev/ai-kit) is the canonical pick. Adoption posture: one generation at a time, user can pause/cancel, no surprise playback, explicit user prompt gate. SDK licenses vary; rate limits and content policy apply per provider.

## 4. What is NOT in this file

- **Velocity.js, waypoints.js, Popmotion** — legacy, unmaintained; omitted from the dossier entirely (per locked-in default 7). They are listed in `08_corrections_vs_source.md` (Chunk B) for completeness.
- **GSAP Club plugins (SplitText, MorphSVG, etc.)** — formerly paid; now free since the 2024 Webflow acquisition. Listed in `02_resources/01_animation_engines.md`.
- **Theatre.js `@theatre/studio`** — AGPL network copyleft. Flagged in license posture (per locked-in watchlist); not a separate kind.
- **Remotion** — commercial-license threshold; flag in license posture, not a separate kind.
- **animate.css** — Hippocratic License; flag in license posture, not a separate kind.

## 5. How to decide when to adopt an emerging kind

| Question | If yes | If no |
|---|---|---|
| Does the cell already cover the use case? | Use the primary cell's engine | Adopt the emerging kind |
| Is browser support ≥ 90% of your audience? | Use the emerging kind natively | Provide a fallback (alternate engine in same cell) |
| Is the library license safe for your commercial posture? | Use the emerging kind | Flag the license and pick the alternate |
| Is production-readiness documented (showcase sites, GitHub stars, npm downloads)? | Use the emerging kind | Wait or contribute upstream |
| Have you tested on a mid-tier Android device over throttled 4G? | Use the emerging kind | Fall back to the primary cell's engine |

---

## Metrics

- word_count: ≈880 (within 900 budget per `02_plan_phases_T-2026-07-29-001.md` rubric for `02_emerging_kinds.md`)
- tables: 4 (emerging kinds table, decision matrix, omissions list, when-to-adopt matrix)
- table_rows_total: 27 (emerging 7 + decision 5 + omissions 4 + when-to-adopt 11)
- citations: 5 (canonical §3, taxonomy angle §Emerging / borderline kinds, taxonomy angle §Technical findings, motion brief §4, motion brief §9)
- audience_callouts: 3 (senior dev, junior dev, founder)
- license_posture: every named tool has a license posture, either in-table or by reference
- correction_propagation: 8 corrections held for `08_corrections_vs_source.md`; not silently propagated here
