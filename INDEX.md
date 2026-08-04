# Project Index — `E:\react_projects\animated_website`

One-stop reference for the entire repo. Read this first, then drill into the specific file/folder you need.

> This repo is **two things in one**:
> 1. The **agents-manager controller** itself (the orchestration system — what gets released).
> 2. A **downstream animated-website project** built using agents-manager, which produced the `kit/` and `resources/` you see here.

If you're working on the controller → focus on `agents_manager/`, `bin/`, `share/`, `tasks/`, `opencode.jsonc`, `AGENTS.md`, `CLAUDE.md`.
If you're working on the animated-website project → focus on `kit/`, `resources/`, and the index/guide files at root (`INDEX.md`, `USAGE_GUIDE.md`, `CLEANUP_LIST.md`, `FINAL_VISION.md`).

---

## Quick navigation — what's where

| Path | What it is | Read/use it for |
|---|---|---|
| **`INDEX.md`** | This file | One-stop reference. Start here. |
| **`USAGE_GUIDE.md`** | What to use / not use, 12 kinds, 95 tokens, 8-step workflow | Animated-website tasks |
| **`CLEANUP_LIST.md`** | A. delete/replace actions · B. do-not-use items | Tidying the repo |
| **`FINAL_VISION.md`** | Target state + validation checklist | Verifying "done" |
| **`AGENTS.md`** | controller's own context_gen rules | Working ON the controller |
| **`CLAUDE.md`** | Top-level orientation + auto-routing rule | Understanding how the controller routes work |
| **`opencode.jsonc`** | Agent definitions (master + 9 specialists) | Working ON the controller |
| **`README.md`** | Public-facing readme (badges, install, pipeline) | Onboarding new users |

---

## Controller side (skip if you're only working on the animated-website project)

### `agents_manager/` — the controller source
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

**Hard rule:** Do NOT edit `agents_manager/<role>/SKILL.md` unless redesigning the controller.

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

## Animated-website project side

### `kit/` — the agent kit
| Path | Use it for | Don't use |
|---|---|---|
| `kit/USAGE_GUIDE.md` | What to use / not, 12 kinds, 95 tokens, 8-step workflow | — |
| `kit/CLEANUP_LIST.md` | A. delete/replace · B. do-not-use | — |
| `kit/SAMPLE_VALIDATION.md` | 1 brief per site_type — 6 router traces, all clean | — |
| `kit/ASSET_SPECS.md` | poster.jpg + product.glb specs, swap procedure, route re-test list | — |
| `kit/ASSETS_README.md` | Which assets are placeholders vs production (Phase 6 specs in ASSET_SPECS.md) | — |
| `kit/VERIFICATION.md` | What was actually run + 3 real bugs caught | — |
| `kit/poster.jpg` | — | **Placeholder — replace before production** |
| `kit/product.glb` | — | **Placeholder cube — replace before production** |
| `kit/dossier-agent-kit/dossier-agent-kit/README.md` | 7-step agent workflow | — |
| `kit/dossier-agent-kit/dossier-agent-kit/freshness_protocol.md` | 3-tier freshness rules | — |
| `kit/dossier-agent-kit/dossier-agent-kit/VERIFICATION.md` | Duplicate of root kit/VERIFICATION.md | — |
| `kit/dossier-agent-kit/dossier-agent-kit/schemas/kinds.json` | **Queryable 12-kind matrix** | — |
| `kit/dossier-agent-kit/dossier-agent-kit/schemas/router.json` | **Decision tree (R1–R12)** | — |
| `kit/dossier-agent-kit/dossier-agent-kit/schemas/composition_matrix.json` | **Init order + conflict resolution** | — |
| `kit/dossier-agent-kit/dossier-agent-kit/schemas/forbidden_patterns.json` | **10 CC + per-kind additions** | — |
| `kit/dossier-agent-kit/dossier-agent-kit/starters/nextjs-gsap-lenis/` | **Real working starter** (12 components, 14 tests, 10 routes, CI) — AR removed (Phase 1) | — |
| `kit/dossier-agent-kit/dossier-agent-kit/examples/golden-trace-saas-marketing/TRACE.md` | **End-to-end worked example** | — |
| `kit/dossier-agent-kit/dossier-agent-kit/{schemas,starters/nextjs-gsap-len is/...` | — | **DELETED (Phase 1) — was 8 empty subdirs** |

