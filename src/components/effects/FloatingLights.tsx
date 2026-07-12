"use client";

import { Float } from "@react-three/drei";
import { theme } from "@/lib/theme";

const lights = [
  { pos: [3, 1, 1], size: 0.08, color: theme.ember, speed: 2 },
  { pos: [-2, 2, -1], size: 0.06, color: theme.violet, speed: 3 },
  { pos: [1.5, -1, 2], size: 0.05, color: theme.champagne, speed: 2.5 },
  { pos: [-3.5, 1.4, 2.5], size: 0.05, color: theme.champagne, speed: 2.2 },
  { pos: [2.6, -1.6, -2.2], size: 0.06, color: theme.violet, speed: 1.8 },
  { pos: [0, 2.8, 0.5], size: 0.04, color: theme.ember, speed: 3.4 },
  { pos: [-1.2, -0.6, 3.2], size: 0.05, color: theme.ember, speed: 2.6 },
  { pos: [3.8, 0.4, -1.5], size: 0.04, color: theme.violet, speed: 3.1 },
] as const;

export default function FloatingLights() {
  return (
    <>
      {lights.map((light, i) => (
        <Float key={i} speed={light.speed}>
          <mesh position={light.pos as unknown as [number, number, number]}>
            <sphereGeometry args={[light.size, 32, 32]} />
            <meshBasicMaterial color={light.color} />
          </mesh>
        </Float>
      ))}
    </>
  );
}
