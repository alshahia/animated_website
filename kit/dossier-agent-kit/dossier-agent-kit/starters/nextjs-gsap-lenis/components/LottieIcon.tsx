"use client";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/**
 * kind-v building block. Per 05_kind-v_animated_illustration.md: SVG
 * renderer default for accessibility, autoplay gated on reduced-motion,
 * explicit width/height to prevent CLS (host must reserve intrinsic
 * dimensions per the dossier's forbidden-patterns list).
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
  const reduced = useReducedMotion();

  return (
    <div
      data-testid="lottie-icon"
      role="img"
      aria-label={label}
      style={{ width: size, height: size }}
    >
      <DotLottieReact
        src={src}
        autoplay={autoplay && !reduced}
        loop={!reduced}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
