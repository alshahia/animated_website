# ANIMATED WEBSITE CREATION GUIDE

**A complete manual for humans and AI agents/LLMs to create professional animated websites**

*Version 1.0 | July 2026*

---

## Table of Contents

- [Part 1: Understanding Animated Websites](#part-1-understanding-animated-websites)
- [Part 2: Types and Complexity Levels](#part-2-types-and-complexity-levels)
- [Part 3: Tools and Technologies Stack](#part-3-tools-and-technologies-stack)
- [Part 4: Step-by-Step Creation Process](#part-4-step-by-step-creation-process)
- [Part 5: Code Templates](#part-5-code-templates)
- [Part 6: Quick Reference](#part-6-quick-reference)

---

# Part 1: Understanding Animated Websites

## 1.1 What is an Animated Website

An animated website is a web page that uses motion, moving graphics, and transitions built with code like CSS or JavaScript. Key features include scrolling effects, hover animations, and loading screens.

Unlike static websites where content remains fixed, animated websites use motion to:
- Guide user attention
- Provide visual feedback
- Create engaging experiences
- Express brand personality

### Core Animation Categories

| Category | Description | Examples |
|----------|-------------|----------|
| **Scroll-driven effects** | Elements move, fade in, or transform as the user scrolls | Parallax, reveal animations, sticky sections |
| **Hover reactions** | Buttons or images change size/color when mouse rests on them | Button transforms, card tilts, cursor followers |
| **Loading transitions** | Intro screens or fading logos while main content loads | Preloaders, skeleton screens, curtain reveals |
| **Accent highlights** | Subtle movements drawing eye to important elements | Glowing CTAs, focus states, typing animations |

## 1.2 Why Use Animations

### Guide Attention
Directs the visitor's eye to important text or call-to-action buttons.

### Confirm Actions
Shows instant visual response when a user clicks a link or submits a form.

### Show Brand Personality
Gives the site a unique and memorable feel instead of looking like a flat, static document.

### Improve User Experience
- Makes interactions feel more tactile and responsive
- Provides context for spatial relationships
- Creates visual hierarchy through motion

### Motion Design Principles

1. **Stagger** — Sequential reveals feel more organized
2. **Easing** — Never linear; use curves for natural feel
3. **Hierarchy** — Animate important elements first
4. **Consistency** — Use same easing curves throughout
5. **Reversibility** — Exit animations should mirror entry

## 1.3 When to Use Animations

### DO Use Animations For:
- Page load sequences (hero animations)
- Scroll-triggered content reveals
- Hover/focus states on interactive elements
- Form feedback (submission states)
- Page transitions
- Loading indicators
- Microinteractions (buttons, toggles)

### DON'T Use Animations For:
- Essential information that users need immediately
- Complex data tables or dense content
- Accessibility-critical interfaces
- Low-bandwidth situations (unless optimized)

### Duration Guidelines

| Animation Type | Duration |
|----------------|----------|
| Micro-interactions (button hover) | 100-200ms |
| UI state transitions | 200-300ms |
| Page element reveals | 300-500ms |
| Large component transitions | 400-700ms |
| Page transitions | 300-500ms |

---

# Part 2: Types and Complexity Levels

## Level 1: Native CSS3 (The Foundation)

**Best for:** UI states, button glows, menu slide-outs, simple endless loops

**Tools:** Native CSS, CSS Transitions, CSS Animations, @keyframes

**Key Properties:**
- `transition`
- `transform` (scale, translate, rotate)
- `opacity`
- `@keyframes`
- `animation`
- `will-change`

**When to use:** Hover states, microinteractions, lightweight loading spinners

### Example: Hardware-Accelerated Hover Effect

```css
.hover-card {
  transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1),
              opacity 0.2s ease;
  will-change: transform, opacity;
}

.hover-card:hover {
  transform: scale(1.05);
}
```

### Example: Keyframe Animation

```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in-up {
  animation: fadeInUp 0.8s cubic-bezier(0.25, 1, 0.5, 1) forwards;
}
```

---

## Level 2: GSAP & Framer Motion (The Production Engines)

When animations rely on user scrolling, math formulas, or precise sequencing, native CSS breaks down. You need JavaScript engines to orchestrate the chaos.

### GSAP (GreenSock)

**The undisputed industry standard.** It can:
- Animate thousands of objects simultaneously
- Handle scroll-driven timelines flawlessly
- Fix browser compatibility bugs automatically

**Plugins:**
- ScrollTrigger — Scroll-linked animations
- ScrollSmoother — Smooth scrolling
- SplitText — Text splitting for animations
- Draggable — Drag interactions
- MotionPath — Path animations

### Framer Motion

**The go-to tool for React/Next.js projects.** It turns complex layout transitions into simple, declarative components.

**Best for:**
- Layout animations
- Shared element transitions
- Gesture handling
- Variants system
- AnimatePresence

### Example: GSAP Timeline

```javascript
const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });

tl.from(".hero-title", {
  opacity: 0,
  y: 50,
  stagger: 0.2
})
.from(".hero-subtitle", {
  opacity: 0,
  y: 30
}, "-=0.8")
.from(".cta-button", {
  opacity: 0,
  scale: 0.8
}, "-=0.5");
```

### Example: GSAP ScrollTrigger

```javascript
gsap.registerPlugin(ScrollTrigger);

gsap.to(".card", {
  opacity: 1,
  y: 0,
  duration: 1,
  stagger: 0.2,
  scrollTrigger: {
    trigger: ".grid-container",
    start: "top 80%"
  }
});
```

---

## Level 3: Three.js & PixiJS (The High-End 3D Visuals)

For immersive sites that look like video games or abstract digital art installations. They tap into the user's computer graphics card (GPU) via WebGL.

### Three.js

Simplifies creating 3D cameras, lights, textures, and geometry right inside an HTML `<canvas>` tag.

**Best for:**
- 3D product viewers
- Immersive experiences
- Particle systems
- Real-time rendering

### PixiJS

A blazing-fast 2D engine perfect for handling tens of thousands of moving particles or complex digital collage layouts.

**Best for:**
- High-performance 2D
- Particle systems
- Digital signage
- Game-like interfaces

### Example: Three.js Scene

```javascript
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

function AnimatedMesh() {
  const meshRef = useRef();

  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * 0.5;
    meshRef.current.rotation.y += delta * 0.2;
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#ff0055" wireframe />
    </mesh>
  );
}
```

### Next.js + Three.js Pattern

For React/Next.js projects, use dynamic imports to prevent SSR issues:

```javascript
import dynamic from 'next/dynamic';

const SceneNoSSR = dynamic(() => import('./Scene'), {
  ssr: false,
  loading: () => <div>Loading 3D...</div>
});
```

---

# Part 3: Tools and Technologies Stack

## Animation Libraries

| Library | URL | Free/Paid | Best For |
|---------|-----|-----------|----------|
| **GSAP** | https://gsap.com | Free + Paid plugins | Complex timelines, ScrollTrigger |
| **Framer Motion** | https://www.framer.com/motion/ | Free | React animations |
| **Anime.js** | https://animejs.com | Free | Lightweight animations |
| **Animate.css** | https://animate.style | Free | Drop-in CSS animations |
| **Motion** | https://motion.dev | Free | Web Animations API wrapper |
| **React Spring** | https://www.react-spring.io | Free | Physics-based React animations |
| **Mo.js** | https://mojs.github.io | Free | Motion graphics |
| **ScrollReveal** | https://scrollrevealjs.org | Free | Scroll-triggered reveals |

## 3D Frameworks

| Framework | URL | Best For |
|-----------|-----|----------|
| **Three.js** | https://threejs.org | 3D WebGL experiences |
| **React Three Fiber** | https://docs.pmnd.rs/react-three-fiber | React 3D apps |
| **PixiJS** | https://pixijs.com | High-performance 2D |
| **Babylon.js** | https://www.babylonjs.com | Games, simulations |
| **A-Frame** | https://aframe.io | WebVR experiences |
| **PlayCanvas** | https://playcanvas.com | Collaborative game engine |
| **Spline** | https://spline.design | Real-time 3D design tool |

## Smooth Scroll Libraries

| Library | URL | Best For |
|---------|-----|----------|
| **Lenis** | https://lenis.studiofmt.com | Smooth inertia scrolling |
| **Locomotive Scroll** | https://locomotivemtl.github.io/locomotive-scroll | Smooth + viewport detection |
| **Smooth Scrollbar** | https://idiotwu.github.io/smooth-scrollbar | Custom scrollbars |

## CSS Frameworks

| Framework | URL | Best For |
|-----------|-----|----------|
| **Tailwind CSS** | https://tailwindcss.com | Utility-first styling |
| **Aceternity UI** | https://aceternity.com | Animated React components |
| **shadcn/ui** | https://ui.shadcn.com | Accessible React components |
| **UIverse** | https://uiverse.io | Open-source CSS components |

## Image Optimization Tools

| Tool | URL | Purpose |
|------|-----|---------|
| **Squoosh** | https://squoosh.app | Browser-based compression |
| **CloudConvert** | https://cloudconvert.com | Format conversion |
| **TinyPNG** | https://tinypng.com | PNG/JPEG compression |
| **Sharp** | https://sharp.pixelplumbing.com | Node.js image processing |

## Code Minification Tools

| Tool | URL | Purpose |
|------|-----|---------|
| **Terser** | https://terser.org | JavaScript minification |
| **CSSNano** | https://cssnano.co | CSS minification |
| **HTMLMinifier** | https://kangax.github.io/html-minifier | HTML minification |

## Hosting Platforms

| Platform | URL | Free Tier |
|----------|-----|-----------|
| **GitHub Pages** | https://pages.github.com | Yes |
| **Vercel** | https://vercel.com | Yes (Hobby) |
| **Netlify** | https://netlify.com | Yes (Starter) |
| **Cloudflare Pages** | https://pages.cloudflare.com | Yes |
| **Surge** | https://surge.sh | Yes (limited) |

---

# Part 4: Step-by-Step Creation Process

## Phase 1: Setup and Foundation

### 1.1 Clean Semantic HTML Structure

Build a structured skeleton using standard semantic tags. Keep animation code separate from content.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Animated Website</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>

  <header class="hero-section">
    <h1 class="animate-text">Crafting Motion</h1>
    <p class="animate-subtitle">Experience fluid animations</p>
    <button class="animate-button">Explore Work</button>
  </header>

  <section class="features">
    <h2 class="section-title animate-title">Our Features</h2>
    <div class="feature-grid">
      <article class="feature-card animate-card">...</article>
      <article class="feature-card animate-card">...</article>
      <article class="feature-card animate-card">...</article>
    </div>
  </section>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
  <script src="main.js"></script>
</body>
</html>
```

### 1.2 Base CSS and Hardware Acceleration Setup

```css
/* Hardware-accelerated base styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #0d0d0d;
  color: #ffffff;
  overflow-x: hidden;
}

/* Enable hardware acceleration for animated elements */
.hw-accelerate {
  transform: translateZ(0);
  backface-visibility: hidden;
  will-change: transform, opacity;
}

/* Smooth, hardware-accelerated hover effect */
.animate-button {
  padding: 12px 24px;
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1),
              background-color 0.3s;
  will-change: transform;
}

.animate-button:hover {
  transform: scale(1.05);
  background-color: #333;
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    transform: none !important;
  }
}
```

### 1.3 Browser Dev Tools Setup

**Chrome DevTools Animation Inspection:**

1. Open DevTools (F12)
2. Go to **Performance** tab
3. Record interactions to analyze frame rates
4. Use **Layers** panel to see composited layers

**Key checks:**
- Ensure animations run on compositor thread only
- Verify no layout thrashing occurs
- Monitor FPS during animations

---

## Phase 2: CSS Animation Implementation

### 2.1 Hover Effects

```css
/* Button with gradient glow on hover */
.cta-button {
  position: relative;
  padding: 14px 32px;
  background: #000;
  color: #fff;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1),
              box-shadow 0.3s ease;
  will-change: transform;
}

.cta-button::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 50px;
  background: linear-gradient(135deg, #ff0055, #00ffcc);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
}

.cta-button:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 40px rgba(255, 0, 85, 0.3);
}

.cta-button:hover::before {
  opacity: 1;
}
```

### 2.2 Transitions

```css
/* Card with smooth transition */
.transition-card {
  padding: 2rem;
  background: #161616;
  border: 1px solid #262626;
  border-radius: 16px;
  transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1),
              border-color 0.3s ease,
              box-shadow 0.3s ease;
  will-change: transform;
}

.transition-card:hover {
  transform: translateY(-8px);
  border-color: #ff0055;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
}
```

### 2.3 Keyframe Animations

```css
/* Infinite loading spinner */
@keyframes spin {
  to { transform: rotate(360deg); }
}

.spinner {
  width: 50px;
  height: 50px;
  border: 3px solid rgba(255, 0, 85, 0.1);
  border-radius: 50%;
  border-top-color: #ff0055;
  animation: spin 1s cubic-bezier(0.42, 0, 0.58, 1) infinite;
}

/* Pulsing glow effect */
@keyframes pulseGlow {
  0%, 100% {
    box-shadow: 0 0 20px rgba(255, 0, 85, 0.3);
  }
  50% {
    box-shadow: 0 0 40px rgba(255, 0, 85, 0.6);
  }
}

.glowing-element {
  animation: pulseGlow 2s ease-in-out infinite;
}

/* Staggered fade-in animation */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in-up {
  animation: fadeInUp 0.8s cubic-bezier(0.25, 1, 0.5, 1) forwards;
  opacity: 0;
}

.fade-in-up:nth-child(1) { animation-delay: 0ms; }
.fade-in-up:nth-child(2) { animation-delay: 100ms; }
.fade-in-up:nth-child(3) { animation-delay: 200ms; }
```

### 2.4 Microinteractions

```css
/* Ripple effect on click */
.ripple {
  position: relative;
  overflow: hidden;
}

.ripple::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
  transform: scale(0);
  opacity: 1;
}

.ripple:active::after {
  transform: scale(2);
  opacity: 0;
  transition: transform 0.5s, opacity 0.5s;
}

/* Magnetic button effect - hover state */
.magnetic-btn {
  transition: transform 0.2s cubic-bezier(0.25, 1, 0.5, 1);
  will-change: transform;
}
```

---

## Phase 3: JavaScript Animation (GSAP)

### 3.1 Timeline Creation

```javascript
// Create a timeline that executes sequentially
const heroTl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });

