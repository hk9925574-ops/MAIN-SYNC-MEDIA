"use client";

import { useState } from "react";
import LazyCanvasMount from "@/components/effects/LazyCanvasMount";
import SectionMark from "@/components/effects/SectionMark";
import CTAIrisAccent from "@/components/worlds/CTAIrisAccent";

export default function CTA() {
  const [buttonHovered, setButtonHovered] = useState(false);

  return (
    <section id="contact" className="relative bg-[#0B0710] px-6 py-28 md:py-36">
      <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#FF6A3D]/[0.08] to-transparent px-8 py-16 text-center">
        <LazyCanvasMount className="pointer-events-none absolute inset-0 opacity-25">
          <CTAIrisAccent hovered={buttonHovered} />
        </LazyCanvasMount>

        <div className="relative flex flex-col items-center">
          <SectionMark label="Start a project" />
          <h2 className="text-4xl font-black text-white md:text-5xl">Have a project in mind?</h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-400">
            Tell us what you&apos;re making and we&apos;ll tell you how we&apos;d shoot it.
          </p>
          <button
            onMouseEnter={() => setButtonHovered(true)}
            onMouseLeave={() => setButtonHovered(false)}
            className="mt-10 rounded-full bg-[#FF6A3D] px-10 py-4 font-semibold text-black transition duration-300 hover:scale-105 hover:bg-[#ff8a63]"
          >
            Start a project
          </button>
        </div>
      </div>

      <footer className="mx-auto mt-24 flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-gray-500 md:flex-row">
        <span>© {new Date().getFullYear()} SyncMedia</span>
        <span className="tracking-[0.3em] uppercase">Digital Media Studio</span>
      </footer>
    </section>
  );
}
