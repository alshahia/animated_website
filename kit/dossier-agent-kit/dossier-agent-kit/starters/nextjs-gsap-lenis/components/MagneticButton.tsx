"use client";
import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/**
 * kind-iv building block. Per 04_kind-iv_cursor_tracking.md: gated behind
 * (pointer: fine) and (hover: hover); focus-visible ring is independent of
 * motion; reduced-motion disables the pointer handler entirely rather than
 * just zeroing the distance.
 */
export function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 30 });
  const sy = useSpring(y, { stiffness: 300, damping: 30 });

  const onPointerMove = (e: React.PointerEvent) => {
    if (reduced) return;
    if (!window.matchMedia("(pointer: fine) and (hover: hover)").matches) return;
    const r = ref.current!.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.2);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.2);
  };

  return (
    <motion.button
      ref={ref}
      data-testid="magnetic-button"
      onPointerMove={onPointerMove}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ x: reduced ? 0 : sx, y: reduced ? 0 : sy, minWidth: 44, minHeight: 44 }}
    >
      {children}
    </motion.button>
  );
}
