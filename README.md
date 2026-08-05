# Animated-Website Generator

An agent-assisted system that produces any animated website end-to-end, from a brief.

## What it does

You describe what you want — a SaaS marketing page, a portfolio, an editorial site, a product showcase, a docs blog. The animated-website agent selects the right "kinds" of motion from a 12-kind taxonomy, scaffolds from a production-ready Next.js starter, applies 95 named motion tokens, respects a hard performance budget, and ships a site that respects `prefers-reduced-motion` and passes a 10-rule anti-pattern lint.

## How to use it

```text
1. Read the corrections file first (8 known errors in the source scrape)
   → resources/animated_website_minimax_3/08_corrections_vs_source.md

2. Decide which kinds to build
   → kit/dossier-agent-kit/dossier-agent-kit/schemas/router.json (R1–R12)
   Input:  site_type, audience, framework, has_3d_asset, has_audio_input,
           is_spa, perf_tier, brand_intensity, section_count
   Output: ordered_kind_list, token_profile, stack_pick,
           starter_scaffold_ref, file_refs, conflicts[]

3. Load per-kind details
   → kit/dossier-agent-kit/dossier-agent-kit/schemas/kinds.json

4. Resolve conflicts
   → kit/dossier-agent-kit/dossier-agent-kit/schemas/composition_matrix.json

5. Honor forbidden patterns
   → kit/dossier-agent-kit/dossier-agent-kit/schemas/forbidden_patterns.json

6. Apply the motion grammar
   → resources/animated_website_minimax_3/06_motion_grammar.md (95 tokens)

7. Scaffold from the starter
   → kit/dossier-agent-kit/dossier-agent-kit/starters/nextjs-gsap-lenis/

8. Verify freshness (Tier 3: package versions, CDN URLs, browser support %)
   → kit/dossier-agent-kit/dossier-agent-kit/freshness_protocol.md
```

Full walkthrough: `kit/USAGE_GUIDE.md`. 1 brief per `site_type` (6 traces, all clean): `kit/SAMPLE_VALIDATION.md`.

## What's in the box

- **`kit/`** — the animated-website agent's compiled skill set: 12-kind matrix, decision tree, motion grammar, forbidden patterns, starter, worked example
- **`resources/animated_website_minimax_3/`** — canonical research dossier (30+ files, 12 kinds, 95 tokens, 8 corrections, 7 license categories)
- **`resources/animated_website_deepseek_flash/`** — secondary dossier (20-genre inventory, deep anti-pattern coverage)
- **`resources/animated_website_minimax_2.7/`** — pre-correction, do not use
- **`agents-manager/`** — vendored multi-agent orchestration tool, ships with the project
- **`bin/`** — vendored installers for the orchestrator

## What it does NOT do

- **Not a no-code builder.** This is for dev teams. Founders without technical help are routed to `resources/animated_website_minimax_3/02_resources/06_no_code_platforms.md` by the router's R1 gate.
- **Not a CMS.** Generates the front-end. Content management is your problem.
- **Not a template marketplace.** You build your own animations from the per-kind guides. Pre-built templates in `resources/animated_website_minimax_3/02_resources/08_templates_*.md` are inspiration, not what you ship.

## Reads

- `INDEX.md` — file map
- `FINAL_VISION.md` — target state + validation checklist
- `AGENTS.md` — context_gen for this repo
- `kit/USAGE_GUIDE.md` — 8-step workflow + what to use / not
- `kit/SAMPLE_VALIDATION.md` — 6 router traces, one per site_type
- `kit/VERIFICATION.md` — what was actually run + bugs caught

## Vendored tooling

`agents-manager/` is a vendored copy of the upstream [agents-manager](https://github.com/anomalyco/agents-manager) release. It's already built and tested upstream; we ship a copy inside this repo so the animated-website agent can run on it without an external install. The vendored copy's own `AGENTS.md` lives at `agents_manager/AGENTS.md`; its own release notes at `agents_manager/CHANGELOG.md`.

## Repo

- **Name:** `animated-website`
- **Owner:** @alshahia
- **GitHub:** https://github.com/alshahia/animated_website