heroTl
  .from(".hero-title", {
    opacity: 0,
    y: 50,
    duration: 1.2
  })
  .from(".hero-subtitle", {
    opacity: 0,
    y: 30,
    duration: 0.8
  }, "-=0.6")
  .from(".cta-button", {
    opacity: 0,
    scale: 0.8,
    duration: 0.6
  }, "-=0.4");
```

**Timeline positioning syntax:**
- `0.5` — absolute time
- `"-=0.5"` — 0.5 seconds before previous animation ends
- `"+=0.5"` — 0.5 seconds after previous animation ends
- `"-=0.5"` on `.to()` — starts before previous `.to()` ends

### 3.2 ScrollTrigger Setup

```javascript
// Register the scroll plugin
gsap.registerPlugin(ScrollTrigger);

// Simple scroll-triggered fade-in
gsap.to(".section-title", {
  opacity: 1,
  y: 0,
  duration: 1,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".features-section",
    start: "top 75%",
    toggleActions: "play reverse play reverse"
  }
});

// Staggered reveal for cards
gsap.to(".feature-card", {
  opacity: 1,
  y: 0,
  duration: 0.8,
  stagger: 0.2,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".feature-grid",
    start: "top 80%"
  }
});
```

### 3.3 Stagger Effects

```javascript
// Stagger with grid auto-detection
gsap.to(".card", {
  opacity: 1,
  y: 0,
  duration: 0.8,
  stagger: {
    amount: 0.6,
    grid: "auto",
    from: "start"
  },
  ease: "power2.out"
});

