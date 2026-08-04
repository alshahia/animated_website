# Freshness Protocol

The dossier is a **2026-07-29 snapshot**. Some of its claims age well; others
go stale within months. An agent that treats every fact in the dossier as
equally durable will eventually hardcode a dead version number or a
since-changed license posture into generated code. This file draws that line
explicitly.

## Tier 1 — Trust as-is, do not re-verify per session

These are structural/behavioral patterns, not point-in-time facts. They
don't decay the way version numbers do.

- Reduced-motion mapping table (`06_motion_grammar.md`)
- Token names and values (`motion.duration.*`, `motion.easing.*`, `motion.distance.*`, `motion.delay.*`, `motion.limit.*`)
- Accessibility patterns (`focus-visible` gating, touch target sizing, `(hover: hover)` gating, ARIA usage)
- Performance patterns (compositor-only properties, `IntersectionObserver` pause, `visibilitychange` handling)
- License *category* definitions (what MIT/AGPL/LGPL/Hippocratic/commercial-threshold *mean* — these don't change even if a specific library's category assignment might)
- The 12-kind taxonomy structure and trigger×surface axis itself

## Tier 2 — Re-verify before writing into a deliverable, but low urgency

Check once per project, not once per file generated.

- License posture of a *specific* library (e.g., "GSAP is MIT/free" — the
  category is stable-ish but is explicitly contingent on Webflow's continued
  sponsorship per `02_resources.md` watchlist; re-check
  `https://gsap.com/pricing` if the project has a long timeline)
- SaaS pricing tiers (Webflow, Framer, Wix Studio, Rive editor, Spline —
  these change on vendor schedules unrelated to the dossier)
- Marketplace template licensing terms (per-template, not per-dossier-entry)

## Tier 3 — Re-verify every time before hardcoding into generated code

These decay fastest and are exactly the kind of number that makes generated
code look stale within a quarter.

- **Package version numbers** used in `package.json`, CDN URLs, or import
  statements: GSAP `3.12.x`, Three.js `r185`, React `18/19`, any pinned CDN
  URL like `cdn.jsdelivr.net/npm/three@0.185.0/...`
- **GitHub star counts / "maintenance signal" claims** (e.g., "114k stars,
  mrdoob/three.js") — never load-bearing for a technical decision, but if
  quoted to a human, re-check first
- **Browser support percentages / version thresholds** (e.g., "Chrome 115+,
  Safari TP, Firefox planned" for CSS `animation-timeline`) — browser
  shipping schedules move faster than this dossier's revision cycle
- **"Latest" / "Active" maintenance-signal labels** in the resource catalogs
  — these are opinions frozen at snapshot time, not live data

## Protocol for an agent

1. Before emitting any `package.json` dependency version, CDN-pinned URL, or
   browser-support claim into generated code or CI config, run one
   `web_search` (or `web_fetch` against the official URL already present in
   that dossier row — see `references.md`) to confirm the number is still
   current. Do not silently carry forward a Tier 3 number from the dossier.
2. If the search contradicts the dossier (e.g., GSAP's free-forever posture
   changes, or Three.js has moved to r19x), treat the dossier as **out of
   date on that one fact only** — don't discard the surrounding Tier 1/Tier 2
   guidance, which is unlikely to have changed for the same reason.
3. Tier 1 facts never need a search. Spending a tool call re-verifying "does
   `prefers-reduced-motion: reduce` still exist" is wasted effort.
4. When a Tier 3 fact is re-verified and found to have changed, that's a
   signal to flag it back to the human — the dossier itself should get a
   correction entry (`08_corrections_vs_source.md` is the pattern to follow:
   old claim / correction / evidence / action), not just a silent patch in
   one generated file.

## Quick self-check before generating a starter or component

| Question | Tier | Action |
|---|---|---|
| Am I writing a CSS custom property name or reduced-motion branch? | 1 | Proceed, no check |
| Am I writing an accessibility pattern (focus-visible, ARIA, touch target)? | 1 | Proceed, no check |
| Am I writing a license-category statement in prose to the human? | 2 | Proceed; mention it's a 2026-07-29 snapshot if the project is long-lived |
| Am I writing a version number into `package.json` or a CDN URL? | 3 | Search first |
| Am I citing a star count or "actively maintained" claim to justify a pick? | 3 | Search first, or drop the claim and justify by license/API fit instead |
