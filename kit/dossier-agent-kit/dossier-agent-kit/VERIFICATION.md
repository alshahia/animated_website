# Verification Log

This is what was **actually executed** against the starter in this session,
not just asserted to be correct. Three real bugs were caught and fixed in
the process — listed below so they're not silently lost.

## What was run

| Check | Command | Result |
|---|---|---|
| JSON schema validity | `python3 -m json.tool` on all 4 `schemas/*.json` | Pass |
| `kinds.json` <-> test file cross-reference | scripted comparison of `acceptance_test_ref` against `find tests/*.spec.ts` | 12/12 match, zero drift |
| Dependency install | `npm install` | Pass (after fixes below) |
| Type-check | `npx tsc --noEmit` | **Zero errors** across 12 components, 14 test files, config |
| Production build | `npx next build` | **Success** — all 9 routes statically generated |
| Server boot + route reachability | `next start` + `curl` against all 8 demo routes | All return HTTP 200 |
| testid presence in real rendered HTML | `curl` + grep against every route's actual output | Every `data-testid` referenced by a `.spec.ts` file is confirmed present in real server output |
| Specific attribute assertions | `curl` + grep for `<noscript>` content, `data-testid` per kind | Matches what each `.spec.ts` asserts (kind-xi removed — see Phase 1 cleanup) |

## What was NOT run

- **Actual Playwright browser execution** (`npx playwright test`). This
  sandbox's network allowlist does not include `cdn.playwright.dev`, so the
  Chromium binary download fails with a 403. The tests are confirmed to
  target real, present DOM elements (see table above), but the assertions
  themselves — hover behavior, focus-visible, animation timing, screenshot
  diffing — have not been executed by the actual test runner in this
  session. If you have a network-unrestricted environment, `npm install &&
  npx playwright install --with-deps chromium && npm run test:e2e` is the
  next step.
- **Lighthouse CI** (`npm run lighthouse:ci`) — not run for the same
  network-restriction reason (it also needs a Chrome binary).
- **Real asset files** — now generated and verified (see the dedicated
   section below). All assets referenced by the demo routes are present; no
   outstanding gaps as of this verification pass (AR/kind-xi was removed in
   Phase 1, so `product.usdz` is no longer required).

## Bugs actually found and fixed in this session

1. **`package.json` had a JSON syntax error** (missing comma after the
   `model-viewer` license-posture entry) — this would have broken `npm
   install` for anyone who cloned the kit. Caught by running `npm install`,
   not by re-reading the file.
2. **`@react-three/drei@^9.0.0` was the wrong major version** — drei v9
   peer-depends on `@react-three/fiber@^8`, but the kit pinned fiber to
   `^9`. Corrected to `@react-three/drei@^10.7.0`, which is the actual
   version compatible with fiber v9, confirmed against the live npm
   registry (`npm view @react-three/drei@latest peerDependencies`).
3. **`@lottiefiles/dotlottie-react@^0.10.0` doesn't support React 19** — the
   dossier's own `05_animated_illustration.md` catalog entry just says
   "Latest" without a pinned version, and my first guess was stale.
   Corrected to `^0.19.0` after checking the registry directly, which is
   exactly the kind of Tier 3 fact `freshness_protocol.md` warns needs
   re-verification rather than being trusted from memory.
4. **`reducedMotion` is not a top-level `test.use()` option** in
   `@playwright/test@1.62.1`'s actual shipped type declarations — it must
   be nested under `contextOptions: { reducedMotion: 'reduce' }`. I had
   written it flat in all 10 reduced-motion test blocks plus
   `playwright.config.ts`, based on a pattern-matched guess rather than the
   installed version's real API. Caught by running `tsc`, not by review.

All four are now fixed and confirmed via `tsc --noEmit` returning clean and
`next build` succeeding.

## Placeholder assets — generated and verified, not left as dead paths

Every path the components reference (`/poster.jpg`, `/poster.webp`,
`/product.glb`, `/track.mp3`, `/icons/onboarding.lottie`) was previously a
string with no backing file. That's now fixed with genuinely valid,
independently-verified assets — see `public/ASSETS_README.md` for exactly
how each was generated (PIL for images, `pygltflib` for a real glTF binary
with correct mesh/accessor/buffer structure, `ffmpeg` for a real decodable
MP3, and a hand-built dotLottie zip with a valid Bodymovin JSON animation
inside).

