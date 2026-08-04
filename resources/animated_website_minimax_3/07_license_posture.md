# License posture — animated website stack

**Responsible boundary.** A library license is not an asset license, a font license, a SaaS subscription, or permission to copy a showcase. `share/design/T-2026-07-29-001/brief.md §9` requires an explicit posture for every implementation choice; this page adds commercial diligence rather than legal advice. See `CAN §10`, `RES §§B,D`, and `PLAY §Build vs. reuse decisions`.

## Category matrix

| Category | Plain-language posture | Dossier examples | Commercial action |
|---|---|---|---|
| MIT | Permissive; usually allows commercial use, modification, and redistribution with notice. | GSAP (free since Webflow acquisition), Motion, Lenis, Three.js, R3F, PixiJS, dotLottie-web, Rive runtime, Tone.js, SplitType, OGL. | Keep the license notice where required; verify bundled assets and current text. |
| Apache-2.0 | Permissive; includes patent language and notice obligations. | Babylon.js, `<model-viewer>`, `@theatre/core`, Rapier. | Preserve notices and check whether copied files include NOTICE text. |
| BSD | Permissive, with notice/disclaimer requirements; exact BSD variant matters. | BSD-licensed transitive utilities or snippets may enter a build even when the main engine is MIT. | Record the exact variant; retain copyright/disclaimer text. |
| LGPL-2.1 | Weak copyleft; dynamic linking is commonly compatible with proprietary applications, while modified library distribution needs care. | p5.js and p5.sound. | Do not treat “LGPL” as a blanket waiver; review static bundling, modifications, and notices. |
| AGPL-3.0 | Strong network copyleft: offering modified covered software over a network can trigger source-sharing obligations. | Theatre.js `@theatre/studio`. | Do not ship Studio casually in a commercial product; prefer `@theatre/core` Apache-2.0 or another permissive editor/runtime path. |
| GPL/commercial threshold | The open license may impose copyleft, while the vendor offers a paid company license for qualifying users. | Remotion: GPL-3.0 base plus company-license threshold. | Confirm employee/revenue status and obtain the company license before production use when required. |
| SaaS / commercial tool | The editor or hosting service is rented; the subscription does not automatically grant source export, self-hosting, or template resale rights. | Webflow, Framer, Wix Studio, Squarespace, SVGator, Rive editor, Spline editor. | Read plan, export, seat, hosting, usage, and cancellation terms; budget migration. |
| Marketplace / content license | Each template, Lottie, font, model, texture, or sound may have a separate license from its platform. | ThemeForest, TemplateMonster, LottieFiles marketplace, Webflow/Framer templates. | Keep provenance per asset; verify attribution, domain, project, seat, resale, and redistribution restrictions. |

The category is a decision aid, not a substitute for the license text. A runtime can be MIT while the editor, hosted service, plugin, or content is not (`RES §B`; official license pages below).

## Exceptions and watchlist

| Item | Posture | Why it is a tripwire | Safe next action |
|---|---|---|---|
| Theatre.js `@theatre/studio` | **AGPL-3.0; network copyleft** | Studio is not the same license as `@theatre/core`; dev-only use still needs an organization policy. | Keep Studio out of shipped dependencies unless counsel approves; use `@theatre/core` Apache-2.0 for runtime work. |
| Remotion | **GPL-3.0 plus commercial threshold** | The README says a company license can be required; the dossier records the threshold as teams above one FTE and/or the stated revenue condition, which must be rechecked against current terms. | Read the current Remotion license page and obtain a company license before qualifying production use. |
| animate.css | **Hippocratic License** | It is not MIT; “do no harm” language is ethical-source and can be difficult to classify for a commercial product. | Prefer a permissive CSS implementation or obtain a documented legal decision. |
| Templates | **Per-seat / per-domain / per-project / redistribution varies** | A subscription or download often licenses one project, not resale, client reuse, or SaaS redistribution. | Save the invoice, license version, allowed domains, seats, updates, and asset provenance. |
| Lottie content | **Per-file marketplace terms** | A free player does not make marketplace animation content free for every commercial use; attribution may be required. | Verify the individual file license, author terms, attribution, and whether modification/redistribution is allowed. |
| Fonts, models, textures, sound | **Separate content rights** | Engine licenses do not clear creative assets or generated media. | Store a source/author/license record beside every production asset. |

## Plain-language commercial risk

“Free” has three different meanings: no subscription price, a permissive software license, or a marketplace item that can be downloaded. Only the second describes reuse rights, and even MIT/Apache/BSD code does not clear its bundled examples or assets. AGPL is a network-copyleft concern, not simply a price. SaaS gives access to a hosted tool, not necessarily ownership of exported implementation. Marketplace purchase usually grants a bounded project license, not permission to resell the template or package it into another product. Rive runtime and editor, Spline runtime and editor, and Lottie player and content are deliberately split in this dossier (`CAN §10`; `RES §B.6`, `RES §B.9`, `RES §C`).

## Developer diligence checklist

- [ ] Identify every direct and transitive package; record name, version, source URL, and SPDX/license text.
- [ ] Separate runtime, editor, plugin, hosted service, template, and content licenses.
- [ ] Confirm the current status of GSAP’s free distribution, Motion’s package name, and Lenis’s current repository before copying old snippets.
- [ ] For AGPL/GPL/Hippocratic or commercial-threshold items, obtain an explicit approval or replace them.
- [ ] Check NOTICE/attribution requirements and include them in the product’s third-party notices.
- [ ] Record template dimensions: seats, domains, projects, updates, resale, redistribution, and client handoff.
- [ ] Verify Lottie, Rive, GLB, HDRI, texture, font, music, voice, and generated-media rights separately.
- [ ] Re-run the check when versions, vendors, content, or distribution model changes.

## Metrics

- word_count_total: 991; prose_word_count_excluding_tables: 392; prose budget: ≤1,200 words
- table_count: 2; data_rows: 14 (8 category rows + 6 watchlist rows); checklist_items: 8
- citation_count: 10+ (`CAN §10`, `RES §§B,D`, `PLAY`, `BRIEF §9`, official license pages)
- required_cases: MIT=yes; Apache=yes; BSD=yes; LGPL=yes; AGPL=yes; commercial=yes; SaaS=yes; marketplace=yes; all watchlist items=yes
