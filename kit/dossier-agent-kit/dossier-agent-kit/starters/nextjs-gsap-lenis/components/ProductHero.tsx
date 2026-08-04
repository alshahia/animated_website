"use client";
import dynamic from "next/dynamic";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/**
 * kind-ii building block. Per 02_kind-ii_3d_scene.md: the 2D poster is
 * ALWAYS the LCP element, never the canvas. This wrapper enforces that by
 * rendering the poster in normal DOM order and dynamic-importing the R3F
 * scene client-side only (ssr: false), so the canvas mounts after FCP.
 *
 * NOTE: this consumes the single motion.limit.full-viewport-scenes budget
 * slot. Per composition_matrix.json, it cannot coexist as a steady-state
 * full-viewport consumer alongside kind-iii or kind-ix on the same page —
 * the router's conflict check should have already prevented that pairing.
 */
const ProductSceneClient = dynamic(() => import("./ProductSceneClient"), {
  ssr: false,
  loading: () => null,
});

export function ProductHero({
  posterSrc,
  posterAlt,
  modelSrc,
}: {
  posterSrc: string;
  posterAlt: string;
  modelSrc: string;
}) {
  const reduced = useReducedMotion();

  return (
    <div style={{ position: "relative", width: "100%", height: 600 }}>
      {/* Poster is the LCP element — always present, always first in DOM order. */}
      <img
        src={posterSrc}
        alt={posterAlt}
        width={1200}
        height={800}
        data-testid="product-hero-poster"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
      {!reduced && (
        <div
          style={{ position: "absolute", inset: 0 }}
          data-testid="product-hero-canvas-wrapper"
        >
          <ProductSceneClient modelSrc={modelSrc} autoRotate={!reduced} />
        </div>
      )}
    </div>
  );
}
