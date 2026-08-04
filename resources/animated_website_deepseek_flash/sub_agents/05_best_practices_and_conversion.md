# TOPIC 5: What to AVOID vs What to USE in Animated Websites

## Overview

Animation on the web is a delicate balance between delight and performance. The browser rendering pipeline has three stages: **Layout → Paint → Composite**. Knowing which properties trigger which stage is the foundation of all animation best practices.

```
Layout (reflow)  ──>  Paint (repaint)  ──>  Composite (layers)
   ↑                    ↑                       ↑
   worst               medium                  best
```

---

## What to AVOID — Anti-patterns

### 1. Animating Layout Properties (width, height, top, left, margin, padding)

**Why it's bad:** Layout-triggering properties force the browser to recalculate the position/size of every descendant, then every sibling, then re-paint and re-composite. A single `width` animation on one element can cascade through the entire DOM — O(n) reflow cost per frame.

**Covered by:** `left`, `right`, `top`, `bottom`, `width`, `height`, `padding`, `margin`, `border-width`, `font-size`, `line-height`, `min-height`, `flex-basis`, `grid-template-rows/columns`.

**How bad?** A `left: 0 → 500px` animation over 1s at 60fps triggers 60 full layout recalculations. On a page with 2000 DOM nodes, that's ~120,000 layout operations per second.

**Replace with:** `transform: translateX()` — GPU-composited, touches no layout.

### 2. Excessive Jank-Causing Properties (box-shadow, filter on large elements)

**Why it's bad:**
- `box-shadow` — painting cost grows with blur radius × element size. A 50px blur on a 1000×800 hero image is ~40,000 shadow-pixel evaluations per frame. The browser also paints the shadow offscreen, expanding the paint rect.
- `filter: blur()` / `drop-shadow()` — pixel-shader operations applied to the entire element's rasterized texture. On a full-viewport element, this is a GPU-bound full-screen fragment shader that can easily blow the 16ms frame budget on integrated GPUs.
- `border-radius` + `clip-path` — forces CPU-side pre-paint tessellation.

**Replace with:** Pre-rendered shadow PNGs, `filter` sparingly on small elements (< 200×200px), or box-shadow on pseudo-elements with `will-change: transform` to promote them to a compositor layer.

### 3. Blocking the Main Thread During Scroll/Animations

**Why it's bad:** The main thread handles JavaScript execution, style calculation, layout, and paint. A 200ms JS task (e.g., complex array mapping, JSON.parse of a large response) blocks ALL of these. The browser cannot even begin a frame until the task completes. The result: dropped frames, visible as stutter/jank.

**Common culprits:**
- Heavy scroll event listeners
- Synchronous layout queries (`el.offsetHeight`, `getComputedStyle()`) inside rAF loops — forces forced synchronous layout (layout thrash)
- Long-running `forEach`/`map` on scroll
- Unthrottled ResizeObserver callbacks

**How bad?** At 60fps, the browser has 16.6ms per frame. A 50ms scroll handler leaves negative 33.4ms for the rest of the pipeline — two guaranteed dropped frames.

**Replace with:**
- Move work to **Web Workers** for data processing
- Use `passive: true` on scroll listeners
- Batch style reads/writes (avoid forced reflow)
- Use `IntersectionObserver` instead of scroll listeners where possible

### 4. Ignoring `prefers-reduced-motion`

**Why it's bad:** Vestibular disorders affect 35-40% of adults over 40. Parallax, zoom, and rapid entrances/displacements can trigger nausea, dizziness, and migraine episodes. WCAG 2.1 Success Criterion 2.3.3 (Animation from Interactions) requires a motion-reduced mode.

**Legal risk:** ADA/WCAG lawsuits related to motion sensitivity are rising. In 2023, multiple class-action suits cited "uncontrolled animation triggering vestibular episodes."

