"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Text, Float } from "@react-three/drei";
import { theme } from "@/lib/theme";

export default function Scene4Brand() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      // Subtle hovering/breathing effect
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

  return (
    <group position={[0, 0, -60]}>
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
        <group ref={groupRef}>
          <Text
            position={[0, 0, 0]}
            fontSize={2}
            letterSpacing={0.1}
            color={theme.paper}
            anchorX="center"
            anchorY="middle"
          >
            SYNCMEDIA
            <meshStandardMaterial color={theme.paper} emissive={theme.paper} emissiveIntensity={0.2} />
          </Text>
          
          <Text
            position={[0, -1.5, 0.5]}
            fontSize={0.4}
            letterSpacing={0.4}
            color={theme.champagne}
            anchorX="center"
            anchorY="middle"
          >
            CINEMATIC PRODUCTION
            <meshBasicMaterial color={theme.champagne} toneMapped={false} />
          </Text>

          {/* Glowing brand aura */}
          <mesh position={[0, 0, -2]}>
            <planeGeometry args={[20, 10]} />
            <meshBasicMaterial color={theme.violet} transparent opacity={0.15} toneMapped={false} />
          </mesh>
        </group>
      </Float>
      
      <pointLight position={[0, 0, 5]} intensity={15} color={theme.paper} distance={20} />
      <pointLight position={[0, 0, -5]} intensity={30} color={theme.violet} distance={30} />
    </group>
  );
}
