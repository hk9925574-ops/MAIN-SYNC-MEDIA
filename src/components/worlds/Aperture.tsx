"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { COLORS } from "@/lib/colors";
import { Edges } from "@react-three/drei";

export default function Aperture() {
  const apertureGroup = useRef<THREE.Group>(null);
  const bladesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    // Animate blades opening
    if (bladesRef.current) {
        // As time passes, the aperture opens (scale expands)
        const openProgress = Math.min(time * 0.5, 1);
        bladesRef.current.scale.setScalar(1 + openProgress * 3);
        bladesRef.current.rotation.z = openProgress * Math.PI / 4;
    }
  });

  return (
    <group ref={apertureGroup} position={[0, 0, 0]}>
      {/* Mechanical Iris Base */}
      <mesh position={[0, 0, -1]}>
        <ringGeometry args={[2, 4, 32]} />
        <meshStandardMaterial color={COLORS.voidBlack} roughness={0.4} metalness={0.8} />
        <Edges linewidth={1} threshold={15} color={COLORS.acidLime} opacity={0.3} transparent />
      </mesh>

      {/* Iris Blades */}
      <group ref={bladesRef}>
        {Array.from({ length: 6 }).map((_, i) => (
          <group key={i} rotation={[0, 0, (i * Math.PI) / 3]}>
             <mesh position={[1.5, 0, 0]} rotation={[0, 0, Math.PI / 6]}>
                 <planeGeometry args={[3, 1]} />
                 <meshStandardMaterial color={COLORS.voidBlack} roughness={0.4} metalness={0.9} />
                 <Edges linewidth={1} threshold={15} color={COLORS.acidLime} />
             </mesh>
          </group>
        ))}
      </group>
      
      {/* Central View/Lens Glow */}
      <mesh position={[0, 0, -2]}>
          <circleGeometry args={[2, 32]} />
          <meshBasicMaterial color={COLORS.acidLime} transparent opacity={0.1} />
      </mesh>
    </group>
  );
}