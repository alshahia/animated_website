# Cleanup & "Do Not Use" List — animated-website generator

Concrete hygiene for the animated-website generator's working set (`kit/` + `resources/`). The agent that produces animated websites reads these files; keep them clean. `agents-manager/` is vendored and outside this list's scope.

Two categories:
- **A. DELETE / REPLACE** — concrete filesystem actions
- **B. DO NOT USE** — informational; do not consume in new work

---

## Status (post-Phase 1 cleanup pass + final asset swap)

| # | Item | Status |
|---|---|---|
| 1 | Shell-glob garbage folder `{schemas,starters/nextjs-gsap-len is/` | **DELETED** — was 8 empty subdirs |
| 2a | `kit/poster.jpg` placeholder | **SWAPPED** — 77 KB JPEG / 31 KB WebP from `poster_source_{a,b}.jpeg` (1376×768 → 1920×1080 @ q82) |
| 2b | `kit/product.glb` placeholder cube | **SWAPPED** — 3.38 MB GLB converted from `Apple+Watch+Ultra+3.gltf` via `gltf-transform copy` (67 meshes, 113k tris, no textures, gray PBR) |
| 2c | `kit/product.usdz` | **No longer required** — AR/kind-xi removed |
| 3 | `resources/animated_website_minimax_3/05_build_guides/` empty duplicate | **DELETED** |
| 4 | Fake CDN URLs in deepseek_flash HTML templates | **None found** — cdnjs paths and `*.github.io` repos are real; corrections-file warning was about upstream scrape source, not these docs |
| 5 | AR component, page, test, model-viewer license entry | **REMOVED** — kind-xi now opt-in only (R11) |
| 6 | Schema updates (kinds.json, router.json) reflecting kind-xi manual-only | **DONE** |
| 7 | `track.mp3` re-encoded | **DONE** — 97 KB → **74 KB** (24 kbps mono 16 kHz 25s) — within ≤100 KB spec |
| 8 | `icons/onboarding.lottie` swapped | **DONE** — 692 B placeholder → 2.6 KB real dotLottie (`cloud-animation.lottie`) |
| 9 | `resources/media/I+phone+17+pro.{gltf,obj}` | **REMOVED** — glTF references missing external `.bin` + `Textures/` folder (unusable) |
| 10 | `@gltf-transform/{cli,functions,extensions,core}` devDeps | **ADDED** — needed for GLB conversion + validation |
| 11 | `kit/ASSET_SPECS.md` §5 LLM generation prompts | **ADDED** — 4 prompts (poster, glb, mp3, lottie) + common prefix |

Source media preserved in `resources/media/` (Apple Watch glTF/OBJ, 4 source MP3s, 2 source Lotties, 2 source JPEGs, converted `_apple.glb`).

---

## A. DELETE / REPLACE

### 1. Delete shell-glob garbage folders (DONE)
~~**Path:** `kit/dossier-agent-kit/dossier-agent-kit/{schemas,starters/nextjs-gsap-len is/`~~

Deleted in Phase 1. Historical note kept for context.

### 2. Production asset swap (DONE)
| File | Deployed | Source | Size | Spec |
|---|---|---|---|---|
| `kit/poster.jpg` | ✓ real | `resources/media/poster_source_b.jpeg` resized to 1920×1080 @ q82 | 77 KB | ≤200 KB ✓ |
| `kit/poster.webp` | ✓ real | PIL re-encode of poster.jpg @ q82 | 31 KB | ≤200 KB ✓ |
| `kit/product.glb` | ✓ real | `gltf-transform copy` of `Apple+Watch+Ultra+3.gltf` (bridge: `resources/media/_apple.glb`) | 3.38 MB | ≤5 MB ✓ |
| `kit/track.mp3` | ✓ real | ffmpeg re-encode of `atlasaudio-*.mp3` to 24 kbps mono 16 kHz 25s | 74 KB | ≤100 KB ✓ |
| `kit/icons/onboarding.lottie` | ✓ real | `resources/media/cloud-animation.lottie` | 2.6 KB | ≤50 KB ✓ |

