"use client";
import { useEffect, useRef } from "react";
import { registerReveal } from "@/lib/scroll-setup";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/**
 * kind-i building block. Wrap any section in this to get a scroll-triggered
 * reveal that respects the token map and reduced-motion contract by default.
 * Acceptance mapping: see tests/kind-i.spec.ts for the machine-checkable
 * assertions this component must satisfy (ScrollTrigger cleanup, no layout
 * properties animated, reduced-motion fallback).
 */
export function ScrollScene({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!ref.current || reduced) return;
    const tween = registerReveal(ref.current);
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [reduced]);

  return (
    <section ref={ref} data-scroll-trigger={id} data-testid={`scroll-scene-${id}`}>
      {children}
    </section>
  );
}
