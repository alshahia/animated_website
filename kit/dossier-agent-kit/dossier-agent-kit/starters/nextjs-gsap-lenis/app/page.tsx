"use client";
import { useEffect, useRef } from "react";
import { initScroll, ScrollHandle } from "@/lib/scroll-setup";
import { ScrollScene } from "@/components/ScrollScene";
import { HoverCard } from "@/components/HoverCard";
import { AmbientCanvas } from "@/components/AmbientCanvas";
import { PageLink } from "@/components/PageLink";
import { LottieIcon } from "@/components/LottieIcon";

// This composition matches examples/golden-trace-saas-marketing/TRACE.md:
// kind-viii (baseline) + kind-i (scroll reveal) + kind-ix (ambient hero
// canvas) + kind-vii (page transitions). See composition_matrix.json for
// why AmbientCanvas mounts before the ScrollScene reveals register.
const SECTIONS = ["hero", "features", "how-it-works", "pricing", "testimonials", "cta"];

export default function Home() {
  const handleRef = useRef<ScrollHandle | null>(null);

  useEffect(() => {
    let cancelled = false;
    // Ponytail: wrap init in requestIdleCallback so module-level
    // gsap/ScrollTrigger/Lenis dynamic imports (which block the main
    // thread between FCP and TTI) run AFTER the browser is idle.
    // requestIdleCallback timeout=200ms falls back to setTimeout on
    // Safari. Fixes Lighthouse TBT 720/213/392ms (CI cap 200ms).
    const ric = (cb: () => void) =>
      typeof window !== "undefined" && window.requestIdleCallback
        ? window.requestIdleCallback(cb, { timeout: 200 })
        : setTimeout(cb, 200) as unknown as number;
    const id = ric(() => {
      initScroll().then((h) => {
        if (cancelled) { h.teardown(); return; }
        handleRef.current = h;
      });
    });
    return () => {
      cancelled = true;
      if (typeof window !== "undefined" && window.cancelIdleCallback) {
        window.cancelIdleCallback(id);
      } else {
        clearTimeout(id as unknown as ReturnType<typeof setTimeout>);
      }
      handleRef.current?.teardown();
    };
  }, []);

  return (
    <main>
      <AmbientCanvas />
      <LottieIcon src="/icons/onboarding.lottie" label="Onboarding illustration" />
      {SECTIONS.map((id) => (
        <ScrollScene key={id} id={id}>
          <h2>{id}</h2>
          <HoverCard href="#">Learn more about {id}</HoverCard>
          <PageLink href={`/${id}`}>Go to {id} page</PageLink>
        </ScrollScene>
      ))}
    </main>
  );
}