// Manual stagger with index
gsap.from(".nav-item", {
  opacity: 0,
  y: -20,
  duration: 0.5,
  stagger: 0.1,
  ease: "power2.out"
});
```

### 3.4 Responsive matchMedia

```javascript
// Create a GSAP media query listener
let mm = gsap.matchMedia();

// Desktop: full animations
mm.add("(min-width: 769px)", () => {

  // Custom cursor tracking
  const moveCursor = (e) => {
    gsap.to(cursor, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.3,
      ease: "power2.out"
    });
  };
  window.addEventListener('mousemove', moveCursor);

  // 3D tilt effect
  items.forEach(item => {
    item.addEventListener('mousemove', handleTilt);
    item.addEventListener('mouseleave', handleTiltReset);
  });

  // Cleanup function when breakpoint changes
  return () => {
    window.removeEventListener('mousemove', moveCursor);
    items.forEach(item => {
      item.removeEventListener('mousemove', handleTilt);
      item.removeEventListener('mouseleave', handleTiltReset);
    });
  };
});

// Mobile: simplified animations
mm.add("(max-width: 768px)", () => {
  gsap.set(cursor, { display: "none" });

  // Simple tap feedback
  items.forEach(item => {
    item.addEventListener('click', () => {
      gsap.fromTo(item,
        { borderColor: "#ff0055" },
        { borderColor: "#222", duration: 0.6 }
      );
    });
  });
});
```

---

## Phase 4: Advanced Effects

### 4.1 3D Canvas Integration

For Next.js with Three.js:

```javascript
// components/Scene.js
'use client';
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

function AnimatedMesh() {
  const meshRef = useRef();

  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * 0.5;
    meshRef.current.rotation.y += delta * 0.2;
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#ff0055" wireframe />
    </mesh>
  );
}

export default function Scene() {
  return (
    <div className="w-full h-screen">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <AnimatedMesh />
      </Canvas>
    </div>
  );
}
```

```javascript
// pages/portfolio.js
import dynamic from 'next/dynamic';

const SceneNoSSR = dynamic(() => import('../components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen flex items-center justify-center">
      Loading 3D Scene...
    </div>
  )
});

export default function Portfolio() {
  return (
    <main>
      <div className="fixed inset-0 z-0">
        <SceneNoSSR />
      </div>
      <section className="relative z-10">
        <h1>Immersive Content</h1>
      </section>
    </main>
  );
}
```

### 4.2 Custom Cursors

```javascript
const cursor = document.querySelector('.custom-cursor');
const items = document.querySelectorAll('.interactive-item');

