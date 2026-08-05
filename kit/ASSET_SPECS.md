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

---

## 5. LLM-suitable generation prompts (drop-in)

Copy-paste any of the four prompts below directly into Midjourney / Flux /
DALL-E 3 / Tripo3D / Meshy / Suno / etc. Each prompt is self-contained,
includes the technical constraints from sections 1–4 above, and is tuned
for a specific generator family.

### 5.1 `poster.jpg` + `poster.webp` — Hero poster image

**Generators:** Midjourney v6 · Flux Pro · DALL-E 3 · SDXL · Ideogram
**Use:** LCP element + reduced-motion fallback for canvas / WebGL /
`<model-viewer>` heroes

```
PRODUCT PHOTO — HERO POSTER IMAGE
16:9 aspect ratio, 1920×1080 native (or 3840×2160 for 2x DPR).
Final output: JPEG ≤200 KB, plus WebP ≤200 KB via cwebp -q 82.

Subject: the product, centered, eye-level, ~60% of frame.
Background: subtle radial gradient (#FAFAFA center → #ECECEC edges),
no busy patterns — the background MUST stay calm so copy and CTAs
painted on top remain readable.
Lighting: soft three-point studio (key 45° camera-left, fill 30%
camera-right, rim from above-back). No harsh shadows.
Style: clean modern product photography, no stock-photo smiles,
no people, no text in the image (copy lives in the DOM).
Color: brand-neutral. Saturated primary color (#2E5BFF or your
brand primary) on the product, neutral grays elsewhere.
Mood: confident, premium, calm. Apple-product-photography energy.

Hard constraints:
- No text, no watermarks, no logos baked into pixels
- No people, no hands, no models holding the product
- Subject must remain recognizable at 480px wide (mobile)
- sRGB color space, Mozaic/Guetzli-equivalent compression
- Avoid pure white background (causes layout flicker on iOS Safari)

Validation: PIL opens, dimensions ≥1920×1080, format JPEG,
file size ≤200,000 bytes. Then run cwebp -q 82 to produce
the WebP variant.

Negative prompt (if your generator supports it):
text, watermark, logo, signature, frame, border, collage,
screenshot, blurry, low-resolution, illustration, anime,
cartoon, painting, oversaturated, dark background,
cluttered background, person, hand, model.
```

Quick test after generation:

```powershell
python3 -c "from PIL import Image; im=Image.open('poster.jpg'); assert im.size[0]>=1920 and im.size[1]>=1080; assert im.format=='JPEG'; import os; assert os.path.getsize('poster.jpg')<=200000; print('OK',im.size)"
```

### 5.2 `product.glb` — 3D model for kind-ii hero

**Generators:** Tripo3D · Meshy AI · Genie (Luma) · CSM · Rodin · Hunyuan-3D
**Use:** Mounted in `/product` route via `<model-viewer>` + R3F `<Canvas>`
with auto-rotate + OrbitControls

```
3D MODEL — SINGLE-FILE GLB FOR WEB
Final output: glTF 2.0 binary (.glb) ≤5 MB.
Target consumer: <model-viewer> web component + Three.js r185+
via @react-three/fiber.

Subject: [YOUR PRODUCT HERE — e.g., "walnut stool, 45cm tall,
modern Scandinavian design, three tapered legs"].
Style: clean PBR, product-viz quality, no stylized/cartoon look.
Coordinate system: Y-up, +Z forward, units in METERS (1 unit = 1m).
Real-world scale: the product's actual physical size in meters.

Hard technical constraints:
- Triangle count: ≤50,000 (mobile-safe)
- Textures: ≤4 total, each ≤2048×2048, total texture payload ≤4 MB
- Materials: PBR Metallic-Roughness ONLY (NOT Phong,
  NOT Specular-Glossiness)
- No external texture references — bake everything into the .glb
- If animated: bake animations INTO the .glb (no separate .json)
- License: CC0, CC-BY, or your own IP — no marketplace models
  with per-file license terms

Generate + optimize pipeline:
1. Generate at highest quality your tool allows
2. Export as .glb (NOT .gltf + textures separately)
3. Run gltf-transform optimize: --compress draco
   --texture-compress webp
4. Validate with: npx @gltf-transform/cli validate
5. Round-trip parse with pygltflib to confirm:
   meshes≥1, accessors≥1, buffers≥1, size≤5,000,000 bytes

Lighting context the renderer will use (inform generator):
studio environment HDRI, soft directional key + ambient,
no harsh shadows, neutral white background by default
(renderer sets background via CSS, not the model).
Camera default: position [0, 0, 3], fov 45°, looking at origin.

What to avoid:
- Excessive subdivision (smooths over design intent)
- Procedural textures (won't survive glTF export)
- Animations that require external controllers
- Materials with transmission >0 (needs IBL — works but heavier)
- Models larger than 5 MB (router rejects, triggers preloader)
```

Quick test after generation:

```powershell
python3 -c "
import pygltflib, os
g = pygltflib.GLTF2().load('product.glb')
sz = os.path.getsize('product.glb')
assert sz <= 5_000_000, f'oversized: {sz}'
assert len(g.meshes) >= 1
assert len(g.buffers) >= 1
print('OK', len(g.meshes), 'meshes,', sz, 'bytes')
"
npx @gltf-transform/cli validate product.glb
```

### 5.3 `track.mp3` — Background audio for kind-x visualizer

