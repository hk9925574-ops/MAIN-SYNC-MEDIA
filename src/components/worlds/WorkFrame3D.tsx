"use client";

import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";
import { theme } from "@/lib/theme";

function Frame({ color }: { color: string }) {
  const group = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  useFrame(() => {
    if (!group.current) return;
    // Tilt toward the pointer position within this canvas, ease back to
    // a gentle idle rotation when the pointer is elsewhere.
    const targetX = pointer.y * 0.35;
    const targetY = pointer.x * 0.45;
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetX, 0.08);
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetY, 0.08);
  });

  return (
    <group ref={group}>
      <mesh>
        <boxGeometry args={[1.5, 1.05, 0.06]} />
        <meshStandardMaterial color={theme.metal} metalness={0.6} roughness={0.35} />
      </mesh>
      <mesh position={[0, 0, 0.04]}>
        <boxGeometry args={[1.3, 0.86, 0.05]} />
        <MeshTransmissionMaterial
          thickness={0.35}
          roughness={0.08}
          transmission={0.95}
          chromaticAberration={0.06}
          distortion={0.08}
          distortionScale={0.2}
          anisotropy={0.3}
          ior={1.4}
          color={color}
        />
      </mesh>
      <mesh position={[0, -0.34, 0.055]}>
        <boxGeometry args={[1.3, 0.06, 0.01]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} />
      </mesh>
    </group>
  );
}

export default function WorkFrame3D({ color }: { color: string }) {
  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 3], fov: 40 }} gl={{ alpha: true }}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[2, 2, 3]} intensity={1.2} color="#F5EFE8" />
      <Frame color={color} />
    </Canvas>
  );
}