// Smooth cursor trail
window.addEventListener('mousemove', (e) => {
  gsap.to(cursor, {
    x: e.clientX,
    y: e.clientY,
    duration: 0.3,
    ease: "power2.out"
  });
});

// 3D Tilt on hover
items.forEach(item => {
  item.addEventListener('mousemove', (e) => {
    const rect = item.getBoundingClientRect();
    const x = e.clientX - rect.left - (rect.width / 2);
    const y = e.clientY - rect.top - (rect.height / 2);

    const tiltX = (y / (rect.height / 2)) * -10;
    const tiltY = (x / (rect.width / 2)) * 10;

    gsap.to(item, {
      rotateX: tiltX,
      rotateY: tiltY,
      transformPerspective: 600,
      duration: 0.5,
      ease: "power2.out"
    });
  });

  item.addEventListener('mouseleave', () => {
    gsap.to(item, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.8,
      ease: "power3.out"
    });
  });
});
```

```css
.custom-cursor {
  width: 20px;
  height: 20px;
  background-color: #ff0055;
  border-radius: 50%;
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: screen;
  transform: translate(-50%, -50%);
  will-change: transform;
}

@media (pointer: coarse) {
  .custom-cursor { display: none; }
}
```

### 4.3 Preloaders

```html
<div id="preloader">
  <div class="preloader-content">
    <div class="spinner"></div>
    <div class="loading-text">LOADING<span class="dots">...</span></div>
  </div>
</div>
```

```css
#preloader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #080808;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 3px solid rgba(255, 0, 85, 0.1);
  border-radius: 50%;
  border-top-color: #ff0055;
  animation: spin 1s cubic-bezier(0.42, 0, 0.58, 1) infinite;
}

.loading-text {
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 4px;
  color: #888;
  margin-top: 1.5rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

body.loading {
  overflow: hidden;
}
```

```javascript
document.body.classList.add('loading');

window.addEventListener('load', () => {
  const revealTl = gsap.timeline({
    onComplete: () => {
      document.body.classList.remove('loading');
      document.getElementById('preloader').style.display = 'none';
    }
  });

  revealTl
    .to(".preloader-content", {
      opacity: 0,
      y: -20,
      duration: 0.5,
      ease: "power2.in"
    })
    .to("#preloader", {
      yPercent: -100,
      duration: 0.8,
      ease: "power4.inOut"
    }, "-=0.2")
    .from(".hero-title", {
      opacity: 0,
      y: 40,
      duration: 1,
      ease: "power3.out"
    }, "-=0.3");
});
```

### 4.4 Smooth Scroll (Lenis)

```javascript
import Lenis from '@studio-freight/lenis';

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  gestureOrientation: 'vertical',
  smoothWheel: true
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Sync with GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);
```

---

## Phase 5: Performance and Accessibility

### 5.1 The 60 FPS Rules

Animations must run smoothly at 60 frames per second. Each frame has only **16.67ms** to complete all work.

**The Rendering Pipeline:**
1. **Style** — Calculate styles applying to elements
2. **Layout** — Generate geometry and position
3. **Paint** — Fill pixels for each element
4. **Composite** — Draw layers to screen

**GPU-Accelerated Properties (ALWAYS animate these):**
- `transform` (translate, scale, rotate, skew)
- `opacity`
- `filter` (with caution)

**Never Animate (Causes Expensive Reflows):**
- `width`, `height`
- `top`, `left`, `right`, `bottom`
- `margin`, `padding`
- `border-width`
- `font-size`

### 5.2 Reduced Motion Support

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

  .animate-on-scroll {
    opacity: 1 !important;
    transform: none !important;
  }
}
```

```javascript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  initComplexAnimations();
}
```

### 5.3 Mobile Optimization

```css
/* Hide custom cursors on touch devices */
@media (pointer: coarse) {
  .custom-cursor { display: none; }
}

/* Responsive grid */
.grid-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  width: 100%;
  max-width: 1000px;
}

.interactive-item {
  height: clamp(180px, 25vh, 250px);
}
```

```javascript
let mm = gsap.matchMedia();

mm.add("(min-width: 769px)", () => {
  initDesktopAnimations();
  return () => cleanupDesktopAnimations();
});

mm.add("(max-width: 768px)", () => {
  initMobileAnimations();
});
```

### 5.4 Image Optimization

```html
<picture>
  <source media="(min-width: 1024px)" srcset="hero-desktop.avif" type="image/avif">
  <source media="(min-width: 768px)" srcset="hero-tablet.webp" type="image/webp">
  <img src="hero-mobile.webp"
       alt="Hero image"
       loading="lazy"
       decoding="async"
       width="400"
       height="600">
</picture>
```

---

## Phase 6: Deployment

### 6.1 GitHub Pages Hosting

**Step 1: Prepare Your Code**
- Rename main file to `index.html`
- Put all files in a dedicated folder
- Ensure all CDN links use HTTPS

**Step 2: Create GitHub Repository**
1. Sign up at https://github.com
2. Create new repository
3. Upload files
4. Go to Settings > Pages
5. Select source branch (main)
6. Your site will be at: `https://username.github.io/repo-name`

### 6.2 Meta Tags and SEO

```html
<!-- Universal Browser Standards -->
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="theme-color" content="#0d0d0d">

<!-- Primary SEO Metadata -->
<title>Your Website Title</title>
<meta name="title" content="Your Website Title">
<meta name="description" content="Description of your website">
<meta name="robots" content="index, follow">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://yoursite.com">
<meta property="og:title" content="Your Title">
<meta property="og:description" content="Description">
<meta property="og:image" content="https://yoursite.com/meta-preview.png">

<!-- X (Twitter) -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="https://yoursite.com">
<meta property="twitter:title" content="Your Title">
<meta property="twitter:description" content="Description">
<meta property="twitter:image" content="https://yoursite.com/meta-preview.png">

<!-- Favicon -->
<link rel="icon" type="image/x-icon" href="/favicon.ico">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
```

### 6.3 Performance Testing

**Lighthouse Checklist:**
- Performance score > 90
- First Contentful Paint < 1.8s
- Largest Contentful Paint < 2.5s
- Cumulative Layout Shift < 0.1
- Total Blocking Time < 200ms

