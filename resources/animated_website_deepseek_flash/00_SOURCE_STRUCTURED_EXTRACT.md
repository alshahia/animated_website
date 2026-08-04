# Structured Extraction: Source Conversation File

> **Source:** `resources/animated_website_raw_research.txt` (1120 lines)
> **Format:** Scraped AI conversation about animated websites
> **Extraction Date:** 2026-07-29

---

## 1. Definitions & Core Concepts

**Animated Website:** A web page that uses motion, moving graphics, and transitions built with code (CSS or JavaScript).

**Common Types of Web Animation:**
- Scroll-driven effects (move, fade, transform on scroll)
- Hover reactions (buttons/images change on mouse rest)
- Loading transitions (intro screens, fading logos)
- Accent highlights (subtle movements drawing eye to CTAs)

**Why Sites Use Animation:**
- Guide attention to important elements
- Confirm actions with visual feedback
- Show brand personality and uniqueness

---

## 2. Three-Level Technology Stack

### 🟩 Level 1: Native CSS3 (The Foundation)
- **Best for:** UI states, button glows, menu slide-outs, simple loops
- **Key Properties:** `transition`, `transform`, `@keyframes`, `animation`
- **When:** Hover states, microinteractions, lightweight loaders
- **Performance:** Runs on browser's main thread, zero external files

### 🟨 Level 2: GSAP & Framer Motion (Production Engines)
- **GSAP:** Industry standard — animates thousands of objects, scroll-driven timelines, browser compatibility fixes
- **Framer Motion:** React/Next.js — declarative layout transitions
- **When:** Scroll-based animation, math formulas, precise sequencing

### 🟦 Level 3: Three.js & PixiJS (High-End Visuals)
- **Three.js:** 3D cameras, lights, textures via WebGL `<canvas>`
- **PixiJS:** 2D engine for thousands of particles/complex layouts
- **When:** Game-like sites, digital art, immersive experiences

---

## 3. Implementation Guide (from Source)

### Step-by-Step:
1. **Write clean semantic HTML** — keep animation separate from content
2. **Set up base CSS + hardware acceleration** — animate `transform` and `opacity` only; use `will-change`
3. **Layer on JavaScript timelines (GSAP)** — sequence multi-step animations

### Performance Rules:
- **60 FPS**: Animations must run at 60fps; >16ms = jank
- **Respect user settings**: `@media (prefers-reduced-motion: reduce)` — disable all animations
- Only animate `transform` and `opacity` (GPU composited)
- Never animate `width`, `height`, `top`, `left` (forces layout recalculation)

---

## 4. Complete HTML Templates (from Source)

### Template 1: Scroll-Reveal Landing Page (`scroll.html`)
- GSAP + ScrollTrigger | 3 sections (hero, features, footer)
- Fade-in-up stagger on hero elements
- Scroll-triggered card reveals with stagger
- Dark theme, gradient hero
- `prefers-reduced-motion` support
- **To use:** Save as `.html`, open in browser

### Template 2: Interactive Cursor-Tracking Grid (`cursor.html`)
- GSAP | Custom cursor follower + 3D tilt cards
- Neon cursor trail with `mix-blend-mode: screen`
- Mouse-position-driven 3D rotation on card hover
- Glow effect following cursor on each card
- Mobile: cursor hidden, tap color feedback
- **To use:** Save as `.html`, open in browser

### Template 3: Grid-Reveal Template (`grid-reveal.html`)
- GSAP + ScrollTrigger | Cascading grid reveal on scroll
- Auto-fit responsive grid layout
- Staggered reveal with scroll-based timing
- Hover border color change on grid items
- MatchMedia: full animation on desktop, instant show on mobile
- **To use:** Save as `.html`, open in browser

---

## 5. Responsive Design Adaptation (from Source)

**CSS Grid Upgrade:**
```css
.grid-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}
.interactive-item {
  height: clamp(180px, 25vh, 250px);
}
```

**GSAP MatchMedia for Adaptive Animations:**
```javascript
let mm = gsap.matchMedia();
mm.add("(min-width: 769px)", () => { /* desktop: cursor + 3D tilt */ });
mm.add("(max-width: 768px)", () => { /* mobile: hide cursor, tap feedback */ });
```

**Mobile Rules:**
- Touch target minimum 44×44px
- Use `ScrollTrigger.refresh()` sparingly
- Hide custom cursor on `@media (pointer: coarse)`

---

## 6. Hosting Guide (GitHub Pages)

