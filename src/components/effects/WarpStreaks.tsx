"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTransitionManager } from "@/store/TransitionManager";

export default function WarpStreaks({ count = 200 }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const { transitionProgress } = useTransitionManager();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const streaks = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      // Random angle and radius for a cylindrical tunnel
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 5 + 2; 
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      const z = (Math.random() - 0.5) * 50; 
      
      const speed = Math.random() * 2 + 1;
      const length = Math.random() * 2 + 1;
      
      temp.push({ x, y, z, speed, length });
    }
    return temp;
  }, [count]);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Only show streaks if transitioning
      if (transitionProgress <= 0) {
        meshRef.current.visible = false;
        return;
      }
      
      meshRef.current.visible = true;
      const warpSpeedMultiplier = transitionProgress * 50.0; // Extremely fast during peak transition

      streaks.forEach((streak, i) => {
        // Move towards camera
        streak.z += streak.speed * warpSpeedMultiplier * delta;
        
        // Loop back
        if (streak.z > 10) {
          streak.z = -40;
        }

        dummy.position.set(streak.x, streak.y, streak.z);
        // Stretch along Z axis
        dummy.scale.set(0.02, 0.02, streak.length * transitionProgress * 10);
        // Align cylinder to Z axis
        dummy.rotation.x = Math.PI / 2;
        dummy.updateMatrix();
        meshRef.current!.setMatrixAt(i, dummy.matrix);
      });
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} visible={false}>
      <cylinderGeometry args={[1, 1, 1, 8]} />
      <meshBasicMaterial color="#00E5FF" transparent opacity={0.8} />
    </instancedMesh>
  );
}
