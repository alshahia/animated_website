# Final Expected Vision — Animated-Website Generator

Generated as the target state to validate against when work is finished. Pair with `kit/USAGE_GUIDE.md` (how to get there) and `kit/CLEANUP_LIST.md` (what to remove).

---

## The target

After applying `kit/USAGE_GUIDE.md` and `kit/CLEANUP_LIST.md`, the animated-website generator has:

### 1. A clean, deterministic kit
- [x] No shell-glob garbage folders (Phase 1: `{schemas,starters/nextjs-gsap-len is/` deleted — 8 empty subdirs gone)
- [x] No placeholder assets in production paths (poster.jpg, product.glb swapped for real assets in final asset swap; product.usdz no longer required since AR route was dropped)
- [x] No fake CDN URLs in templates (Phase 1 sweep found none in deepseek_flash — cdnjs paths and `*.github.io` real-repo URLs are valid)
- Any agent (human or AI) can answer "what kinds does this site need?" by running `schemas/router.json` (R1–R12) — not by guessing.
- The repo is navigable: `kit/dossier-agent-kit/dossier-agent-kit/{schemas,starters,examples}/` is the only thing under `kit/` that matters for new work.

### 2. A reusable production starter
- `starters/nextjs-gsap-lenis/` scaffolded with real components (12), tests (14), routes (10 — was 11, /ar-demo removed in Phase 1), CI, Lighthouse config — already wired.
- Per-kind files added from `resources/animated_website_minimax_3/03_build_guides/` slot in without rewiring the build chain.
- [x] AR route dropped (Phase 1) — no silent 404 on `product.usdz`.
- [x] `/cta` hardened with `"use client"` + `error.tsx` boundary (2026-08-05) — defensive against motion v12 + React 19 SSR/hydration edge cases.

### 3. A governed motion system
- Every animation uses one of the 95 named tokens (duration 7, easing 6, distance 6, delay 4, limit 3 + color/typography/spacing/etc.).
- Respects `@media (prefers-reduced-motion: reduce)`.
- Stays under the 3 budget caps: **concurrent=8, ambient-loops=2, full-viewport-scenes=1**.
- Passes the 10 cross-cutting anti-patterns (CC1–CC10) + per-kind additions (K1-1…K12-2).

### 4. A license-clean stack
- No AGPL / GPL / Hippocratic surprises.
- No SaaS lock-in where ownership matters.
- No marketplace license ambiguity.
- The 6 watchlist items (`@theatre/studio`, Remotion, `animate.css`, Lottie marketplace, Rive/Spline editor cost, SaaS builders) caught at pick-time — not in legal review.

### 5. A single source of truth per concern
| Concern | Source of truth |
|---|---|
| Which kinds to build | `kit/dossier-agent-kit/dossier-agent-kit/schemas/router.json` |
| Per-kind engines + license + budget + A11y | `kit/dossier-agent-kit/dossier-agent-kit/schemas/kinds.json` |
| Conflicts + initialization order | `kit/dossier-agent-kit/dossier-agent-kit/schemas/composition_matrix.json` |
| Anti-patterns | `kit/dossier-agent-kit/dossier-agent-kit/schemas/forbidden_patterns.json` |
| Motion tokens | `resources/animated_website_minimax_3/06_motion_grammar.md` |
| License posture | `resources/animated_website_minimax_3/07_license_posture.md` |
| Known errors in source | `resources/animated_website_minimax_3/08_corrections_vs_source.md` |
| Freshness policy | `kit/dossier-agent-kit/dossier-agent-kit/freshness_protocol.md` |
| Worked example | `kit/dossier-agent-kit/dossier-agent-kit/examples/golden-trace-saas-marketing/TRACE.md` |
| Asset specs | `kit/ASSET_SPECS.md` |
| Sample validation | `kit/SAMPLE_VALIDATION.md` |

### 6. Project orientation (2026-08-05)
- [x] `README.md` opens with the animated-website generator pitch
- [x] `AGENTS.md` frames the animated-website project as the foreground, agents-manager as vendored
- [x] `agents_manager/AGENTS.md` holds the vendored controller's own context_gen
- [x] `INDEX.md` flipped from "two halves" to "the project + vendored tools"

---

## Net result by role

- **Founder (no-code path):** R1 in router → `02_resources/06_no_code_platforms.md` → ship in a day.
- **Junior dev:** Step 1 (corrections) → Step 7 (copy starter) → Step 5 (forbidden patterns as guardrails) → iterate without breaking the build chain.
- **Senior dev:** Step 2 (router) → Step 4 (conflicts) → Step 7 (scaffold only the components you need) → extend with new engines without violating budget or A11y guarantees.

One source of truth (router + kinds matrix + 95 tokens). Zero ambiguity on every future animated-website task this kit touches.

---

## Validation checklist (when work is "done")

Tick each before declaring the cleanup + workflow applied:

- [x] Shell-glob garbage folder deleted (verified empty pre-delete, 8 subdirs, 0 files)
- [x] `kit/poster.jpg` replaced with real asset (77 KB JPEG, 1920×1080 @ q82 from `poster_source_b.jpeg`)
- [x] `kit/product.glb` replaced with real model (3.38 MB GLB converted from `Apple+Watch+Ultra+3.gltf` via `gltf-transform copy`)
- [x] `kit/track.mp3` re-encoded to spec (74 KB, 24 kbps mono 16 kHz 25s)
- [x] `kit/icons/onboarding.lottie` swapped (2.6 KB from `cloud-animation.lottie`)
- [x] AR route dropped → `product.usdz` no longer required (Phase 1)
- [x] `resources/animated_website_minimax_2.7/` marked as DO-NOT-USE (USAGE_GUIDE.md, INDEX.md, CLEANUP_LIST.md all flag)
- [x] `cloudflare.com` / bare `github.io` CDN URLs in deepseek_flash — none found; cdnjs paths validated
- [x] `resources/animated_website_minimax_3/05_build_guides/` duplicate folder deleted (was empty)
- [x] `freshness_protocol.md` Tier 3 re-verification done (Phase 2 — all package.json deps queried against live npm registry; 2 license patches applied; 2 major-version drifts documented for follow-up)
- [x] Router output verified on 1 brief per site_type → `kit/SAMPLE_VALIDATION.md` (6 traces: marketing_landing, portfolio, product_ecommerce, editorial_longform, saas_app_marketing, docs_or_blog)
- [x] `TRACE.md` worked example still passes (Phase 5: tsc clean, next build clean 10 routes, all assets serve correct Content-Type, all 7 demo routes HTTP 200)
- [x] `iPhone 17 Pro glTF` removed — incomplete (missing external `.bin` + `Textures/`)
- [x] `kit/ASSET_SPECS.md` §5 LLM generation prompts added (4 prompts + common prefix)
- [x] `@gltf-transform/{cli,functions,extensions,core}` devDeps added
- [x] `/cta` defensively hardened with `"use client"` + `error.tsx` (2026-08-05)
- [x] Browser smoke via `browsermcp` documented in `kit/VERIFICATION.md` (all 7 routes 200, no console errors)
- [x] Docs re-oriented: animated-website project is the foreground, agents-manager is vendored (2026-08-05)

When every box is ticked, this work is done.
