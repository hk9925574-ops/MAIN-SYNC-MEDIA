"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { COLORS } from "@/lib/colors";
import { Edges } from "@react-three/drei";

export default function SyncOrb() {
  const groupRef = useRef<THREE.Group>(null);
  const leftScreenRef = useRef<THREE.Mesh>(null);
  const rightScreenRef = useRef<THREE.Mesh>(null);
  const leftChipRef = useRef<THREE.Group>(null);
  const rightChipRef = useRef<THREE.Group>(null);
  const mergedPointRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    // Rotate screens to face each other (angled inward)
    if (leftScreenRef.current && rightScreenRef.current) {
      leftScreenRef.current.rotation.y = THREE.MathUtils.lerp(0, Math.PI / 4, Math.min(time * 0.5, 1));
      rightScreenRef.current.rotation.y = THREE.MathUtils.lerp(0, -Math.PI / 4, Math.min(time * 0.5, 1));
    }

    // Chips extract and move to center
    if (leftChipRef.current && rightChipRef.current && mergedPointRef.current) {
      if (time > 1) {
        const moveProgress = Math.min((time - 1) * 0.5, 1);
        // Move towards 0,0,0
        leftChipRef.current.position.lerp(new THREE.Vector3(0, 0, 0), 0.05);
        rightChipRef.current.position.lerp(new THREE.Vector3(0, 0, 0), 0.05);
        
        // Scale down chips as they merge
        leftChipRef.current.scale.setScalar(1 - moveProgress);
        rightChipRef.current.scale.setScalar(1 - moveProgress);

        // Grow the merged point
        mergedPointRef.current.scale.setScalar(moveProgress);
        const mat = mergedPointRef.current.material as THREE.MeshBasicMaterial;
        mat.opacity = moveProgress;
      }
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Left Channel Screen */}
      <mesh ref={leftScreenRef} position={[-2, 0, 0]}>
        <planeGeometry args={[1.5, 4]} />
        <meshStandardMaterial color={COLORS.voidBlack} roughness={0.4} metalness={0.8} />
        <Edges linewidth={1} threshold={15} color={COLORS.acidLime} opacity={0.3} transparent />
        
        {/* Left Data Chip */}
        <group ref={leftChipRef} position={[0, 0, 0.1]}>
          <mesh>
            <boxGeometry args={[0.8, 0.3, 0.05]} />
            <meshStandardMaterial color={COLORS.voidBlack} emissive={COLORS.acidLime} emissiveIntensity={0.8} />
          </mesh>
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(0.8, 0.3, 0.05)]} />
            <lineBasicMaterial color={COLORS.acidLime} />
          </lineSegments>
        </group>
      </mesh>

      {/* Right Channel Screen */}
      <mesh ref={rightScreenRef} position={[2, 0, 0]}>
        <planeGeometry args={[1.5, 4]} />
        <meshStandardMaterial color={COLORS.voidBlack} roughness={0.4} metalness={0.8} />
        <Edges linewidth={1} threshold={15} color={COLORS.acidLime} opacity={0.3} transparent />
        
        {/* Right Data Chip */}
        <group ref={rightChipRef} position={[0, 0, 0.1]}>
          <mesh>
            <boxGeometry args={[0.8, 0.3, 0.05]} />
            <meshStandardMaterial color={COLORS.voidBlack} emissive={COLORS.acidLime} emissiveIntensity={0.8} />
          </mesh>
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(0.8, 0.3, 0.05)]} />
            <lineBasicMaterial color={COLORS.acidLime} />
          </lineSegments>
        </group>
      </mesh>

      {/* Merged Identity Point */}
      <mesh ref={mergedPointRef} position={[0, 0, 0.2]} scale={0}>
        <circleGeometry args={[0.3, 32]} />
        <meshBasicMaterial color={COLORS.acidLime} transparent opacity={0} />
      </mesh>
      
      {/* Dedup ripple ring */}
      <mesh position={[0, 0, 0.15]}>
        <ringGeometry args={[0.35, 0.4, 32]} />
        <meshBasicMaterial color={COLORS.acidLime} transparent opacity={0.5} />
      </mesh>
    </group>
  );
}