**Tools:**
- Chrome DevTools Performance panel
- Lighthouse (built into Chrome)
- WebPageTest (webpagetest.org)
- GTmetrix (gtmetrix.com)

---

# Part 5: Code Templates

## Template 1: Scroll-Revealed Landing Page

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Scroll Reveal Studio</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    body {
      background-color: #0d0d0d;
      color: #ffffff;
      overflow-x: hidden;
    }
    section {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 2rem;
      position: relative;
    }
    .hero {
      background: linear-gradient(180deg, #141414 0%, #0d0d0d 100%);
    }
    h1 {
      font-size: 4.5rem;
      font-weight: 800;
      margin-bottom: 1rem;
      text-transform: uppercase;
      letter-spacing: -2px;
      opacity: 0;
      transform: translateY(50px);
    }
    p {
      font-size: 1.2rem;
      color: #888;
      max-width: 600px;
      text-align: center;
      line-height: 1.6;
      margin-bottom: 2rem;
      opacity: 0;
      transform: translateY(30px);
    }
    .cta-btn {
      padding: 1rem 2.5rem;
      font-size: 1rem;
      font-weight: 600;
      background-color: #fff;
      color: #000;
      border: none;
      border-radius: 50px;
      cursor: pointer;
      transition: transform 0.3s ease;
      opacity: 0;
    }
    .cta-btn:hover {
      transform: scale(1.05);
    }
    .grid-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2rem;
      width: 100%;
      max-width: 1200px;
      margin-top: 3rem;
    }
    .card {
      background-color: #161616;
      border: 1px solid #262626;
      padding: 2.5rem;
      border-radius: 16px;
      opacity: 0;
      transform: translateY(60px);
    }
    .card h3 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
      color: #00ffcc;
    }
    @media (prefers-reduced-motion: reduce) {
      *, h1, p, .card, .cta-btn {
        transform: none !important;
        opacity: 1 !important;
        transition: none !important;
      }
    }
  </style>
</head>
<body>

  <section class="hero">
    <h1 class="hero-title">Elevate Motion</h1>
    <p class="hero-text">Experience smooth sequencing powered by web layouts that react effortlessly to user scrolling.</p>
    <button class="cta-btn hero-btn">Explore Features</button>
  </section>

  <section class="features">
    <h1 class="section-title">Core Engine</h1>
    <div class="grid-container">
      <div class="card">
        <h3>01 / Hardware Sped</h3>
        <p>Animations rely entirely on transforms and opacity calculations to maintain high performance frames.</p>
      </div>
      <div class="card">
        <h3>02 / Scroll Driven</h3>
        <p>Elements march onto the layout tracking your viewport positions smoothly across view blocks.</p>
      </div>
      <div class="card">
        <h3>03 / User First</h3>
        <p>Built-in reduction rules completely disable motion loops if users choose lower movement options.</p>
      </div>
    </div>
  </section>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>

  <script>
    gsap.registerPlugin(ScrollTrigger);

    const heroTl = gsap.timeline({ defaults: { ease: "power4.out", duration: 1.2 } });

    heroTl.to(".hero-title", { opacity: 1, y: 0 })
          .to(".hero-text", { opacity: 1, y: 0 }, "-=0.8")
          .to(".hero-btn", { opacity: 1, y: 0 }, "-=0.8");

    gsap.to(".section-title", {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".features",
        start: "top 75%",
      }
    });

    gsap.to(".card", {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".grid-container",
        start: "top 80%",
      }
    });
  </script>
</body>
</html>
```

---

## Template 2: Interactive Cursor-Tracking Grid

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Magnetic Grid Studio</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    }
    body {
      background-color: #080808;
      color: #fff;
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
    }
    .custom-cursor {
      width: 20px;
      height: 20px;
      background-color: #ff0055;
      border-radius: 50%;
      position: fixed;
      top: 0;
      left: 0;
      pointer-events: none;
      z-index: 9999;
      mix-blend-mode: screen;
      transform: translate(-50%, -50%);
      will-change: transform;
    }
    .grid-wrapper {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 2.5rem;
      width: 100%;
      max-width: 800px;
      padding: 2rem;
    }
    .interactive-item {
      background-color: #111;
      border: 1px solid #222;
      height: 250px;
      border-radius: 24px;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      padding: 2rem;
      position: relative;
      cursor: pointer;
      overflow: hidden;
      transition: border-color 0.3s ease;
      will-change: transform;
    }
    .interactive-item:hover {
      border-color: #ff0055;
    }
    .interactive-item h2 {
      font-size: 1.8rem;
      font-weight: 700;
      z-index: 2;
    }
    .glow {
      position: absolute;
      width: 150px;
      height: 150px;
      background: radial-gradient(circle, rgba(255,0,85,0.15) 0%, rgba(0,0,0,0) 70%);
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      pointer-events: none;
      z-index: 1;
    }
    @media (pointer: coarse) {
      .custom-cursor { display: none; }
    }
  </style>
</head>
<body>

  <div class="custom-cursor"></div>

  <div class="grid-wrapper">
    <div class="interactive-item">
      <div class="glow"></div>
      <h2>Fluid Dynamics</h2>
    </div>
    <div class="interactive-item">
      <div class="glow"></div>
      <h2>Kinetic Layout</h2>
    </div>
    <div class="interactive-item">
      <div class="glow"></div>
      <h2>Vector Physics</h2>
    </div>
    <div class="interactive-item">
      <div class="glow"></div>
      <h2>GPU Rendered</h2>
    </div>
  </div>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>

  <script>
    const cursor = document.querySelector('.custom-cursor');
    const items = document.querySelectorAll('.interactive-item');

    window.addEventListener('mousemove', (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: "power2.out"
      });
    });

    items.forEach(item => {
      item.addEventListener('mousemove', (e) => {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left - (rect.width / 2);
        const y = e.clientY - rect.top - (rect.height / 2);

        const tiltX = (y / (rect.height / 2)) * -10;
        const tiltY = (x / (rect.width / 2)) * 10;

        gsap.to(item, {
          rotateX: tiltX,
          rotateY: tiltY,
          transformPerspective: 600,
          duration: 0.5,
          ease: "power2.out"
        });

        gsap.to(item.querySelector('.glow'), {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.5,
          ease: "power2.out"
        });
      });

      item.addEventListener('mouseleave', () => {
        gsap.to(item, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.8,
          ease: "power3.out"
        });

        gsap.to(item.querySelector('.glow'), {
          x: 0,
          y: 0,
          duration: 0.8,
          ease: "power3.out"
        });
      });
    });
  </script>
</body>
</html>
```

