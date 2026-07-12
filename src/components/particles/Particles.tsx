"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { theme } from "@/lib/theme";

const COUNT = 900;

const positions = Array.from({ length: COUNT }, () => ({
  x: (Math.random() - 0.5) * 10,
  y: (Math.random() - 0.5) * 6,
  z: (Math.random() - 0.5) * 10,
  speed: 0.2 + Math.random() * 0.5,
}));

const dummy = new THREE.Object3D();

export default function Particles() {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (!meshRef.current) return;

    positions.forEach((p, i) => {
      dummy.position.set(
        p.x + Math.sin(t * p.speed + i) * 0.2,
        p.y + Math.cos(t * p.speed + i) * 0.2,
        p.z
      );
      dummy.scale.setScalar(0.03);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, COUNT]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial color={theme.ember} transparent opacity={0.5} />
    </instancedMesh>
  );
}