**iPhone 17 Pro glTF** (`I+phone+17+pro.gltf`) was REMOVED — it referenced external `I phone 18 pro.bin` (1.8 MB) and a `Textures/` folder with 7 images that weren't in `resources/media/`. If you have those files, drop them in and we can re-convert + deploy the iPhone model.

**JPEG originals** with `?` and `(1)` chars were deleted; data preserved in `poster_source_{a,b}.jpeg`. (These filenames broke PowerShell `Copy-Item` and Python `open()` — renaming was the fix.)

### 3. Delete duplicate `05_build_guides/` folder (verify empty first)
**Path:** `resources/animated_website_minimax_3/05_build_guides/`

Likely duplicate of `03_build_guides/`. Verify it is empty / identical before deleting.

### 4. Remove placeholder CDN URLs in deepseek_flash HTML templates
**Path:** `resources/animated_website_deepseek_flash/` HTML files

Look for `<script src="https://cloudflare.com">` and bare `<script src="https://github.io">` references. These are scrape placeholders, not real endpoints. Either:
- Delete the demo HTML files entirely, or
- Replace with real CDN URLs (validate Tier 3 freshness per `freshness_protocol.md`)

---

## B. DO NOT USE — informational

### B1. Do not consume as canonical

| Item | Reason |
|---|---|
| `resources/animated_website_minimax_2.7/` | Pre-correction dossier — 8 known errors documented in `08_corrections_vs_source.md` (calls library "Framer Motion", treats GSAP as paid, no Three.js r185+ WebGPU, no Theatre AGPL flag, no Lenis repo move, no Remotion commercial threshold) |
| `cloudflare.com` / bare `github.io` script src URLs in any HTML template | Scrape placeholders, not real CDN endpoints |
| `https://*.github.io` script src URLs without a real path | Same — bare host is a placeholder, not a real CDN |

### B2. Do not put in production as-is

| Item | Reason |
|---|---|
| `kit/poster.jpg` | PIL placeholder, not production |
| `kit/product.glb` | Pygltflib placeholder cube, not real model |
| `kit/product.usdz` | File doesn't exist — AR demo will 404 |

### B3. Do not hardcode without re-verification (Tier 3 freshness)
- Package versions (npm/pip/maven)
- CDN URLs
- GitHub star counts / repo names (Lenis moved studio-freight → darkroomengineering)
- Browser support percentages
- SaaS pricing tiers

Per `kit/dossier-agent-kit/dossier-agent-kit/freshness_protocol.md` Tier 3.

### B4. Do not pick these libraries (license wall)
- `@theatre/studio` → AGPL-3.0 — use `@theatre/core` (Apache-2.0) instead
- Remotion at commercial scale → GPL-3.0 + threshold (1 FTE / EUR 1M revenue) — pay license or pick another
- `animate.css` → Hippocratic License — use MIT CSS animation alternatives
- Webflow / Framer / Wix / Squarespace / SVGator → SaaS subscription — no source ownership
- ThemeForest / TemplateMonster templates → marketplace license (per-template, read each)
- Lottie marketplace `.json` files → per-file license, read each
- Rive / Spline runtime + editor → editor is SaaS, plan total cost

### B5. Do not violate these anti-patterns (CC1–CC10 + per-kind)
- CC1: animate width/height/top/left/right/bottom/margin/padding (use transform/opacity)
- CC2: blanket `* { animation-duration: 0.01ms !important; }` (respect `@media (prefers-reduced-motion: reduce)` only)
- CC3: permanent `will-change` (apply during animation, remove after)
- CC4: RAF loop while `document.hidden`
- CC5: AudioContext without user gesture
- CC6: canvas/WebGL as LCP element
- CC7: missing `<noscript>` for canvas
- CC8: motion.limit.concurrent exceeded (cap = 8)
- CC9: modifier-click intercepted
- CC10: hover-only without `(hover: hover)` media query
- K1-1…K12-2: per-kind additions in `schemas/forbidden_patterns.json`

---

## Verification before deletion

For the shell-glob folder, run first to confirm emptiness + size:

```powershell
Get-ChildItem -LiteralPath 'E:\react_projects\animated_website\kit\dossier-agent-kit\dossier-agent-kit\{schemas,starters' -Recurse -Force |
  Select-Object FullName, Length |
  Format-Table -AutoSize
```

Expected output: zero rows = safe to delete.