---

## Template 3: Grid Reveal with Scroll Effects

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Grid Reveal Studio</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    body {
      background-color: #0a0a0a;
      color: #ffffff;
      overflow-x: hidden;
    }
    section {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 4rem 2rem;
    }
    h1 {
      font-size: 3.5rem;
      font-weight: 800;
      margin-bottom: 1rem;
      letter-spacing: -1px;
      opacity: 0;
      transform: translateY(40px);
    }
    .subtitle {
      font-size: 1.2rem;
      color: #666;
      max-width: 500px;
      text-align: center;
      margin-bottom: 3rem;
      opacity: 0;
      transform: translateY(30px);
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.5rem;
      width: 100%;
      max-width: 1200px;
    }
    .grid-item {
      background: #111;
      border: 1px solid #222;
      padding: 2rem;
      border-radius: 16px;
      opacity: 0;
      transform: translateY(80px) scale(0.95);
      transition: border-color 0.3s ease, background-color 0.3s ease;
    }
    .grid-item:hover {
      border-color: #ff0055;
      background: #161616;
    }
    .grid-item h3 {
      font-size: 1.25rem;
      margin-bottom: 0.5rem;
      color: #fff;
    }
    .grid-item p {
      font-size: 0.9rem;
      color: #666;
      line-height: 1.5;
    }
    .grid-item .number {
      font-size: 0.8rem;
      color: #ff0055;
      margin-bottom: 1rem;
      font-weight: 600;
    }
    @media (max-width: 1024px) {
      .grid { grid-template-columns: repeat(2, 1fr); }
    }
    @media (max-width: 640px) {
      .grid { grid-template-columns: 1fr; }
      h1 { font-size: 2.5rem; }
    }
    @media (prefers-reduced-motion: reduce) {
      h1, .subtitle, .grid-item {
        opacity: 1 !important;
        transform: none !important;
      }
    }
  </style>
</head>
<body>

  <section class="hero">
    <h1>Scroll Reveal</h1>
    <p class="subtitle">Watch the grid come alive as you scroll down the page.</p>
  </section>

  <section class="showcase">
    <div class="grid">
      <div class="grid-item">
        <div class="number">01</div>
        <h3>Smooth Entry</h3>
        <p>Each card fades and scales into view with staggered timing.</p>
      </div>
      <div class="grid-item">
        <div class="number">02</div>
        <h3>Perspective</h3>
        <p>Subtle depth created through scale and position animation.</p>
      </div>
      <div class="grid-item">
        <div class="number">03</div>
        <h3>Predictable</h3>
        <p>Consistent timing creates a rhythm as content appears.</p>
      </div>
      <div class="grid-item">
        <div class="number">04</div>
        <h3>Efficient</h3>
        <p>GPU-accelerated transforms ensure smooth 60fps performance.</p>
      </div>
      <div class="grid-item">
        <div class="number">05</div>
        <h3>Responsive</h3>
        <p>Adapts gracefully across all screen sizes and devices.</p>
      </div>
      <div class="grid-item">
        <div class="number">06</div>
        <h3>Accessible</h3>
        <p>Respects user preferences for reduced motion.</p>
      </div>
    </div>
  </section>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>

  <script>
    gsap.registerPlugin(ScrollTrigger);

    const heroTl = gsap.timeline();
    heroTl.to("h1", { opacity: 1, y: 0, duration: 1, ease: "power3.out" })
          .to(".subtitle", { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.6");

    gsap.to(".grid-item", {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".grid",
        start: "top 80%"
      }
    });
  </script>
</body>
</html>
```

---

## Template 4: Preloader

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>With Preloader</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #0d0d0d;
      color: #fff;
    }
    #preloader {
      position: fixed;
      inset: 0;
      background: #080808;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10000;
      will-change: transform;
    }
    .preloader-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.5rem;
    }
    .spinner {
      width: 50px;
      height: 50px;
      border: 3px solid rgba(255, 0, 85, 0.1);
      border-radius: 50%;
      border-top-color: #ff0055;
      animation: spin 1s cubic-bezier(0.42, 0, 0.58, 1) infinite;
    }
    .loading-text {
      font-size: 0.9rem;
      font-weight: 700;
      letter-spacing: 4px;
      color: #888;
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    body.loading {
      overflow: hidden;
    }
    .content {
      opacity: 0;
    }
    section {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 2rem;
    }
    h1 {
      font-size: 4rem;
      font-weight: 800;
      margin-bottom: 1rem;
      opacity: 0;
      transform: translateY(30px);
    }
    p {
      font-size: 1.2rem;
      color: #888;
      opacity: 0;
      transform: translateY(20px);
    }
  </style>
</head>
<body class="loading">

  <div id="preloader">
    <div class="preloader-content">
      <div class="spinner"></div>
      <div class="loading-text">LOADING</div>
    </div>
  </div>

  <div class="content">
    <section>
      <h1>Ready</h1>
      <p>Your content is loaded and animations can begin.</p>
    </section>
  </div>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>

  <script>
    const preloader = document.getElementById('preloader');

    window.addEventListener('load', () => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.classList.remove('loading');
          preloader.style.display = 'none';
          gsap.to('.content', { opacity: 1, duration: 0.5 });
          startContentAnimations();
        }
      });

      tl.to(".preloader-content", {
        opacity: 0,
        y: -20,
        duration: 0.5,
        ease: "power2.in"
      })
      .to("#preloader", {
        yPercent: -100,
        duration: 0.8,
        ease: "power4.inOut"
      }, "-=0.2");

      function startContentAnimations() {
        gsap.to('h1', { opacity: 1, y: 0, duration: 1, ease: "power3.out" });
        gsap.to('p', { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.3 });
      }
    });
  </script>
</body>
</html>
```

---

## Template 5: Contact Form with Animations

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Animated Contact Form</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background-color: #0d0d0d;
      color: #fff;
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 2rem;
    }
    .contact-section {
      width: 100%;
      max-width: 450px;
    }
    .contact-form {
      padding: 3rem;
      background: #111;
      border: 1px solid #222;
      border-radius: 24px;
    }
    .contact-form h2 {
      font-size: 2rem;
      margin-bottom: 2rem;
    }
    .input-group {
      position: relative;
      margin-bottom: 2rem;
    }
    .input-group input {
      width: 100%;
      padding: 1rem 0;
      background: transparent;
      border: none;
      border-bottom: 2px solid #333;
      color: #fff;
      font-size: 1rem;
      outline: none;
      transition: border-color 0.3s ease;
    }
    .input-group label {
      position: absolute;
      left: 0;
      top: 1rem;
      color: #666;
      pointer-events: none;
      transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
    }
    .input-group input:focus ~ label,
    .input-group input:not(:placeholder-shown) ~ label {
      top: -12px;
      font-size: 0.8rem;
      color: #ff0055;
    }
    .input-group input:focus {
      border-color: #ff0055;
    }
    .submit-btn {
      width: 100%;
      padding: 1rem;
      background: #fff;
      color: #000;
      border: none;
      border-radius: 50px;
      font-weight: 600;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: transform 0.2s ease;
    }
    .submit-btn:active {
      transform: scale(0.98);
    }
    .btn-text {
      display: block;
      transition: opacity 0.2s ease, transform 0.2s ease;
    }
    .btn-loader {
      display: none;
      position: absolute;
      top: 50%;
      left: 50%;
      width: 20px;
      height: 20px;
      border: 2px solid #000;
      border-top-color: transparent;
      border-radius: 50%;
      transform: translate(-50%, -50%);
      animation: btn-spin 0.6s linear infinite;
    }
    @keyframes btn-spin {
      to { transform: translate(-50%, -50%) rotate(360deg); }
    }
    @media (prefers-reduced-motion: reduce) {
      .input-group label,
      .submit-btn {
        transition: none;
      }
    }
  </style>
