# Animated-Website Generator — Kit Usage Guide

This guide is the **operational manual** for the animated-website agent's working set: `kit/` + `resources/`. The project IS the animated-website generator; `agents-manager/` is vendored orchestration. See `README.md` for the project pitch and `AGENTS.md` for context.

**TL;DR — which to treat as canonical:**
- **Kit canonical source:** `kit/dossier-agent-kit/dossier-agent-kit/` (the agent kit itself)
- **Resources canonical source:** `resources/animated_website_minimax_3/` (only post-correction dossier)
- **Resources for breadth:** `resources/animated_website_deepseek_flash/` (20-genre inventory + anti-pattern depth)
- **Resources to skip:** `resources/animated_website_minimax_2.7/` (pre-correction; 8 known errors)

---

## WHAT TO USE

### Kit — `kit/dossier-agent-kit/dossier-agent-kit/`

| File | Use it for |
|---|---|
| `schemas/kinds.json` | Queryable 12-kind matrix — engine license, budget cost, reduced-motion behavior, test ref |
| `schemas/router.json` | Decision tree (R1–R12) — given inputs, returns ordered_kind_list + starter_scaffold_ref |
| `schemas/composition_matrix.json` | Initialization order + conflict resolution (3 budget caps + 4 engine conflicts) |
| `schemas/forbidden_patterns.json` | 10 cross-cutting anti-patterns (CC1–CC10) + per-kind additions (K1-1…K12-2) |
| `starters/nextjs-gsap-lenis/` | Real working Next.js 14 starter — 12 components, 14 tests, 9 routes, CI |
| `examples/golden-trace-saas-marketing/TRACE.md` | Worked example proving the four artifacts stay in sync |
| `freshness_protocol.md` | 3-tier rules — trust Tier 1 tokens, re-verify Tier 3 versions/CDNs every time |
| `README.md` | 7-step agent workflow |
| `VERIFICATION.md` | What was actually run + 3 real bugs caught during build |

### Kit root — `kit/`

| File | Use it for |
|---|---|
| `ASSETS_README.md` | Historical record of placeholder→real asset swap chain |
| `ASSET_SPECS.md` | Production specs for each asset + 4 LLM generation prompts (poster, glb, mp3, lottie) |
| `SAMPLE_VALIDATION.md` | 1 brief per `site_type` — 6 router traces, all clean |

### Resources — `resources/animated_website_minimax_3/` (canonical)

| File | Use it for |
|---|---|
| `00_README.md` | Dossier map + 3 reading paths (founder / junior / senior) |
| `01_kinds/01_kinds.md` | Master 12-kind matrix + 7 emerging kinds |
| `01_kinds/01_kinds_taxonomy.md` | Trigger × surface axis — why 12, not 20 |
| `02_resources/` (11 files) | Curated engine/template/gallery inventory per category |
| `03_build_guides/` (12 + master) | Per-kind implementation guides + master with template |
| `04_do_dont.md` | 30 use / 30 avoid / 10 top — each row cited |
| `05_conversion_playbook.md` | 10-step static→animated retrofit |
| `06_motion_grammar.md` | **95 named design tokens** (duration/easing/distance/delay/limit) + RTL rules + reduced-motion map |
| `07_license_posture.md` | 8 license categories + 6 watchlist items + 8-item diligence checklist |
| `08_corrections_vs_source.md` | 8 explicit corrections — read BEFORE anything else |
| `99_appendix/` (references, glossary, changelog) | Lookup |

### Resources — `resources/animated_website_deepseek_flash/` (secondary)

| File | Use it for |
|---|---|
| 20-genre taxonomy files (`sub_agents/`) | Breadth — broader inventory than minmax_3 |
| `05_best_practices_and_conversion.md` | Deep anti-pattern coverage + rendering-pipeline cost analysis |
| ~60 resources / ~80 templates / ~2500-line creation guide | Inventory expansion when minmax_3 is too narrow |

---

## WHAT NOT TO USE

### Avoid — Kit

| Item | Why |
|---|---|
| `kit/poster.jpg` | **Deployed** — 77 KB JPEG (1920×1080 @ q82). Source: `resources/media/poster_source_b.jpeg`. |
| `kit/product.glb` | **Deployed** — 3.38 MB GLB from Apple Watch source (no textures, 67 meshes, 113k tris). |
| `kit/product.usdz` | **Does not exist** — no open-source USDZ writer. AR/kind-xi was removed in Phase 1; no starter route requires this file. Only relevant if a future project opts in via R11_ar_gate. |
| `kit/dossier-agent-kit/dossier-agent-kit/{schemas,starters/nextjs-gsap-len is/...` | **Shell glob expansion garbage** — malformed empty dirs from a botched unquote |
| Tier 3 freshness items (package versions, CDN URLs, star counts, browser %) | **Re-verify every time** before hardcoding per `freshness_protocol.md` |
| Kind-ii / kind-iii / kind-ix on same route | Intentional — they all claim the one full-viewport-scenes slot (cap=1) |
| Kind-xii auto-selection | R12 gate — reachable via manual opt-in, never auto-selected |
| Any library marked AGPL/GPL/Hippocratic | License wall — see `07_license_posture.md` watchlist |

