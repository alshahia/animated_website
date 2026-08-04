# Animated Website Deep Research — Master Index

> **Model:** DeepSeek Flash | **Date:** 2026-07-29 | **Project:** research_space
> **Source:** `resources/animated_website_raw_research.txt` (scraped AI conversation)
> **Output Folder:** `research_doc/animated_website_deepseek_flash/`

---

## Document Structure

| # | File | Description | Size |
|---|---|---|---|
| 1 | `00_MASTER_INDEX.md` | This file — overview, key findings, quick-reference tables | — |
| 2 | `00_SOURCE_STRUCTURED_EXTRACT.md` | Extracted structured info from the raw conversation file | — |
| 3 | `01_genres_taxonomy.md` | All 20 genres/types of animated websites with sub-genres, tech stacks, difficulty, perf/accessibility/SEO | ~1280 lines |
| 4 | `02_resources_catalog.md` | ~60 resources across 14 categories: libraries, tools, platforms, agencies, hosting, performance | ~880 lines |
| 5 | `03_templates_examples.md` | 80+ downloadable templates, examples, components — free open-source | ~280 lines |
| 6 | `04_full_creation_guide.md` | Complete per-genre creation guide with step-by-step, code patterns, pitfalls, perf notes | ~2500 lines |
| 7 | `05_best_practices_and_conversion.md` | What to AVOID (15 anti-patterns), What to USE (15 best practices), Full conversion guide (6 phases) | ~1430 lines |

All sub-agent research documents are in `sub_agents/` — the root folder contains the compiled versions.

---

## Quick Reference: 20 Animation Genres

| # | Genre | Tech Level | Difficulty | Perf Impact | Best For |
|---|---|---|---|---|---|
| 1 | Scroll-Triggered | CSS / JS-lib | Intermediate | Low-Moderate | Landing pages, storytelling |
| 2 | Micro-Interactions | CSS / JS-lib | Beginner-Int | Low | Buttons, forms, UI feedback |
| 3 | Loading / Preloaders | CSS / JS-lib / WebGL | Beginner-Adv | Minimal-Moderate | Heavy sites, brand intros |
| 4 | Page Transitions | JS-lib | Int-Advanced | Moderate | SPA/MPA seamless navigation |
| 5 | 3D Websites | WebGL (Three.js/R3F) | Advanced | High | Product showcases, brand sites |
| 6 | 2D Canvas | Canvas / PixiJS | Int-Advanced | Low-Moderate | Generative art, games, data viz |
| 7 | SVG Animations | CSS / JS-lib | Beginner-Adv | Very Low | Logos, icons, infographics |
| 8 | Typography | CSS / JS-lib | Intermediate | Low-Moderate | Hero sections, agency sites |
| 9 | Parallax | CSS / JS-lib / WebGL | Beginner-Adv | Low-Moderate | Depth illusion, brand stories |
| 10 | Interactive Storytelling | JS-lib / WebGL | Advanced | Mod-High | Campaigns, non-profit, journalism |
| 11 | Fluid / Particle | Canvas / WebGL | Int-Advanced | Mod-High | Hero backgrounds, AI/tech brands |
| 12 | Lottie / JSON | JS-lib | Beginner-Int | Very Low | Icons, loaders, illustrations |
| 13 | CSS-Only | CSS-only | Beginner-Int | Very Low | Minimalist, fast-loading sites |
| 14 | GSAP Production | JS-lib | Advanced | Low-Moderate | Award-winning agency sites |
| 15 | Framer Motion (React) | JS-lib (React) | Intermediate | Low-Moderate | React marketing sites, portfolios |
| 16 | Motion Graphics | JS-lib / WebGL | Advanced | Mod-High | Campaigns, brand intros |
| 17 | Game-like / Gamified | Canvas / WebGL | Advanced | High | Marketing, education, engagement |
| 18 | No-Code Animated | No-code | Beginner-Int | Low-Moderate | Small biz, portfolios, prototyping |
| 19 | AI-Assisted | JS-lib / WebGL | Beginner-Int | Variable | Rapid prototyping, asset generation |
| 20 | VR / AR Web | WebXR | Advanced | Very High | Immersive experiences, product previews |

