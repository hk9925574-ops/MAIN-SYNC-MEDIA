"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { COLORS } from "@/lib/colors";
import { Edges } from "@react-three/drei";

export default function DataStreams() {
  const chipsRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  // Generate grid positions
  const gridPositions = useMemo(() => {
    const pos = [];
    const size = 3;
    const spacing = 1.2;
    for (let x = -size; x <= size; x++) {
      for (let y = -size; y <= size; y++) {
        // Leave some gaps randomly
        if (Math.random() > 0.3) {
          pos.push(new THREE.Vector3(x * spacing, y * spacing, 0));
        }
      }
    }
    return pos;
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;
    
    // Animate the initial ring expanding and fading
    if (ringRef.current) {
      if (ringRef.current.scale.x < 3) {
        ringRef.current.scale.x += delta * 4;
        ringRef.current.scale.y += delta * 4;
        (ringRef.current.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 1 - (ringRef.current.scale.x - 1) / 2);
      }
    }

    // Chips floating into grid positions
    if (chipsRef.current) {
      chipsRef.current.children.forEach((chip, i) => {
        const targetPos = gridPositions[i];
        if (targetPos) {
          // Add slight sine wave bobbing after snapping to grid
          const offset = Math.sin(time * 2 + i) * 0.1;
          
          chip.position.lerp(new THREE.Vector3(targetPos.x, targetPos.y + offset, targetPos.z), 0.05);
          
          // Animate rotation snapping
          chip.quaternion.slerp(new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, 0)), 0.05);
        }
      });
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Ghost of Scene 1 pulse fracturing */}
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.95, 1, 64]} />
        <meshBasicMaterial 
          color={COLORS.acidLime} 
          transparent 
          opacity={1}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Structured data chips */}
      <group ref={chipsRef}>
        {gridPositions.map((pos, i) => (
          <group 
            key={i} 
            // Start scattered, will lerp to grid in useFrame
            position={[(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 5]}
            rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
          >
            <mesh>
              <boxGeometry args={[0.8, 0.4, 0.05]} />
              <meshStandardMaterial 
                color={COLORS.voidBlack} 
                roughness={0.4} 
                metalness={0.8}
              />
              <Edges linewidth={1} threshold={15} color={COLORS.acidLime} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}
