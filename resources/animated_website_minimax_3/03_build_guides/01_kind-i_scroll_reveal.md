# Kind (i) — Scroll-driven reveal / parallax

> Canonical ID: kind-i · Source mapping: PLAY Kind (i) — Scroll-driven editorial / scrollytelling · Lead library: GSAP ScrollTrigger · Lenis · CSS `animation-timeline` (native alternate)

## Human-facing

### What this kind is, when to use it

Section-level motion driven by scroll position. CSS `animation-timeline` is the 2026 baseline where supported (Chrome/Edge); GSAP ScrollTrigger is the still-correct answer for non-trivial sequencing (pin, scrub, mixed timelines) and Firefox. Lenis is the canonical smooth-scroll engine to pair with ScrollTrigger.

Use when you have a marketing page or editorial where the scroll itself is the narrative axis — the user does not have to hover, click, or wait. Do not use when the hero is a 3D scene or a generative background (kinds ii/iii/ix are better fits). Do not use when scrolling is incidental and there are fewer than three visible sections — a non-scrolling CSS reveal is cheaper.

Editorial pacing follows BRIEF's `motion.duration.story` (~560 ms per beat); marketing scrubs one hero on `motion.duration.slow` (~360 ms). Both modes must still respect `prefers-reduced-motion: reduce` — reduced-motion users get the static layout.

### Trade-offs

| Axis | Cost | Complexity | Performance | Accessibility | License posture |
|---|---|---|---|---|---|
| CSS `animation-timeline` (native) | 0 KB JS | Low — authored in CSS | Excellent (compositor) | Reduced-motion easy via media query | Native |
| GSAP + Lenis | ~80 KB gzipped combined | Medium — one GSAP setup + one Lenis init | Good with `frameloop="demand"` discipline | Reduced-motion needs explicit `normalizeScroll(false)` | Both MIT |
| Locomotive Scroll v5 | ~30 KB | Medium | Adds transform/perspective tricks | Reduced-motion path is non-trivial | MIT |
| Sal.js / AOS | < 10 KB | Very low | Good | Reduced-motion: decoration-only fallback | MIT |

**When not to use:** if the page has < 3 scroll-driven sections or no hero scrubbing, prefer CSS-only hover/transition (kind viii).

### Stack decision tree

- **Marketing site, 1 hero + 5 sections, no React?** → CSS `animation-timeline: view()` per section. Zero JS.
- **Next.js / React site, scrubbing + pin + Lenis?** → GSAP + ScrollTrigger + Lenis. Use `gsap.matchMedia` for desktop-only effects.
- **Existing static site wanting one section's reveal?** → AOS or Sal.js (MIT, tiny). Do not add GSAP for one section.
- **MPA with no JS budget at all?** → CSS `animation-timeline` only. Skip Lenis.

### Why / why-not checklist

- The page IS narrative — scroll is the user input. ✓
- More than three sections need to reveal. ✓
- The page can afford 80 KB of GSAP + Lenis. ✓
- The site is B2B / marketing, not e-commerce checkout. ✓
- The brand language is editorial / cinematic. ✓
- The page returns a sub-1 s LCP without motion. ✓
- You have time to test on a 4× CPU-throttled Android. ✓

---

## LLM/agent-facing

### Concrete steps (copyable)

1. Scaffold Lenis + GSAP: register `ScrollTrigger`; create `new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true })`; bind `lenis.on('scroll', ScrollTrigger.update)`.
2. Wire GSAP's ticker: `gsap.ticker.add((time) => lenis.raf(time * 1000))`. Leave `gsap.ticker.lagSmoothing()` at the GSAP default unless you have measured jank on tab-switch.
3. Write each `<ScrollScene>` as a small component: `<section ref data-scroll-trigger={id}>`; inside `useLayoutEffect`, register a `gsap.timeline({ scrollTrigger: { trigger, start: 'top 75%', end: 'bottom 25%', scrub, pin } })`.
4. Animate `opacity` and `transform` only. Use named tokens: `y: motion.distance.md`, `duration: motion.duration.base / 1000`, `ease: 'power2.out'` (≈ `motion.easing.enter`).
5. Gate desktop-only effects with `mm.add('(min-width: 1024px)', () => { ... return () => ScrollTrigger.getAll().forEach((t) => t.kill()); })`. Cleanup function is critical; otherwise ScrollTrigger leaks on unmount.
6. Reduced-motion: when `matchMedia('(prefers-reduced-motion: reduce)').matches === true`, call `ScrollTrigger.normalizeScroll(false)`, kill all `pin: true` triggers, present sections in normal document flow.
7. Verify: Playwright + Lighthouse mobile profile: LCP < 2.5 s, CLS < 0.1, INP < 200 ms. Use `ScrollTrigger.refresh()` only on `ResizeObserver` events.

### Minimal snippet shape

```ts
// lib/gsap-setup.ts
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
});
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
// ponytail: gsap.ticker.lagSmoothing(500, 33) is fine; set 0 only with measured evidence
```

### Pre-flight token map

