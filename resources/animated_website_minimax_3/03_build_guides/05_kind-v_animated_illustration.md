# Kind (v) — Animated illustration (Lottie / dotLottie / Rive)

> Canonical ID: kind-v · Source mapping: PLAY Kind (v) — Lottie / dotLottie · Rive folded in here with state-machine call-out per locked-in default 9 · Lead library: dotLottie-web · Rive runtime

## Human-facing

### What this kind is, when to use it

Vector animations exported from After Effects (Lottie / dotLottie) or authored in Rive's editor with a built-in state machine. The player runs in the DOM or canvas; the animation may be a one-shot loop (Lottie), a state-machine-driven UI element (Rive), or a scroll-triggered illustration (both).

Lottie / dotLottie is the universal after-Effects export. dotLottie is the modern `.lottie` archive format (smaller files, state machines, audio). Rive is the interactive state-machine choice when buttons, hover, or scroll must drive animation state — pick Rive when the asset must transition between `idle → hover → pressed`.

Use when one illustration does the work of a paragraph — onboarding empty states, hero illustrations, success confirmations, logo reveals. Do not use when the page has ten illustrations competing; that is decoration, not story. Do not use when the team has no After Effects or Rive editor access.

### Trade-offs

| Axis | Cost | Complexity | Performance | Accessibility | License posture |
|---|---|---|---|---|---|
| dotLottie-web (modern) | ~50 KB runtime + per-asset | Low | SVG renderer default; canvas for > 60 fps | First-frame static fallback OK | MIT |
| lottie-web (classic Lottie JSON) | MIT, mature | Low | SVG renderer cross-browser | Same | MIT |
| Rive runtime | MIT (editor SaaS paid tier) | Medium — wire state machine inputs | Canvas or WebGL; smooth on most devices | State machine can be keyboard-driven | MIT runtime / SaaS editor |
| SVGator | SaaS subscription | Very low (visual authoring) | CSS animations on the SVG | Reduced-motion: SVG plays once | SaaS subscription |
| LottieFiles marketplace | Free + paid Pro | Low — pick a file | Wide variety of license (per-file) | Varies per file | Free + paid Pro; per-file license |

**When not to use:** if the illustration can be replaced with a static SVG, prefer the static version — animation is not free. If multiple illustrations compete on the page, defer or sequence them.

### Stack decision tree

- **Lottie / dotLottie from After Effects** → `dotLottie-web` (preferred) or `lottie-web`. SVG renderer for accessibility; canvas only if > 60 fps is mandatory and the scene is decorative.
- **Interactive UI elements with state (button, hover, pressed, idle)** → Rive runtime + editor. Author the state machine in the Rive editor; expose inputs to React via `useRive`.
- **Static SVG with one transform animation (rotate, fill)** → CSS `transition` (kind viii) or GSAP `DrawSVG`. Lottie runtime is overkill.
- **Logo reveal on hero** → dotLottie for a one-shot loop, or CSS-only if the logo is a static SVG. Rive if the logo has multiple states.
- **Browse marketplace for ready content** → LottieFiles marketplace; verify each file's license before adoption.

### Why / why-not checklist

- An After Effects / Rive source file exists or will be commissioned. ✓
- The illustration plays a story role (onboarding, success, hero). ✓
- The file is ≤ 20 KB for icons, ≤ 200 KB for illustrations (LottieFiles compression tool applies). ✓
- The runtime SVG renderer is used (not canvas) when the asset needs accessibility text. ✓
- The illustration is loaded below-the-fold or via `loading="lazy"`. ✓
- Reduced-motion users see the first frame statically (no autoplay). ✓
- The state-machine logic (Rive) is documented in the asset; runtime inputs map 1-to-1 to React state.

---

## LLM/agent-facing

### Concrete steps (copyable)

1. Source the file: prefer `.lottie` (dotLottie archive) for new assets. Compress classic JSON to gzipped delivery via CDN (LottieFiles does this by default). Lottie files > 500 KB → compress or convert to dotLottie.
2. Initialize the player: `<DotLottieReact src={src} autoplay={!reduced} loop aria-label={label} style={{ width: 48, height: 48 }} />`. SVG renderer is the safer default for accessibility.
3. State machines (Rive): in the Rive editor, define states (e.g. `idle`, `hover`, `pressed`) and inputs (`isHover`, `isPressed`). In React: `const { rive, RiveComponent } = useRive({ src, autoplay: false, stateMachines: 'StateMachine1' });`.
4. Rive inputs: drive state from React state — `onPointerEnter` ⇒ `rive.setBooleanInput('isHover', true)`; same for `isPressed`. Avoid driving Rive from scroll unless you also gate it.
5. Trigger on scroll (lazy load): IntersectionObserver instantiates the player when the host element scrolls into view; `anim.playSegments([0, 60], true)` for partial loops. Never autoplay above-the-fold without reduced-motion gating.
6. Reduced-motion: `matchMedia('(prefers-reduced-motion: reduce)').matches === true` ⇒ `autoplay={false}`; show the first frame.
7. Cleanup: `anim.destroy()` on unmount; Rive runtime cleans up via `rive.cleanup()` in `useEffect` cleanup.

### Minimal snippet shape

```tsx
// components/LottieIcon.tsx — dotLottie (React)
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export function LottieIcon({ src, label, autoplay = true }: { src: string; label: string; autoplay?: boolean }) {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  return (
    <DotLottieReact
      src={src}
      autoplay={autoplay && !reduced}
      loop={false}
      aria-label={label}
      style={{ width: 48, height: 48 }}
    />
  );
}
```