**Replace with:**
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```
And provide a **manual toggle** in the UI for users who haven't set the system preference.

### 5. Autoplay Audio/Video

**Why it's bad:** Browsers (Chrome 66+, Safari 11+, Firefox 66+) block autoplay of any audible media. `muted` autoplay works for video but not audio. Users despise unexpected sound — it's the #1 reason for immediate tab closure.

**The reality:** Even muted autoplay can trigger "heavy autoplay" policies on some mobile browsers. And autoplay video on mobile data plans is expensive.

**Replace with:** Click-to-play overlays, or muted autoplay with clear visual "unmute" controls. Use `<video playsinline muted autoplay>` for hero backgrounds (this is the only widely-allowed pattern).

### 6. Arbitrary Timeouts (`setTimeout` for Loading/Animations)

**Why it's bad:**
- **Race conditions:** A 5000ms timeout for a loading spinner may fire before or after assets load depending on network speed. The result: spinner disappears while content is still loading, or spinner never shows because it fires post-load.
- **No latency compensation:** `setTimeout(fn, 1000)` guarantees *at least* 1000ms, but in a background tab, browsers clamp it to 1000ms+.
- **Battery:** setTimeout keeps the CPU awake even in background.

**Replace with:**
- `Promise`-based loading sequences: `Promise.all([imgLoaded, fontLoaded, ...]).then(showContent)`
- `requestAnimationFrame` for frame-synced animation
- CSS `animation-delay` and `transition-delay` (can be paused by the browser)

### 7. Too Many Simultaneous Animations

**Why it's bad:**
- **GPU overdraw:** Each composited layer consumes GPU memory. 50 simultaneous particle sprites on separate layers can exhaust the texture-buffer limit on mobile GPUs.
- **CPU scheduling:** The browser's animation frame scheduler must process every active animation's timing curve each frame. 200 simultaneous CSS animations = 200 style recalcs per frame.
- **Battery:** GPU active at high clock rate drains battery 2-3× faster than idle.

**Rule of thumb:** The browser can comfortably composite ~8-12 independent layers at 60fps. Beyond that, batch or pool.

**Replace with:**
- Animation pooling (recycle elements instead of spawning)
- Canvas 2D for particle systems (single element, single layer)
- Stagger/sequence animations instead of parallel

### 8. Unoptimized Images (Large PNG/JPG Backgrounds)

**Why it's bad:**
- **Decode cost:** A 4000×3000px PNG (24MB) takes ~150ms to decode on a mid-range phone. During animation, any new image that enters the viewport triggers a decode on the main thread, dropping frames.
- **Memory:** A decoded RGBA 4000×3000 image occupies 48MB of GPU memory. Two such backgrounds = 96MB — close to the browser's per-tab GPU memory limit on 2GB-RAM devices.
- **Texture upload:** Each frame that composits the image re-uploads it to the GPU if the layer changes.

**Replace with:**
- WebP (lossy: 25-35% smaller than JPEG; lossless: 26% smaller than PNG)
- AVIF (50% smaller than JPEG at same quality)
- Responsive images: `<picture>` with `<source srcset>` for device-appropriate sizes
- Never use 4000px-wide images for 1440px viewports — max texture size your target supports

### 9. No Loading State for Heavy 3D/WebGL Content

**Why it's bad:**
- **Cold start:** Three.js initialization (scene setup, shader compilation, texture upload) can take 1-3s on low-end devices. During this time, the browser is completely unresponsive.
- **Download size:** A 5MB 3D model triggers a long download, and without a loading bar, users think the site is broken.
- **WebGL context loss:** On some mobile browsers, if the GPU doesn't respond within 30s, the context is lost and the element becomes blank.

**Replace with:**
- Always show at least a skeleton screen + progress bar for WebGL scenes
- Use `THREE.DefaultLoadingManager` for progress tracking
- Fallback to static image if WebGL fails or `matchMedia('(prefers-reduced-data: reduce)')`

### 10. Ignoring Mobile — Mouse-Only Interactions

**Why it's bad:**
- **No hover on touch:** `:hover`-triggered animations have no equivalent on touch devices. The animation fires on `touchstart`, then immediately on `touchend`, producing a flicker.
- **Sticky hover:** Elements that change on hover and stay changed are "sticky" on mobile — the previous tap state persists.
- **Parallax on scroll:** `DeviceOrientationEvent`-based parallax is erratic on mobile as users tilt while walking.

**Replace with:**
- Use `pointer: coarse` media query to detect touch and provide tap equivalents:
```css
@media (pointer: coarse) {
  .hover-reveal { opacity: 1; } /* always visible on touch */
}
```
- Parallax: reduce intensity on mobile or replace with static layout

### 11. Missing Touch Targets (< 44×44px)

**Why it's bad:** Apple's HIG and Material Design both specify 44×44pt as minimum touch target. Smaller targets cause:
- 20-30% increased error rate on taps
- Frequent "tap-adjacent-element" frustration
- WCAG 2.5.5 (Target Size) failure

**During animation:** An animated element that shrinks or moves may momentarily have an effective hit area smaller than the visual target. The browser still registers the pointer at the element's layout position.

**Replace with:**
- Always set `min-width: 44px; min-height: 44px` on interactive elements
- Use `padding` to enlarge hit area without visual size:
```css
.button { min-width: 44px; min-height: 44px; }
.button::before { content: ''; position: absolute; inset: -8px; } /* extends hit area */
```

### 12. Scroll-Jacking (Overriding Native Scroll Without Fallback)

**Why it's bad:**
- **Accessibility:** Screen readers, keyboard navigation (spacebar, Page Up/Down), and mouse wheel smooth-scroll are all broken.
- **User expectation broken:** Users have 20+ years of muscle memory for scroll behavior. Custom scrolling that deviates feels broken.
- **Touch conflict:** Custom scroll handlers often conflict with touch gestures (pull-to-refresh, swipe back).

**If you MUST:** Provide at minimum:
- Keyboard fallback (arrow keys, spacebar, PageUp/PageDown)
- `prefers-reduced-motion: reduce` → native scroll
- Touch-action CSS (no pull-to-refresh for horizontal scroll)
- Visible scrollbar or progress indicator

### 13. Unnecessary Libraries (300KB Three.js for a Fade-in)

**Why it's bad:**
- **Parse/compile cost:** 300KB of JS takes ~50-100ms to parse on mobile, 2-5ms to compile. That's on the critical path.
- **Bundle bloat:** Every KB of unused library code is less budget for real content.
- **Security surface:** Every dependency is a potential supply-chain vector.

**Replace with:**
- CSS animations/transitions for simple effects (fade, slide, bounce)
- A tiny library like `animate.css` (~9KB) for pre-built CSS animations
- `IntersectionObserver` (native) instead of GSAP for simple scroll reveals
- Only use Three.js / GSAP / Lottie when the effect genuinely requires them

### 14. Not Testing on Low-End Devices

**Why it's bad:** The flagship Pixel 9 renders 3× more animation frames per second than a Moto G Power (2019). If you test only on a MacBook M3, your site will likely be 100% broken on the 40% of users on mid-to-low-end devices.

**Key metrics to test:**
- 60fps on a device ≤ $200 (Moto G, Redmi Note, Galaxy A series)
- 30fps minimum absolute floor
- GPU memory under 128MB texture budget
- CPU: no >10ms frame stalls

**Method:** Chrome DevTools → Performance → "CPU throttling" 6× slowdown, "Network" → "Slow 3G".

### 15. Animating on Resize Loops Without Debouncing

**Why it's bad:** The `resize` event fires at ~30-60 events per second during window drag. If each event triggers a repositioning animation, you get:
- Layout thrash (every handler reads layout, writes, reads again)
- 30-60 recalculation cycles per second while the user hasn't even stopped resizing
- Possible infinite loop: resize → animation callback → layout change → resize event

**Replace with:**
```js
let resizeTimeout;
window.addEventListener('resize', () => {
  cancelAnimationFrame(resizeTimeout);
  resizeTimeout = requestAnimationFrame(() => {
    // animation setup here — runs once per resize pause
  });
});
```

---

## What to USE — Best Practices

### 1. `transform` and `opacity` Only

**Why it's best:** These two properties are the only ones that go through the **compositor thread** — avoiding both layout and paint. The browser promotes the element to its own GPU texture layer (a "compositor layer"), and the GPU simply repositions/blends textures. No CPU-side work.

**How it works:**
- `transform: translateX(Npx)` — moves the layer's GPU texture (no layout recalc)
- `transform: scale(N)` — scales the rasterized texture (no layout recalc)
- `transform: rotate(Ndeg)` — rotates the texture (no layout recalc)
- `opacity: 0 → 1` — adjusts alpha blend of the layer (no layout, no paint)

**Performance:**
- Layout animation: ~5-15ms per frame on complex pages
- Transform animation: ~0.1-0.3ms per frame (40-150× faster)
- Battery: GPU compositing vs CPU layout = ~1/3 the power draw

**Live by this rule:** If it moves, it should use `transform` and/or `opacity`.

### 2. `will-change` Property — Proper Usage

**Why it's best:** `will-change: transform` tells the browser to create a compositor layer for the element before the animation starts, avoiding the "layer creation jank" on the first frame.

**Proper usage:**
```css
.el {
  will-change: transform;
  /* element is now in its own compositor layer */
}
.el:hover { transform: scale(1.2); transition: transform 0.3s; }
```

**Critical caveats:**
- Apply `will-change` *before* animation, remove *after*:
```css
.el { will-change: transform; } /* on parent/hover container */
.el:not(:hover) { will-change: auto; }
```
- `will-change: transform, opacity` creates **two** compositor layers (bad)
- `will-change: all` creates a separate layer for every property — massive memory waste
- **Never** apply `will-change` to 20+ elements simultaneously — each is a separate GPU layer

**When to use:**
- Elements that animate on interaction (hover cards, modals, toggles)
- Sticky/fixed elements that move on scroll
- Elements with CSS filters that change
- Do NOT use on static elements or for "performance insurance"

### 3. CSS Containment (`contain: layout style paint`)

**Why it's best:** `contain` tells the browser that this element's subtree is independent — changes inside it don't affect the rest of the page. This creates a "layout boundary" that stops reflow propagation.

**Values:**
- `contain: layout` — no layout effects escape this subtree
- `contain: style` — counter/inherit changes don't escape
- `contain: paint` — clipping bounds, no paint outside
- `contain: size` — element's size is known regardless of children
- `contain: strict` = `layout style paint size` (all four)

**Usage:**
```css
.card {
  contain: layout style paint;
}
```
On a 2000-node page, `contain: layout` on each card reduces the reflow cost of a card's internal animation from O(2000) to O(<card-descendants>).

### 4. `content-visibility: auto`

**Why it's best:** Automatically skips rendering (layout + paint + compositing) for offscreen elements. When the element nears the viewport, the browser renders it. This is essentially automatic virtual-scrolling.

**Performance gain:**
- A 5000-item scrollable list with `content-visibility: auto` paints ~20-30 items at a time
- Render time: 200ms without, 12ms with (16× improvement)
- Scroll performance: 45fps without, 60fps with

**Usage:**
```css
.lazy-section {
  content-visibility: auto;
  contain: layout style paint; /* required by spec */
}
```

**Caveat:** `content-visibility: auto` gives the element `contain: size` implicitly, so the element has **zero height** until rendered. Always set `contain-intrinsic-size: <estimated-height>` to reserve space:
```css
.lazy-section {
  content-visibility: auto;
  contain-intrinsic-size: 600px; /* reserve 600px to prevent CLS */
}
```

### 5. Intersection Observer for Scroll-Triggered Loads

**Why it's best:** `IntersectionObserver` fires a callback when an element enters the viewport — natively, with no scroll event listeners, no layout queries, and no main-thread polling. The browser's compositor thread handles the intersection check as a side effect of frame compositing — zero layout cost.

**Performance vs scroll listener:**
- 100 scroll listeners on a page: ~15ms per frame
- 100 IntersectionObservers: ~0.5ms per frame (30× less)

**Usage pattern:**
```js
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // one-shot
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
```

### 6. Lazy Loading (`loading="lazy"`, `decoding="async"`)

**Why it's best:** `loading="lazy"` defers image/iframe loading until the element nears the viewport. `decoding="async"` decodes the image off the main thread.

**Usage:**
```html
<img src="hero.webp" loading="lazy" decoding="async" alt="..." />
<iframe src="map.html" loading="lazy"></iframe>
```

**Performance:**
- Lazy offscreen images: 40-60% less initial page weight
- `decoding="async"`: decode time moves from critical path to off-thread, saving ~50-200ms of main-thread blocking per image

**Caveat:** Do NOT lazy-load the above-the-fold hero image — it delays LCP. Lazy-load images below ~1000px from viewport.

### 7. Next-Gen Image Formats (WebP, AVIF)

**Why it's best:**
- **WebP:** 25-35% smaller than JPEG at same quality, supports transparency (vs PNG = 26% smaller), supports animation (vs GIF = 64% smaller)
- **AVIF:** 50% smaller than JPEG at same quality, supports HDR, 12-bit color, transparency, animation. Chromium 108+, Firefox 93+, Safari 16.5+

**Format comparison (typical hero image):**

| Format | Size | Decode time (mobile) |
|--------|------|---------------------|
| JPEG (Q80) | 240KB | 45ms |
| PNG-24 | 800KB | 80ms |
| WebP (Q80) | 160KB | 35ms |
| AVIF (Q50) | 85KB | 60ms |

**Usage:**
```html
<picture>
  <source srcset="hero.avif" type="image/avif">
  <source srcset="hero.webp" type="image/webp">
  <img src="hero.jpg" alt="...">
