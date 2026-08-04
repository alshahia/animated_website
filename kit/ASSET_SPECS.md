# Asset Spec Handoff — `poster.jpg` + `product.glb`

These two assets ship as placeholders in the kit so demo routes render real
content during scaffolding and Playwright specs have something to assert
against. They are NOT production-ready and must be replaced before shipping
any real site. This file documents the spec an asset must hit, the swap
procedure, and which routes need re-testing after the swap.

The third placeholder asset that USED to be required, `product.usdz`, is
no longer needed — AR/kind-xi was removed from the starter in Phase 1.
It only becomes relevant again if a future project explicitly opts into
`R11_ar_gate` (see `schemas/router.json`).

---

## 1. `poster.jpg` — fallback poster for kind-ii / kind-iii / kind-ix hero scenes

### Purpose
`<model-viewer>` and canvas/WebGL heroes use a 2D poster image as their
LCP element and reduced-motion fallback. The placeholder is a single-color
`color.bg` rectangle with a `color.primary` ellipse — the cheapest possible
"looks like a real image" content for tests to assert against.

### Spec for production
| Property | Requirement | Why |
|---|---|---|
| Aspect ratio | **16:9** (1920×1080 native, or proportional) | Hero canvas containers are 100vw × ~100vh; mismatch causes layout shift on LCP |
| File format | **JPEG** (`.jpg`) AND optionally **WebP** (`.webp`) | `<model-viewer>` and `<picture>` prefer WebP for Chromium browsers; JPEG fallback for older Safari |
| File size | **≤ 200 KB** per format | Hero LCP target: < 2.5s on 4G; > 200 KB regresses LCP on slow networks |
| Dimensions | **≥ 1920×1080**, ideally **2x DPR (3840×2160)** for retina | Hero spans full viewport on 4K monitors |
| Color space | **sRGB** | All browsers assume sRGB; P3 source will display washed-out on non-P3 displays |
| Subject | The product / hero subject, centered or rule-of-thirds | Avoid text in the image (no a11y story; copy lives in the DOM) |
| Compression | **Mozaic / Guetzli / libjpeg -quality 82** | Visually lossless at hero distance; smaller files |
| Validation | Open in PIL/Pillow + assert width/height/format/size; render in Lighthouse and assert LCP element tag is `IMG`, not `CANVAS` | CC6 forbidden pattern: canvas as LCP element |

### Swap procedure
```bash
# 1. Place new asset in the public/ dir
cp /path/to/real-poster.jpg kit/dossier-agent-kit/dossier-agent-kit/starters/nextjs-gsap-lenis/public/poster.jpg

# 2. Optionally add WebP variant
cwebp -q 82 kit/dossier-agent-kit/dossier-agent-kit/starters/nextjs-gsap-lenis/public/poster.jpg \
       -o kit/dossier-agent-kit/dossier-agent-kit/starters/nextjs-gsap-lenis/public/poster.webp

# 3. Verify dimensions and file size
python3 -c "from PIL import Image; im=Image.open('.../poster.jpg'); print(im.size, im.format, len(open('.../poster.jpg','rb').read()))"

# 4. Rebuild + boot server + assert LCP element is IMG (not CANVAS)
cd kit/dossier-agent-kit/dossier-agent-kit/starters/nextjs-gsap-lenis
npm run build && npm start &
curl -s http://localhost:3000/ | grep -E '<img[^>]+poster' && echo OK
```

### Routes that must be re-tested after swap
- `/` (home — kind-ix ambient canvas behind hero; poster is the LCP)
- `/product` (kind-ii 3D scene; poster is the LCP for `<model-viewer>`)
- `/shader-demo` (kind-iii shader; poster is the no-WebGL fallback)
- Any route that mounts `components/AmbientCanvas.tsx` or `<Canvas>` from R3F

### Tests that assert on `poster.jpg`
- `tests/kind-ii.spec.ts` — asserts `<model-viewer poster="...">` resolves
- `tests/kind-iii.spec.ts` — asserts reduced-motion fallback uses poster (no RAF-driven canvas)
- `tests/forbidden-patterns.spec.ts` (CC6) — asserts `largestContentfulPaintElement.tagName !== 'CANVAS'`

---

## 2. `product.glb` — 3D model for kind-ii

### Purpose
`<model-viewer>` and R3F scenes load a `.glb` to render the hero 3D object.
The placeholder is a real 8-vertex/12-triangle cube with a PBR material —
the smallest valid glTF binary that parses with `GLTF2().load_binary()`.

