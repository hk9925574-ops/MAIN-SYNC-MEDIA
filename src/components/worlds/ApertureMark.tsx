"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { theme } from "@/lib/theme";

function Mark({ speed }: { speed: number }) {
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.x += delta * speed * 0.5;
      group.current.rotation.y -= delta * speed * 0.8;
      group.current.rotation.z += delta * speed;
    }
    if (core.current) {
      core.current.rotation.y += delta * speed * 1.5;
    }
  });

  return (
    <group ref={group} scale={0.7}>
      {/* Mini outer rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1, 0.05, 16, 64]} />
        <meshBasicMaterial color={theme.violet} toneMapped={false} />
      </mesh>
      <mesh rotation={[0, Math.PI / 3, 0]}>
        <torusGeometry args={[1.2, 0.08, 16, 64]} />
        <meshBasicMaterial color={theme.ember} toneMapped={false} />
      </mesh>
      {/* Mini glowing core */}
      <mesh ref={core}>
        <icosahedronGeometry args={[0.3, 1]} />
        <meshBasicMaterial color={theme.champagne} toneMapped={false} />
      </mesh>
    </group>
  );
}

// A brand mark, now updated to the "Sync Core" aesthetic (glowing rings + core).
// Used in the navbar and as a small 3D flourish before each section's eyebrow label.
export default function ApertureMark({ hovered = false }: { hovered?: boolean }) {
  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 3], fov: 40 }} gl={{ alpha: true }}>
      <ambientLight intensity={0.7} />
      <Mark speed={hovered ? 2.4 : 0.35} />
    </Canvas>
  );
}
