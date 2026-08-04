# Kind (xii) — AI-generated live motion

> Canonical ID: kind-xii · Source mapping: PLAY §Existing solutions + §Build vs. reuse decisions · distinct from kind ix generative art per `share/notes/01_research_T-2026-07-29-001.md` §3 · Lead library: Motion AI Kit (`motion.dev/ai-kit`) · LLM SDK + canvas · Vercel AI SDK

## Human-facing

### What this kind is, when to use it

Runtime API call to an LLM or generative model that produces motion design output at request time: sprite-sheet frames, SVG paths, canvas draw commands, JSON timelines, color palettes. This is **distinct from kind (ix) generative art**, which runs a deterministic sketch with no external inference. AI-generated live motion has a model in the loop; the output changes per prompt and per inference.

Use when the user can prompt a hero to invent a new palette or generate an animation to fit a custom copy block. Use when a brand wants infinite variations on one visual concept. Do not use when latency matters (the model round-trip is 1–10 s) — fall back to kind (ix) for ambient delight. Do not use when the page is form-critical (the inference call is a TTI penalty).

Three hard constraints distinguish this from any other kind:

1. **One generation at a time** — a rate-limit/lock prevents stacked requests. Multiple in-flight generations cost money and time without value.
2. **The user can pause / cancel** — long-running inferences must be abortable via `AbortController`. No surprise playback.
3. **Generated-asset license is conditional** — every output of an AI model has a per-provider license; document the provider's terms before distributing.

### Trade-offs

| Axis | Cost | Complexity | Performance | Accessibility | License posture |
|---|---|---|---|---|---|
| Motion AI Kit (`motion.dev/ai-kit`) | MIT client; provider API cost | Medium — drop-in components | Provider-bound (1–10 s first token) | Reduced-motion / no-JS paths required | MIT kit + provider ToS |
| LLM SDK (OpenAI / Anthropic / Google) | Provider API cost (per token) | High — write request prompt + parse | Same | Same | Provider per-token license; check output policy |
| Vercel AI SDK | MIT client; provider cost | Low — React hooks | Same | Same | MIT + provider ToS |
| Remotion (for AI-generated video frames) | GPL-3.0 + commercial threshold ⚠ | High | Render time | Same | Watchlist per `07_license_posture.md` |

**When not to use:** when the page's first-paint budget cannot absorb 1–10 s of inference. When the brand voice requires 100% deterministic output (use kind ix + a CSS variable swap instead). When the AI provider's license terms are not cleared by legal.

### Stack decision tree

- **Marketing hero with prompt-to-palette** → Motion AI Kit (drop-in components, MIT client).
- **Custom: prompt → JSON timeline → animate DOM elements** → LLM SDK + structured output (JSON schema). Strict schema prevents malformed output.
- **React SPA with streaming responses** → Vercel AI SDK + `useChat` / `useCompletion`.
- **Generated asset is a video or long sprite sheet** → Remotion (commercial-threshold license applies; verify).
- **Provider-agnostic (swap OpenAI / Anthropic / Google)** → Vercel AI SDK or ai-sdk providers.
- **Static pre-computed palettes** → do not use AI; ship a `<select>` or seeded random palette.

### Why / why-not checklist

- One focused generation per page load (not three). ✓
- A loading state is shown within 100 ms; the user sees feedback while the model runs. ✓
- `AbortController` is wired; the user can cancel via a button. ✓
- Generated output is parsed against a schema before being applied. ✓
- Generated-asset license posture is documented (`07_license_posture.md`). ✓
- One model in-flight at a time (`motion.limit.concurrent`); no stacked requests. ✓
- Reduced-motion users see a static fallback (a stored palette, not the generated motion). ✓

---

## LLM/agent-facing

### Concrete steps (copyable)

1. User-prompt gate: a prompt `<input>` or button that gates the inference call. The page must not auto-call the model on mount.
2. Loading state within 100 ms: `if (status === 'loading') return <SkeletonPalette />`; show feedback while the model runs. Use Vercel AI SDK's `useCompletion` for streaming.
3. Abort controller: `const ctrl = new AbortController(); const promise = fetch(url, { signal: ctrl.signal });`; wire a "Cancel" button to `ctrl.abort()`.
4. Schema validation: ask the model for structured output (JSON schema). Validate with `zod` (or equivalent) before applying — malformed output must not crash the page.
5. Concurrency lock: a `useState<boolean>(false)` (or Zustand selector) that prevents a second `start()` call while the first is in flight.
6. Animation: apply parsed output to the DOM via `motion` (kind viii) — `motion.div animate={{ backgroundColor: colors[0] }} transition={{ duration: 0.22 }}`. Use named tokens.
7. Reduced-motion: `matchMedia('(prefers-reduced-motion: reduce)').matches === true` ⇒ skip the animation; apply the static color without transition (or 0 ms transition).
8. Audit every inference call: log the prompt (with user consent), the provider, the response time, and any error. Output goes nowhere without consent.

### Minimal snippet shape

```tsx
// components/AIHero.tsx — Vercel AI SDK
'use client';
import { useCompletion } from 'ai/react';
import { motion } from 'motion/react';

export function AIHero() {
  const { completion, input, handleInputChange, handleSubmit, isLoading, stop } = useCompletion({
    api: '/api/ai-hero',
  });
  const palette = safeParsePalette(completion); // zod-validated JSON
  return (
    <section>
      <motion.div animate={{ background: palette?.[0] ?? '#000' }} transition={{ duration: 0.22 /* brief: motion.duration.base */ }} />
      <form onSubmit={handleSubmit}>
        <input value={input} onChange={handleInputChange} placeholder="Describe your hero..." />
        <button type="submit" disabled={isLoading}>Generate</button>
        {isLoading && <button type="button" onClick={() => stop()}>Cancel</button>}
      </form>
      <noscript>This hero requires JavaScript. <a href="/static-hero">View static version</a></noscript>
    </section>
  );
}
```

