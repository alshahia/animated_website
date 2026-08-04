# Sample Validation — 1 Brief per `site_type`

This file validates the router (`schemas/router.json`), the kind matrix
(`schemas/kinds.json`), the composition matrix
(`schemas/composition_matrix.json`), and the starter
(`starters/nextjs-gsap-lenis/`) against **all 6 site_types** declared in the
router's input schema. The companion `examples/golden-trace-saas-marketing/TRACE.md`
covers `saas_app_marketing` in full narrative form; this file is the
breadth check — one brief per site_type, one router trace per brief, one
starter-route mapping per trace.

## What this validates

- **Router coverage:** every value of `site_type` in the input enum produces a
  deterministic, non-conflicting `ordered_kind_list` that an agent can scaffold
  from without re-reading prose tables.
- **Composition budget safety:** each plan passes
  `composition_matrix.json`'s `shared_budget_conflicts` and
  `known_engine_conflicts` checks (no two steady-state full-viewport-scene
  consumers; no Lenis+native-smooth-scroll double-easing; no double View
  Transitions; no two WebGL contexts).
- **Starter route coverage:** each plan maps to an existing demo route in the
  starter OR documents a clean extension path. No "we'd need a new starter"
  fallbacks except for the explicitly-opt-in kinds (kind-xi AR, kind-xii AI).
- **Tier 3 freshness:** every engine picked has been re-verified against the
  live npm registry in Phase 2 (see `kit/VERIFICATION.md` §freshness).

## What was actually run

| Check | Command | Result |
|---|---|---|
| Router trace derivation | Mechanical walk of each brief through `router.json` rules R1–R12 | 6/6 traces resolve without conflict |
| Composition budget check | Mechanical: any plan with two steady-state full-viewport-scene consumers → fail | 0/6 fail |
| Engine conflict check | Mechanical: scan each plan for Lenis+native-smooth, double View Transitions, double WebGL | 0/6 conflict |
| Type-check | `npx tsc --noEmit` (whole starter) | Exit 0, clean |
| Production build | `npx next build` (whole starter) | Exit 0, 10 routes static |
| Starter route reachability | `next start` + `curl` against all routes | All HTTP 200 |
| Playwright browser tests | `npx playwright test` | **NOT RUN** — sandbox network blocks `cdn.playwright.dev` (Chromium download 403). Tests are confirmed to target present DOM elements via `curl + grep` per existing `VERIFICATION.md`. |
| Lighthouse CI | `npx lhci autorun` | **NOT RUN** — same Chromium-blocked reason |

Same caveats as the original `VERIFICATION.md`: Playwright assertions
(hover behavior, focus-visible, animation timing, screenshot diffing) have
not been executed by the actual test runner in this sandbox. Re-run with
`npm install && npx playwright install --with-deps chromium && npm run
test:e2e` in a network-unrestricted environment to validate runtime
behavior.

---

## Trace 1 — `marketing_landing`

### Brief
> "Product hunt launch page for a developer tool. Single screen, ~4 sections
> (hero, social proof, feature showcase, signup). Senior dev. Next.js. No
> 3D. Standard perf. Editorial cinematic tone."

### Router input
```json
{
  "site_type": "marketing_landing",
  "audience": "senior_dev",
  "framework": "react_next",
  "has_3d_asset": false,
  "has_audio_input": false,
  "is_spa": false,
  "perf_tier": "standard",
  "brand_intensity": "editorial_cinematic",
  "section_count": 4
}
```

### Rules fired
| Rule | Fires? | Why |
|---|---|---|
| R1 | No | senior_dev + react_next |
| R2 | Yes | always (baseline kind-viii) |
| R3 | Yes | section_count (4) >= 3 |
| R4 | No | site_type not product_ecommerce |
| R5 | Yes | marketing_landing, no 3D, perf != strict → defaults kind-ix |
| R6 | No | brand_intensity IS editorial_cinematic → illustration explicitly excluded |
| R7 | No | not portfolio + not has_3d_asset |
| R8 | No | is_spa is false |
| R9 | Yes (optional) | senior_dev + marketing_landing + perf != strict → cursor offered |
| R10 | No | no audio_input |
| R11 | No | not product_ecommerce + not explicit request |
| R12 | No | no explicit opt-in |

