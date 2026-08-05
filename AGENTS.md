# AGENTS.md — animated-website generator

This repo IS the **animated-website generator**: an agent-assisted system that produces any animated website end-to-end, from a brief. Two pieces live here:

1. **The animated-website project (the foreground).** The agent's working set:
   - `kit/` — the agent's compiled skill set: 12 kinds, decision tree, motion grammar, starter, schemas, examples
   - `resources/` — the research base (3 model dossiers; canonical = `animated_website_minimax_3`)
2. **Vendored tooling (the backdrop).** `agents-manager/`, `bin/`, `share/`, `tasks/`, `scripts/`, `opencode.jsonc` — a copy of the upstream [agents-manager](https://github.com/anomalyco/agents-manager) release that the animated-website agent runs on.

The animated-website project is the protagonist. agents-manager is the orchestrator it ships with, like a `node_modules/` to a Next.js app.

## Quick start (any animated-website task)

1. Read `README.md` for the elevator pitch.
2. New task → `kit/USAGE_GUIDE.md` (8-step workflow) → `kit/dossier-agent-kit/dossier-agent-kit/schemas/router.json` (decision tree).
3. The router returns `ordered_kind_list` + `starter_scaffold_ref` + `token_profile` + `stack_pick`. Start from `kit/dossier-agent-kit/dossier-agent-kit/starters/nextjs-gsap-lenis/` and add per-kind files from `resources/animated_website_minimax_3/03_build_guides/`.

## What's where

| Path | Purpose |
|---|---|
| `README.md` | Elevator pitch + how to use the generator |
| `INDEX.md` | One-stop file map (drill-down reference) |
| `FINAL_VISION.md` | Target state + validation checklist |
| `kit/USAGE_GUIDE.md` | 8-step workflow + what to use / not |
| `kit/CLEANUP_LIST.md` | A. delete/replace · B. do-not-use |
| `kit/ASSET_SPECS.md` | Asset specs + LLM generation prompts |
| `kit/SAMPLE_VALIDATION.md` | 1 brief per `site_type` — 6 router traces, all clean |
| `kit/VERIFICATION.md` | What was actually run + bugs caught |
| `kit/ASSETS_README.md` | Asset swap chain (historical record) |
| `kit/dossier-agent-kit/dossier-agent-kit/` | The agent kit itself — schemas, starter, examples, freshness protocol |
| `resources/animated_website_minimax_3/` | **Canonical** research dossier (read `08_corrections_vs_source.md` FIRST) |
| `resources/animated_website_deepseek_flash/` | Secondary dossier (20-genre breadth, deep anti-pattern coverage) |
| `resources/animated_website_minimax_2.7/` | **Do not use** — pre-correction, 8 known errors |
| `agents_manager/` | Vendored multi-agent orchestrator (its own `AGENTS.md` lives here) |
| `bin/`, `share/`, `tasks/`, `scripts/`, `opencode.jsonc` | Vendored orchestrator runtime |

## The 12 kinds (one-line each)

i. Scroll reveal / parallax · ii. 3D scene / WebGL / WebGPU · iii. Shader / GLSL fragment · iv. Cursor / pointer-tracking · v. Animated illustration (Lottie / Rive) · vi. Preloader / intro · vii. Page transitions (SPA) · viii. Microinteraction / CSS-only · ix. Generative art / canvas · x. Audio-reactive · xi. AR / `<model-viewer>` *(manual opt-in only)* · xii. AI live motion *(manual opt-in only)*.

Full matrix: `kit/dossier-agent-kit/dossier-agent-kit/schemas/kinds.json`. Decision tree: `schemas/router.json`. 95 motion tokens: `resources/animated_website_minimax_3/06_motion_grammar.md`. 3 budget caps: `schemas/composition_matrix.json` (concurrent=8, ambient-loops=2, full-viewport-scenes=1). 10 cross-cutting anti-patterns + per-kind additions: `schemas/forbidden_patterns.json`.

## Hard rules for this project

- **Read `08_corrections_vs_source.md` first.** 8 known errors in the source scrape (library renamed, GSAP free since 2024, Lenis repo moved, AGPL traps). Skip = bugs later.
- **Use the router, not vibes.** `schemas/router.json` R1–R12 returns the kind list. Don't pick kinds manually.
- **Honor the 3 budget caps** — concurrent=8, ambient-loops=2, full-viewport-scenes=1.
- **Run `freshness_protocol.md` Tier 3** before hardcoding any package version or CDN URL. Re-verify every time.
- **Don't auto-select kind-xi (AR) or kind-xii (AI live motion)** — both require explicit human opt-in (R11, R12).
- **Don't put `@theatre/studio` (AGPL-3.0) or Remotion-at-scale (commercial threshold) in a stack without flagging it** — see `resources/animated_website_minimax_3/07_license_posture.md` watchlist.
- **Don't edit `agents_manager/<role>/SKILL.md`** unless redesigning the vendored controller — that's upstream territory.
- **Don't commit unless explicitly asked.** Project convention; commits are user-driven.

## Vendored agents-manager

The orchestrator at `agents_manager/` is a vendored copy of the upstream multi-agent tool. Its own context_gen doc lives at `agents_manager/AGENTS.md`; its own release notes at `agents_manager/CHANGELOG.md`. For tasks that touch the vendored controller (specialist `SKILL.md` edits, release automation, controller bugs), read `agents_manager/AGENTS.md` first.

For animated-website tasks, agents-manager is the orchestrator that fits the project's needs: research-first (canonical dossier) → plan (router output) → build (starter + per-kind files) → review (forbidden patterns lint). The animated-website agent doesn't have to use agents-manager; it can be invoked directly. But agents-manager is already wired and tested, so the project ships with it.

## Reading order for a new session

1. `README.md` — elevator pitch
2. `kit/dossier-agent-kit/dossier-agent-kit/README.md` — 7-step agent workflow inside the kit
3. `resources/animated_website_minimax_3/08_corrections_vs_source.md` — must read
4. `kit/USAGE_GUIDE.md` — operational guide
5. `kit/dossier-agent-kit/dossier-agent-kit/schemas/router.json` — the decision tree
6. `INDEX.md` — file map for drilling down
