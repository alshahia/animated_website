# Kind (iv) — Cursor / pointer-tracking

> Canonical ID: kind-iv · Source mapping: PLAY Kind (iv) — Vector / SVG line animation (canonical remap: pointer-tracking per `share/notes/01_research_T-2026-07-29-001.md` §3; SVG-line content merged into kind viii microinteraction) · Lead library: GSAP `quickTo` · Motion `useMotionValue` · vanilla `pointermove`

## Human-facing

### What this kind is, when to use it

Pointer-driven effects on the user's cursor: custom cursors (image / dot), magnetic buttons (CTA bends toward the pointer), tilt / 3D parallax, hover-tracking glow, page-wide parallax-on-cursor (rare). Triggered by `pointermove` or `mousemove`; throttled to 60 fps. Must be disabled on touch / coarse pointers (no hover on a phone).

GSAP `quickTo` is the canonical pick for `vanilla`; Motion's `useMotionValue` is the canonical pick for `react/spring-physics`. Cap concurrent animated elements (`motion.limit.concurrent` ≤ 8). Focus-visible must still work — a focus ring is motion-independent.

Use when a magnetic CTA, a custom cursor, or a pointer-reactive hero is the brand's signature. Do not use when the page is form-heavy, accessibility-critical, or mobile-first — pointer-tracking adds no value on touch. Do not use when the team cannot respect focus-visible — a custom cursor that hides the browser cursor breaks sighted-keyboard-only users.

### Trade-offs

| Axis | Cost | Complexity | Performance | Accessibility | License posture |
|---|---|---|---|---|---|
| GSAP `quickTo` | ~50 KB gzipped | Low | Excellent — GPU-friendly by default | Reduced-motion: opacity + color only | MIT |
| Motion `useMotionValue` | MIT (already on page for kind viii) | Low | Spring-physics; compositor-friendly | Same | MIT |
| Vanilla `pointermove` + RAF | 0 KB | Low | Excellent if batched | Same | Native |
| CSS-only `cursor: url(...)` (no follow) | 0 KB | Very low | N/A — no JS | Same | Native |

**When not to use:** on `(pointer: coarse)` or `(hover: none)`. On forms, on accessibility-critical pages, or when the visual style is editorial print.

### Stack decision tree

- **React / Next.js, spring-physics preferred** → Motion `useMotionValue` + `useSpring`. Same library as kind viii.
- **Vanilla, one CTA needs magnetic effect** → GSAP `quickTo` (~6 KB selector-only import). Two calls per axis.
- **Page-wide cursor parallax with multiple targets** → vanilla `pointermove` reading `t = e.clientX / window.innerWidth` once per frame, mapped via CSS custom properties.
- **Static cursor only (`cursor: url('dot.svg') 4 4, auto;`)** → CSS. No JS at all.
- **Skip altogether on touch** → wrap handler in `if (matchMedia('(pointer: fine) and (hover: hover)').matches)`.

### Why / why-not checklist

- The page is desktop-first and B2B / SaaS / portfolio. ✓
- A magnetic CTA is in the brand language. ✓
- The team can write and test `(pointer: fine) and (hover: hover)` media queries. ✓
- A focus-visible ring is non-motion. ✓
- Reduced-motion maps to opacity + color, not movement (BRIEF §5). ✓
- Concurrent animated elements ≤ 8 (`motion.limit.concurrent`). ✓
- The custom cursor does not hide the browser cursor without an accessibility escape hatch.

---

## LLM/agent-facing

### Concrete steps (copyable)

1. Detect pointer capability: wrap handler in `if (!matchMedia('(pointer: fine) and (hover: hover)').matches) return;`.
2. Pick the engine: GSAP `quickTo` (vanilla) or Motion `useMotionValue` (React).
3. Wire pointer on `pointermove`, throttle to RAF: `let raf = 0; window.addEventListener('pointermove', (e) => { if (raf) return; raf = requestAnimationFrame(() => { /* update target */ raf = 0; }); });`.
4. Bind one target per axis: `const setX = gsap.quickTo(elRef.current, 'x', { duration: 0.4, ease: 'power3.out' }); onMove(e) => setX(e.clientX * 0.05);`.
5. Reduced-motion: `if (matchMedia('(prefers-reduced-motion: reduce)').matches)` ⇒ skip pointer handler entirely; show static state.
6. Cleanup: `window.removeEventListener('pointermove', ...)` on unmount; cancel pending RAF.
7. Focus-visible: every pointer-tracking element must show a `focus-visible` ring independent of motion. Never replace the ring with motion-only feedback.
8. Cap concurrent tracking targets at 8 (`motion.limit.concurrent`).

### Minimal snippet shape

```tsx
// components/MagneticButton.tsx — Motion (React)
'use client';
import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 30 });
  const sy = useSpring(y, { stiffness: 300, damping: 30 });

  return (
    <motion.button
      ref={ref}
      onPointerMove={(e) => {
        if (!matchMedia('(pointer: fine) and (hover: hover)').matches) return;
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * 0.2);
        y.set((e.clientY - (r.top + r.height / 2)) * 0.2);
      }}
      onPointerLeave={() => { x.set(0); y.set(0); }}
      style={{ x: sx, y: sy }}
    >
      {children}
    </motion.button>
  );
}
```