</picture>
```

### 8. CDNs for Libraries (jsdelivr, unpkg, cdnjs)

**Why it's best:**
- **Edge caching:** jsDelivr has 750+ POPs worldwide — users download from nearest server
- **HTTP/2 + Brotli:** ~20% smaller than gzip
- **Cache sharing:** If user visited another site using the same CDN+version, the script is already in browser cache
- **Subresource Integrity:** `crossorigin="anonymous"` + `integrity="sha384-..."` prevents CDN compromise

**Usage:**
```html
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12/dist/gsap.min.js"
        integrity="sha384-..." crossorigin="anonymous"></script>
```

**Caveat:** Module/nomodule CDN delivery requires careful construction for ES modules. For modern builds, bundling is usually better.

### 9. Code Splitting — Dynamic Imports for Heavy Animation Libs

**Why it's best:** Loading 100KB of Three.js for a hero animation that runs after a click means the initial page load is 100KB lighter. Dynamic imports (`import()`) split the bundle.

**Pattern:**
```js
// Entry point: no animation libraries loaded
const heroButton = document.querySelector('.hero-cta');
heroButton.addEventListener('click', async () => {
  const { animateHero3D } = await import('./hero-3d.js');
  // Three.js is loaded ONLY on click
  animateHero3D();
});
```

**Webpack/Vite:** This generates a separate chunk (`hero-3d.[hash].js`) that's fetched on demand.

**Performance impact:**
- Critical bundle: 80KB (without Three.js) vs 380KB (with Three.js)
- First Contentful Paint: 0.9s vs 2.1s
- Time to Interactive: 1.2s vs 3.4s

### 10. `matchMedia` / `prefers-reduced-motion` — Responsive/Respectful Animations

**Why it's best:** JavaScript `matchMedia('(prefers-reduced-motion: reduce)')` allows dynamic control of JS-based animation libraries (GSAP, Three.js). CSS media query handles static animations.

**JS pattern:**
```js
const motionOK = window.matchMedia('(prefers-reduced-motion: no-preference)');
if (motionOK.matches) {
  // initialize GSAP/Three.js animations
}
motionOK.addEventListener('change', (e) => {
  if (!e.matches) {
    // disable animations, reset to static state
  }
});
```

**Responsive animation control:**
```js
const isMobile = window.matchMedia('(max-width: 768px)');
const isLowPower = window.matchMedia('(prefers-reduced-data: reduce)');

