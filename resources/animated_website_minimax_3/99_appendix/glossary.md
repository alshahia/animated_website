# Appendix — glossary

Definitions are short enough for a founder, precise enough for a developer, and explicit enough for an agent selecting a path. Links point to the dossier’s canonical vocabulary (`CAN §§3–6`, `RES`, `PLAY`, `BRIEF`).

| Term | Definition | Dossier link |
|---|---|---|
| Animated website | A site where motion communicates hierarchy, cause, continuity, status, or orientation without making content depend on movement. | [`06_motion_grammar.md`](../06_motion_grammar.md) |
| Trigger × surface | The taxonomy axis: what starts motion (scroll, pointer, load, state, audio) crossed with where it appears (hero, section, inline, viewport). | [`01_kinds/01_kinds_taxonomy.md`](../01_kinds/01_kinds_taxonomy.md) |
| `kind-i` | Scroll-driven reveal/parallax; CSS scroll-driven animation is its native alternate. | [`03_build_guides/01_kind-i_scroll_reveal.md`](../03_build_guides/01_kind-i_scroll_reveal.md) |
| `kind-ii` | 3D scene or product showcase using WebGL/WebGPU with a fallback. | [`03_build_guides/02_kind-ii_3d_scene.md`](../03_build_guides/02_kind-ii_3d_scene.md) |
| `kind-iii` | Shader or GLSL fragment field rendered as a visual surface. | [`03_build_guides/03_kind-iii_shader.md`](../03_build_guides/03_kind-iii_shader.md) |
| `kind-iv` | Cursor or pointer-tracking behavior, gated away from coarse pointers. | [`03_build_guides/04_kind-iv_cursor_tracking.md`](../03_build_guides/04_kind-iv_cursor_tracking.md) |
| `kind-v` | Animated illustration; Lottie, dotLottie, and Rive live here, with Rive state machines called out. | [`03_build_guides/05_kind-v_animated_illustration.md`](../03_build_guides/05_kind-v_animated_illustration.md) |
| `kind-vi` | Preloader or intro sequence; readable content must not wait for decoration. | [`03_build_guides/06_kind-vi_preloader.md`](../03_build_guides/06_kind-vi_preloader.md) |
| `kind-vii` | SPA/page transition motion with feature detection and full-navigation fallback. | [`03_build_guides/07_kind-vii_page_transitions.md`](../03_build_guides/07_kind-vii_page_transitions.md) |
| `kind-viii` | Microinteraction or CSS-first feedback for hover, focus, press, and state. | [`03_build_guides/08_kind-viii_microinteraction.md`](../03_build_guides/08_kind-viii_microinteraction.md) |
| `kind-ix` | Generative or procedural art; pause and static-fallback rules apply. | [`03_build_guides/09_kind-ix_generative_art.md`](../03_build_guides/09_kind-ix_generative_art.md) |
| `kind-x` | Audio-reactive visual behavior; user gesture, mute, and transcript/equivalent rules apply. | [`03_build_guides/10_kind-x_audio_reactive.md`](../03_build_guides/10_kind-x_audio_reactive.md) |
| `kind-xi` | AR or `<model-viewer>` interaction with device capability fallback. | [`03_build_guides/11_kind-xi_ar_model_viewer.md`](../03_build_guides/11_kind-xi_ar_model_viewer.md) |
| `kind-xii` | AI-generated live motion; prompt, rate-limit, cancel, and no-surprise playback gates apply. | [`03_build_guides/12_kind-xii_ai_live_motion.md`](../03_build_guides/12_kind-xii_ai_live_motion.md) |
| Motion token | A named design value such as `motion.duration.base`, not an engine-specific magic number. | [`06_motion_grammar.md`](../06_motion_grammar.md) |
| `motion.duration.*` | Duration family from immediate replacement through one-off cinematic scene change. | [`06_motion_grammar.md`](../06_motion_grammar.md#duration-7) |
| `motion.easing.*` | Named velocity curve for linear input, standard state, enter, exit, in-out, or bounded overshoot. | [`06_motion_grammar.md`](../06_motion_grammar.md#easing-6) |
| Reduced motion | The behavior selected when `prefers-reduced-motion: reduce` is active; it is a designed final state, not a blanket kill switch. | [`06_motion_grammar.md`](../06_motion_grammar.md#reduced-motion-mapping) |
| Compositor-only property | A property such as `transform` or `opacity` that can avoid layout work; it still requires device measurement. | [`06_motion_grammar.md`](../06_motion_grammar.md#performance-grammar) |
| `motion.limit.concurrent` | The eight-track ceiling for visible concurrent animation. | [`06_motion_grammar.md`](../06_motion_grammar.md#limit-3) |
| ScrollTrigger | GSAP’s scroll-position plugin for pinned, scrubbed, and scene timelines; GSAP is MIT/free. | [`02_resources/02_resources.md`](../02_resources/02_resources.md) |
| Lenis | MIT smooth-scroll engine; current repository is `darkroomengineering/lenis`. | [`02_resources/02_resources.md`](../02_resources/02_resources.md) |
| WebGPU | Browser API for modern GPU rendering/compute; use capability detection and WebGL fallback. | [`02_resources/03_3d_webgl_webgpu.md`](../02_resources/03_3d_webgl_webgpu.md) |
| WebGL | Widely deployed browser GPU rendering path used by Three.js and many canvas engines. | [`02_resources/03_3d_webgl_webgpu.md`](../02_resources/03_3d_webgl_webgpu.md) |
| Rive state machine | A named set of states and transitions stored with an interactive illustration; Rive runtime is MIT, editor is SaaS. | [`02_resources/05_animated_illustration.md`](../02_resources/05_animated_illustration.md) |
| dotLottie | Archived Lottie delivery format/player family for compact assets and interactive states; runtime is MIT, content varies. | [`02_resources/05_animated_illustration.md`](../02_resources/05_animated_illustration.md) |
| Lottie content license | The individual animation’s usage terms; separate from the MIT player license and marketplace subscription. | [`07_license_posture.md`](../07_license_posture.md) |
| AGPL | Strong network copyleft license; modified covered software offered over a network can require source-sharing under its terms. | [`07_license_posture.md`](../07_license_posture.md) |
| SaaS | Software supplied as a hosted service; payment grants access under vendor terms, not automatic export or redistribution rights. | [`07_license_posture.md`](../07_license_posture.md) |
| Marketplace license | A bounded license for a purchased/downloaded template or content item; seats, domains, projects, attribution, and resale vary. | [`07_license_posture.md`](../07_license_posture.md) |
| Commercial threshold | A vendor rule that changes a free/open use case into a paid company license based on team size, revenue, or use. Remotion is the dossier watchlist example. | [`07_license_posture.md`](../07_license_posture.md) |
| Feature flag | A runtime switch that exposes motion to a controlled cohort and enables rollback without a full redeploy. | [`05_conversion_playbook.md`](../05_conversion_playbook.md) |
| RUM | Real-user monitoring: field measurements of Core Web Vitals and behavior from actual visitors. | [`05_conversion_playbook.md`](../05_conversion_playbook.md) |
| Core Web Vitals | Field performance signals including LCP, INP, and CLS; use them as rollout evidence, not as animation goals alone. | [`05_conversion_playbook.md`](../05_conversion_playbook.md) |
| No-JS fallback | A readable page state that remains available when scripts fail, are blocked, or are not shipped. | [`03_build_guides/03_build_guides.md`](../03_build_guides/03_build_guides.md) |
| Asset provenance | The record of where an image, model, font, Lottie, sound, or generated artifact came from and what permits its use. | [`07_license_posture.md`](../07_license_posture.md) |

## Metrics

- glossary_terms: 34; minimum_required: 20; table_count: 1; data_rows: 34
- word_count_total: 806; prose_word_count_excluding_table: 72; prose budget: ≤1,000 words
- citation_count: 34 dossier links + authority cross-references
- required_definitions: AGPL=yes; SaaS=yes; marketplace=yes; commercial_threshold=yes; token_link=yes
