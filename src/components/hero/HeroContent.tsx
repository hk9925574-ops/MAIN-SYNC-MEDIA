"use client";

import HeroButtons from "./HeroButtons";
import ScrollIndicator from "./ScrollIndicator";

// Framed layout instead of one centered text block: headline pinned to
// the top, tagline/CTAs pinned to the bottom, leaving the iris itself
// clear in the vertical center.
export default function HeroContent() {
  return (
    <section className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-between px-6 py-16 text-center md:py-24">
      <div>
        <p className="mb-4 tracking-[0.4em] text-[#FF6A3D] uppercase">
          Digital Media Studio
        </p>
        <h1 className="text-6xl font-black leading-none text-[#F5EFE8] md:text-7xl">
          SYNC<span className="text-[#FF6A3D]">MEDIA</span>
        </h1>
      </div>

      <div className="flex flex-col items-center">
        <p className="mx-auto max-w-xl text-lg leading-8 text-gray-300">
          Create stunning videos, photography, AI-powered content,
          social campaigns and immersive digital experiences.
        </p>

        <HeroButtons />
        <ScrollIndicator />
      </div>
    </section>
  );
}