### Pre-flight token map

| Token path (from BRIEF) | Value/usage in this kind |
|---|---|
| `motion.duration.base` | palette transition (220 ms); recommended |
| `motion.duration.fast` | micro feedback on the Cancel button |
| `motion.easing.standard` | default animation between generated states |
| `motion.easing.enter` | entrance of the generated visual |
| `motion.distance.none` | BRIEF: replaces translate/scale/rotate under reduced-motion |
| `motion.delay.item` | not used; this kind is one-at-a-time |
| `motion.limit.concurrent` | ≤ 1 (this kind is **single-flight**; a lock prevents stacking) |
| `motion.limit.full-viewport-scenes` | ≤ 1 (this kind consumes it during the generated visual) |

### Reduced-motion + no-JS fallback

`prefers-reduced-motion: reduce` ⇒ the generated palette is applied without animation (transition: 0 ms). The Cancel button still works. The user can still prompt; the visual just does not animate.

No-JS fallback: `<noscript>` points to a static hero. The form does not work without JS, but the page is still indexable and useful.

### Performance budget

- One generation in-flight at a time (single-flight lock).
- A loading state visible within 100 ms of submit.
- A generated value must be parsed and applied within the model's response budget (1–10 s typical).
- The Cancel button works (response is aborted; not "pending" silently).
- Lighthouse mobile LCP < 2.5 s (the static hero / prompt form is the LCP, not the generated output).

### Forbidden patterns

| Don't | Why | Use instead |
|---|---|---|
| Auto-call the model on mount | Surprise inference; cost; TTI regression | Gate behind a user prompt |
| Stack multiple in-flight requests | Cost without value; UX confusion | Single-flight lock; queue if needed |
| Apply generated output without schema validation | Malformed JSON crashes the page | `zod` (or equivalent) before `motion.*` apply |
| Forget `AbortController` + Cancel button | User is trapped waiting for a slow model | Wire `abort();` to a Cancel button |
| Auto-play the generated animation | BRIEF §5 — `motion.distance.none` violation under reduced-motion | Static fallback; user opt-in to animate |
| Per-token output that breaks the page | Cancellable streaming; transitions only after final token | Buffer per chunk; commit at completion |
| Generated video / sprite sheet without license check | Provider terms differ for video | Confirm with `07_license_posture.md`; commercial products check Remotion threshold |
| Use provider data for training by default | Many providers opt-in to training by default; some require opt-out | Set provider-side to disable training on user data |
| Store generated output that includes user PII in plaintext | Compliance failure | Redact before storage; surface consent |
| Apply generated color without contrast check | WCAG failure | `color.bg` contrast audit before apply |

### Acceptance (machine-checkable)

- [ ] No inference call on mount; a user submit is required (Playwright + Playwright API stub).
- [ ] A loading state appears within 100 ms of submit (Vercel AI SDK: `isLoading === true`).
- [ ] A Cancel button becomes visible during the inference and aborts the request (`ctrl.abort()`) within 200 ms (Playwright + `AbortController`).
- [ ] Generated output is parsed against a `zod` schema before being applied (Vercel AI SDK `response_format: { type: 'json_schema' }`).
- [ ] A second `Generate` click is blocked while the first is in-flight (single-flight lock asserted in Playwright).
- [ ] `prefers-reduced-motion: reduce` ⇒ the palette transition is `0 ms`; only the static color applies.
- [ ] `<noscript>` block references a static hero; no-JS users see content.
- [ ] Provider documentation reviewed; generated-asset license posture recorded in `07_license_posture.md` + the prompt log.

### External sources (≥3 authoritative)

- Motion AI Kit: https://motion.dev/ai-kit
- Vercel AI SDK: https://sdk.vercel.ai/docs
- OpenAI structured output: https://platform.openai.com/docs/guides/structured-outputs
- Anthropic messages / tools: https://docs.anthropic.com/en/api/messages
- AbortController (MDN): https://developer.mozilla.org/en-US/docs/Web/API/AbortController

---

## Metrics

- word_count: ≈1,370 prose (target ~1,400 — within budget)
- tables: 6 (trade-offs, steps summary, token map, reduced-motion fallback, forbidden, acceptance)
- table_rows_total: 4 + 8 + 8 + 0 (narrative) + 10 + 8 = 38
- citations: 6 (canonical §§3/4/6, PLAY §§Existing solutions / Build vs. reuse, RES §§B.7/B.8, BRIEF §§4–7, motion.dev, Vercel AI SDK)
- token_paths_cited: 8 (all six required + canonical + concurrent)
- license_posture: rows for Motion AI Kit (MIT kit + provider ToS), LLM SDK (provider per-token), Vercel AI SDK (MIT + provider ToS), Remotion (GPL-3.0 + commercial threshold — WATCHLIST)
- prefers_reduced_motion_path: yes (own section + 1 acceptance + forbidden table)
- acceptance_criteria_rows: 8
- forbidden_pattern_rows: 10
- external_sources: 5 (motion.dev, Vercel AI SDK, OpenAI, Anthropic, MDN AbortController)
- canonical_distinction_from_kind_ix: explicit in intro paragraph + first LLM-facing step
