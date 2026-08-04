"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, PerformanceMonitor, useGLTF } from "@react-three/drei";
import { useState } from "react";

/**
 * Client-only half of kind-ii. Never imported directly by a server
 * component — always via next/dynamic({ ssr: false }) from ProductHero.tsx.
 * Matches 02_kind-ii_3d_scene.md's minimal snippet shape.
 */
function Model({ src }: { src: string }) {
  const gltf = useGLTF(src);
  return <primitive object={gltf.scene} name="product-body" />;
}

export default function ProductSceneClient({
  modelSrc,
  autoRotate,
}: {
  modelSrc: string;
  autoRotate: boolean;
}) {
  const [dpr, setDpr] = useState<[number, number]>([1, 2]);

  return (
    <Canvas
      dpr={dpr}
      frameloop={autoRotate ? "always" : "demand"}
      camera={{ position: [0, 0, 3], fov: 45 }}
      data-testid="product-scene-canvas"
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Environment preset="studio" />
      <Model src={modelSrc} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={autoRotate}
        autoRotateSpeed={0.5}
        minPolarAngle={Math.PI / 2.5}
        maxPolarAngle={Math.PI / 1.8}
        onStart={() => {}}
      />
      <PerformanceMonitor onDecline={() => setDpr([1, 1])} />
    </Canvas>
  );
}
