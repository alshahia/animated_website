# Animated-Website Research Dossier — Index

**Task:** T-2026-07-29-001  
**Date:** 2026-07-29  
**Authority:** `share/notes/01_research_T-2026-07-29-001.md` (canonical merge); `share/design/T-2026-07-29-001/brief.md` (motion grammar)  
**Audience:** senior web developers · junior developers · non-technical founders (all three)

This dossier is **research, not source code**. It catalogs every kind of animated website a developer or no-code user can ship in 2026, the libraries/templates that ship them, the build playbook per kind, and the conversion playbook for retrofitting motion into a static site. Everything cited has a verified URL and an explicit license posture.

---

## 1. Deliverable → file map

| # | User-named deliverable | Files | Authority |
|---|---|---|---|
| 1 | All kinds/genres/types of animated websites | `01_kinds/01_kinds.md`, `01_kinds/01_kinds_taxonomy.md`, `01_kinds/02_emerging_kinds.md` | canonical §3 + taxonomy angle |
| 2 | Resources (libraries, tools, platforms) — what each offers | `02_resources/02_resources.md` + `02_resources/01_animation_engines.md` … `02_resources/07_curator_galleries.md` | canonical §4 + resources angle §B |
| 3 | Ready templates/examples (online or offline) | `02_resources/08_templates_online_saas.md`, `02_resources/09_templates_oss_github.md`, `02_resources/10_templates_commercial_marketplace.md`, `02_resources/11_templates_offline.md` | canonical §5 + resources angle §C |
| 4 | Per-kind build guides for humans AND agents | `03_build_guides/03_build_guides.md` + 12 kind files *(Chunk B — links below are forward)* | canonical §6 + build-playbook angle |
| 5 | What to use / avoid, with reasons | `04_do_dont.md` *(Chunk C)* | canonical §7 |
| 6 | Normal → animated conversion playbook | `05_conversion_playbook.md` *(Chunk C)* | canonical §8 |

## 2. Cross-cutting support docs

| File | Chunk | Authority |
|---|---|---|
| `06_motion_grammar.md` | B | canonical §9 + design brief |
| `07_license_posture.md` | B | canonical §10 + resources angle §B license flags |
| `08_corrections_vs_source.md` | B | canonical §1 (8 corrections vs scraped source) |
| `99_appendix/references.md` | C | canonical §12 + angle URL lists |
| `99_appendix/glossary.md` | C | terms used across the dossier |
| `99_appendix/changelog.md` | C | changes vs sibling research + scrape |

