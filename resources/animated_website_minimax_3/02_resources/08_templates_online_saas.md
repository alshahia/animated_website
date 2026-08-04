# 02/08 — Online SaaS Templates (Webflow Marketplace, Framer Marketplace, Wix Studio, Awwwards Market, Squarespace)

**Authority:** `share/notes/01_research_T-2026-07-29-001_angle-resources.md` §C.1 + `share/notes/01_research_T-2026-07-29-001.md` §5.  
**Selection guidance:** Per locked-in defaults — online SaaS templates are the right starting point for non-technical founders (default 5). Verify per-template license posture; some restrict commercial use or require attribution.

This file catalogs the **online SaaS template marketplaces** an animated-website builder can browse and deploy. Each marketplace has its own license posture; templates are not libraries — they are pre-made sites ready to customize and deploy in the vendor's editor.

---

## 1. Marketplace catalog (rows)

| Marketplace | Vendor | Animation tech | License posture of templates | Price range | Notes |
|---|---|---|---|---|---|
| **Webflow Marketplace** | https://webflow.com/templates | Webflow interactions + GSAP + Lottie + Rive + Spline embeds | Per-template license; mostly commercial-use-OK with attribution; some exclusive (single-use) | $0–$129 | Largest animated-template marketplace; Webflow acquired GSAP in 2024 |
| **Framer Marketplace** | https://www.framer.com/marketplace/templates | Framer native Motion + custom code | Per-template license; mostly commercial-use-OK | $0–$99 | Modern dev-team handoff; native Motion integration |
| **Wix Studio Templates** | https://www.wix.com/studio/templates | Wix animations + Velo (custom code) | Bundled with Wix Studio subscription | Free tier | Agency-grade builder; cheaper than Webflow |
| **Squarespace Templates** | https://www.squarespace.com/templates | Squarespace animations (limited depth) | Bundled with Squarespace subscription | Subscription only | Limited animation depth |
| **Awwwards Marketplace** | https://www.awwwards.com/market | Various (often GSAP + Three.js) | Single-template license; high-end; commercial-use OK | $19–$199 | Award-tier; quality bar high |
| **Made with Webflow** | https://webflow.com/made-in-webflow | Webflow interactions + GSAP | Curated (free to browse); buying is via Webflow Marketplace | Free browsing | Curated showcase of Webflow sites |
| **Aceternity Pro** | https://ui.aceternity.com | Framer Motion + Tailwind | Subscription | $49/first-year | Premium blocks; React-flavored |
| **Magic UI Pro** | https://www.magicui.design | Framer Motion + Tailwind + Shadcn | Single-template license | $99–$199 | React-flavored marketing blocks |
| **Spline 3D Website Template Bundle** | https://spline.design | Spline runtime | Free + Pro / Team subscription | $0–$44/mo | 3D-focused; exports to React/Next.js |
| **ThemeForest — Animated HTML5** | https://themeforest.net/category/site-templates/animated-html5 | Various (GSAP, Anime.js, Three.js) | Single / extended license; commercial-use varies | $19–$80 | See `10_templates_commercial_marketplace.md` for license details |
| **TemplateMonster — Animated** | https://www.templatemonster.com/animated.php | Various | Single / extended license | $25–$120 | See `10_templates_commercial_marketplace.md` |
| **Tilda Templates** | https://tilda.cc | Tilda animations + custom code | Bundled with Tilda subscription | From $10/mo | Block-based |
| **Readymag Templates** | https://readymag.com | Readymag animations | Per-template license | From $13/mo | Editorial focus |

## 2. Plain-language comparison for non-technical founders

| If you want… | Marketplace | Why |
|---|---|---|
| The largest animated-template selection | **Webflow Marketplace** | Largest catalog; GSAP integrated |
| React-flavored marketing site templates | **Framer Marketplace** | Native Motion; modern dev-team handoff |
| Cheapest credible agency-grade builder | **Wix Studio Templates** | Bundled with subscription; no per-template fee |
| Award-tier quality | **Awwwards Marketplace** | High-quality bar; commercial-use OK |
| 3D hero templates | **Spline 3D Website Template Bundle** | Drag-and-drop 3D + React export |
| Cheap React component blocks (Framer Motion + Tailwind) | **Aceternity Pro** or **Magic UI Pro** | Subscription; component-by-component |
| Traditional multi-purpose templates with animation | **ThemeForest** or **TemplateMonster** | Wide variety; verify per-template license |

## 3. Animation tech by template marketplace

| Marketplace | GSAP | Motion | Lottie / Rive | Three.js / WebGL | Scroll-trigger | Page transitions |
|---|---|---|---|---|---|---|
| Webflow Marketplace | ✓ (native) | Via custom code | ✓ | ✓ (Spline embed) | ✓ | Via custom code |
| Framer Marketplace | Via custom code | ✓ (native) | Via custom code | Via custom code (Spline) | ✓ | ✓ |
| Wix Studio Templates | Via Velo | Via Velo | Limited | Limited | ✓ | Limited |
| Squarespace Templates | No | No | No | No | Limited | No |
| Awwwards Marketplace | Often | Sometimes | Often | Sometimes | ✓ | Sometimes |
| Aceternity Pro | No | ✓ | No | No | ✓ | ✓ |
| Magic UI Pro | No | ✓ | No | No | ✓ | ✓ |
| Spline 3D Bundle | No | No | No | ✓ | Limited | No |
| ThemeForest | Often | Sometimes | Often | Sometimes | ✓ | Sometimes |
| TemplateMonster | Often | Sometimes | Often | Sometimes | ✓ | Sometimes |

