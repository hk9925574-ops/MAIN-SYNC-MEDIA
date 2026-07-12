"use client";

import { MeshTransmissionMaterial } from "@react-three/drei";

export default function CameraLens() {
  return (
    <group>
      {/* Outer Metal Ring */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[1.2, 1.2, 0.45, 128]} />
        <meshStandardMaterial
          color="#151515"
          metalness={1}
          roughness={0.2}
        />
      </mesh>

      {/* Glass Lens */}
      <mesh
        castShadow
        receiveShadow
        position={[0, 0, 0.12]}
      >
        <cylinderGeometry args={[0.82, 0.82, 0.08, 128]} />

        <MeshTransmissionMaterial
          thickness={0.8}
          roughness={0}
          transmission={1}
          chromaticAberration={0.08}
          distortion={0.08}
          distortionScale={0.2}
          temporalDistortion={0.08}
          anisotropy={1}
          ior={1.5}
        />
      </mesh>

      {/* Inner Glow */}
      <mesh
        castShadow
        receiveShadow
        position={[0, 0, 0.18]}
      >
        <circleGeometry args={[0.42, 64]} />

        <meshBasicMaterial
          color="#00D4FF"
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}