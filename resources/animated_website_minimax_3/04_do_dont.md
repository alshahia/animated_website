# Do / Don't — animated websites

**Scope.** These are strong defaults for canonical `kind-i` through `kind-xii`, not measured laws. The motion contract is the design brief: use named dot-separated tokens, preserve readable content when triggers fail, and test representative devices. Evidence is synthesized from `CAN §7`, `PLAY §What to use vs what to avoid`, and `BRIEF §§4–7`.

## Use

| # | Practice | Reason / evidence | Source pointer |
|---:|---|---|---|
| 1 | Animate `transform` and `opacity` first. | They are compositor-friendly; layout properties can trigger reflow and hurt interaction responsiveness. | `BRIEF §6`; `PLAY Use 16` |
| 2 | Honor `prefers-reduced-motion` per behavior. | Replace large movement with final state, `motion.distance.none`, or static content rather than disabling every animation blindly. | `BRIEF §5`; `CAN §7` |
| 3 | Use `motion.duration.*` and `motion.easing.*`. | A shared grammar keeps product, editorial, and immersive motion coherent. | `BRIEF §§4,7,9` |
| 4 | Keep one dominant focal point moving. | Hierarchy survives when secondary motion is quieter or delayed. | `BRIEF §4`; `PLAY Use 30` |
| 5 | Cap active tracks at `motion.limit.concurrent`. | Eight concurrent tracks is a readable, testable ceiling, not permission to animate every node. | `BRIEF §6`; `CAN §7` |
| 6 | Cap full-viewport scenes at `motion.limit.full-viewport-scenes`. | One canvas/WebGL scene limits GPU contention and fallback complexity. | `BRIEF §6` |
| 7 | Cap ambient loops at `motion.limit.ambient-loops`. | Two loops maximum reduces distraction, battery use, and visual competition. | `BRIEF §6` |
| 8 | Prefer CSS `animation-timeline` for simple `kind-i` reveals. | Native CSS can deliver a zero-library alternate when support and choreography fit. | `CAN §2`; MDN animation-timeline |
| 9 | Use GSAP ScrollTrigger (MIT, free) for pinned, scrubbed scenes. | It supplies timeline orchestration where native CSS is not enough. | `PLAY Use 1`; GSAP docs |
| 10 | Use Lenis (MIT), current repo `darkroomengineering/lenis`, only when smooth scrolling earns its cost. | It integrates with ScrollTrigger; native scrolling remains the baseline. | `CAN §4`; Lenis README |
| 11 | Use Motion (MIT), package `motion`, for React-first UI motion. | `motion/react` provides declarative layout and gesture behavior without the old name. | `CAN §4`; Motion docs |
| 12 | Use Three.js r185+ (MIT) with WebGL fallback before opting into WebGPU. | r185 is the 2026 baseline, but feature detection protects unsupported browsers. | `CAN §1`; Three.js docs |
| 13 | Use React Three Fiber (MIT) when the product is React. | It keeps scene ownership declarative while retaining the Three.js ecosystem. | `CAN §4`; R3F docs |
| 14 | Use `<model-viewer>` (Apache-2.0) for a focused GLB/AR embed. | A web component is smaller operationally than a bespoke scene graph for this narrow job. | `CAN §4`; model-viewer docs |
| 15 | Use dotLottie-web (MIT) for new Lottie delivery. | `.lottie` archives and lazy playback reduce asset and lifecycle overhead. | `CAN §4`; dotLottie docs |
| 16 | Use Rive runtime (MIT; editor SaaS) for state-machine illustration. | State transitions belong in the asset when UI states are the content. | `CAN §2`; Rive docs |
| 17 | Use inline SVG with `currentColor` for animated marks. | Inline paths are scriptable and theme-safe; semantic labels remain available. | `PLAY Use 8`; `BRIEF §1` |
| 18 | Use SplitType (MIT) or GSAP SplitText (MIT/free) only for short text. | Character-level motion can support hierarchy without making reading depend on a reveal. | `PLAY Use 9`; `BRIEF §4` |
| 19 | Pause canvas, video, and RAF work when hidden or offscreen. | Visibility and intersection gates save battery and avoid background work. | `BRIEF §6`; MDN Intersection Observer |
| 20 | Reserve intrinsic media dimensions. | Posters, `width`/`height`, and stable containers protect CLS while animation loads. | `BRIEF §6`; web.dev CLS |
| 21 | Put a poster image before a WebGL hero. | The readable 2D fallback can become LCP and survives JS or GPU failure. | `CAN §6`; `BRIEF §6` |
| 22 | Gate hover behavior with `(hover: hover) and (pointer: fine)`. | Touch users do not get sticky hover states. | `PLAY Use 25`; MDN pointer |
| 23 | Keep keyboard focus in DOM order and style `:focus-visible`. | Visual choreography must not reorder navigation or hide focus. | `BRIEF §5`; `PLAY Use 24` |
| 24 | Make the real hit area at least `size.touch-target`. | A small animated icon can remain usable when its target is 44px. | `BRIEF §3`; WCAG 2.5.5 |
| 25 | Pair color with text, shape, position, or icon. | Motion and color alone are not reliable status or category cues. | `BRIEF §§1,5` |
| 26 | Use logical `start`/`end` motion and CSS properties. | RTL and localized reading order need direction-aware choreography. | `BRIEF §8`; `CAN §9` |
| 27 | Use Playwright (Apache-2.0) + axe-core (MPL-2.0) + Lighthouse CI (Apache-2.0) as the concrete test stack. | Interaction, accessibility, and performance need separate gates. | `CAN §2`; `PLAY Step 9` |
| 28 | Load non-critical engines after the critical path. | Code splitting and intersection-based mounting protect LCP. | `PLAY Use 7`; `BRIEF §6` |
| 29 | Apply `will-change` only around a known transform/opacity animation. | Permanent layers consume memory without proving benefit. | `BRIEF §6`; MDN will-change |
| 30 | Ship motion behind a measurable flag. | A control group makes conversion, Core Web Vitals, and rollback evidence real. | `CAN §8`; `PLAY Step 10` |