### Avoid — Resources

| Item | Why |
|---|---|
| `resources/animated_website_minimax_2.7/` | **Pre-correction dossier** — 8 known errors: calls library "Framer Motion", treats GSAP as paid, missing Three.js r185+ WebGPU, missing Theatre AGPL, missing Lenis repo move, missing Remotion threshold |
| `cloudflare.com` / bare `github.io` CDN URLs in deepseek_flash HTML templates | **Scrape placeholder bugs** — not real endpoints |
| `resources/animated_website_minimax_3/05_build_guides/` | **Deleted** in Phase 1 — was empty duplicate of `03_build_guides/` |

### Avoid — Library choices (license wall)

| Library | Issue | Replacement |
|---|---|---|
| `@theatre/studio` | AGPL-3.0 (network copyleft) | `@theatre/core` (Apache-2.0) |
| Remotion (commercial scale) | GPL-3.0 + commercial threshold (1 FTE / EUR 1M revenue) | Other video engines, or pay license |
| `animate.css` | Hippocratic License | MIT CSS animation alternatives |
| Webflow / Framer / Wix / Squarespace / SVGator | SaaS subscription — no source ownership | Self-hosted stacks |
| ThemeForest / TemplateMonster templates | Per-template marketplace license | Read each license, or use MIT/Apache OSS templates |
| Lottie marketplace .json files | Per-file license terms | Read each, or commission custom |
| Rive / Spline runtime | Editor is SaaS (runtime is MIT) — account for both costs | Plan total cost |
| Blanket `* { animation-duration: 0.01ms !important; }` | Kills motion for users who want it (CC2) | Respect `@media (prefers-reduced-motion: reduce)` only |
| Animating width/height/top/left/right/bottom/margin/padding | Triggers layout (CC1) | Transform/opacity only |
| Permanent `will-change` | Owns GPU layer forever (CC3) | Apply during animation, remove after |

---

## HOW TO BENEFIT — Recommended Workflow

The kit + resources earn their keep when used as a **sequence**, not as a library. Skip a step and you re-learn a constraint the hard way (license wall, jank, A11y complaint). Run them in this order:

### Step 1 — Read the corrections file first
**File:** `resources/animated_website_minimax_3/08_corrections_vs_source.md`
**Benefit:** 8 known errors in the source scrape (library renamed, GSAP free since 2024, Lenis repo moved, AGPL traps). Reading this once saves hours of debugging wrong assumptions later.

### Step 2 — Decide which kinds to build
**Tool:** `kit/dossier-agent-kit/dossier-agent-kit/schemas/router.json` (R1–R12)
**Input:** site_type, audience, framework, has_3d_asset, has_audio_input, is_spa, perf_tier, brand_intensity, section_count
**Output:** ordered_kind_list, token_profile, stack_pick, starter_scaffold_ref, file_refs, conflicts[]
**Benefit:** Don't pick kinds from vibes. The router enforces the budget caps + the no-code gate (R1) + the kind-xii manual-only gate (R12).

### Step 3 — Load per-kind details
**Tool:** `schemas/kinds.json` (12 rows)
**Benefit:** Each row already tells you which engines are licensed for what, what budget it consumes, what reduced-motion behavior it needs, and which acceptance test to write.

### Step 4 — Resolve conflicts
**Tool:** `schemas/composition_matrix.json`
**Benefit:** Three shared budgets (concurrent=8, ambient-loops=2, full-viewport-scenes=1) and four engine conflicts (Lenis+native smooth scroll, View Transitions+Barba/Swup, pointermove+RAF race, two WebGL contexts) are pre-resolved. Don't relitigate them.

### Step 5 — Honor forbidden patterns
**Tool:** `schemas/forbidden_patterns.json` (CC1–CC10 + K1-1…K12-2)
**Benefit:** 10 cross-cutting anti-patterns and per-kind additions are pre-discovered. Following them = no jank, no A11y regressions, no LCP hit, no keyboard traps.

