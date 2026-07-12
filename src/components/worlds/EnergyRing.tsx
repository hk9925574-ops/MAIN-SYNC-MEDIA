"use client";

import { Torus } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

type Props = {
  rotation?: [number, number, number];
  color?: string;
  speed?: number;
  scale?: number;
};

export default function EnergyRing({
  rotation = [0, 0, 0],
  color = "#4FD1FF",
  speed = 0.3,
  scale = 1,
}: Props) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!ref.current) return;

    ref.current.rotation.z += delta * speed;
    ref.current.rotation.x += delta * speed * 0.4;
  });

  return (
    <Torus
      ref={ref}
      args={[1.7 * scale, 0.02, 16, 250]}
      rotation={rotation}
    >
      <meshBasicMaterial
        color={color}
        toneMapped={false}
      />
    </Torus>
  );
}