# Appendix — changelog

This record explains how the dossier differs from sibling research at `research_doc/animated_website_deepseek_flash/` and from the scraped source. It describes reader-visible decisions, not implementation mechanics. The motion-contract changes follow `share/design/T-2026-07-29-001/brief.md §9`.

| # | Area | Earlier material | Dossier change | Why it changed | Evidence |
|---:|---|---|---|---|---|
| 1 | Evidence authority | Sibling files and scrape mixed examples, claims, and links. | `CAN` and `BRIEF` are authorities; scrape and sibling research are evidence/gap checks. | Readers need to know which statements are safe to repeat. | `CAN §1`; `BRIEF §10` |
| 2 | Taxonomy | Sibling build language used historical labels inconsistently. | Twelve canonical IDs are `kind-i` through `kind-xii`, organized by trigger × surface. | Stable IDs let founders, developers, and agents cross-link the same kind. | `CAN §3`; `TAX` |
| 3 | GSAP price | Older research implied paid plugins or commercial limits. | GSAP is recorded as MIT/free after the Webflow 2024 acquisition. | Removes a stale cost barrier while preserving current-terms diligence. | `CAN §1.1`; `RES §B.1`; GSAP pricing |
| 4 | React animation name | Sibling/scrape called the package “Framer Motion.” | New material says Motion, package `motion`, React import `motion/react`; old name appears only as migration history. | Prevents agents from generating outdated imports. | `CAN §1.2`; Motion docs |
| 5 | Three-dimensional baseline | Earlier material framed WebGPU as future or omitted r185. | `kind-ii` names Three.js r185+ and WebGPU with WebGL fallback. | The baseline moved, but capability diversity remains real. | `CAN §1.8`; `RES §B.3`; Three.js |
| 6 | Performance explanation | Scrape said CSS runs on the main thread and mixed layout properties with compositor properties. | Dossier distinguishes `transform`/`opacity` from layout-triggering properties and requires measurement. | More accurate guidance prevents false GPU claims. | `CAN §1.4`; `BRIEF §6`; web.dev Animations |
| 7 | Motion values | Sibling guides used engine defaults and occasional unlabelled timing prose. | All cross-cutting guidance names dot-separated brief tokens and supplies a reduced-motion mapping. | The brief is a contract, not decorative inspiration. | `BRIEF §§4–7,9`; `06_motion_grammar.md` |
| 8 | Reduced motion | Scrape favored a blanket duration override. | Dossier maps large movement to final state, `motion.distance.none`, static frames, or normal flow; small feedback remains available. | Per-behavior fallback preserves accessibility and widget stability. | `BRIEF §5`; `CAN §7` |
| 9 | Lenis provenance | Older links pointed to `studio-freight/lenis`. | All current guidance points to `darkroomengineering/lenis`. | The old organization no longer identifies the maintained source. | `CAN §1.5`; `RES §B.2` |
| 10 | License posture | “Free” labels collapsed software, editor, SaaS, and content rights. | Added category matrix and watchlist for AGPL Studio, Remotion threshold, animate.css Hippocratic, template dimensions, and Lottie content. | Commercial risk is usually in the boundary around a library, not its demo. | `CAN §10`; `RES §§B,D`; `07_license_posture.md` |
| 11 | Scrape URLs | Source contained `cloudflare.com` and generic/bare GitHub Pages artifacts. | Corrections ledger rejects them; references contain deduplicated, full, stable URLs only. | Agents must not copy non-working endpoints into deliverables. | `CAN §1.3`; `RES §A.2`; `08_corrections_vs_source.md` |
| 12 | Conversion | Earlier playbook was a broad migration narrative. | Added exactly ten ordered steps: audit, kind selection, grammar, smallest stack, progressive enhancement, fallback, budgets, tests, flag/RUM, rollback. | Teams need a reversible path from baseline evidence to rollout. | `CAN §8`; `PLAY Conversion playbook`; `05_conversion_playbook.md` |
| 13 | Testing | Research named tests without one cross-cutting contract. | Playwright + axe-core + Lighthouse CI are the concrete stack, described framework-agnostically. | Agents can verify behavior, accessibility, and field-sensitive performance. | `CAN §2`; `PLAY Steps 8–9` |
| 14 | Appendix | Sibling catalogs had useful but duplicated URLs and terms. | Added deduplicated references, founder/dev glossary, and this change record. | One source list lowers link drift and makes handoff readable. | `CAN §12`; `RES §B`; `BRIEF §10` |

## License posture changes called out explicitly

- GSAP moved from an implied paid recommendation to MIT/free in the current catalog.
- Motion remains MIT, but the package/import correction prevents stale dependency selection.
- Theatre.js is split: `@theatre/core` Apache-2.0; `@theatre/studio` AGPL-3.0 watchlist.
- Remotion remains a deliberate commercial-threshold warning rather than a default site-animation dependency.
- animate.css is listed as Hippocratic, not MIT.
- SaaS builders and marketplace templates are access/licensing models, not automatically redistributable source.
- Lottie player licenses do not clear individual marketplace content.

## Metrics

- word_count_total: 786; prose_word_count_excluding_table: 156; prose budget: ≤800 words
- table_count: 1; data_rows: 14 diff rows
- citation_count: 32 (14 row evidence pointers + CAN/RES/PLAY/BRIEF/official sources)
- coverage: sibling_research=yes; scrape_corrections=yes; dossier_additions=yes; license_changes_explicit=yes; BRIEF §9=yes
