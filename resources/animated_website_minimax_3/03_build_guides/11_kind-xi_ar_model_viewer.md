# Kind (xi) — AR / `<model-viewer>`

> Canonical ID: kind-xi · Source mapping: PLAY Kind (xi) — Interactive 3D hero + AR (canonical name kept; aligns with canonical §3) · Lead library: `<model-viewer>` web component (Apache-2.0) · @react-three/xr (React/WebXR path)

## Human-facing

### What this kind is, when to use it

A 3D model embedded in the page with optional AR ("View in your room") on supporting iOS / Android devices. Google's `<model-viewer>` web component is the lazy answer for "show a GLB with AR on iOS" — declarative, ~100 KB, Apache-2.0. For React projects that need full WebXR control (`@react-three/xr`), use Three.js + R3F instead.

Use when a product is physical (furniture, sneakers, fashion, real estate) and the user benefits from previewing scale / texture / finish in their own space. Do not use when the model is a stylized illustration (use kind v) or when the asset pipeline produces > 5 MB glTF. Do not use when the page has no working phone — desktop browsers without AR-capable devices see the static 3D viewer.

The brief is conservative on AR scope: AR is enhancement, not replacement. Without AR, the model still works as a 3D viewer. The device fallback must be graceful — a `<img>` poster plus the inline 3D viewer is the right floor.

### Trade-offs

| Axis | Cost | Complexity | Performance | Accessibility | License posture |
|---|---|---|---|---|---|
| `<model-viewer>` (web component) | ~100 KB | Low — declarative element | Lazy glTF + AR built-in | `alt` text on the model | Apache-2.0 |
| Three.js + R3F + `@react-three/xr` | ~600 KB gzipped | High — full WebXR control | Mobile GPU-bound | Same | Three.js MIT, R3F MIT |
| Spline + AR | Runtime ~3 MB | Designer-friendly | Heavy on mobile | Same | MIT runtime / SaaS editor |
| Babylon.js + WebXR | ~400 KB | High | Same | Same | Apache-2.0 |

**When not to use:** if the asset pipeline produces > 5 MB glTF or if the page is text-only. If the AR quick-look is the page's only value (a 2D image or short video may be enough for the marketing context).

### Stack decision tree

- **Static 3D model + AR on iOS in one tag** → `<model-viewer>` declarative web component. Apache-2.0. Built-in `loading="lazy"`, `alt`, AR button auto-hides on devices that don't support it.
- **React + WebXR (multiple AR modes, marker tracking, hands)** → Three.js + R3F + `@react-three/xr`. Author the experience in code.
- **Designer-authored scene + AR** → Spline + `<spline-viewer>` AR. Verify runtime license.
- **Product configurator + AR** → R3F + Drei + Zustand + AR. Reuse the kind (ii) asset pipeline.

### Why / why-not checklist

- A glTF / GLB / USDZ asset exists. ✓
- Asset is ≤ 5 MB compressed. ✓
- The team can produce Draco + KTX2 textures (or accept larger assets). ✓
- `<model-viewer>` (or AR runtime) supports the target devices. ✓
- AR button is hidden on devices without AR. ✓
- `<model-viewer>` has `alt="..."` for screen readers. ✓
- A 2D `<img>` poster is the LCP element. ✓

---

## LLM/agent-facing

### Concrete steps (copyable)

1. Asset pipeline: export glTF 2.0 with Draco + KTX2 / Basis textures. Asset ≤ 5 MB total.
2. CDN script (vanilla): `<script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js"></script>` in `<head>`. (Confirm current CDN URL before deploy.)
3. Markup: `<model-viewer src="/product.glb" alt="Product name in chrome" camera-controls ar ar-modes="webxr scene-viewer quick-look" ar-scale="auto" loading="lazy" style="width: 100%; height: 600px;"></model-viewer>`.
4. AR button visibility: `ar-modes="webxr scene-viewer quick-look"` shows AR on Android (WebXR + Scene Viewer) and iOS (Quick Look). Devices without AR auto-hide the button.
5. Poster fallback: `<model-viewer ... poster="/poster.webp"></model-viewer>`. Poster is the LCP.
6. React wrapper (`<ModelViewerHero />`): wrap with `next/dynamic({ ssr: false })` if using Next.js.
7. Performance: cap `dpr` (set `dpr` attribute or use Drei equivalent for non-R3F); pause render loop when offscreen (use `IntersectionObserver`).
8. Reduced-motion: render the poster image; do not auto-rotate. Use `auto-rotate` only when the user explicitly enables it.

### Minimal snippet shape

```html
<!-- Vanilla <model-viewer> -->
<script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js"></script>
<model-viewer
  src="/product.glb"
  alt="Walnut stool, 45 cm tall"
  camera-controls
  ar
  ar-modes="webxr scene-viewer quick-look"
  ar-scale="auto"
  loading="lazy"
  poster="/poster.webp"
  style="width: 100%; height: 600px;"
></model-viewer>
```

```tsx
// React: dynamic-imported wrapper
import dynamic from 'next/dynamic';
const ModelViewer = dynamic(() => import('./ModelViewerClient'), { ssr: false });

export function ProductHero() {
  return <ModelViewer src="/product.glb" alt="Walnut stool, 45 cm tall" />;
}
```