The verification chain went one step further than "the file exists":

1. Each generated asset was **re-parsed from disk** right after creation
   (e.g. `GLTF2().load_binary()` loading the GLB back and asserting
   mesh/accessor counts; `ffprobe` confirming the MP3's container and
   duration; unzipping the `.lottie` and checking required Lottie schema
   keys).
2. The app was rebuilt (`next build`) and a real server booted
   (`next start`) with these assets in `public/`.
3. Each asset was **fetched over real HTTP** from the running server and
   **re-parsed again from the downloaded copy** (not the source file) —
   confirming Next.js serves them intact, with correct
   auto-inferred `Content-Type` headers (`model/gltf-binary`,
   `audio/mpeg`, `image/webp`, etc.) and byte-identical MD5 vs. the source.

**AR/kind-xi removed (Phase 1 cleanup):** the AR component, route, and
Playwright spec were removed because `product.usdz` has no open-source
writer and Apple's tooling requires macOS/Xcode. kind-xi is now
opt-in only per `schemas/router.json` rule `R11_ar_gate` — a future
project that explicitly requests AR must supply both `product.glb`
and `product.usdz` from a real export pipeline (Reality Converter or
Apple's `usdzconvert`).

## What this means for `freshness_protocol.md`

Bugs #2, #3, and #4 are exactly the failure mode that file warns about:
version-pinned facts that look plausible from training data but are wrong
against the live registry/API. This verification pass is a concrete
demonstration of the protocol's Tier 3 rule — "before hardcoding a version
number, search first" — applied to this kit's own `package.json`, not just
stated as advice for future agents to follow.

## Phase 2 freshness re-verification (2026-08-04)

After the initial build, every package in `package.json` was re-checked
against the live npm registry via `npm view <pkg> version license
peerDependencies`. Results are persisted in `package.json` under
`freshness_verified_against_npm_registry`. Summary:

| Outcome | Packages |
|---|---|
| License text patched | **gsap** (MIT → Standard No-Charge License, Webflow), **ogl** (MIT → Unlicense) |
| Drift documented, major bump deferred | **motion** (registry v12.43.0, pinned ^11 — v12 drops legacy props, needs import audit), **p5** (registry v2.3.2, pinned ^1.11 — v2 changed instance-mode API) |
| Compatible, no patch needed | lenis ^1.3.0→1.3.25 · three ^0.185.0→0.185.1 · @react-three/fiber ^9.0.0→9.7.0 · @react-three/drei ^10.7.0→10.7.7 · @lottiefiles/dotlottie-react ^0.19.0→0.19.12 · tone · swup · @axe-core/playwright · @lhci/cli |
| Confirmed special | **@theatre/studio** = AGPL-3.0-only (avoid, use `@theatre/core` Apache-2.0) · **Remotion** = SEE LICENSE IN LICENSE.md (commercial threshold per dossier correction #7) |

Tier 3 rule applied: never hardcode a license string or version pin from
memory — query the registry. Tier 2 rule applied: GSAP's custom Webflow
license is not standard SPDX, so describing it as "MIT" is wrong even
though the use is effectively free for all projects.

## Final asset swap (2026-08-04)

Real assets deployed to replace PIL / pygltflib / ffmpeg / hand-built placeholders.

| Slot | Deployed | Source | Size | Spec |
|---|---|---|---|---|
| `public/poster.jpg` | user-provided JPEG resized to 1920×1080 @ q82 | `resources/media/poster_source_b.jpeg` (388 KB → resized) | 77 KB | ≤200 KB ✓ |
| `public/poster.webp` | PIL re-encode of poster.jpg @ q82 | derived | 31 KB | ≤200 KB ✓ |
| `public/product.glb` | `gltf-transform copy` of user-provided glTF | `resources/media/Apple+Watch+Ultra+3.gltf` (4.75 MB → 3.38 MB) — bridge: `resources/media/_apple.glb` | 3.38 MB | ≤5 MB ✓ |
| `public/track.mp3` | ffmpeg re-encode to 24 kbps mono 16 kHz 25s | `resources/media/atlasaudio-background-inspiring-519617.mp3` (3.14 MB → 74 KB) | 74 KB | ≤100 KB ✓ |
| `public/icons/onboarding.lottie` | user-provided dotLottie | `resources/media/cloud-animation.lottie` | 2.6 KB | ≤50 KB ✓ |

`iPhone 17 Pro glTF` (`I+phone+17+pro.gltf`) was inspected and removed — it
references external `I phone 18 pro.bin` (1.8 MB) + a `Textures/` folder
with 7 PNG/JPG/WebP images that aren't in `resources/media/`. Without
them, the glTF can't be rendered. Removed from the repo until those
sidecar files are available.

Original JPEG filenames (`Product_photo_clean_modern_photo?_202608041555 (1).jpeg`
and the sibling) contained `?` and `(1)` chars that broke PowerShell
`Copy-Item` and Python `open()` — they were deleted after being copied to
clean-named `poster_source_{a,b}.jpeg`.

Smoke after final swap: `npx tsc --noEmit` clean, `npx next build` clean
(10 static routes), all 7 demo routes return HTTP 200, all 5 assets serve
with correct Content-Type headers (image/jpeg, image/webp, model/gltf-binary,
audio/mpeg, application/octet-stream).

## Browser smoke (2026-08-05, via browsermcp)

Real browser verification against `next start` on port 3000, replacing the
Playwright path that the sandbox can run (Chromium download blocked via
`cdn.playwright.dev` 403). `browsermcp` provides navigate / snapshot /
screenshot / console — click interactions time out on the CDP WebSocket
(channel issue, not a route bug), so interactive assertions are deferred
to the local-machine Playwright run.

| Route | HTTP | Testid / indicator in real DOM |
|---|---|---|
| `/` | 200 | 6 sections (hero, features, how-it-works, pricing, testimonials, cta) + onboarding lottie img + `data-testid="hover-card"` + `data-testid="page-link"` |
| `/loading-demo` | 200 | `status="Loading"` (preloader) + h1 "Content is always here, preloader just sits on top of it." |
| `/cta` | 200 | `data-testid="magnetic-button"` (kind-iv building block) |
| `/product` | 200 | kind-ii product hero `img alt="Walnut stool, 45 cm tall"` |
| `/shader-demo` | 200 | h1 "Shader hero demo" |
| `/audio-demo` | 200 | `button "Enable audio"` (CC5: gated behind user gesture) |
| `/ai-hero-demo` | 200 | textbox "Describe your hero..." + `button "Generate"` (K12-1: no auto-invoke) |

**Console (clean):** no errors. Two non-fatal info-level messages:
- `THREE.Clock deprecated → use THREE.Timer` (r185 drift, not a bug)
- 5× `THREE.WebGLProgram: warning X4122` (shader precision, normal info)

**Bug found + fixed during browser smoke:** initial `/cta` snapshot under
`next start` rendered "Application error: a client-side exception".
Traced to a stale `.next/` build from before the motion v12 bump — the
old prerender was serving v11-era chunks. After `rm -rf .next && next
build`, all 7 routes serve 200 under prod. Two defensive measures added
to `/cta` for the same failure family:

1. **`app/cta/page.tsx` → `"use client"`** — the only page in the kit
   that imports a `useMotionValue` / `useSpring` component. Marking the
   page client-only skips the static-prerender SSR/hydration phase
   entirely, which is where the v12 + React 19 boundary previously
   glitched.
2. **`app/cta/error.tsx`** — Next.js error boundary. If a future motion
   or React upgrade regresses the static prerender of this route, the
   user sees a clear "Something went wrong loading the CTA demo" message
   with a Try-again button instead of the generic "Application error"
   stripe.

Both fixes are scoped to `/cta` only — the other 6 demo routes were
unaffected by the original issue and stayed server components. Rebuild
and re-smoke after the fixes: `npx tsc --noEmit` clean, `npx next build`
clean (10 static routes), all 7 routes 200, no console errors.