### Spec for production
| Property | Requirement | Why |
|---|---|---|
| File format | **glTF 2.0 binary** (`.glb`) | Single-file, no external texture deps; parses in `<model-viewer>`, three.js, R3F, Babylon.js |
| File size | **≤ 5 MB** | kinds.json `min_viable_condition` for kind-ii: `has_3d_asset == true AND asset <= 5MB glTF`; > 5MB violates router constraint and triggers preloader (R7) |
| Triangle count | **≤ 50,000 tris** | Mobile GPUs start to choke > 100k; 50k leaves headroom for shadows + post |
| Texture count | **≤ 4 textures**, total **≤ 4 MB** (basis-u/KTX2 strongly preferred) | Each texture = GPU upload; mobile devices cap at ~8 simultaneous |
| Texture size | **≤ 2048×2048** per texture | Larger wastes memory on devices that can't render the difference |
| Materials | **PBR Metallic-Roughness** (not Phong/Specular-Glossiness) | Modern default; matches `<model-viewer>` and three.js stock |
| Coordinate system | **Y-up, +Z forward, meters** | glTF spec; mismatched systems cause silent 90° rotation bugs |
| Animation | If animated, baked into the `.glb` (not a separate `.json`) | Single-file constraint; anims in separate files need manual wiring in `<model-viewer>` |
| Validation | `gltf-validate` returns clean (zero errors, zero warnings); `GLTF2().load_binary()` parses successfully | The kit's existing round-trip check is in `public/ASSETS_README.md` |
| License | **CC0 / CC-BY / your own IP** — NOT a marketplace model with per-file terms | License wall: see `07_license_posture.md` |

### Swap procedure
```bash
# 1. Validate the source GLB before placing
npx --yes @gltf-transform/cli validate /path/to/source.glb

# 2. Draco / Meshopt compression if needed (typically halves file size)
npx --yes @gltf-transform/cli optimize /path/to/source.glb --compress draco --texture-compress webp

# 3. Place in public/
cp /path/to/optimized.glb kit/dossier-agent-kit/dossier-agent-kit/starters/nextjs-gsap-lenis/public/product.glb

# 4. Verify size + structure
python3 -c "
import pygltflib
g = pygltflib.GLTF2().load('.../product.glb')
print('meshes:', len(g.meshes), 'accessors:', len(g.accessors), 'buffers:', len(g.buffers))
print('size:', __import__('os').path.getsize('.../product.glb'), 'bytes')
"

# 5. Rebuild + boot + assert HTTP 200 + correct Content-Type
cd kit/dossier-agent-kit/dossier-agent-kit/starters/nextjs-gsap-lenis
npm run build && npm start &
curl -sI http://localhost:3000/product.glb | grep -E 'Content-Type: model/gltf-binary'
```

### Routes that must be re-tested after swap
- `/product` (kind-ii — primary)
- `/` (home — only if the home hero uses the same model; the golden trace SaaS example does NOT, it uses ambient canvas only)
- Any new route that uses `<model-viewer src="/product.glb">` or `<Canvas>` from R3F

### Tests that assert on `product.glb`
- `tests/kind-ii.spec.ts` — asserts the model loads + renders within budget
- `tests/forbidden-patterns.spec.ts` (CC6) — asserts canvas not the LCP
- Visual: open `/product` and confirm model renders without console errors

---

## 3. What does NOT need a `product.usdz` anymore

As of Phase 1 cleanup, the AR component, the `/ar-demo` route, and the
`kind-xi.spec.ts` Playwright test are all removed. `product.usdz` is no
longer referenced anywhere in the starter. It only becomes relevant if a
future project explicitly opts into `R11_ar_gate`:

```json
{
  "site_type": "product_ecommerce",
  "explicit_user_request_for_ar_quicklook": true,
  ...
}
```

If a future project does opt in, the spec for `product.usdz` is:
- Same model as `product.glb` (K11-1 forbidden pattern)
- Generated via Apple's `xcrun usdz_converter` on macOS or Reality Converter
- ≤ 5 MB (kinds.json router constraint, same as GLB)
- Validated by opening in Safari iOS Quick Look on a real device

There is **no open-source writer** for USDZ. Apple tooling is the only
production path.

---

## 4. Manual asset-prep checklist (when swapping)

```bash
# 1. poster validation
python3 -c "from PIL import Image; im=Image.open('public/poster.jpg'); assert im.size[0] >= 1920 and im.size[1] >= 1080; assert im.format == 'JPEG'; assert __import__('os').path.getsize('public/poster.jpg') <= 200_000"

# 2. product.glb validation
python3 -c "
import pygltflib
g = pygltflib.GLTF2().load('public/product.glb')
assert len(g.meshes) >= 1, 'no meshes'
assert len(g.buffers) >= 1, 'no buffers'
sz = __import__('os').path.getsize('public/product.glb')
assert sz <= 5_000_000, f'oversized: {sz} bytes'
print('OK', len(g.meshes), 'meshes,', sz, 'bytes')
"

# 3. Run full smoke
npm run build && npm start &
sleep 5
curl -fsS http://localhost:3000/ -o /dev/null -w 'home: %{http_code}\n'
curl -fsS http://localhost:3000/product -o /dev/null -w 'product: %{http_code}\n'
curl -fsS http://localhost:3000/product.glb -o /dev/null -w 'glb: %{http_code}\n'
curl -fsS http://localhost:3000/poster.jpg -o /dev/null -w 'poster: %{http_code}\n'
```

If all four lines return `200` and the validation steps above pass, the
asset swap is complete and the kit is ready for production deployment.
