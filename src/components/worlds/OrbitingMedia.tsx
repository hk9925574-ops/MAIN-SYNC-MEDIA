"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { COLORS } from "@/lib/colors";
import { Edges } from "@react-three/drei";

export default function OrbitingMedia() {
  const panelRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    if (panelRef.current) {
        // Start edge-on (rotation Y = Math.PI / 2)
        // Rotate to face camera (rotation Y = 0) over 2 seconds
        const rotY = THREE.MathUtils.lerp(Math.PI / 2, 0, Math.min(time * 0.5, 1));
        panelRef.current.rotation.y = rotY;
        
        // Emissive light up after it faces the camera
        if (time > 2) {
            const mat = panelRef.current.material as THREE.MeshStandardMaterial;
            mat.emissiveIntensity = THREE.MathUtils.lerp(mat.emissiveIntensity, 0.8, 0.05);
        }
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Flat Screen Panel */}
      <mesh ref={panelRef} position={[0, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[6, 3.5]} />
        <meshStandardMaterial 
            color={COLORS.voidBlack} 
            roughness={0.3} 
            metalness={0.9} 
            emissive={COLORS.acidLime}
            emissiveIntensity={0}
        />
        <Edges linewidth={2} threshold={15} color={COLORS.acidLime} />
        
        {/* Abstract UI elements on the screen to show delivery */}
        <group position={[0, 0, 0.01]}>
            <mesh position={[-2, 1, 0]}>
                <planeGeometry args={[1, 0.2]} />
                <meshBasicMaterial color={COLORS.signalCyan} opacity={0.5} transparent />
            </mesh>
            <mesh position={[-2, 0.5, 0]}>
                <planeGeometry args={[1.5, 0.1]} />
                <meshBasicMaterial color={COLORS.signalCyan} opacity={0.5} transparent />
            </mesh>
            <mesh position={[1, 0, 0]}>
                <planeGeometry args={[3, 2]} />
                <meshBasicMaterial color={COLORS.voidBlack} />
                <Edges linewidth={1} threshold={15} color={COLORS.signalCyan} opacity={0.3} transparent />
            </mesh>
        </group>
      </mesh>
    </group>
  );
}
