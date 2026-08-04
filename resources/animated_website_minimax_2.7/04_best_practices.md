# Animated Website Best Practices

## DO vs DON'T Comparison

| DO | DON'T |
|---|---|
| Animate `transform` and `opacity` | Animate `width`, `height`, `top`, `left`, `margin`, `padding` |
| Use `will-change: transform` for upcoming animations | Use `will-change` on too many elements or too early |
| Target 60 FPS (16.67ms per frame) | Accept lower frame rates or janky animations |
| Use `cubic-bezier()` easing curves | Use `linear` easing or `step-*` timing functions excessively |
| Enable GPU acceleration via `transform: translateZ(0)` | Force GPU with unnecessary 3D transforms |
| Use `requestAnimationFrame()` for JS animations | Use `setInterval()` or `setTimeout()` for animations |
| Respect `prefers-reduced-motion` media query | Ignore user motion preferences |
| Use `transform: translate()` instead of positional properties | Animate `left`/`top` to move elements |
| Compress images to WebP/AVIF formats | Use uncompressed PNGs/JPGs for animated backgrounds |
| Lazy load off-screen animations | Load all animations immediately on page load |
| Use CSS transitions for simple hover states | Use JavaScript for every micro-interaction |

---

## 1. Performance Rules

### The 60 FPS Target
Animations must achieve 60 frames per second. Each frame has only **16.67ms** to complete all work. If the main thread is blocked longer, users perceive stutter (jank).

### The Rendering Pipeline
Browsers process animations through four sequential steps:
1. **Style** — Calculate styles applying to elements
2. **Layout** — Generate geometry and position
3. **Paint** — Fill pixels for each element
4. **Composite** — Draw layers to screen

Changing properties that trigger earlier steps forces all subsequent steps to re-run. **Layout changes are most expensive; Composite changes are cheapest.**

### GPU-Accelerated Properties
Only two CSS properties run cheaply on the GPU compositor without involving the main thread:
- `transform` (translate, scale, rotate, skew)
- `opacity`

### Using `will-change`
`will-change` hints to the browser that an element will animate, promoting it to its own layer:

```css
.element {
  will-change: transform;
}
```

**Best practices:**
- Apply `will-change` just before animation starts
- Remove it after animation completes
- Don't apply to many elements simultaneously
- Never use it as a performance fix-all

### Hardware Acceleration Pattern
```css
.hw-accelerate {
  transform: translateZ(0);
  backface-visibility: hidden;
}
```

### JavaScript Animation Timing
```javascript
// CORRECT: Synced to display refresh
function animate() {
  requestAnimationFrame(animate);
}

// AVOID: Unreliable timing
setInterval(animate, 16);
```

---

## 2. Accessibility

### `prefers-reduced-motion` Media Query
Detects if user OS/browser preference is set to minimize animation.

**Browser Support:** Chrome 74+, Firefox 63+, Safari 10.1+, Edge 79+

```css
/* Disable all animations for preference */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

```javascript
// JavaScript detection
const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
mediaQuery.addEventListener('change', () => {
  // Stop or restart animations
});
```

### WCAG 2.3.3 (Level AAA)
Animation triggered by interaction must be disableable unless **essential** to functionality. Non-essential animations can cause vestibular disorders (dizziness, nausea, migraines).

### Touch Target Size
Maintain **minimum 44x44px** touch targets on mobile. Animations shouldn't interfere with tap accuracy.

### Motion Sickness Considerations
- Avoid parallax scrolling effects
- Don't animate background elements at different rates than foreground
- Provide clear opt-out controls for motion
- Never use infinite looping animations without user consent

---

## 3. What to AVOID

### Layout-Triggering Properties
Never animate these properties—they force expensive reflows:
- `width` / `height`
- `top` / `left` / `right` / `bottom`
- `margin` / `padding`
- `border-width`
- `font-size`
- `line-height`

**Why:** Changing layout properties recalculates geometry for the entire document tree.

### Paint-Triggering Properties
Animating these is costly even if they don't trigger layout:
- `background`
- `color`
- `box-shadow`
- `border-color`

### Excessive Timers and Intervals
- `setInterval` for animation loops (use `requestAnimationFrame`)
- Multiple simultaneous interval-based animations
- Timers firing more frequently than 60fps

### Infinite Loops Without Pause
Always provide:
- A pause/stop mechanism
- Respect for `prefers-reduced-motion`
- Battery-conscious implementations

### Overusing `will-change`
Creating too many layers exhausts GPU memory:
```css
/* BAD: Too many promoted layers */
.bad-example > * {
  will-change: transform;
}
```

### Complex JavaScript in Animation Frames
Keep animation callbacks minimal. Offload heavy computation to Web Workers.

### Auto-playing Heavy Media
- Autoplay videos or animated backgrounds
- Large GIFs (>1MB)
- Unoptimized canvas animations

---

## 4. What to USE

### High-Performance Animation Properties
```css
/* BEST: GPU-composited properties */
.good {
  transform: translateX(100px);
  transform: scale(1.1);
  transform: rotate(45deg);
  opacity: 0.5;
}
```

### `cubic-bezier()` Easing
Predefined curves for natural motion:

| Easing | Use Case |
|--------|----------|
| `cubic-bezier(0.25, 1, 0.5, 1)` | Smooth deceleration (hover exits) |
| `cubic-bezier(0.4, 0, 0.2, 1)` | Standard ease (most interactions) |
| `cubic-bezier(0, 0, 0.2, 1)` | Smooth acceleration (hover enters) |
| `cubic-bezier(0.68, -0.55, 0.27, 1.55)` | Elastic overshoot (playful feedback) |

### CSS Transitions vs Animations
- **Transitions:** State changes (hover, focus, active)
- **Animations:** Loops, sequences, complex choreography

### Libraries for Complex Animations
- **GSAP (GreenSock):** Industry standard for scroll-driven timelines, thousands of simultaneous objects
- **Framer Motion:** React declarative animations
- **Anime.js:** Lightweight alternative
- **Lenis:** Smooth scroll with momentum

### Layer Promotion for Complex Animations
```css
.composited-layer {
  transform: translateZ(0);
  will-change: transform;
}
```

### Responsive Animation Strategies
```javascript
// GSAP matchMedia example
let mm = gsap.matchMedia();
mm.add("(min-width: 769px)", () => {
  // Desktop: full animations
  return () => { /* cleanup */ };
});
mm.add("(max-width: 768px)", () => {
  // Mobile: simplified animations
});
```

---

## 5. Mobile Considerations

### Performance Constraints
- Lower CPU/GPU capability than desktop
- Limited battery life
- Touch-first interaction model

### Viewport and Resize Handling
- Use `pointer: coarse` media query to detect touch devices
- Hide custom cursors on touch devices
- Disable hover-only effects on mobile

```css
@media (pointer: coarse) {
  .custom-cursor { display: none; }
}
```

### Scroll-Driven Animations on Mobile
- Use `IntersectionObserver` instead of scroll position calculations
- Throttle scroll listeners (use `passive: true`)
- Avoid scroll hijacking unless essential

### Image Optimization
```html
<picture>
  <source media="(min-width: 1024px)" srcset="hero-desktop.avif" type="image/avif">
  <source media="(min-width: 768px)" srcset="hero-tablet.webp" type="image/webp">
  <img src="hero-mobile.webp" loading="lazy" decoding="async" width="400" height="600">
