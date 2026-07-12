"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { MeshTransmissionMaterial, Float, Environment } from "@react-three/drei";
import { theme } from "@/lib/theme";

function PortfolioWorld({ position, scale = 1, color }: { position: [number, number, number], scale?: number, color: string }) {
  const innerRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (innerRef.current) {
      innerRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1} position={position} scale={scale}>
      {/* Glass Sphere Container */}
      <mesh>
        <sphereGeometry args={[2, 64, 64]} />
        <MeshTransmissionMaterial
          backside
          thickness={0.2}
          roughness={0}
          transmission={1}
          ior={1.4}
          chromaticAberration={0.4}
          color={theme.void}
        />
      </mesh>
      
      {/* Inner Diorama (Stylized Geometry) */}
      <group ref={innerRef}>
        {/* Landscape/Stage base */}
        <mesh position={[0, -0.8, 0]}>
          <cylinderGeometry args={[1.5, 1.5, 0.2, 32]} />
          <meshStandardMaterial color={theme.ink} metalness={0.8} roughness={0.2} />
        </mesh>
        
        {/* Abstract architecture / objects */}
        <mesh position={[-0.5, 0, 0]} rotation={[0, Math.PI / 4, 0]}>
          <boxGeometry args={[0.5, 1.5, 0.5]} />
          <meshBasicMaterial color={color} toneMapped={false} />
        </mesh>
        <mesh position={[0.5, -0.2, 0.5]}>
          <icosahedronGeometry args={[0.4, 0]} />
          <meshStandardMaterial color={theme.paper} wireframe />
        </mesh>
        
        <pointLight position={[0, 1, 0]} intensity={2} color={color} distance={4} />
      </group>
    </Float>
  );
}

export default function Scene6Portfolio() {
  return (
    <group position={[0, 0, -100]}>
      {/* A cluster of floating portfolio worlds */}
      <PortfolioWorld position={[-3, 1, -2]} scale={0.8} color={theme.ember} />
      <PortfolioWorld position={[0, -1, 0]} scale={1.2} color={theme.violet} />
      <PortfolioWorld position={[3, 2, -4]} scale={1} color={theme.champagne} />
      
      <pointLight position={[0, 0, 10]} intensity={10} color={theme.paper} distance={30} />
    </group>
  );
}
