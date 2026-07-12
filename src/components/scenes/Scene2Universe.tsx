"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { theme } from "@/lib/theme";

export default function Scene2Universe() {
  const linesRef = useRef<THREE.Group>(null);
  
  // Generate random curved splines for optical fibers
  const curves = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 50; i++) {
      const points = [];
      const radius = 5 + Math.random() * 10;
      for (let j = 0; j <= 10; j++) {
        points.push(
          new THREE.Vector3(
            Math.cos((j / 10) * Math.PI * 2) * radius + (Math.random() - 0.5) * 4,
            Math.sin((j / 10) * Math.PI * 2) * radius + (Math.random() - 0.5) * 4,
            j * -4 - (Math.random() * 10)
          )
        );
      }
      temp.push(new THREE.CatmullRomCurve3(points));
    }
    return temp;
  }, []);

  useFrame((state, delta) => {
    if (linesRef.current) {
      linesRef.current.rotation.z += delta * 0.05;
    }
  });

  return (
    <group position={[0, 0, -20]}>
      {/* Optical Fiber Tunnel */}
      <group ref={linesRef}>
        {curves.map((curve, index) => (
          <mesh key={index}>
            <tubeGeometry args={[curve, 64, 0.02, 8, false]} />
            <meshBasicMaterial 
              color={index % 2 === 0 ? theme.violet : theme.champagne} 
              transparent 
              opacity={0.3 + Math.random() * 0.5} 
              toneMapped={false} 
            />
          </mesh>
        ))}
      </group>

      {/* Volumetric ambient fog/glow in this area */}
      <pointLight position={[0, 0, -10]} intensity={20} color={theme.violet} distance={30} />
      <pointLight position={[0, 0, -20]} intensity={10} color={theme.ember} distance={40} />
    </group>
  );
}