</picture>
```

### Preloaders for Mobile
- Essential when on slow connections
- Never hardcode `setTimeout` delays—use `window.load` event
- Keep preloader assets minimal (inline SVG, system fonts)

---

## 6. SEO Implications

### Search Engine Crawling
- JavaScript-rendered animations are crawlable by modern bots
- Ensure content is accessible without CSS/JS enabled
- Don't hide content behind animations users must wait for

### Core Web Vitals Impact

| Vital | Animation Impact |
|-------|------------------|
| **INP** (Interaction to Next Paint) | Heavy JS animations block main thread, increasing INP |
| **LCP** (Largest Contentful Paint) | Large animated backgrounds delay LCP |
| **CLS** (Cumulative Layout Shift) | Animating `width`/`height` causes layout shifts |

### Best Practices for SEO
- Lazy-load below-fold animations
- Preload critical fonts and hero images
- Avoid CLS: always set explicit `width`/`height` on animated elements
- Keep Total Blocking Time (TBT) low by minimizing main thread work

### Meta Tags for Social Sharing
```html
<meta property="og:image" content="https://example.com/meta-preview.png">
<meta property="twitter:card" content="summary_large_image">
```

---

## 7. User Experience Principles

### Purpose
Every animation should serve a purpose:
- **Guide attention** — Direct to CTAs or important info
- **Confirm actions** — Visual feedback on interaction
- **Provide context** — Show spatial relationships
- **Express personality** — Brand identity (use sparingly)

### Duration Guidelines
| Animation Type | Duration |
|----------------|----------|
| Micro-interactions (button hover) | 100-200ms |
| UI state transitions | 200-300ms |
| Page element reveals | 300-500ms |
| Large component transitions | 400-700ms |
| Page transitions | 300-500ms |

### Motion Design Principles
1. **Stagger** — Sequential reveals feel more organized
2. **Easing** — Never linear; use curves for natural feel
3. **Hierarchy** — Animate important elements first
4. **Consistency** — Use same easing curves throughout
5. **Reversibility** — Exit animations should mirror entry

### Loading States
- Skeleton screens over spinners when possible
- Progress indicators for known-duration tasks
- Meaningful loading text ("Loading your cart...")

### Accessibility-First UX
- Always provide `prefers-reduced-motion` alternative
- Don't rely solely on animation for critical information
- Include visible focus states (not just animated ones)
- Test with screen readers

---

## Quick Reference Checklist

### Before Animation Implementation
- [ ] Identify which properties trigger layout/paint/composite
- [ ] Test on low-end devices
- [ ] Enable `prefers-reduced-motion` support
- [ ] Set explicit dimensions to prevent CLS
- [ ] Optimize all image assets (WebP/AVIF)

### During Development
- [ ] Use Chrome DevTools Performance panel
- [ ] Monitor FPS in animation loops
- [ ] Test on actual mobile devices
- [ ] Keep animation callbacks under 16ms

### Pre-Launch
- [ ] Lighthouse performance audit
- [ ] Core Web Vitals assessment
- [ ] Accessibility audit (axe, WAVE)
- [ ] Test with reduced motion enabled
- [ ] Verify social sharing meta tags

---

## Sources

- [web.dev: Why are some animations slow?](https://web.dev/articles/animations-overview)
- [web.dev: prefers-reduced-motion](https://web.dev/articles/prefers-reduced-motion)
- [MDN: How browsers work](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/How_browsers_work)
- [W3C WCAG: Animation from Interactions](https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html)
- [GSAP Documentation](https://gsap.com/docs)
- [MDN: CSS animations guide](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Animations/Using)
