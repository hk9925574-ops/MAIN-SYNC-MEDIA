"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { COLORS } from "@/lib/colors";
import { Edges } from "@react-three/drei";

export default function EngineCore() {
  const ringRef = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (ringRef.current) {
      // Pulse animation: expand and reset
      ringRef.current.scale.x += delta * 2;
      ringRef.current.scale.y += delta * 2;
      
      const mat = ringRef.current.material as THREE.MeshBasicMaterial;
      // Fade out as it expands
      mat.opacity = Math.max(0, 1 - (ringRef.current.scale.x - 1) / 3);
      
      if (ringRef.current.scale.x > 4) {
        ringRef.current.scale.set(1, 1, 1);
        mat.opacity = 1;
      }
    }
  });

  return (
    <group>
      {/* Flat dark plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color={COLORS.voidBlack} roughness={0.4} metalness={0.8} />
      </mesh>
      
      {/* Expanding signal pulse */}
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.49, 0]}>
        <ringGeometry args={[0.95, 1, 64]} />
        <meshBasicMaterial 
          color={COLORS.acidLime} 
          transparent 
          opacity={1}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Central origin point */}
      <mesh position={[0, -0.48, 0]}>
        <circleGeometry args={[0.1, 32]} />
        <meshBasicMaterial color={COLORS.acidLime} />
      </mesh>
    </group>
  );
}