### Output
```json
{
  "ordered_kind_list": ["kind-viii", "kind-i", "kind-ix", "kind-iv"],
  "token_profile": "editorial",
  "stack_pick": { "primary_engine": "GSAP + ScrollTrigger", "smooth_scroll": "Lenis", "license_summary": ["GSAP Standard No-Charge (Webflow)", "Lenis MIT", "canvas-sketch MIT"] },
  "starter_scaffold_ref": "starters/nextjs-gsap-lenis",
  "file_refs": ["03_build_guides/08_kind-viii_microinteraction.md", "03_build_guides/01_kind-i_scroll_reveal.md", "03_build_guides/09_kind-ix_generative_art.md", "03_build_guides/04_kind-iv_cursor_tracking.md"],
  "conflicts": []
}
```

### Composition check
- Full-viewport-scenes: only kind-ix holds the slot. kind-iv is pointer-only, not full-viewport. **Pass.**
- Ambient-loops: kind-ix = 1. Cap 2. **Pass.**
- Concurrent: kind-i staggered reveals × 4 sections + kind-viii hover states + kind-iv cursor = peaks around 6. **Pass.**
- Engine conflict: Lenis+native-smooth — only Lenis, no `scroll-behavior: smooth`. **Pass.**

### Starter route mapping
Closest existing: **`/`** (home) + add ambient canvas overlay. New component: `MagneticCTA.tsx` for kind-iv on the signup CTA.

### Validation status
- Router trace: deterministic, no conflicts.
- Starter scaffold: feasible with `components/AmbientCanvas.tsx` (already in golden trace) + new `MagneticCTA.tsx`.
- Smoke build: covered by the existing 10-route `next build` (no new routes needed for SPA-less marketing landing).

---

## Trace 2 — `portfolio`

### Brief
> "Personal portfolio for a designer-developer. Cinematic tone, scroll-heavy.
> Next.js, 6 sections, no 3D assets, standard perf. Want it to feel like a
> studio reel."

### Router input
```json
{
  "site_type": "portfolio",
  "audience": "senior_dev",
  "framework": "react_next",
  "has_3d_asset": false,
  "has_audio_input": false,
  "is_spa": false,
  "perf_tier": "standard",
  "brand_intensity": "editorial_cinematic",
  "section_count": 6
}
```

### Rules fired
| Rule | Fires? | Why |
|---|---|---|
| R1 | No | senior_dev |
| R2 | Yes | baseline |
| R3 | Yes | section_count (6) >= 3 |
| R4 | No | not product_ecommerce |
| R5 | Yes | marketing/saas branch (note: portfolio not in R5 list — R5 only fires for marketing_landing/saas_app_marketing) → **NO**. Portfolio without 3D doesn't get a hero surface picked automatically. |
| R6 | No | brand_intensity = editorial_cinematic → illustration excluded |
| R7 | **Yes (optional)** | portfolio + editorial_cinematic → preloader offered |
| R8 | No | not SPA |
| R9 | Yes (optional) | senior_dev + portfolio + perf != strict → cursor |
| R10 | No | no audio |
| R11 | No | not product_ecommerce |
| R12 | No | no opt-in |

### Output
```json
{
  "ordered_kind_list": ["kind-viii", "kind-i", "kind-vi", "kind-iv"],
  "token_profile": "editorial",
  "stack_pick": { "primary_engine": "GSAP + ScrollTrigger", "smooth_scroll": "Lenis", "license_summary": ["GSAP Standard No-Charge", "Lenis MIT"] },
  "starter_scaffold_ref": "starters/nextjs-gsap-lenis",
  "file_refs": ["03_build_guides/08_kind-viii_microinteraction.md", "03_build_guides/01_kind-i_scroll_reveal.md", "03_build_guides/06_kind-vi_preloader.md", "03_build_guides/04_kind-iv_cursor_tracking.md"],
  "conflicts": []
}
```

