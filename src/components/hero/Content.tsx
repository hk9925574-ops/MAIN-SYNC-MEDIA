"use client";

import MediaCore from "@/components/worlds/MediaCore";
import OrbitingMedia from "@/components/worlds/OrbitingMedia";

import Particles from "@/components/particles/Particles";

import FloatingLights from "@/components/effects/FloatingLights";
import LightBeams from "@/components/effects/LightBeams";
import HologramGrid from "@/components/effects/HologramGrid";
import DataStreams from "@/components/effects/DataStreams";

export function Content() {
  return (
    <>
      {/* MAIN HERO OBJECT */}
      <MediaCore />

      {/* ORBITING VISUAL SYSTEM */}
      <OrbitingMedia />

      {/* ATMOSPHERIC LAYER */}
      <Particles />
      <FloatingLights />

      {/* LIGHT & ENERGY FX */}
      <LightBeams />
      <DataStreams />

      {/* STRUCTURE / GRID UI FEEL */}
      <HologramGrid />
    </>
  );
}