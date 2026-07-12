"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useTransitionManager } from "@/store/TransitionManager";

export default function WipeTransition() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { transitionProgress } = useTransitionManager();
  const { camera } = useThree();

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uProgress.value = transitionProgress;
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh position={[0, 0, -1]}>
      {/* Plane covering the camera view */}
      <planeGeometry args={[20, 20]} />
      <shaderMaterial
        ref={materialRef}
        transparent
        depthWrite={false}
        uniforms={{
          uProgress: { value: 0 },
          uTime: { value: 0 },
          uColor: { value: new THREE.Color("#0B0710") },
        }}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          varying vec2 vUv;
          uniform float uProgress;
          uniform float uTime;
          uniform vec3 uColor;

          // Simple 2D noise
          float hash(vec2 p) { return fract(1e4 * sin(17.0 * p.x + p.y * 0.1) * (0.1 + abs(sin(p.y * 13.0 + p.x)))); }
          float noise(vec2 x) {
            vec2 i = floor(x);
            vec2 f = fract(x);
            float a = hash(i);
            float b = hash(i + vec2(1.0, 0.0));
            float c = hash(i + vec2(0.0, 1.0));
            float d = hash(i + vec2(1.0, 1.0));
            vec2 u = f * f * (3.0 - 2.0 * f);
            return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
          }

          void main() {
            float n = noise(vUv * 10.0 + uTime * 0.5);
            // Dissolve effect based on progress.
            // When progress is 0, alpha is 0.
            // When progress is 0.5, alpha is 1 (fully covered).
            // When progress is 1, alpha is 0.
            
            float wipe = 1.0 - abs(uProgress * 2.0 - 1.0);
            
            float alpha = smoothstep(0.4, 0.6, wipe + (n - 0.5) * 0.5);
            
            gl_FragColor = vec4(uColor, alpha);
          }
        `}
      />
    </mesh>
  );
}