---

## Quick Reference: Top Resources

| Resource | URL | Category | Cost | Best For |
|---|---|---|---|---|
| GSAP | gsap.com | Animation Library | Free core / Paid plugins ($50-$199/yr) | Professional web animation industry standard |
| Three.js | threejs.org | WebGL/3D | Free | 3D scenes, WebGL, immersive experiences |
| Motion (Framer Motion) | motion.dev | Animation Library (React) | Free core / Paid Motion+ | React animation, layout transitions |
| LottieFiles | lottiefiles.com | Lottie Platform | Free / Pro from $16/mo | Lightweight vector animations |
| Rive | rive.app | Interactive Motion | Free / Pro from $25/mo | Interactive vector animations, state machines |
| Spline | spline.design | 3D Design Tool | Free / Pro from $44/mo | No-code 3D for designers |
| Aceternity UI | ui.aceternity.com | React Components | Free / Pro from $49 | Copy-paste animated React components |
| Codrops | tympanus.net/codrops | Tutorials & Demos | Free | Cutting-edge animation techniques |
| Webflow | webflow.com | No-Code Builder | Free / from $18/mo | Designer-friendly animated sites |
| Awwwards | awwwards.com | Inspiration | Free browsing | Finding cutting-edge animated websites |

---

## Key Findings Summary

### Most Important Rules
1. **Only animate `transform` and `opacity`** — GPU-composited, no layout thrash
2. **Always respect `prefers-reduced-motion`** — 35-40% of adults over 40 have vestibular disorders
3. **Content first, animation second** — progressive enhancement always
4. **Performance budget**: stay under 16ms per frame for 60fps
5. **Test on low-end devices** — what runs at 60fps on M3 Mac may run at 15fps on Moto G

### Top Libraries by Use Case
- **Simple effects**: CSS transitions/animations (0KB, no library needed)
- **Scroll reveals**: IntersectionObserver + CSS (native, zero dependency)
- **Complex timelines**: GSAP (industry standard, 13KB gzipped core)
- **React animations**: Motion / Framer Motion (30KB gzipped)
- **3D scenes**: Three.js (150KB gzipped) or React Three Fiber
- **Vector animations**: Lottie (20-50KB per animation) or Rive (interactive)
- **No-code**: Webflow or Framer

### Conversion Strategy (Static → Animated)
1. CSS micro-interactions (hover, focus) — 0KB JS, lowest risk
2. CSS entrance animations on load
3. IntersectionObserver scroll reveals (CSS-only transitions)
4. GSAP ScrollTrigger for sequenced reveals
5. Parallax (subtle, <20% movement)
6. Custom cursor / magnetic effects
7. Page transitions (if SPA)
8. Canvas/WebGL (particles, 3D) — highest risk

---

## Source File Extraction

The raw conversation file (`resources/animated_website_raw_research.txt`) contained:
- **3 complete HTML templates**: Scroll-reveal landing, cursor-tracking grid, grid-reveal template
- **20 URLs** cataloged across animation tools, hosting, optimization
- **Free/open-source examples** identified: Codrops, FreeFrontend, Aceternity UI, GitHub repos
- **Full implementation guides** for: GSAP timelines, Lenis smooth scroll, animated forms, preloaders, GitHub Pages hosting, responsive design, SEO metadata, favicon optimization, minification, audio feedback
- **Performance rules**: 60 FPS, transform/opacity only, prefers-reduced-motion, will-change
- **Level system**: CSS3 (Level 1) → GSAP/Framer Motion (Level 2) → Three.js/PixiJS (Level 3)

See `00_SOURCE_STRUCTURED_EXTRACT.md` for the complete structured extraction.
