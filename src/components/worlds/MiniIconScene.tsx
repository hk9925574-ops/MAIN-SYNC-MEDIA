"use client";

import { Canvas } from "@react-three/fiber";
import CapabilityIcon3D, { IconKind } from "./CapabilityIcon3D";

// Deliberately cheap: no shadows, no postprocessing, dpr capped at 1.5.
// This is a decorative per-card object, not the hero — it should cost
// almost nothing even with six of them mounted on lower-power machines.
export default function MiniIconScene({
  kind,
  color,
  boost = 1,
}: {
  kind: IconKind;
  color: string;
  boost?: number;
}) {
  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0.4, 2.6], fov: 40 }} gl={{ alpha: true }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[2, 3, 3]} intensity={1.4} color="#F5EFE8" />
      <pointLight position={[-2, -1, 1]} intensity={0.6} color={color} />
      <CapabilityIcon3D kind={kind} color={color} boost={boost} />
    </Canvas>
  );
}
