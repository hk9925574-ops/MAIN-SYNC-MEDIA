"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { theme } from "@/lib/theme";
import { MeshTransmissionMaterial, RoundedBox } from "@react-three/drei";

export default function PhotoCard3D() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      // Gentle floating animation
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Outer Glass Casing */}
      <RoundedBox args={[2, 3, 0.2]} radius={0.1} smoothness={4}>
        <MeshTransmissionMaterial 
          backside
          samples={4}
          thickness={0.5}
          roughness={0.1}
          transmission={1}
          ior={1.5}
          chromaticAberration={0.05}
          anisotropy={0.1}
          distortion={0.2}
          distortionScale={0.5}
          temporalDistortion={0.1}
          color={theme.champagne}
        />
      </RoundedBox>

      {/* Inner glowing media content representation */}
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[1.6, 2.6]} />
        <meshBasicMaterial 
          color={theme.champagne} 
          transparent 
          opacity={0.8}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Emissive Edge Highlight */}
      <RoundedBox args={[2.05, 3.05, 0.1]} radius={0.15} smoothness={4}>
        <meshBasicMaterial color={theme.champagne} wireframe transparent opacity={0.3} />
      </RoundedBox>
    </group>
  );
}
