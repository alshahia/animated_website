# Animated Website Types, Genres & Categories

**Research Date:** July 29, 2026  
**Model:** MiniMax-M2.7  
**Sources:** Web research, Awwwards, industry documentation

---

## Table of Contents

1. [All Types of Animated Websites](#1-all-types-of-animated-websites)
2. [Classification by Complexity Level](#2-classification-by-complexity-level)
3. [Classification by Use Case](#3-classification-by-use-case)
4. [Classification by Animation Style](#4-classification-by-animation-style)
5. [Animation Technologies & Tools](#5-animation-technologies--tools)
6. [Performance Considerations](#6-performance-considerations)
7. [Inspiration Resources](#7-inspiration-resources)

---

## 1. All Types of Animated Websites

### 1.1 Scroll-Driven Effects

| Type | Description |
|------|-------------|
| **Parallax Scrolling** | Multiple layers moving at different speeds to create depth illusion |
| **Scroll-Triggered Reveals** | Elements fade/slide into view as user scrolls |
| **Sticky Sections** | Content sticks while new content animates over it |
| **Horizontal Scrolling** | Vertical scroll converted to horizontal movement |
| **Scroll-Progress Indicators** | Progress bars or markers tied to scroll position |
| **Scroll-Linked Animations** | Elements that transform based on exact scroll position |
| **Infinite Scroll** | Seamless continuous content loading on scroll |
| **Scroll-Velocity Effects** | Animation speed tied to how fast user scrolls |

### 1.2 Hover Reactions

| Type | Description |
|------|-------------|
| **Button Transforms** | Scale, color shift, glow effects on hover |
| **Image Zooms** | Subtle or dramatic zoom on image hover |
| **Card Tilts** | 3D perspective tilt following mouse position |
| **Magnetic Buttons** | Elements subtly attract toward cursor |
| **Cursor Followers** | Custom cursors that track and react |
| **Text Reveals** | Hidden text or underline animations |
| **Menu Transforms** | Hamburger menus morphing into X or other shapes |
| **Background Shifts** | Gradients or colors that change on hover |

### 1.3 Loading Transitions

| Type | Description |
|------|-------------|
| **Preloaders/Splash Screens** | Full-screen animated loading indicators |
| **Logo Animations** | Animated brand logos during load |
| **Progress Bars** | Linear or circular progress indicators |
| **Skeleton Screens** | Placeholder content that pulses/shimmers |
| **Curtain Reveals** | Loading screen that slides/wipes away |
| **Fade-Through Loading** | Content fades between states |

### 1.4 Accent Highlights

| Type | Description |
|------|-------------|
| **Glowing CTAs** | Pulsing or glowing call-to-action buttons |
| **Focus States** | Animated input field focus indicators |
| **Notification Bells** | Bouncing or color-changing alerts |
| **Typing Animations** | Animated cursor or character-by-character text |
| **Sparkle Effects** | Particle or star effects on interactions |
| **Ripple Effects** | Material-design-inspired ripple on click |

### 1.5 Page Transitions

| Type | Description |
|------|-------------|
| **Curtain/Wipe Transitions** | Content slides behind a moving curtain |
| **Fade-Through** | Smooth opacity transitions between pages |
| **Slide Transitions** | Content slides in from directions |
| **Morphing Transitions** | Elements transform into new page content |
| **3D Page Flips** | Pages that flip like physical books |
| **Shared Element Transitions** | Elements persist and transform between views |

### 1.6 Text Animations

| Type | Description |
|------|-------------|
| **Character Stagger** | Letters appear one by one |
| **Word By Word Reveal** | Text reveals word by word |
| **Masked Text** | Text revealed through masks or clip-paths |
| **Marquee/Continuous Scroll** | Text that continuously scrolls |
| **Text Path/Motion** | Text following SVG paths |
| **Kinetic Typography** | Animated text with physics-based motion |
| **Split-Text Animations** | Text splits and animates in sections |

### 1.7 3D Spaces & Experiences

| Type | Description |
|------|-------------|
| **3D Product Viewers** | Rotate/interact with 3D product models |
| **Virtual Tours** | 360° or navigable 3D spaces |
| **WebGL Canvases** | GPU-accelerated 3D graphics |
| **Particle Systems** | Thousands of animated particles |
| **Fluid Simulations** | Realistic liquid/fluid effects |
| **3D Character Sites** | Sites with animated 3D mascots/characters |
| **Immersive Storytelling** | 3D environments for narrative experiences |

### 1.8 Microinteractions

| Type | Description |
|------|-------------|
| **Toggle Switches** | Animated on/off switches |
| **Checkbox Animations** | Animated check selections |
| **Like/Heart Animations** | Burst or scale effects on like |
| **Slider Handles** | Custom styled range inputs |
| **Drag & Drop** | Elements that can be picked up and moved |
| **Pull-to-Refresh** | Mobile-style refresh animations |
| **Long-Press Effects** | Actions triggered by long press |

### 1.9 Background Effects

| Type | Description |
|------|-------------|
| **Animated Gradients** | Colors that slowly shift |
| **Moving Mesh Gradients** | Blobby, organic gradient animations |
| **Particle Backgrounds** | Subtle floating particles |
| **Video Backgrounds** | Looping video as background |
| **Noise/Static Textures** | Grainy animated textures |
| **CSS Pattern Animations** | Repeating animated patterns |

### 1.10 Navigation Animations

| Type | Description |
|------|-------------|
| **Mega Menu Reveals** | Animated dropdown/flyout menus |
| **Hamburger Morphs** | Icon transforms on menu open |
| **Nav Scroll Effects** | Navbar that shrinks/changes on scroll |
| **Section Indicators** | Animated indicators for current section |
| **Breadcrumb Animations** | Animated navigation trails |
| **Sidebar Transitions** | Slide-in panels and drawers |

---

## 2. Classification by Complexity Level

### Level 1: CSS3 Animations (Foundation)

**Tools:** Native CSS, CSS Transitions, CSS Animations, @keyframes

**Best For:**
- Hover states and microinteractions
- Simple loading spinners
- Basic page transitions
- UI state changes
- Button effects

**Properties Used:**
- `transition`
- `transform` (scale, translate, rotate)
- `opacity`
- `@keyframes`
- `animation`

**Examples:**
```css
/* Hardware-accelerated hover effect */
.hover-card {
  transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1), 
              opacity 0.2s ease;
  will-change: transform, opacity;
}

.hover-card:hover {
  transform: scale(1.05);
}

/* Keyframe animation */
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
```

---

### Level 2: JavaScript Animation Libraries (Production)

**Tools:** GSAP (GreenSock), Framer Motion, Lenis, Anime.js, Motion

**Best For:**
- Scroll-driven timelines
- Complex sequencing
- Physics-based motion
- Responsive animations
- SVG animations
- Layout transitions

**GSAP Capabilities:**
- Timeline orchestration
- ScrollTrigger for scroll-linked animations
- Physics-based tweens
- MorphSVG plugin
- SplitText for text animations

**Framer Motion (React):**
- Layout animations
- Shared element transitions
- Gesture handling
- Variants system
- AnimatePresence

**Lenis (Smooth Scrolling):**
- Inertia-based smooth scroll
- GSAP ScrollTrigger integration
- Mobile touch support

**Examples:**
```javascript
// GSAP Timeline
const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });
tl.from(".hero-title", { opacity: 0, y: 50, stagger: 0.2 })
  .from(".hero-subtitle", { opacity: 0, y: 30 }, "-=0.8")
  .from(".cta-button", { opacity: 0, scale: 0.8 }, "-=0.5");

// GSAP ScrollTrigger
gsap.to(".card", {
  opacity: 1,
  y: 0,
  duration: 1,
  stagger: 0.2,
  scrollTrigger: {
    trigger: ".grid-container",
    start: "top 80%",
  }
});

// Framer Motion (React)
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, ease: "easeOut" }}
/>
```

---

### Level 3: WebGL & 3D Engines (High-End)

**Tools:** Three.js, PixiJS, React Three Fiber, Babylon.js, WebGL

**Best For:**
- 3D product showcases
- Immersive experiences
- Particle effects
- Real-time rendering
- Game-like interactions
- Abstract digital art

**Three.js Features:**
- 3D cameras, lights, textures
- Geometry and meshes
- GLTF/GLB model loading
- Post-processing effects
- Raycasting for interactions

**PixiJS Features:**
- Blazing-fast 2D WebGL renderer
- Particle systems
- Sprite sheets
- Filters and blend modes
- Text rendering

**Examples:**
```javascript
// Three.js Scene
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

// PixiJS Particles
const app = new PIXI.Application();
const particles = new PIXI.ParticleContainer();
const particle = PIXI.Sprite.from('particle.png');
// ... particle system setup
```

---

## 3. Classification by Use Case

### 3.1 Portfolio Websites

| Animation Type | Purpose |
|----------------|---------|
| Project card reveals | Showcase work dramatically |
| Case study transitions | Guide user through project narrative |
| Skills visualizations | Animate skill bars or graphs |
| About-me timeline | Animate career milestones |
| Contact form effects | Make communication feel tactile |

**Common Tools:** GSAP, Framer Motion, Three.js

---

### 3.2 E-Commerce Websites

| Animation Type | Purpose |
|----------------|---------|
| Product image galleries | Zoom, rotate, color switch |
| Add-to-cart effects | Visual feedback for actions |
| Price/quantity animations | Smooth number transitions |
| Checkout progress | Step-by-step guidance |
| Wishlist interactions | Heart burst animations |
| Product configurators | Real-time option updates |

**Common Tools:** GSAP, Framer Motion, Three.js (for 3D products)

---

### 3.3 Landing Pages

| Animation Type | Purpose |
|----------------|---------|
| Hero animations | Capture attention immediately |
| Feature reveals | Guide attention to value props |
| Testimonial carousels | Social proof cycling |
| CTA animations | Drive conversions |
| Countdown timers | Create urgency |
| Animated statistics | Make data engaging |

**Common Tools:** CSS animations, GSAP, Lenis

---

### 3.4 Corporate/Business Websites

| Animation Type | Purpose |
|----------------|---------|
| Service animations | Explain complex services |
| Team member reveals | Humanize the company |
| Timeline/milestone displays | Show company history |
| Process visualizations | Simplify explanations |
| Animated logos | Brand reinforcement |

**Common Tools:** CSS animations, Framer Motion

---

### 3.5 Entertainment/Media Sites

| Animation Type | Purpose |
|----------------|---------|
| Video players | Custom playback controls |
| Audio visualizers | Reactive to sound |
| Interactive storytelling | Engage users narratively |
| Event countdowns | Build anticipation |
| Social media feeds | Dynamic content display |

**Common Tools:** Three.js, PixiJS, GSAP

---

### 3.6 Educational/ELearning Platforms

| Animation Type | Purpose |
|----------------|---------|
| Lesson progress | Visual learning path |
| Quiz interactions | Engaging assessments |
| Concept visualizations | Simplify complex topics |
| Achievement badges | Gamification elements |
| Code editors | Syntax highlighting animations |

**Common Tools:** CSS animations, GSAP, Framer Motion

---

### 3.7 Travel/Hospitality

| Animation Type | Purpose |
|----------------|---------|
| Destination galleries | Immersive location previews |
| Map interactions | Explore locations visually |
| Room/tour viewers | 360° or 3D views |
| Booking calendars | Date selection animations |
| Weather visualizations | Real-time atmosphere |

**Common Tools:** Three.js, GSAP, MapboxGL

---

### 3.8 Food/Restaurant

| Animation Type | Purpose |
|----------------|---------|
| Menu presentations | Mouth-watering displays |
| Ingredient reveals | Source transparency |
| Reservation systems | Smooth booking flow |
| Delivery tracking | Real-time updates |
| Review displays | Social proof animation |

**Common Tools:** CSS animations, GSAP

---

## 4. Classification by Animation Style

### 4.1 Microinteractions

**Definition:** Small, contained animations that provide feedback or enhancement to a specific UI element.

| Element | Animation Examples |
|---------|-------------------|
| Buttons | Scale on click, ripple effect, color transition |
| Toggles | Slide with bounce, state color change |
| Checkboxes | Morph to checkmark, fill animation |
| Dropdowns | Smooth expand/collapse, staggered options |
| Sliders | Thumb bounce, value tooltip follow |
| Inputs | Floating labels, validation shake |
| Links | Underline draw, color shift |

**Implementation:**
```css
/* Ripple effect */
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
```

---

### 4.2 Page Transitions

**Definition:** Animations that occur when navigating between pages or major sections.

| Style | Description |
|-------|-------------|
| Fade | Crossfade between states |
| Slide | Content slides in/out horizontally or vertically |
| Wipe/Curtain | Content reveals behind a moving element |
| Scale | Pages scale up/down during transition |
| Flip | 3D page flip effect |
| Morph | Elements transform into new content |
| Glitch | Digital distortion transition |

**Implementation (GSAP):**
```javascript
// Page transition with curtain
const transition = gsap.timeline();
transition.to(".curtain", { yPercent: -100, duration: 0.8, ease: "power4.inOut" })
          .from(".new-content", { opacity: 0, y: 50 }, "-=0.3");
```

---

### 4.3 Scroll Effects

**Definition:** Animations tied to scroll position and behavior.

| Effect | Description |
|--------|-------------|
| Parallax | Layered depth illusion |
| Reveal on scroll | Elements animate when entering viewport |
| Sticky positioning | Elements fix while scrolling |
| Progress indicators | Scroll position visualization |
| Horizontal scroll | Vertical scroll mapped to horizontal |
| Scroll hijacking | Complete control over scroll behavior |

**Implementation (GSAP ScrollTrigger):**
```javascript
gsap.registerPlugin(ScrollTrigger);

// Parallax effect
gsap.to(".background-layer", {
  yPercent: 50,
  ease: "none",
  scrollTrigger: {
    trigger: ".container",
    start: "top bottom",
    end: "bottom top",
    scrub: true
  }
});

// Reveal animation
gsap.from(".reveal-element", {
  opacity: 0,
  y: 100,
  duration: 1,
  scrollTrigger: {
    trigger: ".reveal-element",
    start: "top 80%"
  }
});
```

---

### 4.4 3D Experiences

**Definition:** Immersive WebGL-powered three-dimensional environments.

| Type | Use Case |
|------|----------|
| 3D Product Viewers | E-commerce rotation/zoom |
| 3D Character Sites | Brand mascots, entertainment |
| Particle Systems | Visual effects, backgrounds |
| Fluid Simulations | Abstract art, scientific viz |
| Virtual Showrooms | Real estate, automotive |
| Games/Interactive | Branded games, quizzes |

**Implementation (React Three Fiber):**
```jsx
function ProductViewer() {
  return (
    <Canvas>
      <OrbitControls enableZoom={false} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} />
      <Stage>
        <Model url="/product.glb" />
      </Stage>
    </Canvas>
  );
}
```

---

### 4.5 Typography Animations

**Definition:** Animations focused on text and typographic elements.

| Style | Description |
|-------|-------------|
| Character stagger | Letters appear sequentially |
| Word reveal | Words animate into view |
| Text path | Text follows SVG paths |
| Masking | Text revealed through clip/mask |
| Kinetic | Physics-based text motion |
| Rotoscoping | Text traces movement paths |
| Continuous scroll | Endless text marquee |

**Implementation:**
```javascript
// GSAP SplitText-style animation
const words = textElement.textContent.split(' ');
textElement.innerHTML = words
  .map(word => `<span class="word"><span class="char">${word}</span></span>`)
  .join('');

gsap.from('.char', {
  opacity: 0,
  y: 20,
  stagger: 0.05,
  duration: 0.3
});
```

---

### 4.6 Loading/Preloader Animations

**Definition:** Animations displayed while content is loading.

| Type | Description |
|------|-------------|
| Spinners | Rotating loading indicators |
| Progress bars | Linear completion indicators |
| Skeleton screens | Pulsing content placeholders |
| Logo animations | Branded loading experiences |
| Curtain reveals | Loading that wipes away |
| Percentage counters | Numeric progress display |

**Best Practices:**
- Keep preloaders under 3 seconds
- Use skeleton screens for content loading
- Show real progress when possible
- Animate smoothly at 60fps
- Respect user preference for reduced motion

---

### 4.7 Background Animations

**Definition:** Ambient animated elements in the background of a page.

| Type | Description |
|------|-------------|
| Gradient shifts | Slowly cycling colors |
| Floating particles | Subtle drifting elements |
| Mesh gradients | Organic blob animations |
| Noise textures | Grainy animated overlays |
| Star fields | Cosmic/space backgrounds |
| Wave patterns | Undulating shapes |

**Implementation:**
```css
/* Animated gradient */
.animated-gradient {
  background: linear-gradient(
    45deg,
    #ff6b6b,
    #4ecdc4,
    #45b7d1,
    #96ceb4,
    #ff6b6b
  );
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
```

---

### 4.8 Interactive/Experimental

**Definition:** Novel animations that respond to user input in unexpected ways.

| Type | Description |
|------|-------------|
| Cursor tracking | Elements follow mouse creatively |
| Magnetic elements | UI attracts toward cursor |
| Tilt effects | Elements tilt based on device orientation |
| Drag interactions | Items can be picked up and moved |
| Sound reactive | Animations tied to audio input |
| Gestures | Special animations for touch/voice |

**Implementation:**
```javascript
// Magnetic button effect
document.querySelectorAll('.magnetic-btn').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    gsap.to(btn, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3
    });
  });
  
  btn.addEventListener('mouseleave', () => {
    gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
  });
});
```

---

## 5. Animation Technologies & Tools

### 5.1 CSS Animation Properties

| Property | Use Case |
|----------|----------|
| `transition` | Property changes over time |
| `@keyframes` | Named animation sequences |
| `animation` | Shorthand for animation properties |
| `transform` | Scale, rotate, translate, skew |
| `opacity` | Fade in/out effects |
| `will-change` | GPU optimization hints |
| `filter` | Blur, brightness, contrast |

### 5.2 JavaScript Animation Libraries

| Library | Strengths | Best For |
|---------|-----------|----------|
| **GSAP** | Performance, ecosystem, plugins | Complex timelines, ScrollTrigger |
| **Framer Motion** | React integration, gestures | React/Next.js projects |
| **Lenis** | Smooth scrolling | Scroll-heavy sites |
| **Anime.js** | Lightweight, simple API | Simple to medium animations |
| **Motion** | Declarative, easy syntax | Vue/React projects |
| **Velocity.js** | jQuery replacement | Drop-in animation |

### 5.3 3D/WebGL Frameworks

| Framework | Type | Best For |
|-----------|------|----------|
| **Three.js** | 3D WebGL | Complex 3D experiences |
| **React Three Fiber** | Three.js React wrapper | React 3D apps |
| **PixiJS** | 2D WebGL | High-performance 2D, particles |
| **Babylon.js** | 3D WebGL | Games, simulations |
| **PlayCanvas** | 3D WebGL | Game engine, collaboration |
| **OGL** | Lightweight WebGL | Minimal 3D needs |

### 5.4 Animation Utilities

| Tool | Purpose |
|------|---------|
| **MorphSVG (GSAP)** | SVG path morphing |
| **SplitText (GSAP)** | Text splitting |
| **ScrollTrigger (GSAP)** | Scroll-linked animations |
| **use-gesture** | Touch/mouse gestures |
| **Popmotion** | Physics-based animations |
| **Choreographer** | CSS animation management |

---

## 6. Performance Considerations

### 6.1 The 60 FPS Rule

Animations must run at 60 frames per second (16.67ms per frame). Stalls longer than this cause visible jank.

### 6.2 GPU-Accelerated Properties

**Always Animate:**
- `transform` (translate, scale, rotate)
- `opacity`
- `filter` (with caution)
- `clip-path`

**Never Animate (Causes Reflow):**
- `width`, `height`
- `top`, `left`, `right`, `bottom`
- `margin`, `padding`
- `border`
- `font-size`

### 6.3 Performance Checklist

- [ ] Use `transform` and `opacity` for animations
- [ ] Add `will-change` for upcoming animations
- [ ] Remove `will-change` after animation completes
- [ ] Use `requestAnimationFrame` for JavaScript animations
- [ ] Debounce scroll event handlers
- [ ] Use `IntersectionObserver` instead of scroll listeners
- [ ] Lazy load heavy animation components
- [ ] Test on low-end devices
- [ ] Respect `prefers-reduced-motion`

### 6.4 Accessibility

```css
/* Respect user motion preferences */
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

---

## 7. Inspiration Resources

### 7.1 Design Inspiration Sites

| Site | Focus |
|------|-------|
| [Awwwards](https://awwwards.com) | Award-winning website designs |
| [CSS Design Awards](https://cssdesignawards.com) | CSS-focused designs |
| [Landing.love](https://landing.love) | Landing page inspiration |
| [Dribbble](https://dribbble.com) | Designer portfolio shots |
| [Behance](https://behance.net) | Creative work showcases |

### 7.2 Animation Inspiration

| Site | Focus |
|------|-------|
| [CodePen](https://codepen.io) | Interactive code examples |
| [GSAP Examples](https://gsap.com) | GSAP animation gallery |
| [Lusion](https://lusion.co) | High-end 3D experiences |
| [Active Theory](https://activetheory.net) | Immersive web experiences |
| [Obys Agency](https://obys.agency) | Creative agency portfolio |

### 7.3 Learning Resources

| Resource | Type |
|----------|------|
| [MDN Web Docs](https://developer.mozilla.org) | CSS/JS animation APIs |
| [GSAP Documentation](https://gsap.com/docs) | GSAP tutorials |
| [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) | 3D React |
| [Codrops](https://tympanus.net/codrops) | Tutorials and experiments |
| [CSS Tricks](https://css-tricks.com) | Animation guides |

### 7.4 UI Component Libraries

| Library | Type |
|---------|------|
| [Aceternity UI](https://aceternity.com) | Next.js/Tailwind animated components |
| [FreeFrontend](https://freefrontend.com) | CSS/JS examples |
| [Tailwind CSS](https://tailwindcss.com) | Utility CSS with animation classes |
| [Framer Motion](https://framer.com/motion) | React animation library |

---

## Quick Reference: Animation Type Selection Guide

| Need | Recommended Approach |
|------|---------------------|
| Simple hover effects | CSS `transition` |
| Loading spinner | CSS `@keyframes` |
| Page transitions | GSAP + AnimatePresence (React) |
| Scroll reveals | GSAP ScrollTrigger |
| Smooth scrolling | Lenis |
| Complex timelines | GSAP Timeline |
| React animations | Framer Motion |
| 3D products | Three.js / React Three Fiber |
| Many particles | PixiJS |
| Physics interactions | GSAP Inertia / Matter.js |
| Text animations | GSAP SplitText / Motion |
| Form animations | GSAP / CSS transitions |

---

**Document Version:** 1.0  
**Last Updated:** July 29, 2026
