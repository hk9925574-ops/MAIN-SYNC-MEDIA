"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { Environment, MeshReflectorMaterial } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette, DepthOfField, ChromaticAberration, Noise } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import SyncCore from "@/components/worlds/SyncCore";
import DataStreams from "@/components/worlds/DataStreams";
import FloatingDust from "@/components/worlds/FloatingDust";
import { theme } from "@/lib/theme";

export default function HeroScene() {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 0, 7], fov: 45 }}
      gl={{ toneMapping: THREE.ACESFilmicToneMapping }}
    >
      <color attach="background" args={[theme.void]} />
      <fogExp2 attach="fog" args={[theme.void, 0.05]} />

      <ambientLight intensity={0.4} />

      {/* Lighting for the glass to catch */}
      <spotLight
        castShadow
        position={[4, 5, 5]}
        intensity={80}
        angle={0.5}
        penumbra={1}
        color={theme.champagne}
      />
      <spotLight
        position={[-5, -3, 2]}
        intensity={60}
        angle={0.6}
        penumbra={1}
        color={theme.violet}
      />
      <pointLight position={[0, 2, -4]} intensity={20} color={theme.violet} distance={10} />
      
      {/* Front fill light */}
      <pointLight position={[0, 0.5, 5]} intensity={10} color={theme.paper} distance={10} />

      <Suspense fallback={null}>
        {/* High-contrast environment map is critical for realistic glass reflections */}
        <Environment preset="studio" environmentIntensity={1} />
        
        <SyncCore />
        <DataStreams />
        <FloatingDust count={150} />
      </Suspense>

      {/* Ground plane for subtle reflections */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.5, 0]}>
        <planeGeometry args={[50, 50]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={512}
          mixBlur={1}
          mixStrength={1.5}
          roughness={1}
          depthScale={0}
          color={theme.void}
          metalness={0.1}
          mirror={0}
        />
      </mesh>

      <EffectComposer>
        <DepthOfField target={[0, 0, 0]} focalLength={0.02} bokehScale={2} height={480} />
        <Bloom luminanceThreshold={0.4} luminanceSmoothing={0.9} intensity={1.5} mipmapBlur />
        <ChromaticAberration blendFunction={BlendFunction.NORMAL} offset={new THREE.Vector2(0.002, 0.002)} />
        <Noise premultiply blendFunction={BlendFunction.ADD} opacity={0.3} />
        <Vignette eskil={false} offset={0.3} darkness={0.9} />
      </EffectComposer>
    </Canvas>
  );
}
