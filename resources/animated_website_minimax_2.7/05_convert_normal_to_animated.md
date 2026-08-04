# Comprehensive Guide: Converting a Normal/Static Website to an Animated Website

A step-by-step technical guide for transforming static websites into dynamic, engaging animated experiences using CSS, JavaScript, and professional animation libraries.

**Target Audience:** Web developers, designers, and front-end engineers  
**Prerequisites:** Basic HTML, CSS, and JavaScript knowledge  
**Estimated Reading Time:** 45 minutes

---

## Table of Contents

1. [Assessment Phase](#1-assessment-phase)
2. [Planning Phase](#2-planning-phase)
3. [Implementation Steps](#3-implementation-steps)
   - [3.1 CSS Transitions and Animations](#31-css-transitions-and-animations)
   - [3.2 Integrating GSAP](#32-integrating-gsap)
   - [3.3 Scroll-Triggered Effects](#33-scroll-triggered-effects)
   - [3.4 Hover Interactions](#34-hover-interactions)
   - [3.5 Loading Screens and Preloaders](#35-loading-screens-and-preloaders)
   - [3.6 Smooth Scrolling with Lenis](#36-smooth-scrolling-with-lenis)
4. [Performance Optimization](#4-performance-optimization)
5. [Testing Across Devices](#5-testing-across-devices)
6. [Progressive Enhancement Approach](#6-progressive-enhancement-approach)
7. [Code Examples and Templates](#7-code-examples-and-templates)
8. [Resources and References](#8-resources-and-references)

---

## 1. Assessment Phase

### 1.1 Evaluating Your Current Site

Before adding animations, thoroughly assess your existing website structure to determine animation potential and implementation complexity.

### 1.2 Site Structure Analysis

Run these diagnostic commands to understand your current setup:

```bash
# Analyze your HTML structure
ls -la *.html

# Count HTML files to understand site size
find . -name "*.html" | wc -l

# Check for existing CSS and JavaScript files
ls -la css/ js/ 2>/dev/null || echo "Directories may not exist"

# Identify framework used (if any)
grep -l "react\|vue\|angular\|next\|nuxt" *.html 2>/dev/null
```

### 1.3 Animation Potential Checklist

Use this checklist to evaluate your site's animation readiness:

| Category | Questions to Ask | Score (1-5) |
|----------|------------------|-------------|
| **Structure** | Is your HTML semantic and well-organized? | ___ |
| **Performance** | Does your site currently load under 3 seconds? | ___ |
| **Responsiveness** | Is your CSS already mobile-responsive? | ___ |
| **Assets** | Are your images optimized (WebP/AVIF)? | ___ |
| **Code Quality** | Is CSS separated from content (no inline styles)? | ___ |

**Total Score Interpretation:**
- **15-20:** Excellent candidate for animation
- **10-14:** Good candidate with minor fixes needed
- **5-9:** Requires significant restructuring first

### 1.4 Key Elements to Identify

For each page, identify these animation-ready elements:

```html
<!-- Hero sections with large headings -->
<header class="hero-section">
  <h1>Main Headline</h1>
  <p>Subheadline text</p>
  <button>Call to Action</button>
</header>

<!-- Feature grids that can stagger -->
<div class="features-grid">
  <div class="feature-card">...</div>
  <div class="feature-card">...</div>
  <div class="feature-card">...</div>
</div>

<!-- Content sections for scroll reveals -->
<section class="content-section">
  <h2>Section Title</h2>
  <p>Content...</p>
</section>

<!-- Interactive elements -->
<nav class="main-nav">...</nav>
<a class="cta-button">...</a>
```

### 1.5 Performance Baseline

Before adding animations, establish performance benchmarks:

```javascript
// Add this to your site temporarily to measure load time
window.addEventListener('load', () => {
  const perfData = performance.getEntriesByType('navigation')[0];
  console.log('Load Time:', perfData.loadEventEnd - perfData.fetchStart, 'ms');
  console.log('DOM Interactive:', perfData.domInteractive - perfData.fetchStart, 'ms');
  console.log('First Contentful Paint:', perfData.responseStart - perfData.requestStart, 'ms');
});
```

---

## 2. Planning Phase

### 2.1 Animation Strategy Framework

Define your animation strategy using the **Value-Animation Fit** matrix:

| Animation Level | Use Case | Tools | Complexity |
|----------------|----------|-------|------------|
| **Level 1: Native CSS3** | Hover states, microinteractions, simple loaders | `transition`, `transform`, `@keyframes` | Low |
| **Level 2: GSAP/Framer Motion** | Scroll-driven timelines, sequenced animations | GSAP, ScrollTrigger, Framer Motion | Medium |
| **Level 3: Three.js/PixiJS** | 3D environments, particle systems, WebGL | Three.js, PixiJS | High |

### 2.2 Animation Type Selection

Choose animations based on purpose:

| Purpose | Animation Type | Example |
|---------|---------------|---------|
| Guide attention | Fade-in, slide-up | Hero text reveals |
| Confirm actions | Scale, color change | Button click feedback |
| Show personality | Parallax, morphing | Background effects |
| Improve UX | Smooth scroll, loading states | Page transitions |

### 2.3 Animation Mapping Template

Document your planned animations in this format:

```markdown
## Page: Homepage

| Element | Animation | Trigger | Duration | Easing |
|---------|-----------|---------|----------|--------|
| Hero h1 | Fade up + scale | Page load | 1.2s | power4.out |
| Hero p | Fade up | 0.3s after h1 | 0.8s | power3.out |
| CTA Button | Fade in + bounce | 0.5s after p | 0.6s | back.out |
| Feature cards | Stagger slide-up | Scroll 80% | 0.8s each | power2.out |
| Nav links | Underline grow | Hover | 0.3s | ease.out |
```

### 2.4 Technology Stack Decision

```
Static HTML/CSS     → Use GSAP + ScrollTrigger
React/Next.js       → Use Framer Motion OR GSAP + React integration
Vue/Nuxt.js         → Use GSAP with Vue wrapper OR Vue Transition
WordPress           → Use GSAP via plugin or theme integration
```

---

## 3. Implementation Steps

### 3.1 CSS Transitions and Animations

#### 3.1.1 CSS Transition Fundamentals

Always animate only `transform` and `opacity` for GPU acceleration:

```css
/* Good: GPU-accelerated properties */
.animated-element {
  transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1),
              opacity 0.3s ease-out;
  will-change: transform, opacity;
}

/* Avoid: Layout-triggering properties */
.avoid-this {
  transition: width 0.3s ease,
              height 0.3s ease,
              top 0.3s ease,
              left 0.3s ease;  /* Causes layout recalculation */
}
```

#### 3.1.2 CSS Keyframe Animations

```css
/* Fade-in-up animation */
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

/* Apply with reduced-motion respect */
@media (prefers-reduced-motion: reduce) {
  .animate-on-scroll {
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
  }
}

.fade-in-up {
  animation: fadeInUp 0.8s cubic-bezier(0.25, 1, 0.5, 1) forwards;
}
```

#### 3.1.3 Button Hover Effects

```css
/* Scale + glow effect */
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

### 3.2 Integrating GSAP

#### 3.2.1 Installation Options

**Option A: CDN (Quick Setup)**
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
```

**Option B: npm (Production)**
```bash
npm install gsap
```

```javascript
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
```

#### 3.2.2 Basic GSAP Timeline

```javascript
// Create a sequenced animation timeline
const heroTl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1 } });

heroTl
  .from('.hero-title', {
    opacity: 0,
    y: 50,
    duration: 1.2
  })
  .from('.hero-subtitle', {
    opacity: 0,
    y: 30,
    duration: 0.8
  }, '-=0.6')
  .from('.hero-cta', {
    opacity: 0,
    scale: 0.8,
    duration: 0.6
  }, '-=0.4');
```

#### 3.2.3 Staggered Grid Animation

```javascript
// Animate multiple elements with staggered delays
gsap.to('.feature-card', {
  opacity: 1,
  y: 0,
  duration: 0.8,
  stagger: {
    amount: 0.6,
    grid: 'auto',
    from: 'start'
  },
  ease: 'power2.out',
  scrollTrigger: {
    trigger: '.features-grid',
    start: 'top 80%',
    toggleActions: 'play none none none'
  }
});
```

### 3.3 Scroll-Triggered Effects

#### 3.3.1 Basic ScrollTrigger Setup

```javascript
// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Simple scroll-triggered fade-in
gsap.to('.section-title', {
  opacity: 1,
  y: 0,
  duration: 1,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.section-title',
    start: 'top 80%',
    end: 'top 50%',
    toggleActions: 'play reverse play reverse'
  }
});
```

#### 3.3.2 Pinning Elements During Scroll

```javascript
// Pin a section while animating
gsap.to('.pinned-section', {
  scrollTrigger: {
    trigger: '.pinned-container',
    start: 'top top',
    end: '+=1000',
    pin: true,
    scrub: 1
  }
});
```

#### 3.3.3 Scroll-Linked Progress Bar

```javascript
// Animate progress based on scroll position
gsap.to('.progress-bar', {
  scaleX: 1,
  ease: 'none',
  scrollTrigger: {
    trigger: 'body',
    start: 'top top',
    end: 'bottom bottom',
    scrub: 0.5
  }
});
```

#### 3.3.4 Parallax Effect

```javascript
// Parallax background movement
gsap.to('.parallax-bg', {
  y: '30%',
  ease: 'none',
  scrollTrigger: {
    trigger: '.parallax-section',
    start: 'top bottom',
    end: 'bottom top',
    scrub: true
  }
});
```

### 3.4 Hover Interactions

#### 3.4.1 Magnetic Button Effect

```javascript
// Magnetic hover - element follows cursor slightly
const magneticButtons = document.querySelectorAll('.magnetic-btn');

magneticButtons.forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    gsap.to(btn, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
      ease: 'power2.out'
    });
  });
  
  btn.addEventListener('mouseleave', () => {
    gsap.to(btn, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.5)'
    });
  });
});
```

#### 3.4.2 3D Tilt Card Effect

```javascript
// 3D tilt on hover with perspective
const tiltCards = document.querySelectorAll('.tilt-card');

tiltCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    gsap.to(card, {
      rotateY: (x / rect.width) * 20,
      rotateX: (y / rect.height) * -20,
      transformPerspective: 1000,
      duration: 0.4,
      ease: 'power2.out'
    });
  });
  
  card.addEventListener('mouseleave', () => {
    gsap.to(card, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.8,
      ease: 'power3.out'
    });
  });
});
```

#### 3.4.3 Custom Cursor

```javascript
// Custom cursor with trail effect
const cursor = document.querySelector('.custom-cursor');
const cursorDot = document.querySelector('.cursor-dot');

window.addEventListener('mousemove', (e) => {
  // Main cursor follows immediately
  gsap.to(cursor, {
    x: e.clientX,
    y: e.clientY,
    duration: 0.1
  });
  
  // Dot follows with delay for trail
  gsap.to(cursorDot, {
    x: e.clientX,
    y: e.clientY,
    duration: 0.3,
    ease: 'power2.out'
  });
});

// Hide cursor on touch devices
if ('ontouchstart' in window) {
  cursor.style.display = 'none';
  cursorDot.style.display = 'none';
}
```

### 3.5 Loading Screens and Preloaders

#### 3.5.1 HTML Structure

```html
<div id="preloader">
  <div class="preloader-content">
    <div class="loader-logo">
      <svg width="60" height="60" viewBox="0 0 60 60">
        <circle cx="30" cy="30" r="25" fill="none" stroke="#333" stroke-width="3"/>
        <circle cx="30" cy="30" r="25" fill="none" stroke="#ff0055" stroke-width="3"
                stroke-dasharray="157" stroke-dashoffset="157" class="loader-circle"/>
      </svg>
    </div>
    <div class="loading-text">LOADING<span class="dots"></span></div>
  </div>
</div>
```

#### 3.5.2 CSS Styling

```css
#preloader {
  position: fixed;
  inset: 0;
  background: #080808;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
}

.preloader-content {
  text-align: center;
}

.loader-circle {
  transform-origin: center;
  animation: loaderSpin 1.5s ease-in-out infinite;
}

@keyframes loaderSpin {
  0% { stroke-dashoffset: 157; }
  50% { stroke-dashoffset: 0; }
  100% { stroke-dashoffset: -157; }
}

.loading-text {
  margin-top: 20px;
  font-size: 12px;
  letter-spacing: 4px;
  color: #666;
}

.dots::after {
  content: '';
  animation: dots 1.5s steps(4, end) infinite;
}

@keyframes dots {
  0%, 20% { content: ''; }
  40% { content: '.'; }
  60% { content: '..'; }
  80%, 100% { content: '...'; }
}

body.loading {
  overflow: hidden;
}
```

#### 3.5.3 GSAP Reveal Sequence

```javascript
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  
  const revealTl = gsap.timeline({
    onComplete: () => {
      document.body.classList.remove('loading');
      preloader.style.display = 'none';
    }
  });
  
  revealTl
    .to('.preloader-content', {
      opacity: 0,
      y: -30,
      duration: 0.5,
      ease: 'power2.in'
    })
    .to('#preloader', {
      yPercent: -100,
      duration: 0.8,
      ease: 'power4.inOut'
    }, '-=0.2')
    .from('.hero-title', {
      opacity: 0,
      y: 40,
      duration: 1,
      ease: 'power3.out'
    }, '-=0.3')
    .from('.hero-subtitle', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.6');
});
```

### 3.6 Smooth Scrolling with Lenis

#### 3.6.1 Lenis Installation

**Option A: CDN**
```html
<script src="https://unpkg.com/@studio-freight/lenis@1.0.42/dist/lenis.min.js"></script>
```

**Option B: npm**
```bash
npm install @studio-freight/lenis
```

#### 3.6.2 Basic Lenis Setup

```javascript
import Lenis from '@studio-freight/lenis';

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  gestureOrientation: 'vertical',
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 2
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);
```

#### 3.6.3 Integrating Lenis with GSAP ScrollTrigger

```javascript
// Sync Lenis with GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);
```

#### 3.6.4 Lenis with ScrollSmoother

```javascript
// If using GSAP ScrollSmoother
import { ScrollSmoother } from 'gsap/ScrollSmoother';
gsap.registerPlugin(ScrollSmoother);

// Create smooth scroller
let smoother = ScrollSmoother.create({
  wrapper: '#smooth-wrapper',
  content: '#smooth-content',
  smooth: 1.5,
  effects: true,
  normalizeScroll: true
});

// Update Lenis when ScrollSmoother is present
lenis.on('scroll', () => {
  ScrollTrigger.update();
  smoother.scrollTop(lenis.scroll);
});
```

#### 3.6.5 Responsive Lenis Configuration

```javascript
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true
});

// Adjust on resize
let windowWidth = window.innerWidth;

window.addEventListener('resize', () => {
  if (window.innerWidth !== windowWidth) {
    windowWidth = window.innerWidth;
    lenis.destroy();
    
    lenis = new Lenis({
      duration: windowWidth < 768 ? 0.8 : 1.2, // Faster on mobile
      smoothWheel: true
    });
  }
});
```

---

## 4. Performance Optimization

### 4.1 The 60 FPS Rule

Animations must maintain 60 frames per second. Each frame has only 16.67ms to execute.

```javascript
// Monitor frame rate in development
let lastTime = performance.now();
let frameCount = 0;

function checkFPS() {
  frameCount++;
  const currentTime = performance.now();
  
  if (currentTime - lastTime >= 1000) {
    console.log('FPS:', frameCount);
    frameCount = 0;
    lastTime = currentTime;
  }
  
  requestAnimationFrame(checkFPS);
}
checkFPS();
```

### 4.2 Hardware Acceleration Checklist

```css
/* Enable hardware acceleration */
.animated-element {
  will-change: transform, opacity;
  transform: translateZ(0);
  backface-visibility: hidden;
}

/* Use composite-only properties */
.correct {
  transform: translateX(100px);  /* OK - composite only */
  opacity: 0;                    /* OK - composite only */
  filter: blur(5px);             /* OK - GPU-accelerated */
}

.incorrect {
  width: 100px;                  /* BAD - triggers layout */
  height: 200px;                 /* BAD - triggers layout */
  top: 50px;                     /* BAD - triggers layout */
  left: 100px;                   /* BAD - triggers layout */
  margin: 10px;                  /* BAD - triggers layout */
}
```

### 4.3 Image Optimization

```html
<!-- Use modern formats -->
<picture>
  <source media="(min-width: 1024px)" 
          srcset="hero-desktop.avif" 
          type="image/avif">
  <source media="(min-width: 768px)" 
          srcset="hero-tablet.webp" 
          type="image/webp">
  <img src="hero-mobile.webp" 
       alt="Hero image"
       loading="lazy"
       decoding="async"
       width="400" 
       height="600">
</picture>
```

### 4.4 Lazy Loading Animation Elements

```javascript
// Intersection Observer for lazy animation initialization
const observerOptions = {
  rootMargin: '100px',
  threshold: 0.1
};

const lazyAnimated = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const element = entry.target;
      const animationType = element.dataset.animation;
      
      if (animationType === 'fade-up') {
        gsap.to(element, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out'
        });
      }
      
      lazyAnimated.unobserve(element);
    }
  });
}, observerOptions);

document.querySelectorAll('.lazy-animate').forEach(el => {
  lazyAnimated.observe(el);
});
```

### 4.5 Debouncing Scroll Events

```javascript
// Use GSAP's built-in throttling instead of raw scroll events
ScrollTrigger.create({
  trigger: '.scroll-trigger',
  start: 'top 80%',
  onEnter: () => animateElement(),
  onLeaveBack: () => reverseAnimation()
});

// If you must use scroll events, debounce them
function debounce(func, wait = 10) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}
```

### 4.6 Reduce Animation Complexity on Mobile

```javascript
// Use matchMedia to conditionally run animations
let mm = gsap.matchMedia();

mm.add('(min-width: 769px)', () => {
  // Desktop: Full animations
  initCursorEffect();
  init3DTilt();
  initParallax();
  
  return () => {
    // Cleanup on mobile
    destroyCursorEffect();
  };
});

mm.add('(max-width: 768px)', () => {
  // Mobile: Simplified or no animations
  initMobileTapFeedback();
});
```

---

## 5. Testing Across Devices

### 5.1 Browser Testing Matrix

| Browser | Version | Test Focus |
|---------|---------|-----------|
| Chrome | Latest 2 | DevTools, performance |
| Firefox | Latest 2 | CSS animations |
| Safari | Latest 2 | WebKit specifics |
| Edge | Latest 2 | Chromium compatibility |

### 5.2 Device Breakpoints

```css
/* Mobile-first responsive design */
@media (min-width: 480px)  { /* Large phones */ }
@media (min-width: 768px)  { /* Tablets */ }
@media (min-width: 1024px) { /* Laptops */ }
@media (min-width: 1440px) { /* Desktops */ }
@media (min-width: 1920px) { /* 4K displays */ }
```

### 5.3 Performance Testing Tools

```javascript
// Performance Observer API
const perfObserver = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    if (entry.entryType === 'paint') {
      console.log(`${entry.name}: ${entry.startTime}ms`);
    }
  });
});

perfObserver.observe({ entryTypes: ['paint', 'longtask'] });
```

### 5.4 Mobile Device Testing Checklist

- [ ] Touch events work correctly
- [ ] Animations don't cause scroll jank
- [ ] Custom cursors are hidden
- [ ] Hover states translate to active states
- [ ] Loading times are acceptable on 3G
- [ ] No horizontal scroll on small screens
- [ ] Touch targets are at least 44x44px

### 5.5 Accessibility Testing

```css
/* Respect reduced motion settings */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

```javascript
// JavaScript check for reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  // Initialize complex animations
  initParallax();
  initCursorTrail();
}
```

---

## 6. Progressive Enhancement Approach

### 6.1 Enhancement Layers

```
Layer 1: Static HTML (Base)        ← Always works
Layer 2: CSS Enhancements           ← Progressive visual improvements
Layer 3: GSAP Microinteractions     ← Interactive feedback
Layer 4: GSAP Complex Animations    ← Full experience (desktop only)
```

### 6.2 Feature Detection

```javascript
// Check for required features before initialization
function canRunAnimations() {
  return !!(
    document.querySelector &&
    window.requestAnimationFrame &&
    window.addEventListener
  );
}

function isDesktop() {
  return window.matchMedia('(min-width: 769px)').matches && 
         window.matchMedia('(pointer: fine)').matches;
}

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
  } catch (e) {
    return false;
  }
}

// Initialize based on capabilities
if (canRunAnimations()) {
  if (isDesktop()) {
    initFullAnimations();
  } else {
    initMobileAnimations();
  }
}
```

### 6.3 Graceful Degradation

```javascript
// Wrap GSAP operations in try-catch
try {
  const tl = gsap.timeline();
  tl.to('.element', { opacity: 1, duration: 1 });
} catch (error) {
  console.warn('GSAP animation failed, showing element statically:', error);
  document.querySelector('.element').style.opacity = 1;
}
```

### 6.4 Progressive Loading

```html
<!-- Load essential animations first, complex ones after -->
<script>
  // Essential: Simple CSS-based animations work immediately
  document.documentElement.classList.add('animations-ready');
</script>

<!-- Complex: GSAP loaded async -->
<script async src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js">
</script>

<!-- Complex: ScrollTrigger loaded after GSAP -->
<script async src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js">
</script>
```

---

## 7. Code Examples and Templates

### 7.1 Complete Scroll-Reveal Landing Page

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Animated Landing Page</title>
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
      transition: border-color 0.3s ease, background-color 0.3s ease;
    }
    
    .card:hover {
      border-color: #ff0055;
      background: #1a1a1a;
    }
    
    .card h3 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
      color: #00ffcc;
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

  <section class="hero">
    <h1 class="hero-title">Elevate Your Experience</h1>
    <p class="hero-text">Smooth, performant animations that respect users and enhance engagement.</p>
    <button class="cta-btn">Get Started</button>
  </section>

  <section class="features">
    <h1 class="section-title">Our Features</h1>
    <div class="grid">
      <div class="card">
        <h3>01 / Performance</h3>
        <p>GPU-accelerated animations maintaining 60fps across all devices.</p>
      </div>
      <div class="card">
        <h3>02 / Accessible</h3>
        <p>Respects user preferences with reduced motion support built-in.</p>
      </div>
      <div class="card">
        <h3>03 / Responsive</h3>
        <p>Adaptive animations that scale perfectly from mobile to 4K.</p>
      </div>
    </div>
  </section>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
  
  <script>
    gsap.registerPlugin(ScrollTrigger);
    
    // Hero animation timeline
    const heroTl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.2 } });
    
    heroTl
      .to('.hero-title', { opacity: 1, y: 0, duration: 1.2 })
      .to('.hero-text', { opacity: 1, y: 0, duration: 0.8 }, '-=0.8')
      .to('.cta-btn', { opacity: 1, y: 0, duration: 0.6 }, '-=0.4');
    
    // Section title animation
    gsap.to('.section-title', {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.features',
        start: 'top 75%'
      }
    });
    
    // Staggered card reveal
    gsap.to('.card', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.grid',
        start: 'top 80%'
      }
    });
  </script>
</body>
</html>
```

### 7.2 Preloader Template

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>With Preloader</title>
  <style>
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
    
    .loader {
      width: 50px;
      height: 50px;
      border: 3px solid rgba(255, 255, 255, 0.1);
      border-radius: 50%;
      border-top-color: #ff0055;
      animation: spin 1s linear infinite;
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
  </style>
</head>
<body class="loading">

  <div id="preloader">
    <div class="loader"></div>
  </div>

  <div class="content">
    <h1>Your Content Here</h1>
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
        }
      });
      
      tl.to('.loader', { opacity: 0, duration: 0.3 })
        .to('#preloader', {
          yPercent: -100,
          duration: 0.8,
          ease: 'power4.inOut'
        }, '-=0.1');
    });
  </script>
</body>
</html>
```

### 7.3 Smooth Scroll with Lenis Template

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Lenis Smooth Scroll</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: #0d0d0d; color: #fff; }
    section { min-height: 100vh; padding: 4rem; }
    h1 { font-size: 3rem; opacity: 0; transform: translateY(30px); }
    p { font-size: 1.2rem; color: #888; margin-top: 1rem; opacity: 0; }
  </style>
</head>
<body>

  <section>
    <h1>Smooth Scrolling</h1>
    <p>Experience buttery smooth scrolling with Lenis.</p>
  </section>
  
  <section>
    <h1>GSAP Integration</h1>
    <p>Scroll-triggered animations work seamlessly with Lenis.</p>
  </section>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
  <script src="https://unpkg.com/@studio-freight/lenis@1.0.42/dist/lenis.min.js"></script>
  
  <script>
    gsap.registerPlugin(ScrollTrigger);
    
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true
    });
    
    // RAF loop
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    
    // Sync with GSAP
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
    
    // Animations
    gsap.utils.toArray('h1, p').forEach((el, i) => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });
    });
  </script>
</body>
</html>
```

---

## 8. Resources and References

### 8.1 Official Documentation

- [GSAP Documentation](https://gsap.com/docs/)
- [GSAP ScrollTrigger](https://gsap.com/docs/ScrollTrigger/)
- [Lenis Documentation](https://github.com/studio-freight/lenis)
- [Three.js Documentation](https://threejs.org/docs/)

### 8.2 Learning Platforms

- [GSAP Learning Center](https://gsap.com/learn/)
- [CSS Tricks - Animation](https://css-tricks.com/tag/animation/)
- [MDN Web Docs - CSS Animations](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animations)

### 8.3 Inspiration Galleries

- [Awwwards Animation Category](https://awwwards.com/website-designs/?sort=rating&filter=animation)
- [Landing.love](https://landing.love/)
- [CSS Design Awards](https://cssdesignawards.com/)

### 8.4 Open Source Resources

- [Codrops](https://tympanus.net/codrops/)
- [FreeFrontend GSAP Examples](https://freefrontend.com/gsap/)
- [Aceternity UI](https://aceternity.com/)
- [Aniq-UI](https://aniq-ui.com/)

### 8.5 Performance Tools

- [Squoosh](https://squoosh.app/) - Image optimization
- [CloudConvert](https://cloudconvert.com/) - Format conversion
- [WebPageTest](https://webpagetest.org/) - Performance testing
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - Built-in performance audits

### 8.6 Required Library URLs

```json
{
  "gsap_core": "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js",
  "gsap_scrolltrigger": "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js",
  "lenis": "https://unpkg.com/@studio-freight/lenis@1.0.42/dist/lenis.min.js"
}
```

---

## Quick Reference Card

### Animation Decision Tree

```
Is it a simple hover/state change?
├── YES → Use CSS transition
└── NO ↓
Is it triggered by scroll?
├── YES → Use GSAP ScrollTrigger
└── NO ↓
Is it a sequenced timeline?
├── YES → Use GSAP Timeline
└── NO ↓
Is it 3D/immersive?
├── YES → Use Three.js
└── Use GSAP + CSS
```

### Property Performance Ranking

| Property | Performance | Recommendation |
|----------|-------------|----------------|
| `transform` | Excellent | Always use |
| `opacity` | Excellent | Always use |
| `filter` | Good | Use with caution |
| `background-color` | Medium | Avoid in animations |
| `width/height` | Poor | Never animate |

### Essential Tools Checklist

- [ ] GSAP Core + ScrollTrigger
- [ ] Lenis for smooth scroll
- [ ] Browser DevTools for debugging
- [ ] WebPageTest for performance
- [ ] prefers-reduced-motion CSS

---

*Document Version: 1.0*  
*Last Updated: July 2026*  
*Compatible with: GSAP 3.12+, Lenis 1.0+, All Modern Browsers*
