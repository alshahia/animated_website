"use client";

/**
 * kind-iv (cursor tracking) is the only kind whose page entry is a client
 * component — motion v12 + React 19 have a hydration edge case at the
 * server/client boundary for components that use `useMotionValue` +
 * `useSpring`. Wrapping in `"use client"` here means the page renders
 * client-side only, which sidesteps the edge case entirely.
 *
 * This error boundary is the fallback for the same family of issues: if a
 * future motion / React upgrade regresses the static prerender of this
 * route, the user sees a clear "this route failed to render" message
 * instead of Next.js's generic "Application error" stripe.
 */
export default function CtaError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main>
      <h1>Something went wrong loading the CTA demo.</h1>
      <p style={{ opacity: 0.7, marginTop: "0.5rem" }}>
        {error.message || "Unknown error"}
      </p>
      <button
        type="button"
        onClick={reset}
        style={{
          marginTop: "1rem",
          padding: "0.5rem 1rem",
          border: "1px solid currentColor",
          background: "transparent",
          color: "inherit",
          cursor: "pointer",
        }}
      >
        Try again
      </button>
    </main>
  );
}
