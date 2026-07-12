"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { MeshTransmissionMaterial, Float } from "@react-three/drei";
import { theme } from "@/lib/theme";

export default function Scene3Assembly() {
  const groupRef = useRef<THREE.Group>(null);
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
    }
    if (ring1.current) ring1.current.rotation.z += delta * 0.2;
    if (ring2.current) ring2.current.rotation.z -= delta * 0.3;
  });

  return (
    <group position={[0, 0, -40]}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <group ref={groupRef}>
          {/* Central Glass Lens Element */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[2, 2, 0.5, 64]} />
            <MeshTransmissionMaterial
              backside
              thickness={2}
              roughness={0.1}
              transmission={1}
              ior={1.5}
              chromaticAberration={0.5}
              color={theme.void}
            />
          </mesh>
          
          {/* Wireframe Camera Body Hologram */}
          <mesh position={[0, 0, -1.5]}>
            <boxGeometry args={[3, 2, 2]} />
            <meshBasicMaterial color={theme.champagne} wireframe transparent opacity={0.3} toneMapped={false} />
          </mesh>

          {/* Rotating Focus Rings */}
          <mesh ref={ring1} position={[0, 0, 0.5]}>
            <torusGeometry args={[2.2, 0.05, 16, 100]} />
            <meshBasicMaterial color={theme.violet} toneMapped={false} />
          </mesh>
          <mesh ref={ring2} position={[0, 0, 0.8]}>
            <torusGeometry args={[2.4, 0.02, 16, 100]} />
            <meshBasicMaterial color={theme.ember} toneMapped={false} />
          </mesh>
        </group>
      </Float>
      
      {/* Dynamic light beams */}
      <spotLight position={[5, 5, 5]} intensity={100} angle={0.3} penumbra={1} color={theme.violet} />
      <spotLight position={[-5, -5, -5]} intensity={100} angle={0.3} penumbra={1} color={theme.ember} />
    </group>
  );
}
