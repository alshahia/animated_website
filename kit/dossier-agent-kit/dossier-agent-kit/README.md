# Agent Execution Kit — for the Animated-Website Research Dossier

This kit converts the dossier (13 prose/table markdown files) into things an
agent can actually call, instead of re-reading and re-inferring on every run.
It does not replace the dossier — it sits on top of it. The dossier remains
the authority for *why*; this kit is the *how* an agent executes against it.

**See `VERIFICATION.md`** for what has actually been run and confirmed in
this repo — real `npm install`, `tsc --noEmit`, `next build`, and live
server route checks, including three real dependency-version bugs that were
found and fixed this way — versus what still needs a network-unrestricted
environment (the actual Playwright browser test run, Lighthouse CI).

## What's here

```
schemas/
  router.json                <- decision tree: brief in, build plan out
  kinds.json                 <- the 12-kind matrix as queryable data
  forbidden_patterns.json    <- lint-able rules (cross-cutting + per-kind)
  composition_matrix.json    <- how kinds combine on ONE real page: init
                                 order, shared-budget conflicts, engine conflicts
freshness_protocol.md        <- which dossier facts to trust as-is vs re-verify
starters/
  nextjs-gsap-lenis/         <- runnable reference implementation
                                 (kind-i, kind-vii, kind-viii, kind-ix wired in)
examples/
  golden-trace-saas-marketing/TRACE.md
                              <- full brief -> router output -> generated
                                 files -> test result, end to end
```

## How an agent should use this

1. **Route first.** Feed the brief's parameters into `schemas/router.json`'s
   `routing_rules`. This produces an `ordered_kind_list`, a `token_profile`,
   a `stack_pick`, and a `starter_scaffold_ref`. If `conflicts` is non-empty
   (e.g. two kinds both want the one full-viewport-scene budget slot), resolve
   that with the human before writing any code — do not silently pick one.

2. **Look up kind details in `kinds.json`**, not by re-reading the markdown
   guide from scratch every time. Each entry carries `guide_file` — only open
   the full markdown guide when you need the narrative trade-off reasoning or
   the copyable snippet, not for facts already in the JSON.

3. **Clone the starter matching `starter_scaffold_ref`** and apply kind-specific
   deltas rather than scaffolding a new project from an empty directory. The
   starter already wires in: token CSS variables (`styles/tokens.css`),
   the reduced-motion contract, GSAP+Lenis cleanup, and a CI pipeline running
   Playwright + axe-core + Lighthouse CI.

4. **Before emitting any component**, check it against
   `forbidden_patterns.json`. The cross-cutting rules (`CC1`-`CC10`) apply to
   every kind; look up `per_kind_additions[kind_id]` for the kind-specific
   rows. These are already partially implemented as real Playwright specs in
   `starters/nextjs-gsap-lenis/tests/` — extend those files rather than
   writing a parallel test suite.

5. **Respect the budget allocation.** `router.json`'s
   `budget_allocation_after_routing` block is the single place tracking
   `motion.limit.full-viewport-scenes` (cap 1), `motion.limit.ambient-loops`
   (cap 2), and `motion.limit.concurrent` (cap 8) across the *whole page*,
   not per-kind. If your build plan has more than one kind claiming the
   full-viewport-scene slot, that's a routing conflict, not a normal trade-off
   to eyeball.

6. **When the plan has more than 2 kinds, consult `schemas/composition_matrix.json`**
   before writing any code. It covers what no single per-kind guide covers:
   initialization order across kinds (e.g. the smooth-scroll engine must
   exist before anything reads scroll position), known engine conflicts
   (Lenis vs. native smooth scroll, duplicate WebGL contexts), and how the
   three shared budgets get allocated when multiple kinds are simultaneously
   active — not just whether any single kind exceeds its own limit.

7. **See `examples/golden-trace-saas-marketing/TRACE.md` for a fully worked
   example** — one brief run through every file in this kit, end to end,
   with the actual generated components (`AmbientCanvas.tsx`, `PageLink.tsx`)
   and tests (`kind-ix.spec.ts`, `kind-vii.spec.ts`) checked into the starter.
   If you change `router.json`, `kinds.json`, or the starter in the future,
   re-running this trace is the fastest way to check nothing drifted out of
   sync.

## Freshness caveat

The dossier and this kit are both dated to a **2026-07-29 snapshot**. See
`freshness_protocol.md` for the full tiered breakdown of what's safe to
trust indefinitely (reduced-motion patterns, token names, accessibility
rules) versus what must be re-verified before it goes into generated code
(package versions, CDN-pinned URLs, browser support percentages, star
counts). Short version: never hardcode a Tier 3 fact without a search first.

## What's intentionally NOT automated here

- **kind-xii (AI live motion) is never auto-selected** by the router. It
  requires explicit human opt-in per `12_kind-xii_ai_live_motion.md`'s
  single-flight/cancel/license constraints — the router only offers it as
  `ADD_KIND_OPTIONAL` behind an explicit flag.
- **kind-xi (AR/`<model-viewer>`) is similarly manual-only** (R11). No
  starter demo exists — the iOS Quick Look path requires a USDZ asset
  with no open-source writer, so the router requires explicit user request
  before adding this kind, even for `product_ecommerce` + `has_3d_asset`.
- **No-code platform routing (`R1_no_code_gate`) stops the pipeline.** This
  kit only automates the custom-code path; founders routed to Webflow/Framer
  get a pointer to `06_no_code_platforms.md`, not generated code.
- **Only one starter is fully wired** (`nextjs-gsap-lenis`, covering kind-i,
  kind-vii, kind-viii, kind-ix). `router.json`'s `starter_scaffold_ref` can
  point to other framework/engine combos (e.g. a vanilla + CSS
  `animation-timeline` starter, or an Astro + Motion starter) but those
  don't exist as folders yet — the router documents the *intent* to route
  there, not a working scaffold.
- **11 of 12 kinds now have real components + tests** in the starter — every
  `guide_file` + `acceptance_test_ref` pair in `kinds.json` resolves to a
  real, checked-in component and Playwright spec EXCEPT `kind-xi` (AR), which
  is opt-in only (see R11) and has no starter scaffold: `kind-i` (scroll reveal),
  `kind-ii` (3D scene / R3F), `kind-iii` (shader / OGL), `kind-iv` (cursor
  tracking), `kind-v` (Lottie illustration), `kind-vi` (preloader), `kind-vii`
  (page transitions), `kind-viii` (microinteraction), `kind-ix` (ambient
  generative canvas), `kind-x` (audio-reactive), `kind-xii` (AI live motion).
- Note: `kind-ii`, `kind-iii`, and `kind-ix` are never composed together on
  one route in this starter (see `composition_matrix.json` — all three are
  steady-state consumers of the single `motion.limit.full-viewport-scenes`
  slot). `/product`, `/shader-demo`, and `/` are intentionally separate
  routes for this reason, not an oversight — an agent combining any two of
  these on a real page must resolve that conflict first, exactly as the
  matrix's `agent_instruction` field says.
- `kind-xii`'s route (`/ai-hero-demo`) is reachable directly for demo/test
  purposes, but the router (`router.json` rule `R12_ai_motion_gate`) still
  never auto-selects it into a build plan — it requires the human's explicit
  opt-in flag regardless of what's implemented in the starter.
