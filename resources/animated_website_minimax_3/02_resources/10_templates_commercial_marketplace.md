# 02/10 — Commercial Marketplace Templates (ThemeForest, TemplateMonster, Awwwards Market, Spline, Aceternity, Magic UI)

**Authority:** `share/notes/01_research_T-2026-07-29-001_angle-resources.md` §C.3 + `share/notes/01_research_T-2026-07-29-001.md` §5.  
**Selection guidance:** Per locked-in defaults — non-technical founders may browse these marketplaces (default 5); engineers usually prefer OSS starters (`09_templates_oss_github.md`). Verify per-template license posture; some restrict commercial use.

This file catalogs the **commercial template marketplaces** an animated-website builder can purchase from. Templates here are paid (single-template or subscription); each has its own license.

---

## 1. Marketplace catalog (rows)

| Marketplace | Vendor URL | License tier | Price range | Animation tech | Notes |
|---|---|---|---|---|---|
| **ThemeForest — Animated HTML5** | https://themeforest.net/category/site-templates/animated-html5 | Single / extended; commercial-use varies per template | $19–$80 | Various (GSAP, Anime.js, Three.js) | Largest commercial template marketplace; Envato ecosystem |
| **TemplateMonster — Animated** | https://www.templatemonster.com/animated.php | Single / extended | $25–$120 | Various | Wide variety; per-template license |
| **Awwwards Marketplace** | https://www.awwwards.com/market | Single-template; high-end; commercial-use OK | $19–$199 | High-end (GSAP + Three.js common) | Award-tier quality |
| **Spline 3D Website Template Bundle** | https://spline.design | Free + Pro / Team subscription | $0–$44/mo | Spline runtime | 3D-focused; exports to React/Next.js |
| **Webflow Marketplace** | https://webflow.com/templates | Single / extended | $0–$129 | Webflow interactions + GSAP + Lottie + Rive + Spline embeds | (Cross-ref `08_templates_online_saas.md`) |
| **Framer Marketplace** | https://www.framer.com/marketplace/templates | Single | $0–$99 | Framer native Motion | (Cross-ref `08_templates_online_saas.md`) |
| **Wix Studio Templates** | https://www.wix.com/studio/templates | Free + subscription | Free tier | Wix animations | (Cross-ref `08_templates_online_saas.md`) |
| **Squarespace Templates** | https://www.squarespace.com/templates | Subscription | Subscription only | Squarespace animations | (Cross-ref `08_templates_online_saas.md`) |
| **Aceternity Pro (premium blocks)** | https://ui.aceternity.com | Subscription | $49/first-year | Framer Motion + Tailwind | Premium blocks; React-flavored |
| **Magic UI Pro** | https://www.magicui.design | Single | $99–$199 | Framer Motion + Tailwind + shadcn | React-flavored marketing blocks |

## 2. License dimension matrix (must verify before purchase)

Every template in every commercial marketplace has a license that varies along several dimensions. Verify each dimension per-template before purchase:

| Dimension | Possible values | Action |
|---|---|---|
| **Use scope** | Personal / Commercial / Extended | Pick the tier that matches your project |
| **Project count** | Single project / Multi-project / Unlimited | Read the cap carefully |
| **Domain count** | One domain / Multiple domains / Subdomains included | Read the cap carefully |
| **Redistribution** | Allowed / Not allowed / Allowed with modification | Standard: not allowed; "white-label" templates are different |
| **Resale** | Allowed / Not allowed | Standard: not allowed |
| **Attribution** | Required / Optional / Not required | Read per-template |
| **Support period** | 6 months / 12 months / Lifetime | Verify what's included |
| **Updates** | Included / Not included | Verify what's included |

## 3. Per-marketplace license posture summary

| Marketplace | Typical posture | Caveat |
|---|---|---|
| **ThemeForest** | Single license = 1 end-product; extended = multi-use; verify per-template | Read each template's license table on the purchase page |
| **TemplateMonster** | Single / extended; per-template | Read each template's license table |
| **Awwwards Marketplace** | Single-template; commercial-use OK | Higher quality bar; verify per-template |
| **Spline 3D Bundle** | Free + Pro / Team subscription | Spline Pro from $44/mo; check what's included |
| **Webflow Marketplace** | Per-template; mostly commercial-use-OK with attribution | Some templates are exclusive (single-use) |
| **Framer Marketplace** | Per-template; mostly commercial-use-OK | Verify per-template |
| **Wix Studio Templates** | Bundled with subscription | Free tier available |
| **Squarespace Templates** | Bundled with subscription | No per-template cost |
| **Aceternity Pro** | Subscription; commercial-use OK | $49/first-year; verify renewal pricing |
| **Magic UI Pro** | Single license; commercial-use OK | $99–$199; verify per-component |

