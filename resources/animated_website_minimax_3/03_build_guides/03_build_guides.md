# 03 — Build Guides Overview

> **Authority:** `share/notes/01_research_T-2026-07-29-001.md` §§3, 6, 9 + `share/notes/01_research_T-2026-07-29-001_angle-build-playbook.md` §Full build guide + `share/design/T-2026-07-29-001/brief.md` §§4–9.
> **Audience:** senior devs, junior devs, and non-technical founders. Every per-kind guide ships both `## Human-facing` and `## LLM/agent-facing` sections.
> **Scope:** the dossier ships 12 kind guides (one per canonical kind) plus this overview. The angle-playbook's historical kind numbering is remapped to the canonical IDs (`share/notes/01_research_T-2026-07-29-001.md` §3 owns IDs); the per-kind remap is documented inside each affected guide's `> Canonical ID` line.

## 1. How to use this section

Read this file once. It defines the contract every per-kind guide follows. Pick one kind from the matrix below; jump to that guide. Cross-reference sibling guides via §4.

The guides are written so a human can read the `## Human-facing` half end-to-end and so an agent/LLM can read the `## LLM/agent-facing` half and produce a copyable implementation. Both halves are non-empty; both cite the canonical research and the design brief.

## 2. Canonical kind-to-file matrix

| # | Roman | Kind name (canonical) | File | Lead library / approach | Primary trade-off |
|---|---|---|---|---|---|
| 1 | (i) | Scroll-driven reveal / parallax | `01_kind-i_scroll_reveal.md` | GSAP ScrollTrigger + Lenis · CSS `animation-timeline` (native alternate) | Choreography vs. zero-JS — pick the engine per LCP budget |
| 2 | (ii) | 3D scene / WebGL / WebGPU | `02_kind-ii_3d_scene.md` | Three.js r185+ · R3F · `<model-viewer>` (AR variant) | Visual richness vs. mobile bundle + LCP |
| 3 | (iii) | Shader / GLSL fragment | `03_kind-iii_shader.md` | Shadertoy reference · glslCanvas · Three.js `shaderMaterial` / TSL | Pixel-perfect control vs. shader authoring cost |
| 4 | (iv) | Cursor / pointer-tracking | `04_kind-iv_cursor_tracking.md` | GSAP `quickTo` · Motion `useMotionValue` · vanilla `pointermove` | Personality vs. touch / coarse-pointer exclusion |
| 5 | (v) | Animated illustration (Lottie / Rive) | `05_kind-v_animated_illustration.md` | dotLottie-web + Rive runtime (state-machine call-out) | Off-the-shelf art vs. lost per-asset license check |
| 6 | (vi) | Preloader / intro sequence | `06_kind-vi_preloader.md` | GSAP timeline on `window.load` · View Transitions for SPA | Brand intro vs. mandatory preloader that hurts LCP |
| 7 | (vii) | Page transitions (SPA) | `07_kind-vii_page_transitions.md` | View Transitions API · Swup · Barba.js (legacy) | Native performance vs. cross-browser fallback + modifier-click handling |
| 8 | (viii) | Microinteraction / CSS-only | `08_kind-viii_microinteraction.md` | CSS `transition` + Motion for React · AutoAnimate | Compositor-only speed vs. limited orchestration |
| 9 | (ix) | Generative art / canvas | `09_kind-ix_generative_art.md` | p5.js (LGPL) · canvas-sketch · OGL · Three.js shaderMaterial | Ambient delight vs. continuous GPU + battery cost |
| 10 | (x) | Audio-reactive | `10_kind-x_audio_reactive.md` | Tone.js · Web Audio API native · p5.sound (LGPL) | Audio-driven interest vs. user-gesture gate + autoplay policy |
| 11 | (xi) | AR / `<model-viewer>` | `11_kind-xi_ar_model_viewer.md` | `<model-viewer>` (Apache-2.0) · @react-three/xr | glTF + AR on iOS in one tag vs. asset weight budget |
| 12 | (xii) | AI-generated live motion | `12_kind-xii_ai_live_motion.md` | Motion AI Kit · LLM SDK + canvas · Vercel AI SDK | Runtime-generated motion vs. cost, latency, rate-limit, and licensing of generated assets |