if (isMobile.matches || isLowPower.matches) {
  // drop parallax, reduce particle count, simplify transitions
}
```

### 11. Progressive Enhancement — Content First, Animation Second

**Why it's best:** The animation layer should never be required to access content. If Three.js fails to load, the user gets a static page with all information. If GSAP throws, the elements are already visible in their final state.

**Pattern:**
```html
<section class="hero">
  <h1 class="hero__title">Content</h1>
  <p class="hero__text">Description</p>
  <a class="hero__cta" href="/">Action</a>
</section>
```
```css
/* Base: visible, no animation */
.hero__title { opacity: 1; transform: none; }

/* Enhancement: animate in */
@media (prefers-reduced-motion: no-preference) {
  .hero__title {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s, transform 0.6s;
  }
  .hero__title.is-visible {
    opacity: 1;
    transform: translateY(0);
  }
}
```

**The key insight:** The page is fully usable without any animation. Animation is a layer on top, never a prerequisite.

### 12. 60 FPS Budget — Stay Under 16ms Per Frame

**Why it's best:** 60fps = 16.6ms per frame. The rendering pipeline breakdown:

| Phase | Budget |
|-------|--------|
| JavaScript | 5ms |
| Style recalc | 2ms |
| Layout | 2ms |
| Paint | 3ms |
| Composite | 1ms |
| Browser overhead | 3.6ms |
| **Total** | **16.6ms** |

If any phase exceeds its budget, frames drop. Use Chrome DevTools Performance panel to track.

**Budget per animation type:**
- CSS `transform` → ~0.3ms (mostly composite)
- CSS `opacity` → ~0.2ms
- JS rAF loop → must complete all work within remaining budget after style+layout+paint

**Practical limit:** A page with 6 animation layers at 0.3ms each = 1.8ms composite time. Remaining 14.8ms for other work. With 20 layers = 6ms composite. Tighter but still okay. With 50 layers = 15ms composite = 1.6ms for everything else = guaranteed frame drops.

### 13. `requestAnimationFrame` — For Custom Animation Loops

**Why it's best:** Unlike `setInterval(fn, 16)` (which fires regardless of visibility, tab state, or browser readiness), `requestAnimationFrame`:
- Fires exactly once per browser frame — perfectly synced with v-sync
- Pauses when tab is hidden — zero CPU/battery waste
- Receives a timestamp for time-based animation (no `Date.now()` drift)

**Pattern:**
```js
function animate(timestamp) {
  const progress = (timestamp - startTime) / duration;
  if (progress < 1) {
    element.style.transform = `translateX(${easeInOut(progress) * 500}px)`;
    requestAnimationFrame(animate);
  }
}
const startTime = performance.now();
requestAnimationFrame(animate);
```

**Do NOT:**
- Use `setInterval` for animation (it's not v-sync aligned)
- Use `Date.now()` inside rAF (use the timestamp argument)
- Schedule a new rAF before completing work (creates queue buildup)

### 14. Lighthouse CI — Performance Budgeting in CI/CD

**Why it's best:** Prevents animation-related performance regressions from reaching production. A single heavy animation library being added drops the Performance score by 10-15 points.

**CI integration:**
```json
// .lighthouserc.json
{
  "ci": {
    "assert": {
      "assertions": {
        "total-byte-weight": ["error", { "maxNumericValue": 1800000 }],
        "offscreen-images": ["error"],
        "unused-javascript": ["warn"],
        "uses-responsive-images": ["error"],
        "uses-webp-images": ["error"],
        "bootup-time": ["error", { "maxNumericValue": 1000 }]
      }
    }
  }
}
```

**Key animation-related Lighthouse audits:**
- `total-blocking-time` — JS execution during animation
- `cumulative-layout-shift` — avoid layout-animated elements
- `largest-contentful-paint` — hero animation shouldn't delay hero text
- `interactive` — heavy animation libraries delay TTI

### 15. CSS `@media (prefers-reduced-motion: reduce)` as Default

**Why it's best:** Animations-off by default, animation-on by preference. This is the safer, more accessible approach. It also automatically handles browsers that don't support the media query — they get the static version.

**Pattern:**
```css
/* DEFAULT: no motion */
* { animation: none !important; transition: none !important; }