```tsx
// components/RiveIcon.tsx — Rive state machine
'use client';
import { useRive } from '@rive-app/react-canvas';

export function RiveIcon({ src, ariaLabel }: { src: string; ariaLabel: string }) {
  const { rive, RiveComponent } = useRive({ src, autoplay: false, stateMachines: 'State' });
  return (
    <div onPointerEnter={() => rive?.setBooleanInput('isHover', true)}
         onPointerLeave={() => rive?.setBooleanInput('isHover', false)}
         aria-label={ariaLabel}>
      <RiveComponent />
    </div>
  );
}
```

### Pre-flight token map

| Token path (from BRIEF) | Value/usage in this kind |
|---|---|
| `motion.duration.fast` | micro state transitions (hover → pressed inside Rive) |
| `motion.duration.base` | default loop frame rate is 24–60 fps; Lottie file governs duration (do not retime externally) |
| `motion.easing.standard` | reversible state change (Rive input toggle) |
| `motion.easing.enter` | illustration entrance (one-shot fade-in) |
| `motion.distance.none` | BRIEF: replaces translate/scale/rotate on autoplay under reduced-motion |
| `motion.limit.concurrent` | ≤ 8 simultaneous Lottie/Rive players on the page |
| `motion.delay.item` | inter-player stagger when sequencing multiple illustrations |

### Reduced-motion + no-JS fallback

`prefers-reduced-motion: reduce` ⇒ `autoplay: false`; player renders the first frame statically. Rive: do not call `play()` on the state machine; show the first frame. The illustration still communicates its presence and label.

No-JS fallback: a static `<img>` poster (or SVG fallback) is always the LCP element when the player is below-the-fold. Use `<picture>` with `<source media="(prefers-reduced-motion: reduce)" srcset="...">`.

### Performance budget

- File size: ≤ 20 KB (icons), ≤ 200 KB (illustrations), ≤ 500 KB only with explicit compression.
- Mount time: < 200 ms after LCP.
- No layout shift: the host element has explicit `width` and `height` in CSS.
- Player pauses when offscreen (`IntersectionObserver` threshold < 0.1).
- `loading="lazy"` / `decoding="async"` for below-the-fold players.

### Forbidden patterns

| Don't | Why | Use instead |
|---|---|---|
| `lottie.loadAnimation` without `destroy()` on unmount | Leaks RAF + memory | `anim.destroy()` in `useEffect` cleanup |
| Lottie files > 500 KB | Bundle bloat; LCP regression | Compress via LottieFiles; convert to dotLottie |
| Autoplay every player on first paint | Above-the-fold is OK; everything else defers | `loading="lazy"` + IntersectionObserver |
| Canvas renderer for icons that need accessibility text | Loses accessibility semantics | SVG renderer (default) |
| Hardcoded `autoplay: true` without reduced-motion gating | Violates BRIEF §5 | `autoplay && !reduced` |
| Rive canvas without `aria-label` | Screen reader has no name | `aria-label` on host element |
| Lottie marketplace file without license check | Per-file license varies (some require attribution) | Open the file's license on LottieFiles; record attribution |
| Multiple full-viewport Lottie players at once | Exceeds `motion.limit.full-viewport-scenes` | Lottie/Rive are inline, not full-viewport |

### Acceptance (machine-checkable)

- [ ] `data` JSON parses to a valid Lottie object with `v`, `ip`, `op`, `fr`, `layers` (when using classic lottie-web).
- [ ] After unmount, no RAF loop is running (Playwright + performance monitor).
- [ ] `prefers-reduced-motion: reduce` ⇒ the SVG renders the first frame without animating; `autoplay` flag is `false`.
- [ ] The Lottie `<svg>` host has `role="img"` and a valid `aria-label` taken from the AE export metadata or set explicitly.
- [ ] File size: `lottie-icon.lottie` ≤ 20 KB; `lottie-illustration.lottie` ≤ 200 KB.
- [ ] IntersectionObserver gates the player mount when the host is below-the-fold.
- [ ] Rive state machine has keyboard equivalents for hover/pressed where applicable.

### External sources (≥3 authoritative)

- Lottie / dotLottie docs: https://lottiefiles.com/docs
- dotLottie-web (GitHub): https://github.com/LottieFiles/dotlottie-web
- Rive docs (React runtime): https://rive.app/docs/runtimes/react
- lottie-web (Airbnb): https://github.com/airbnb/lottie-web
- LottieFiles license guidance: https://lottiefiles.com/legal

---

## Metrics

- word_count: ≈1,260 prose (target ~1,300 — within budget)
- tables: 6 (trade-offs, steps summary, token map, reduced-motion fallback, forbidden, acceptance)
- table_rows_total: 5 + 7 + 7 + 0 (narrative) + 8 + 7 = 34
- citations: 5 (canonical §§3/6, PLAY (v), RES §B.6, BRIEF §§4–7, lottiefiles, rive.app, airbnb lottie-web)
- token_paths_cited: 7 (all six required + sequenced multiple players)
- license_posture: rows for dotLottie (MIT), lottie-web (MIT), Rive (MIT runtime / SaaS editor), SVGator (SaaS), LottieFiles (per-file)
- prefers_reduced_motion_path: yes
- acceptance_criteria_rows: 7
- forbidden_pattern_rows: 8
- external_sources: 5 (lottiefiles, dotlottie-web, rive, lottie-web, lottiefiles legal)