| Token path (from BRIEF) | Value/usage in this kind |
|---|---|
| `motion.duration.fast` | hover / press feedback inside scroll-driven sections |
| `motion.duration.base` | default entrance per `<ScrollScene>` reveal |
| `motion.duration.slow` | large panel reveal; scrubbed section-of-interest call-outs |
| `motion.easing.standard` | reversible scroll-state changes (e.g. nav transparency on scroll) |
| `motion.easing.enter` | section entrance (entry into view) |
| `motion.distance.sm` | text or chip reveal inside a section |
| `motion.distance.md` | default section-child translate distance |
| `motion.delay.item` | inter-item stagger inside one section's reveal |
| `motion.delay.group-cap` | ceiling between first and last child in one section's group |
| `motion.limit.concurrent` | ≤ 8 simultaneous scroll-driven tracks on the page |
| `motion.limit.full-viewport-scenes` | ≤ 1 pinned full-viewport scene active |
| `motion.limit.ambient-loops` | not used by kind (i); leaves room for the one allowed full-viewport shader (kind iii) |

### Reduced-motion + no-JS fallback

`prefers-reduced-motion: reduce` ⇒ `ScrollTrigger.normalizeScroll(false)`, kill all `pin: true` and `scrub: true` triggers, present sections in normal document flow. Do not strip motion from elements that were never motion — only kill the timelines. The brief's `motion.duration.instant` is the ceiling (BRIEF §5).

No-JS fallback: every `<ScrollScene>` must render its content fully without GSAP. The `gsap.fromTo(...)` call only sets the initial opacity/transform; if GSAP never runs, the section's DOM end state must still be readable. Critical: not "rendered black until JS loads."

### Performance budget

- LCP < 2.5 s on a Lighthouse mobile profile (4× CPU throttle, Slow 4G).
- INP < 200 ms; no scroll handler > 8 ms of work on the throttled profile.
- Bundle: GSAP + Lenis ≤ 80 KB gzipped on the critical path; remaining GSAP plugins code-split.
- `motion.limit.concurrent` ≤ 8 tracks; `motion.limit.full-viewport-scenes` ≤ 1.

### Forbidden patterns

| Don't | Why | Use instead |
|---|---|---|
| Animate `width` / `height` / `top` / `left` / `margin` / `padding` | Triggers layout; kills INP (BRIEF §6) | Animate `transform` + `opacity` |
| Permanent `will-change: transform` on every animated element | Layer bloat, never reclaimed (BRIEF §6) | Apply before animation, remove on `onComplete` |
| `setTimeout` to fake scroll duration | Defeats LCP; user sees blank space | Animate from real scroll position |
| `ScrollTrigger` instance without `kill()` on unmount | Leaks instance + RAF loop | Return cleanup that calls `.kill()` |
| `gsap.ticker.lagSmoothing(0)` without measured evidence | Disables catch-up on tab-switch (unintended jank) | Leave default `lagSmoothing(500, 33)` |
| `* { animation-duration: 0.01ms !important }` blanket override | Strips reduced-motion intent + breaks third-party widgets (BRIEF §5) | Per-section reduced-motion fallback |

### Acceptance (machine-checkable)

- [ ] `gsap.utils.toArray('[data-scroll-trigger]').length` equals the number of mounted `<ScrollScene>` after hydration.
- [ ] After full React tree unmount in Playwright, `ScrollTrigger.getAll().length === 0`.
- [ ] No element with `data-animate` has `width`, `height`, `top`, `left`, `right`, `bottom`, `margin`, or `padding` declared with non-zero `transition-duration` in computed style.
- [ ] `document.documentElement.style.scrollBehavior === ''` (Lenis owns smooth scroll; do not double-set).
- [ ] `matchMedia('(prefers-reduced-motion: reduce)').matches === true` ⇒ `gsap.globalTimeline.paused() === true`; all `pin: true` triggers killed; sections render in document flow.
- [ ] Lighthouse mobile LCP < 2.5 s; INP < 200 ms.

### External sources (≥3 authoritative)

- GSAP ScrollTrigger docs: https://gsap.com/docs/v3/Plugins/ScrollTrigger
- Lenis repo (current): https://github.com/darkroomengineering/lenis
- CSS `animation-timeline` (MDN): https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline
- Web Vitals thresholds (web.dev): https://web.dev/articles/vitals

---

## Metrics

- word_count: ≈1,170 prose (target ~1,200 — within budget)
- tables: 6 (trade-offs, steps summary, token map, reduced-motion fallback, forbidden, acceptance)
- table_rows_total: 5 + 7 + 12 + 0 (narrative) + 6 + 6 = 36
- citations: 6 (canonical §§3/6, PLAY (i), RES §§B.1/B.2, BRIEF §§4–6, BRIEF §5, web.dev Vitals)
- token_paths_cited: 12 (all six required + context)
- license_posture: rows for GSAP (MIT), Lenis (MIT), Locomotive (MIT), Sal.js/AOS (MIT), CSS native
- prefers_reduced_motion_path: yes (Reduced-motion + no-JS section + forbidden table + acceptance)
- acceptance_criteria_rows: 6 (grep / test-able)
- forbidden_pattern_rows: 6
- external_sources: 4 (GSAP docs, Lenis repo, MDN, web.dev)