/* ENHANCEMENT: motion for those who prefer it */
@media (prefers-reduced-motion: no-preference) {
  * { animation: revert; transition: revert; }
  .fade-in { animation: fadeIn 0.6s ease; }
}
```

This pattern ensures that any browser, any user, gets a functional page. Animation is always an opt-in enhancement.

---

# TOPIC 6: Converting a Normal Static Website to an Animated Website

## Overview

Converting a static site to an animated one is a **layered process** that benefits from the anti-patterns and best practices established in Topic 5. The core principle: **never break what works.** Each animation addition must be independently testable, reversible, and performance-budgeted.

---

## Phase 1: Audit the Existing Site

### 1.1 Performance Baseline

Before adding ANY animation, capture these metrics:

**Lighthouse (Desktop + Mobile):**
- Performance score
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Cumulative Layout Shift (CLS)
- Total Blocking Time (TBT)
- Speed Index

**Frame-rate audit:**
```js
// Paste into DevTools console — watch for jank
let frameCount = 0, lastTime = performance.now();
function countFrames() {
  frameCount++;
  if (performance.now() - lastTime >= 1000) {
    console.log(`FPS: ${frameCount}`);
    frameCount = 0;
    lastTime = performance.now();
  }
  requestAnimationFrame(countFrames);
}
requestAnimationFrame(countFrames);
```

**Asset audit:**
- List all images (format, dimensions, file size)
- List all JS bundles (size, parse time)
- List all fonts (weight variants, subsetting)
- List all third-party scripts (heavy analytics, ads, widgets)

### 1.2 Content Inventory — What to Animate

Categorize every visual element on the page:

| Category | Examples | Animation potential |
|----------|----------|-------------------|
| Hero | Headline, sub-text, CTA, background | High — sets first impression |
| Navigation | Logo, links, hamburger, dropdowns | Medium — micro-interactions |
| Cards | Feature cards, team, pricing | Medium — scroll reveals |
| CTAs | Buttons, links, forms | High — hover, focus states |
| Sections | About, stats, testimonials, footer | Low-Medium — scroll entries |
| Decorative | Backgrounds, dividers, icons | High — parallax, particles |
| Loading state | Spinner, skeleton, splash | High — first meaningful paint |

### 1.3 Identify Key Moments

The moments where animation adds the most value:

1. **Page load** — hero entrance sequence (first 2 seconds)
2. **Scroll** — section entries, parallax shifts, scroll progress indicators
3. **Interaction** — hover, focus, active, click, tap responses
4. **Transition** — page-to-page, modal open/close, menu expand/collapse
5. **Loading** — skeleton screens, progress bars, content reveal

---

## Phase 2: Strategy — Which Animation Level Is Right?

### Level 1: Minimal (Recommended for: content sites, blogs, docs, e-commerce)

**Includes:**
- CSS `transition` on hover/focus for buttons, links, cards (0.2-0.3s)
- One or two scroll-reveal `opacity`+`transform` animations
- Smooth `scroll-behavior: smooth`

**Effort:** 1-2 days
**JS added:** ~0KB (CSS only)
**Performance impact:** Negligible (<1% Lighthouse change)
**Risk:** Very low

### Level 2: Medium (Recommended for: marketing sites, portfolios, SaaS landing pages)

**Includes:**
- All Level 1
- GSAP ScrollTrigger for sequenced entry animations
- Staggered reveal on card grids
- Sticky header with hide-on-scroll
- Lottie for logo or hero illustration
- Page transition overlay (if SPA)
- Parallax scroll on hero background (subtle, <20% movement)

**Effort:** 3-7 days
**JS added:** ~30-60KB (GSAP + ScrollTrigger or Motion One)
**Performance impact:** Light (+5-15ms TBT, minimal CLS)
**Risk:** Low-Medium

### Level 3: Full (Recommended for: experiential/campaign sites, creative agencies, game-like UIs)

**Includes:**
- All Level 2
- Three.js 3D scene in hero (model, particles, shader effects)
- Custom cursor with magnetic followers
- Full-viewport horizontal scroll sections
- Canvas-based particle system on background
- Audio-reactive visualizations
- WebGL transitions between sections

**Effort:** 2-6 weeks
**JS added:** ~150-500KB (Three.js + GSAP + custom GLSL)
**Performance impact:** Significant (requires aggressive optimization)
**Risk:** High — requires fallbacks, mobile tuning, performance budgeting

### Decision Matrix

| Site type | Recommended level | Reason |
|-----------|-----------------|--------|
| Corporate brochure | Minimal | Trust > flash |
| Blog/content | Minimal | Readability first |
| E-commerce product | Minimal-Medium | CTAs benefit from micro-interactions |
| Portfolio/agency | Medium | Showcasing creative capability |
| SaaS landing | Medium | Conversion-focused |
| Campaign/event | Full | Experiential, short session |
| Game/creative | Full | Users expect immersion |

---

## Phase 3: Implementation Approach

### 3.1 Add One Animation Type at a Time

Conversion order (lowest risk → highest risk):

1. CSS micro-interactions (hover, focus, active states)
2. CSS entrance animations (fade-in on load)
3. CSS scroll-reveal (IntersectionObserver + class toggle)
4. Smooth scroll (`scroll-behavior: smooth`)
5. GSAP ScrollTrigger (medium complexity)
6. Parallax (pixel intensity, not transform %)
7. Custom cursor + followers
8. Page transitions (SPA)
9. Canvas/WebGL (particles, 3D scenes)

**Rule:** Complete and test each step before moving to the next. If step 3 drops 10 Lighthouse points, do not proceed to step 4.

### 3.2 Start with CSS Micro-Interactions (Lowest Risk)

**Conversion pattern:**
```css
/* BEFORE */
.button {
  background: #0070f3;
  color: white;
}

/* AFTER */
.button {
  background: #0070f3;
  color: white;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
}
.button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  background: #0051a2;
}
```

**Validation:** The static button still works identically. Users on touch devices get the same tap behavior (hover transitions should be wrapped in `@media (hover: hover)` to avoid sticky hover on mobile).

### 3.3 Layer JS Animations Progressively

**Conversion pattern:** CSS → JS enhancement

```css
/* BASE — always visible, no animation dependency */
.hero__content { opacity: 1; }

/* ENHANCEMENT — CSS handles simple case */
@media (prefers-reduced-motion: no-preference) {
  .hero__content { opacity: 0; transition: opacity 0.6s; }
  .hero__content.is-visible { opacity: 1; }
}

/* ADVANCED ENHANCEMENT — GSAP handles sequenced, staggered entrance */
/* Only loaded if IntersectionObserver observes the element AND prefers-reduced-motion is no-preference */
```

### 3.4 Always Test Performance After Each Addition

**Checklist after each animation type:**
- [ ] Lighthouse performance score change (should not drop >5 points)
- [ ] No new CLS from animated elements
- [ ] FPS stays above 55fps on desktop, 30fps on mobile
- [ ] prefers-reduced-motion works (no motion)
- [ ] Touch behavior unaffected
- [ ] No layout shift on initial paint (animated elements start at their final dimensions)

---

## Phase 4: Technical Conversion Patterns

### 4.1 Static Hero → Animated Hero

**BEFORE — Static HTML/CSS:**
```html
<section class="hero">
  <div class="hero__bg"></div>
  <div class="hero__content">
    <h1>Welcome</h1>
    <p>Description</p>
    <a href="/" class="cta">Get started</a>
  </div>
</section>
```
```css
.hero { position: relative; height: 100vh; }
.hero__bg {
  position: absolute; inset: 0;
  background: url('hero.jpg') center/cover;
}
.hero__content {
  position: relative; z-index: 1;
  text-align: center; padding-top: 20vh;
}
```

**AFTER — Animated:**
```css
/* Background: subtle scale-up on load + parallax on scroll */
.hero__bg {
  position: absolute; inset: 0;
  background: url('hero.webp') center/cover;
  will-change: transform;
  transform: scale(1);
  transition: transform 0.1s linear; /* or rAF-driven update */
}

/* Content: staggered entrance */
.hero__content > * {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}
.hero.loaded .hero__content > * {
  opacity: 1;
  transform: translateY(0);
}
.hero.loaded h1 { transition-delay: 0.1s; }
.hero.loaded p  { transition-delay: 0.3s; }
.hero.loaded .cta { transition-delay: 0.5s; }