## Avoid

| # | Practice | Reason / evidence | Source pointer |
|---:|---|---|---|
| 1 | Animate `width`, `height`, `top`, `left`, `margin`, or `padding`. | These properties can force layout work and make scroll or input janky. | `BRIEF §6`; `PLAY Avoid 1` |
| 2 | Use `* { animation-duration: 0.01ms !important; }` as the only reduced-motion plan. | It can break widgets and leave scroll or focus state inconsistent. | `BRIEF §5`; `PLAY Avoid 2` |
| 3 | Leave `will-change: transform` on every animated element. | Permanent compositing layers increase memory pressure. | `BRIEF §6`; `PLAY Avoid 3` |
| 4 | Set `gsap.ticker.lagSmoothing(0)` without a profile. | It removes catch-up behavior and hides a diagnosis behind a setting. GSAP is MIT/free. | `PLAY Avoid 4`; GSAP docs |
| 5 | Mount ScrollTrigger without cleanup. | SPA route changes then accumulate phantom triggers and listeners. GSAP is MIT/free. | `PLAY Avoid 5`; GSAP docs |
| 6 | Stack multiple full-viewport WebGL canvases. | It violates `motion.limit.full-viewport-scenes` and multiplies GPU work. Three.js is MIT. | `BRIEF §6`; `CAN §9` |
| 7 | Run RAF loops while the tab is hidden. | Background work drains battery and can resume with a burst of stale frames. | `BRIEF §6`; `PLAY Avoid 7` |
| 8 | Combine native smooth scrolling with Lenis by default. | Two scroll models fight over position and keyboard/assistive navigation. Lenis is MIT. | `PLAY Avoid 8`; Lenis README |
| 9 | Ship an uncompressed GLB or huge texture. | Asset weight becomes the animation's largest performance cost. Three.js is MIT; assets have separate licenses. | `PLAY Avoid 9`; `BRIEF §6` |
| 10 | Autoplay every Lottie on first paint. | It increases work above the fold and ignores reduced motion. dotLottie-web is MIT. | `PLAY Avoid 10`; dotLottie docs |
| 11 | Use a PixiJS or Three.js loop without an offscreen gate. | The scene keeps consuming battery when it cannot be seen. PixiJS and Three.js are MIT. | `PLAY Avoid 11`; `BRIEF §6` |
| 12 | Animate SVG `stroke-dasharray` instead of `stroke-dashoffset`. | It creates unnecessary path work and makes line drawing less predictable. | `PLAY Avoid 12`; `BRIEF §6` |
| 13 | Animate `letter-spacing` every frame. | Text layout changes are expensive and can disturb reading. | `PLAY Avoid 13`; `BRIEF §§4,6` |
| 14 | Call `getBoundingClientRect()` inside every RAF. | Repeated layout reads can force synchronous layout. | `PLAY Avoid 14`; `BRIEF §6` |
| 15 | Rely on hover for touch interaction. | Coarse pointers cannot provide a stable hover contract. | `PLAY Avoid 15`; `BRIEF §8` |
| 16 | Style only `:focus` and ignore `:focus-visible`. | Mouse and keyboard feedback become indistinguishable or inconsistent. | `PLAY Avoid 16`; `BRIEF §5` |
| 17 | Intercept modifier-click navigation. | New-tab and assistive browsing expectations break. | `PLAY Avoid 17`; `BRIEF §5` |
| 18 | Start AudioContext on mount. | Browser autoplay policy blocks it; audio-reactive visuals then fail silently. Tone.js is MIT; Web Audio is native. | `PLAY Avoid 18`; Chrome autoplay |
| 19 | Create a cross-origin audio source without CORS handling. | A tainted canvas can fail when it is sampled for audio reactivity. | `PLAY Avoid 19`; Web Audio docs |
| 20 | Resize a canvas by changing its bitmap attributes every frame. | Reallocating the bitmap causes visible stalls and memory churn. | `PLAY Avoid 20`; `BRIEF §6` |
| 21 | Put an animated logo in `<img src>`. | Script cannot inspect external SVG paths for draw choreography. | `PLAY Avoid 21`; `BRIEF §4` |
| 22 | Ship a canvas without an accessible label or equivalent. | Screen readers receive no useful description of the interactive surface. | `PLAY Avoid 22`; `BRIEF §5` |
| 23 | Use `top`/`left` for pointer tracking. | Layout work replaces a compositor-friendly transform. | `PLAY Avoid 23`; `BRIEF §6` |
| 24 | Stagger every item past `motion.delay.group-cap`. | Long cascades delay content and turn hierarchy into waiting. | `BRIEF §4`; `PLAY Avoid 24` |
| 25 | Replay a reveal on every scroll pass. | Repetition adds noise and steals attention from content. | `PLAY Avoid 25`; `BRIEF §4` |
| 26 | Animate large shadows, blurs, or filters on mobile without evidence. | Paint-heavy effects are costly on low-power devices. | `BRIEF §6`; `PLAY Avoid 26` |
| 27 | Call View Transitions on mount instead of navigation. | The transition is detached from the user's cause and can flash unexpectedly. Native API is free. | `PLAY Avoid 27`; MDN View Transitions |
| 28 | Build a 3D scene without a failure poster. | A context or shader failure becomes a blank hero. Three.js is MIT; assets are separate. | `PLAY Avoid 29`; `BRIEF §6` |
| 29 | Treat Theatre.js `@theatre/studio` as a harmless MIT runtime. | Studio is AGPL network copyleft; use `@theatre/core` Apache-2.0 only after diligence. | `CAN §10`; Theatre license |
| 30 | Treat Remotion or animate.css as unqualified free defaults. | Remotion has a commercial threshold; animate.css uses the Hippocratic License. | `CAN §10`; Remotion and animate.css licenses |

