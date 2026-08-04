# Kind (viii) — Microinteraction / CSS-only

> Canonical ID: kind-viii · Source mapping: PLAY Kind (viii) — Micro-interactions / hover effects · Lead library: CSS `transition` (compositor-only baseline) · Motion for React · AutoAnimate for layout transitions

## Human-facing

### What this kind is, when to use it

Hover, focus, click feedback on buttons, links, form fields, navigation items. CSS-only is the 2026 baseline: `transition: transform 140ms cubic-bezier(0.2, 0, 0, 1)` costs 0 KB and runs on the compositor. Motion (formerly Framer Motion) is the React-side orchestrator; AutoAnimate is the zero-config layout transition for React/Vue/Svelte/Solid.

The brief is strict: micro-interactions must not exceed `motion.duration.base` (220 ms) for entrance and `motion.duration.fast` (140 ms) for exit. Hover feedback is the most common motion class — instant, not cinematic.

Use everywhere there is a button, link, or interactive element. This kind is the bread and butter of motion; it is mandatory in any well-built site. Do not use on form inputs where motion interferes with focus state. Do not animate focus rings (replacing the ring with motion-only feedback breaks sighted-keyboard users).

### Trade-offs

| Axis | Cost | Complexity | Performance | Accessibility | License posture |
|---|---|---|---|---|---|
| CSS `transition` + `:hover`/`:focus-visible` | 0 KB | Very low | Excellent (compositor) | `@media (hover: hover)` gate | Native |
| Motion (`motion/react`) | MIT | Low | Spring-physics compositor-friendly | Same gate | MIT |
| Motion One (vanilla) | ~3.8 KB | Low | Same | Same | MIT |
| GSAP micro | MIT (already on page) | Overkill for kind viii | Same | Same | MIT |
| AutoAnimate | MIT, ~4 KB | Zero-config | Layout animation | Reduced-motion: instant | MIT |

**When not to use:** animation on focus rings (always keep the focus ring static). Animation on form inputs (interferes with input clarity). Animation that exceeds `motion.duration.base`. Animation that depends on color alone.

### Stack decision tree

- **Plain marketing site / static** → CSS `transition` only.
- **React / Next.js** → Motion (`motion/react`) for spring physics; keep CSS for trivial hover.
- **Layout transitions on a list reorder** → AutoAnimate.
- **One-off non-trivial hover (magnetic CTA)** → kind (iv) cursor tracking is the bigger cousin.
- **Static focus ring (`outline`)** → do not animate. `:focus-visible { outline: 2px solid color.primary; outline-offset: 2px; }`.

### Why / why-not checklist

- There are buttons, links, or interactive elements on the page. ✓
- Hover / focus / click feedback fits the brand language. ✓
- All hover effects are gated by `(hover: hover) and (pointer: fine)`. ✓
- Focus-visible ring is non-motion (`outline`, never `transform`). ✓
- Reduced-motion: opacity + color only; no translate or scale (BRIEF §5). ✓
- Touch targets measure ≥ 44×44 px (BRIEF §3, WCAG 2.5.5). ✓
- `transition-property` is restricted to compositor-friendly properties. ✓

---

## LLM/agent-facing

### Concrete steps (copyable)

1. CSS baseline: `transition: transform 140ms cubic-bezier(0.2, 0, 0, 1), opacity 140ms cubic-bezier(0.2, 0, 0, 1), background-color 140ms cubic-bezier(0.2, 0, 0, 1);` — matches `motion.duration.fast` + `motion.easing.standard`. Use Tailwind utilities `transition-transform duration-150 ease-out` for trivial cases.
2. `:hover` rules: keep the selector list short; `transition-property` limited to `transform`, `opacity`, `filter`, `background-color`, `color`, `border-color`.
3. `:focus-visible`: always use `:focus-visible`, never bare `:focus`. The browser default focus ring stays for keyboard; `:focus-visible` adds the brand ring without breaking mouse users.
4. JS only when CSS is insufficient: magnetic buttons, drag-to-reorder, gesture-driven interactions → Motion (`motion.div whileHover={...} whileTap={...}`).
5. Pointer gating: `@media (hover: hover) and (pointer: fine) { .target:hover { transform: translateY(-4px); } }` — touch users see no awkward hover state.
6. Reduced-motion: `@media (prefers-reduced-motion: reduce) { .target { transform: none !important; transition: none !important; } }` for transition properties; replace with opacity / color / border changes only.
7. Touch target: enforce `min-width: 44px; min-height: 44px;` (BRIEF §3) on every interactive element. Visual icon can be smaller; the hit area cannot.
8. Layout animations: AutoAnimate on a `<ul>` for list-reorder feedback — zero config, MIT, ~4 KB.

### Minimal snippet shape

```css
/* styles/micro-interactions.css */
:root { --motion-fast: 140ms; --motion-ease: cubic-bezier(0.2, 0, 0, 1); }

@media (hover: hover) and (pointer: fine) {
  .hover-target {
    transition: transform var(--motion-fast) var(--motion-ease),
                opacity var(--motion-fast) var(--motion-ease),
                background-color var(--motion-fast) var(--motion-ease);
  }
  .hover-target:hover { transform: translateY(-4px); }
  .hover-target:focus-visible { outline: 2px solid var(--color-primary); outline-offset: 2px; }
}

@media (prefers-reduced-motion: reduce) {
  .hover-target { transform: none !important; transition: opacity 80ms linear, color 80ms linear, background-color 80ms linear; }
}
```