/* Subtle floating animation on CTA */
@keyframes gentle-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}
.cta {
  animation: gentle-float 3s ease-in-out infinite;
  animation-delay: 1.5s;
}
```

**Key conversion rules for hero:**
1. Background image → WebP/AVIF for smaller decode
2. Static image → CSS `transform: scale(1.05)` with parallax on scroll
3. Headline appears instantly → staggered fade-in-up sequence
4. Static CTA → gentle floating pulse to draw attention
5. Add loading class via JS after font+hero image loaded

### 4.2 Scroll-Triggered Reveals

**BEFORE:**
```html
<section class="features">
  <div class="feature-card">...</div>
  <div class="feature-card">...</div>
  <div class="feature-card">...</div>
</section>
```
```css
.feature-card { opacity: 1; transform: none; }
```

**AFTER:**
```css
.feature-card {
  opacity: 1; /* visible by default — progressive enhancement */
  transform: none;
}
@media (prefers-reduced-motion: no-preference) {
  .feature-card {
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  .feature-card.is-visible {
    opacity: 1;
    transform: translateY(0);
  }
}
```
```js
const cards = document.querySelectorAll('.feature-card');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

cards.forEach(card => observer.observe(card));
```

**Staggered delay via CSS:**
```css
.feature-card:nth-child(1) { transition-delay: 0s; }
.feature-card:nth-child(2) { transition-delay: 0.1s; }
.feature-card:nth-child(3) { transition-delay: 0.2s; }
```

**Why this is safe:** The cards are visible without JS (no animation dependency). The IntersectionObserver just adds the `is-visible` class. If JS fails, the cards are already at `opacity: 1`.

### 4.3 Hover Effects on Existing Buttons/Cards

**BEFORE:**
```css
.card {
  background: white;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
```

**AFTER:**
```css
@media (hover: hover) and (prefers-reduced-motion: no-preference) {
  .card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    will-change: transform;
  }
  .card:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 8px 24px rgba(0,0,0,0.12);
  }
}
```

**Key:**
- `@media (hover: hover)` — only applies on devices that support hover (excludes touch)
- `will-change: transform` — promotes to compositor layer
- `transform` only — no layout recalc
- Duration 0.3s — fast enough to feel responsive, slow enough to see

### 4.4 Replacing Static Images with Animated Alternatives

**Conversion table:**

| Static asset | Animated alternative | When to use |
|-------------|-------------------|-------------|
| JPG hero photo | Cinemagraph (silent muted video) | Hero backgrounds |
| PNG icon | Lottie (.json) animation | Interactive icons, loaders |
| PNG illustration | SVG morphing animation | Accent graphics |
| GIF loading | CSS skeleton screen | Content loading |
| Static logo | Animated logo (CSS transforms) | Header, splash |
| Background image | CSS gradient with hue-rotate | Decorative sections |

**Image → Muted video conversion:**
```html
<!-- BEFORE -->
<div class="hero__bg" style="background: url('hero.jpg')"></div>

<!-- AFTER -->
<video class="hero__bg" autoplay muted loop playsinline
       poster="hero-poster.webp"
       preload="metadata">
  <source src="hero.webm" type="video/webm">
  <source src="hero.mp4" type="video/mp4">
</video>
```
```css
.hero__bg {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  object-fit: cover;
  will-change: transform;
}
```

**Why video over image for animation:**
- Hardware-decoded on most devices (separate decoder, not on main thread)
- Infinite loop weight = same as single frame (with keyframe optimization)
- Controlled via CSS (opacity, transform, filter) using its own compositor layer

**Lottie animation replacement:**
```html
<!-- BEFORE -->
<img src="icon-animated.gif" alt="" width="48" height="48">

<!-- AFTER -->
<div id="lottie-icon" style="width:48px;height:48px"></div>
```
```js
// Loaded dynamically only when Lottie is needed
import lottie from 'https://cdn.jsdelivr.net/npm/lottie-web@5/+esm';
const anim = lottie.loadAnimation({
  container: document.getElementById('lottie-icon'),
  path: '/animations/icon.json',
  autoplay: true,
  loop: false
});
```

### 4.5 Loading State / Preloader Without Content Flash

**BEFORE — Flash of unstyled content:**
```html
<body>
  <div class="hero">...</div>
</body>
```

**AFTER — Preloader with smooth reveal:**
```html
<body>
  <div class="preloader" aria-hidden="true">
    <div class="preloader__spinner"></div>
  </div>
  <div class="site-wrapper">
    <div class="hero">...</div>
  </div>
</body>
```
```css
.site-wrapper {
  opacity: 0;
  transition: opacity 0.5s ease;
}
.site-wrapper.is-visible {
  opacity: 1;
}
.preloader {
  position: fixed; inset: 0;
  background: #fff;
  z-index: 9999;
  display: flex; align-items: center; justify-content: center;
  transition: opacity 0.4s ease, visibility 0.4s ease;
}
.preloader.is-hidden {
  opacity: 0;
  visibility: hidden;
}
@media (prefers-reduced-motion: reduce) {
  .preloader { display: none; }
  .site-wrapper { opacity: 1; }
}
```
```js
window.addEventListener('load', () => {
  // Wait for fonts, critical images to load
  document.querySelector('.site-wrapper').classList.add('is-visible');
  setTimeout(() => {
    document.querySelector('.preloader').classList.add('is-hidden');
  }, 200); // brief overlap to avoid flash
});
```

**Or — no preloader, just progressive reveal:**
```css
/* Content is always visible — animation is enhancement, not gate */
.hero__title { opacity: 1; } /* visible immediately */
.hero__subtitle { opacity: 1; }
.hero__cta { opacity: 1; }
@supports (animation: fadeIn 1s) {
  .hero__title { animation: fadeInUp 0.8s 0.1s both; }
}
```

**The golden rule of preloaders:** A preloader that hides before content is ready creates a frustrating experience (flash, then wait). Either hide it only after `window.load + fonts loaded`, or skip it entirely in favor of progressive content reveal.

---

## Phase 5: Testing and Validation

### 5.1 Performance Comparison (Before vs After)

Create a performance report:

```markdown
# Animation Migration Report

## Lighthouse (Desktop)
| Metric        | Before | After | Delta  |
|---------------|--------|-------|--------|
| Performance   | 92     | 88    | -4     |
| FCP           | 1.2s   | 1.3s  | +0.1s  |
| LCP           | 1.8s   | 1.9s  | +0.1s  |
| TBT           | 50ms   | 120ms | +70ms  |
| CLS           | 0.02   | 0.02  | 0      |
| Speed Index   | 1.5s   | 1.6s  | +0.1s  |

## Frame Rate (Scroll test — 5s)
| Device        | Before | After |
|---------------|--------|-------|
| Desktop       | 60fps  | 58fps |
| Mobile (Moto) | 30fps  | 28fps |
| Throttled 6×  | --     | 22fps |

