# Resources Catalog: Animated Website Creation

> Research date: 2026-07-29
> Source file resources + additional research

---

## Table of Contents

1. [Animation Libraries & Frameworks](#1-animation-libraries--frameworks)
2. [WebGL & 3D Tools](#2-webgl--3d-tools)
3. [React Animation Ecosystem](#3-react-animation-ecosystem)
4. [SVG Animation Tools](#4-svg-animation-tools)
5. [Lottie & Vector Animation](#5-lottie--vector-animation)
6. [No-Code Animation Builders](#6-no-code-animation-builders)
7. [Inspiration Galleries & Showcase Sites](#7-inspiration-galleries--showcase-sites)
8. [Design-to-Code & Asset Generators](#8-design-to-code--asset-generators)
9. [Hosting & Deployment](#9-hosting--deployment)
10. [Performance & Optimization Tools](#10-performance--optimization-tools)
11. [AI Tools for Animation](#11-ai-tools-for-animation)
12. [Interactive & Scroll-Based Tools](#12-interactive--scroll-based-tools)
13. [Influential Creative Agencies (Reference)](#13-influential-creative-agencies-reference)
14. [Appendix: Ecosystem Map](#14-appendix-ecosystem-map)

---

## 1. Animation Libraries & Frameworks

### GSAP (GreenSock Animation Platform)

| Field | Detail |
|---|---|
| **URL** | https://gsap.com |
| **Category** | Animation Library |
| **Version** | GSAP 3.x (mature, stable) |
| **What it offers** | Professional-grade JavaScript animation library. Core engine animates any JS-touchable property. Plugins: ScrollTrigger (scroll-driven animation), SplitText (text splitting), Draggable, MorphSVG (SVG morphing), MotionPath, Flip (FLIP animations), ScrollSmoother, Inertia, Observer. Timeline-based sequencing, custom easing, stagger, responsive. |
| **Pricing** | Core: **Free** (MIT). Premium plugins (SplitText, MorphSVG, ScrollSmoother, etc.): Club GSAP membership ($50–$199/year) |
| **Best for** | Scroll-triggered storytelling, UI animation, SVG animation, text reveals, timeline choreography, parallax |
| **Alternatives** | Motion (Framer Motion standalone), Anime.js, CSS animations with Intersection Observer |

### Motion (formerly Framer Motion)

| Field | Detail |
|---|---|
| **URL** | https://motion.dev |
| **Category** | Animation Library |
| **What it offers** | React + JavaScript + Vue animation library (MIT). Hybrid engine (JS + hardware-accelerated browser APIs). Independent transforms, scroll-linked animation via ScrollTimeline, native gestures (hover/press/drag), layout animations, spring physics, exit animations, timeline sequences, MotionValue system, AnimatePresence. Motion UI (production sections + components). MotionScore (performance audit tool). |
| **Pricing** | Core: **Free** (MIT). Motion+ (premium): AI Kit + Motion UI (paid) |
| **Best for** | React/Vue UI animations, layout transitions, gesture-driven interactions, production React apps |
| **Alternatives** | GSAP, React Spring, AutoAnimate |

### Anime.js

| Field | Detail |
|---|---|
| **URL** | https://animejs.com |
| **Category** | Animation Library |
| **Version** | v4.0.0 (latest) |
| **What it offers** | All-in-one engine. Intuitive API with per-property parameters, keyframes, built-in easings, enhanced CSS transforms (individual), Scroll Observer (scroll-triggered with sync modes), advanced staggering (time/values/timeline positions), SVG toolset (morphing, motion path, line drawing), Draggable API (drag/snap/flick/throw), Timeline API, Scope API (media queries, custom root), modular (tree-shakeable). Bundle: ~24.5 KB base. |
| **Pricing** | **Free** (MIT) — open source, sponsor-supported |
| **Best for** | Multi-property animations, SVG morphing, staggered effects, draggable interfaces, scroll-linked |
| **Alternatives** | GSAP, Motion, Mo.js |

### Mo.js

| Field | Detail |
|---|---|
| **URL** | https://mojs.github.io |
| **Category** | Animation Library |
| **What it offers** | Motion graphics for the web. Declarative API for shape animation, burst effects, swirls, grid animations. Retina-ready, modular build system, unit-tested (1580+ tests). Shape/ShapeSwirl modules, Burst module for particle explosions. Custom easing curves. |
| **Pricing** | **Free** (MIT) |
| **Best for** | Particle effects, motion graphics, decorative shape animations, celebratory UI effects |
| **Alternatives** | GSAP, Anime.js, Lottie for precomposed motion |

### Velocity.js

| Field | Detail |
|---|---|
| **URL** | https://velocityjs.org |
| **Category** | Animation Library |
| **What it offers** | Accelerated JavaScript animation. Works with jQuery and without. Fast performance with same-color interpolation, SVG support, scroll/color transforms, easings. Flip plugin for FLIP technique. |
| **Pricing** | **Free** (MIT) |
| **Best for** | jQuery-dependent projects, UI transitions, simple sequence animations |
| **Alternatives** | GSAP, Anime.js |

### Barba.js

| Field | Detail |
|---|---|
| **URL** | https://barba.js.org |
| **Category** | Page Transition Library |
| **What it offers** | Seamless page transitions for web apps. Prevents full-page reloads with PJAX (pushState + AJAX). Custom transition hooks (leave/enter), async/await support, cache management. V2+ with hooks-based API. |
| **Pricing** | **Free** (MIT) |
| **Best for** | Multi-page animated websites, site-wide transition effects, progressive enhancement |
| **Alternatives** | Swup.js, View Transitions API, Nuxt/i18n transitions |

### Swiper

| Field | Detail |
|---|---|
| **URL** | https://swiperjs.com |
| **Category** | UI Component / Slider |
| **What it offers** | Modern mobile touch slider. Hardware-accelerated transitions, 30+ parameters, CSS3/JS mode, parallax effects, 3D cube/coverflow/flip effects, autoplay, virtual slides, lazy loading, a11y, RTL. React/Vue/Svelte/Core builds. |
| **Pricing** | **Free** (MIT) |
| **Best for** | Hero sliders, testimonials carousels, product galleries, fullscreen swipers |
| **Alternatives** | Splide.js, Glider.js, Flickity |

---

## 2. WebGL & 3D Tools

### Three.js

| Field | Detail |
|---|---|
| **URL** | https://threejs.org |
| **Category** | 3D Library / WebGL |
| **Version** | r185 |
| **What it offers** | The most popular WebGL library. Scenes, cameras, renderers, materials (Standard/Physical/Toon/Metallic), geometries, lights, shadows, post-processing (bloom, DOF, etc.), particle systems, animation system, glTF/OBJ/GLB loaders, ShaderMaterial, custom GLSL. DevTools extension, Editor, examples. |
| **Pricing** | **Free** (MIT) |
| **Best for** | 3D product showcases, WebGL backgrounds, data visualization, immersive experiences, 3D games in browser |
| **Alternatives** | Babylon.js, PlayCanvas, React Three Fiber |

### React Three Fiber (R3F)

| Field | Detail |
|---|---|
| **URL** | https://docs.pmnd.rs/react-three-fiber |
| **Category** | React 3D Renderer |
| **What it offers** | React renderer for Three.js. Declarative Three.js scene construction using React components. Handles lifecycle, reconciler, resize. Ecosystem: Drei (300+ helpers), Rapier (physics), Postprocessing, XR (WebXR), A11y. Works with Zustand for state management, useFrame for animation loops. |
| **Pricing** | **Free** (MIT) |
| **Best for** | React developers needing 3D scenes, interactive product configurators, immersive web apps in React |
| **Alternatives** | Vanilla Three.js, Spline embed |

### Babylon.js

| Field | Detail |
|---|---|
| **URL** | https://babylonjs.com |
| **Category** | 3D Engine / WebGL |
| **Version** | 9.0 |
| **What it offers** | Full-featured WebGL engine. Clustered lighting, textured area lights, volumetric lighting, Gaussian splatting, animation retargeting, physics engine, particle editor, node material editor, frame graph, nav mesh, spatial audio, PBR materials, OpenPBR support, large world rendering, 3D tiles, Inspector v2. GUI editor, sandbox, playground. Used by Nike, Target, Minecraft, Xbox. |
| **Pricing** | **Free** (Apache 2.0) |
| **Best for** | 3D configurators, e-commerce product viewers, games, digital twins, metaverse experiences |
| **Alternatives** | Three.js, PlayCanvas |

### PlayCanvas

| Field | Detail |
|---|---|
| **URL** | https://playcanvas.com |
| **Category** | 3D Engine / WebGL |
| **What it offers** | Web-first 3D game engine. WebGPU-ready, editor + runtime, physics (ammo.js), glTF support, collaborative editing, instancing, LOD, particle systems, animation state machines. Used by Activision, LEGO, Disney. |
| **Pricing** | **Free** (MIT) for engine; Editor: Free tier with limits, Pro from $50/month |
| **Best for** | Browser games, 3D product configurators, interactive 3D experiences, real-time collaboration |
| **Alternatives** | Three.js, Babylon.js |

### Spline

| Field | Detail |
|---|---|
| **URL** | https://spline.design |
| **Category** | 3D Design Tool |
| **What it offers** | Browser-based 3D design platform with real-time collaboration. Primitives + 3D modeling, layer-based materials, timeline animation, states & events system, physics, particles, variables & data (webhooks, APIs, AI). Export to Web (JS/React/Next.js), iOS, Android, Webflow, Framer, Wix. AI 3D generation ("Omma" — natural language to 3D). No-code 3D interactivity. |
| **Pricing** | Free tier (limited exports). Pro from $44/month. Team/Enterprise plans |
| **Best for** | Designers adding 3D without code, interactive 3D without WebGL expertise, Webflow/Framer 3D integration |
| **Alternatives** | Three.js, Blender + export, Cinema 4D + export |

---

## 3. React Animation Ecosystem

### React Three Fiber + Drei

| Field | Detail |
|---|---|
| **URL** | https://github.com/pmndrs/react-three-fiber / https://github.com/pmndrs/drei |
| **Category** | React 3D |
| **What it offers** | See above (Section 2). Drei adds: OrbitControls, Text (troika-three-text), Html, Float, Sky, Environment, ContactShadows, Bounds, GizmoHelper, Grid, Loader, Stats, SoftShadows, MeshTransmissionMaterial, etc. |
| **Pricing** | **Free** (MIT) |
| **Alternative** | Vanilla Three.js, Spline |

### Framer Motion (see Motion)

Already covered in Section 1. The React-specific animation library by Framer.

### React Spring

| Field | Detail |
|---|---|
| **URL** | https://www.react-spring.dev |
| **Category** | React Animation Library |
| **What it offers** | Spring-physics-based animation for React. useSpring, useTrail, useChain, useTransition, useGesture. Interpolation, animated components. Works with React Native. |
| **Pricing** | **Free** (MIT) |
| **Best for** | Physics-driven UI animations, gesture-linked motion, natural-feeling transitions |
| **Alternative** | Motion (Framer Motion), GSAP + React |

### AutoAnimate

| Field | Detail |
|---|---|
| **URL** | https://auto-animate.formkit.com |
| **Category** | React/Vue/Svelte Animation Utility |
| **What it offers** | Zero-config animation. Add motion to lists, accordions, menus with one line. Animate layout changes automatically using FLIP. Tiny (~4 KB). Framework-agnostic (React/Vue/Svelte/Solid). |
| **Pricing** | **Free** (MIT) |
| **Best for** | Quick layout transitions, list reordering, mount/unmount animations with zero setup |
| **Alternative** | Frammer Motion layout animations, GSAP Flip |

---

## 4. SVG Animation Tools

### Vivus

| Field | Detail |
|---|---|
| **URL** | https://github.com/maxwellito/vivus |
| **Category** | SVG Animation Library |
| **What it offers** | JavaScript library to draw SVGs in real time (line-by-line stroke animation). Three animation types: Delayed, Sync, OneByOne. Callbacks, custom timing, path animation. No dependencies. |
| **Pricing** | **Free** (MIT) |
| **Best for** | SVG logo reveals, handwritten-style text, illustrative loading animations, signature effects |
| **Alternatives** | GSAP DrawSVG plugin, Anime.js line drawing |

### Snap.svg

| Field | Detail |
|---|---|
| **URL** | https://snapsvg.io |
| **Category** | SVG Manipulation Library |
| **What it offers** | Modern SVG manipulation library (successor to Raphael.js). Create, manipulate, and animate SVG content programmatically. SVG matrix transforms, groups, masks, gradients, SVG filters. Works with existing SVG documents. |
| **Pricing** | **Free** (Apache 2.0) |
| **Best for** | Complex SVG manipulations, SVG-based games/drawings, programmatic SVG generation |
| **Alternatives** | Raw SVG + CSS/JS, GSAP |

### GSAP MorphSVG & DrawSVG

| Field | Detail |
|---|---|
| **URL** | https://gsap.com (Club GSAP plugins) |
| **Category** | SVG Animation (Premium GSAP Plugins) |
| **What it offers** | MorphSVG: morph one SVG shape into another (handles differing point counts via shapeIndex). DrawSVG: animate the stroke-dashoffset/dasharray of SVG lines for drawing effects. |
| **Pricing** | Club GSAP ($50–$199/year) |
| **Best for** | SVG logo morphing, line drawing reveals, icon transitions |
| **Alternatives** | Anime.js morphing, CSS stroke-dashoffset animation |

---

## 5. Lottie & Vector Animation

### LottieFiles

| Field | Detail |
|---|---|
| **URL** | https://lottiefiles.com |
| **Category** | Lottie Animation Platform |
| **What it offers** | World's largest library of Lottie animations (800k+ free & premium). Lottie Creator (browser-based animation editor), dotLottie format (90% smaller than GIF), Motion Copilot (AI keyframe generation), Prompt to Vector, Lottie to GIF, SVG to Lottie, JSON Editor. Integrations: Figma, After Effects, Canva, Webflow, Framer, Premier Pro. Runtimes for Web (JS/React/Vue/Svelte), iOS, Android. Digital Asset Management (DAM). |
| **Pricing** | Free tier (download limits, public animations). Pro from $16/month. Team/Enterprise |
| **Best for** | Lightweight icons/illustrations, loading animations, UI micro-interactions, cross-platform motion |
| **Alternatives** | Rive, Haiku Animator, LottieLab |

### LottieLab

| Field | Detail |
|---|---|
| **URL** | https://www.lottielab.com |
| **Category** | Lottie Editor |
| **What it offers** | Browser-based Lottie animation editor. Create and edit Lottie JSON files without After Effects. Keyframe editor, timeline, easing curves, vector editing. Export as Lottie JSON or dotLottie. |
| **Pricing** | Free tier with watermarks; Pro from $9/month |
| **Best for** | Quick Lottie edits, creating animations without After Effects |
| **Alternatives** | LottieFiles Creator, Haiku Animator, Rive |

### Haiku Animator

| Field | Detail |
|---|---|
| **URL** | https://www.haikuanimator.com |
| **Category** | Motion Design Tool |
| **What it offers** | Design tool for Lottie, GIF, and video exports. Timeline-based animation. Integrates with design tools. Export to Lottie JSON, GIF, video. |
| **Pricing** | Free tier; Pro from $15/month (historical — product may have evolved) |
| **Best for** | Product designers adding motion to UI components |
| **Alternatives** | LottieFiles Creator, Rive |

### Rive

| Field | Detail |
|---|---|
| **URL** | https://rive.app |
| **Category** | Interactive Motion Design Tool + Runtime |
| **What it offers** | Full interactive experience engine. Design, animate, and code in one editor. State Machine (event-driven animation logic), GPU-accelerated renderer (120fps), scripting support. Vector graphics, bones, mesh deformations. Open source runtimes for Web, iOS, Android, Flutter, React, React Native, Framer, Webflow, Wix Studio, Unity, Unreal, C++, Defold. Files up to 90% smaller than Lottie. Used by Spotify Wrapped, Duolingo, LinkedIn, Disney, Google. |
| **Pricing** | Free tier (limited editor usage). Pro from $25/month. Team/Enterprise |
| **Best for** | Interactive UI animations, game UI, character animation, multi-platform motion design, responsive interactive graphics |
| **Alternatives** | LottieFiles, After Effects + Bodymovin, CSS animations |

---

## 6. No-Code Animation Builders

### Webflow

| Field | Detail |
|---|---|
| **URL** | https://webflow.com |
| **Category** | No-Code Website Builder + CMS |
| **What it offers** | Visual web design platform with built-in animation system. Interactions panel: scroll-triggered, hover, click, page-load animations. 3D transforms, parallax, timeline sequencing, multi-step interactions, Lottie integration, Spline integration, Rive support. CMS, hosting, e-commerce. |
| **Pricing** | Free (site with webflow.io domain). Basic from $18/month. CMS from $29/month. Business from $49/month |
| **Best for** | Designers building animated marketing sites, portfolios, no-coders needing scroll storytelling |
| **Alternatives** | Framer, Wix Studio, Squarespace |

### Framer

| Field | Detail |
|---|---|
| **URL** | https://framer.com |
| **Category** | No-Code Website Builder |
| **What it offers** | Design tool + website builder. Animation system: scroll-triggered, page-load, hover/tap, overlay transitions, magic motion (automatic). Supports Spline, Rive, LottieFiles integrations. Templates marketplace. AI features for content generation. CMS collections, SEO, hosting. |
| **Pricing** | Free (framer.domain subdomain). Mini from $5/month. Basic from $15/month. Pro from $25/month |
| **Best for** | Rapid interactive prototyping, animated landing pages, portfolio sites with motion |
| **Alternatives** | Webflow, Wix Studio |

### Wix Studio

| Field | Detail |
|---|---|
| **URL** | https://www.wix.com/studio |
| **Category** | No-Code Website Builder |
| **What it offers** | Agency-grade Wix platform. Animation editor: scroll effects, parallax, hover, reveal, media effects. Spline and Rive integrations. Velo dev platform for custom code, CMS, multi-language, AI tools. |
| **Pricing** | Free tier. Premium from $17/month |
| **Best for** | Agencies, multi-site management, code + no-code hybrid |
| **Alternatives** | Webflow, Framer |

---

## 7. Inspiration Galleries & Showcase Sites

### Awwwards

| Field | Detail |
|---|---|
| **URL** | https://www.awwwards.com |
| **Category** | Inspiration / Awards |
| **What it offers** | Website awards and trends platform. Sites of the Day, Sites of the Month, Nominees, Honors. Filterable by technology (WebGL, GSAP, Three.js, React, Framer, Webflow, CSS animations), category, style. Collections, Directory of top agencies, Academy (courses), Job board, Market (templates). |
| **Pricing** | Free browsing. Pro membership (from $15/month) for analytics, badges, early submissions |
| **Best for** | Finding cutting-edge animated websites, tracking design trends, agency discovery |
| **Alternatives** | CSS Design Awards, Landing.love |

### CSS Design Awards

| Field | Detail |
|---|---|
| **URL** | https://www.cssdesignawards.com |
| **Category** | Inspiration / Awards |
| **What it offers** | CSS/design award platform. Sites of the Day, Week, Month. UI/UX rankings, design trends, collections. Agency directory. |
| **Pricing** | Free browsing |
| **Best for** | CSS-heavy animation inspiration, UI design trends |
| **Alternatives** | Awwwards, Landing.love |

### Landing.love

| Field | Detail |
|---|---|
| **URL** | https://landing.love |
| **Category** | Inspiration Gallery |
| **What it offers** | Curated collection of beautiful landing pages. Filterable by style, industry, tech stack. Focused on conversion-driven design. |
| **Pricing** | Free browsing |
| **Best for** | Landing page inspiration, conversion-oriented animation design |
| **Alternatives** | Awwwards, Lapa.ninja, Land-book |

### CodePen

| Field | Detail |
|---|---|
| **URL** | https://codepen.io |
| **Category** | Code Playground / Community |
| **What it offers** | Social development environment. Write HTML/CSS/JS in browser with instant preview. Features: Files, Blocks (Sass, TypeScript, Tailwind, JSX), Templates, Deployment, versioning, collaboration, Diagnostics. Trending/popular Pens for animation inspiration. Compiler handles preprocessing automatically. |
| **Pricing** | Free tier (public pens). Pro from $8/month (private pens, asset hosting) |
| **Best for** | Prototyping and sharing animation experiments, learning by example, debugging animation code |
| **Alternatives** | JSFiddle, JSBin, CodeSandbox |

### Dribbble

| Field | Detail |
|---|---|
| **URL** | https://dribbble.com |
| **Category** | Design Inspiration / Community |
| **What it offers** | Global community of designers. Shots: UI/UX, animation/motion, 3D, illustration, branding, web design, typography. Animated GIFs and video shots. Project briefs, hiring marketplace (freelancers, agencies). |
| **Pricing** | Free browsing. Pro from $8/month |
| **Best for** | Motion design inspiration, discovering animation/UI trends, finding freelance animators |
| **Alternatives** | Behance, Bestfolios |

### Behance

| Field | Detail |
|---|---|
| **URL** | https://www.behance.net |
| **Category** | Design Portfolio / Inspiration |
| **What it offers** | Adobe's portfolio platform. Curated galleries, motion design projects, interactive prototypes, 3D renders, UX case studies. Curated galleries, Adobe suite integration. |
| **Pricing** | Free |
| **Best for** | Full project case studies, motion design reels, comprehensive design portfolios |
| **Alternatives** | Dribbble, Bestfolios |

### Bestfolios

| Field | Detail |
|---|---|
| **URL** | https://www.bestfolios.com |
| **Category** | Portfolio Inspiration |
| **What it offers** | Showcases the best portfolio websites. Analyzes and highlights what makes them effective. Animated portfolio examples, personal website inspiration. |
| **Pricing** | Free |
| **Best for** | Building personal animated portfolio websites |
| **Alternatives** | Dribbble, Behance |

### FreeFrontend

| Field | Detail |
|---|---|
| **URL** | https://freefrontend.com |
| **Category** | Code Resource / Gallery |
| **What it offers** | Collection of free frontend code snippets, CSS animations, UI components, HTML/CSS/JS examples. Filterable, demo + source code. Tutorials. |
| **Pricing** | Free |
| **Best for** | Ready-to-use animation code, CSS-only animation examples, learning by reading source |
| **Alternatives** | Codrops, CodePen |

### Codrops

| Field | Detail |
|---|---|
| **URL** | https://tympanus.net/codrops |
| **Category** | Tutorial / Resource |
| **What it offers** | Design and development blog with tutorials, inspirational demos, and blueprints. High-quality animation/UI demos with source code. Collective, Playground sections. |
| **Pricing** | Free |
| **Best for** | Learning advanced CSS/JS animation techniques, inspiration with source code breakdown |
| **Alternatives** | FreeFrontend, CSS-Tricks |

---

## 8. Design-to-Code & Asset Generators

### Figma

| Field | Detail |
|---|---|
| **URL** | https://figma.com |
| **Category** | Design Tool |
| **What it offers** | Collaborative interface design tool. Vector editing, prototyping, auto-layout, component systems, variables, dev mode. Plugins: LottieFiles, Spline, Rive, Haikei, Blobmaker, Icon sets. Prototyping with smart animate for motion previews. FigJam for whiteboarding. |
| **Pricing** | Free tier (3 projects). Pro from $12/month | org/enterprise plans |
| **Best for** | UI design for animated websites, prototyping motion, design system management |
| **Alternatives** | Sketch, Penpot (open source), Framer |

### Haikei

| Field | Detail |
|---|---|
| **URL** | https://haikei.app |
| **Category** | SVG Asset Generator |
| **What it offers** | Web app to generate unique SVG design assets. 15+ generators: layered waves, blobs, peaks, steps, gradients, low-poly grids, circle scatter, blurry gradients, symbols, etc. Export as PNG/SVG. Customizable colors, canvas sizes (UI, social, print). No signup required. |
| **Pricing** | **Free** (no account needed) |
| **Best for** | SVG backgrounds, section dividers, decorative shapes, gradient blobs for animated sections |
| **Alternatives** | Get Waves, Blobmaker, SVG Wave, Shape Divider |

### Aceternity UI

| Field | Detail |
|---|---|
| **URL** | https://ui.aceternity.com |
| **Category** | UI Component Library |
| **What it offers** | Copy-paste React components with Tailwind CSS and motion. Animated hero sections, bento grids, cards with hover effects, background beams, animated tooltips, parallax scroll, infinite scroll, 3D flip cards, shaders. Dark/light mode components. |
| **Pricing** | Free. Pro (premium components) from $49 |
| **Best for** | React/Tailwind animated website building, pre-built animated sections, micro-interactions |
| **Alternatives** | Aniq-UI, Magic UI, shadcn/ui |

### Aniq-UI

| Field | Detail |
|---|---|
| **URL** | https://aniq-ui.com |
| **Category** | UI Component Library |
| **What it offers** | Animated React components built with Tailwind CSS and Framer Motion. Pre-built animated sections, cards, navigation, heroes, grids. |
| **Pricing** | Free |
| **Best for** | Quick animated React UI scaffolding |
| **Alternatives** | Aceternity UI, Magic UI |

### Blobmaker

| Field | Detail |
|---|---|
| **URL** | https://www.blobmaker.app |
| **Category** | SVG Generator |
| **What it offers** | Generate random organic SVG blobs. Customizable complexity, contrast, color. Export as SVG. |
| **Pricing** | **Free** |
| **Best for** | Organic blob backgrounds, organic shapes for animated section backdrops |
| **Alternatives** | Haikei blobs, Get Waves |

### Squoosh

| Field | Detail |
|---|---|
| **URL** | https://squoosh.app |
| **Category** | Image Optimization |
| **What it offers** | Browser-based image compression. Supports JPEG, PNG, WebP, AVIF. Adjustable quality, resize, compress. Compare original vs compressed visually. |
| **Pricing** | **Free** |
| **Best for** | Optimizing images used in animated websites for faster load times |
| **Alternatives** | CloudConvert, TinyPNG, ImageOptim |

### CloudConvert

| Field | Detail |
|---|---|
| **URL** | https://cloudconvert.com |
| **Category** | File Conversion |
| **What it offers** | Online file converter. 200+ formats including video (MP4, WebM, GIF), image (WebP, AVIF), audio, documents. API available. |
| **Pricing** | Free tier (25 conversions/day). Paid packages from $8/month |
| **Best for** | Converting video to GIF, animation formats, batch conversion |
| **Alternatives** | Squoosh, FFmpeg CLI |

### HTMLMinifier / CSSMinifier / Terser

| Field | Detail |
|---|---|
| **URL** | https://htmlminifier.com / https://cssminifier.com / https://terser.org |
| **Category** | Code Minification |
| **What it offers** | Minify HTML/CSS/JS for production. Reduce file sizes of animation payloads. Terser: JavaScript mangler/compressor (supports ES6+). |
| **Pricing** | **Free** |
| **Best for** | Production builds, reducing animation library bundle sizes |
| **Alternatives** | esbuild, swc, Webpack built-in minifiers |

### Unpkg

| Field | Detail |
|---|---|
| **URL** | https://unpkg.com |
| **Category** | CDN |
| **What it offers** | Content delivery network for npm packages. Serve any npm package as a single file. Useful for loading animation libraries via CDN in HTML. |
| **Pricing** | **Free** |
| **Best for** | Quick prototyping, loading GSAP/Three.js/Anime.js from CDN in vanilla HTML |
| **Alternatives** | CDNjs, jsDelivr, Skypack |

### Metatags.io

| Field | Detail |
|---|---|
| **URL** | https://metatags.io |
| **Category** | SEO / Preview |
| **What it offers** | Preview and generate meta tags for social sharing (OG, Twitter Cards). Edit and see previews for Facebook, Twitter, LinkedIn, Slack, Discord. |
| **Pricing** | **Free** |
| **Best for** | Ensuring animated site pages share correctly on social media |
| **Alternatives** | Opengraph.xyz, HeyMeta |

### Favicon.io / RealFaviconGenerator

| Field | Detail |
|---|---|
| **URL** | https://favicon.io / https://realfavicongenerator.net |
| **Category** | Favicon Generator |
| **What it offers** | Generate favicons from text, images, or emoji. Favicon.io: text + image to favicon. RealFaviconGenerator: comprehensive favicon for all platforms (iOS, Android, Windows, macOS). |
| **Pricing** | **Free** |
| **Best for** | Generating animated/standard favicons for web projects |
| **Alternatives** | Canva favicon tool |

---

## 9. Hosting & Deployment

### Vercel

| Field | Detail |
|---|---|
| **URL** | https://vercel.com |
| **Category** | Hosting / Deployment |
| **What it offers** | Frontend deployment platform. Git-integrated, auto-deploy from push/PR. Global CDN (Edge Network), serverless functions, Fluid Compute, Image Optimization, Analytics, Observability. Native support for Next.js, SvelteKit, Nuxt, Astro. AI SDK, AI Gateway. Agent stack for AI deployment. v0 (AI site builder). |
| **Pricing** | Free tier (generous — 100GB bandwidth, 6000 build mins). Pro from $20/month. Enterprise |
| **Best for** | Deploying Next.js animated sites, static sites with SSR, frontend + API |
| **Alternatives** | Netlify, Cloudflare Pages, GitHub Pages |

### Netlify

| Field | Detail |
|---|---|
| **URL** | https://netlify.com |
| **Category** | Hosting / Deployment |
| **What it offers** | Web deployment platform. Git integration, Deploy Previews, Netlify Drop (drag-and-drop deploy). Global CDN, Serverless Functions, Edge Functions (Deno-based), Netlify Forms, Netlify Identity (auth), Image CDN, Blob storage, AI Gateway, Agent Runners. Split testing, rollbacks. |
| **Pricing** | Free tier (100GB bandwidth, 300 build mins). Pro from $19/month. Enterprise |
| **Best for** | JAMstack animated sites, form-handling landing pages, framework-agnostic hosting |
| **Alternatives** | Vercel, Cloudflare Pages, GitHub Pages |

### Cloudflare Pages

| Field | Detail |
|---|---|
| **URL** | https://pages.cloudflare.com |
| **Category** | Hosting / Deployment |
| **What it offers** | JAMstack platform on Cloudflare's global edge network. Git integration, deploy previews, Cloudflare Workers (edge functions), unlimited bandwidth (for static assets), DDoS protection. |
| **Pricing** | Free tier (unlimited bandwidth, 500 builds/month). Pro from $5/month |
| **Best for** | Static animated sites with edge functions, cost-sensitive projects needing high traffic capacity |
| **Alternatives** | Vercel, Netlify, GitHub Pages |

### GitHub Pages

| Field | Detail |
|---|---|
| **URL** | https://pages.github.com |
| **Category** | Hosting |
| **What it offers** | Free static site hosting from GitHub repositories. Auto-publish from main branch or docs folder. Custom domain support. Jekyll integration. 1GB storage, 100GB bandwidth/month. |
| **Pricing** | **Free** (public repos). Private repos: Free with GitHub Free plan |
| **Best for** | Simple static animated sites, documentation, portfolio pages (no backend) |
| **Alternatives** | Netlify, Vercel, Cloudflare Pages |

---

## 10. Performance & Optimization Tools

### Google Lighthouse

| Field | Detail |
|---|---|
| **URL** | https://developer.chrome.com/docs/lighthouse |
| **Category** | Performance Audit |
| **What it offers** | Automated auditing tool in Chrome DevTools. Scores: Performance, Accessibility, Best Practices, SEO, PWA. Audits JS execution, layout shifts, animation performance, cumulative layout shift (CLS), largest contentful paint (LCP), total blocking time (TBT). |
| **Pricing** | **Free** |
| **Best for** | Identifying animation performance bottlenecks, measuring real-world impact of animations |
| **Alternatives** | PageSpeed Insights, WebPageTest, MotionScore |

### PageSpeed Insights

| Field | Detail |
|---|---|
| **URL** | https://pagespeed.web.dev |
| **Category** | Performance Audit |
| **What it offers** | Google's tool for analyzing page speed. Field data (Chrome UX Report) + lab data (Lighthouse). Actionable recommendations for improving animation and rendering performance. |
| **Pricing** | **Free** |
| **Best for** | Public-facing performance audit, Core Web Vitals optimization for animated sites |
| **Alternatives** | Lighthouse DevTools, WebPageTest |

### WebPageTest

| Field | Detail |
|---|---|
| **URL** | https://www.webpagetest.org |
| **Category** | Performance Testing |
| **What it offers** | In-depth web performance testing. Multiple locations, browsers, connection speeds. Filmstrip view, waterfall charts, video capture. Advanced: custom scripts, TTFB, speed index, CPU idle time. |
| **Pricing** | **Free** (limited). Paid plans from $95/month |
| **Best for** | Deep performance debugging of animation-heavy sites, waterfall analysis of 3D asset loading |
| **Alternatives** | Lighthouse, PageSpeed Insights |

### WebPageTest

| Field | Detail |
|---|---|
| **URL** | https://www.webpagetest.org |
| **Category** | Performance Testing |
| **What it offers** | In-depth web performance testing from real browsers (Chrome, Firefox, Safari, Edge). Filmstrip view, waterfall charts, video comparison. Advanced: scripted workflows, custom metrics, TTFB analysis, CDN comparison. Supports multi-step transactions. |
| **Pricing** | **Free** (public instances). Private instances paid |
| **Best for** | Deep performance debugging, 3D asset loading waterfalls, comparing CDN impact on animation delivery |
| **Alternatives** | Lighthouse CI, PageSpeed Insights, Catchpoint |

---

## 11. AI Tools for Animation

### Rive AI (Motion Copilot)

| Field | Detail |
|---|---|
| **URL** | https://rive.app/ai |
| **Category** | AI Animation Tool |
| **What it offers** | AI-powered keyframe generation within Rive editor. Describe motion in natural language → generates keyframes. Part of Rive's broader AI feature set. |
| **Pricing** | Included in Rive subscription (free tier limited) |
| **Best for** | Rapid motion design iteration, reducing manual keyframing |
| **Alternatives** | LottieFiles Motion Copilot |

### LottieFiles Motion Copilot

| Field | Detail |
|---|---|
| **URL** | https://lottiefiles.com/ai |
| **Category** | AI Animation Tool |
| **What it offers** | AI assistant for Lottie animation creation. Describe motion → generate keyframes. Prompt to Vector (text → vector graphics), Raster to Vector (image → vector), Prompt to Themes (auto theming). |
| **Pricing** | Included in LottieFiles free tier (with limits) |
| **Best for** | AI-assisted Lottie creation, vector generation from prompts |
| **Alternatives** | Rive AI, Haikei generators |

### Spline AI (Omma)

| Field | Detail |
|---|---|
| **URL** | https://omma.build (Spline's AI tool) |
| **Category** | AI 3D Generation |
| **What it offers** | Build interactive experiences, websites, 3D, and apps using natural language. Part of Spline ecosystem. |
| **Pricing** | Included in Spline subscription |
| **Best for** | Text-to-3D generation, AI-assisted interactive experience creation |
| **Alternatives** | Meshy, Luma AI, Scenario |

### Vercel v0

| Field | Detail |
|---|---|
| **URL** | https://v0.app |
| **Category** | AI Website Builder |
| **What it offers** | AI-powered web page generation from text prompts. Generates React/Next.js code with Tailwind CSS and motion. Can produce animated components. |
| **Pricing** | Free tier (limited). Pro from $20/month |
| **Best for** | Rapid prototyping of animated landing pages, generating UI with motion from natural language |
| **Alternatives** | Bolt.new, Claude Artifacts, GitHub Copilot |

### Motion AI Kit

| Field | Detail |
|---|---|
| **URL** | https://motion.dev/ai-kit |
| **Category** | AI Agent Tool |
| **What it offers** | Docs, 400+ example sources, performance audits, and production-ready CSS springs designed for AI coding agents. MCP integration for agent specialists. |
| **Pricing** | Motion+ (paid) |
| **Best for** | AI-assisted motion design in code, agent-driven animation generation |
| **Alternatives** | GSAP + LLM, custom pipelines |

---

## 12. Interactive & Scroll-Based Tools

### Lenis (Smooth Scroll)

| Field | Detail |
|---|---|
| **URL** | https://github.com/studio-freight/lenis |
| **Category** | Smooth Scrolling Library |
| **What it offers** | Lightweight smooth scroll library. Easing, direction control, wheel/touch/scroll support, infinite scrolling, RAF-driven. Works with GSAP, ScrollTrigger. ~7 KB gzipped. React hook available. |
| **Pricing** | **Free** (MIT) |
| **Best for** | Smooth scroll experiences, parallax-heavy sites, scroll-driven animation foundations |
| **Alternatives** | Locomotive Scroll, Barba.js, CSS scroll-behavior |

### Locomotive Scroll

| Field | Detail |
|---|---|
| **URL** | https://locomotivemtl.github.io/locomotive-scroll |
| **Category** | Smooth Scrolling Library |
| **What it offers** | Smooth scroll with parallax effects, scroll-driven data attributes (data-scroll, data-scroll-speed), sticky elements, callbacks. Virtual scroll implementation. |
| **Pricing** | **Free** (MIT) |
| **Best for** | Parallax scrolling sites, scroll-triggered content reveals, award-style portfolios |
| **Alternatives** | Lenis, Barba.js, GSAP ScrollTrigger |

### ScrollReveal

| Field | Detail |
|---|---|
| **URL** | https://scrollrevealjs.org |
| **Category** | Scroll Animation Library |
| **What it offers** | Element reveal on scroll. Animate elements into view with configurable delays, distances, origins, intervals, easing. No dependencies. ~7 KB. React wrapper available. |
| **Pricing** | **Free** (GPL-3.0) |
| **Best for** | Simple scroll-triggered reveals, progressive element appearance |
| **Alternatives** | Intersection Observer API + CSS animations, AOS.js, GSAP ScrollTrigger |

---

## 13. Influential Creative Agencies (Reference)

These studios produce cutting-edge animated websites and serve as benchmarks for quality:

### Lusion

| Field | Detail |
|---|---|
| **URL** | https://lusion.co |
| **Location** | Bristol, UK |
| **Notable work** | Porsche "Dream Machine", Devin AI, Meta "Spatial Fusion", Oryzo AI, Synthetic Human |
| **Stack signals** | Three.js, WebGL, GSAP, custom shaders, WebGPU research (labs.lusion.co) |
| **Style** | Immersive 3D storytelling, interactive brand experiences, WebGL-heavy |

### Active Theory

| Field | Detail |
|---|---|
| **URL** | https://activetheory.net |
| **Notable work** | Spotify Wrapped Party, Google I/O experiences, Nike, Sony |
| **Stack signals** | Three.js, WebGL, GSAP, custom WebGL engines |
| **Style** | Immersive canvas-based experiences, WebGL-first, multi-platform |

### Obys Agency

| Field | Detail |
|---|---|
| **URL** | https://obys.agency |
| **Notable work** | Obys Experiment Space (2026 Awwwards Site of the Day), brand identities |
| **Stack signals** | Three.js, GSAP, custom WebGL, typography-driven experiences |
| **Style** | Dark, typography-forward, WebGL experiments, micro-interactions |

### Unseen Studio

| Field | Detail |
|---|---|
| **URL** | https://unseen.co |
| **Notable work** | High-end 3D interactive experiences |
| **Stack signals** | Three.js, WebGL, GSAP |
| **Style** | Cinematic 3D, atmospheric, narrative-driven |

### Resn

| Field | Detail |
|---|---|
| **URL** | https://resn.com |
| **Notable work** | Squarespace Foundations, multi-award winning |
| **Stack signals** | WebGL, Three.js, GSAP, custom shaders |
| **Style** | Playful 3D, experimental, WebGL-driven storytelling |

---

## 14. Appendix: Ecosystem Map

```
                  ┌─────────────────────────────────────────────────┐
                  │          ANIMATED WEBSITE ECOSYSTEM             │
                  └─────────────────────────────────────────────────┘

   ┌─────────────────────┐    ┌──────────────────┐    ┌─────────────────┐
   │  ANIMATION LIBRARIES │    │  3D / WEBGL      │    │  NO-CODE        │
   │                     │    │                  │    │  BUILDERS       │
   │  GSAP (pro)         │    │  Three.js        │    │                 │
   │  Motion (Framer)    │    │  Babylon.js      │    │  Webflow        │
   │  Anime.js           │    │  PlayCanvas      │    │  Framer         │
   │  Mo.js              │    │  R3F + Drei      │    │  Wix Studio     │
   │  Velocity.js        │    │  Spline (editor) │    │  Squarespace    │
   │  ScrollReveal       │    │  (tool)          │    │                 │
   └─────────┬───────────┘    └────────┬─────────┘    └────────┬────────┘
             │                        │                        │
             ▼                        ▼                        ▼
   ┌─────────────────────┐    ┌──────────────────┐    ┌──────────────────┐
   │  SVG TOOLS          │    │  LOTTIE / RIVE   │    │  AI TOOLS        │
   │                     │    │                  │    │                  │
   │  Snap.svg           │    │  LottieFiles     │    │  Rive AI         │
   │  Vivus              │    │  Rive            │    │  LottieFiles AI  │
   │  GSAP MorphSVG (p)  │    │  LottieLab       │    │  Spline Omma     │
   │  GSAP DrawSVG (p)   │    │  Haiku Animator  │    │  Motion AI Kit   │
   └─────────────────────┘    └──────────────────┘    └──────────────────┘

   ┌─────────────────────┐    ┌──────────────────┐    ┌──────────────────┐
   │  SCROLL TOOLS       │    │  ASSET GEN       │    │  HOSTING         │
   │                     │    │                  │    │                  │
   │  Lenis              │    │  Figma           │    │  Vercel          │
   │  Locomotive Scroll  │    │  Haikei (SVG)    │    │  Netlify         │
   │  GSAP ScrollTrigger │    │  Blobmaker       │    │  Cloudflare Pages│
   │  Barba.js (trans)   │    │  Aceternity UI   │    │  GitHub Pages    │
   │                     │    │  Squoosh (img)   │    │                  │
   └─────────────────────┘    └──────────────────┘    └──────────────────┘

   ┌─────────────────────┐    ┌──────────────────┐    ┌──────────────────┐
   │  INSPIRATION        │    │  PERFORMANCE     │    │  BENCHMARK       │
   │                     │    │                  │    │  AGENCIES        │
   │  Awwwards           │    │  Lighthouse      │    │                  │
   │  CSS Design Awards  │    │  PageSpeed Ins.  │    │  Lusion          │
   │  Landing.love       │    │  WebPageTest     │    │  Active Theory   │
   │  CodePen            │    │  MotionScore     │    │  Obys Agency     │
   │  Dribbble           │    │  Squoosh (opt)   │    │  Unseen Studio   │
   │  Behance            │    │  Terser (min)    │    │  Resn            │
   └─────────────────────┘    └──────────────────┘    └──────────────────┘

   Legend: (p) = paid
```

---

## Summary Statistics

| Metric | Count |
|---|---|
| Total resources catalogued | ~60 |
| Animation libraries | 7 |
| 3D/WebGL tools | 5 |
| React animation tools | 4 |
| SVG animation tools | 4 |
| Lottie/Rive tools/platforms | 4 |
| No-code builders | 3 |
| Inspiration galleries | 7 |
| Design/asset generators | 7 |
| Hosting platforms | 4 |
| Performance tools | 3 |
| AI animation tools | 5 |
| Scroll/interaction tools | 3 |
| Reference agencies | 5 |
| Optimization/minification | 6 |

---

*This is research-only output. No code was written.*
