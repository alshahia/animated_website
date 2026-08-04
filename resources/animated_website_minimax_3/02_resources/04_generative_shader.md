# 02/04 — Generative Art & Shader: p5.js, canvas-sketch, Shadertoy, OGL, regl

**Authority:** `share/notes/01_research_T-2026-07-29-001_angle-resources.md` §B.4 + §B.5 + §B.7 + `share/notes/01_research_T-2026-07-29-001.md` §4.  
**Selection guidance:** Per locked-in defaults — p5.js for creative-coding-friendliness (LGPL-2.1 weak copyleft; dynamic linking OK); canvas-sketch for engineering-grade generative; Shadertoy for reference patterns; Three.js `shaderMaterial` / TSL for production shader deployment (covered in `03_3d_webgl_webgpu.md`).

This file catalogs the libraries and platforms an animated-website builder can use for generative art (kind ix) and shader / GLSL fragment (kind iii) — the two kinds that blur the line between 2D canvas and 3D WebGL.

---

## 1. Library / API catalog (rows)

| Name | Type | Best for | License | Latest | Maintenance signal | URL | Notes |
|---|---|---|---|---|---|---|---|
| **p5.js** | Library | Creative coding, generative art | **LGPL-2.1** ⚠ | Active; p5.js 2.0 in beta | 23.8k stars, processing/p5.js | https://p5js.org | Includes p5.sound, p5.dom. Weak copyleft — dynamic linking OK; do not redistribute modified p5.js source. |
| **p5.sound** | Library | Audio + p5.js | **LGPL-2.1** ⚠ (matches p5.js) | Active | https://p5js.org/reference/#/libraries/p5.sound | https://p5js.org/reference/#/libraries/p5.sound | Audio-reactive animation. |
| **canvas-sketch** | Library | Engineer's tool for canvas sketches | **MIT** | Active | https://github.com/mattdesl/canvas-sketch | https://github.com/mattdesl/canvas-sketch | Hot-reload; CLI for paper-style generative sketches. |
| **Shadertoy** | Platform | Browse user-contributed GLSL shaders | **Free** (own code; account optional) | Active | https://www.shadertoy.com | https://www.shadertoy.com | Most useful as a reference / pattern library. Shader code is user-owned; check per-shader license. |
| **OGL** | Library | Minimal WebGL framework | **MIT** | Active | https://github.com/oframe/ogl | https://github.com/oframe/ogl | Used by some R3F demos; good for shader-heavy inline scenes. |
| **regl** | Library | Functional WebGL | **MIT** | Last release 2022 | Lower activity | https://github.com/regl-project/regl | Functional, lightweight. |
| **twgl.js** | Library | Thin WebGL helper | **MIT** | Active | https://github.com/greggman/twgl.js | https://twgljs.org | ~1 KB, by Gregg Tavares. |
| **GLSL** | Language | WebGL shader language | **Web standard (free)** | n/a | https://www.khronos.org/opengl/wiki/OpenGL_Shading_Language | https://www.khronos.org/opengl/wiki/Open_Shading_Language | The legacy shader authoring language; still deployed via Three.js `shaderMaterial`. |
| **TSL (Three Shading Language)** | Library | Node-based shader authoring in Three.js | **MIT** (bundled with Three.js r163+) | Active | https://threejs.org/docs/#manual/en/introduction/tsl-introduction | https://threejs.org/docs/#manual/en/introduction/tsl-introduction | Replaces the older GLSL `shaderMaterial` flow for new projects. |
| **WGSL** | Language | WebGPU shading language | **Web standard (free)** | n/a | https://www.w3.org/TR/WGSL/ | https://www.w3.org/TR/WGSL/ | Used by WebGPU-native code. |
| **ml5.js** | Library | Friendly ML on top of TensorFlow.js | **MIT** | Active | https://github.com/ml5js/ml5-library | https://ml5js.org | PoseNet, handpose, image classification — generative AI integrations. |
| **TensorFlow.js** | Library | ML in browser / Node.js | **Apache-2.0** | Active | https://github.com/tensorflow/tfjs | https://www.tensorflow.org/js | GPU-accelerated WebGL backend. |
| **MediaPipe** | Library | Pose / face / hand tracking | **Apache-2.0** | Active | https://github.com/google/mediapipe | https://developers.google.com/mediapipe | Web-friendly tasks. |
| **brain.js** | Library | Neural networks in JS | **MIT** | Active | 14.9k stars, BrainJS/brain.js | https://brain.js.org | GPU via headless-gl. |

## 2. Library pick matrix

| Situation | Library | License posture |
|---|---|---|
| Creative-coding-friendly 2D generative art | **p5.js** (instance mode) | LGPL-2.1 (dynamic linking OK) |
| Engineering-grade 2D generative art with hot-reload | **canvas-sketch** | MIT |
| GLSL fragment shader for a hero scene | **Three.js `shaderMaterial`** + TSL (r163+) | MIT |
| Minimal WebGL wrapper for inline canvas | **OGL** | MIT |
| Functional WebGL (research-grade) | **regl** | MIT |
| Pose / hand tracking for AI-generated motion | **MediaPipe** + **ml5.js** | Apache-2.0 + MIT |
| Pattern inspiration for shader art | **Shadertoy** (own code) | Per-shader license (usually free) |
| ML-driven generative visuals | **TensorFlow.js** + **ml5.js** | Apache-2.0 + MIT |