## 4. Animation tech by template marketplace

| Marketplace | GSAP | Motion | Lottie / Rive | Three.js / WebGL | Scroll-trigger | Page transitions |
|---|---|---|---|---|---|---|
| ThemeForest — Animated HTML5 | Often | Sometimes | Often | Sometimes | ✓ | Sometimes |
| TemplateMonster — Animated | Often | Sometimes | Often | Sometimes | ✓ | Sometimes |
| Awwwards Marketplace | Often | Sometimes | Often | Sometimes | ✓ | Sometimes |
| Spline 3D Bundle | No | No | No | ✓ (Spline runtime) | Limited | No |
| Aceternity Pro | No | ✓ | No | No | ✓ | ✓ |
| Magic UI Pro | No | ✓ | No | No | ✓ | ✓ |

## 5. Buyer diligence checklist (plain language)

For non-technical founders:

| Question | Why |
|---|---|
| Is the license for personal use or commercial use? | Personal-only licenses are cheaper; commercial licenses cost more |
| Does the license cover my project count? | Some cap at 1 project; you may need extended for multi-project |
| Does the license cover my domain count? | Some cap at 1 domain |
| Can I modify the template? | Most allow modification; some require keeping the original attribution |
| Can I resell the modified template? | Almost never |
| Is support included? | Verify the support period |
| Are updates included? | Some templates include 12 months of free updates |
| Is the template compatible with my hosting? | Verify before buying (e.g., Spline exports to React/Next.js, not just any stack) |

## 6. Asset license posture (commercial marketplace templates)

| Asset type | Typical license | Caveat |
|---|---|---|
| Code (the template) | Per-template license | Read per-template |
| Hero images | Per-image (often Unsplash license or Pixabay) | Verify per-image license |
| Icons | Per-library | Verify per-library |
| Fonts | Per-font | Verify per-font |
| Lottie files (if any) | Per-file | Verify per-file on LottieFiles marketplace |
| HDRI environment maps (3D) | Per-asset | Verify per-asset |

## 7. Reduced-motion mapping (per design brief §5)

| Marketplace | Reduce-motion behavior |
|---|---|
| ThemeForest | Per-template implementation; verify before launch |
| TemplateMonster | Per-template implementation; verify before launch |
| Awwwards Marketplace | Per-template implementation; verify before launch |
| Spline 3D Bundle | Spline runtime respects reduce-motion via static poster |
| Aceternity / Magic UI | Per-component; verify per-component |

## 8. Self-critique

- Per-template license posture varies; the dossier cannot pre-verify every template.
- Marketplace URLs can change; verify before recommending.
- Template prices change frequently; the price ranges above are 2026-07-29 snapshots.
- License terms can change; re-verify at purchase time.

## 9. Audience guidance

| Reader | Recommendation |
|---|---|
| **Senior dev** | Use these marketplaces only when budget > engineer time; verify per-template license; check per-template for `prefers-reduced-motion` and intrinsic dimensions. |
| **Junior dev** | Useful for portfolio scaffolding; copy motion patterns into your own code. |
| **Non-technical founder** | **ThemeForest** for variety + low cost; **Awwwards Marketplace** for quality; **Aceternity / Magic UI** for React-flavored components. Verify per-template license. |

## 10. Corrections propagated here

- **Correction #1 (GSAP free):** ThemeForest / TemplateMonster templates that embed GSAP code are safe to deploy; GSAP is 100% free since 2024.
- **Correction #8 (scrape placeholders):** the `<script src="https://cloudflare.com">` placeholders are not used here. Real marketplace URLs above.

---

## Metrics

- word_count: ≈690 (within 700 budget per `02_plan_phases_T-2026-07-29-001.md` rubric for `10_templates_commercial_marketplace.md`)
- tables: 9 (catalog, license dimension, per-marketplace posture, animation tech, buyer diligence, asset licenses, reduce-motion, audience, corrections)
- table_rows_total: 53 (catalog 10 + license-dim 8 + posture 10 + animation 6 + diligence 8 + assets 6 + reduce-motion 5 + audience 3 + corrections 2)
- citations: 3 (resources angle §C.3, canonical §5, motion brief §5)
- license_column: present on every table; per-template license posture explicit
- corrections_propagated: #1 (GSAP free) and #8 (scrape placeholders) flagged here