**Historical-numbering remap (per canonical merge §3):** PLAY's (iii) 2D-game, (iv) SVG-line, (vi) typography, (x) data-viz, and (xii) audio-reactive labels do not match canonical. The remap: canonical (iv) = cursor (PLAY called (iv) SVG line); canonical (vi) = preloader (TAX §Preloader block); canonical (x) = audio-reactive (PLAY called (xii) audio-reactive). Each affected guide states its remap in the `> Canonical ID` line at the top.

## 3. Per-guide template

Every per-kind guide uses this skeleton. Reviewers must find both halves plus the four required tables.

```text
# Kind {Roman} — {Name}

> Canonical ID: kind-{roman} · Source mapping: {PLAY kind label} · Lead library: {1-3 names}

## Human-facing
### What this kind is, when to use it
### Trade-offs
### Stack decision tree
### Why / why-not checklist

## LLM/agent-facing
### Concrete steps (copyable)
### Minimal snippet shape
### Pre-flight token map          ← required; cites BRIEF by name
### Reduced-motion + no-JS fallback ← required; cite BRIEF §5
### Performance budget
### Forbidden patterns
### Acceptance (machine-checkable) ← required
### External sources (≥3 authoritative)

## Metrics
```

## 4. Pre-flight token-map template (compact)

Every per-kind guide includes the six-row token map below. Values come from `share/design/T-2026-07-29-001/brief.md` §§4–5 and `share/design/T-2026-07-29-001/tokens.json`. Do not invent new durations; cite a token by name. Deviations need a `ponytail:` comment per BRIEF §9.

| Token path | Common use (pick the row that fits the kind) |
|---|---|
| `motion.duration.fast` | hover / microinteraction exit (kind viii); preloader final reveal (vi) |
| `motion.duration.base` | scroll-reveal (i); preloader enter (vi); tab transition (vii) |
| `motion.duration.slow` | scroll-reveal scrub (i); section narrative beat (ix) |
| `motion.easing.standard` | reversible state change; default for hover/focus |
| `motion.easing.enter` | entrances; CTA on reveal; preloader enter |
| `motion.easing.exit` | exits; preloader exit; route-change fade-out |
| `motion.distance.sm` | text or compact control reveal; chip/card press |
| `motion.distance.md` | card or section child reveal; Lottie icon hover |
| `motion.delay.item` | inter-item stagger (default for lists, grids) |
| `motion.delay.group-cap` | ceiling between first and last item in a group (≤400 ms) |
| `motion.limit.concurrent` | ≤8 simultaneous visible animation tracks |
| `motion.limit.ambient-loops` | ≤2 ambient loops (shader, generative art, audio LFO) |
| `motion.limit.full-viewport-scenes` | ≤1 full-viewport canvas/WebGL scene at a time |

## 5. Forbidden-pattern rules (cross-cutting)

These apply to **every** guide. The per-kind guide adds 3–5 kind-specific rows.

