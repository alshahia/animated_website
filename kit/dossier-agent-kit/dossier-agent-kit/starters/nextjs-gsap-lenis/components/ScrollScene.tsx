"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
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
    if (!ref.current) return;
    if (reduced) {
      // Reduced motion OR mid-flight reduced-motion transition: bypass the
      // gsap.fromTo tween entirely so content is visible immediately (and
      // stays visible — opacity stays at the 1 set here, not the 0 set by
      // a partially-initialized tween that was then killed).
      gsap.set(ref.current, { opacity: 1, y: 0, clearProps: "opacity,transform" });
      return;
    }
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