## Bundle Size
| Asset       | Before | After  |
|-------------|--------|--------|
| JS (total)  | 80KB   | 140KB  |
| CSS         | 12KB   | 18KB   |
| Images      | 480KB  | 320KB  |  <!-- WebP conversion + lazy loading -->
```

**Red flags:**
- Performance score drop >10 points
- Any new CLS (>0.1)
- TBT increase >200ms
- Mobile fps <25fps

### 5.2 Accessibility Audit

| Check | Method | Pass criteria |
|-------|--------|--------------|
| prefers-reduced-motion | DevTools → Rendering → Emulate prefers-reduced-motion | All animations disabled, content visible |
| Keyboard navigation | Tab through all interactive elements | Focus indicators visible, no animation-only CTAs |
| Screen reader | VoiceOver/NVDA: navigate page | No motion-only content, all content accessible |
| Flash rate | Check all animations | No element flashes >3Hz (seizure risk, WCAG 2.3.1) |
| Touch targets | Inspect animated interactive elements | min 44×44px at all animation states |
| Pause/stop | Any auto-playing animation that lasts >5s | Pause/stop button present (WCAG 2.2.2) |

### 5.3 Mobile Testing

**Real devices to test:**
- Low-end Android (Moto G Power, Galaxy A13 — ~30-40% of Android users)
- Mid-range Android (Galaxy S22 — ~25%)
- High-end Android (Pixel 9, Galaxy S24+ — ~20%)
- iPhone SE (small screen, moderate CPU)
- iPhone Pro Max (high-end)
- iPad (large viewport, same engine)

**Mobile-specific issues:**
- Reduced GPU memory → too many compositor layers crash
- Touch interaction conflicts with custom scroll
- Battery drain from GPU-intensive animations
- Data cost (prefers-reduced-data helps)

### 5.4 Cross-Browser Testing

| Browser | Engine | Notes |
|---------|--------|-------|
| Chrome 128+ | Blink | Best animation performance |
| Firefox 130+ | Gecko | Different compositor behavior, thorough testing needed |
| Safari 18+ | WebKit | Most conservative compositor — layers created eagerly, also GC'd eagerly |
| Edge 128+ | Blink | Same as Chrome |
| Samsung Internet | Blink | Wide mobile share, may have custom GPU limits |

**Safari-specific animation pitfalls:**
- No `conic-gradient` animation (before Safari 17.2)
- `will-change` may create layers more aggressively — causes jank when promoting
- Some CSS `filter: blur()` animations cause repaint of entire viewport
- `position: sticky` + transform may break (known WebKit bug)

### 5.5 User Experience Evaluation

**Quantitative:**
- Before/after conversion rate on CTAs (A/B test)
- Before/after bounce rate
- Before/after time on page
- Before/after scroll depth

**Qualitative (survey or user testing):**
- "Did the site feel fast?" (animation can make perceived performance better even if actual FCP is same)
- "Did any motion feel distracting?"
- "Were you able to find the information you needed?" (animation should not hide content)

---

## Migration Templates — Before/After Patterns

### Template 1: Static Section → Scroll-Triggered Reveal

**BEFORE:**
```html
<section class="stats">
  <div class="stat">
    <span class="stat__number">10K+</span>
    <span class="stat__label">Users</span>
  </div>
  <div class="stat">
    <span class="stat__number">99.9%</span>
    <span class="stat__label">Uptime</span>
  </div>
</section>
```

**AFTER:**
```html
<section class="stats">
  <div class="stat" data-reveal>
    <span class="stat__number" data-count-to="10000">0</span>
    <span class="stat__label">Users</span>
  </div>
  <div class="stat" data-reveal>
    <span class="stat__number">99.9%</span>
    <span class="stat__label">Uptime</span>
  </div>
</section>
```
```css
[data-reveal] { opacity: 0; transform: translateY(20px); transition: opacity 0.6s, transform 0.6s; }
[data-reveal].revealed { opacity: 1; transform: translateY(0); }
@media (prefers-reduced-motion: reduce) { [data-reveal] { opacity: 1; transform: none; } }
```
```js
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('revealed');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.2 });
document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
```

### Template 2: Static Nav → Animated Nav (Hide on Scroll Down, Show on Scroll Up)

**BEFORE:**
```html
<nav class="navbar">
  <a href="/" class="navbar__logo">Logo</a>
  <ul class="navbar__links">...</ul>
</nav>
```
```css
.navbar { position: fixed; top: 0; width: 100%; }
```

**AFTER:**
```html
<nav class="navbar" data-nav>
  <a href="/" class="navbar__logo">Logo</a>
  <ul class="navbar__links">...</ul>
</nav>
```
```css
.navbar {
  position: fixed; top: 0; width: 100%;
  transition: transform 0.3s ease;
  will-change: transform;
}
.navbar[data-state="hidden"] {
  transform: translateY(-100%);
}
```
```js
let lastScroll = 0;
const nav = document.querySelector('[data-nav]');
window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;
  if (currentScroll > lastScroll + 10 && currentScroll > nav.offsetHeight) {
    nav.dataset.state = 'hidden';
  } else if (currentScroll < lastScroll - 10) {
    nav.dataset.state = 'visible';
  }
  lastScroll = currentScroll;
}, { passive: true });
```

### Template 3: Static CTA Button → Animated CTA with Pulse Ring

**BEFORE:**
```html
<a href="/signup" class="cta-button">Get Started</a>
```
```css
.cta-button { background: #0070f3; color: white; padding: 12px 24px; border-radius: 8px; }
```

**AFTER:**
```html
<a href="/signup" class="cta-button">
  Get Started
  <span class="cta-button__ring"></span>
</a>
```
```css
.cta-button {
  position: relative;
  background: #0070f3; color: white;
  padding: 12px 24px; border-radius: 8px;
  transition: transform 0.2s ease;
  will-change: transform;
}
.cta-button:hover { transform: translateY(-2px); }
@media (hover: none) { .cta-button:hover { transform: none; } }

@keyframes pulse-ring {
  0% { transform: scale(1); opacity: 0.5; }
  100% { transform: scale(1.4); opacity: 0; }
}
.cta-button__ring {
  position: absolute; inset: 0;
  border-radius: inherit;
  border: 2px solid currentColor;
  animation: pulse-ring 2s ease-out infinite;
}
```

### Template 4: Static Image Card → Parallax Image Card on Scroll

**BEFORE:**
```html
<div class="parallax-card">
  <img src="photo.jpg" alt="">
  <div class="parallax-card__content">...</div>
</div>
```
```css
.parallax-card img { width: 100%; height: 300px; object-fit: cover; }
```

**AFTER:**
```html
<div class="parallax-card" data-parallax>
  <div class="parallax-card__image-wrapper">
    <img src="photo.webp" alt="" decoding="async" loading="lazy">
  </div>
  <div class="parallax-card__content">...</div>
</div>
```
```css
.parallax-card { overflow: hidden; position: relative; }
.parallax-card__image-wrapper {
  transform: translateZ(0);
  will-change: transform;
}
.parallax-card img {
  width: 100%; height: 120%; /* taller for parallax room */
  object-fit: cover;
  transform: translateY(-10%); /* start offset */
}
```
```js
const parallaxCards = document.querySelectorAll('[data-parallax]');
parallaxCards.forEach(card => {
  const imgWrapper = card.querySelector('.parallax-card__image-wrapper');
  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      const progress = 1 - (entry.boundingClientRect.top / entry.rootBounds.height);
      const offset = Math.min(Math.max(progress * 20 - 10, -10), 10); // -10% to +10%
      imgWrapper.style.transform = `translateY(${offset}%)`;
    }
  }, { threshold: Array.from({length: 101}, (_, i) => i / 100) }); /* every % point */
  observer.observe(card);
});
```

### Template 5: Static Testimonial → Auto-Rotating Carousel with Fade Transition

**BEFORE:**
```html
<div class="testimonials">
  <blockquote class="testimonial">"Great product!" — User A</blockquote>
  <blockquote class="testimonial">"Love it!" — User B</blockquote>
  <blockquote class="testimonial">"Changed our workflow." — User C</blockquote>
