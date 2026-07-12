"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { MeshTransmissionMaterial, Float, Text } from "@react-three/drei";
import { theme } from "@/lib/theme";

function ServicePanel({ position, title, color }: { position: [number, number, number], title: string, color: string }) {
  const panelRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (panelRef.current) {
      panelRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5} position={position}>
      <mesh ref={panelRef}>
        <boxGeometry args={[3, 4, 0.2]} />
        <MeshTransmissionMaterial
          backside
          thickness={0.5}
          roughness={0.2}
          transmission={1}
          ior={1.2}
          chromaticAberration={0.3}
          color={theme.void}
        />
        
        <Text
          position={[0, 1.2, 0.15]}
          fontSize={0.3}
          letterSpacing={0.1}
          color={color}
          anchorX="center"
          anchorY="middle"
        >
          {title}
          <meshBasicMaterial color={color} toneMapped={false} />
        </Text>
        
        {/* Holographic grid lines inside */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[2.8, 3.8, 0.1]} />
          <meshBasicMaterial color={color} wireframe transparent opacity={0.15} toneMapped={false} />
        </mesh>
      </mesh>
    </Float>
  );
}

export default function Scene5Services() {
  return (
    <group position={[0, 0, -80]}>
      {/* 3 Floating Monoliths */}
      <ServicePanel position={[-4, 0, 0]} title="FILM" color={theme.ember} />
      <ServicePanel position={[0, 0, -2]} title="VFX" color={theme.champagne} />
      <ServicePanel position={[4, 0, 0]} title="BRANDING" color={theme.violet} />

      <pointLight position={[0, 5, 5]} intensity={20} color={theme.paper} distance={20} />
      <pointLight position={[0, -5, -5]} intensity={30} color={theme.violet} distance={20} />
    </group>
  );
}