### Composition check
- Full-viewport-scenes: kind-vi is transient (releases after window.load). kind-i/iv are not steady-state consumers. **Pass.**
- Ambient-loops: 0 (no kind-iii/ix/x/v-loop). **Pass.**
- Concurrent: kind-i × 6 sections + kind-viii hover + kind-iv cursor peaks ~7. **Pass.**
- Engine conflict: none.

### Starter route mapping
Closest existing: **`/`** extended with kind-vi preloader wrapper. New: `Preloader.tsx` + `MagneticCTA.tsx`.

### Validation status
- Router note: R5 does **not** cover portfolio. Portfolio gets a deliberate "no auto hero surface" — agents must explicitly request kind-ii/iii/ix for portfolio if the brief calls for it. This is a known router gap documented in `router.json` (R5 lists only `marketing_landing` and `saas_app_marketing` in its condition).
- Scaffold: feasible. Preloader wraps the page; scroll reveals wire to existing ScrollTrigger pattern.

---

## Trace 3 — `product_ecommerce`

### Brief
> "Direct-to-consumer storefront for a sneaker brand. Has a real GLB of the
> sneaker (~3MB). Next.js, 5 sections (hero, product grid, AR preview,
> testimonials, cart). Standard perf. Product clean tone. Senior dev."

### Router input
```json
{
  "site_type": "product_ecommerce",
  "audience": "senior_dev",
  "framework": "react_next",
  "has_3d_asset": true,
  "has_audio_input": false,
  "is_spa": true,
  "perf_tier": "standard",
  "brand_intensity": "product_clean",
  "section_count": 5
}
```

### Rules fired
| Rule | Fires? | Why |
|---|---|---|
| R1 | No | senior_dev |
| R2 | Yes | baseline |
| R3 | Yes | section_count >= 3 |
| R4 | **Yes** | product_ecommerce + has_3d_asset → kind-ii (consumes the one full-viewport-scene slot) |
| R5 | No | R4 already consumed the slot |
| R6 | Yes (optional) | product_ecommerce, brand != editorial_cinematic → illustration |
| R7 | **Yes (optional)** | has_3d_asset → preloader (real asset load > 1s) |
| R8 | Yes | is_spa |
| R9 | No | not in R9's site_type list |
| R10 | No | no audio |
| R11 | **No** (opt-in only) | requires `explicit_user_request_for_ar_quicklook` (Phase 1: kind-xi now manual-only per R11) |
| R12 | No | no opt-in |

### Output
```json
{
  "ordered_kind_list": ["kind-viii", "kind-i", "kind-vi", "kind-ii", "kind-vii"],
  "token_profile": "product",
  "stack_pick": { "primary_engine": "Three.js r185+ / R3F", "smooth_scroll": "Lenis", "license_summary": ["Three MIT", "@react-three/fiber MIT", "@react-three/drei MIT", "GSAP Standard No-Charge", "Lenis MIT"] },
  "starter_scaffold_ref": "starters/nextjs-gsap-lenis",
  "file_refs": ["03_build_guides/08_kind-viii_microinteraction.md", "03_build_guides/01_kind-i_scroll_reveal.md", "03_build_guides/06_kind-vi_preloader.md", "03_build_guides/02_kind-ii_3d_scene.md", "03_build_guides/07_kind-vii_page_transitions.md"],
  "conflicts": []
}
```

### Composition check
- Full-viewport-scenes: kind-ii holds the slot (steady-state). kind-vi transient. **Pass.**
- Ambient-loops: 0. **Pass.**
- Concurrent: kind-i × 5 + kind-ii RAF (frameloop='demand') + kind-vii transition + kind-viii hover peaks ~7. **Pass.**
- Engine conflict: kind-ii WebGL + no other WebGL = 1 context. **Pass.** kind-vii (View Transitions API) + no Barba/Swup = clean. **Pass.**

### Starter route mapping
Closest existing: **`/product`** (kind-ii demo) + add preloader + page transitions. No AR — kind-xi explicitly excluded (R11 manual-only). AR demo route removed in Phase 1.

