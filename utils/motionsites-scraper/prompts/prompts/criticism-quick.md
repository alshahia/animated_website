---
id: criticism-quick-scan
title: "Criticism — Quick Animated Site Scan"
category: Critique
page_type: report
types: [kind-i, kind-ii, kind-iii, kind-iv, kind-v, kind-vi, kind-vii, kind-viii, kind-ix, kind-x]
is_free: true
fetched_at: 2026-08-12T00:00:00.000Z
---

# Criticism — Quick Animated Site Scan

### Overview

One-pass audit for animated websites. Use when you have **< 15 minutes** and need a fast, structured verdict: **ship, fix, or block.**

For a full multi-dimensional critique with constructive fixes, license audit, scorecard, and re-runnable provenance, use **`criticism-comprehensive`** instead.

---

### Inputs

- Live URL OR a single file / page source.
- One screenshot, OR free to inspect via Playwright headless.
- Optional: prior `critique-report.md` for Δ comparison.

---

### Process (≤ 15 minutes)

1. Open at 1440×900 (skip tablet / mobile if time-constrained).
2. Tab-key through top half — verify focus order + visible focus ring.
3. Toggle `prefers-reduced-motion: reduce` in DevTools — assert motion hands off.
4. Cmd/Ctrl-click one nav link — assert browser-native new-tab opens.
5. Run `axe-core` CLI on the page; log violations ≥ serious.
6. Run Lighthouse mobile profile once; log LCP / CLS / INP / total bytes.
7. Screenshot hero at t=0 and t=2s — diff via Playwright trace.
8. Grep `width:|height:|top:|left:|margin:|padding:` inside any motion declaration (CC1).
9. `npm ls --json | jq '.[] | {name, version, licenses}'` — flag AGPL and commercial-threshold.
10. Count simultaneously-animating tracks at scroll-peak — assert ≤ 8 (motion.limit.concurrent).

---

### Hard Rules

- One negative = one fix line. No fixable issues without a fix.
- Cite evidence. `Hero #about` is evidence; "the hero" is not.
- Hard cap **3 positive bullets**, **10 issue rows**, **5 constructive fixes**.
- No "great site overall" filler.
- Verdicts are exactly one of: `Ship ✅` / `Fix & ship 🟡` / `Block 🔴`.
- Skip the License Report only if running headless with no source access — note as Coverage gap.

---

### Output (one page, Markdown)

```md
# Quick Critique — <site> (<YYYY-MM-DD, HH:MM>)
**Reviewer:** Animated-website Critic v1.0 (criticism-quick-scan)
**Time-on-task:** Xm

## Verdict
**Ship ✅ | Fix & ship 🟡 | Block 🔴** — one-sentence reason.

## Score
/10

## ✅ Strong (3 max, each cites principle)
- <one specific design move + where it lives + principle (CC-N / DO-N / token)>

## ⚠️ Issues (priority-sorted, ≤ 10 rows)
| # | Severity | Dim | Finding | Evidence | Fix-in-1-line |
|--:|---|---|---|---|---|
| 1 | 🔴🟠🟡🔵⚪ | # | <verb-led title> | path:line / metric | <one-line fix> |

## 🛠 Constructive (≤ 5, sorted by priority then effort)
1. **CRIT-001** — `<code snippet>` — Effort X — P0 — Why: CC-N
2. **CRIT-002** — `<code snippet>` — Effort X — P1 — Why: K#-#
…

## Coverage Gaps
- <anything skipped, e.g., Lighthouse not run, no mobile viewport>

## Next Step
<run `criticism-comprehensive` for the full report, or fix CRIT-001 and re-scan.>
```

---

### Severity Threshold (raised for quick mode)

A quick scan only surfaces 🔴 Critical, 🟠 High, and the worst 🔵 Low. Skip medium and below unless they trivially fit. Deep polish belongs in the comprehensive report.

### Verdict Rules (deterministic)

| Condition | Verdict |
|---|---|
| 0 critical AND 0 high | `Ship ✅` |
| ≥ 1 critical (a11y barrier, license violation, all-zero keyboard trap, LCP regression > 500ms) | `Block 🔴` |
| 1–2 high, no critical | `Fix & ship 🟡` |
| ≥ 3 high | `Block 🔴` (deploy needs review) |
| License trigger (AGPL/Remotion in closed product) regardless of severity | `Block 🔴` |

---

### Anti-Prompt (do NOT)

- ❌ Skip evidence columns.
- ❌ Ship a verdict without citing which finding drives it.
- ❌ Pad with "site has good bones" filler.
- ❌ Recommend a runtime library without license justification.
- ❌ End without a Coverage gap section when steps were skipped.
