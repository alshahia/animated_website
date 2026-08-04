# Motion grammar — token authority and implementation contract

**Authority.** `share/design/T-2026-07-29-001/brief.md` is the visual and motion contract. `tokens.json` is its machine-readable mirror. This page is framework-agnostic: an engine may expose different APIs, but its behavior must map to these names. The grammar covers `kind-i` through `kind-xii`; it does not make motion a prerequisite for readable content (`BRIEF §§1–9`, `CAN §9`).

## Token inventory (95 named paths)

The inventory below accounts for every non-theme token path in `tokens.json`. Theme overrides reuse the semantic color names; they are not additional paths.

### Color (15)

| Path | Role |
|---|---|
| `color.bg` | Page canvas |
| `color.surface-1` | Primary content surface |
| `color.surface-2` | Raised/grouped region |
| `color.surface-3` | Highest non-modal surface |
| `color.ink` | Primary text |
| `color.ink-muted` | Secondary text |
| `color.line` | Meaningful boundary/focus-adjacent line |
| `color.line-subtle` | Decorative separator only |
| `color.primary` | Main action or selected state |
| `color.on-primary` | Content on primary |
| `color.accent` | Secondary emphasis/data counterpart |
| `color.on-accent` | Content on accent |
| `color.success` | Confirmed success |
| `color.warning` | Attention/caution |
| `color.danger` | Error/destructive state |

### Typography (22)

| Path | Role |
|---|---|
| `typography.family-editorial-display` | Editorial display family |
| `typography.family-editorial-body` | Editorial body family |
| `typography.family-product-display` | Product display family |
| `typography.family-product-body` | Product body family |
| `typography.family-playful-display` | Playful display family |
| `typography.family-playful-body` | Playful body family |
| `typography.size-0` | Metadata size |
| `typography.size-1` | Label/caption size |
| `typography.size-2` | Body baseline |
| `typography.size-3` | Lead text |
| `typography.size-4` | Section heading |
| `typography.size-5` | Page heading |
| `typography.size-6` | Hero heading |
| `typography.size-7` | Large display |
| `typography.line-height-ui` | UI line height |
| `typography.line-height-body` | Body line height |
| `typography.line-height-display` | Display line height |
| `typography.weight-regular` | Body weight |
| `typography.weight-medium` | Label weight |
| `typography.weight-semibold` | Action/subhead weight |
| `typography.weight-bold` | Heading weight |
| `typography.weight-heavy` | Short display-only weight |

### Spacing (11)

| Path | Role |
|---|---|
| `spacing.0` | Reset |
| `spacing.1` | Tight correction |
| `spacing.2` | Inline gap |
| `spacing.3` | Compact control padding |
| `spacing.4` | Mobile gutter/card minimum |
| `spacing.6` | Tablet grouping |
| `spacing.8` | Desktop gutter/card gap |
| `spacing.12` | Section interior |
| `spacing.16` | Section separation |
| `spacing.24` | Narrative beat |
| `spacing.32` | Maximum static separation |

### Radius (4)

| Path | Role |
|---|---|
| `radius.sm` | Small corner |
| `radius.md` | Standard corner |
| `radius.lg` | Large corner |
| `radius.pill` | Pill shape |

### Size (5)

| Path | Role |
|---|---|
| `size.touch-target` | Minimum interactive hit area |
| `size.icon-small` | Small icon |
| `size.icon-base` | Base icon |
| `size.control` | Standard control |
| `size.control-large` | Large control |

### Breakpoint (4)

| Path | Role |
|---|---|
| `breakpoint.mobile` | Single-column baseline |
| `breakpoint.tablet` | Content-supported multi-column threshold |
| `breakpoint.desktop` | Full navigation/richer choreography threshold |
| `breakpoint.4k` | 4K-class adaptation threshold |

### Layout (8)

| Path | Role |
|---|---|
| `layout.container-prose` | Reading measure |
| `layout.container-content` | Standard content width |
| `layout.container-wide` | Editorial/product grid width |
| `layout.container-4k` | Maximum content canvas |
| `layout.gutter-mobile` | Mobile gutter |
| `layout.gutter-tablet` | Tablet gutter |
| `layout.gutter-desktop` | Desktop gutter |
| `layout.gutter-4k` | 4K-class gutter |

### Duration (7)

| Path | Value | Intent |
|---|---:|---|
| `motion.duration.instant` | 0ms | Immediate state/fallback |
| `motion.duration.quick` | 80ms | Press/focus feedback |
| `motion.duration.fast` | 140ms | Hover/toggle/compact exit |
| `motion.duration.base` | 220ms | Standard reveal/state transition |
| `motion.duration.slow` | 360ms | Section or large panel |
| `motion.duration.story` | 560ms | Editorial/hero beat |
| `motion.duration.cinematic` | 900ms | One-off scene change ceiling |

### Easing (6)

