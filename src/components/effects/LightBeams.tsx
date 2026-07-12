
"use client";

import { Cylinder } from "@react-three/drei";
import { theme } from "@/lib/theme";

export default function LightBeams() {
  return (
    <group>
      <Cylinder args={[0.03, 0.25, 8, 32]} position={[3, 1, -2]}>
        <meshBasicMaterial color={theme.ember} transparent opacity={0.15} />
      </Cylinder>

      <Cylinder args={[0.03, 0.25, 7, 32]} position={[-3, 0.5, -1]}>
        <meshBasicMaterial color={theme.violet} transparent opacity={0.15} />
      </Cylinder>

      <Cylinder args={[0.03, 0.2, 6, 32]} position={[0, 2, -3]}>
        <meshBasicMaterial color={theme.champagne} transparent opacity={0.12} />
      </Cylinder>
    </group>
  );
}