> **Status:** This readme ships Chunk A only. Chunk B (build guides + support) and Chunk C (do/don't, conversion, appendix) links are pre-baked so the final link map is checkable after all chunks land.

## 3. Reading order (pick your path)

| Path | Reader | Start here |
|---|---|---|
| **Path A — non-technical founder** | Founder, PM, designer | `01_kinds/01_kinds.md` → `02_resources/06_no_code_platforms.md` → `02_resources/08_templates_online_saas.md` → `02_resources/07_curator_galleries.md` |
| **Path B — junior developer** | < 2 yrs experience | `01_kinds/01_kinds_taxonomy.md` → `02_resources/01_animation_engines.md` → `02_resources/09_templates_oss_github.md` → `03_build_guides/03_build_guides.md` (Chunk B) |
| **Path C — senior developer** | Architect / lead | `02_resources/02_resources.md` → `03_build_guides/03_build_guides.md` (Chunk B) → `08_corrections_vs_source.md` (Chunk B) → `04_do_dont.md` (Chunk C) |

## 4. Link map (Chunk A)

```
00_README.md                                  ← this file (dossier map)
├── 01_kinds/
│   ├── 01_kinds.md                          ← master matrix (12 primary + 7 emerging)
│   ├── 01_kinds_taxonomy.md                 ← trigger × surface taxonomy
│   └── 02_emerging_kinds.md                 ← 7 emerging kinds (status + caveats)
└── 02_resources/
    ├── 02_resources.md                      ← canonical library index
    ├── 01_animation_engines.md              ← GSAP, Motion, anime.js, Theatre.js
    ├── 02_scroll_driven.md                  ← Lenis, CSS animation-timeline, ScrollTrigger
    ├── 03_3d_webgl_webgpu.md                ← Three.js, R3F, Babylon, <model-viewer>
    ├── 04_generative_shader.md              ← p5.js, canvas-sketch, Shadertoy, OGL
    ├── 05_animated_illustration.md          ← Lottie/dotLottie, Rive, SVGator
    ├── 06_no_code_platforms.md              ← Webflow, Framer, Wix Studio, Squarespace
    ├── 07_curator_galleries.md              ← godly, awwwards, hoverstat.es
    ├── 08_templates_online_saas.md          ← Webflow/Framer/Wix Studio templates
    ├── 09_templates_oss_github.md           ← ~15 OSS animated starters
    ├── 10_templates_commercial_marketplace.md ← ThemeForest, TemplateMonster
    └── 11_templates_offline.md              ← Sal.js, AutoAnimate, Lottie offline
```

Forward links (Chunks B + C — not yet on disk):
- `03_build_guides/03_build_guides.md` and 12 kind files
- `04_do_dont.md` · `05_conversion_playbook.md`
- `06_motion_grammar.md` · `07_license_posture.md` · `08_corrections_vs_source.md`
- `99_appendix/{references,glossary,changelog}.md`

## 5. Global safety rules (apply to every file in this dossier)

1. **License posture is explicit.** Every table that names a library, platform, or template has a `License` column. SaaS, commercial marketplace, AGPL, LGPL, Hippocratic, and commercial-threshold cases are not collapsed into "free".
2. **Motion advice uses named tokens.** Durations, easings, distances, and delays are referenced by dot-separated token paths (`motion.duration.base`, `motion.easing.enter`, `motion.distance.md`, `motion.delay.item`) from the design brief, not raw millisecond values.
3. **`prefers-reduced-motion` is mandatory.** Every build path (CSS-only, timeline, scroll-driven, SVG, canvas, WebGL, page-transition) must include a reduced-motion fallback. The brief's contract is "accessibility-by-default."
4. **No scraped placeholders propagate.** The three `<script src="https://cloudflare.com">` and bare `https://github.io` artifacts from `resources/animated_website_raw_research.txt` are not used. Real CDN URLs only (e.g., `https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js`).
5. **Corrections vs source are propagated.** Eight canonical corrections (GSAP free, Motion rename, Lenis repo moved, Theatre.js studio AGPL, Remotion commercial, Three.js r185+WebGPU baseline, CSS compositor-only, scrape placeholders) appear wherever a library is named. Detail in `08_corrections_vs_source.md` (Chunk B).
6. **External version claims are tagged.** Where a specific version is cited (e.g., GSAP 3.12.5, Three.js r185), the data is from the angle files which were verified on 2026-07-29. New claims added beyond the angle files are marked `[UNVERIFIED]`.
7. **Audience is explicit.** Every reader-facing recommendation names whether it is for senior devs, junior devs, or non-technical founders — never silently assumes one audience.

## 6. Authoritative sources (always cite, never paraphrase)

| Source | Path | Authority for |
|---|---|---|
| Canonical research merge | `share/notes/01_research_T-2026-07-29-001.md` | Master view, 10 auto-defaults, top corrections, license posture |
| Taxonomy angle | `share/notes/01_research_T-2026-07-29-001_angle-taxonomy.md` | 12-kind taxonomy, source extract, evidence tags |
| Resources angle | `share/notes/01_research_T-2026-07-29-001_angle-resources.md` | 70+ libraries + 4 template categories + license flags |
| Build playbook angle | `share/notes/01_research_T-2026-07-29-001_angle-build-playbook.md` | Per-kind build steps, 30 use + 30 avoid, 10-step conversion |
| Motion grammar brief | `share/design/T-2026-07-29-001/brief.md` | Motion / color / type / layout tokens; reduced-motion contract |
| Master synthesis | `share/notes/01_master_synthesis_T-2026-07-29-001.md` | Master's narrative + 6 honest weaknesses |

## 7. License posture summary (one-screen reminder)

| Posture | Examples | Use guidance |
|---|---|---|
| MIT / Apache-2.0 / BSD | GSAP, Motion, Three.js, R3F, Lenis, dotLottie, Rive runtime, p5.js (dynamic linking OK with LGPL), anime.js, shadcn/ui | Safe for any commercial use. Default pick. |
| LGPL-2.1 | p5.js | Safe with dynamic linking; do not redistribute modified p5.js source. |
| AGPL-3.0 | `@theatre/studio` | Network copyleft. For commercial work use `@theatre/core` (Apache-2.0) only. |
| Hippocratic License | animate.css | Ethical-source; subjective interpretation. Prefer MIT alternatives. |
| Commercial threshold | Remotion | Free for individuals/small companies; paid company license > 1 FTE AND revenue > EUR 1M. |
| SaaS subscription | Webflow, Framer, Wix Studio, Squarespace, SVGator, Spline | Per-seat/per-tier; check template/license posture separately. |
| Marketplace (template-level) | ThemeForest, TemplateMonster, Webflow Marketplace, LottieFiles marketplace | Per-template license varies; many require attribution or restrict redistribution. |

Full matrix in `07_license_posture.md` (Chunk B).

## 8. Next steps for the reader

- **Founder path:** read `01_kinds.md` (skim) → `02_resources/06_no_code_platforms.md` → pick a Webflow or Framer template → launch.
- **Developer path:** read `02_resources/02_resources.md` (canonical library index) → jump to the kind file you need → consult the corresponding `03_build_guides/<kind>.md` (Chunk B).
- **LLM/agent path:** same as developer path; the per-kind build guides (Chunk B) carry a separate `## LLM/agent-facing` section with copy-pasteable snippet shapes.

---

## Metrics

- word_count: ≈770 (within dossier-map budget)
- tables: 6 (deliverable map, cross-cutting support, reading order, link map, sources, license posture)
- table_rows_total: 31
- citations: 6 internal sources (canonical merge, taxonomy angle, resources angle, build-playbook angle, motion brief, master synthesis)
- audience_callouts: 3 paths (founder / junior dev / senior dev)
- forward_links_to_chunk_b_and_c: present (Chunk B = 13 files; Chunk C = 8 files)
