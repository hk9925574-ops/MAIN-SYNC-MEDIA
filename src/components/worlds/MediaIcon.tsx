"use client";

import { Text } from "@react-three/drei";
import { theme } from "@/lib/theme";

type Props = {
  emoji: string;
  color: string;
};

export default function MediaIcon({ emoji, color }: Props) {
  return (
    <group>
      {/* Glass panel — warm ink tint instead of navy */}
      <mesh>
        <boxGeometry args={[0.8, 0.8, 0.08]} />
        <meshPhysicalMaterial
          color={theme.ink}
          transmission={0.85}
          roughness={0.15}
          metalness={0.1}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Thin colored rim to read the panel's category at a glance */}
      <mesh position={[0, 0, 0.041]}>
        <boxGeometry args={[0.84, 0.84, 0.01]} />
        <meshBasicMaterial color={color} transparent opacity={0.5} toneMapped={false} />
      </mesh>

      <Text position={[0, 0, 0.06]} fontSize={0.32} color={color} anchorX="center" anchorY="middle">
        {emoji}
      </Text>
    </group>
  );
}
