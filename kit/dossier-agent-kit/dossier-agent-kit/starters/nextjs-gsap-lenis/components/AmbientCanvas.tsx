"use client";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/**
 * kind-ix building block. Ambient generative background using p5.js instance
 * mode, per 09_kind-ix_generative_art.md's minimal snippet shape, extended
 * with pause-on-hidden and reduced-motion handling wired to the shared hook.
 *
 * Reduced-motion contract (per 09_kind-ix §4 + CC4 in forbidden_patterns):
 * when prefers-reduced-motion is reduce, no canvas mounts and no RAF
 * ever runs — render a static background instead. This avoids the
 * "two screenshots taken 500ms apart should be identical" test failing
 * by 1-frame jitter.
 *
 * This is the hero-surface pick from the golden trace
 * (examples/golden-trace-saas-marketing/TRACE.md) — it consumes the single
 * motion.limit.full-viewport-scenes slot for this page.
 */
export function AmbientCanvas() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!ref.current) return;

    // Capture matchMedia synchronously so the decision is final on first paint
    // and never reverts via a React state cascade.
    const reducedSync =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedSync) {
      // Reduced motion: static background. No library, no canvas, no RAF.
      ref.current.style.background =
        "radial-gradient(ellipse at top, rgba(110,181,255,0.08), transparent 60%), linear-gradient(180deg, #0d1117 0%, #0a0d12 100%)";
      return;
    }

    let instance: any;
    let onVis: (() => void) | undefined;

    // Dynamic import keeps p5 off the critical path (03_build_guides.md §5:
    // "lazy-import the whole animation library in main.tsx" is forbidden).
    import("p5").then(({ default: p5 }) => {
      const sketch = (s: any) => {
        s.setup = () => {
          s.createCanvas(window.innerWidth, window.innerHeight).parent(ref.current!);
        };
        let t = 0;
        s.draw = () => {
          s.background(13, 17, 23); // color.bg
          t += 0.01;
          for (let i = 0; i < 40; i++) {
            s.fill(110, 181, 255, 160); // color.primary
            s.circle(s.noise(i, t) * s.width, s.noise(i + 100, t) * s.height, 3);
          }
        };
      };
      instance = new p5(sketch);

      onVis = () => {
        if (document.visibilityState === "hidden") instance.noLoop();
        else instance.loop();
      };
      document.addEventListener("visibilitychange", onVis);
    });

    return () => {
      instance?.remove();
      if (onVis) document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      data-testid="ambient-canvas"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none",
        background:
          "radial-gradient(ellipse at top, rgba(110,181,255,0.04), transparent 60%)",
      }}
    />
  );
}
