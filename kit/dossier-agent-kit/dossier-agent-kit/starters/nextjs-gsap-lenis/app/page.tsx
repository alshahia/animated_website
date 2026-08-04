"use client";
import { useEffect } from "react";
import { initScroll } from "@/lib/scroll-setup";
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
  useEffect(() => {
    const handle = initScroll();
    return () => handle.teardown();
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