</div>
```

**AFTER:**
```html
<div class="testimonials" data-carousel role="region" aria-label="Testimonials" aria-live="polite">
  <blockquote class="testimonial" data-slide>
    <p>"Great product!"</p>
    <cite>— User A</cite>
  </blockquote>
  <blockquote class="testimonial" data-slide hidden>
    <p>"Love it!"</p>
    <cite>— User B</cite>
  </blockquote>
  <blockquote class="testimonial" data-slide hidden>
    <p>"Changed our workflow."</p>
    <cite>— User C</cite>
  </blockquote>
</div>
```
```css
.testimonial {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.testimonial:not([hidden]) {
  opacity: 1; transform: translateY(0);
}
.testimonial[hidden] {
  display: none; /* is overridden by animation state — see JS */
}
/* For animation to work, we don't use the hidden attr directly */
```
```js
const slides = document.querySelectorAll('[data-slide]');
let current = 0;
function showSlide(index) {
  slides.forEach((s, i) => {
    s.style.opacity = i === index ? '1' : '0';
    s.style.transform = i === index ? 'translateY(0)' : 'translateY(10px)';
    s.style.position = i === index ? 'relative' : 'absolute'; /* stack */
    s.setAttribute('aria-hidden', i !== index);
  });
}
showSlide(0);
setInterval(() => {
  current = (current + 1) % slides.length;
  showSlide(current);
}, 5000);
```

---

## Comprehensive Migration Checklist

Use this checklist for each animation migration project:

### Pre-Migration
- [ ] Lighthouse baseline scores captured (desktop + mobile)
- [ ] Frame-rate baseline captured (desktop + low-end mobile)
- [ ] Bundle size baseline recorded
- [ ] Content inventory completed
- [ ] Animation level determined (Minimal / Medium / Full)
- [ ] All animation types listed with effort estimates

### During Migration
- [ ] `prefers-reduced-motion` CSS rule added FIRST (before any animation)
- [ ] CSS micro-interactions added (hover, focus) — tested
- [ ] CSS entrance animations added (load) — tested
- [ ] IntersectionObserver scroll reveals added — tested
- [ ] GSAP/JS animations added — tested
- [ ] Heavy animations (Three.js/Canvas) added — tested
- [ ] Performance tested after EACH addition
- [ ] `will-change` applied and removed correctly
- [ ] Compositor layers verified in DevTools (Layers tab)
- [ ] All images converted to WebP/AVIF
- [ ] Lazy loading added to offscreen images

### Post-Migration
- [ ] Lighthouse scores compared to baseline
- [ ] Frame-rate compared to baseline
- [ ] Bundle size compared to baseline
- [ ] prefers-reduced-motion validation (all animations disabled)
- [ ] Keyboard navigation tested
- [ ] Screen reader tested
- [ ] Mobile (low-end + mid-range + high-end) tested
- [ ] Cross-browser tested (Chrome, Firefox, Safari, Edge)
- [ ] Touch behavior validated
- [ ] A/B test prepared for conversion metrics (if applicable)
- [ ] No autoplay audio/video without clear user intent
- [ ] No scroll-jacking
- [ ] No setTimeout for animation/critical timing
- [ ] All touch targets ≥ 44×44px
- [ ] Animation pooling in place for particle/canvas systems

---

## Summary of Key Findings

1. **The single most impactful change:** Replace layout animations (`width`, `height`, `top`, `left`) with `transform` and `opacity`. This alone can move a site from 30fps to 60fps.

2. **Accessibility is not optional:** Always implement `prefers-reduced-motion: reduce` as the FIRST animation rule, not the last. Animation must never be a content gate.

3. **Progressive enhancement is the only safe approach:** Content visible and functional without any animation. Animation enhances, it never enables.

4. **Performance budget is non-negotiable:** Each animation layer has a cost. Budget ~0.3ms per composited `transform` layer. With 16.6ms total budget per frame, ~8-12 simultaneous animation layers is the practical max on desktop (~4-6 on mobile).

5. **Add animations in order of increasing risk:** CSS transitions → CSS entrances → IntersectionObserver reveals → JS/GSAP → heavy 3D. Test after every layer.

6. **Phase 1 audit is critical:** Without baseline performance metrics, you cannot measure whether your animations improved or harmed the experience.

7. **CDNs + dynamic imports solve bundle bloat:** Loading animation libraries only when needed (post-load, on interaction) dramatically improves FCP/LCP while enabling rich animation.

8. **Mobile is the bottleneck:** Always develop for mobile first, then enhance for desktop. Parallax that looks great on a 27" monitor may drop to 15fps on a Moto G.

9. **Image optimization is 50% of animation performance:** WebP/AVIF conversion + responsive images + lazy loading reduces GPU memory pressure and decode time — the two biggest animation bottlenecks.

10. **Test before, during, and after:** The most common failure is adding animations without measuring. A 5 Lighthouse point drop per animation layer is a hard ceiling.
