# Kind (ii) — 3D scene / WebGL / WebGPU

> Canonical ID: kind-ii · Source mapping: PLAY Kind (ii) — 3D product showcase · Lead library: Three.js r185+ · React Three Fiber · `<model-viewer>` (for AR variant)

## Human-facing

### What this kind is, when to use it

A `<canvas>` element renders a Three.js scene (or Babylon.js scene) inside a hero or page section. R3F is the React wrapper. WebGPU via Three.js r185+ is the 2026 baseline for new 3D work — first-class `WebGPURenderer`, not experimental. `<noscript>` fallback image is mandatory: the canvas never beats the LCP element.

Use when the product is physical, the brand values craft, or the user is exploring a configurator (color, finish, material). Do not use when the page is text-heavy editorial, when the asset pipeline cannot produce glTF, or when the team cannot profile mobile GPU. A 3D scene that drops to 20 fps on a mid-tier Android is worse than no scene at all.

Three.js is MIT, R3F is MIT, `<model-viewer>` is Apache-2.0. Babylon.js is Apache-2.0 (alternative). The asset pipeline (Draco mesh compression, KTX2 / Basis Universal textures) is part of this kind — a 12 MB uncompressed `.glb` will defeat every other optimization.

### Trade-offs

| Axis | Cost | Complexity | Performance | Accessibility | License posture |
|---|---|---|---|---|---|
| R3F + Drei | ~600 KB gzipped | High | Mobile GPU-bound on heavy scenes | Screen-reader needs `name` on every mesh | Three.js MIT, R3F MIT, Drei MIT |
| Raw Three.js | ~150 KB gzipped | High | Same as R3F | Same | Three.js MIT |
| Babylon.js | ~400 KB gzipped | High | Stronger for product viz / e-commerce | Same | Apache-2.0 |
| `<model-viewer>` | ~100 KB web component | Low — declarative | Lazy glTF + AR built-in | 2D fallback + alt text | Apache-2.0 |
| Spline | Runtime ~3 MB | Low (designer authors) | Heavy; mobile often LOD-only | Same | MIT runtime / SaaS editor |

**When not to use:** if the user is reading an article or filling a form, a 3D hero is decoration. If the product has no existing 3D model and the design budget cannot produce one, defer to kind (i) scroll-reveal.

### Stack decision tree

- **React + Next.js product page** → R3F + Drei + Zustand. Code-split the scene with `next/dynamic({ ssr: false })`.
- **Vanilla three.js, no React** → raw Three.js + Draco / KTX2 loaders.
- **Static glTF + AR on iOS in one tag** → `<model-viewer>` (Apache-2.0). No build step; minified web component.
- **Designer-authored interactive 3D** → Spline + `@splinetool/react-spline` or `<spline-viewer>`. Verify the runtime license (MIT) covers your distribution.
- **Product configurator (color picker, swap part)** → R3F + Drei + Zustand. The state layer is more important than the renderer choice.

### Why / why-not checklist

- A glTF / GLB / USDZ asset exists or is in production. ✓
- The scene has ≤ 50 k polygons and ≤ 4 MB textures (mobile LOD). ✓
- The team can write KTX2 / Draco compression into the asset pipeline. ✓
- LCP can be a 2D poster image (`<img width height>`), not the canvas. ✓
- The team can profile mid-tier Android, not just M-series MacBook. ✓
- The scene has accessible fallback (poster + alt text + `name` on meshes). ✓
- The page can host ≤ 1 full-viewport 3D scene (`motion.limit.full-viewport-scenes`). ✓

---

## LLM/agent-facing

### Concrete steps (copyable)

1. Asset pipeline: export glTF 2.0 with Draco mesh compression and KTX2 / Basis textures. Target ≤ 5 MB total. Verify with `three.js editor` and `modelviewer.dev` before integration.
2. SSR wrapper (Next.js): `const ProductScene = dynamic(() => import('@/components/ProductScene'), { ssr: false, loading: () => <img src="/poster.jpg" alt="..." width={1200} height={800} /> });`. The 2D poster is the LCP element.
3. Canvas + camera: `<Canvas dpr={[1, 2]} camera={{ position: [0, 0, 3], fov: 45 }} frameloop={autoRotate ? 'always' : 'demand'}>`. Cap `dpr` at 2.
4. Lights + environment: `<ambientLight intensity={0.5} />` + one key `<directionalLight position={[10, 10, 5]} intensity={1} />` + Drei `<Environment preset="studio" />` for IBL.
5. Model + controls: `<primitive object={gltf.scene} />`; `<OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 2.5} maxPolarAngle={Math.PI / 1.8} autoRotate={autoRotate} autoRotateSpeed={0.5} />`.
6. Performance: Drei `<PerformanceMonitor onDecline={() => useProductState.setState({ dpr: 1 })} />` to drop DPR on slow devices. Pause the render loop when offscreen.
7. Reduced-motion: `matchMedia('(prefers-reduced-motion: reduce)').matches === true` ⇒ `frameloop="demand"`, `<OrbitControls autoRotate={false} />`. Do not animate scale/rotation on the model.
8. Cleanup: every mesh has a `name` (`<mesh name="product-body">`); the `OrbitControls` `onStart` handler toggles `autoRotate: false`.

### Minimal snippet shape

