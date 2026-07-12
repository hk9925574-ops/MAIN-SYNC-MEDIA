"use client";

import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { EffectComposer, Bloom, DepthOfField } from "@react-three/postprocessing";
import { Environment } from "@react-three/drei";

export default function Scene() {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 1.2, 8], fov: 42 }}
      gl={{ toneMapping: THREE.ACESFilmicToneMapping }}
    >
      <fog attach="fog" args={["#000000", 5, 18]} />

      <spotLight
        position={[0, 6, 6]}
        intensity={120}
        angle={0.35}
        penumbra={1}
        color="#00D4FF"
      />

      <Environment files="/hdr/studio.hdr" background={false} />

      <EffectComposer>
        <Bloom intensity={1.5} luminanceThreshold={0.2} luminanceSmoothing={0.8} />
        <DepthOfField focusDistance={0.02} focalLength={0.05} bokehScale={3} />
      </EffectComposer>

      {/* your 3D objects here */}
    </Canvas>
  );
}