### `resources/` — three model research dossiers (2026-07-29 scrape)
| Path | Use it for | Don't use |
|---|---|---|
| `resources/animated_website_minimax_3/` | **CANONICAL** — 30+ files, 12-kind taxonomy, 95 tokens, license posture, 8 corrections | — |
| `resources/animated_website_deepseek_flash/` | **Secondary** — 20-genre inventory + deep anti-pattern coverage + 60+ resources / 80+ templates | — |
| `resources/animated_website_minimax_2.7/` | — | **Pre-correction — DO NOT USE as canonical** |
| Any `https://cloudflare.com` or bare `https://github.io` script src in HTML templates | — | **Scrape placeholder URLs** (none found in deepseek_flash in Phase 1 — cdnjs paths and `*.github.io` repos are real; warning applies to upstream scrape source, not these docs) |

---

## Common questions → answer (no searching needed)

**Q: I'm starting a new animated website. What do I open first?**
A: `INDEX.md` → `USAGE_GUIDE.md` Step 1 (`08_corrections_vs_source.md`) → `schemas/router.json`.

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
A: `CLEANUP_LIST.md` § A.2 — `kit/poster.jpg` (PIL placeholder), `kit/product.glb` (pygltflib placeholder cube). `kit/product.usdz` is no longer required — AR/kind-xi removed in Phase 1.

**Q: I want to understand the controller pipeline.**
A: `AGENTS.md` → `agents_manager/SKILL.md` → `agents_manager/<role>/SKILL.md` per specialist. Pipeline shape in `README.md` § "The seven agents".

**Q: How do I install agents-manager into another project?**
A: `bin/README.md` + `bin/standalone-installer/README.md`. Python UX recommended: `python3 bin/agents-manager.py`.

**Q: What's new in the latest release?**
A: `agents_manager/CHANGELOG.md` (top entry = newest). Also `README.md` "What's new in v0.16.0" etc.

**Q: Where do agents write their output?**
A: `share/README.md` "Who reads / writes what" table.

**Q: Where are past tasks?**
A: `tasks/T-YYYY-MM-DD-NNN.md`.

---

## Things to NEVER do

- Don't use `resources/animated_website_minimax_2.7/` as canonical — it's pre-correction.
- Don't trust bare `https://cloudflare.com` or `https://github.io` (without a real path) CDN URLs in templates — they're scrape placeholders. (Phase 1 sweep found none in deepseek_flash; cdnjs paths with versions and `*.github.io` real-repo URLs are fine.)
- Don't put `kit/poster.jpg` or `kit/product.glb` in production — both are placeholders. `kit/product.usdz` is no longer required (AR removed in Phase 1).
- Don't edit `agents_manager/<role>/SKILL.md` unless redesigning the controller.
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
├── INDEX.md                    ← you are here
├── USAGE_GUIDE.md              ← what to use / not (animated-website tasks)
├── CLEANUP_LIST.md             ← A. delete/replace · B. do-not-use
├── FINAL_VISION.md             ← target state + validation checklist
├── AGENTS.md                   ← controller rules (when working ON controller)
├── CLAUDE.md                   ← top-level orientation + auto-routing
├── README.md                   ← public readme
├── opencode.jsonc              ← agent definitions
├── .gitignore
├── agents_manager/             ← controller source (10 specialists + master)
├── bin/                        ← installers + release + smoke
├── kit/                        ← animated-website agent kit
│   ├── USAGE_GUIDE.md
│   ├── CLEANUP_LIST.md
│   ├── ASSETS_README.md
│   ├── VERIFICATION.md
│   ├── poster.jpg              ← PLACEHOLDER
│   ├── product.glb             ← PLACEHOLDER
│   └── dossier-agent-kit/
│       └── dossier-agent-kit/
│           ├── README.md
│           ├── freshness_protocol.md
│           ├── VERIFICATION.md
│           ├── SAMPLE_VALIDATION.md  ← one brief per site_type (Phase 3)
│           ├── schemas/        ← kinds.json, router.json, composition_matrix.json, forbidden_patterns.json
│           ├── starters/
│           │   └── nextjs-gsap-lenis/    ← 12 components, 14 tests, 10 routes (AR removed Phase 1)
│           ├── examples/
│           │   └── golden-trace-saas-marketing/TRACE.md
├── resources/                  ← three model research dossiers
│   ├── animated_website_minimax_3/        ← CANONICAL
│   ├── animated_website_deepseek_flash/   ← secondary (breadth)
│   └── animated_website_minimax_2.7/      ← DO NOT USE (pre-correction)
├── share/                      ← inter-agent communication bus
├── tasks/                      ← T-YYYY-MM-DD-NNN task files
├── scripts/                    ← validation
└── .agents/skills/mavis-team/  ← project-local skill override
```