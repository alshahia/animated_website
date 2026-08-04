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