**Generators:** Suno v3.5 · Udio · Stable Audio
**Use:** Background track analyzed by Tone.js + Web Audio API for the
`/audio-demo` visualizer

```
BACKGROUND AUDIO TRACK — LOOPING, NO VOCALS
Final output: MP3 ≤100 KB, 30–60 seconds, mono or stereo.

Style: instrumental only. Cinematic ambient / minimal electronic /
downtempo. Reference mood: Tycho, Bonobo, Four Tet, Ólafur Arnalds.
Tempo: 80–110 BPM (slow enough that visualizer bars are readable,
not so slow it sounds dirge-like).
Energy arc: gentle build over 30s → soft peak → 10s release → loop
seamlessly (start and end must match within ±50ms).
Instrumentation: synth pads, light piano/keys, subtle bass pulse,
no drums (drums cause visualizer to spike distractingly), no vocals.
Frequency profile: bass <120Hz moderate, mids 200–2000Hz prominent
(where the bars live), highs airy but not piercing.

Hard constraints:
- Total duration 30–60 seconds (visualizer loops; longer is wasteful)
- Loop-point: bar 1 must equal the last bar (seamless loop)
- File size ≤100 KB (8 kbps mono at 60s = 60 KB headroom)
- No samples, no covers, no copyrighted melodies
- License: original work or CC0/CC-BY for the demo

Validate: ffprobe confirms valid MP3 container, correct duration,
no clipping (peak amplitude < -1 dBFS).

Negative prompt (if supported):
vocals, lyrics, drums, percussion, beat, aggressive, distorted,
loud, harsh, busy, complex arrangement, orchestral, choir,
spoken word, podcast, news, interview, dialogue.
```

Quick test after generation:

```powershell
ffprobe -v error -show_entries format=duration,bit_rate -show_entries stream=codec_name,sample_rate -of default=nw=1 track.mp3
# Expected: codec_name=mp3, duration≈30-60, bit_rate≈64-128k
```

### 5.4 `onboarding.lottie` — Animated illustration for kind-v

**Generators:** Manual in After Effects + Bodymovin, or LottieFiles editor.
**AI assistance:** Genmo (Replicate) · Krea · Runway for initial motion
concept → rebuild as Lottie.
**Use:** Loading-state illustration on `/loading-demo`, mounted via
`<dotlottie-react>` with `autoplay` toggle.

> Lottie animations are vector-based, hand-authored. Pure prompt-to-Lottie
> generation is rare. The practical workflow is: AI-assist the concept,
> then hand-author the vector animation.

```
ANIMATED ILLUSTRATION CONCEPT (for AI-assisted concepting)
Final output: dotLottie (.lottie) ≤50 KB.
Format: zip containing manifest.json + a Bodymovin/Lottie JSON
animation. Top-level keys required: v, fr, ip, op, w, h, layers.

Concept: a friendly onboarding animation, ~2–4 second loop,
showing a hand-drawn product icon (e.g., a stylized leaf, rocket,
or your product's mark) gently floating up-and-down with a soft
scale pulse on entry.

Visual style:
- Stroke-based vector illustration (no fills, or one solid color fill)
- 2–3 colors maximum (primary brand color, neutral, white background)
- Rounded corners, soft edges, friendly tone
- No text, no logos baked in
- Pixel-perfect at 240×240 viewport

Motion spec (loop-able):
- Frame rate: 30 fps
- Duration: 2.4s = 72 frames (or 3s = 90 frames)
- Intro: 0–0.4s, scale 0.6 → 1.0 with ease-out
- Hold: 0.4–2.0s, gentle vertical drift ±8px with sine easing
- Outro: 2.0–2.4s, opacity 1 → fade back to 1 (loop point)
- Loop seamlessly: frame 0 == frame 72 visually

Authoring pipeline:
1. Generate concept frames via Krea or Runway (still images of
   the animation keyframes)
2. Rebuild as vector in Figma or After Effects
3. Animate with Bodymovin plugin → export .json
4. Bundle into .lottie via @lottiefiles/dotlottie-web CLI:
   npx dotlottie-cli bundle animation.json --output onboarding.lottie
5. Validate: unzip + check manifest.json schema + Lottie top-level keys

Hard constraints:
- One shape layer or one shape group (not 50 layers)
- No expressions (Bodymovin can't export them)
- No effects/blend modes that don't survive Bodymovin export
- No raster layers (everything vector)
- License: original, or CC0/CC-BY for the demo
  (NEVER marketplace Lottie files — per-file license terms)

Reduced-motion behavior (per kinds.json):
autoplay=false, render first frame only — the spec already handles
this in code, but design the first frame so it's a valid
"resting" state, not mid-animation.
```

Quick test after generation:

```powershell
# Validate zip structure
Expand-Archive "onboarding.lottie" -DestinationPath _lottie_check -Force
Get-Content _lottie_check\manifest.json
Get-Content _lottie_check\animation.json | Select-String -Pattern '"v"|"fr"|"ip"|"op"|"w"|"h"|"layers"'
```

### 5.5 Common prefix — append to any prompt

```
CONSTRAINTS (apply to every generation):
- Production use, not decorative. Will be deployed on a live site.
- No watermarks, no signatures, no "AI-generated" disclaimers.
- Optimized for web delivery (file size, format, viewport fit).
- License must be transferable to the project owner.
- If the brief is ambiguous, pick the simplest, most boring option
  that meets the technical spec. Save creative flourishes for
  a separate revision pass.
```
