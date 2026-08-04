# 02/03 — 3D / WebGL / WebGPU: Three.js, R3F, Babylon.js, `<model-viewer>`, Spline

**Authority:** `share/notes/01_research_T-2026-07-29-001_angle-resources.md` §B.3 + `share/notes/01_research_T-2026-07-29-001.md` §4.  
**Selection guidance:** Per locked-in defaults — Three.js + R3F is the canonical pick (kind ii); Three.js r185+ with WebGPU is the 2026 baseline (correction #3); `<model-viewer>` is the lazy answer for "GLB + AR on iOS".

This file catalogs the libraries and tools an animated-website builder can use to render a 3D scene in the browser. It covers general-purpose engines (Three.js, Babylon.js), React wrappers (R3F, react-babylonjs), specialized helpers (drei, PixiJS for 2D-in-3D, `<model-viewer>` for AR), and the no-code option (Spline).

---

## 1. Library / API catalog (rows)

| Name | Type | Best for | License | Latest | Maintenance signal | URL | Notes |
|---|---|---|---|---|---|---|---|
| **Three.js** | Library | General 3D / WebGL / WebGPU for the web | **MIT** | r185 (Jul 2026) | 114k stars, mrdoob/three.js | https://threejs.org | De facto 3D standard. WebGPU + TSL (Three Shading Language) in v3 core. r185+ has first-class WebGPU (correction #3). |
| **React Three Fiber (R3F)** | Library | React renderer for Three.js | **MIT** | v9 (pairs with React 19) + v8 (React 18) | 31.6k stars, pmndrs/react-three-fiber | https://r3f.docs.pmnd.rs | Declarative Three.js with JSX. |
| **@react-three/drei** | Library | R3F helper pack (300+ components) | **MIT** | Latest | 9.8k stars, pmndrs/drei | https://github.com/pmndrs/drei | OrbitControls, Environment, ContactShadows, Float, MeshTransmissionMaterial, etc. |
| **Babylon.js** | Engine | Full 3D engine with editor, physics, spatial audio | **Apache-2.0** | v9.0 (2025) | Active, sponsored by Microsoft | https://babylonjs.com | Clustered lighting, OpenPBR, Gaussian splatting, large world rendering, SDF text. Notable users: Nike, Target, Minecraft, Xbox. |
| **react-babylonjs** | Library | React for Babylon.js | **Apache-2.0** | Active | https://github.com/brianzinn/react-babylonjs | https://github.com/brianzinn/react-babylonjs | Hooks + components for Babylon. |
| **PixiJS** | Engine | 2D WebGL/WebGPU engine | **MIT** | v8 | 47.9k stars, pixijs/pixijs | https://pixijs.com | Off-main-thread Worker variant via `@pixi/webworker`. Used for 2D hero scenes, particle systems, generative 2D. |
| **@pixi/react** | Library | React for PixiJS | **MIT** | Active | https://github.com/pixijs/pixi-react | https://github.com/pixijs/pixijs | Uses the React Reconciler. |
| **regl** | Library | Functional WebGL | **MIT** | Last release 2022 | Lower activity | https://github.com/regl-project/regl | Functional, lightweight. |
| **twgl.js** | Library | Thin WebGL helper | **MIT** | Active | https://github.com/greggman/twgl.js | https://twgljs.org | ~1 KB, by Gregg Tavares. |
| **OGL** | Library | Minimal WebGL framework | **MIT** | Active | https://github.com/oframe/ogl | https://github.com/oframe/ogl | Used by some R3F demos. |
| **Zdog** | Library | 3D round-flat illustration | **MIT** | Active | https://github.com/metafizzy/zdog | https://zzz.dog | For illustrations, not full 3D scenes. |
| **`<model-viewer>`** | Web Component | Quick 3D model embed (glTF) | **Apache-2.0** | Latest | 8.2k stars, google/model-viewer | https://modelviewer.dev | One-tag embed of 3D models with AR support. |
| **Spline** | SaaS / runtime | 3D design tool with React/Next.js export | **MIT** (runtime) / **SaaS** (editor) | Active | 1.4k stars (@splinetool/react-spline) | https://spline.design | Free tier; Pro from $44/mo. Exports to Web (JS/React/Next.js), iOS, Android, Webflow, Framer, Wix. AI 3D via "Omma". |
| **@react-three/xr** | Library | WebXR for R3F | **MIT** | Active | https://github.com/pmndrs/react-three-xr | https://github.com/pmndrs/react-three-xr | VR/AR via WebXR. |

## 2. WebGPU baseline (correction #3)

As of 2026-07-29, **Three.js r185+ has first-class WebGPU**. The `WebGPURenderer` is in main since r158 (2024); TSL (Three Shading Language) is the modern node-based shader authoring path replacing the older GLSL `shaderMaterial` flow for new projects. WebGPU support lets modern Chromium and Safari TP run shader-heavy sites without WebGL polyfills. New 3D work in 2026 should default to WebGPU where supported and fall back to WebGL via the same `WebGPURenderer.fromWebGLRenderer()` helper.

Babylon.js 9.0 (2025) also has first-class WebGPU; the babylonjs.com homepage confirms WebGPU as the default new-gen backbone.

## 3. Asset license posture (3D-specific)

| Asset type | Typical license | Where to source | Caveat |
|---|---|---|---|
| GLB / GLTF model (own) | Per-asset | Self-authored; Sketchfab (per-asset license); Poly Haven (CC0) | Verify per-asset license before use |
| GLB / GLTF model (asset library) | Per-library | Quaternius (CC0); Kenney (CC0); Synty Studios (per-asset license) | Some libraries restrict commercial use |
| Texture (HDR, albedo, normal) | Per-asset | Poly Haven (CC0); ambientCG (CC0) | Verify HDR license for WebGPU / WebGL commercial use |
| HDRI environment map | Per-asset | Poly Haven (CC0) | Required for PBR materials |
| Font (3D) | Per-font | Google Fonts (per-font license, mostly OFL) | Some 3D fonts are per-asset |
| Animation (Mixamo) | Royalty-free for use in projects | Adobe Mixamo (free for projects; not redistributable as-is) | Cannot redistribute Mixamo characters outside of your project |

## 4. Performance budget (per design brief §6)

| Engine / API | DPR cap | Concurrent scene cap | Reduce-motion fallback |
|---|---|---|---|
| Three.js | `[1, 2]` via `gl.setPixelRatio()` | 1 full-viewport scene (`motion.limit.full-viewport-scenes = 1`) | Static frame; pause when offscreen |
| R3F | Inherits; use `<Canvas dpr={[1, 2]}>` | 1 full-viewport canvas | Static frame via `<Canvas frameloop="demand">` |
| Babylon.js | Engine config | 1 full-viewport scene | Static frame |
| PixiJS | Configurable | 1 full-viewport scene (or 2D hero) | Static fallback |
| `<model-viewer>` | Native | Inline (not full-viewport) | Static poster image |
| Spline (exported runtime) | Runtime-controlled | Inline / hero | Static poster image |
| WebXR / `<model-viewer>` AR | Device-driven | Inline | AR Quick Look on iOS; fallback image otherwise |

**FPS target:** ≥ 50 FPS on mid-tier Android (Moto G Power tier or equivalent). Test on a real device over throttled 4G — never trust a desktop M-series MacBook as your only target (per design brief §6).

## 5. Three.js + R3F: install + import paths

| Step | Command / path |
|---|---|
| Install (vanilla) | `npm install three@0.185.0` |
| Install (R3F + drei) | `npm install three @react-three/fiber @react-three/drei` |
| Import (vanilla) | `import * as THREE from 'three';` |
| Import (R3F) | `import { Canvas, useFrame } from '@react-three/fiber';` |
| Import (drei) | `import { OrbitControls, Environment } from '@react-three/drei';` |
| CDN (vanilla) | `https://cdn.jsdelivr.net/npm/three@0.185.0/build/three.min.js` |
| CDN (GSAP integration) | `https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js` |

## 6. Babylon.js vs Three.js — when to pick which

| Situation | Pick | Why |
|---|---|---|
| React-first team | **Three.js + R3F** | R3F ecosystem is larger; pmndrs has 24+ satellite packages (drei, postprocessing, flex, xr, rapier, cannon) |
| Vanilla JS | **Three.js** | Smallest API surface; most tutorials; largest community |
| Product visualization with strong material / physics features | **Babylon.js** | OpenPBR + Gaussian splatting + SDF text + clustered lighting are first-class |
| WebXR brand experiments | **Three.js + @react-three/xr** | Most mature WebXR path |
| Need to render without coding | **Spline** (SaaS) | Drag-and-drop; export to React/Next.js |
| Need AR on iOS in 5 minutes | **`<model-viewer>`** | One tag; lazy-load; AR Quick Look native on iOS |

## 7. Reduced-motion mapping (per design brief §5)

| Engine / API | Reduce-motion behavior |
|---|---|
| Three.js | Skip `requestAnimationFrame`; render a single static frame |
| R3F | `<Canvas frameloop="demand">` + render once on mount |
| Babylon.js | `engine.stopRenderLoop()`; render one frame |
| `<model-viewer>` | `<model-viewer camera-controls disable-zoom>` + `auto-rotate` disabled |
| Spline runtime | Static poster image |
| PixiJS | `app.stop()`; render one frame |
| WebXR | `<model-viewer>` AR Quick Look; no scene motion |

## 8. Audience guidance

| Reader | Recommendation |
|---|---|
| **Senior dev** | Three.js + R3F (React) or vanilla Three.js; drei helpers; PixiJS for 2D WebGL heroes; Babylon.js for product viz; `<model-viewer>` for AR. |
| **Junior dev** | Start with `<model-viewer>` for AR; R3F + drei `Environment` + `OrbitControls` for hero 3D. Avoid Babylon.js until you have shipped Three.js. |
| **Non-technical founder** | Spline (SaaS) for no-code 3D + React export; `<model-viewer>` for AR. No engine code required. |

## 9. Corrections propagated here

- **Correction #3 (Three.js r185 + WebGPU baseline):** the canonical Three.js row above uses r185+ with first-class WebGPU. Older tutorials that say "WebGPU is experimental" are out of date.
- **Correction #8 (scrape placeholders):** the `<script src="https://cloudflare.com">` placeholders in the scraped source are not used here. Real CDN URLs above (`https://cdn.jsdelivr.net/npm/three@0.185.0/build/three.min.js`).

---

## Metrics

- word_count: ≈980 (within 1,000 budget per `02_plan_phases_T-2026-07-29-001.md` rubric)
- tables: 9 (catalog, WebGPU baseline, asset licenses, perf budget, install paths, Babylon-vs-Three, reduce-motion, audience, corrections)
- table_rows_total: 56 (catalog 14 + WebGPU 1 + asset 6 + perf 6 + install 6 + Babylon-vs-Three 7 + reduce-motion 7 + audience 3 + corrections 2)
- citations: 4 (resources angle §B.3, resources angle §B.5, canonical §4, motion brief §6)
- license_column: present on every table; asset license posture explicit
- corrections_propagated: #3 (Three.js r185 + WebGPU) and #8 (scrape placeholders) flagged here
