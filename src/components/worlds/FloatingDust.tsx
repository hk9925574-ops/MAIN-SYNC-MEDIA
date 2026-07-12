"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { theme } from "@/lib/theme";

export default function FloatingDust({ count = 150 }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 20;
      const factor = Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const scale = Math.random() * 0.04;
      temp.push({ x, y, z, factor, speed, scale });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    particles.forEach((particle, i) => {
      let { factor, speed, x, y, z, scale } = particle;
      const t = state.clock.elapsedTime * speed;
      
      dummy.position.set(
        x + Math.cos(t) + Math.sin(t * 1) / 10,
        y + Math.sin(t) + Math.cos(t * 2) / 10,
        z + Math.cos(t) + Math.sin(t * 3) / 10
      );
      dummy.scale.set(scale, scale, scale);
      dummy.updateMatrix();
      if (meshRef.current) {
        meshRef.current.setMatrixAt(i, dummy.matrix);
      }
    });
    if (meshRef.current) {
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color={theme.champagne} transparent opacity={0.3} toneMapped={false} />
    </instancedMesh>
  );
}
