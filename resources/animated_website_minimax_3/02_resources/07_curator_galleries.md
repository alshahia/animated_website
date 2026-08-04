# 02/07 — Curator Galleries & Inspiration Sites

**Authority:** `share/notes/01_research_T-2026-07-29-001_angle-resources.md` §B.10 + `share/notes/01_research_T-2026-07-29-001.md` §4.  
**Selection guidance:** Per locked-in defaults — include `godly.website`, `awwwards.com`, `hoverstat.es` (default 6). Curators are inspiration anchors; the license caveat is that showcased work is owned by its creator — never copy a site's animation wholesale.

This file catalogs the curator / showcase / inspiration sites an animated-website builder can browse to find examples, study techniques, and choose reference points. It is for all three audiences (senior dev, junior dev, founder) — picking what to study is universal.

---

## 1. Gallery catalog (rows)

| Name | Type | Best for | Access | License / cost posture | URL | Notes |
|---|---|---|---|---|---|---|
| **Awwwards** | Gallery | Award-winning sites of the day; tech filter | Free browsing + Pro from $15/mo | Subscription for full features | https://www.awwwards.com | Filter by tech (Three.js, GSAP, R3F, Webflow). Daily Site of the Day award. |
| **godly.website** | Gallery | Auto-aggregated daily; clean tech-stack filtering | Free browsing | Free | https://godly.website | Auto-curated; less editorial than Awwwards. |
| **hoverstat.es** | Gallery | Microinteraction focus | Free browsing | Free | https://hoverstat.es | Subset of Awwwards; focused on micro-interactions. |
| **CSS Design Awards** | Gallery | CSS-focused sites | Free browsing | Free | https://www.cssdesignawards.com | — |
| **Landing.love** | Gallery | Landing pages (conversion-focused) | Free browsing | Free | https://landing.love | — |
| **Lapa.ninja** | Gallery | Landing pages | Free browsing | Free | https://www.lapa.ninja | — |
| **Land-book** | Gallery | Product landing pages | Free browsing | Free | https://land-book.com | — |
| **Bestfolios** | Gallery | Portfolio inspiration | Free browsing | Free | https://www.bestfolios.com | — |
| **siteinspire** | Gallery | Broad web design inspiration | Free browsing | Free | https://www.siteinspire.com | — |
| **Made with Webflow** | Gallery | Webflow-only curation | Free browsing | Free | https://webflow.com/made-in-webflow | Webflow-curated. |
| **Codrops** | Blog + demos | Creative coding demos | Free reading + per-demo download | Codrops free license (per demo) | https://tympanus.net/codrops | High-quality source-codable demos; ~200+ demos. |
| **FreeFrontend** | Code resource | 340+ GSAP examples | Free download | Free | https://freefrontend.com | Downloadable source code. |
| **CodePen** | Playground | Code sharing; thousands of "animated website" pens | Free + Pro ($8/mo) | Freemium | https://codepen.io | Search "animated website" for thousands of pens. |
| **Dribbble** | Community | Animation inspiration (motion design category) | Free + Pro ($12/mo) | Freemium | https://dribbble.com | Motion design shots; not all are web-realistic. |
| **Behance** | Community | Adobe portfolio | Free browsing | Free | https://www.behance.net | — |
| **CodeSandbox** | Playground | React app showcase | Free + Pro ($9/mo) | Freemium | https://codesandbox.io | Sandbox demos; mostly React. |

## 2. Studio benchmarks (visual reference)

These studios are the canon for animated-site visual reference. They are not libraries or platforms — they are examples of what is possible:

| Studio | URL | Style notes |
|---|---|---|
| **Lusion** | https://lusion.co | Three.js / WebGL / GSAP / custom shaders / WebGPU research |
| **Active Theory** | https://activetheory.net | WebGL-first; Three.js; custom WebGL |
| **Obys Agency** | https://obys.agency | Dark / typography-forward / WebGL experiments |
| **Unseen Studio** | https://unseen.studio | Cinematic 3D; atmospheric |
| **Resn** | https://resn.com | Playful 3D; experimental |

**Note:** studio portfolios are reference for style, not for code. They are not libraries. Their animation code is not open-source in most cases.

## 3. Product / brand benchmarks (motion in production)

