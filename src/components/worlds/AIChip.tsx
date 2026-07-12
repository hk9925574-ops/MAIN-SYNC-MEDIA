"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { COLORS } from "@/lib/colors";
import { Edges } from "@react-three/drei";

export default function AIChip() {
  const lanesRef = useRef<THREE.Group>(null);
  const chipsRef = useRef<THREE.Group>(null);

  const LANES = 5;
  const CHIPS_PER_LANE = 4;

  const baseCoolTones = [
    "#3FE0FF", // Cyan
    "#00B4D8", 
    "#0096C7",
    "#0077B6",
    "#023E8A"
  ];

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    // Animate chips flying into lanes
    if (chipsRef.current && lanesRef.current) {
      chipsRef.current.children.forEach((chip, i) => {
        const laneIdx = i % LANES;
        const stackIdx = Math.floor(i / LANES);
        
        // Target position slots into the lane screen
        const targetX = (laneIdx - 2) * 1.5;
        const targetY = stackIdx * 0.6 - 1;
        const targetZ = 0.1; // slightly in front of the screen
        
        // Lerp position
        chip.position.lerp(new THREE.Vector3(targetX, targetY, targetZ), 0.05);
        
        // After chips are roughly in place (time > 2s), color shifts to lime to indicate classification
        const mat = (chip.children[0] as THREE.Mesh).material as THREE.MeshStandardMaterial;
        const targetColor = new THREE.Color(time > 2.5 ? COLORS.acidLime : baseCoolTones[laneIdx]);
        mat.emissive.lerp(targetColor, 0.05);
        
        // Also update edges
        if (chip.children.length > 1) {
            const edgeMat = (chip.children[1] as THREE.LineSegments).material as THREE.LineBasicMaterial;
            edgeMat.color.lerp(targetColor, 0.05);
        }
      });
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* 5 Vertical Screens (Lanes) */}
      <group ref={lanesRef}>
        {Array.from({ length: LANES }).map((_, i) => (
          <mesh key={`lane-${i}`} position={[(i - 2) * 1.5, 0, 0]}>
            <planeGeometry args={[1.2, 4]} />
            <meshStandardMaterial 
              color={COLORS.voidBlack} 
              roughness={0.4} 
              metalness={0.8}
            />
            {/* Screen edge */}
            <Edges linewidth={1} threshold={15} color={baseCoolTones[i]} opacity={0.5} transparent />
          </mesh>
        ))}
      </group>

      {/* Chips flying into lanes */}
      <group ref={chipsRef}>
        {Array.from({ length: LANES * CHIPS_PER_LANE }).map((_, i) => (
          <group 
            key={`chip-${i}`} 
            position={[(Math.random() - 0.5) * 8, 3 + Math.random() * 4, 2 + Math.random() * 2]}
          >
            {/* Chip body */}
            <mesh>
              <boxGeometry args={[0.8, 0.3, 0.05]} />
              <meshStandardMaterial 
                color={COLORS.voidBlack}
                emissive={baseCoolTones[i % LANES]}
                emissiveIntensity={0.5}
                roughness={0.4} 
                metalness={0.8}
              />
            </mesh>
            {/* Chip Edge */}
            <lineSegments>
                <edgesGeometry args={[new THREE.BoxGeometry(0.8, 0.3, 0.05)]} />
                <lineBasicMaterial color={baseCoolTones[i % LANES]} />
            </lineSegments>
          </group>
        ))}
      </group>
    </group>
  );
}