</head>
<body>

  <section class="contact-section">
    <form id="contactForm" class="contact-form">
      <h2>Let's Work Together</h2>

      <div class="input-group">
        <input type="text" id="name" required placeholder=" ">
        <label for="name">Your Name</label>
      </div>

      <div class="input-group">
        <input type="email" id="email" required placeholder=" ">
        <label for="email">Your Email</label>
      </div>

      <button type="submit" class="submit-btn">
        <span class="btn-text">Send Message</span>
        <div class="btn-loader"></div>
      </button>
    </form>
  </section>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>

  <script>
    gsap.from('.contact-form', {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: "power3.out"
    });

    document.getElementById('contactForm').addEventListener('submit', function(e) {
      e.preventDefault();

      const btn = document.querySelector('.submit-btn');
      const btnText = document.querySelector('.btn-text');
      const btnLoader = document.querySelector('.btn-loader');

      const submitTl = gsap.timeline();

      submitTl.to(btnText, { opacity: 0, y: -10, duration: 0.2 })
              .call(() => {
                btnLoader.style.display = "block";
                gsap.fromTo(btnLoader, { opacity: 0 }, { opacity: 1, duration: 0.2 });
              })
              .to(btn, { duration: 2 })
              .to(btnLoader, {
                opacity: 0,
                duration: 0.2,
                onComplete: () => { btnLoader.style.display = "none"; }
              })
              .call(() => {
                btnText.innerHTML = "Success ✓";
                btn.style.backgroundColor = "#00ffcc";
              })
              .to(btnText, { opacity: 1, y: 0, duration: 0.3 })
              .call(() => {
                document.getElementById('contactForm').reset();
                setTimeout(() => {
                  btnText.innerHTML = "Send Message";
                  btn.style.backgroundColor = "#fff";
                }, 2000);
              });
    });
  </script>
</body>
</html>
```

---

## Template 6: Responsive Animations

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Responsive Animations</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #0d0d0d;
      color: #fff;
      overflow-x: hidden;
    }
    section {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: clamp(2rem, 5vw, 4rem);
    }
    h1 {
      font-size: clamp(2.5rem, 8vw, 5rem);
      font-weight: 800;
      letter-spacing: -2px;
      text-align: center;
      opacity: 0;
      transform: translateY(50px);
    }
    p {
      font-size: clamp(1rem, 2vw, 1.25rem);
      color: #888;
      max-width: 600px;
      text-align: center;
      margin-top: 1.5rem;
      line-height: 1.6;
      opacity: 0;
      transform: translateY(30px);
    }
    .cta-btn {
      margin-top: 2rem;
      padding: 1rem 2.5rem;
      font-size: 1rem;
      font-weight: 600;
      background: #fff;
      color: #000;
      border: none;
      border-radius: 50px;
      cursor: pointer;
      opacity: 0;
      transform: translateY(20px);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    .cta-btn:hover {
      transform: scale(1.05);
      box-shadow: 0 10px 40px rgba(255, 255, 255, 0.2);
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2rem;
      max-width: 1200px;
      width: 100%;
    }
    .card {
      background: #161616;
      border: 1px solid #262626;
      padding: 2.5rem;
      border-radius: 16px;
      opacity: 0;
      transform: translateY(60px);
      transition: border-color 0.3s ease;
    }
    .card:hover {
      border-color: #ff0055;
    }
    .card h3 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
      color: #00ffcc;
    }
    .custom-cursor {
      width: 20px;
      height: 20px;
      background: #ff0055;
      border-radius: 50%;
      position: fixed;
      top: 0;
      left: 0;
      pointer-events: none;
      z-index: 9999;
      mix-blend-mode: screen;
      transform: translate(-50%, -50%);
    }
    @media (max-width: 768px) {
      .custom-cursor { display: none; }
      .cta-btn:hover { transform: none; }
    }
    @media (prefers-reduced-motion: reduce) {
      h1, p, .cta-btn, .card {
        opacity: 1 !important;
        transform: none !important;
        transition: none !important;
      }
    }
  </style>
</head>
<body>

  <div class="custom-cursor"></div>

  <section class="hero">
    <h1>Responsive Motion</h1>
    <p>Adapts seamlessly across desktop, tablet, and mobile with optimized animations for each.</p>
    <button class="cta-btn">Get Started</button>
  </section>

  <section class="features">
    <div class="grid">
      <div class="card">
        <h3>Desktop</h3>
        <p>Full animations including custom cursor, 3D effects, and parallax.</p>
      </div>
      <div class="card">
        <h3>Tablet</h3>
        <p>Simplified animations optimized for touch interactions.</p>
      </div>
      <div class="card">
        <h3>Mobile</h3>
        <p>Essential animations only, respecting touch-first navigation.</p>
      </div>
    </div>
  </section>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>

  <script>
    gsap.registerPlugin(ScrollTrigger);

    let mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      const cursor = document.querySelector('.custom-cursor');

      window.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.3
        });
      });

      const heroTl = gsap.timeline();
      heroTl.to("h1", { opacity: 1, y: 0, duration: 1.2, ease: "power4.out" })
            .to("p", { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.8")
            .to(".cta-btn", { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.4");

      gsap.to(".card", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".grid",
          start: "top 80%"
        }
      });

      return () => {
        gsap.set(cursor, { display: "none" });
      };
    });

    mm.add("(max-width: 768px)", () => {
      gsap.to("h1", { opacity: 1, y: 0, duration: 1, ease: "power3.out" });
      gsap.to("p", { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.2 });
      gsap.to(".cta-btn", { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", delay: 0.4 });

      gsap.to(".card", {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".grid",
          start: "top 85%"
        }
      });
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(["h1", "p", ".cta-btn", ".card"], {
        opacity: 1,
        y: 0,
        clearProps: "all"
      });
    });
  </script>
</body>
</html>
```

