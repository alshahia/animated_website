# FULL CREATION GUIDE: Animated Websites — Complete Reference

> **Audience:** Human developers AND AI agents/LLMs  
> **Purpose:** Production-ready guide covering every major genre of web animation  
> **Format:** Structured, parseable, step-by-step with code patterns, pitfalls, and performance notes

---

## Table of Contents

1. [CSS Animations & Transitions](#1-css-animations--transitions)
2. [Scroll-Triggered Animations (GSAP + ScrollTrigger)](#2-scroll-triggered-animations-gsap--scrolltrigger)
3. [Page Transitions & Route Animations](#3-page-transitions--route-animations)
4. [3D Websites (Three.js / React Three Fiber)](#4-3d-websites-threejs--react-three-fiber)
5. [Canvas 2D Animations (PixiJS, Paper.js)](#5-canvas-2d-animations-pixijs-paperjs)
6. [SVG Animations](#6-svg-animations)
7. [Typography / Text Animations](#7-typography--text-animations)
8. [Fluid / Particle / Interactive Animations](#8-fluid--particle--interactive-animations)
9. [Lottie / Vector Animations](#9-lottie--vector-animations)
10. [Full Production Pipeline](#10-full-production-pipeline)

---

## 1. CSS Animations & Transitions

### 1.1 Core Concepts

**Transitions** animate between two states (property changes). **Animations** use `@keyframes` for multi-step sequences.

#### Transition Properties

```
transition-property: transform, opacity;
transition-duration: 300ms;
transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
transition-delay: 0ms;

Shorthand:
transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
```

#### @keyframes Syntax

```
@keyframes slideIn {
  from { transform: translateX(-100%); opacity: 0; }
  to   { transform: translateX(0); opacity: 1; }
}

@keyframes pulse {
  0%   { transform: scale(1); }
  50%  { transform: scale(1.05); }
  100% { transform: scale(1); }
}

.element {
  animation: pulse 2s ease-in-out infinite;
}
```

#### animation Shorthand

```
animation: name duration timing-function delay iteration-count direction fill-mode play-state;

/* Example */
animation: slideIn 500ms ease-out 0ms 1 normal forwards running;
```

### 1.2 Hardware Acceleration

Only `transform` and `opacity` are composited on the GPU. Animating `width`, `height`, `top`, `left` triggers expensive layout recalculations.

#### will-change Hint

```
.element {
  will-change: transform, opacity;
}
```

**Pitfall:** Overusing `will-change` on many elements exhausts GPU memory. Apply only to the animating element, remove after animation ends (or use `will-change: auto` as default).

#### transform vs layout properties

| Property | GPU? | Cost |
|---|---|---|
| `transform` | Yes | Cheap (composite only) |
| `opacity` | Yes | Cheap |
| `filter` | Partial | Moderate (paint + composite) |
| `clip-path` | Partial | Moderate |
| `width`, `height` | No | Expensive (layout + paint + composite) |
| `top`, `left` | No | Expensive (layout + paint + composite) |
| `margin`, `padding` | No | Expensive |
| `color`, `background` | No | Paint only (moderate) |

**Rule:** Always prefer `transform: translateX(Npx)` over `left: Npx`.

### 1.3 Timing Functions

```
/* CSS keywords */
linear | ease | ease-in | ease-out | ease-in-out

/* Custom cubic-bezier */
cubic-bezier(0.4, 0, 0.2, 1)    /* Material Design standard */
cubic-bezier(0.0, 0.0, 0.2, 1)  /* deceleration */
cubic-bezier(0.4, 0.0, 1.0, 1)  /* acceleration */
cubic-bezier(0.34, 1.56, 0.64, 1) /* bounce/overshoot */

/* Step-based */
steps(4, end)  /* 4 discrete frames, no interpolation */
```

**Common Easing Curves Reference:**

```
ease-in-out       = cubic-bezier(0.42, 0.0, 0.58, 1.0)
ease-out          = cubic-bezier(0.0, 0.0, 0.58, 1.0)
ease-in           = cubic-bezier(0.42, 0.0, 1.0, 1.0)
smooth bounce     = cubic-bezier(0.34, 1.56, 0.64, 1)
sharp movement    = cubic-bezier(0.4, 0.0, 0.6, 1.0)
```

### 1.4 Step-by-Step: Button Hover

**Goal:** A button that scales up and changes color on hover.

```
<button class="btn-hover">Click Me</button>

/* --- CSS --- */
.btn-hover {
  padding: 12px 24px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition:
    transform 200ms cubic-bezier(0.34, 1.56, 0.64, 1),
    background 200ms ease-out,
    box-shadow 200ms ease-out;
  will-change: transform;
}

.btn-hover:hover {
  transform: scale(1.05) translateY(-2px);
  background: #2563eb;
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.35);
}

.btn-hover:active {
  transform: scale(0.98);
  background: #1d4ed8;
}
```

**Common Pitfalls:**
- Missing `will-change` on hover-target element — causes jank on first interaction.
- Transitioning `all` instead of specific properties — hurts performance and unexpected properties may animate.
- Removing hover state instantly on `mouseleave` — use `transition` on the base state, not the hover state.

**Performance Notes:**
- `transform` + `opacity` only: composited on GPU, no layout thrash.
- Button hover costs ~0.1ms frame time. 100 buttons cost ~10ms — still within 16ms budget at 60fps.

### 1.5 Step-by-Step: Card Hover

**Goal:** A card that lifts, shows a shadow, and reveals an overlay.

```
<div class="card">
  <div class="card-image"></div>
  <div class="card-overlay"></div>
  <div class="card-content">
    <h3>Card Title</h3>
    <p>Description</p>
  </div>
</div>

/* --- CSS --- */
.card {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 300ms ease-out, box-shadow 300ms ease-out;
  will-change: transform;
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.6), transparent);
  opacity: 0;
  transition: opacity 300ms ease-out;
}

.card:hover .card-overlay {
  opacity: 1;
}

.card-image {
  width: 100%;
  height: 200px;
  background-size: cover;
  transition: transform 500ms ease-out;
}

.card:hover .card-image {
  transform: scale(1.1);
}
```

**Pitfall:** `overflow: hidden` on the parent creates a new stacking context — ensure the card content is positioned correctly above the overlay.

**Perf Note:** Image scale on hover triggers paint. Use `transform: scale()` not `width`/`height`.

### 1.6 Step-by-Step: Loading Spinner

**Goal:** A pure CSS spinning loader.

```
<div class="spinner"></div>

/* --- CSS --- */
.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(59, 130, 246, 0.15);
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 800ms linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Variant: Dual-ring spinner */
.spinner-dual {
  width: 40px;
  height: 40px;
  border: 3px solid transparent;
  border-top-color: #3b82f6;
  border-bottom-color: #3b82f6;
  border-radius: 50%;
  animation: spin 1s ease-in-out infinite;
}
```

**Pitfall:** `border` animations on elements with complex backgrounds can cause repaints. The spinner above only animates `transform` (rotation) — GPU-friendly.

**File Size:** ~300 bytes CSS. Zero JS. Ideal for initial page load.

### 1.7 Step-by-Step: Skeleton Screen

**Goal:** A shimmer placeholder while content loads.

```
<div class="skeleton-card">
  <div class="skeleton-avatar skeleton-shimmer"></div>
  <div class="skeleton-lines">
    <div class="skeleton-line w-75 skeleton-shimmer"></div>
    <div class="skeleton-line w-50 skeleton-shimmer"></div>
    <div class="skeleton-line w-60 skeleton-shimmer"></div>
  </div>
</div>

/* --- CSS --- */
.skeleton-shimmer {
  background: linear-gradient(
    90deg,
    #e2e8f0 25%,
    #f1f5f9 37%,
    #e2e8f0 63%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
}

@keyframes shimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.skeleton-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
}

.skeleton-line {
  height: 12px;
  border-radius: 4px;
  margin-bottom: 8px;
}

.w-75 { width: 75%; }
.w-50 { width: 50%; }
.w-60 { width: 60%; }
```

**Pitfall:** The `background-position` animation causes repaint for every frame. For many skeletons, use `@supports (animation-composition: accumulate)` or `transform: translateZ(0)` to promote to GPU layer.

**Perf Note:** 10 skeleton cards ~0.8ms frame cost. Acceptable.

**File Size:** ~600 bytes CSS.

---

## 2. Scroll-Triggered Animations (GSAP + ScrollTrigger)

### 2.1 GSAP Installation

**CDN:**
```
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
```

**npm:**
```
npm install gsap
```

### 2.2 Plugin Registration

```
// ESM (npm)
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// CDN (global)
// ScrollTrigger auto-registers in CDN builds
```

### 2.3 Core GSAP Syntax

```
// Basic tween
gsap.to(".element", {
  x: 200,
  duration: 1,
  ease: "power2.out"
});

// From state
gsap.from(".element", { opacity: 0, y: 50, duration: 0.5 });

// FromTo (explicit control)
gsap.fromTo(".element",
  { opacity: 0, y: 50 },
  { opacity: 1, y: 0, duration: 0.5 }
);

// Timeline (sequencing)
const tl = gsap.timeline({ defaults: { duration: 0.5, ease: "power2.out" } });
tl.to(".el1", { x: 100 })
  .to(".el2", { x: 100 }, "-=0.3")  // overlap by 0.3s
  .to(".el3", { x: 100 }, "+=0.2"); // delay 0.2s after previous
```

**Easing presets:** `power1` / `power2` / `power3` / `power4` / `back` / `elastic` / `bounce` / `slow` / `steps` — each with `.in` / `.out` / `.inOut` variants.

### 2.4 ScrollTrigger Plugin

```
gsap.to(".reveal", {
  scrollTrigger: {
    trigger: ".reveal",
    start: "top 80%",
    end: "top 20%",
    scrub: 1,       // 1s lag, true for instant scrub
    pin: false,
    markers: true,  // dev only — remove in production
    toggleActions: "play none none reverse"
      // onEnter onLeave onEnterBack onLeaveBack
  },
  opacity: 1,
  y: 0,
  duration: 1
});
```

#### Key ScrollTrigger Options

| Option | Values | Description |
|---|---|---|
| `trigger` | CSS selector / element | Element that triggers the animation |
| `start` | `"top bottom"`, `"top 80%"`, `"+=200"` | When the animation starts |
| `end` | `"bottom top"`, `"+=500"` | When the animation ends |
| `scrub` | `boolean | number` | Link animation to scroll position |
| `pin` | `boolean` | Pin the trigger element during animation |
| `pinSpacing` | `true | false` | Add margin to prevent layout jump |
| `anticipatePin` | `boolean` | Fix jank on fast scrolls with pin |
| `snap` | `number | array` | Snap to scroll positions |
| `toggleActions` | `string` | 4-word action control |
| `invalidateOnRefresh` | `boolean` | Re-calculate on window resize |
| `once` | `boolean` | Fire animation only once |

#### toggleActions Format

```
"play pause resume reset"
  onEnter | onLeave | onEnterBack | onLeaveBack

Actions: play, pause, resume, reset, restart, complete, reverse, none
```

### 2.5 Timeline Sequencing with ScrollTrigger

```
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".section",
    start: "top center",
    end: "bottom top",
    scrub: 0.5,
    pin: true,
    anticipatePin: 1
  },
  defaults: { ease: "power2.out" }
});

tl.from(".section-title", { opacity: 0, y: 60 })
  .from(".section-image", { opacity: 0, scale: 0.8 }, "-=0.3")
  .from(".section-text",  { opacity: 0, x: -40 }, "-=0.2")
  .to(".section-cta",     { opacity: 1, y: 0 }, "-=0.1");
```

### 2.6 Staggering

```
gsap.from(".grid-item", {
  opacity: 0,
  y: 30,
  duration: 0.4,
  stagger: 0.05,          // 50ms between each
  // stagger: { each: 0.05, from: "center", grid: "auto" }
  // stagger: { each: 0.05, from: "edges" }
  ease: "power2.out"
});
```

`stagger` can be a number (seconds between each) or an object with:
- `each` — time between items
- `from` — `"start"`, `"center"`, `"end"`, `"edges"`, `"random"`
- `grid` — `"row"`, `"column"`, or `[rows, cols]` for 2D grids
- `ease` — custom easing for the stagger curve

### 2.7 MatchMedia (Responsive ScrollTrigger)

```
const mm = gsap.matchMedia();

mm.add("(min-width: 1024px)", () => {
  // Desktop-only animations
  gsap.to(".parallax-bg", {
    scrollTrigger: { trigger: ".hero", scrub: true },
    y: -200,
    ease: "none"
  });
});

mm.add("(max-width: 1023px)", () => {
  // Mobile: simpler animation or none
  gsap.set(".parallax-bg", { y: 0 });
});

// Cleanup: ScrollTrigger.getAll().forEach(t => t.kill());
// GSAP 3.12+ auto-cleans matchMedia on refresh
```

### 2.8 Step-by-Step: Scroll Reveal

**Goal:** Elements fade and slide up as they enter the viewport.

```
<!-- HTML -->
<div class="reveal-wrapper">
  <div class="reveal-item" data-delay="0">Item 1</div>
  <div class="reveal-item" data-delay="0.1">Item 2</div>
  <div class="reveal-item" data-delay="0.2">Item 3</div>
</div>

// JS
gsap.utils.toArray(".reveal-item").forEach((el, i) => {
  gsap.from(el, {
    opacity: 0,
    y: 40,
    duration: 0.6,
    delay: parseFloat(el.dataset.delay) || i * 0.1,
    scrollTrigger: {
      trigger: el,
      start: "top 85%",
      toggleActions: "play none none none",
      once: true       // plays only the first time
    },
    ease: "power3.out"
  });
});
```

**Pitfall:** `toggleActions: "play none none none"` with `once: true` keeps memory usage low but means re-scrolling won't replay.

**Perf Note:** Each ScrollTrigger instance costs ~0.02ms. 50 instances = ~1ms on scroll. Acceptable.

### 2.9 Step-by-Step: Parallax

**Goal:** Background moves slower than foreground on scroll.

```
<section class="parallax-section">
  <div class="parallax-bg"></div>
  <div class="parallax-content">
    <h2>Foreground Title</h2>
  </div>
</section>

.parallax-section {
  position: relative;
  overflow: hidden;
  height: 100vh;
}

.parallax-bg {
  position: absolute;
  inset: -20% 0;          /* extend beyond for movement room */
  background-image: url('bg.jpg');
  background-size: cover;
  will-change: transform;
}

// JS
gsap.to(".parallax-bg", {
  y: "20%",               // moves 20% of scroll distance
  ease: "none",
  scrollTrigger: {
    trigger: ".parallax-section",
    start: "top bottom",
    end: "bottom top",
    scrub: true
  }
});
```

**Pitfall:** Background images with `url()` cause repaint on scroll if not GPU-promoted. Use `will-change: transform` on the background layer.

**Tip:** Set `y: "20%"` — background moves 20% of the scroll distance, creating the parallax effect. Adjust percentage for speed: higher = faster movement.

### 2.10 Step-by-Step: Pin Sections

**Goal:** A section stays fixed while content animates through it.

```
<section class="pin-section">
  <div class="pin-container">   <!-- pinned element -->
    <div class="pin-panel red">Panel 1</div>
    <div class="pin-panel blue">Panel 2</div>
    <div class="pin-panel green">Panel 3</div>
  </div>
</section>

.pin-section {
  height: 300vh;          /* scroll distance = 3x viewport */
}

.pin-container {
  height: 100vh;
  display: flex;
}

.pin-panel {
  flex: 0 0 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
}

// JS
const panels = gsap.utils.toArray(".pin-panel");
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".pin-section",
    start: "top top",
    end: "+=300%",         // or "bottom bottom" if height:300vh
    pin: true,
    scrub: 1,
    anticipatePin: 1
  }
});

panels.forEach((panel, i) => {
  tl.to(".pin-container", {
    x: () => -i * innerWidth,   // slide container left
    duration: 1
  }, i);                        // position in timeline
});

// Alternative: simpler approach with single elements
gsap.utils.toArray(".pin-panel").forEach((panel, i) => {
  ScrollTrigger.create({
    trigger: panel,
    start: "top top",
    pin: true,
    pinSpacing: false,
    markers: true,              // dev only
    anticipatePin: 1
  });
});
```

**Pitfall:** `pin: true` without `pinSpacing: false` adds a `min-height` to the spacer — can break layouts.

**Pitfall:** Fast scrolling can cause pinned sections to "snap" oddly. `anticipatePin: 1` helps.

### 2.11 Step-by-Step: Horizontal Scroll

**Goal:** Vertical scroll drives horizontal movement through panels.

```
<section class="horizontal-section">
  <div class="horizontal-track">
    <div class="horizontal-panel">1</div>
    <div class="horizontal-panel">2</div>
    <div class="horizontal-panel">3</div>
    <div class="horizontal-panel">4</div>
  </div>
</section>

.horizontal-section {
  height: 500vh;             /* scroll distance */
}

.horizontal-track {
  display: flex;
  height: 100vh;
  width: fit-content;
}

.horizontal-panel {
  width: 100vw;
  height: 100vh;
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

// JS
const track = document.querySelector(".horizontal-track");
const panels = gsap.utils.toArray(".horizontal-panel");

gsap.to(track, {
  x: () => -(track.scrollWidth - window.innerWidth),
  ease: "none",
  scrollTrigger: {
    trigger: ".horizontal-section",
    start: "top top",
    end: () => "+=" + (track.scrollWidth - window.innerWidth),
    pin: true,
    scrub: 1,
    anticipatePin: 1,
    invalidateOnRefresh: true
  }
});
```

**Pitfall:** `track.scrollWidth` changes if images haven't loaded. Use `invalidateOnRefresh: true` or `ImagesLoaded` before initializing.

**Pitfall:** On mobile, horizontal scroll sections can trap users. Add a clear scroll indicator or exit at the end.

---

## 3. Page Transitions & Route Animations

### 3.1 Overview

Three main approaches:
1. **Barba.js / Swup** — library-based, wraps content, handles history
2. **Framer Motion AnimatePresence** — React-specific, component-level exit/enter
3. **View Transitions API** — new browser standard, zero-dependency

### 3.2 Barba.js Approach

**Installation:**
```
npm install @barba/core
# or CDN
<script src="https://unpkg.com/@barba/core"></script>
```

**Basic Setup:**
```
import barba from "@barba/core";

barba.init({
  transitions: [{
    name: "fade",
    leave(data) {
      return gsap.to(data.current.container, {
        opacity: 0,
        duration: 0.3
      });
    },
    enter(data) {
      return gsap.from(data.next.container, {
        opacity: 0,
        duration: 0.3
      });
    }
  }]
});
```

**HTML Requirements:**
```
<body data-barba="wrapper">
  <main data-barba="container" class="container">
    <!-- page content -->
  </main>
</body>
```

**Pitfall:** Barba.js intercepts all same-origin links. External links must have `data-barba-prevent` attribute.

**Pitfall:** Third-party scripts (analytics, ads, chat widgets) can break on navigation. Use `barba.hooks.after()` to reinitialize.

### 3.3 Swup Approach

**Installation:**
```
npm install swup
```

**Setup:**
```
import Swup from 'swup';

const swup = new Swup({
  containers: ["#swup"],     // selector for content container
  plugins: []                // optional plugins
});

// Custom animation using Swup hooks
document.addEventListener('swup:contentReplaced', () => {
  // Reinitialize any page-specific JS
  initScrollTriggers();
});
```

**Swup vs Barba:** Swup is lighter (~7KB vs ~15KB gzipped). Barba offers richer animation hooks out of the box.

### 3.4 Framer Motion AnimatePresence (React/Next.js)

```
npm install framer-motion
```

```
"use client";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Template({ children }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
```

**Next.js 13+ App Router:** Place inside `app/template.tsx` — wraps page content and remounts on navigation.

**Next.js Pages Router:** Use `app.tsx` with `AnimatePresence` wrapping `<Component {...pageProps} />` and a `key` on the pathname.

**Pitfall:** `AnimatePresence mode="wait"` delays new page mount until exit completes — can feel slow on fast navigation. Use `mode="popLayout"` for overlapping enter/exit.

**Pitfall:** Framer Motion bundles ~30KB gzipped. Consider lazy loading or dynamic import for non-critical routes.

### 3.5 View Transitions API (New Standard)

**No dependencies.** Supported in Chrome 111+, Safari 18+, Firefox 125+.

```
// Single-page app (SPA) transition
document.querySelector("a").addEventListener("click", async (e) => {
  e.preventDefault();
  const url = e.target.href;

  const transition = document.startViewTransition(async () => {
    // Update DOM synchronously
    const html = await fetch(url).then(r => r.text());
    document.body.innerHTML = extractContent(html);
  });

  await transition.finished;
});

// Custom crossfade
document.startViewTransition(() => updateDOM());
```

**CSS Customization:**
```
/* Default: cross-fade */
::view-transition-old(root) { animation: fadeOut 0.3s ease-out; }
::view-transition-new(root) { animation: fadeIn 0.3s ease-out; }

@keyframes fadeOut { to { opacity: 0; } }
@keyframes fadeIn  { from { opacity: 0; } }

/* Slide transition */
::view-transition-old(root) {
  animation: slideOutLeft 0.4s ease-in-out;
}
::view-transition-new(root) {
  animation: slideInRight 0.4s ease-in-out;
}

@keyframes slideOutLeft {
  to { transform: translateX(-30%); opacity: 0; }
}
@keyframes slideInRight {
  from { transform: translateX(30%); opacity: 0; }
}
```

**Named View Transitions:**
```
/* Per-element transitions (MPA, multi-page) */
.header {
  view-transition-name: site-header;
}

::view-transition-old(site-header),
::view-transition-new(site-header) {
  animation-duration: 0.5s;
}
```

**Pitfall:** `document.startViewTransition()` requires the DOM update to happen synchronously inside the callback. Async state fetches must complete before calling.

**Pitfall:** View Transitions API is not yet fully cross-browser. Provide fallback (no transition) for unsupported browsers.

### 3.6 Step-by-Step: Fade Transition

**Barba.js:**
```
barba.init({
  transitions: [{
    leave({ current }) {
      return gsap.to(current.container, { opacity: 0, duration: 0.3 });
    },
    enter({ next }) {
      return gsap.from(next.container, { opacity: 0, duration: 0.3 });
    }
  }]
});
```

**Framer Motion:**
```
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.3 }}
/>
```

**View Transitions API:**
```
/* CSS only */
::view-transition-old(root),
::view-transition-new(root) {
  animation-duration: 0.3s;
}
```

**Pitfall:** In Barba/Swup, ensure the next page's CSS is already loaded. Inline critical CSS or use preload for transitioned pages.

### 3.7 Step-by-Step: Slide Transition

**Barba.js:**
```
barba.init({
  transitions: [{
    leave({ current }) {
      return gsap.to(current.container, { x: "-30%", opacity: 0, duration: 0.4 });
    },
    enter({ next }) {
      gsap.set(next.container, { x: "30%", opacity: 0 });
      return gsap.to(next.container, { x: "0%", opacity: 1, duration: 0.4 });
    }
  }]
});
```

**Framer Motion:**
```
<motion.div
  initial={{ x: 300, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  exit={{ x: -300, opacity: 0 }}
  transition={{ type: "spring", damping: 25, stiffness: 200 }}
/>
```

### 3.8 Step-by-Step: Morph Transition (Shared Element)

**Barba.js with GSAP MorphSVG (plugin):**
```
barba.init({
  transitions: [{
    sync: true,  // both pages exist simultaneously
    leave({ current }) {
      gsap.to(current.container, { opacity: 0, duration: 0.2 });
    },
    enter({ next, current }) {
      const sharedEl = next.container.querySelector(".shared-element");
      const oldEl = current.container.querySelector(".shared-element");

      if (sharedEl && oldEl) {
        gsap.fromTo(sharedEl,
          { morphSVG: oldEl },
          { morphSVG: sharedEl, duration: 0.5 }
        );
      }
    }
  }]
});
```

**View Transitions API (Shared Element):**
```
/* Both pages have matching view-transition-name */
.product-image { view-transition-name: product-img; }

::view-transition-old(product-img) {
  animation: morphOut 0.4s ease-in-out;
}
::view-transition-new(product-img) {
  animation: morphIn 0.4s ease-in-out;
}
```

---

## 4. 3D Websites (Three.js / React Three Fiber)

### 4.1 Core Three.js Concepts

**Basic Scene Setup:**
```
import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,                         // FOV
  window.innerWidth / window.innerHeight, // aspect
  0.1,                        // near
  1000                        // far
);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // cap for performance
document.body.appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  // update objects here
  renderer.render(scene, camera);
}
animate();
```

**Renderer options key:**
- `antialias: true` — smoother edges, ~20% performance cost
- `alpha: true` — transparent background
- `powerPreference: "high-performance"` — request dedicated GPU

### 4.2 3D Objects

```
// Geometry + Material = Mesh
const geometry = new THREE.BoxGeometry(1, 1, 1);
// SphereGeometry(radius, widthSegments, heightSegments)
// CylinderGeometry(radiusTop, radiusBottom, height)
// TorusGeometry(radius, tube, radialSegments, tubularSegments)
// PlaneGeometry(width, height)
// RingGeometry(innerRadius, outerRadius)

const material = new THREE.MeshStandardMaterial({
  color: 0x3b82f6,
  roughness: 0.3,
  metalness: 0.1,
  envMapIntensity: 1
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
```

**Material Types:**
| Material | Use Case | Perf |
|---|---|---|
| `MeshBasicMaterial` | Unlit, flat colors | Fastest |
| `MeshStandardMaterial` | PBR, realistic | Moderate |
| `MeshPhysicalMaterial` | Clear coat, sheen, transmission | Heaviest |
| `MeshMatcapMaterial` | Fixed lighting direction | Fast |
| `ShaderMaterial` | Custom GLSL | Varies |
| `PointsMaterial` | Particle systems | Fast |

### 4.3 Animation Loop (useFrame in R3F)

**Vanilla Three.js:**
```
function animate() {
  requestAnimationFrame(animate);
  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.005;
  renderer.render(scene, camera);
}
animate();
```

**React Three Fiber:**
```
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

function RotatingCube() {
  const ref = useRef();

  useFrame((state, delta) => {
    // state.clock — THREE.Clock
    // state.camera — current camera
    // state.pointer — normalized mouse coords
    // delta — frame delta in seconds (use for frame-rate-independent)
    ref.current.rotation.x += delta * 0.5;
    ref.current.rotation.y += delta * 0.3;
  });

  return (
    <mesh ref={ref}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#3b82f6" />
    </mesh>
  );
}
```

**Delta vs Fixed Increment:** Always multiply by `delta` for frame-rate-independent animation. Adding `0.01` per frame runs at different speeds on 30fps vs 144fps displays.

### 4.4 React Three Fiber with Next.js

```
// Component file — must use dynamic import
"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import My3DScene from "./My3DScene";

export default function SceneWrapper() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      dpr={[1, 1.5]}                 // responsive pixel ratio
      gl={{ antialias: true }}
      style={{ width: "100%", height: "100vh" }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} />
      <My3DScene />
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
}

// Consumer page
import dynamic from "next/dynamic";

const Scene3D = dynamic(
  () => import("@/components/Scene3D"),
  { ssr: false }                    // CRITICAL: prevents SSR mismatch
);

export default function HomePage() {
  return (
    <main>
      <Scene3D />
    </main>
  );
}
```

**`dpr` (devicePixelRatio) key:** `[1, 1.5]` uses 1x on 1x displays, 1.5x on 2x+ displays. Better than `[1, 2]` which uses 2x on retina (4x pixels = expensive). `Math.min(window.devicePixelRatio, 2)` in vanilla.

### 4.5 Step-by-Step: Rotating Cube

**Vanilla Three.js:**
```
import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w/h, 0.1, 1000);
camera.position.z = 3;

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

const geo = new THREE.BoxGeometry();
const mat = new THREE.MeshStandardMaterial({
  color: 0x6366f1,
  roughness: 0.4,
  metalness: 0.2
});
const cube = new THREE.Mesh(geo, mat);
scene.add(cube);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 2, 4);
scene.add(light);

function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.005;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();
```

**React Three Fiber:**
```
"use client";
import { Canvas } from "@react-three/fiber";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

function Cube() {
  const ref = useRef();
  useFrame((_, delta) => {
    ref.current.rotation.x += delta * 0.3;
    ref.current.rotation.y += delta * 0.6;
  });
  return (
    <mesh ref={ref}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#6366f1" roughness={0.4} metalness={0.2} />
    </mesh>
  );
}

export default function Page() {
  return (
    <Canvas camera={{ position: [0, 0, 3] }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 2, 4]} intensity={1} />
      <Cube />
    </Canvas>
  );
}
```

**Pitfall:** `args` for geometry are constructor arguments: `BoxGeometry(width, height, depth)`, so `args={[1, 1, 1]}`.

**File Size:** Three.js ~600KB min, ~150KB gzipped. R3F adds ~15KB. Always dynamic import.

### 4.6 Step-by-Step: 3D Environment

**Goal:** A scene with ground, lighting, fog, and orbiting objects.

```
import * as THREE from 'three';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0a0a1a);
scene.fog = new THREE.Fog(0x0a0a1a, 10, 30);

const camera = new THREE.PerspectiveCamera(60, w/h, 0.1, 100);
camera.position.set(0, 2, 8);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Ground
const groundGeo = new THREE.PlaneGeometry(20, 20);
const groundMat = new THREE.MeshStandardMaterial({ color: 0x222244, roughness: 0.8 });
const ground = new THREE.Mesh(groundGeo, groundMat);
ground.rotation.x = -Math.PI / 2;
ground.position.y = -0.5;
ground.receiveShadow = true;
scene.add(ground);

// Environment objects
for (let i = 0; i < 20; i++) {
  const size = 0.2 + Math.random() * 0.4;
  const geo = new THREE.BoxGeometry(size, size, size);
  const mat = new THREE.MeshStandardMaterial({
    color: new THREE.Color().setHSL(Math.random(), 0.6, 0.5),
    roughness: 0.5
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.set(
    (Math.random() - 0.5) * 12,
    Math.random() * 2,
    (Math.random() - 0.5) * 12
  );
  mesh.castShadow = true;
  scene.add(mesh);
}

// Ambient + Hemisphere lighting
scene.add(new THREE.AmbientLight(0x404060, 0.5));
scene.add(new THREE.HemisphereLight(0x8888ff, 0x444422, 0.4));

// Main light
const dirLight = new THREE.DirectionalLight(0xffeedd, 1.5);
dirLight.position.set(5, 8, 3);
dirLight.castShadow = true;
dirLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
scene.add(dirLight);
```

**Pitfall:** `shadow.mapSize` at 2048+ quadruples GPU work. Start at 1024, increase only if shadows look blocky.

**Perf Note:** 20 meshes with shadows = ~200 draw calls. 200+ meshes = likely below 60fps on mobile. Use instancing for many similar objects.

### 4.7 Step-by-Step: Product Showcase

**Goal:** Interactive 3D product viewer with auto-rotation and zoom.

```
"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, ContactShadows, Environment } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";

function Product({ modelPath }) {
  const ref = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (!hovered) {
      ref.current.rotation.y += delta * 0.3;  // auto-rotate
    }
    // Subtle floating
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
  });

  return (
    <mesh
      ref={ref}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onPointerMissed={() => setHovered(false)}
    >
      {/* Use actual 3D model via useGLTF */}
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshPhysicalMaterial
        color="#3b82f6"
        metalness={0.8}
        roughness={0.2}
        clearcoat={0.3}
        envMapIntensity={1}
      />
    </mesh>
  );
}

export default function ProductViewer() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
    >
      <Environment preset="studio" />
      <Product />
      <ContactShadows
        position={[0, -1.5, 0]}
        opacity={0.5}
        scale={4}
        blur={2}
        far={4}
      />
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2}
        autoRotate={false}
      />
    </Canvas>
  );
}
```

**`drei` helpers:** `ContactShadows` (soft floor shadow), `Environment` (HDRI lighting), `OrbitControls` (interactive camera), `useGLTF` (GLTF model loader), `useAnimations` (loaded animations), `Float` (auto-float animation), `MeshTransmissionMaterial` (glass effect).

**Pitfall:** `Environment preset="studio"` loads a 1MB+ HDR texture. For performance, use `preset="city"` (smaller) or a custom LDR environment.

**Pitfall:** GLTF models should be compressed with `draco` or `meshopt`. A 50MB model becomes ~10MB compressed.

---

## 5. Canvas 2D Animations (PixiJS, Paper.js)

### 5.1 Canvas vs WebGL vs SVG

| Technology | Use Case | Performance |
|---|---|---|
| Canvas 2D (native) | Simple 2D, few objects | Good for <1000 elements |
| PixiJS | Sprite-based, many objects | Excellent (WebGL), 10k+ sprites |
| Paper.js | Vector-based, path operations | Good, vector heavy |
| Native WebGL | Custom shaders | Best, hardest |

### 5.2 Canvas Setup and Rendering Pipeline

**Native Canvas (Vanilla):**
```
<canvas id="canvas" width="800" height="600"></canvas>

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Resize handler
function resize() {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";
  ctx.scale(dpr, dpr);
}
window.addEventListener("resize", resize);
resize();

// Render loop
function render() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  // draw...
  requestAnimationFrame(render);
}
render();
```

**PixiJS Setup:**
```
npm install pixi.js

import * as PIXI from "pixi.js";

const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0x0a0a1a,
  antialias: true,
  resolution: window.devicePixelRatio || 1,
  autoDensity: true
});
document.body.appendChild(app.view);

app.ticker.add((delta) => {
  // update loop
});
```

**Paper.js Setup:**
```
npm install paper

import paper from "paper";

const canvas = document.getElementById("canvas");
paper.setup(canvas);

paper.view.onFrame = (event) => {
  // animation loop — event.delta, event.time
};

paper.view.onResize = () => {
  // handle resize
};
```

### 5.3 Sprites, Textures, Particle Systems

**PixiJS Sprites:**
```
// Load texture
const texture = await PIXI.Assets.load("sprite.png");

// Create sprite
const sprite = new PIXI.Sprite(texture);
sprite.x = 100;
sprite.y = 200;
sprite.anchor.set(0.5);       // center pivot
sprite.scale.set(0.5);
sprite.rotation = 0.5;
sprite.alpha = 0.8;
sprite.tint = 0xff6600;        // color tint (multiply)

app.stage.addChild(sprite);

// Animated sprite
const animatedSprite = new PIXI.AnimatedSprite(frames);
animatedSprite.play();
animatedSprite.animationSpeed = 0.1;
```

**PixiJS Particle System (using @pixi/particle-emitter):**
```
npm install @pixi/particle-emitter

import { Emitter } from "@pixi/particle-emitter";

const emitter = new Emitter({
  autoUpdate: true,
  emit: true,
  frequency: 0.01,            // emit every 10ms
  particleLifetime: { min: 1, max: 3 },
  alpha: { start: 1, end: 0 },
  scale: { start: 0.5, end: 0.1 },
  color: { start: "#ff6600", end: "#0033ff" },
  speed: { min: 50, max: 150 },
  angle: { min: 0, max: 360 },
  spawnCount: 3,
  pos: { x: 400, y: 300 }
});
app.ticker.add((delta) => emitter.update(delta * 0.01));
```

### 5.4 Performance Optimization

**Object Pooling (reuse objects, don't create/destroy):**
```
class ParticlePool {
  constructor(size = 100) {
    this.pool = [];
    this.active = [];

    for (let i = 0; i < size; i++) {
      const g = new PIXI.Graphics();
      g.beginFill(0xffffff);
      g.drawCircle(0, 0, 2);
      g.endFill();
      g.visible = false;
      this.pool.push(g);
    }
  }

  acquire() {
    const p = this.pool.pop();
    if (p) {
      p.visible = true;
      this.active.push(p);
    }
    return p;
  }

  release(p) {
    p.visible = false;
    p.removeFromParent();
    this.pool.push(p);
    this.active = this.active.filter(a => a !== p);
  }
}
```

**Sprite Batching:** PixiJS automatically batches sprites using the same texture into one draw call. To preserve batching:
- Use sprite sheets (texture atlases) — 1 texture = N sprites = 1 draw call
- Avoid per-sprite `tint` changes (breaks batch)
- Group sprites by texture
- Use `PIXI.BatchRenderer` for WebGL
- Use `cull` — remove off-screen objects

**PixiJS Performance Targets:**
| Sprites | Target Device |
|---|---|
| < 1,000 | All devices, 60fps |
| 1,000–10,000 | Desktop, high-end mobile |
| 10,000–100,000 | Desktop only, may need culling |
| > 100,000 | Use shader-based rendering |

### 5.5 Step-by-Step: Particle System (PixiJS)

```
import * as PIXI from "pixi.js";

const app = new PIXI.Application({
  resizeTo: window,
  background: 0x0a0a1a,
  antialias: true,
  resolution: Math.min(window.devicePixelRatio, 2)
});
document.body.appendChild(app.view);

const particles = [];
const NUM_PARTICLES = 200;

// Create particle sprites
const texture = createCircleTexture();   // see below
for (let i = 0; i < NUM_PARTICLES; i++) {
  const p = new PIXI.Sprite(texture);
  p.anchor.set(0.5);
  p.x = Math.random() * app.screen.width;
  p.y = Math.random() * app.screen.height;
  p.speedX = (Math.random() - 0.5) * 2;
  p.speedY = (Math.random() - 0.5) * 2;
  p.alpha = 0.3 + Math.random() * 0.5;
  p.scale.set(0.2 + Math.random() * 0.5);
  particles.push(p);
  app.stage.addChild(p);
}

function createCircleTexture() {
  const g = new PIXI.Graphics();
  g.beginFill(0xffffff);
  g.drawCircle(0, 0, 1);
  g.endFill();
  return app.renderer.generateTexture(g);
}

// Animation loop
app.ticker.add(() => {
  for (const p of particles) {
    p.x += p.speedX;
    p.y += p.speedY;

    // Wrap around edges
    if (p.x < 0) p.x = app.screen.width;
    if (p.x > app.screen.width) p.x = 0;
    if (p.y < 0) p.y = app.screen.height;
    if (p.y > app.screen.height) p.y = 0;
  }
});
```

**Pitfall:** `generateTexture` creates a new texture — use once and reuse. Don't call per frame.

**Pitfall:** PixiJS `Application` constructor creates its own canvas. Use `app.view` to insert it.

### 5.6 Step-by-Step: Generative Art (Canvas 2D)

```
const canvas = document.getElementById("gen-art");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

let time = 0;

function draw() {
  time += 0.01;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  const maxLen = Math.min(cx, cy) * 0.8;

  for (let i = 0; i < 100; i++) {
    const angle = (i / 100) * Math.PI * 2 + time * 0.1;
    const radius = maxLen * (0.5 + 0.5 * Math.sin(time * 0.5 + i * 0.1));

    const x = cx + Math.cos(angle) * radius;
    const y = cy + Math.sin(angle) * radius;

    ctx.beginPath();
    ctx.arc(x, y, 3, 0, Math.PI * 2);
    ctx.fillStyle = `hsl(${i * 3.6 + time * 50}, 80%, 60%)`;
    ctx.fill();
  }

  requestAnimationFrame(draw);
}
resize();
draw();
```

**Pitfall:** `hsl()` interpolation creates smooth color transitions. Avoid `rgba()` for animated colors (slower parsing).

### 5.7 Step-by-Step: Interactive Canvas (Paper.js)

```
import paper from "paper";

const canvas = document.getElementById("interactive");
paper.setup(canvas);

const width = paper.view.size.width;
const height = paper.view.size.height;

// Create interactive circles
const circles = [];
for (let i = 0; i < 30; i++) {
  const circle = new paper.Path.Circle({
    center: [Math.random() * width, Math.random() * height],
    radius: 10 + Math.random() * 30,
    fillColor: new paper.Color({
      hue: Math.random() * 360,
      saturation: 0.8,
      brightness: 0.7
    }),
    opacity: 0.6
  });
  circles.push(circle);
}

// Mouse interaction
paper.view.onMouseMove = (event) => {
  for (const circle of circles) {
    const dist = event.point.getDistance(circle.position);
    const maxDist = 200;

    if (dist < maxDist) {
      const scale = 1 + (1 - dist / maxDist) * 0.5;
      circle.scale = scale;
      circle.opacity = 0.6 + (1 - dist / maxDist) * 0.4;
    } else {
      circle.scale = 1;
      circle.opacity = 0.6;
    }
  }
};

paper.view.draw();
```

**Paper.js vs PixiJS:** Paper.js is vector-based — paths stay editable. PixiJS is raster-based — faster but paths aren't editable after rendering.

---

## 6. SVG Animations

### 6.1 Stroke-Dasharray / Stroke-Dashoffset

**Core technique for line-drawing animations:**

```
/* SVG */
<svg viewBox="0 0 200 200">
  <path class="line" d="M10 10 L190 10 L190 190 L10 190 Z"
        fill="none" stroke="#3b82f6" stroke-width="4" />
</svg>

/* CSS */
.line {
  stroke-dasharray: 1000;        /* length of path (approx or exact) */
  stroke-dashoffset: 1000;       /* start hidden */
  animation: draw 2s ease-out forwards;
}

@keyframes draw {
  to { stroke-dashoffset: 0; }
}
```

**Getting exact path length:**
```
const path = document.querySelector('.line');
const length = path.getTotalLength();
path.style.strokeDasharray = length;
path.style.strokeDashoffset = length;
```

**GSAP Integration:**
```
gsap.fromTo(".line",
  { strokeDashoffset: 1000 },
  { strokeDashoffset: 0, duration: 2, ease: "power2.out" }
);
```

**Pitfall:** `getTotalLength()` returns different values for different browsers for the same path. Always use JS to set the dash values dynamically.

**Pitfall:** Complex paths with many segments can cause stutter during animation. Simplify paths in vector software (reduce points).

### 6.2 SMIL Animations

```
<!-- Declarative SVG animation — no JS needed -->
<svg viewBox="0 0 200 200">
  <circle cx="40" cy="40" r="20" fill="#3b82f6">
    <animate
      attributeName="cx"
      values="40;160;40"
      dur="2s"
      repeatCount="indefinite"
    />
    <animate
      attributeName="fill"
      values="#3b82f6;#ef4444;#3b82f6"
      dur="2s"
      repeatCount="indefinite"
    />
  </circle>

  <!-- animateTransform for rotation/scale -->
  <rect x="80" y="80" width="40" height="40" fill="#10b981">
    <animateTransform
      attributeName="transform"
      type="rotate"
      from="0 100 100"
      to="360 100 100"
      dur="3s"
      repeatCount="indefinite"
    />
  </rect>
</svg>
```

**Browser Support:** SMIL works in all modern browsers. Edge had issues but resolved in Chromium-based Edge.

**Pitfall:** SMIL and CSS animations on the same element conflict. Use one or the other.

**Pitfall:** `fill="freeze"` (SMIL) vs `fill="none"` — SMIL `fill` means "what happens when animation ends", not the SVG `fill` attribute.

### 6.3 GSAP MorphSVG Plugin

**Paid plugin** (part of GSAP Club GreenSock). Requires `gsap.registerPlugin(MorphSVG)`.

```
import { gsap } from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
gsap.registerPlugin(MorphSVGPlugin);

// Morph one path to another
gsap.to(".morph-path", {
  morphSVG: ".target-path",
  duration: 1,
  ease: "power2.inOut"
});

// Shape (pathData) directly
gsap.to(".path", {
  morphSVG: "M0,100 Q50,0 100,100 T200,100",
  duration: 0.8
});
```

**Pitfall:** Only `path` elements with matching command types morph smoothly. Mixing `M` (move) with `C` (cubic) causes jarring transitions. Best practice: export paths from vector software with identical point counts.

**Pitfall:** MorphSVG adds ~10KB gzipped. Bundle only when needed.

### 6.4 Step-by-Step: Line Drawing

```
<!-- HTML -->
<svg viewBox="0 0 500 200" class="line-draw">
  <path class="draw-path" d="M20 180 Q100 20 180 180 T340 180"
        fill="none" stroke="#6366f1" stroke-width="3"
        stroke-linecap="round" />
</svg>

// JS
const path = document.querySelector(".draw-path");
const length = path.getTotalLength();

// Set initial state
path.style.strokeDasharray = length;
path.style.strokeDashoffset = length;

// Animate with GSAP
gsap.to(path, {
  strokeDashoffset: 0,
  duration: 2,
  ease: "power3.inOut",
  delay: 0.5
});

// Animate with CSS
@keyframes lineDraw {
  from { stroke-dashoffset: 1000; }
  to   { stroke-dashoffset: 0; }
}
.draw-path {
  animation: lineDraw 2s ease-in-out 0.5s forwards;
}
```

**Perf Note:** SVG line drawing uses GPU-accelerated rendering in most browsers. Very efficient — 50 simultaneous paths at 60fps.

**File Size:** Path data is typically 50–500 bytes. Extremely lightweight.

### 6.5 Step-by-Step: Icon Morphing

```
<!-- Two SVGs with matching path structures -->
<svg class="icon-morph" viewBox="0 0 24 24">
  <!-- Menu icon (3 lines) -->
  <path class="morph-target shape-1"
        d="M3 6h18M3 12h18M3 18h18" />
</svg>

<svg class="icon-morph" viewBox="0 0 24 24" style="display:none">
  <!-- Close icon (X) -->
  <path class="morph-target shape-2"
        d="M18 6L6 18M6 6l12 12" />
</svg>

// JS — using MorphSVG
const menuPath = document.querySelector(".shape-1");
const closePath = document.querySelector(".shape-2");

let isOpen = false;
document.querySelector(".toggle-btn").addEventListener("click", () => {
  isOpen = !isOpen;
  gsap.to(menuPath, {
    morphSVG: isOpen ? closePath : menuPath,
    duration: 0.4,
    ease: "power2.inOut"
  });
});

// Without MorphSVG — animate stroke properties directly
@keyframes morphToClose {
  0%   { d: path("M3 6h18M3 12h18M3 18h18"); }
  100% { d: path("M18 6L6 18M6 6l12 12"); }
}
```

**Note:** CSS `path()` in `d` animation is supported in modern browsers (Chrome 114+, Safari 17+). For wider support, use GSAP MorphSVG.

**Pitfall:** Morphing paths with different point counts creates mid-way shapes that look like tangled string. Always ensure source and target paths have identical number and types of commands.

### 6.6 Step-by-Step: Infographic Animation

```
<svg class="infographic" viewBox="0 0 400 300">
  <!-- Bar chart — animate height -->
  <rect class="bar bar-1" x="50"  y="0" width="40" height="200" fill="#3b82f6" />
  <rect class="bar bar-2" x="120" y="0" width="40" height="150" fill="#6366f1" />
  <rect class="bar bar-3" x="190" y="0" width="40" height="100" fill="#8b5cf6" />
  <rect class="bar bar-4" x="260" y="0" width="40" height="170" fill="#a855f7" />

  <!-- Background lines (axis) -->
  <line class="axis" x1="40" y1="250" x2="310" y2="250" stroke="#ccc" stroke-width="1" />
  <line class="axis" x1="40" y1="50"  x2="40"  y2="250" stroke="#ccc" stroke-width="1" />
</svg>

/* Animate bars growing from bottom */
.bar {
  transform-origin: bottom;
  transform: scaleY(0);
  transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.bar.visible {
  transform: scaleY(1);
}

/* Stagger via animation-delay */
.bar-1 { transition-delay: 0s; }
.bar-2 { transition-delay: 0.1s; }
.bar-3 { transition-delay: 0.2s; }
.bar-4 { transition-delay: 0.3s; }

// JS — trigger with Intersection Observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
});

document.querySelectorAll('.bar').forEach(el => observer.observe(el));
```

**Pitfall:** `transform-origin: bottom` only works if the rect's y + height = baseline. Alternatively, use `d` attribute animation with GSAP.

**Perf Note:** SVG `transform` transitions are GPU-accelerated. Scaling many bars simultaneously is efficient.

---

## 7. Typography / Text Animations

### 7.1 Split-Type / GSAP SplitText

**Split-Type (free, modern):**
```
npm install split-type

import SplitType from 'split-type';

const text = new SplitType('.target-text', {
  types: 'lines, words, chars',
  tagName: 'span'
});

// text.lines — array of line elements
// text.words — array of word elements
// text.chars — array of character elements
```

**GSAP SplitText (paid, GSAP Club):**
```
import { SplitText } from "gsap/SplitText";
gsap.registerPlugin(SplitText);

const split = new SplitText(".target-text", {
  type: "lines,words,chars",
  linesClass: "split-line",
  wordsClass: "split-word",
  charsClass: "split-char"
});

// Revert (cleanup)
split.revert();
```

**Pitfall:** SplitText modifies DOM — splitting lines changes layout. Always revert before re-splitting (e.g., on resize).

**Pitfall:** Google Fonts loaded after SplitText runs causes mis-measured splits. Ensure fonts are loaded before splitting (`document.fonts.ready`).

### 7.2 Letter-by-Letter Reveals

```
<h1 class="reveal-text">Animated Typography</h1>

/* --- CSS (chars wrapped by SplitType) --- */
.reveal-text .char {
  display: inline-block;
  opacity: 0;
  transform: translateY(20px) rotateX(-90deg);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.reveal-text .char.revealed {
  opacity: 1;
  transform: translateY(0) rotateX(0deg);
}

// JS with GSAP + SplitText
const text = new SplitType(".reveal-text", { types: "chars" });

gsap.fromTo(
  text.chars,
  { opacity: 0, y: 40, rotateX: -90 },
  {
    opacity: 1,
    y: 0,
    rotateX: 0,
    duration: 0.4,
    stagger: 0.03,
    ease: "back.out(1.7)",
    scrollTrigger: {
      trigger: ".reveal-text",
      start: "top 85%",
      once: true
    }
  }
);
```

**Pitfall:** Each `.char` is a DOM node. A paragraph with 500 chars creates 500 elements — memory and paint cost. Use only for short headings (< 100 chars).

**Perf Note:** 50–100 chars = fine. 500+ chars = use word-level splitting instead.

### 7.3 Text Scrambling Effects

```
// JS — custom scrambler
class TextScrambler {
  constructor(el, options = {}) {
    this.el = el;
    this.chars = "!<>-_\\/[]{}—=+*^?#________";
    this.phrases = options.phrases || [];
    this.speed = options.speed || 80;    // ms per char update
    this.delay = options.delay || 1000;   // pause between phrases
    this.loop = options.loop ?? true;
    this.phase = 0;
    this.frame = 0;
    this.resolve = null;
    this.update = this.update.bind(this);
  }

  start() {
    const text = this.phrases[this.phase % this.phrases.length];
    const progress = this.frame / text.length;

    // Generate output with scrambled characters
    let output = "";
    for (let i = 0; i < text.length; i++) {
      if (i < this.frame) {
        output += text[i];               // revealed
      } else if (i === this.frame) {
        output += this.randomChar();      // current position
      } else {
        output += this.randomChar();      // future positions
      }
    }
    this.el.textContent = output;

    this.frame++;
    if (this.frame > text.length) {
      this.frame = 0;
      this.phase++;

      if (this.phase >= this.phrases.length && !this.loop) {
        this.el.textContent = text;
        return;
      }
    }

    setTimeout(this.update, this.speed / (1 + progress * 2));
  }

  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

// Usage
const scrambler = new TextScrambler(document.querySelector(".scramble-text"), {
  phrases: ["Design", "Develop", "Deploy"],
  speed: 60,
  delay: 1500,
  loop: true
});
scrambler.start();
```

**Alternative:** Use GSAP TextPlugin:
```
gsap.to(".element", {
  text: {
    value: "New Text",
    speed: 0.5,           // 0.5 chars per second? No, speed in seconds
    delimiter: "",
    padSpace: false,
    oldClass: "old-text",
    newClass: "new-text"
  },
  duration: 2
});
```

### 7.4 Step-by-Step: Word Fade-In

```
<h1 class="word-fade">This is an animated heading</h1>

// JS
const text = new SplitType(".word-fade", { types: "words" });

gsap.from(text.words, {
  opacity: 0,
  y: 20,
  duration: 0.5,
  stagger: 0.08,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".word-fade",
    start: "top 85%",
    once: true
  }
});
```

**Perf Note:** Word-level animation (~10–20 words) adds negligible DOM overhead. Preferred over char-level for paragraphs.

### 7.5 Step-by-Step: Character Stagger

```
<h1 class="char-stagger">Impact</h1>

// JS
const text = new SplitType(".char-stagger", { types: "chars" });

// Sequential — each char enters one after another
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".char-stagger",
    start: "top 85%",
    once: true
  }
});

tl.from(text.chars, {
  opacity: 0,
  y: 60,
  rotation: -15,
  duration: 0.3,
  stagger: 0.04,
  ease: "power3.out"
}, 0)
.from(text.chars, {
  color: "#3b82f6",             // start color
  duration: 0.01,
  stagger: 0.04
}, 0);
```

**Pitfall:** Setting both `from` and `fromTo` for each char — use `gsap.from()` for initial state and `to()` for subsequent animations, or combine into one timeline.

### 7.6 Step-by-Step: Typing Effect

```
<div class="typewriter">
  <span class="typed-text"></span>
  <span class="cursor">|</span>
</div>

// JS — vanilla typing effect
class Typewriter {
  constructor(element, words, speed = 80) {
    this.element = element;
    this.words = words;
    this.speed = speed;
    this.wordIndex = 0;
    this.charIndex = 0;
    this.isDeleting = false;
    this.type();
  }

  type() {
    const current = this.words[this.wordIndex];

    if (this.isDeleting) {
      this.element.textContent = current.substring(0, this.charIndex - 1);
      this.charIndex--;
    } else {
      this.element.textContent = current.substring(0, this.charIndex + 1);
      this.charIndex++;
    }

    let typeSpeed = this.speed;

    if (this.isDeleting) {
      typeSpeed /= 2;       // delete faster
    }

    // If word complete
    if (!this.isDeleting && this.charIndex === current.length) {
      typeSpeed = 1500;     // pause at end
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.wordIndex = (this.wordIndex + 1) % this.words.length;
      typeSpeed = 300;      // pause before next word
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

new Typewriter(
  document.querySelector(".typed-text"),
  ["animated", "interactive", "beautiful"],
  80
);

/* CSS cursor blink */
@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}
.cursor {
  animation: blink 0.8s step-end infinite;
  margin-left: 2px;
}
```

**Pitfall:** Typing effect overwrites innerHTML. Don't use on elements with children or event listeners.

**Pitfall:** For accessibility, the typed text should be announced by screen readers. Use `aria-live="polite"` on the container.

---

## 8. Fluid / Particle / Interactive Animations

### 8.1 Mouse Tracking and Cursor Followers

```
<div class="cursor-follower"></div>

/* CSS */
.cursor-follower {
  position: fixed;
  width: 20px;
  height: 20px;
  background: #3b82f6;
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
  transition: transform 0.1s ease-out;  /* smoothing */
  will-change: transform;
}

.cursor-follower.hover {
  width: 40px;
  height: 40px;
  background: rgba(59, 130, 246, 0.3);
  mix-blend-mode: difference;
}

// JS — cursor tracking
const follower = document.querySelector(".cursor-follower");
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// Smooth following with lerp
function animate() {
  followerX += (mouseX - followerX) * 0.1;   // lerp factor
  followerY += (mouseY - followerY) * 0.1;

  follower.style.transform =
    `translate(${followerX - 10}px, ${followerY - 10}px)`;

  requestAnimationFrame(animate);
}
animate();

// Hover detection on interactive elements
document.querySelectorAll("a, button, .interactive").forEach(el => {
  el.addEventListener("mouseenter", () => follower.classList.add("hover"));
  el.addEventListener("mouseleave", () => follower.classList.remove("hover"));
});
```

**Pitfall:** Lerp factor (0.1) controls smoothness. Too high (0.9) = jittery. Too low (0.01) = laggy. Tune for feel.

**Perf Note:** Custom cursor followers add ~0.1ms frame time. The `mix-blend-mode` can cause paint on the entire viewport — test with `difference` modals.

### 8.2 Particles.js / tsParticles

**tsParticles (modern fork of particles.js):**
```
npm install @tsparticles/react @tsparticles/slim
# or
npm install @tsparticles/engine @tsparticles/slim
```

**React Component:**
```
"use client";
import { Particles } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useCallback } from "react";

export default function ParticleBackground() {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);    // slim = lighter than full
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: { color: "#0a0a1a" },
        fpsLimit: 60,
        particles: {
          number: { value: 80, density: { enable: true } },
          color: { value: ["#3b82f6", "#6366f1", "#8b5cf6"] },
          shape: { type: "circle" },
          opacity: { value: 0.5 },
          size: { value: { min: 1, max: 4 } },
          move: {
            enable: true,
            speed: 1,
            direction: "none",
            random: true,
            straight: false,
            outModes: { default: "bounce" }
          },
          links: {
            enable: true,
            distance: 150,
            color: "#6366f1",
            opacity: 0.2,
            width: 1
          }
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: "grab" },  // or repulse, bubble
            onClick: { enable: true, mode: "push" }
          },
          modes: {
            grab: { distance: 200, links: { opacity: 0.5 } },
            repulse: { distance: 100, duration: 0.4 }
          }
        },
        detectRetina: true
      }}
      style={{ position: "fixed", inset: 0, zIndex: -1 }}
    />
  );
}
```

**tsParticles footprint:**
| Bundle | Size (gzipped) |
|---|---|
| `@tsparticles/engine` | ~25KB |
| + `@tsparticles/slim` | +10KB |
| + `@tsparticles/all` | +80KB (avoid) |

**Pitfall:** tsParticles creates many DOM canvas operations. Setting `particles.number.value` above 200 impacts mobile performance.

### 8.3 Interactive Canvas with Mouse/Touch Input

```
<canvas id="interactive-canvas"></canvas>

const canvas = document.getElementById("interactive-canvas");
const ctx = canvas.getContext("2d");

let width, height;
let mouse = { x: -1000, y: -1000 };
let circles = [];

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

// Create circles
for (let i = 0; i < 50; i++) {
  circles.push({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 2,
    vy: (Math.random() - 0.5) * 2,
    radius: 5 + Math.random() * 20,
    originalRadius: 5 + Math.random() * 20,
    color: `hsl(${Math.random() * 360}, 80%, 60%)`
  });
}

// Mouse/touch tracking
canvas.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

canvas.addEventListener("touchmove", (e) => {
  const touch = e.touches[0];
  mouse.x = touch.clientX;
  mouse.y = touch.clientY;
}, { passive: true });

canvas.addEventListener("mouseleave", () => {
  mouse.x = -1000;
  mouse.y = -1000;
});

// Physics loop
function loop() {
  ctx.clearRect(0, 0, width, height);

  for (const c of circles) {
    // Motion
    c.x += c.vx;
    c.y += c.vy;

    // Boundaries
    if (c.x < 0 || c.x > width)  c.vx *= -1;
    if (c.y < 0 || c.y > height) c.vy *= -1;

    // Mouse interaction — push circles away
    const dx = mouse.x - c.x;
    const dy = mouse.y - c.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 150) {
      const force = (150 - dist) / 150;
      const angle = Math.atan2(dy, dx);
      c.x -= Math.cos(angle) * force * 3;
      c.y -= Math.sin(angle) * force * 3;
      c.radius = c.originalRadius + force * 10;
    } else {
      c.radius += (c.originalRadius - c.radius) * 0.05;
    }

    // Draw
    ctx.beginPath();
    ctx.arc(c.x, c.y, c.radius, 0, Math.PI * 2);
    ctx.fillStyle = c.color;
    ctx.fill();
  }

  requestAnimationFrame(loop);
}
loop();
```

**Pitfall:** Touch events need `{ passive: true }` for scroll performance. Remove `preventDefault()` unless you're building a full-screen canvas app.

**Perf Note:** 50 circles with mouse interaction = ~0.5ms on desktop. 200 circles = ~2ms. At 500+, consider PixiJS for GPU acceleration.

### 8.4 Step-by-Step: Cursor Trail

```
<canvas class="trail-canvas"></canvas>

const canvas = document.querySelector(".trail-canvas");
const ctx = canvas.getContext("2d");
let trail = [];
const MAX_TRAIL = 30;

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

document.addEventListener("mousemove", (e) => {
  trail.push({ x: e.clientX, y: e.clientY, life: 1.0 });
  if (trail.length > MAX_TRAIL) trail.shift();
});

function drawTrail() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < trail.length; i++) {
    const p = trail[i];
    const alpha = (i / trail.length) * 0.8;
    const size = (i / trail.length) * 8 + 2;

    ctx.beginPath();
    ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(99, 102, 241, ${alpha})`;
    ctx.fill();
  }

  requestAnimationFrame(drawTrail);
}
drawTrail();
```

**Pitfall:** `trail.push` every mousemove can create thousands of points during fast movement. Cap the array length.

**Perf Note:** Canvas clear + redraw each frame. For 30 trail points, negligible cost.

### 8.5 Step-by-Step: Physics Simulation

```
const canvas = document.getElementById("physics");
const ctx = canvas.getContext("2d");

let width, height;
function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

// Physics objects
const balls = [];
const NUM_BALLS = 20;
const GRAVITY = 0.5;
const FRICTION = 0.99;
const BOUNCE = 0.7;

for (let i = 0; i < NUM_BALLS; i++) {
  balls.push({
    x: Math.random() * width,
    y: Math.random() * height * 0.5,
    vx: (Math.random() - 0.5) * 8,
    vy: 0,
    radius: 10 + Math.random() * 20,
    color: `hsl(${Math.random() * 360}, 80%, 60%)`
  });
}

function update() {
  for (const b of balls) {
    // Gravity
    b.vy += GRAVITY;

    // Air friction
    b.vx *= FRICTION;

    // Move
    b.x += b.vx;
    b.y += b.vy;

    // Floor collision
    if (b.y + b.radius > height) {
      b.y = height - b.radius;
      b.vy *= -BOUNCE;
      b.vx *= 0.98;       // friction on bounce
    }

    // Wall collision
    if (b.x + b.radius > width) {
      b.x = width - b.radius;
      b.vx *= -BOUNCE;
    }
    if (b.x - b.radius < 0) {
      b.x = b.radius;
      b.vx *= -BOUNCE;
    }

    // Ball-to-ball collision (simplified)
    for (const other of balls) {
      if (other === b) continue;
      const dx = other.x - b.x;
      const dy = other.y - b.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const minDist = b.radius + other.radius;

      if (dist < minDist) {
        const overlap = minDist - dist;
        const angle = Math.atan2(dy, dx);
        b.x -= Math.cos(angle) * overlap * 0.5;
        b.y -= Math.sin(angle) * overlap * 0.5;
        other.x += Math.cos(angle) * overlap * 0.5;
        other.y += Math.sin(angle) * overlap * 0.5;
      }
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, width, height);
  for (const b of balls) {
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
    ctx.fillStyle = b.color;
    ctx.fill();

    // Shadow effect
    ctx.beginPath();
    ctx.arc(b.x + 2, b.y + 2, b.radius, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(0,0,0,0.15)";
    ctx.fill();
  }
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}
loop();
```

**Pitfall:** Nested ball-to-ball collision is O(n²). 20 balls = 400 checks (fine). 200 balls = 40,000 checks (slows down). Use spatial hashing for >100 objects.

**Perf Note:** Physics simulations run on CPU. 20 balls = ~0.5ms. 200 balls = ~15ms — may drop frames.

---

## 9. Lottie / Vector Animations

### 9.1 Creating/Exporting Lottie from After Effects

**Workflow:**
1. Design animation in After Effects
2. Install **Bodymovin** extension (free, from aescripts.com)
3. In AE: Window → Extensions → Bodymovin
4. Select composition, adjust settings:
   - **Expressions:** Compatible only if simple (no complex expression scripts)
   - **Glyphs:** "Send text as glyphs" for font rendering
   - **Images:** Embed or separate
5. Render → JSON file + images folder

**Limitations:**
- No 3D layers
- No layer effects (drop shadow, glow, etc.)
- No time remapping on precomps
- Limited expressions support
- Masks and mattes increase file size significantly
- Avoid layer parenting chains deeper than 10 levels

**Lottie optimization tips:**
- Export at 30fps (not 60fps) — smooth enough, half the frames
- Remove unused layers and keyframes
- Use shape layers instead of AI/PSD files
- Limit masking — prefer alpha mattes
- Convert text to shapes if animating characters
- Use dotLottie format (.lottie extension) — compresses ~80% smaller

**File Size Budget:**
| Complexity | Frames | File Size |
|---|---|---|
| Simple icon (5 layers, 30fps, 1s) | 30 | 2–10KB |
| Medium illustration (15 layers, 30fps, 3s) | 90 | 15–50KB |
| Complex scene (40 layers, 60fps, 5s) | 300 | 100–500KB |
| Full character rig (80 layers, 30fps) | — | 500KB–2MB |

### 9.2 Lottie Players

**lottie-web (vanilla JS):**
```
npm install lottie-web

import lottie from "lottie-web";

const animation = lottie.loadAnimation({
  container: document.getElementById("lottie-container"),
  renderer: "svg",               // svg (default), canvas, html
  loop: true,
  autoplay: true,
  path: "/animations/hero.json"  // URL or data object
});

// Control
animation.play();
animation.pause();
animation.stop();
animation.goToAndStop(30, true);  // frame number, isFrame=true
animation.setSpeed(1.5);
animation.setDirection(-1);        // reverse

// Events
animation.addEventListener("complete", () => {});
animation.addEventListener("loopComplete", () => {});
animation.addEventListener("enterFrame", () => {});

// Destroy (cleanup)
animation.destroy();
```

**lottie-react:**
```
npm install lottie-react

"use client";
import Lottie from "lottie-react";
import heroAnimation from "@/animations/hero.json";

export default function HeroLottie() {
  return (
    <Lottie
      animationData={heroAnimation}
      loop={true}
      autoplay={true}
      style={{ width: 400, height: 400 }}
      rendererSettings={{
        preserveAspectRatio: "xMidYMid slice"
      }}
    />
  );
}
```

**dotLottie-react (smaller, modern):**
```
npm install @lottiefiles/dotlottie-react

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

<DotLottieReact
  src="/animations/hero.lottie"
  loop
  autoplay
  style={{ width: 400, height: 400 }}
/>
```

### 9.3 Performance Considerations

| Renderer | Pros | Cons | Use Case |
|---|---|---|---|
| SVG | Sharp, interactive, accessible | Many DOM nodes, slower with 200+ layers | Simple-to-medium animations |
| Canvas | GPU-accelerated, handles 500+ layers | No DOM interaction, no SVG CSS modifiers | Complex, layer-heavy animations |
| HTML | Better for text and rich UI | Rarely used for Lottie | Text-heavy animations |

**Performance Rules:**
- SVG renderer creates ~1 DOM node per layer. 200 layers = 200 DOM nodes = paint overhead.
- Canvas renderer: single canvas element, draws all layers. Better for complex animations.
- On mobile: SVG renderer for <100 layers, Canvas for >100 layers.
- lottie-web v5.x uses `requestAnimationFrame` — respects tab visibility.

### 9.4 Step-by-Step: Embed Lottie

```
<!-- Vanilla JS CDN -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js"></script>

<div id="lottie-player" style="width: 300px; height: 300px;"></div>

<script>
const anim = lottie.loadAnimation({
  container: document.getElementById("lottie-player"),
  renderer: "svg",
  loop: true,
  autoplay: true,
  path: "/animations/loading.json"
});
</script>
```

**React with Next.js:**
```
// components/LottiePlayer.tsx
"use client";
import { useEffect, useRef } from "react";
import lottie from "lottie-web";

interface Props {
  src: string;
  loop?: boolean;
  autoplay?: boolean;
  style?: React.CSSProperties;
}

export default function LottiePlayer({ src, loop = true, autoplay = true, style }: Props) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;

    const anim = lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop,
      autoplay,
      path: src            // URL or import
    });

    return () => anim.destroy();   // cleanup on unmount
  }, [src, loop, autoplay]);

  return <div ref={container} style={style} />;
}

// Usage
import LottiePlayer from "@/components/LottiePlayer";

<LottiePlayer src="/animations/hero.json" style={{ width: 400, height: 400 }} />
```

**Pitfall:** lottie-web is ~200KB (50KB gzipped). Dynamic import to avoid loading on every page:
```
const LottiePlayer = dynamic(() => import("@/components/LottiePlayer"), { ssr: false });
```

### 9.5 Step-by-Step: Interactive Lottie

**Seek animation based on scroll position:**
```
const anim = lottie.loadAnimation({
  container: document.getElementById("scroll-lottie"),
  renderer: "canvas",
  loop: false,
  autoplay: false,
  path: "/animations/scroll-story.json"
});

const totalFrames = anim.totalFrames;
const scrollSection = document.querySelector(".scroll-section");

ScrollTrigger.create({
  trigger: scrollSection,
  start: "top top",
  end: "bottom bottom",
  scrub: 1,
  onUpdate: (self) => {
    const progress = self.progress;
    anim.goToAndStop(progress * totalFrames, true);
  }
});
```

**Click/hover interaction:**
```
anim.addEventListener("DOMLoaded", () => {
  anim.goToAndStop(0, true);    // start at frame 0, paused
  anim.setSpeed(2);             // play faster on interaction
});

document.getElementById("lottie-container").addEventListener("click", () => {
  anim.playSegments([0, 60], true);  // play frames 0–60
});
```

### 9.6 Step-by-Step: Animated Icons

**Lottie icon workflow:**
```
// Preload icon animations
const iconAnimations = {};
const icons = ["search", "menu", "close", "bell", "settings"];

icons.forEach(name => {
  iconAnimations[name] = lottie.loadAnimation({
    container: document.getElementById(`icon-${name}`),
    renderer: "svg",
    loop: false,
    autoplay: false,
    path: `/icons/${name}.json`
  });
});

// Play on hover
document.querySelectorAll(".icon-wrapper").forEach(wrapper => {
  wrapper.addEventListener("mouseenter", () => {
    const name = wrapper.dataset.icon;
    iconAnimations[name]?.play();
  });

  wrapper.addEventListener("mouseleave", () => {
    const name = wrapper.dataset.icon;
    iconAnimations[name]?.goToAndStop(0, true);
  });
});

// Destroy on page leave
window.addEventListener("beforeunload", () => {
  Object.values(iconAnimations).forEach(anim => anim.destroy());
});
```

**File Size:** Each icon animation: 2–15KB JSON. 5 icons = ~50KB total. Acceptable.

---

## 10. Full Production Pipeline

### 10.1 Project Setup (Vite / Next.js)

**Vite (Vanilla JS/TS, best for landing pages):**
```
npm create vite@latest my-site -- --template vanilla-ts
# or with React
npm create vite@latest my-site -- --template react-ts
```

**Key vite.config.ts for animated sites:**
```
import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    visualizer({ open: true })   // bundle analysis
  ],
  build: {
    target: "es2015",
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        manualChunks: {
          gsap: ["gsap", "gsap/ScrollTrigger"],
          three: ["three"],
          lottie: ["lottie-web"]
        }
      }
    }
  }
});
```

**Next.js (Full framework, SSR, complex apps):**
```
npx create-next-app@latest my-site --typescript --app
```

**next.config.js optimizations:**
```
/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],
  experimental: {
    optimizePackageImports: [
      "gsap",
      "framer-motion",
      "lottie-react"
    ]
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 1080, 1920],
    minimumCacheTTL: 60 * 60 * 24 * 30  // 30 days
  }
};
```

### 10.2 Build Tooling

**Code Splitting Strategies:**

| Library | Chunk Name | Size (gzipped) | Load Strategy |
|---|---|---|---|
| GSAP | `gsap` | ~25KB | Eager (critical) |
| ScrollTrigger | `gsap` (bundled) | included above | Eager if scroll animated |
| Three.js | `three` | ~150KB | Lazy (dynamic import) |
| lottie-web | `lottie` | ~50KB | Lazy (on interaction) |
| Framer Motion | `framer-motion` | ~30KB | Lazy (page transition pages) |
| tsParticles | `particles` | ~35KB | Lazy (below fold) |
| PixiJS | `pixi` | ~100KB | Lazy (on demand) |

**Dynamic Import Patterns:**
```
// React — Vite
const Scene3D = lazy(() => import("./Scene3D"));

