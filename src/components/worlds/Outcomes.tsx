"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { COLORS } from "@/lib/colors";
import { Edges } from "@react-three/drei";

export default function Outcomes() {
  const uiTickRef = useRef<THREE.Group>(null);
  const pulseRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    // The action registers at time = 1s
    if (time > 1 && time < 1.5) {
      if (uiTickRef.current) {
        // Flicker the UI tick icon
        uiTickRef.current.visible = Math.floor(time * 20) % 2 === 0;
      }
      
      if (pulseRef.current) {
        // Expand the coral pulse
        pulseRef.current.scale.x += 0.1;
        pulseRef.current.scale.y += 0.1;
        const mat = pulseRef.current.material as THREE.MeshBasicMaterial;
        mat.opacity = 1 - (pulseRef.current.scale.x - 1) / 3;
      }
    } else if (time >= 1.5) {
      if (uiTickRef.current) uiTickRef.current.visible = true;
      if (pulseRef.current) {
          (pulseRef.current.material as THREE.MeshBasicMaterial).opacity = 0;
      }
    } else {
        if (uiTickRef.current) uiTickRef.current.visible = false;
        if (pulseRef.current) {
            pulseRef.current.scale.set(1, 1, 1);
            (pulseRef.current.material as THREE.MeshBasicMaterial).opacity = 0;
        }
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Flat Screen Panel (from Scene 6, already facing camera) */}
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[6, 3.5]} />
        <meshStandardMaterial 
            color={COLORS.voidBlack} 
            roughness={0.3} 
            metalness={0.9} 
            emissive={COLORS.acidLime}
            emissiveIntensity={0.8}
        />
        <Edges linewidth={2} threshold={15} color={COLORS.acidLime} />
        
        {/* Base UI elements */}
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
            
            {/* The Outcome "Tick" (e.g. a checkmark or cart icon representation) */}
            <group ref={uiTickRef} position={[1, 0, 0.02]} visible={false}>
                 <mesh position={[0, 0.2, 0]}>
                     <boxGeometry args={[0.8, 0.1, 0.01]} />
                     <meshBasicMaterial color={COLORS.alertCoral} />
                 </mesh>
                 <mesh position={[0, -0.2, 0]}>
                     <boxGeometry args={[0.5, 0.1, 0.01]} />
                     <meshBasicMaterial color={COLORS.alertCoral} />
                 </mesh>
                 
                 {/* Coral/Red Pulse */}
                 <mesh ref={pulseRef} position={[0, 0, -0.01]}>
                     <ringGeometry args={[0.5, 0.6, 32]} />
                     <meshBasicMaterial color={COLORS.alertCoral} transparent opacity={0} />
                 </mesh>
            </group>
        </group>
      </mesh>
    </group>
  );
}
