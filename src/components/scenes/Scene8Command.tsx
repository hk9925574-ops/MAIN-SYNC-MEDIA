"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { MeshTransmissionMaterial, Float } from "@react-three/drei";
import { theme } from "@/lib/theme";

export default function Scene8Command() {
  const coreRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.1;
      coreRef.current.rotation.z += delta * 0.05;
      // Pulse scale
      const scale = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.02;
      coreRef.current.scale.set(scale, scale, scale);
    }
    if (ringRef.current) {
      ringRef.current.rotation.x -= delta * 0.15;
    }
  });

  return (
    <group position={[0, 0, -140]}>
      {/* Massive Command Core */}
      <Float speed={1} rotationIntensity={0.1} floatIntensity={0.5}>
        <mesh ref={coreRef} position={[0, 0, -5]}>
          <octahedronGeometry args={[4, 2]} />
          <MeshTransmissionMaterial
            backside
            thickness={3}
            roughness={0.1}
            transmission={1}
            ior={1.5}
            chromaticAberration={0.8}
            color={theme.void}
            attenuationDistance={2}
            attenuationColor={theme.ember}
          />
        </mesh>
        
        {/* Inner intense light */}
        <mesh position={[0, 0, -5]}>
          <octahedronGeometry args={[1.5, 1]} />
          <meshBasicMaterial color={theme.ember} toneMapped={false} />
        </mesh>

        {/* Outer Tech Ring */}
        <mesh ref={ringRef} position={[0, 0, -5]}>
          <torusGeometry args={[6, 0.05, 16, 100]} />
          <meshBasicMaterial color={theme.violet} toneMapped={false} />
        </mesh>
      </Float>
      
      {/* Intense dramatic lighting */}
      <pointLight position={[0, 0, -5]} intensity={50} color={theme.ember} distance={20} />
      <spotLight position={[0, -10, -5]} intensity={100} angle={0.8} penumbra={1} color={theme.violet} />
    </group>
  );
}