### Validation status
- Router trace: clean. kind-ii is the natural hero (3D product).
- Scaffold: feasible. Existing `/product` route already implements kind-ii; preloader and page transitions would wrap the demo.
- AR was excluded automatically (R11 now opt-in only). If the brief had said "include AR Quick Look," the agent would have to set `explicit_user_request_for_ar_quicklook: true` in the router input — and supply both `product.glb` and `product.usdz`.

---

## Trace 4 — `editorial_longform`

### Brief
> "Long-form journalism piece — climate essay, 10 scroll-depth sections with
> inline data visualizations. Next.js. Junior dev (less familiarity with
> motion libs). Strict perf (mobile readers on slow networks). Editorial
> cinematic tone."

### Router input
```json
{
  "site_type": "editorial_longform",
  "audience": "junior_dev",
  "framework": "react_next",
  "has_3d_asset": false,
  "has_audio_input": false,
  "is_spa": false,
  "perf_tier": "strict",
  "brand_intensity": "editorial_cinematic",
  "section_count": 10
}
```

### Rules fired
| Rule | Fires? | Why |
|---|---|---|
| R1 | No | junior_dev, not non_technical_founder |
| R2 | Yes | baseline |
| R3 | **Yes (with engine_pick override)** | section_count (10) >= 3; **perf_tier=strict** → router picks CSS animation-timeline (native, smallest bundle) instead of GSAP ScrollTrigger |
| R4 | No | not product_ecommerce |
| R5 | No | site_type not in R5 list (portfolio also not); perf_tier=strict also blocks R5 |
| R6 | No | brand_intensity = editorial_cinematic → illustration excluded |
| R7 | No | not portfolio, not has_3d_asset |
| R8 | No | not SPA |
| R9 | No | junior_dev (R9 requires senior_dev) |
| R10 | No | no audio |
| R11 | No | not product_ecommerce |
| R12 | No | no opt-in |

### Output
```json
{
  "ordered_kind_list": ["kind-viii", "kind-i"],
  "token_profile": "editorial",
  "stack_pick": { "primary_engine": "CSS animation-timeline (native)", "smooth_scroll": "native (no Lenis — strict perf)", "license_summary": ["native CSS only — zero JS motion deps"] },
  "starter_scaffold_ref": "starters/nextjs-gsap-lenis (with GSAP+Lenis stripped for strict perf)",
  "file_refs": ["03_build_guides/08_kind-viii_microinteraction.md", "03_build_guides/01_kind-i_scroll_reveal.md"],
  "conflicts": []
}
```

### Composition check
- Full-viewport-scenes: 0. **Pass.**
- Ambient-loops: 0. **Pass.**
- Concurrent: kind-i × 10 reveals (staggered with `motion.delay.item`) peaks ~6 with kind-viii hover. **Pass.**
- Engine conflict: strict perf forbids Lenis → no Lenis+native-smooth risk. **Pass.**
- Bundle: native CSS only → motion JS bundle ≈ 0 KB on top of framework.

### Starter route mapping
Closest existing: **`/`** (uses GSAP+Lenis; for this brief, the agent must strip them). No dedicated `/editorial` route in starter — document as an extension path: "for strict perf, replace `lib/scroll-setup.ts`'s Lenis init with no-op, drop GSAP, use native `animation-timeline`."

### Validation status
- Router trace: clean. Engine pick correctly downgraded to native.
- Scaffold: requires modification to the starter, not extension. Flagged for future: a `starters/nextjs-css-native/` starter would serve this case better, but that's a starter-matrix expansion, not a router bug.
- Junior dev guidance: per `06_motion_grammar.md` and `08_kind-viii_microinteraction.md`, the agent should default to CSS for strict perf, not try to optimize GSAP.

---

## Trace 5 — `saas_app_marketing`

### Brief
> "B2B SaaS marketing site. Next.js SPA. 6 sections. No 3D. Standard perf.
> Product clean. Senior dev."