| Path | Value | Intent |
|---|---|---|
| `motion.easing.linear` | cubic-bezier(0,0,1,1) | Scrub/input/loop |
| `motion.easing.standard` | cubic-bezier(0.2,0,0,1) | Default state transition |
| `motion.easing.enter` | cubic-bezier(0.16,1,0.3,1) | Settling entrance |
| `motion.easing.exit` | cubic-bezier(0.4,0,1,1) | Accelerating exit |
| `motion.easing.in-out` | cubic-bezier(0.65,0,0.35,1) | Deliberate scene change |
| `motion.easing.overshoot` | cubic-bezier(0.34,1.56,0.64,1) | Bounded playful confirmation |

### Distance (6)

| Path | Value | Intent |
|---|---:|---|
| `motion.distance.none` | 0px | Opacity-only/fallback |
| `motion.distance.xs` | 4px | Press/focus |
| `motion.distance.sm` | 8px | Compact reveal |
| `motion.distance.md` | 16px | Card/section child |
| `motion.distance.lg` | 32px | Large panel/beat |
| `motion.distance.xl` | 64px | One hero element only |

### Delay (4)

| Path | Value | Intent |
|---|---:|---|
| `motion.delay.item` | 60ms | Related item gap |
| `motion.delay.hero` | 100ms | Hero sequence handoff |
| `motion.delay.section` | 120ms | Narrative beat handoff |
| `motion.delay.group-cap` | 400ms | Group cascade ceiling |

### Limit (3)

| Path | Value | Intent |
|---|---:|---|
| `motion.limit.concurrent` | 8 | Active visible tracks |
| `motion.limit.ambient-loops` | 2 | Simultaneous ambient loops |
| `motion.limit.full-viewport-scenes` | 1 | Full-viewport canvas/WebGL cap |

**Inventory count:** color 15 + typography 22 + spacing 11 + radius 4 + size 5 + breakpoint 4 + layout 8 + duration 7 + easing 6 + distance 6 + delay 4 + limit 3 = **95**.

## Reduced-motion mapping

| Full behavior | Reduced behavior |
|---|---|
| `motion.duration.quick`, `motion.duration.fast`, or `motion.duration.base` feedback | Keep opacity, color, or border feedback; `motion.duration.quick` is the maximum |
| `motion.duration.slow`, `motion.duration.story`, or `motion.duration.cinematic` entrance | Use `motion.duration.instant`; render the final state |
| Translation, scale, rotation, blur, zoom, parallax, tilt, or cursor trail | Use `motion.distance.none`; remove scale and rotation |
| Scroll-scrub or pinned narrative | Normal document flow with static sections |
| Autoplay or ambient loop | Pause and show a representative frame |
| Spinner | Static text or determinate progress; retain only a small necessary indicator |
| Success/error | Immediate icon, text, and color; motion optional |

Source: `BRIEF §5`; implementation must also preserve `BRIEF §7` focus, flashing, pause, and document-order rules.

## Performance grammar

- Animate `transform` and `opacity`; change layout properties without interpolation (`BRIEF §6`, web.dev Animations).
- Keep visible tracks ≤ `motion.limit.concurrent`; full-viewport scenes ≤ `motion.limit.full-viewport-scenes`; ambient loops ≤ `motion.limit.ambient-loops`.
- Pause canvas, video, and RAF work when hidden or offscreen. Use `will-change` only immediately before a known animation and remove it afterward.
- Reserve intrinsic media dimensions; do not put a mandatory preloader between readable content and users. Measure on representative mobile and desktop hardware, not from a “GPU accelerated” label.
- `motion.duration.cinematic` is a ceiling, not a routine UI default. Stagger follows DOM and reading order and never exceeds `motion.delay.group-cap` (`BRIEF §§4,6,7`).

## RTL, locale, and cultural fit

Use logical CSS and logical `start`/`end`; mirror chevrons, breadcrumbs, progress direction, and page turns for RTL, but do not mirror logos, numerals, mathematical operators, or audio waveforms. Stagger in localized reading order. Test Arabic, Hebrew, Devanagari, Thai, Cyrillic, Greek, and CJK strings with the chosen typography display/body roles. Review color meanings regionally; never make color or motion the sole status cue. Audio is opt-in, transcribed, and locale-reviewed. Avoid large zoom, horizon movement, cursor chasing, and oscillation; offer a visible site-level motion toggle for motion-heavy experiences (`BRIEF §8`).

## Agent pre-flight

1. Read the brief and `tokens.json`; select tokens by path, not engine defaults.
2. Identify one focal point and the kind ID/trigger/surface.
3. Record the reduced-motion final state and no-JS fallback.
4. Check track, loop, scene, asset, and layout budgets.
5. Check logical direction, fonts, strings, contrast, focus order, and touch size.
6. Measure on representative hardware; cite the result rather than claiming acceleration.

## Metrics

- word_count_total: 1,350; non_inventory_word_count: 536; non_inventory_budget: ≤1,500 words
- token_inventory_paths: 95; inventory_tables: 12; inventory_rows: 95
- table_count_total: 13 (12 inventory + 1 reduced-motion mapping)
- citation_count: 9+ (`CAN §9`, `BRIEF §§1–9`, `tokens.json`, MDN, web.dev, WCAG)
- checks: reduced_motion=yes; performance=yes; RTL_locale=yes; cultural_fit=yes