---

# Part 6: Quick Reference

## Common Properties to Animate

### GPU-Accelerated (Always Safe)

| Property | Example |
|----------|---------|
| `transform` | `translateX(100px)`, `scale(1.1)`, `rotate(45deg)` |
| `opacity` | `0.5`, `1` |
| `filter` | `blur(5px)` (with caution) |
| `clip-path` | `circle(50%)` |

### CSS Transitions (State Changes)

```css
transition: property duration easing;
transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1);
```

### CSS Keyframe Animations (Loops/Sequences)

```css
@keyframes name {
  from { opacity: 0; }
  to { opacity: 1; }
}
animation: name 1s ease-out forwards;
```

## Common Properties to AVOID Animating

| Property | Why to Avoid |
|----------|--------------|
| `width` | Triggers layout recalculation |
| `height` | Triggers layout recalculation |
| `top`, `left`, `right`, `bottom` | Triggers layout recalculation |
| `margin`, `padding` | Triggers layout recalculation |
| `border-width` | Triggers layout recalculation |
| `font-size` | Triggers layout recalculation |
| `background` | Triggers paint |
| `color` | Triggers paint |

## Ease Functions Cheat Sheet

### Standard Easing

| Easing | Use Case |
|--------|----------|
| `ease` | Default, similar to ease-in-out |
| `ease-in` | Slow start |
| `ease-out` | Slow end |
| `ease-in-out` | Slow start and end |

### cubic-bezier() Curves

| Curve | Character | Use Case |
|-------|-----------|----------|
| `cubic-bezier(0.25, 1, 0.5, 1)` | Smooth deceleration | Hover exits |
| `cubic-bezier(0.4, 0, 0.2, 1)` | Standard ease | Most interactions |
| `cubic-bezier(0, 0, 0.2, 1)` | Smooth acceleration | Hover enters |
| `cubic-bezier(0.68, -0.55, 0.27, 1.55)` | Elastic overshoot | Playful feedback |
| `cubic-bezier(0.175, 0.885, 0.32, 1.275)` | Bounce in | Attention seekers |

### GSAP Easing

| Name | Character |
|------|-----------|
| `power1.out` | Gentle |
| `power2.out` | Moderate |
| `power3.out` | Smooth |
| `power4.out` | Dramatic |
| `back.out(1.7)` | Elastic overshoot |
| `elastic.out(1, 0.3)` | Spring |
| `bounce.out` | Bouncy |

## Performance Checklist

- [ ] Animate only `transform` and `opacity`
- [ ] Use `will-change` for upcoming animations
- [ ] Remove `will-change` after animation completes
- [ ] Use `requestAnimationFrame` for JS animations
- [ ] Debounce scroll event handlers
- [ ] Use `IntersectionObserver` instead of scroll listeners
- [ ] Lazy load off-screen animations
- [ ] Test on low-end devices
- [ ] Optimize images to WebP/AVIF
- [ ] Minify JavaScript and CSS

## Accessibility Checklist

- [ ] Wrap animations in `@media (prefers-reduced-motion: reduce)`
- [ ] Provide `prefers-reduced-motion` alternative
- [ ] Maintain minimum 44x44px touch targets
- [ ] Test with screen readers
- [ ] Include visible focus states
- [ ] Don't rely solely on animation for critical info
- [ ] Provide pause/stop for infinite animations

---

## Required Library CDN URLs

```json
{
  "gsap_core": "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js",
  "gsap_scrolltrigger": "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js",
  "lenis": "https://unpkg.com/@studio-freight/lenis@1.0.42/dist/lenis.min.js"
}
```

## Key Resource URLs

### Documentation
- GSAP: https://gsap.com/docs
- ScrollTrigger: https://gsap.com/docs/ScrollTrigger/
- Lenis: https://github.com/studio-freight/lenis
- Three.js: https://threejs.org/docs
- React Three Fiber: https://docs.pmnd.rs/react-three-fiber

### Learning
- MDN CSS Animations: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animations
- CSS-Tricks: https://css-tricks.com/tag/animation/
- Codrops: https://tympanus.net/codrops/

### Inspiration
- Awwwards: https://awwwards.com
- Landing.love: https://landing.love
- CSS Design Awards: https://cssdesignawards.com

### Optimization
- Squoosh: https://squoosh.app
- CloudConvert: https://cloudconvert.com
- WebPageTest: https://webpagetest.org

---

*Document Version: 1.0*
*Last Updated: July 2026*
*Compatible with: GSAP 3.12+, Lenis 1.0+, All Modern Browsers*