### Router input
```json
{
  "site_type": "saas_app_marketing",
  "audience": "senior_dev",
  "framework": "react_next",
  "has_3d_asset": false,
  "has_audio_input": false,
  "is_spa": true,
  "perf_tier": "standard",
  "brand_intensity": "product_clean",
  "section_count": 6
}
```

### Rules fired
R2 (baseline) + R3 (scroll reveal, 6 sections) + R5 (kind-ix default) + R8 (page transitions, SPA). R6 (illustration) optional.

### Output
```json
{
  "ordered_kind_list": ["kind-viii", "kind-i", "kind-ix", "kind-vii"],
  "token_profile": "product",
  "stack_pick": { "primary_engine": "GSAP + ScrollTrigger", "smooth_scroll": "Lenis", "license_summary": ["GSAP Standard No-Charge", "Lenis MIT", "canvas-sketch MIT"] },
  "starter_scaffold_ref": "starters/nextjs-gsap-lenis",
  "file_refs": ["03_build_guides/08_kind-viii_microinteraction.md", "03_build_guides/01_kind-i_scroll_reveal.md", "03_build_guides/09_kind-ix_generative_art.md", "03_build_guides/07_kind-vii_page_transitions.md"],
  "conflicts": []
}
```

### Composition check
Same as the golden trace at `examples/golden-trace-saas-marketing/TRACE.md`. **Pass.**

### Starter route mapping
**Identical to golden trace.** Existing starter routes cover this end-to-end. New components for kind-ix + kind-vii (`AmbientCanvas.tsx`, `PageLink.tsx`) are documented in the golden trace.

### Validation status
- ✅ Fully validated by the golden trace.
- Smoke build passes. No new routes needed.

---

## Trace 6 — `docs_or_blog`

### Brief
> "Technical documentation site with a blog section. Next.js. 8 sections
> (one per major docs page). Junior dev. Standard perf. Product clean.
> No 3D, no audio, not really SPA but has client-side nav between docs
> pages."

### Router input
```json
{
  "site_type": "docs_or_blog",
  "audience": "junior_dev",
  "framework": "react_next",
  "has_3d_asset": false,
  "has_audio_input": false,
  "is_spa": false,
  "perf_tier": "standard",
  "brand_intensity": "product_clean",
  "section_count": 8
}
```

### Rules fired
| Rule | Fires? | Why |
|---|---|---|
| R1 | No | junior_dev |
| R2 | Yes | baseline |
| R3 | Yes | section_count >= 3 |
| R4 | No | not product_ecommerce |
| R5 | No | site_type not in R5 list |
| R6 | No | brand != editorial_cinematic — but site_type not in R6 list (only saas/product_ecommerce) |
| R7 | No | not portfolio, no 3D |
| R8 | **No** | is_spa is false (R8 requires explicit SPA flag) |
| R9 | No | junior_dev |
| R10 | No | no audio |
| R11 | No | not product_ecommerce |
| R12 | No | no opt-in |

### Output
```json
{
  "ordered_kind_list": ["kind-viii", "kind-i"],
  "token_profile": "product",
  "stack_pick": { "primary_engine": "GSAP + ScrollTrigger (or native CSS for junior dev simplicity)", "smooth_scroll": "Lenis optional", "license_summary": ["GSAP Standard No-Charge", "Lenis MIT"] },
  "starter_scaffold_ref": "starters/nextjs-gsap-lenis (or stripped-down variant — docs sites rarely need ScrollTrigger)",
  "file_refs": ["03_build_guides/08_kind-viii_microinteraction.md", "03_build_guides/01_kind-i_scroll_reveal.md"],
  "conflicts": []
}
```

### Composition check
- Full-viewport-scenes: 0. **Pass.**
- Ambient-loops: 0. **Pass.**
- Concurrent: kind-i × 8 reveals (staggered) + kind-viii hover = peak ~7. **Pass.**
- Engine conflict: none.