### Step 6 — Apply the motion grammar
**File:** `resources/animated_website_minimax_3/06_motion_grammar.md` (95 tokens)
**Benefit:** Pre-built design tokens (duration 7, easing 6, distance 6, delay 4, limit 3 + color/typography/spacing/etc.) keep durations, easing curves, and reduced-motion fallback consistent across all kinds. Includes RTL rules and locale handling.

### Step 7 — Scaffold from the starter
**Source:** `kit/dossier-agent-kit/dossier-agent-kit/starters/nextjs-gsap-lenis/`
**Per-kind add:** `resources/animated_website_minimax_3/03_build_guides/0[1-9]_kind-*` and `1[0-2]_kind-*`
**Benefit:** 12 components, 14 tests, 9 routes, CI, Lighthouse config — already wired. You add per-kind files; you don't reinvent the build chain.

### Step 8 — Verify freshness
**Tool:** `kit/dossier-agent-kit/dossier-agent-kit/freshness_protocol.md` Tier 3
**Benefit:** Re-verify package versions, CDN URLs, star counts, browser-support % every time you hardcode one. Tier 1 (token names, reduced-motion patterns, license CATEGORY defs, A11y patterns) you can trust as-is; Tier 2 (specific license posture, SaaS pricing) you re-verify per project.

---

### Reusable artifacts that compound across projects

| Artifact | Benefit |
|---|---|
| The router | No more "which kinds do I need?" meetings — answer in 12 rules |
| The 95 tokens | No more debating "is 200ms too fast" — pick from a curated scale |
| The starter | Skip 2 days of Next.js + GSAP + Lenis wiring; start at kinds |
| The forbidden patterns | Skip the post-launch A11y/perf audit — patterns pre-discovered |
| The license watchlist | Skip the legal review surprise — `@theatre/studio` AGPL and Remotion threshold caught at pick-time |
| The composition matrix | Skip the "why does my page jank" debug — budgets enforced upfront |

### Per-role starting point

- **Founder (no-code path):** R1 in router → `02_resources/06_no_code_platforms.md` → ship
- **Junior dev:** Step 1 → Step 7 (copy starter) → Step 5 (forbidden patterns as guardrails) → iterate
- **Senior dev:** Step 2 (router) → Step 4 (conflicts) → Step 7 (scaffold only the components you need) → extend

---

## 12 CANONICAL KINDS (one-line each)

i. **Scroll reveal/parallax** — GSAP ScrollTrigger + Lenis · CSS animation-timeline
ii. **3D scene/WebGL/WebGPU** — Three.js r185+ · R3F · `<model-viewer>`
iii. **Shader/GLSL fragment** — Shadertoy · glslCanvas · Three.js shaderMaterial/TSL
iv. **Cursor/pointer** — GSAP quickTo · Motion useMotionValue · vanilla pointermove
v. **Animated illustration** — dotLottie-web · Rive runtime
vi. **Preloader/intro** — GSAP timeline on `window.load`
vii. **Page transitions (SPA)** — View Transitions API · Swup · Barba.js
viii. **Microinteraction/CSS-only** — CSS transition · Motion · AutoAnimate
ix. **Generative art/canvas** — p5.js (LGPL) · canvas-sketch · OGL
x. **Audio-reactive** — Tone.js · Web Audio API · p5.sound (LGPL)
xi. **AR / `<model-viewer>`** — `<model-viewer>` (Apache-2.0) · `@react-three/xr` *(manual opt-in only — R11; no starter demo, no `product.usdz` shipped)*
xii. **AI live motion** — Motion AI Kit · Vercel AI SDK *(manual opt-in only)*

## 95 TOKENS — quick reference

- **Duration** (7): instant 0 · quick 80 · fast 140 · base 220 · slow 360 · story 560 · cinematic 900 (ceiling)
- **Easing** (6): linear · standard `(0.2,0,0,1)` · enter `(0.16,1,0.3,1)` · exit `(0.4,0,1,1)` · in-out `(0.65,0,0.35,1)` · overshoot `(0.34,1.56,0.64,1)`
- **Distance** (6): none 0 · xs 4 · sm 8 · md 16 · lg 32 · xl 64
- **Delay** (4): item 60 · hero 100 · section 120 · group-cap 400
- **Limit** (3): concurrent 8 · ambient-loops 2 · full-viewport-scenes 1
- *(color 15, typography 22, spacing 11, radius 4, size 5, breakpoint 4, layout 8 — see `06_motion_grammar.md`)*

## 3 BUDGET CAPS (composition_matrix.json)

- **concurrent** = 8 animations max in flight
- **ambient-loops** = 2 (background always-running animations max)
- **full-viewport-scenes** = 1 (only one kind-ii / iii / ix can claim the viewport)