| Don't | Why | Use instead |
|---|---|---|
| Animate `width` / `height` / `top` / `left` / `right` / `bottom` / `margin` / `padding` | Layout properties trigger reflow; kill INP (BRIEF §6) | Animate `transform` + `opacity` only (compositor) |
| `* { animation-duration: 0.01ms !important; }` blanket override | Strips the user's reduced-motion intent; breaks third-party widgets | Per-element reduced-motion fallback; respect BRIEF §5 |
| Permanent `will-change: transform` on every element | Memory bloat; layers never reclaimed (BRIEF §6) | Apply `will-change` only during the animation, remove on completion |
| Run `requestAnimationFrame` loop while tab is hidden | Battery drain; Chrome throttles anyway | Pause on `document.visibilitychange === 'hidden'` |
| Start `AudioContext` without user gesture | Browser autoplay policy blocks silent start | Gate behind explicit click / keydown |
| Lazy-import the whole animation library in `main.tsx` | LCP regression | Code-split animation library; critical path stays animation-free |
| Hero canvas is the LCP element | Canvas has no intrinsic size; INP regression | 2D poster image is the LCP; canvas mounts after FCP |
| Lost `<noscript>` fallback for canvas / WebGL hero | SEO bots see nothing; indexability breaks | Static `<img>` with intrinsic dimensions for bots + no-JS users |
| Crossing `motion.limit.concurrent` | Visual chaos; INP regression | Cap at 8 simultaneous tracks; defer the rest |
| Modifier-click (`Cmd` / `Ctrl` / `Shift` + click) intercepted by custom routing | Breaks browser-native "open in new tab" | Let the browser handle modifier-click; intercept plain clicks only |

## 6. Test stack and acceptance

Recommended test stack (per locked-in default 10 — framework-agnostic with concrete names):

| Tool | Use | License |
|---|---|---|
| Playwright | End-to-end + visual regression | Apache-2.0 |
| axe-core | Accessibility smoke per page | MPL-2.0 |
| Lighthouse CI | Performance + best-practices thresholds per PR | Apache-2.0 |

Every guide's `### Acceptance (machine-checkable)` block maps to one of the three: Playwright scripts for interaction, axe-core rules for accessibility, Lighthouse assertions for FCP / LCP / CLS / INP budget. Per-kind acceptance items are the grep- / test-able checks that go beyond the global rules.

## 7. Cross-guide references

| If you are building… | Read first | Then read |
|---|---|---|
| A preloader (kind vi) | `02_resources/02_scroll_driven.md` for Lenis posture | `01_kind-vii_page_transitions.md` (preloader precedes first transition) |
| A page-transition (kind vii) | `01_kind-vi_preloader.md` (timing budget after preloader) | `02_resources/02_scroll_driven.md` |
| Generative art (kind ix) | `01_kind-iii_shader.md` (shader path shares the OGL engine) | `02_resources/04_generative_shader.md` |
| AR / `<model-viewer>` (kind xi) | `02_kind-ii_3d_scene.md` (Three.js modeling is upstream) | `02_resources/03_3d_webgl_webgpu.md` |
| AI live motion (kind xii) | `04_do_dont.md` rows 23–28 (rate-limit + license) | `07_license_posture.md` (Remotion, generated-asset licensing) |

## 8. What this section does not cover

- **Library license matrix** → `07_license_posture.md` (Chunk B)
- **Motion-grammar consumer guide** → `06_motion_grammar.md` (Chunk B)
- **All 95 named tokens** → `99_appendix/glossary.md` and `06_motion_grammar.md`
- **Conversion playbook (10 steps)** → `05_conversion_playbook.md` (Chunk C)
- **Do/Don't (30 use + 30 avoid)** → `04_do_dont.md` (Chunk C)
- **Original kind numbering in PLAY angle** → `08_corrections_vs_source.md` (Chunk B)

---

## Metrics

- word_count: ≈920 prose (within 1,000 budget per `02_plan_phases_T-2026-07-29-001.md`)
- tables: 5 (kind-to-file matrix, pre-flight token map, forbidden patterns, test stack, cross-references)
- table_rows_total: 12 (matrix) + 13 (token map) + 10 (forbidden) + 4 (test stack) + 5 (cross-refs) = 44
- citations: 5 (canonical §§3/6/9, build-playbook angle, brief §§4–9; plus brief §5/§6 inline)
- audience_callouts: 3 (senior dev, junior dev, founder)
- license_posture: 3 rows in §6 test-stack table; 0 collapsed to "free"
- guide_count: 12 + 1 overview = 13
- dual_audience_enforced: yes (template §3)
- forbidden_pattern_rows: 10 (cross-cutting) + 3–5 per-kind (varies)
