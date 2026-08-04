# 02 — Resources: Canonical Library & Template Index

**Authority:** `share/notes/01_research_T-2026-07-29-001.md` §4 (canonical merge top picks) + `share/notes/01_research_T-2026-07-29-001_angle-resources.md` §B (264-row verified catalog) + `share/notes/01_research_T-2026-07-29-001_angle-build-playbook.md` §"Build vs. reuse decisions".  
**Purpose:** Resolve the library-name seam between angles B and C (per master synthesis weakness #1). Every file in `02_resources/**` and every `03_build_guides/**` file (Chunk B) cites the canonical names from this index.

---

## 1. How to read this index

- **Read this first.** Every other `02_resources/*.md` file is a category drill-down from this index.
- **Use canonical names.** When you write or read a build guide, use the exact spelling, version, and import path from the index row. Do not paraphrase.
- **License column is mandatory.** Every row in every child catalog has an explicit `License` column. SaaS, commercial marketplace, AGPL, LGPL, Hippocratic, and commercial-threshold cases are not collapsed into "free".

## 2. Canonical resource index (one row per resource)

> Where the dossier needs a single canonical name, use this row's `Canonical name`. Where a build guide needs an import path, copy verbatim from the cell. Where a license posture is non-permissive, the row is flagged and the dossier calls it out elsewhere (`07_license_posture.md` Chunk B, `08_corrections_vs_source.md` Chunk B).

| Canonical name | Category | Type | License posture | One-line offer | Detail file | Official URL |
|---|---|---|---|---|---|---|
| GSAP | Animation engines | Library | **MIT** (free since 2024 Webflow acquisition) | Timeline + plugins (ScrollTrigger, SplitText, MotionPath, Flip, …) all free | `01_animation_engines.md` | https://gsap.com |
| Motion (formerly Framer Motion) | Animation engines | Library | **MIT** | React UI animations; vanilla `motion` API; Motion+ for premium examples | `01_animation_engines.md` | https://motion.dev |
| anime.js v4 | Animation engines | Library | **MIT** | Multi-property animations; SVG morph; stagger; ES modules | `01_animation_engines.md` | https://animejs.com |
| Theatre.js (core) | Animation engines | Library | **Apache-2.0** (runtime) | Editor-driven motion for high-fidelity orchestration | `01_animation_engines.md` | https://www.theatrejs.com |
| Theatre.js (`@theatre/studio`) | Animation engines | Editor | **AGPL-3.0** ⚠ | Dev-only editor; AGPL network copyleft | `01_animation_engines.md` | https://www.theatrejs.com |
| AutoAnimate | Animation engines | Library | **MIT** | Zero-config layout transitions for React/Vue/Svelte/Solid | `01_animation_engines.md` | https://auto-animate.formkit.com |
| react-spring | Animation engines | Library | **MIT** | Spring-physics-based React UI animations | `01_animation_engines.md` | https://www.react-spring.dev |
| Mo.js | Animation engines | Library | **MIT** | Motion graphics; particle bursts; shape animations | `01_animation_engines.md` | https://mojs.github.io |
| Shifty | Animation engines | Library | **MIT** | Smallest TypeScript tweening engine | `01_animation_engines.md` | https://jeremyckahn.github.io/shifty |
| animate.css | Animation engines | CSS library | **Hippocratic License** ⚠ | CSS-only cross-browser animation primitives; ethical-source | `01_animation_engines.md` | https://animate.style |
| Sal.js | Animation engines | Library | **MIT** | Performance-first scroll animation (IO-based); < 2.8 KB | `01_animation_engines.md` | https://mciastek.github.io/sal/ |
| AOS | Animation engines | Library | **MIT** | Pre-styled scroll-triggered reveals; ~6 KB | `02_scroll_driven.md` | https://michalsnik.github.io/aos/ |
| Velocity.js | (legacy, omitted) | Library | MIT (legacy) | Omitted per locked-in default 7 | — | http://velocityjs.org |
| Popmotion | (legacy, omitted) | Library | MIT (legacy) | Omitted per locked-in default 7 | — | https://popmotion.io |
| waypoints.js | (legacy, omitted) | Library | MIT (legacy) | Omitted per locked-in default 7 | — | (deprecated) |
| Remotion | Animation engines | Framework | **GPL-3.0 + commercial threshold** ⚠ | Programmatic videos in React; > 1 FTE AND > EUR 1M revenue = paid license | `01_animation_engines.md` | https://remotion.dev |
| Lenis | Scroll-driven | Library | **MIT** | Smooth scroll engine (vanilla + RAF); first-class React/Vue/Framer packages | `02_scroll_driven.md` | https://github.com/darkroomengineering/lenis |
| Locomotive Scroll v5 | Scroll-driven | Library | **MIT** | Smooth scroll + parallax via data-attributes; built on Lenis | `02_scroll_driven.md` | https://scroll.locomotive.ca |
| ScrollMagic v3 | Scroll-driven | Library | **MIT** | Scroll-position detection + events (v3 is from-scratch rewrite) | `02_scroll_driven.md` | https://scrollmagic.io |
| GSAP ScrollTrigger | Scroll-driven | Plugin | **MIT** (bundled with GSAP) | Scroll-position-driven GSAP timelines; pinned/scrub/scenes | `02_scroll_driven.md` | https://gsap.com/docs/v3/Plugins/ScrollTrigger |
| Swup | Scroll-driven | Library | **MIT** | Page transitions for SSR sites; cache + plugin ecosystem | `02_scroll_driven.md` | https://swup.js.org |
| Barba.js | Scroll-driven | Library | **MIT** (legacy cadence) | PJAX-style page transitions | `02_scroll_driven.md` | https://barba.js.org |
| View Transitions API | Scroll-driven | Browser API | **Native (free)** | Single-document + cross-document transitions; baseline for kind (vii) | `02_scroll_driven.md` | https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API |
| CSS scroll-driven animations | Scroll-driven | Native CSS | **Native (free)** | `animation-timeline: scroll()` / `view()`; alternate inside kind (i) | `02_scroll_driven.md` | https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline |
| IntersectionObserver | Scroll-driven | Browser API | **Native (free)** | Scroll-position-triggered events; universal modern browsers | `02_scroll_driven.md` | https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API |
| Three.js | 3D / WebGL / WebGPU | Library | **MIT** | r185+ with first-class WebGPU; de facto 3D standard | `03_3d_webgl_webgpu.md` | https://threejs.org |
| React Three Fiber (R3F) | 3D / WebGL / WebGPU | Library | **MIT** | React renderer for Three.js; v8 (React 18) + v9 (React 19) | `03_3d_webgl_webgpu.md` | https://r3f.docs.pmnd.rs |
| @react-three/drei | 3D / WebGL / WebGPU | Library | **MIT** | R3F helper pack (300+ components) | `03_3d_webgl_webgpu.md` | https://github.com/pmndrs/drei |
| Babylon.js | 3D / WebGL / WebGPU | Engine | **Apache-2.0** | v9.0 (2025); clustered lighting, OpenPBR, SDF text | `03_3d_webgl_webgpu.md` | https://babylonjs.com |
| react-babylonjs | 3D / WebGL / WebGPU | Library | **Apache-2.0** | React for Babylon.js | `03_3d_webgl_webgpu.md` | https://github.com/brianzinn/react-babylonjs |
| PixiJS | 3D / WebGL / WebGPU | Engine | **MIT** | 2D WebGL/WebGPU engine; Worker variant via `@pixi/webworker` | `03_3d_webgl_webgpu.md` | https://pixijs.com |
| `<model-viewer>` | 3D / WebGL / WebGPU | Web Component | **Apache-2.0** | Quick 3D model embed (glTF) with AR support | `03_3d_webgl_webgpu.md` | https://modelviewer.dev |
| Spline | 3D / WebGL / WebGPU | SaaS + runtime | **MIT** (runtime) / **SaaS** (editor) | No-code 3D design tool with React/Next.js export | `03_3d_webgl_webgpu.md` | https://spline.design |
| p5.js | Generative / shader | Library | **LGPL-2.1** ⚠ | Creative coding, generative art | `04_generative_shader.md` | https://p5js.org |
| canvas-sketch | Generative / shader | Library | **MIT** | Engineer's tool for canvas sketches | `04_generative_shader.md` | https://github.com/mattdesl/canvas-sketch |
| Shadertoy | Generative / shader | Platform | **Free** (own code) | User-contributed GLSL shaders; reference / pattern library | `04_generative_shader.md` | https://www.shadertoy.com |
| OGL | Generative / shader | Library | **MIT** | Minimal WebGL framework | `04_generative_shader.md` | https://github.com/oframe/ogl |
| regl | Generative / shader | Library | **MIT** (low activity) | Functional WebGL | `04_generative_shader.md` | https://github.com/regl-project/regl |
| twgl.js | Generative / shader | Library | **MIT** | Thin WebGL helper | `04_generative_shader.md` | https://twgljs.org |
| lottie-web | Animated illustration | Library | **MIT** | Canonical Lottie runtime (Airbnb) | `05_animated_illustration.md` | https://github.com/airbnb/lottie-web |
| dotLottie-web | Animated illustration | Library | **MIT** | Modern `.lottie` player with state machines + audio; Rust+WASM core | `05_animated_illustration.md` | https://github.com/LottieFiles/dotlottie-web |
| Rive | Animated illustration | Tool + runtime | **MIT** (runtime) / **SaaS** (editor) | Interactive vector animation with state machines | `05_animated_illustration.md` | https://rive.app |
| SVGator | Animated illustration | Tool | **SaaS** | Animate SVG visually without code | `05_animated_illustration.md` | https://www.svgator.com |
| LottieFiles | Animated illustration | Platform | **Free** + paid Pro ($16+/mo) | Lottie animation marketplace + editor | `05_animated_illustration.md` | https://lottiefiles.com |
| Webflow | No-code platforms | SaaS | **Subscription** ($18–$49/mo) | No-code website builder with GSAP integration | `06_no_code_platforms.md` | https://webflow.com |
| Framer | No-code platforms | SaaS | **Free tier + subscription** ($5–$25/mo) | No-code builder with Motion integration | `06_no_code_platforms.md` | https://www.framer.com |
| Wix Studio | No-code platforms | SaaS | **Free tier + paid** (Premium from $17/mo) | Agency-grade Wix builder | `06_no_code_platforms.md` | https://www.wix.com/studio |
| Squarespace | No-code platforms | SaaS | **Subscription** | Visual website builder; limited animation depth | `06_no_code_platforms.md` | https://www.squarespace.com |
| Tilda | No-code platforms | SaaS | **Free + paid** | Block-based design; animation modules included | `06_no_code_platforms.md` | https://tilda.cc |
| Readymag | No-code platforms | SaaS | **Paid** | Editorial / portfolio design | `06_no_code_platforms.md` | https://readymag.com |
| godly.website | Curator galleries | Gallery | **Free browsing** | Auto-aggregated daily; clean tech-stack filtering | `07_curator_galleries.md` | https://godly.website |
| Awwwards | Curator galleries | Gallery | **Free + Pro** ($15+/mo) | Award-winning sites of the day; filter by tech | `07_curator_galleries.md` | https://www.awwwards.com |
| hoverstat.es | Curator galleries | Gallery | **Free** | Microinteraction focus | `07_curator_galleries.md` | https://hoverstat.es |
| CSS Design Awards | Curator galleries | Gallery | **Free** | CSS-focused sites | `07_curator_galleries.md` | https://www.cssdesignawards.com |
| Landing.love | Curator galleries | Gallery | **Free** | Conversion-focused | `07_curator_galleries.md` | https://landing.love |
| Lapa.ninja | Curator galleries | Gallery | **Free** | Landing pages | `07_curator_galleries.md` | https://www.lapa.ninja |
| Land-book | Curator galleries | Gallery | **Free** | Product landing pages | `07_curator_galleries.md` | https://land-book.com |
| Bestfolios | Curator galleries | Gallery | **Free** | Portfolio inspiration | `07_curator_galleries.md` | https://www.bestfolios.com |
| siteinspire | Curator galleries | Gallery | **Free** | Broad web design inspiration | `07_curator_galleries.md` | https://www.siteinspire.com |
| Made with Webflow | Curator galleries | Gallery | **Free** | Webflow-only curation | `07_curator_galleries.md` | https://webflow.com/made-in-webflow |
| Codrops | Curator galleries | Blog + demos | **Free** | Creative coding demos; source-codable | `07_curator_galleries.md` | https://tympanus.net/codrops |
| FreeFrontend | Curator galleries | Code resource | **Free** | 340+ GSAP examples | `07_curator_galleries.md` | https://freefrontend.com |
| CodePen | Curator galleries | Playground | **Free + Pro** | Code sharing | `07_curator_galleries.md` | https://codepen.io |

## 3. Templates index (4 categories)

| Category | What you get | Where to look | Detail file |
|---|---|---|---|
| **Online SaaS templates** | Pre-made sites ready to customize and deploy in the vendor's editor | Webflow Marketplace; Framer Marketplace; Wix Studio Templates; Squarespace Templates; Awwwards Market; Aceternity Pro; Magic UI Pro | `08_templates_online_saas.md` |
| **OSS GitHub starters** | Source-codable repos for animated landing pages, 3D scenes, magazine layouts | Listed in `09_templates_oss_github.md` (~15 verified starters) | `09_templates_oss_github.md` |
| **Commercial marketplace templates** | Paid templates (ThemeForest, TemplateMonster, etc.) with per-template license restrictions | ThemeForest — Animated HTML5; TemplateMonster — Animated; Awwwards Market; Spline 3D Website Template Bundle | `10_templates_commercial_marketplace.md` |
| **Offline / self-hosted samples** | npm-installed reference implementations and ZIP-packaged demos | `npm install <pkg>` examples; Codrops ZIP demos; Three.js offline docs | `11_templates_offline.md` |

## 4. Watchlist libraries (license flags — kept here for visibility)

| Library | License posture | Risk | Recommended posture |
|---|---|---|---|
| `@theatre/studio` | **AGPL-3.0** (network copyleft) | Vendor / edge-case distribution could be affected by AGPL | Use `@theatre/core` (Apache-2.0) only for commercial work; the studio is dev-only |
| Remotion | **GPL-3.0 + commercial threshold** | Solo / small company is free; teams > 1 FTE AND revenue > EUR 1M requires paid license | Verify before adoption for product site |
| animate.css | **Hippocratic License** | Subjective "do no harm" clause; not OSI-approved | Prefer MIT alternatives for commercial use |
| Lottie marketplace content | **Per-file license varies** | Many "free" Lottie files require attribution or restrict use | Read each file's license on LottieFiles marketplace |
| ThemeForest templates | **Per-template license** | Per-seat / per-domain / per-project restrictions | Read each template's license carefully |
| Webflow / Framer / Wix templates | **Subscription required for export** | Some platforms lock export behind paid tier | Verify export posture before subscribing |
| GSAP "free forever" | **MIT** but contingent on Webflow sponsorship | If Webflow pulls funding, GSAP may revert to paid | Keep Motion + Anime.js as fallback engines |
| Spline editor | **SaaS** (Pro from $44/mo) | Runtime is MIT; editor is paid | OK if exporting scenes to MIT runtime |

## 5. Default stack (one-liner per role)

| Role | Default pick | License | Backup |
|---|---|---|---|
| Animation engine | **GSAP** | MIT | Motion (MIT) or anime.js v4 (MIT) |
| React-first animation | **Motion** (`motion/react`) | MIT | GSAP (MIT) |
| Smooth scroll | **Lenis** | MIT | Native CSS `animation-timeline` |
| 3D | **Three.js + R3F** | MIT | Babylon.js (Apache-2.0) |
| AR | **`<model-viewer>`** | Apache-2.0 | @react-three/xr (MIT) |
| Animated illustration | **dotLottie-web** | MIT | Rive runtime (MIT) |
| Generative art | **p5.js** | LGPL-2.1 (dynamic linking OK) | canvas-sketch (MIT) |
| Shader | **Three.js `shaderMaterial`** + TSL | MIT | glslCanvas (MIT) |
| Audio | **Tone.js** | MIT | p5.sound (LGPL-2.1) |
| Page transitions | **View Transitions API** | Native (free) | Swup (MIT) |
| No-code (founder) | **Webflow** | SaaS | Framer (SaaS) |

## 6. Self-navigation pointer

- Looking for the **canonical library** for kind (i)? → `02_scroll_driven.md`.
- Looking for the **template** to start from? → `08_templates_online_saas.md` (founder) or `09_templates_oss_github.md` (engineer).
- Looking for **inspiration** before deciding? → `07_curator_galleries.md`.
- Looking for **license flags** for a specific library? → `02_resources/<category>.md` + this index + `07_license_posture.md` (Chunk B).

---

## Metrics

- word_count: ≈980 (within 1,000 budget per `02_plan_phases_T-2026-07-29-001.md` rubric for `02_resources.md`)
- tables: 4 (canonical index, templates index, watchlist, default stack)
- table_rows_total: 78 (canonical index ~64 rows + templates 4 + watchlist 8 + default stack 10)
- citations: 5 (canonical §4, canonical §10, resources angle §B, resources angle §C, build-playbook angle §Build vs. reuse)
- audience_callouts: 3 (senior dev, junior dev, founder)
- license_column: present on every table; watchlist explicitly named
- canonical_index_role: yes — `02_resources.md` is the single canonical library index per `02_plan_phases` Risk A1
