"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { theme } from "@/lib/theme";

const BASE_SCALE = 1;
const HOVER_SCALE = 1.2;

function CoreAccent({ hovered }: { hovered: boolean }) {
  const group = useRef<THREE.Group>(null);
  const scaleRef = useRef(BASE_SCALE);

  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.x += delta * 0.05;
      group.current.rotation.y += delta * 0.1;
      group.current.rotation.z += delta * 0.02;
    }

    const target = hovered ? HOVER_SCALE : BASE_SCALE;
    scaleRef.current = THREE.MathUtils.lerp(scaleRef.current, target, 0.05);

    if (group.current) {
      group.current.scale.set(scaleRef.current, scaleRef.current, scaleRef.current);
    }
  });

  return (
    <group ref={group}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.5, 0.02, 16, 100]} />
        <meshBasicMaterial color={theme.violet} toneMapped={false} />
      </mesh>
      <mesh rotation={[0, Math.PI / 3, 0]}>
        <torusGeometry args={[2.8, 0.03, 16, 100]} />
        <meshBasicMaterial color={theme.ember} toneMapped={false} />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color={theme.champagne} toneMapped={false} wireframe />
      </mesh>
    </group>
  );
}

// Rendered large and faint behind the CTA card — a callback to the hero
// Sync Core rather than a repeat of it, at low opacity so it reads as texture.
export default function CTAIrisAccent({ hovered = false }: { hovered?: boolean }) {
  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 8], fov: 40 }} gl={{ alpha: true }}>
      <ambientLight intensity={0.3} />
      <CoreAccent hovered={hovered} />
    </Canvas>
  );
}
