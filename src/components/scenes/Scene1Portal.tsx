"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import SyncCore from "../worlds/SyncCore";
import FloatingDust from "../worlds/FloatingDust";
import DataStreams from "../worlds/DataStreams";

export default function Scene1Portal() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Gentle floating motion
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Intro Portal - using the beautiful glass core we built earlier */}
      <SyncCore />
      <DataStreams />
      <FloatingDust count={150} />
      
      {/* Intense entrance lights */}
      <spotLight
        position={[0, 5, 5]}
        intensity={100}
        angle={0.8}
        penumbra={1}
        color="#F2C879" // champagne
      />
    </group>
  );
}