## Top 10 summary

| # | Use | Avoid | Cost if ignored | Source pointer |
|---:|---|---|---|---|
| 1 | Transform/opacity | Layout properties | Reflow, poor INP | `BRIEF §6`; `CAN §7` |
| 2 | Per-behavior reduced motion | Blanket override | Accessibility failure | `BRIEF §5`; `CAN §7` |
| 3 | Lazy-load engines | Root-import every plugin | LCP and bundle regression | `PLAY Use 7`; `BRIEF §6` |
| 4 | Intrinsic poster dimensions | Canvas-first hero | CLS and blank fallback | `BRIEF §6`; `CAN §6` |
| 5 | `motion.limit.concurrent` | Decorate every section | Cognitive and GPU overload | `BRIEF §6`; `CAN §7` |
| 6 | Pause offscreen | Background RAF | Battery drain | `BRIEF §6`; `PLAY Avoid 7` |
| 7 | DOM/focus order | Visual-only order | Keyboard and SR failure | `BRIEF §5`; `PLAY Use 24` |
| 8 | Logical start/end | Physical left/right assumptions | RTL defects | `BRIEF §8`; `CAN §9` |
| 9 | Explicit license flags | “Free” as a blanket label | Commercial compliance risk | `CAN §10`; `RES §§B,D` |
| 10 | Flag, measure, rollback | Ship motion without control | Unrecoverable conversion loss | `CAN §8`; `PLAY Step 10` |

## Metrics

- word_count_total: 2,066; prose_word_count_excluding_tables: 117; prose_budget: ≤2,000 words excluding the three tables
- table_count: 3; data_rows: 70 (30 Use + 30 Avoid + 10 summary)
- citation_count: 76 (70 row source pointers + authority citations); primary citations: `CAN §7`, `PLAY`, `BRIEF §§4–7`, official docs
- exact_counts: use=30; avoid=30; top10=10
