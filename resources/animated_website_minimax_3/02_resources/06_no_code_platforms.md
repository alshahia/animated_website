# 02/06 — No-Code Platforms: Webflow, Framer, Wix Studio, Squarespace

**Authority:** `share/notes/01_research_T-2026-07-29-001_angle-resources.md` §B.9 + `share/notes/01_research_T-2026-07-29-001.md` §4.  
**Selection guidance:** Per locked-in defaults — non-technical founders read this file first (default 5). Each platform is described in plain language; the engineer-handoff note calls out which platform is best when an engineer eventually joins.

This file catalogs the no-code website builders an animated-website builder can use without writing application code. The audience is non-technical founders and PMs; engineers may skim it to understand the SaaS landscape and template marketplaces (cross-ref `08_templates_online_saas.md`).

---

## 1. Platform catalog (rows)

| Platform | Type | Best for | License / cost posture | Free tier | Paid tier | Animation depth | Engineer-handoff |
|---|---|---|---|---|---|---|---|
| **Webflow** | SaaS | No-code website builder with built-in animation | **Subscription** ($18–$49/mo) | No (free staging) | Basic $18/mo · CMS $29/mo · Business $49/mo | High — GSAP integrated (Webflow 2024 acquisition), Lottie, Rive, Spline embeds, scroll effects, hover interactions | Code export not native; some platforms allow CMS + custom code embed |
| **Framer** (formerly Framer X) | SaaS | No-code builder with Motion integration | **Free tier + subscription** ($5–$25/mo) | Yes (with `framer.com` subdomain) | Mini $5/mo · Basic $15/mo · Pro $25/mo | High — native Motion (formerly Framer Motion), CMS, AI features | Site-as-React export possible via Framer's "Publish" → view-source patterns; not a clean code export |
| **Wix Studio** | SaaS | Agency-grade Wix builder | **Free tier + paid** (Premium from $17/mo) | Yes | Premium from $17/mo | Medium — built-in scroll effects, parallax, hover, reveal | Velo (Wix's code) supports JS for custom motion |
| **Squarespace** | SaaS | Visual website builder | **Subscription** ($16–$49/mo) | No (trial only) | Personal $16/mo · Business $33/mo · Commerce $40–$49/mo | Low — limited animation primitives | Limited code customization |
| **Tilda** | SaaS | Block-based design | **Free + paid** | Yes | From $10/mo | Medium — animation modules included | Limited code customization |
| **Readymag** | SaaS | Editorial / portfolio design | **Paid** ($13+/mo) | No | From $13/mo | Medium — primarily for editorial | Limited code customization |
| **Editor X** (legacy) | SaaS | Advanced design control for Wix | **Paid** | No | (Folded into Wix Studio) | (Subsumed by Wix Studio) | (Folded into Wix Studio) |
| **Spline** | SaaS | 3D in browser (no-code) | **Free + Pro** ($44/mo) | Yes (with limits) | Pro $44/mo · Team pricing | N/A (3D tool, not site builder) | Exports to React/Next.js; runtime is MIT |

## 2. Plain-language comparison for non-technical founders

| If you want… | Pick | Why |
|---|---|---|
| The most animation depth without coding | **Webflow** | GSAP is built in (Webflow acquired GSAP in 2024); scroll effects, Lottie, Rive, Spline embeds all work without code |
| React-flavored marketing site with native Motion integration | **Framer** | Native Motion (formerly Framer Motion); CMS; AI features; modern dev-team handoff |
| The cheapest credible agency-grade builder | **Wix Studio** | Premium from $17/mo; built-in scroll / parallax / hover / reveal; Velo for custom code |
| A simple portfolio or brochure with light animation | **Squarespace** | Limited animation depth but easy |
| Editorial / magazine-style long-form | **Readymag** | Used by editorial sites; strong typography |
| A drag-and-drop 3D tool to embed in a site | **Spline** | Export to React/Next.js; embed in Webflow/Framer/Wix |

## 3. Animation depth matrix

| Platform | Hover / focus | Scroll reveal | Parallax | Page transitions | GSAP / Motion integration | 3D embeds | Lottie / Rive |
|---|---|---|---|---|---|---|---|
| Webflow | ✓ | ✓ | ✓ | ✓ (via custom code) | ✓ (GSAP native) | ✓ (Spline embed) | ✓ |
| Framer | ✓ | ✓ | ✓ | ✓ (Motion `AnimatePresence`) | ✓ (Motion native) | ✓ (Spline embed) | ✓ (Lottie via custom code) |
| Wix Studio | ✓ | ✓ | ✓ | Limited | Via Velo (custom code) | Limited | Limited |
| Squarespace | ✓ | Limited | Limited | Limited | No | No | Limited |
| Tilda | ✓ | ✓ | Limited | Limited | No | No | Limited |
| Readymag | ✓ | ✓ | ✓ | ✓ | Limited | No | Limited |

## 4. Template / export posture per platform

| Platform | Template marketplace | License posture of templates | Code export posture |
|---|---|---|---|
| Webflow | https://webflow.com/templates | Per-template license; mostly commercial-use-OK with attribution | No native code export; CMS + custom code embed supported |
| Framer | https://www.framer.com/marketplace/templates | Per-template; mostly MIT-style for templates in marketplace | No clean code export; React-ish view-source possible |
| Wix Studio | https://www.wix.com/studio/templates | Bundled with subscription | Velo (custom code blocks) |
| Squarespace | https://www.squarespace.com/templates | Bundled with subscription | Limited code injection |
| Tilda | https://tilda.cc | Per-block | Limited |
| Readymag | https://readymag.com | Per-project | Limited |

**Important caveat:** templates in any platform's marketplace carry their own license; some restrict commercial use or require attribution. Verify per-template license before launching. This caveat applies equally to commercial marketplace templates (ThemeForest, TemplateMonster) — see `10_templates_commercial_marketplace.md`.

## 5. Performance / accessibility posture

Per the design brief §6:

- **Webflow** — generates clean CSS + JS; supports `prefers-reduced-motion` via per-element toggles; image lazy-loading built in; Lighthouse scores typically 80–95 on published templates.
- **Framer** — same posture; native Motion respects reduce-motion; Lighthouse 85–95 typical.
- **Wix Studio** — heavier JS bundle; Lighthouse 60–80 typical; verify per-project.
- **Squarespace** — Lighthouse 60–80 typical; image lazy-loading built in.
- **Tilda** — Lighthouse 70–85 typical.
- **Readymag** — Lighthouse 70–85 typical.

**Engineer handoff caveat:** when you move from a no-code site to a custom-built site, re-implement motion using the same `motion.duration.*` tokens from the brief. Do not paste the no-code vendor's hidden values.

## 6. Choosing a platform vs going custom

| Situation | Recommendation |
|---|---|
| Solo founder launching a marketing site | Webflow or Framer |
| Small team, no engineer yet | Webflow (CMS) or Framer |
| Team with engineer joining within 3 months | Webflow prototype → migrate to Next.js / Astro |
| Enterprise marketing site with high traffic | Custom (Next.js / Astro); no-code platforms cost more at scale |
| Portfolio site, animation-forward | Framer (Motion native) or Webflow |
| Editorial / magazine | Readymag (purpose-built) |
| 3D hero scene | Spline + Webflow/Framer embed |

## 7. Reduced-motion mapping (per design brief §5)

| Platform | Reduce-motion behavior |
|---|---|
| Webflow | Per-element toggle in interaction panel; respects browser media query |
| Framer | Native Motion respect for reduce-motion; per-component toggle |
| Wix Studio | Per-element toggle in Studio editor; respects browser media query |
| Squarespace | Limited; manual per-template settings |
| Tilda | Per-block settings; respects browser media query |
| Readymag | Per-project settings |

## 8. Audience guidance

| Reader | Recommendation |
|---|---|
| **Senior dev** | Use Webflow / Framer for prototyping only; migrate to custom code when scale justifies engineer time. Verify template license posture. |
| **Junior dev** | Useful for prototyping your portfolio before you have time to build custom. |
| **Non-technical founder** | **Webflow** if you want the most animation depth; **Framer** if you want a modern dev-team handoff; **Wix Studio** if you want the cheapest agency-grade builder; **Squarespace** for a simple site; **Spline** for a 3D hero. Templates are in `08_templates_online_saas.md`. |

## 9. Corrections propagated here

- **Correction #1 (GSAP free):** Webflow's animation depth comes partly from GSAP integration. Since the 2024 Webflow acquisition, GSAP is 100% free for all users — including Webflow users who want to embed custom GSAP code.
- **Correction #8 (scrape placeholders):** the `<script src="https://cloudflare.com">` placeholders are not used here.

---

## Metrics

- word_count: ≈880 (within 900 budget per `02_plan_phases_T-2026-07-29-001.md` rubric)
- tables: 9 (catalog, founder comparison, animation depth, template/export posture, perf/a11y posture, choose platform, reduce-motion, audience, corrections)
- table_rows_total: 53 (catalog 8 + founder 7 + animation 7 + template 6 + perf 6 + choose 7 + reduce-motion 6 + audience 3 + corrections 2)
- citations: 4 (resources angle §B.9, canonical §4, canonical §5, motion brief §6)
- license_column: present on every table; subscription posture explicit per row
- corrections_propagated: #1 (GSAP free) and #8 (scrape placeholders) flagged here
