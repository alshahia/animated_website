# Placeholder assets in this directory

Every asset here was generated in-session and structurally validated
(round-tripped through a parser, not just "written without error"). They
exist so the demo routes render real content instead of broken image/model
icons, and so the Playwright specs have something real to assert against.
None of these are production-quality — replace them before shipping.

| File | How it was generated | Validation performed |
|---|---|---|
| `poster.jpg`, `poster.webp` | PIL, solid `color.bg` background + `color.primary` ellipse | Opened and re-saved successfully by PIL |
| `product.glb` | `pygltflib`, a real 8-vertex/12-triangle cube with a PBR material using `color.primary` | Loaded back with `GLTF2().load_binary()`, structure asserted (mesh/accessor/buffer counts, attribute indices) |
| `track.mp3` | `ffmpeg`, two mixed sine tones (220Hz + 330Hz) at low volume, 8s | `ffprobe` confirmed valid MP3 container, correct duration |
| `icons/onboarding.lottie` | Hand-built dotLottie zip: `manifest.json` + a genuine Bodymovin/Lottie JSON (one shape layer, keyframed scale) | Unzipped and re-parsed; manifest schema and required Lottie top-level keys (`v`, `fr`, `ip`, `op`, `w`, `h`, `layers`) checked |

## AR / kind-xi removed from starter

The AR component, route, and Playwright spec were removed (see
`kit/CLEANUP_LIST.md` Phase 1). kind-xi is now opt-in only per
`schemas/router.json` rule `R11_ar_gate`. No `product.usdz` is required
because no demo uses it. If a future project requests AR Quick Look, the
agent must generate both `product.glb` and `product.usdz` from a real
pipeline (Apple `usdzconvert` on macOS, or Reality Converter) — USDZ has
no open-source writer.
