"use client";

import { Float } from "@react-three/drei";
import SyncOrb from "./SyncOrb";
import EnergyRing from "./EnergyRing";
import { theme } from "@/lib/theme";

export default function MediaCore() {
  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.6}>
      <group>
        <SyncOrb />

        {/* Layered halo rings around the crystal core */}
        <EnergyRing rotation={[Math.PI / 2.4, 0, 0]} color={theme.ember} speed={0.25} scale={1.3} />
        <EnergyRing rotation={[Math.PI / 3.2, 0.6, 0]} color={theme.violet} speed={-0.18} scale={1.55} />
        <EnergyRing rotation={[Math.PI / 1.8, -0.4, 0.3]} color={theme.champagne} speed={0.12} scale={1.85} />
      </group>
    </Float>
  );
}
