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
 *
 * Ponytail: gsap is dynamically imported inside the effect to keep this
 * module's parse cost off the critical path (Lighthouse TBT fix 2026-08-05).
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
    let tween: { scrollTrigger?: { kill: () => void }; kill: () => void } | null = null;
    if (reduced) {
      // Reduced motion OR mid-flight reduced-motion transition: bypass the
      // gsap.fromTo tween entirely so content is visible immediately (and
      // stays visible — opacity stays at the 1 set here, not the 0 set by
      // a partially-initialized tween that was then killed).
      import("gsap").then(({ default: gsap }) => {
        if (ref.current) gsap.set(ref.current, { opacity: 1, y: 0, clearProps: "opacity,transform" });
      });
      return;
    }
    registerReveal(ref.current).then((t) => {
      if (cancelled) { t.scrollTrigger?.kill(); t.kill(); return; }
      tween = t;
    });
    let cancelled = false;
    return () => {
      cancelled = true;
      tween?.scrollTrigger?.kill();
      tween?.kill();
    };
  }, [reduced]);

  return (
    <section ref={ref} data-scroll-trigger={id} data-testid={`scroll-scene-${id}`}>
      {children}
    </section>
  );
}