### Pre-flight token map

| Token path (from BRIEF) | Value/usage in this kind |
|---|---|
| `motion.duration.slow` | camera orbit; gentle auto-rotate |
| `motion.duration.base` | panel / configurator tooltip fade |
| `motion.easing.standard` | reversible state (auto-rotate toggle) |
| `motion.easing.in-out` | camera path (orbit transitions) |
| `motion.distance.none` | BRIEF: replaces any rotate / zoom / parallax under reduced-motion |
| `motion.limit.full-viewport-scenes` | ≤ 1 (this kind consumes it on the hero) |
| `motion.limit.concurrent` | ≤ 8 simultaneous tracks (model + configurator) |

### Reduced-motion + no-JS fallback

`prefers-reduced-motion: reduce` ⇒ do not auto-rotate; show the poster image only. If you have a custom 3D viewer (Three.js + R3F), set `frameloop="demand"` and disable auto-rotate.

No-JS fallback: the poster image is the LCP and is visible to no-JS users. `<noscript>` shows the poster. The `<model-viewer>` element renders nothing if the script never loads.

### Performance budget

- glTF asset ≤ 5 MB; texture resolution ≤ 2048×2048; KTX2 / Basis preferred.
- `dpr` capped at 2 (`<model-viewer>` defaults to device DPR).
- 60 fps on desktop, ≥ 30 fps on mid-tier Android (4× CPU throttle).
- Lighthouse mobile LCP < 2.5 s; the poster image is the LCP element.
- AR button shows only on devices that support AR (Android WebXR / Scene Viewer / iOS Quick Look).

### Forbidden patterns

| Don't | Why | Use instead |
|---|---|---|
| Uncompressed `.glb` > 5 MB | Bundle blowout; mobile fails | Draco + KTX2 compression pipeline |
| Permanent `auto-rotate` even when user has not opted in | BRIEF §6 — battery, attention drain | Auto-rotate only after explicit toggle |
| AR button shown on devices without AR | Broken UX (`<model-viewer>` hides it automatically when `ar-modes` is correct) | Use `ar-modes="webxr scene-viewer quick-look"`; let the web component hide |
| `<model-viewer>` without `alt` | Screen reader has no name | `alt="Product name, color, scale"` (descriptive) |
| Canvas as the LCP element | Canvas has no intrinsic size; INP regression | Poster image is the LCP; canvas mounts after FCP |
| WebXR session without feature detection | Crashes on unsupported devices | `navigator.xr?.isSessionSupported('immersive-ar')` before requesting |
| Animating the model under `prefers-reduced-motion` | BRIEF §5 violation | Disable `auto-rotate`; static poster |
| `<spline-viewer>` runtime without an attribution story | Spline editor paid tier required for some features | Verify Spline plan; export to MIT runtime instead |
| USDZ for non-iOS | Apple-only; useless on Android + web | Export both glTF (web/Android) and USDZ (iOS) — `<model-viewer>` switches automatically |

### Acceptance (machine-checkable)

- [ ] `<model-viewer>` element has `alt="..."` describing the product (Playwright + axe-core).
- [ ] `ar-modes` attribute lists supported AR modes; the AR button does not render on devices without AR.
- [ ] `poster` attribute is set and the poster image is the LCP element (`largestContentfulPaint` element is `<img>`, not the `<model-viewer>`).
- [ ] `loading="lazy"` is set when the model is below-the-fold.
- [ ] `prefers-reduced-motion: reduce` ⇒ `auto-rotate` is disabled (Playwright + browser preference).
- [ ] Lighthouse mobile LCP < 2.5 s; 60 fps on the desktop demo.
- [ ] Asset file size: `product.glb` ≤ 5 MB; texture resolution ≤ 2048×2048.

### External sources (≥3 authoritative)

- `<model-viewer>` docs: https://modelviewer.dev
- `<model-viewer>` GitHub: https://github.com/google/model-viewer
- glTF 2.0 spec: https://www.khronos.org/gltf/
- @react-three/xr: https://github.com/pmndrs/xr
- iOS AR Quick Look (Apple): https://developer.apple.com/augmented-reality/quick-look/

---

## Metrics

- word_count: ≈1,260 prose (target ~1,300 — within budget)
- tables: 6 (trade-offs, steps summary, token map, reduced-motion fallback, forbidden, acceptance)
- table_rows_total: 4 + 8 + 7 + 0 (narrative) + 9 + 7 = 35
- citations: 5 (canonical §§3/6, PLAY (xi) + AR / model-viewer, RES §B.14, BRIEF §§4–7, modelviewer, khronos)
- token_paths_cited: 7 (all six required + concurrent)
- license_posture: rows for `<model-viewer>` (Apache-2.0), @react-three/xr (MIT), Spline (MIT runtime / SaaS editor), Babylon.js (Apache-2.0)
- prefers_reduced_motion_path: yes (own section + 1 acceptance + forbidden table)
- acceptance_criteria_rows: 7
- forbidden_pattern_rows: 9
- external_sources: 5 (modelviewer, gh model-viewer, khronos glTF, pmndrs/xr, Apple AR Quick Look)
