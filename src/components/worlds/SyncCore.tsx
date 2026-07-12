"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { MeshTransmissionMaterial, Float } from "@react-three/drei";
import * as THREE from "three";
import { theme } from "@/lib/theme";

export default function SyncCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Fluid, continuous rotation for the glass shell
      meshRef.current.rotation.x += delta * 0.15;
      meshRef.current.rotation.y += delta * 0.2;
      meshRef.current.rotation.z += delta * 0.1;
      
      // Mouse interaction: slightly distort/morph or tilt
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, pointer.y * 0.5, 0.05);
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, pointer.x * 0.5, 0.05);
    }
    
    if (coreRef.current) {
      coreRef.current.rotation.x -= delta * 0.5;
      coreRef.current.rotation.y += delta * 0.6;
      // Pulse scale
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
      coreRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      {/* Outer Glass Shell */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.5, 4]} />
        <MeshTransmissionMaterial
          backside
          backsideThickness={2}
          thickness={1.5}
          roughness={0.05}
          transmission={1}
          ior={1.5}
          chromaticAberration={0.4}
          anisotropy={0.3}
          distortion={0.5}
          distortionScale={0.5}
          temporalDistortion={0.1}
          color={theme.void}
          attenuationDistance={1}
          attenuationColor={theme.violet}
        />
      </mesh>

      {/* Inner Glowing Energy Core */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.5, 2]} />
        <meshBasicMaterial color={theme.ember} toneMapped={false} />
      </mesh>
      
      {/* Intense light radiating from the core */}
      <pointLight color={theme.ember} intensity={8} distance={8} />
      <pointLight color={theme.violet} intensity={6} distance={6} position={[0, 0, 1]} />
    </Float>
  );
}
