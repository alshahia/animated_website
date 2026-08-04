# Corrections versus source

The scraped conversation at `resources/animated_website_raw_research.txt` is evidence only. This ledger preserves the eight corrections accepted in `CAN §1`; actions below are the source-hygiene rules for humans and agents.

| # | Old claim | Correction | Evidence | Action |
|---:|---|---|---|---|
| 1 | GSAP was presented as paid or commercially restricted. | GSAP is free for all users after Webflow’s 2024 acquisition/sponsorship; the dossier treats GSAP and its named plugins as MIT/free, while still checking current terms. | `CAN §1.1`; `RES §B.1`; [GSAP pricing](https://gsap.com/pricing) | Replace paid-only recommendations; cite current GSAP pricing and keep a fallback engine decision. |
| 2 | “Framer Motion” was the current package and import name. | The library is **Motion**; install `motion` and import React APIs from `motion/react`. Existing `framer-motion` projects can migrate deliberately. | `CAN §1.2`; `RES §A.1/B.1`; [Motion docs](https://motion.dev/docs) | Rewrite new snippets and glossary entries; retain the old name only as a historical migration note. |
| 3 | Three.js r185 and WebGPU were absent or treated as future-facing. | Three.js r185+ with first-class WebGPU is the 2026 baseline for new 3D work, with WebGL fallback and feature detection still required. | `CAN §1.8`; `RES §B.3`; [Three.js](https://threejs.org) | Use `kind-ii` r185+ language; never make WebGPU-only support the default. |
| 4 | CSS animation was described as running on the main thread. | CSS `transform` and `opacity` animation can run on the compositor; layout properties such as dimensions and insets can require layout/paint work. | `CAN §1.4`; `PLAY Source extract #2/#35`; [web.dev Animations](https://web.dev/animations/) | Correct performance explanations and prefer compositor-friendly properties; measure rather than claim “GPU accelerated.” |
| 5 | Lenis was linked to `studio-freight/lenis`. | The maintained repository is `darkroomengineering/lenis`; the package remains `lenis` and its current docs live under the new organization. | `CAN §1.5`; `RES §B.2`; [current Lenis README](https://github.com/darkroomengineering/lenis#readme) | Replace old links in guides, snippets, and references; treat old-org links as migration history only. |
| 6 | Theatre.js Studio was treated as a permissive runtime. | `@theatre/studio` is AGPL-3.0 with network-copyleft implications; `@theatre/core` is Apache-2.0. | `CAN §1.6`; `RES §B.1`; [Theatre.js](https://www.theatrejs.com) | Keep Studio on the watchlist; use core or another permissive option for commercial shipping after diligence. |
| 7 | Remotion was described as unconditionally free. | Remotion has a commercial-license threshold; the open license and current company-license conditions must be checked before adoption. | `CAN §1.7`; `RES §B.1/R1`; [Remotion license](https://www.remotion.dev/license) | Do not label it “free” in a commercial recommendation; record team size, revenue, and license decision. |
| 8 | Source examples used `https://cloudflare.com` as script/CDN artifacts. | Those are scrape placeholders, not usable JavaScript endpoints. Replace them with real official/CDN URLs, such as jsDelivr or unpkg URLs pinned to the chosen package. | `CAN §1.3`; `RES §A.2`; `PLAY Source extract #13` | Reject the placeholder during review; use a verified package URL, integrity policy, and version pin. |

## Metrics

- word_count_total: 530; prose_word_count_excluding_table: 79; prose budget: ≤1,000 words
- table_count: 1; data_rows: exactly 8 correction rows
- citation_count: 16 (8 row evidence pointers + 8 official/canonical references)
- exact_corrections: GSAP free=yes; Motion rename=yes; Three r185/WebGPU=yes; compositor=yes; Lenis repo=yes; Theatre AGPL=yes; Remotion threshold=yes; CDN placeholders=yes
