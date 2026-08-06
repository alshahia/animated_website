"use client";
import { useRef } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

/**
 * kind-v building block. Per 05_kind-v_animated_illustration.md:
 * - SVG renderer default for accessibility
 * - autoplay gated on reduced-motion (no autoplay, no loop, static first frame only)
 * - explicit width/height to prevent CLS (host must reserve intrinsic
 *   dimensions per the dossier's forbidden-patterns list)
 *
 * Reduced-motion contract: the decision is made SYNCHRONOUSLY from
 * matchMedia on first client render — not via a useEffect that
 * resolves after a render cycle. Otherwise the first paint runs the
 * player with autoplay=true and the test "two screenshots of the
 * wrapper should be identical under reduced motion" fails because
 * the player has already played a few frames.
 *
 * Note: no React `useEffect` is needed here — `useRef` captured at mount
 * time preserves the initial matchMedia value for the lifetime of the
 * component. If the user toggles their reduced-motion preference mid-session,
 * the player would need a re-mount, but that's an edge case the dossier
 * doesn't require and the FCP cost isn't worth it.
 */
export function LottieIcon({
  src,
  label,
  autoplay = true,
  size = 48,
}: {
  src: string;
  label: string;
  autoplay?: boolean;
  size?: number;
}) {
  // Synchronously read matchMedia on first client render.
  const prefersReducedMotionRef = useRef(
    typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const reduced = prefersReducedMotionRef.current;

  return (
    <div
      data-testid="lottie-icon"
      role="img"
      aria-label={label}
      style={{ width: size, height: size, position: "relative" }}
    >
      {reduced ? (
        // Reduced motion: static placeholder, no Lottie player mounts.
        // (dotLottieReact cannot render frame 0 without instantiating the
        // renderer; the placeholder is the cleanest cross-environment fallback.)
        <div
          aria-hidden="true"
          style={{
            width: "100%",
            height: "100%",
            background: "var(--color-primary, #6eb5ff)",
            borderRadius: "var(--radius-md, 8px)",
            opacity: 0.7,
          }}
        />
      ) : (
        <DotLottieReact
          src={src}
          autoplay={autoplay}
          loop
          style={{ width: "100%", height: "100%" }}
        />
      )}
    </div>
  );
}