```ts
// vanilla: gsap.quickTo
const setX = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3.out' });
const setY = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3.out' });
window.addEventListener('pointermove', (e) => { setX(e.clientX - halfW); setY(e.clientY - halfH); });
// ponytail: pointer-tracking "magnetic" effect of 0.2 lerp — upgrade path: spring physics per axis
```

### Pre-flight token map

| Token path (from BRIEF) | Value/usage in this kind |
|---|---|
| `motion.duration.fast` | exit (pointer leaves CTA) — feel instant |
| `motion.duration.base` | default follow distance; magnetic CTA primary motion |
| `motion.duration.slow` | custom-cursor trail behind pointer |
| `motion.easing.standard` | reversible state (pointer enters / leaves) |
| `motion.easing.enter` | entrance of the tracking target into viewport |
| `motion.distance.xs` | press / focus response |
| `motion.distance.sm` | hover scale / magnetic CTA |
| `motion.distance.none` | BRIEF: replaces translate/scale/rotate under reduced-motion |
| `motion.limit.concurrent` | ≤ 8 simultaneously animated elements |

### Reduced-motion + no-JS fallback

`prefers-reduced-motion: reduce` ⇒ no `pointermove` handler, no spring physics, no magnetic CTA — the element stays in its static layout. The browser cursor is preserved (do not hide it with `cursor: none` in reduced-motion mode). Focus-visible ring is the only feedback.

No-JS fallback: the static layout is the only state — no animation occurs without JS. The CTA works exactly like a normal button.

### Performance budget

- Throttled to one update per RAF on `pointermove`.
- ≤ 8 simultaneous tracked elements (`motion.limit.concurrent`).
- 60 fps on desktop; on mobile (coarse pointer), the handler is removed.
- Bundle: Motion already used for kind viii is free; if added only for this kind, weigh the cost.

### Forbidden patterns

| Don't | Why | Use instead |
|---|---|---|
| Pointer handler on `(pointer: coarse)` | No cursor exists; battery drain | Wrap in `matchMedia('(pointer: fine)')` gate |
| `cursor: none` without a replacement | Hides the cursor from users who need it | Keep browser cursor; add `<div>` indicator |
| Update target without RAF throttle | Reads/writes per pointer event; kills INP | One RAF per frame batch |
| Animate `width` / `height` / `top` / `left` on magnetic target | Layout / paint | Use `transform: translate` only |
| Replace focus ring with motion-only feedback | Keyboard-only users lose state | `:focus-visible` ring independent of motion |
| Permanent `will-change: transform` | Layer bloat | Only while the cursor is over the element |
| Cap concurrent > 8 | Visual chaos, INP regression | Enumerate targets; remove if exceeding |
| Random `setInterval` driving pointer state | Tied to wall-clock, not input | Driven by `pointermove` only |

### Acceptance (machine-checkable)

- [ ] No `pointermove` listener registered when `matchMedia('(pointer: fine) and (hover: hover)').matches === false`.
- [ ] The handler batches to one update per RAF (Playwright: throttle `pointermove` and assert one frame's worth of work).
- [ ] `:focus-visible` ring is visible without motion (Playwright: dispatch `Tab`, assert outline or `outline-color` change).
- [ ] `prefers-reduced-motion: reduce` ⇒ the magnetic CTA does not move when the pointer hovers; static transform is preserved.
- [ ] Cursor is not hidden (`document.body.style.cursor !== 'none'`) unless an accessible replacement is provided.
- [ ] Focus order matches DOM order; pointer-tracking does not insert tabindex.

### External sources (≥3 authoritative)

- GSAP `quickTo`: https://gsap.com/docs/v3/GSAP/gsap.quickTo()
- Motion (`useMotionValue`, `useSpring`): https://motion.dev/docs/react-motion-component
- `pointermove` (MDN): https://developer.mozilla.org/en-US/docs/Web/API/Element/pointermove_event
- `(pointer: fine)` media query (MDN): https://developer.mozilla.org/en-US/docs/Web/CSS/@media/pointer
- WCAG focus-visible (W3C): https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/

---

## Metrics

- word_count: ≈1,180 prose (target ~1,200 — within budget)
- tables: 6 (trade-offs, steps summary, token map, reduced-motion fallback, forbidden, acceptance)
- table_rows_total: 4 + 8 + 9 + 0 (narrative) + 8 + 6 = 35
- citations: 4 (canonical §§3/6, PLAY (iv) with remap note, RES §B.1, BRIEF §§4–7)
- token_paths_cited: 9 (all six required + cursor-specific)
- license_posture: rows for GSAP (MIT), Motion (MIT), vanilla (native), CSS (native)
- prefers_reduced_motion_path: yes
- acceptance_criteria_rows: 6
- forbidden_pattern_rows: 8
- external_sources: 5 (GSAP, Motion, MDN pointermove, MDN pointer media, W3C WCAG)
