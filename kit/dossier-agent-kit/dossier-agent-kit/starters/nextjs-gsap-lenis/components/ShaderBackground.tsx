"use client";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/**
 * kind-iii building block. Per 03_kind-iii_shader.md: full-viewport ambient
 * fragment shader. Consumes the single motion.limit.full-viewport-scenes
 * slot AND one motion.limit.ambient-loops slot — per composition_matrix.json
 * this must not coexist with kind-ii or kind-ix as a steady-state consumer
 * of the full-viewport-scenes budget on the same page.
 */
const fragment = `
  precision highp float;
  uniform float uTime;
  uniform vec2 uMouse;
  varying vec2 vUv;
  void main() {
    vec2 uv = vUv + uMouse * 0.05;
    float n = sin(uv.x * 10.0 + uTime * 0.5) * sin(uv.y * 10.0 + uTime * 0.3);
    gl_FragColor = vec4(vec3(0.5 + n * 0.5), 1.0);
  }
`;

export function ShaderBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!ref.current || reduced) return;
    let renderer: any;
    let raf = 0;
    let onVis: (() => void) | undefined;

    import("ogl").then(({ Renderer, Camera, Transform, Plane, Program, Mesh }) => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      renderer = new Renderer({ dpr });
      const gl = renderer.gl;
      ref.current!.appendChild(gl.canvas);

      const camera = new Camera(gl);
      camera.position.z = 1;
      const scene = new Transform();
      const geometry = new Plane(gl);
      const program = new Program(gl, {
        fragment,
        vertex: `attribute vec2 uv; attribute vec2 position; varying vec2 vUv;
          void main() { vUv = uv; gl_Position = vec4(position, 0, 1); }`,
        uniforms: { uTime: { value: 0 }, uMouse: { value: [0, 0] } },
      });
      const mesh = new Mesh(gl, { geometry, program });
      mesh.setParent(scene);

      const resize = () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      resize();
      window.addEventListener("resize", resize);

      let t = 0;
      const tick = () => {
        t += 0.01;
        program.uniforms.uTime.value = t;
        renderer.render({ scene, camera });
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);

      onVis = () => {
        if (document.visibilityState === "hidden") cancelAnimationFrame(raf);
        else raf = requestAnimationFrame(tick);
      };
      document.addEventListener("visibilitychange", onVis);
    });

    return () => {
      cancelAnimationFrame(raf);
      if (onVis) document.removeEventListener("visibilitychange", onVis);
    };
  }, [reduced]);

  if (reduced) {
    return (
      <div
        data-testid="shader-fallback-gradient"
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: -1,
          background: "linear-gradient(135deg, var(--color-primary), var(--color-bg))",
        }}
      />
    );
  }

  return (
    <div
      ref={ref}
      aria-hidden="true"
      data-testid="shader-canvas-host"
      style={{ position: "fixed", inset: 0, zIndex: -1, pointerEvents: "none" }}
    />
  );
}
