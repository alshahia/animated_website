/**
 * Scroll engine bootstrap for kind-i (scroll-driven reveal).
 * Source: 01_kind-i_scroll_reveal.md "Minimal snippet shape", extended with
 * cleanup + reduced-motion branching so it's actually usable, not just illustrative.
 *
 * Usage: call initScroll() once at app root (e.g. in a top-level layout effect),
 * and call its returned teardown() on unmount / route change in an SPA.
 */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export interface ScrollHandle {
  lenis: Lenis | null;
  reduced: boolean;
  teardown: () => void;
}

export function initScroll(): ScrollHandle {
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduced) {
    // BRIEF §5: reduced-motion users get normal document flow, no pin/scrub.
    ScrollTrigger.normalizeScroll(false);
    return {
      lenis: null,
      reduced: true,
      teardown: () => {
        ScrollTrigger.getAll().forEach((t) => t.kill());
      },
    };
  }

  const lenis = new Lenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  lenis.on("scroll", ScrollTrigger.update);

  const raf = (time: number) => {
    lenis.raf(time * 1000);
  };
  gsap.ticker.add(raf);
  // ponytail: gsap.ticker.lagSmoothing() left at GSAP default (500, 33).
  // Do not set lagSmoothing(0) without measured tab-switch jank evidence
  // (04_do_dont.md Avoid #4).

  const teardown = () => {
    gsap.ticker.remove(raf);
    lenis.destroy();
    ScrollTrigger.getAll().forEach((t) => t.kill());
  };

  return { lenis, reduced: false, teardown };
}

/**
 * Register a scroll-triggered reveal on one section element.
 * Animates transform+opacity only (04_do_dont.md Use #1 / CC1 in forbidden_patterns.json).
 */
export function registerReveal(
  el: HTMLElement,
  opts: { distance?: string; duration?: number; ease?: string } = {}
) {
  const distance = opts.distance ?? "var(--motion-distance-md)";
  const duration = opts.duration ?? 0.22; // motion.duration.base
  const ease = opts.ease ?? "power2.out"; // approximates motion.easing.enter

  const px = parseFloat(getComputedStyle(document.documentElement)
    .getPropertyValue(distance.replace("var(", "").replace(")", "")) || "16");

  return gsap.fromTo(
    el,
    { opacity: 0, y: px },
    {
      opacity: 1,
      y: 0,
      duration,
      ease,
      scrollTrigger: {
        trigger: el,
        start: "top 75%",
        end: "bottom 25%",
      },
    }
  );
}