// Next.js
const Scene3D = dynamic(() => import("@/components/Scene3D"), {
  ssr: false,
  loading: () => <Skeleton />
});

// Vanilla JS — dynamic import
const loadGSAP = () => import("gsap");
const loadThree = () => import("three");

button.addEventListener("click", async () => {
  const { gsap } = await loadGSAP();
  // use gsap
});
```

### 10.3 Performance Budgeting

**Target budgets for animation-heavy sites:**

| Metric | Target | Warning |
|---|---|---|
| Total JS (gzipped) | < 200KB | > 400KB |
| Total CSS (gzipped) | < 50KB | > 100KB |
| First Contentful Paint (FCP) | < 1.5s | > 3s |
| Largest Contentful Paint (LCP) | < 2.5s | > 4s |
| Time to Interactive (TTI) | < 3s | > 5s |
| Total Blocking Time (TBT) | < 200ms | > 500ms |
| Cumulative Layout Shift (CLS) | < 0.1 | > 0.25 |
| Frame Rate (animations) | 60fps | < 30fps |

**Animation-specific budgets:**
| Genre | Budget (gzipped) | Notes |
|---|---|---|
| CSS-only animations | 0KB JS | Pure CSS, zero JS cost |
| GSAP scrollytelling | ~30KB JS + 0KB CSS | GSAP + ScrollTrigger |
| 3D (Three.js) | ~200KB JS | Dynamic import, lazy load |
| Particles (tsParticles) | ~40KB JS | Use `slim` not `all` |
| Lottie animations | ~50KB JS + N*JSON | Each JSON = 2–200KB |
| PixiJS games | ~150KB JS | Lazy load |
| Framer Motion pages | ~35KB JS | Route-level code split |

### 10.4 Lighthouse Optimization Checklist

**For animated sites specifically:**

1. **CSS Containment**
```
.animated-section {
  contain: layout style paint;    /* isolate repaint */
}
```

2. **content-visibility (lazy render offscreen)**
```
.offscreen-section {
  content-visibility: auto;
  contain-intrinsic-size: 500px;  /* prevent CLS */
}
```

3. **Will-change Sparingly**
```
.parallax-layer {
  will-change: transform;         /* promote to GPU */
}
/* Remove after animation:
   .parallax-layer.inactive { will-change: auto; }
*/
```

4. **GPU Layer Promotion Pitfalls**
   - Too many `will-change` elements = layer explosion, GPU memory pressure
   - Each promoted layer uses ~2–4MB GPU memory
   - Budget: 10–20 promoted layers per page

5. **Intersection Observer for Lazy Initialization**
```
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      initAnimation(entry.target);    // start GSAP / Three / etc.
      observer.unobserve(entry.target);  // stop observing
    }
  });
}, { rootMargin: "200px" });  // 200px before viewport