### Starter route mapping
Closest existing: **`/cta`** (microinteraction-heavy) + add minimal scroll reveal. **Note:** docs/blog sites are a router edge case — `site_type: docs_or_blog` exists in the enum but the router assigns only kind-viii + kind-i, which is correct for a content-heavy site. Page transitions (R8) do **not** fire because the brief says "is_spa: false" — even though Next.js typically does client-side route changes. **This is a router gap to flag:** an MPA Next.js docs site would benefit from kind-vii page transitions on the blog section, but the router doesn't infer SPA-ness from framework alone. Agents should set `is_spa: true` for Next.js App Router sites that use `<Link>` with client-side navigation.

### Validation status
- Router trace: clean, no conflicts.
- Scaffold: feasible. Junior-dev guidance: per the existing `/cta` route, the agent should keep it simple — kind-viii hover/focus + kind-i scroll reveal for in-page anchors only.
- Router gap flagged: `is_spa` should probably default to `true` for `framework: react_next` since Next.js App Router is client-side navigated by default. Future router revision: add `is_spa_default_by_framework` lookup. Not blocking.

---

## Coverage matrix

| site_type | rules fire | full-viewport-scene consumer | conflicts | closest starter route | scaffold status |
|---|---|---|---|---|---|
| marketing_landing | R2 R3 R5 R9 | kind-ix | 0 | `/` | Feasible with new MagneticCTA.tsx |
| portfolio | R2 R3 R7 R9 | none (kind-vi transient) | 0 | `/` | Feasible with new Preloader.tsx + MagneticCTA.tsx |
| product_ecommerce | R2 R3 R4 R6 R7 R8 | kind-ii | 0 | `/product` | Feasible; AR excluded (R11 opt-in) |
| editorial_longform | R2 R3 | none | 0 | `/` (modified) | Requires starter strip — flag for future `starters/nextjs-css-native/` |
| saas_app_marketing | R2 R3 R5 R8 | kind-ix | 0 | `/` + new components | ✅ Golden trace validates |
| docs_or_blog | R2 R3 | none | 0 | `/cta` | Feasible; router gap: `is_spa` defaults |

## Router gaps surfaced

1. **R5 does not cover `portfolio` or `editorial_longform`.** Briefs in those site_types must explicitly request a hero surface (kind-ii/iii/ix) — they don't auto-pick one. This is deliberate (not all portfolios want a full-viewport hero) but an agent can be confused if they expect auto-pick.
2. **R8 requires `is_spa: true` even for Next.js App Router.** App Router does client-side navigation by default but the router doesn't infer SPA-ness from framework. Agents should set `is_spa: true` for any client-routed Next.js site that wants page transitions.
3. **R6 illustration gate** only covers `saas_app_marketing` and `product_ecommerce` — not `marketing_landing` (where it could be appropriate) or `portfolio` (where state-machine Rive could replace hero copy).
4. **No starter for CSS-only / strict-perf editorial_longform.** The router correctly downgrades engine picks, but the starter is GSAP+Lenis-centric. A future `starters/nextjs-css-native/` would close this.
5. **kind-xi AR now manual-only (Phase 1).** Briefs that want AR must explicitly set `explicit_user_request_for_ar_quicklook: true` AND supply a `product.usdz` (no open-source writer — Apple tooling required).

## What an agent should NOT do (synthesized from traces)

- Do not add a second steady-state full-viewport-scene consumer (kind-ii/iii/ix) to a plan — the router rejects this, but agents running outside the router must still respect `composition_matrix.json`'s budget.
- Do not wire Lenis + native `scroll-behavior: smooth` — engine conflict.
- Do not wire View Transitions API + Barba/Swup simultaneously — engine conflict.
- Do not instantiate two Three.js renderers on one page — engine conflict.
- Do not skip `@media (prefers-reduced-motion: reduce)` on any kind — covered by the per-kind `reduced_motion_behavior` field in `kinds.json`; kind tests assert this.
- Do not animate `width/height/top/left/right/bottom/margin/padding` — CC1 forbidden.
- Do not put `* { animation-duration: 0.01ms !important; }` as the sole reduced-motion strategy — CC2 forbidden; per-behavior mapping per `06_motion_grammar.md`.
- Do not hardcode a package version without re-verifying against the registry — Tier 3 freshness rule, validated in Phase 2 of this build pass.
