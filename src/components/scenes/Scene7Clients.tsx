"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Float } from "@react-three/drei";
import { theme } from "@/lib/theme";

function GlowingStructure({ position, color, geometryType }: { position: [number, number, number], color: string, geometryType: 'box' | 'cylinder' | 'ring' }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1} position={position}>
      <mesh ref={meshRef}>
        {geometryType === 'box' && <boxGeometry args={[1, 1, 1]} />}
        {geometryType === 'cylinder' && <cylinderGeometry args={[0.5, 0.5, 1.5, 6]} />}
        {geometryType === 'ring' && <torusGeometry args={[0.8, 0.2, 16, 6]} />}
        <meshBasicMaterial color={color} toneMapped={false} wireframe />
      </mesh>
      
      {/* Inner glowing core */}
      <mesh>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
    </Float>
  );
}

export default function Scene7Clients() {
  return (
    <group position={[0, 0, -120]}>
      {/* Constellation of client structures */}
      <GlowingStructure position={[-4, 2, -5]} color={theme.violet} geometryType="box" />
      <GlowingStructure position={[3, -2, -2]} color={theme.ember} geometryType="ring" />
      <GlowingStructure position={[-2, -3, -8]} color={theme.champagne} geometryType="cylinder" />
      <GlowingStructure position={[5, 3, -6]} color={theme.paper} geometryType="box" />
      <GlowingStructure position={[0, 1, 0]} color={theme.violet} geometryType="ring" />

      {/* Connection lines (constellation effect) */}
      <mesh position={[0, 0, -4]}>
        <sphereGeometry args={[8, 4, 4]} />
        <meshBasicMaterial color={theme.violet} wireframe transparent opacity={0.05} toneMapped={false} />
      </mesh>

      <pointLight position={[0, 0, 5]} intensity={10} color={theme.paper} distance={20} />
    </group>
  );
}