document.querySelectorAll("[data-animate]").forEach(el => observer.observe(el));
```

6. **Prefetch Critical Animations**
```
<link rel="preload" href="/animations/hero.json" as="fetch" crossorigin />
<link rel="preload" href="/scripts/gsap.min.js" as="script" />
```

7. **Avoid layout thrash:**
```
// BAD — causes layout thrash (read-write-read-write)
for (const el of elements) {
  const w = el.offsetWidth;      // read
  el.style.width = w * 2 + "px"; // write
}

// GOOD — batch reads, then batch writes
const widths = elements.map(el => el.offsetWidth);  // read all
elements.forEach((el, i) => {
  el.style.width = widths[i] * 2 + "px";            // write all
});
```

### 10.5 Accessibility

**prefers-reduced-motion:**
```
/* CSS — disable non-essential motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

  .parallax-layer {
    transform: none !important;
  }

  .particle-canvas {
    display: none;
  }
}
```

**JS — respect reduced motion:**
```
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (prefersReducedMotion) {
  gsap.globalTimeline.timeScale(100);   // complete instantly
  // OR: skip all animated initialization
  return;
}
```

**GSAP-specific reduced motion:**
```
const mm = gsap.matchMedia();
mm.add("(prefers-reduced-motion)", () => {
  // No motion version
  gsap.set(".reveal", { opacity: 1, y: 0 });
});
mm.add("(prefers-reduced-motion: no-preference)", () => {
  // Full motion version
});
```

**Focus Management:**
```
// After page transition, focus first heading
function handleTransition() {
  const heading = document.querySelector("h1");
  if (heading) {
    heading.setAttribute("tabindex", "-1");
    heading.focus();
  }
}

// Trap focus in animated modals
function trapFocus(container) {
  const focusable = container.querySelectorAll(
    'a[href], button, input, [tabindex]:not([tabindex="-1"])'
  );
  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  container.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
}
```

**ARIA for animated content:**
```
<!-- Auto-playing Lottie (decorative) -->
<lottie-player aria-hidden="true" role="presentation" />

<!-- Important animated content -->
<div role="img" aria-label="Animation showing download progress">
  <lottie-player />
</div>

<!-- Non-decorative animation with text equivalent -->
<div aria-live="polite" class="sr-only">
  Status: 75% complete
</div>
```

### 10.6 SEO for Animated Sites

1. **Avoid content hidden behind animations.** Search engines may not trigger JS interactions.

2. **Semantic HTML first:**
```
<!-- BAD: content loaded by JS animation -->
<div id="animated-content"></div>

<!-- GOOD: content in HTML, animated with opacity/fade -->
<div class="fade-in">
  <h1>Visible to crawlers</h1>
</div>
```

3. **Server-side render critical content.** If using Three.js for hero, add a static fallback image in `<noscript>`:
```
<noscript>
  <img src="/hero-static.jpg" alt="Hero section title and description" />
</noscript>
```

4. **Lazy loading for non-critical animation libraries:**
```
<script type="module">
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const { default: gsap } = await import("gsap");
    const { ScrollTrigger } = await import("gsap/ScrollTrigger");
    gsap.registerPlugin(ScrollTrigger);
    initScrollAnimations();
  }
</script>
```

5. **Structured data remains stable** regardless of animations. Ensure JSON-LD is server-rendered.

6. **Crawl budget:** Pages with heavy JS bundles (>500KB) may be partially indexed by search engines. Prioritize critical CSS and content above animation libraries.

7. **Font loading:** Animated text (SplitType, GSAP) depends on loaded fonts. Use `font-display: swap` to prevent invisible text:
```
@font-face {
  font-family: "Inter";
  font-display: swap;   /* text visible immediately with fallback */
  src: url("/fonts/inter.woff2") format("woff2");
}
```

---

## Appendix: Library File Size Reference

| Library | Min | Gzipped | Notes |
|---|---|---|---|
| `gsap` (core) | 80KB | 25KB | Most performant animation lib |
| `gsap` + ScrollTrigger | 120KB | 35KB | Required for scroll animations |
| `gsap` + all plugins | 400KB | 110KB | Avoid — import per-plugin |
| `framer-motion` | 120KB | 30KB | React only, 60fps guaranteed |
| `three.js` | 600KB | 150KB | Full 3D library |
| `@react-three/fiber` | 50KB | 15KB | Thin R3F wrapper over Three |
| `@react-three/drei` | 100KB | 25KB | Helpers (Orbit, Environment...) |
| `pixi.js` | 400KB | 100KB | 2D WebGL renderer |
| `lottie-web` | 200KB | 50KB | SVG/Canvas renderer |
| `lottie-react` | 5KB | 2KB | Thin React wrapper |
| `@tsparticles/slim` | 80KB | 35KB | Prefer `slim` over `all` |
| `@tsparticles/all` | 300KB | 80KB | Too heavy — use slim |
| `paper.js` | 200KB | 50KB | Vector graphics lib |
| `split-type` | 10KB | 3KB | Lightweight text splitter |
| `barba.js` | 30KB | 7KB | Page transitions |
| `swup` | 25KB | 6KB | Page transitions (lighter) |
| `@barba/core` | 20KB | 5KB | Core only |

---

## Appendix: Browser Support Quick Reference

| Feature | Chrome | Safari | Firefox | Edge |
|---|---|---|---|---|
| CSS Transforms & Animations | All | All | All | All |
| ScrollTrigger (GSAP) | All | All | All | All |
| View Transitions API | 111+ | 18+ | 125+ | 111+ |
| WebGL 2.0 | 73+ | 16+ | 113+ | 79+ |
| WebGPU | 113+ | — | — | 113+ |
| Canvas 2D | All | All | All | All |
| SVG SMIL | All | All | All | All |
| Lottie (lottie-web) | 50+ | 10+ | 50+ | 79+ |
| prefers-reduced-motion | 74+ | 10.1+ | 63+ | 79+ |
| CSS `path()` in `d` | 114+ | 17.4+ | 117+ | 114+ |
| content-visibility | 85+ | 17.4+ | 107+ | 85+ |
| Intersection Observer | 51+ | 12.1+ | 55+ | 15+ |

---

## Appendix: Decision Tree — Which Animation Library?

```
Is the animation simple (hover, loader, menu)?
  YES → CSS only (no library needed)
  NO  → Is it scroll-linked?
          YES → GSAP + ScrollTrigger
          NO  → Is it a page transition?
                  YES → View Transitions API (modern) or Barba/Swup
                  NO  → Is it 3D?
                          YES → Three.js / React Three Fiber
                          NO  → Is it SVG path animation?
                                  YES → GSAP + MorphSVG or CSS stroke-dash
                                  NO  → Is it text animation?
                                          YES → SplitType + GSAP
                                          NO  → Is it particles/physics?
                                                  YES → tsParticles or Canvas 2D
                                                  NO  → Is it Lottie/vector?
                                                          YES → lottie-web
                                                          NO  → GSAP (general purpose)
```

---

*End of Full Creation Guide. This document covers all 10 major animation genres with production-ready patterns, performance budgets, accessibility requirements, and SEO best practices.*
