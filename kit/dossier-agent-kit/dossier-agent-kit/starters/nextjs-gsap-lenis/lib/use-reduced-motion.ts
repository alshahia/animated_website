"use client";
import { useEffect, useState } from "react";

/**
 * Single shared reduced-motion detector. Per-kind guides each re-derive this
 * inline via matchMedia(); centralizing it here means one SSR-safe hook
 * instead of N slightly-different inline checks across components.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const listener = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, []);

  return reduced;
}