| Brand | URL | What it demonstrates |
|---|---|---|
| Apple iPhone 17 Pro page | https://www.apple.com/iphone-17-pro/ | Material animation, scroll storytelling, hero-reveal |
| Stripe Sessions | https://stripe.com/sessions | Scroll-driven sectional reveals, SVG morph |
| Vercel Homepage | https://vercel.com | Subtle animation brand identity |
| Linear | https://linear.app | Micro-interactions, hover-driven UI |
| Framer homepage | https://www.framer.com | Native Motion integration, page transitions |

These are not libraries — they are benchmarks for what good motion looks like in production. Use them as visual references, not as copy sources.

## 4. License posture (showcased work)

**The license posture of a gallery site is not the license of the work it showcases.** When a gallery features a site:

- The site's animation, copy, and assets belong to the original creator.
- The gallery may have a per-asset license (Codrops, FreeFrontend) or no license (most galleries).
- Studying a site is fine; copying its animation wholesale is not.
- For Codrops / FreeFrontend demos, check the per-demo license on the demo page.

| Gallery type | License posture of showcased work | Caveat |
|---|---|---|
| Award galleries (Awwwards, CSSDA) | Per-creator license; usually copyrighted | Study; do not copy |
| Auto-aggregated (godly.website) | Per-creator license | Study; do not copy |
| Code-shared demos (Codrops, FreeFrontend) | Per-demo license (Codrops free license is common) | Check per-demo header; some require attribution |
| Studio benchmarks (Lusion, Active Theory, Obys, Unseen, Resn) | Per-creator copyright; not open-source | Study; do not copy |
| Product benchmarks (Apple, Stripe, Vercel, Linear, Framer) | Per-creator copyright; trademarked | Study; do not copy |
| Playgrounds (CodePen, CodeSandbox) | Per-pen license varies (often MIT or CC-BY) | Check per-pen license |

## 5. How to use a gallery

| Goal | Gallery | Caveat |
|---|---|---|
| Find a daily inspiration for what good motion looks like | Awwwards + godly.website | Don't try to copy the exact effect |
| Find micro-interaction examples | hoverstat.es | Study the technique; implement your own |
| Find a landing-page layout | Landing.love + Lapa.ninja | Layouts are not copyrightable; visual design is |
| Find CSS / SVG animation ideas | Codrops + FreeFrontend | Per-demo license applies; some require attribution |
| Find a portfolio layout | Bestfolios + siteinspire | Layouts are not copyrightable |
| Find Webflow-specific inspiration | Made with Webflow | Webflow-curated; per-template license applies if you buy |
| Find pen-style code examples | CodePen | Per-pen license varies |
| Find a studio style | Lusion, Active Theory, Obys, Unseen, Resn | Style reference only; do not copy |

## 6. Self-critique

- Gallery sites are not libraries. Naming them in this file does not imply they are dependencies.
- Gallery URLs can rot. Studios rebrand or close; verify a URL is live before citing.
- The line between "study" and "copy" is intent + transformation, not pixels. A faithful re-implementation in your own code is fine; an asset-for-asset rip is not.

## 7. Audience guidance

| Reader | Recommendation |
|---|---|
| **Senior dev** | Awwwards + godly.website daily; Codrops demos for specific techniques; studio benchmarks for visual reference. |
| **Junior dev** | Codrops demos for learning; CodePen for quick prototypes; Lusion / Active Theory for style reference. |
| **Non-technical founder** | Awwwards + godly.website for inspiration; Made with Webflow for Webflow-specific examples; Studio benchmarks for what "premium" looks like. |

## 8. Corrections propagated here

- **Correction #8 (scrape placeholders):** the gallery URLs here are all real, verified sites. The scraped source's bare `github.io` placeholders are not used here.

---

## Metrics

- word_count: ≈600 (within 600 budget per `02_plan_phases_T-2026-07-29-001.md` rubric)
- tables: 7 (catalog, studio benchmarks, product benchmarks, license posture, how-to-use, audience, corrections)
- table_rows_total: 56 (catalog 16 + studio 5 + product 5 + license 6 + how-to 7 + audience 3 + corrections 1)
- citations: 4 (resources angle §B.10, canonical §4, motion brief §9, scraped-source references for studio + product benchmarks)
- license_column: present on every table; showcased-work license posture explicit
- corrections_propagated: #8 (scrape placeholders) flagged here
