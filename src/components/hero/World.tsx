// src/components/hero/World.tsx
"use client";

import { Environment } from "@react-three/drei";

export function World() {
  return (
    <>
      <color attach="background" args={["#010409"]} />

      <fogExp2 attach="fog" args={["#020617", 0.02]} />

      <ambientLight intensity={0.08} />

      <spotLight
        position={[2, 6, 4]}
        intensity={80}
        angle={0.3}
        penumbra={1}
        color="#00D4FF"
      />

      <Environment preset="city" />
    </>
  );
}