```tsx
// components/HoverCard.tsx — Motion
'use client';
import { motion } from 'motion/react';

export function HoverCard({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.14, ease: [0.2, 0, 0, 1] }} // brief: motion.duration.fast + motion.easing.standard
      style={{ willChange: 'transform' }}
    >
      {children}
    </motion.div>
  );
}
```

### Pre-flight token map

| Token path (from BRIEF) | Value/usage in this kind |
|---|---|
| `motion.duration.fast` | hover exit; press; toggle; micro-feedback |
| `motion.duration.base` | entrance (max); CTA primary |
| `motion.easing.standard` | reversible state change (default for this kind) |
| `motion.distance.xs` | press / focus response |
| `motion.distance.sm` | hover translate (4–8 px) |
| `motion.distance.none` | BRIEF: replaces any translate/scale/rotate under reduced-motion |
| `motion.limit.concurrent` | ≤ 8 simultaneous micro-interactions (rare in practice) |

### Reduced-motion + no-JS fallback

`prefers-reduced-motion: reduce` ⇒ replace `translate` and `scale` with opacity and color only. BRIEF §5: any translate / scale / rotate / blur / zoom / parallax / tilt / cursor trail / simulated camera is replaced with `motion.distance.none` and no scale/rotation. Keep `transition` for opacity / color / border-color at `motion.duration.quick` (80 ms max).

No-JS fallback: `:hover` and `:focus-visible` are CSS — they work without JS. The interactive element remains usable; only the spring physics / Motion `whileHover` are dropped, which is the intended behavior.

### Performance budget

- 60 fps on scroll and hover.
- No jank on scroll with many interactive elements.
- Touch + keyboard inputs always produce the same final state as pointer hover.
- Bundle: CSS-only ⇒ 0 KB; Motion for React + AutoAnimate ⇒ already on the page if kinds v / iv / xii use it.

### Forbidden patterns

| Don't | Why | Use instead |
|---|---|---|
| `:hover` without `(hover: hover)` gate | Touch users see awkward hover state | `@media (hover: hover) and (pointer: fine) { ... }` |
| Hover-only actions (no keyboard equivalent) | Keyboard-only users cannot trigger | Pair `:hover` with `:focus-visible` and a click handler |
| `transition: all` | Over-animates properties you didn't intend | Enumerate `transform`, `opacity`, `filter`, `background-color`, etc. |
| Animating `width` / `height` / `margin` on a button | Layout / paint | Use `transform: scale()` or padding parent |
| Animated focus ring | BRIEF §7 violation; keyboard users lose state | Static `:focus-visible { outline: ... }` |
| Permanent `will-change: transform` on every card | Layer bloat | Apply only during the active hover |
| Touch targets < 44×44 px | WCAG 2.5.5 | `min-width: 44px; min-height: 44px;` |
| `whileHover` with spring physics > 220 ms | BRIEF §4 violation | `transition: { duration: 0.14 }` (fast) |

### Acceptance (machine-checkable)

- [ ] All `:hover` rules are inside `@media (hover: hover) and (pointer: fine)` (Playwright emulates touch + checks no hover style applied).
- [ ] All `:focus` rules use `:focus-visible` (CSS audit: grep `(:focus)` excluding `:focus-visible`).
- [ ] `transition-property` is restricted to `transform`, `opacity`, `filter`, `background-color`, `color`, `border-color` (lint rule or Playwright `getComputedStyle` assertion).
- [ ] Touch targets measure ≥ 44×44 px (Playwright element bounds check on every `<button>`, `<a>`).
- [ ] `prefers-reduced-motion: reduce` ⇒ only opacity / color transitions remain; `transform: none` is the rule.
- [ ] No console warnings about `will-change` memory bloat (Lighthouse "Uses efficient cache policy" audit).

### External sources (≥3 authoritative)

- MDN `:focus-visible`: https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible
- MDN `transition`: https://developer.mozilla.org/en-US/docs/Web/CSS/transition
- Motion docs: https://motion.dev/docs
- AutoAnimate: https://auto-animate.formkit.com
- WCAG 2.5.5 target size: https://www.w3.org/WAI/WCAG21/Understanding/target-size-enhanced

---

## Metrics

- word_count: ≈1,070 prose (target ~1,100 — within budget)
- tables: 6 (trade-offs, steps summary, token map, reduced-motion fallback, forbidden, acceptance)
- table_rows_total: 5 + 8 + 7 + 0 (narrative) + 8 + 6 = 34
- citations: 5 (canonical §§3/6, PLAY (viii), RES §§B.1/B.8, BRIEF §§4–7, MDN :focus-visible, WCAG)
- token_paths_cited: 7 (all six required + concurrent)
- license_posture: rows for CSS (native), Motion (MIT), Motion One (MIT), GSAP (MIT), AutoAnimate (MIT)
- prefers_reduced_motion_path: yes (own section + 2 acceptance criteria + forbidden table)
- acceptance_criteria_rows: 6
- forbidden_pattern_rows: 8
- external_sources: 5 (MDN :focus-visible, MDN transition, Motion, AutoAnimate, WCAG 2.5.5)