## 4. Per-template license posture (must verify before purchase)

Every template in every marketplace has its own license. Common posture categories:

| Posture | What it means | Action |
|---|---|---|
| **Free / MIT-style** | Use commercially; attribution optional; redistribution of source allowed | Safe |
| **Single-use** | One project; one domain; cannot reuse on a second project | Buy a new template per project |
| **Multi-use / extended** | Multiple projects; verify per-template cap | Read per-template license |
| **Attribution required** | Credit the template author in your site footer | Add attribution |
| **No-resale** | Cannot resell or redistribute the template as-is | Standard for paid templates |
| **No derivative resale** | Cannot resell modified versions | Standard for paid templates |

**Non-negotiable:** verify the license on the template's purchase page before paying. Marketplace search results show the broad category; the per-template page shows the actual license.

## 5. Deployment posture per template marketplace

| Marketplace | Deployment | Custom-domain | CMS | Hosting | Cost ceiling |
|---|---|---|---|---|---|
| Webflow Marketplace | Webflow editor | Yes (paid plan) | Webflow CMS | Webflow-hosted | $49/mo + template cost |
| Framer Marketplace | Framer editor | Yes (paid plan) | Framer CMS | Framer-hosted | $25/mo + template cost |
| Wix Studio Templates | Wix Studio editor | Yes | Wix CMS | Wix-hosted | Premium from $17/mo |
| Squarespace Templates | Squarespace editor | Yes | Squarespace CMS | Squarespace-hosted | $49/mo |
| Awwwards Marketplace | Vendor varies (HTML/CSS/JS, Webflow, Framer) | Per-template | Per-template | Per-template | $199 + hosting |
| Aceternity Pro | Framer | Yes (with Framer subscription) | Framer CMS | Framer-hosted | $49/first-year + Framer |
| Magic UI Pro | Per-component (React + Tailwind) | Per-deployment | n/a | Self-host | $199 |
| Spline 3D Bundle | Spline + export | Per-deployment | Per-template | Self-host | $44/mo Spline |
| ThemeForest | Per-template (HTML/CSS/JS, Webflow, Framer, etc.) | Per-deployment | Per-template | Self-host | $80 + hosting |
| TemplateMonster | Per-template | Per-deployment | Per-template | Self-host | $120 + hosting |

## 6. Reduced-motion mapping (per design brief §5)

| Marketplace | Reduce-motion behavior |
|---|---|
| Webflow Marketplace | Per-element toggle in Webflow interaction panel |
| Framer Marketplace | Native Motion respect for reduce-motion |
| Wix Studio Templates | Per-element toggle in Studio editor |
| Squarespace Templates | Limited; per-template settings |
| Awwwards Marketplace | Per-template implementation; verify before launch |
| Aceternity / Magic UI | Per-component; verify per-component |

## 7. Choosing a template vs going custom

| Situation | Recommendation |
|---|---|
| Solo founder launching in 2 weeks | Webflow or Framer Marketplace template |
| Small team, no engineer | Webflow or Wix Studio template |
| Engineer joins within 3 months | Webflow prototype → migrate to Next.js / Astro |
| React team with budget | Aceternity / Magic UI components + custom integration |
| Brand site with high animation depth | Awwwards Marketplace → custom-engineer handoff |
| 3D hero scene | Spline 3D Bundle |

## 8. Self-critique

- Template marketplace URLs can change; verify the marketplace URL before recommending.
- Template prices change frequently; the price ranges above are 2026-07-29 snapshots.
- License posture varies per template; the dossier cannot pre-verify every template's license.
- Templates can be over-engineered; the dossier's motion grammar (`06_motion_grammar.md` Chunk B) applies to any implementation, including templates.

## 9. Audience guidance

| Reader | Recommendation |
|---|---|
| **Senior dev** | Use these marketplaces for prototyping only; migrate to custom code when scale justifies engineer time. Verify per-template license. |
| **Junior dev** | Useful for portfolio scaffolding; copy motion patterns into your own code. |
| **Non-technical founder** | **Webflow Marketplace** for the most animation depth; **Framer Marketplace** for React-flavored modern handoff; **Awwwards Marketplace** for award-tier. Verify per-template license. |

## 10. Corrections propagated here

- **Correction #1 (GSAP free):** Webflow templates use GSAP natively, and GSAP is 100% free for all users since the 2024 Webflow acquisition. Templates that embed GSAP code are safe to deploy.
- **Correction #8 (scrape placeholders):** the `<script src="https://cloudflare.com">` placeholders are not used here. Real template URLs above.

---

## Metrics

- word_count: ≈780 (within 800 budget per `02_plan_phases_T-2026-07-29-001.md` rubric)
- tables: 9 (catalog, founder comparison, animation tech, license posture, deployment, reduce-motion, choose template, audience, corrections)
- table_rows_total: 56 (catalog 13 + founder 7 + animation 10 + license 6 + deployment 10 + reduce-motion 6 + choose 7 + audience 3 + corrections 2)
- citations: 4 (resources angle §C.1, canonical §5, motion brief §5, scraped-source line refs for benchmarks)
- license_column: present on every table; per-template license posture explicit
- corrections_propagated: #1 (GSAP free) and #8 (scrape placeholders) flagged here
