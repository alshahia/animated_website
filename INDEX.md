# Project Index — `animated-website`

One-stop reference for the entire repo. Read this first, then drill into the specific file/folder you need.

> This repo is the **animated-website generator**: an agent-assisted system that produces any animated website end-to-end. It ships with two halves:
>
> 1. **The animated-website project** (the foreground) — the agent's working set: `kit/` + `resources/`. The agent that produces animated websites lives here.
> 2. **Vendored tooling** (the backdrop) — `agents-manager/`, `bin/`, `share/`, `tasks/`, `scripts/`, `opencode.jsonc`. A copy of the upstream [agents-manager](https://github.com/anomalyco/agents-manager) release that the animated-website agent runs on.

If you want to **build an animated website** → focus on `kit/`, `resources/`, and the index/guide files at root (`README.md`, `INDEX.md`, `kit/USAGE_GUIDE.md`, `kit/CLEANUP_LIST.md`, `FINAL_VISION.md`).

If you want to **edit the vendored orchestrator** → focus on `agents_manager/`, `bin/`, `share/`, `tasks/`, `agents_manager/AGENTS.md`, `CLAUDE.md`.

---

## Quick navigation

| Path | What it is | Read/use it for |
|---|---|---|
| **`README.md`** | Animated-website generator pitch | Start here |
| **`INDEX.md`** | This file | One-stop reference |
| **`AGENTS.md`** | Animated-website project context_gen | Working on the project |
| **`HANDOFF.md`** | Fresh-agent resume document | Resuming work in a new session |
| **`FINAL_VISION.md`** | Target state + validation checklist | Verifying "done" |
| **`agents_manager/AGENTS.md`** | Vendored controller context_gen | Working ON the orchestrator |
| **`CLAUDE.md`** | Top-level orientation + auto-routing | Understanding orchestrator routing |
| **`opencode.jsonc`** | Agent definitions (master + 9 specialists) | Orchestrator internals |

---

## The animated-website project (the foreground)

### `kit/` — the agent's compiled skill set

| Path | Use it for | Don't use |
|---|---|---|
| `kit/USAGE_GUIDE.md` | What to use / not, 12 kinds, 95 tokens, 8-step workflow | — |
| `kit/CLEANUP_LIST.md` | A. delete/replace · B. do-not-use | — |
| `kit/SAMPLE_VALIDATION.md` | 1 brief per site_type — 6 router traces, all clean | — |
| `kit/ASSET_SPECS.md` | poster.jpg + product.glb specs, swap procedure, route re-test list, 4 LLM generation prompts | — |
| `kit/ASSETS_README.md` | Asset swap chain (historical record) | — |
| `kit/VERIFICATION.md` | What was actually run + bugs caught + browser smoke | — |
| `kit/dossier-agent-kit/dossier-agent-kit/README.md` | 7-step agent workflow inside the kit | — |
| `kit/dossier-agent-kit/dossier-agent-kit/freshness_protocol.md` | 3-tier freshness rules (Tier 1 trust, Tier 3 re-verify every time) | — |
| `kit/dossier-agent-kit/dossier-agent-kit/schemas/kinds.json` | **Queryable 12-kind matrix** | — |
| `kit/dossier-agent-kit/dossier-agent-kit/schemas/router.json` | **Decision tree (R1–R12)** | — |
| `kit/dossier-agent-kit/dossier-agent-kit/schemas/composition_matrix.json` | **Init order + conflict resolution + 3 budget caps** | — |
| `kit/dossier-agent-kit/dossier-agent-kit/schemas/forbidden_patterns.json` | **10 CC + per-kind additions** | — |
| `kit/dossier-agent-kit/dossier-agent-kit/starters/nextjs-gsap-lenis/` | **Real working starter** (12 components, 14 tests, 10 routes, CI) — AR removed (Phase 1) | — |
| `kit/dossier-agent-kit/dossier-agent-kit/examples/golden-trace-saas-marketing/TRACE.md` | **End-to-end worked example** | — |

### `resources/` — research base (3 model dossiers, 2026-07-29 scrape)

| Path | Use it for | Don't use |
|---|---|---|
| `resources/animated_website_minimax_3/` | **CANONICAL** — 30+ files, 12-kind taxonomy, 95 tokens, license posture, 8 corrections | — |
| `resources/animated_website_deepseek_flash/` | **Secondary** — 20-genre inventory + deep anti-pattern coverage + 60+ resources / 80+ templates | — |
| `resources/animated_website_minimax_2.7/` | — | **Pre-correction — DO NOT USE as canonical** |

---

## Vendored tooling (the backdrop)

### `agents_manager/` — the orchestrator source
- `AGENTS.md` — controller context_gen (vendored)
- `SKILL.md` — master orchestration protocol (~57KB)
- `CHANGELOG.md` — system evolution (read newest entry first, ~158KB total)
- `README.md` — controller readme
- **Sub-agent roles** (each has its own `SKILL.md`):
  - `coder/` — am-coder (writes code per plan)
  - `research/` — am-research (research reports)
  - `planning/` — am-planning (phased plans)
  - `design/` — am-design (v0.9.0+; design artifacts, NOT source)
  - `review/` — am-review (validates coder work)
  - `investigate/` — am-investigate (v0.18.0+; root-cause bugs)
  - `ship/` — am-ship (v0.18.0+; release)
  - `health/` — am-health (v0.18.0+; report-only health score)
  - `assets/` — am-assets (v0.9.0+; Phase 3a asset gatekeeper)
  - `extract/` — non-roster; on-demand extraction skill
  - `memory/`, `chub-gate/`, `chub-validate/`, `upstream-contrib/`

**Hard rule:** Do NOT edit `agents_manager/<role>/SKILL.md` unless redesigning the vendored controller.

### `bin/` — installers
- `agents-manager.py` (Python UX, stdlib only — **recommended**)
- `agents-manager` / `.ps1` / `.sh` / `.cmd` (platform dispatchers)
- `install.py` / `.ps1` / `.sh` / `.cmd` (skill install with `--global/--local/--both/--skip`)
- `release-zip.ps1` / `.sh` / `release-zip-all.sh` (build release ZIP from allowlist)
- `lint-design.sh` (shellcheck)
- `check.ps1` / `.sh` (smoke)
- `update.ps1` / `.sh` (update existing install)
- `standalone-installer/` — downloads latest release from GitHub, runs bundled installer
- `skills-manifest.json` — manifest consumed by installers
- `README.md` — full flag set

### `share/` — inter-agent communication bus
**Only** channel sub-agents use to talk. Layout (per `share/README.md`):
- `handoffs/00_user_task.md` — master writes at Phase 0
- `notes/01_research_*.md` — research output
- `notes/02_plan_high_*.md`, `02_plan_phases_*.md` — planning output
- `notes/03_coder_summary_*.md` — coder work summary
- `notes/99_decisions.md` — append-only decision log (NEVER edit past entries)
- `design/<task-id>/` — am-design output tree (v0.9.0+)
- `reports/04_review_*.md` — review verdicts
- `templates/` — has `_archive/` + `cinematic-landing-fixes.md`

### `tasks/` — task tracker
- `README.md` — task format docs
- `T-YYYY-MM-DD-NNN.md` — one file per task id
- Phase log + sub-task rows live here

### `scripts/` — validation
- `validate-frontmatter.py` — controller frontmatter lint (CI runs this)
- `validate-trace.sh` / `validate-memory.sh` / `backfill-research-metrics.sh` / `append-trace.py`

### `.agents/skills/` — project-local skill overrides
- `mavis-team/` — coordinate a multi-agent team plan (explicit `/mavis-team` only)

---

## Common questions → answer (no searching needed)

**Q: I'm starting a new animated website. What do I open first?**
A: `README.md` → `kit/USAGE_GUIDE.md` Step 1 (`08_corrections_vs_source.md`) → `schemas/router.json`.

**Q: Where are the 12 kinds defined?**
A: Two places, both authoritative:
- `kit/dossier-agent-kit/dossier-agent-kit/schemas/kinds.json` (queryable, machine-readable)
- `resources/animated_website_minimax_3/01_kinds/01_kinds.md` (human-readable, with 7 emerging)

**Q: Where are the 95 motion tokens?**
A: `resources/animated_website_minimax_3/06_motion_grammar.md`. Quick reference in `kit/USAGE_GUIDE.md` § "95 TOKENS".

**Q: What is the budget cap (concurrent animations, etc.)?**
A: `kit/dossier-agent-kit/dossier-agent-kit/schemas/composition_matrix.json`. Quick reference in `kit/USAGE_GUIDE.md` § "3 BUDGET CAPS".

**Q: Where do I find the forbidden patterns / anti-patterns?**
A: `kit/dossier-agent-kit/dossier-agent-kit/schemas/forbidden_patterns.json`. CC1–CC10 cross-cutting + K1-1…K12-2 per-kind.

**Q: Where is the license watchlist?**
A: `resources/animated_website_minimax_3/07_license_posture.md` (6 watchlist items + 8 diligence steps).

**Q: Where is the freshness policy (what to re-verify vs trust)?**
A: `kit/dossier-agent-kit/dossier-agent-kit/freshness_protocol.md` (3 tiers).

**Q: Where is the end-to-end worked example?**
A: `kit/dossier-agent-kit/dossier-agent-kit/examples/golden-trace-saas-marketing/TRACE.md`.

**Q: What files are placeholders I should replace?**
A: All current placeholders are swapped. See `kit/ASSETS_README.md` for the swap chain and `kit/ASSET_SPECS.md` for replacement specs.

**Q: I want to understand the vendored orchestrator's pipeline.**
A: `agents_manager/AGENTS.md` → `agents_manager/SKILL.md` → `agents_manager/<role>/SKILL.md` per specialist. Pipeline shape in `agents_manager/README.md` "The seven agents".

**Q: How do I install agents-manager into another project?**
A: `bin/README.md` + `bin/standalone-installer/README.md`. Python UX recommended: `python3 bin/agents-manager.py`.

**Q: What's new in the latest vendored agents-manager release?**
A: `agents_manager/CHANGELOG.md` (top entry = newest). Also `agents_manager/README.md` "What's new in v0.16.0" etc.

**Q: Where do agents write their output?**
A: `share/README.md` "Who reads / writes what" table.

**Q: Where are past tasks?**
A: `tasks/T-YYYY-MM-DD-NNN.md`.

---

## Things to NEVER do

- Don't use `resources/animated_website_minimax_2.7/` as canonical — it's pre-correction.
- Don't trust bare `https://cloudflare.com` or `https://github.io` (without a real path) CDN URLs in templates — they're scrape placeholders. (Phase 1 sweep found none in deepseek_flash; cdnjs paths with versions and `*.github.io` real-repo URLs are fine.)
- Don't edit `agents_manager/<role>/SKILL.md` unless redesigning the vendored controller.
- Don't commit anything unless the user explicitly asks.
- Don't skip the review phase because "it looks fine."
- Don't bypass `freshness_protocol.md` Tier 3 — re-verify versions/CDNs every time before hardcoding. (Phase 2 re-verified all package.json deps against the live npm registry — see `kit/VERIFICATION.md` §freshness.)
- Don't put `@theatre/studio` (AGPL-3.0-only) or Remotion-at-scale (SEE LICENSE IN LICENSE.md with commercial threshold) in a stack without flagging it.
- Don't animate width/height/top/left/right/bottom/margin/padding (CC1) — use transform/opacity only.
- Don't auto-select kind-xi (AR) or kind-xii (AI live motion) — both require explicit human opt-in (R11, R12).

---

## File tree (one-glance)

```
E:\react_projects\animated_website\
├── README.md                   ← animated-website generator pitch
├── INDEX.md                    ← you are here
├── AGENTS.md                   ← animated-website project context_gen
├── CLAUDE.md                   ← top-level orientation + auto-routing
├── FINAL_VISION.md             ← target state + validation checklist
├── opencode.jsonc              ← vendored agent definitions
├── .gitignore
├── agents_manager/             ← vendored controller source
│   ├── AGENTS.md               ← controller context_gen (vendored)
│   ├── SKILL.md                ← master orchestration protocol
│   ├── CHANGELOG.md
│   ├── README.md
│   ├── coder/ research/ planning/ design/ review/ investigate/ ship/ health/ assets/ extract/
│   └── memory/ chub-gate/ chub-validate/ upstream-contrib/
├── bin/                        ← vendored installers + release + smoke
├── share/                      ← vendored inter-agent communication bus
├── tasks/                      ← vendored T-YYYY-MM-DD-NNN task files
├── scripts/                    ← vendored validation
├── .agents/skills/mavis-team/  ← vendored project-local skill override
├── kit/                        ← animated-website agent kit (the project)
│   ├── USAGE_GUIDE.md
│   ├── CLEANUP_LIST.md
│   ├── ASSETS_README.md
│   ├── ASSET_SPECS.md
│   ├── SAMPLE_VALIDATION.md
│   ├── VERIFICATION.md
│   ├── poster.jpg / poster.webp / product.glb / track.mp3 / icons/onboarding.lottie
│   └── dossier-agent-kit/
│       └── dossier-agent-kit/
│           ├── README.md
│           ├── freshness_protocol.md
│           ├── VERIFICATION.md      ← duplicate of root kit/VERIFICATION.md
│           ├── schemas/             ← kinds.json, router.json, composition_matrix.json, forbidden_patterns.json
│           ├── starters/
│           │   └── nextjs-gsap-lenis/   ← 12 components, 14 tests, 10 routes (AR removed Phase 1)
│           └── examples/
│               └── golden-trace-saas-marketing/TRACE.md
└── resources/                  ← three model research dossiers
    ├── animated_website_minimax_3/        ← CANONICAL
    ├── animated_website_deepseek_flash/   ← secondary (breadth)
    └── animated_website_minimax_2.7/      ← DO NOT USE (pre-correction)
```