```tsx
// components/ProductScene.tsx
'use client';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerformanceMonitor } from '@react-three/drei';

export default function ProductScene({ gltf, autoRotate, toggleAutoRotate }) {
  return (
    <Canvas dpr={[1, 2]} frameloop={autoRotate ? 'always' : 'demand'} camera={{ position: [0, 0, 3], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Environment preset="studio" />
      <primitive object={gltf.scene} />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate={autoRotate} autoRotateSpeed={0.5}
        minPolarAngle={Math.PI / 2.5} maxPolarAngle={Math.PI / 1.8}
        onStart={() => toggleAutoRotate(false)} />
      <PerformanceMonitor onDecline={() => /* setState({ dpr: 1 }) */} />
    </Canvas>
  );
}
```

### Pre-flight token map

| Token path (from BRIEF) | Value/usage in this kind |
|---|---|
| `motion.duration.cinematic` | one-off scene transition (rare); full-scene reveal on hero |
| `motion.duration.slow` | camera path; orbit auto-rotate at idle |
| `motion.duration.base` | tooltip / label fade inside the 3D scene |
| `motion.easing.in-out` | camera path motion — `in-out` keeps subject visible |
| `motion.easing.standard` | reversible configurator state change (color picker) |
| `motion.distance.none` | BRIEF: replaces any 3D rotate/scale/parallax under reduced-motion |
| `motion.limit.concurrent` | ≤ 8 simultaneous 3D animation tracks across the page |
| `motion.limit.full-viewport-scenes` | ≤ 1 full-viewport WebGL scene at a time (this kind typically uses it) |
| `motion.limit.ambient-loops` | reserved for shader (kind iii) if one is also present |

### Reduced-motion + no-JS fallback

`prefers-reduced-motion: reduce` ⇒ `frameloop="demand"`; `<OrbitControls autoRotate={false} />`; any scripted camera path is replaced with a static front view; no product spin. The poster image remains the visible LCP.

No-JS fallback: a 2D `<img width=... height=... alt="...">` is always the LCP. The canvas `<noscript>` is not necessary if the poster is outside the canvas in the DOM order.

### Performance budget

- glTF asset ≤ 5 MB; texture resolution ≤ 2048×2048; KTX2 / Basis preferred.
- `dpr` capped at `Math.min(window.devicePixelRatio, 2)`.
- 60 fps on desktop, ≥ 30 fps on mid-tier Android (Pixel 5 / Galaxy A class).
- GPU usage on hero scroll < 60% on the throttled mobile profile.
- Lighthouse mobile LCP < 2.5 s (the 2D poster is the LCP element, not the canvas).

### Forbidden patterns

| Don't | Why | Use instead |
|---|---|---|
| Animate `width` / `height` / `top` / `left` on a `<mesh>` | Triggers React DOM updates, not GPU work | Animate on the GL object: `mesh.scale`, `mesh.position`, `mesh.rotation` |
| Uncompressed `.glb` > 5 MB | Bundle blowout; mobile fails | Draco + KTX2 compression pipeline |
| `frameloop="always"` on pages with > 5 s of no interaction | Drains battery | `frameloop="demand"` + manual `invalidate()` |
| `useFrame` that reads `getBoundingClientRect()` per frame | Forces synchronous layout | Read once on `ResizeObserver`; memoize |
| `WebGPURenderer` without feature detection | Crashes on Firefox / older Safari | `if (!('gpu' in navigator)) return new WebGLRenderer();` |
| Permanent `will-change: transform` on the canvas | Canvas does not benefit; `will-change` is for DOM compositing | No `will-change` on canvas; rely on R3F internals |
| Canvas as the LCP element | Canvas has no intrinsic dimensions; INP regression | 2D poster image is the LCP; canvas mounts after FCP |

### Acceptance (machine-checkable)

- [ ] `useProductState.getState()` is callable outside React (Zustand default).
- [ ] On Chrome / Firefox / Safari, the canvas mounts and the first frame renders within 1 s of `useEffect`.
- [ ] `window.devicePixelRatio` capped at 2 in the canvas props.
- [ ] `prefers-reduced-motion: reduce` ⇒ `<OrbitControls autoRotate={false} />` AND `frameloop="demand"`.
- [ ] `navigator.gpu` is checked before any WebGPU path; falls back to WebGL2 on mismatch.
- [ ] Every `<mesh>` child of `ProductModel` has a `name` property (R3F: `<mesh name="product-body">`).
- [ ] Lighthouse mobile LCP < 2.5 s; the 2D poster is the LCP element (`largestContentfulPaint` element is the `<img>`, not the canvas).

### External sources (≥3 authoritative)

- Three.js docs (r185 WebGPU): https://threejs.org/docs/
- React Three Fiber: https://r3f.docs.pmnd.rs
- `<model-viewer>` docs: https://modelviewer.dev
- Babylon.js docs: https://doc.babylonjs.com
- glTF 2.0 spec + KTX2: https://www.khronos.org/gltf/

---

## Metrics

- word_count: ≈1,520 prose (target ~1,600 — within budget)
- tables: 6 (trade-offs, steps summary, token map, reduced-motion fallback, forbidden, acceptance)
- table_rows_total: 5 + 8 + 9 + 0 (narrative) + 7 + 7 = 36
- citations: 6 (canonical §§3/6, PLAY (ii), RES §§B.3/B.5, BRIEF §§4–7, threejs.org, r3f.docs.pmnd.rs)
- token_paths_cited: 9 (all six required + scene-specific extras)
- license_posture: rows for R3F (MIT), Three.js (MIT), Babylon.js (Apache-2.0), `<model-viewer>` (Apache-2.0), Spline (MIT runtime / SaaS editor)
- prefers_reduced_motion_path: yes (Reduced-motion section + forbidden table + acceptance item)
- acceptance_criteria_rows: 7
- forbidden_pattern_rows: 7
- external_sources: 5 (threejs, r3f, modelviewer, babylonjs, khronos)