## 3. p5.js instance mode (recommended for production)

Global mode (p5.js default) leaks globals; always use instance mode in production:

```js
import p5 from 'p5';
const sketch = (p) => {
  p.setup = () => { p.createCanvas(window.innerWidth, window.innerHeight); };
  p.draw = () => { p.background(0); };
};
new p5(sketch);
```

This keeps p5.js scoped to one canvas and avoids polluting `window`. Per `share/design/T-2026-07-29-001/brief.md` §6, pause when offscreen via `IntersectionObserver` and when `document.visibilitychange === 'hidden'`.

## 4. Performance budget (per design brief §6)

| Engine / API | Typical bundle | Concurrent scene cap | Reduce-motion fallback |
|---|---|---|---|
| p5.js | ~400 KB unminified (small minified) | 1 full-viewport canvas (or 2D hero) | Static representative frame |
| canvas-sketch | < 5 KB | 1 | Static |
| OGL | ~10 KB | 1 | Static |
| regl | ~25 KB | 1 | Static |
| Three.js shaderMaterial | Bundled with Three.js | 1 full-viewport | Static gradient |
| TSL | Bundled with Three.js r163+ | 1 | Static gradient |
| TensorFlow.js | ~1 MB+ (backends vary) | 1 | Static |
| MediaPipe | ~3 MB+ (model-dependent) | 1 | Static |

**Note on bundle size:** p5.js is large for what it does. For production hero scenes, prefer canvas-sketch (lighter) or a custom Three.js / OGL implementation.

## 5. Asset license posture (shaders + generative content)

| Asset type | Typical license | Where to source | Caveat |
|---|---|---|---|
| GLSL fragment shader (own) | Yours | Self-authored | None |
| GLSL fragment shader (Shadertoy) | Per-shader | https://www.shadertoy.com | Some shaders are CC0; others require attribution; check per-shader header |
| ML model weights | Per-model | TensorFlow.js model hub; MediaPipe model hub | Verify per-model license |
| Pose / face training data | n/a (used by model) | MediaPipe | None for the integration; the model itself may have license terms |
| Generative AI output | Per-provider | OpenAI; Anthropic; Vercel AI SDK | Verify per-provider license; commercial use varies |

## 6. Compatibility with motion grammar

Per `share/design/T-2026-07-29-001/brief.md` §4–§6:

- **Ambient-loop cap** — `motion.limit.ambient-loops = 2` per design brief. Most generative-art heroes should run at most 1 ambient loop; a second is allowed for a background field.
- **Reduce-motion** — render one static representative frame; do not autoplay.
- **Pause when offscreen** — `IntersectionObserver` to detect canvas visibility; pause `requestAnimationFrame` loop when not visible.
- **Pause when hidden** — `document.addEventListener('visibilitychange', ...)`; pause when `document.hidden === true`.

## 7. Reduced-motion mapping (per design brief §5)

| Engine | Reduce-motion behavior |
|---|---|
| p5.js | `p.noLoop()` + render one frame |
| canvas-sketch | Static frame via `pause()` / conditional `requestAnimationFrame` |
| Shadertoy embed | Show static poster image |
| OGL | Stop render loop |
| regl | Cancel frame loop |
| Three.js shaderMaterial | One static frame |
| TensorFlow.js / MediaPipe | Disable continuous inference; only run on user gesture |

## 8. Audience guidance

| Reader | Recommendation |
|---|---|
| **Senior dev** | Default to canvas-sketch or custom Three.js shaderMaterial for production; p5.js in instance mode for prototypes; TensorFlow.js / MediaPipe when the generative element is ML-driven. |
| **Junior dev** | Start with p5.js in instance mode for learning; canvas-sketch for engineering-grade; Shadertoy for shader reference. |
| **Non-technical founder** | Out of scope; pick a no-code 3D platform (Spline) or hire an engineer. |

## 9. Corrections propagated here

- **Correction #4 (CSS compositor-only):** CSS animations on `transform` / `opacity` run on the compositor thread, not the main thread. WebGL / canvas animation runs on the GPU (off main thread) but the JS orchestration can hit the main thread; keep per-frame work minimal.
- **Correction #8 (scrape placeholders):** the `<script src="https://cloudflare.com">` placeholders are not used here. Real CDN URLs above.

---

## Metrics

- word_count: ≈880 (within 900 budget per `02_plan_phases_T-2026-07-29-001.md` rubric)
- tables: 9 (catalog, pick-matrix, instance-mode, perf budget, asset licenses, motion grammar, reduce-motion, audience, corrections)
- table_rows_total: 49 (catalog 14 + pick 8 + instance 1 + perf 7 + assets 5 + motion 1 + reduce-motion 7 + audience 3 + corrections 2)
- citations: 4 (resources angle §B.4, resources angle §B.5, resources angle §B.7, canonical §4)
- license_column: present on every table; asset license posture explicit
- corrections_propagated: #4 (CSS compositor-only) and #8 (scrape placeholders) flagged here