1. Rename main file to `index.html`
2. Create GitHub repository
3. Upload files (Settings → Pages → main branch)
4. Live at `https://<username>.github.io/<repository>/`

---

## 7. SEO Meta Tags Template (from Source)

Complete meta tags for: charset, viewport, theme-color, title, description, Open Graph (Facebook), Twitter Cards, favicon (all sizes), webmanifest. See lines 486-516 of source file.

---

## 8. Image Optimization Guide

| Format | Size vs PNG/JPEG | Tool |
|---|---|---|
| WebP | 25-35% smaller than JPEG | Squoosh.app |
| AVIF | 50% smaller than JPEG | CloudConvert |
| `<picture>` element | Adaptive resolution | Responsive HTML |

**Key attributes:** `loading="lazy"`, `decoding="async"`, explicit `width`/`height`

---

## 9. Preloader / Loading Screen (from Source)

**HTML:** Full-screen overlay with spinner + loading text
**CSS:** Fixed position, z-index 10000, spinning animation
**GSAP:** Listen to `window.load` → fade out preloader → slide up → reveal hero

**Production rules:**
- No `setTimeout` artificial delays — use native `load` event
- Keep preloader assets local (no external fonts in loader)

---

## 10. Audio / Sound Design Integration

```javascript
const hoverSound = new Audio('hover-click.mp3');
hoverSound.preload = 'auto';
hoverSound.volume = 0.15;
hoverSound.play().catch(error => { /* browser blocks autoplay */ });
```

**Important:** Browsers block audio autoplay until first user click. Always include `.catch()`.

---

## 11. Lenis Smooth Scrolling Implementation

```javascript
const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
requestAnimationFrame(raf);
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
```

---

## 12. Animated Contact Form

- Floating labels via `:placeholder-shown` CSS selector
- GSAP submission sequence: hide text → show spinner → 2s delay → success checkmark
- Reset form after submission

---

## 13. Complete URL List (from Source — 20 URLs)

| # | URL | Category |
|---|---|---|
| 1 | https://gsap.com | Animation Library |
| 2 | https://threejs.org | 3D/WebGL |
| 3 | https://lusion.co | Inspiration (Agency) |
| 4 | https://activetheory.net | Inspiration (Agency) |
| 5 | https://obys.agency | Inspiration (Agency) |
| 6 | https://unseen.co | Inspiration (Agency) |
| 7 | https://awwwards.com | Inspiration (Gallery) |
| 8 | https://landing.love | Inspiration (Gallery) |
| 9 | https://cssdesignawards.com | Inspiration (Gallery) |
| 10 | https://github.com | Hosting |
| 11 | https://metatags.io | SEO Tool |
| 12 | https://linkedin.com | Social (Post Inspector) |
| 13 | https://favicon.io | Favicon Generator |
| 14 | https://realfavicongenerator.net | Favicon Generator |
| 15 | https://squoosh.app | Image Optimization |
| 16 | https://cloudconvert.com | File Conversion |
| 17 | https://htmlminifier.com | Code Minification |
| 18 | https://cssminifier.com | Code Minification |
| 19 | https://terser.org | JS Minification |
| 20 | https://unpkg.com | CDN |

---

## 14. Free/Open-Source Examples (from Source)

| Source | URL | Type | Genre |
|---|---|---|---|
| Codrops | tympanus.net | Downloadable demos (50+) | All genres |
| FreeFrontend GSAP | freefrontend.com | 340+ code examples | GSAP animations |
| Aceternity UI | aceternity.com | React copy-paste components | UI animations |
| Awwwards Portfolio (Elijah Farrell) | github.com | Full React/Next.js template | 3D + Scroll |
| Aniq-UI | aniq-ui.com | 3D product template | 3D + React |

---

## 15. React Three Fiber / Next.js 3D Pattern (from Source)

**Architecture:**
- `Scene.js` — Client component with `'use client'`, Three.js Canvas, `useFrame` loop
- `Portfolio.js` — Dynamic import with `{ ssr: false }` to avoid server-side WebGL errors

**Key:**
```javascript
const SceneNoSSR = dynamic(() => import('./Scene'), { ssr: false });
```

---

## 16. Production Best Practices (from Source)

- **Minify assets**: HTMLMinifier, CSSMinifier, Terser
- **Keep un-minified source** as workspace file
- **CDN loading**: unpkg.com for libraries
- **Progressive enhancement**: content visible without JS
- **Responsive**: `@media (prefers-reduced-motion: reduce)` as default motion-off state
- **Lenis conflict note**: Smooth scrolling overrides `window` scroll; use `position: fixed` for cursors/preloaders
