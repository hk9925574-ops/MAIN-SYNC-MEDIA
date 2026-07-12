"use client";

import { useState } from "react";
import LazyCanvasMount from "@/components/effects/LazyCanvasMount";
import SectionMark from "@/components/effects/SectionMark";
import MiniIconScene from "@/components/worlds/MiniIconScene";
import { IconKind } from "@/components/worlds/CapabilityIcon3D";
import { theme } from "@/lib/theme";

const capabilities: { kind: IconKind; color: string; title: string; copy: string }[] = [
  { kind: "video", color: theme.ember, title: "Video Production", copy: "Commercial, brand, and narrative shoots — planned, shot, and edited in-house." },
  { kind: "photo", color: theme.champagne, title: "Photography", copy: "Product, lifestyle, and campaign photography with full retouching." },
  { kind: "post", color: theme.violet, title: "Post & VFX", copy: "Color grading, motion graphics, and visual effects for every format." },
  { kind: "audio", color: theme.ember, title: "Audio & Sound", copy: "Original scoring, sound design, and mix for video and social." },
  { kind: "ai", color: theme.violet, title: "AI-Powered Content", copy: "Generative tooling layered into real production pipelines, not gimmicks." },
  { kind: "cloud", color: theme.champagne, title: "Social & Distribution", copy: "Platform-native cuts and campaign rollout across every channel." },
];

export default function Capabilities() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section id="services" className="relative bg-[#0B0710] px-6 py-28 md:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionMark label="What we do" />
        <h2 className="max-w-2xl text-4xl font-black text-white md:text-5xl">
          One studio, every format.
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((cap, i) => (
            <div
              key={cap.title}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx((cur) => (cur === i ? null : cur))}
              className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition duration-300 hover:border-[#FF6A3D]/40 hover:bg-[#FF6A3D]/[0.04]"
            >
              <LazyCanvasMount className="h-24 w-24">
                <MiniIconScene kind={cap.kind} color={cap.color} boost={hoveredIdx === i ? 3 : 1} />
              </LazyCanvasMount>
              <h3 className="mt-3 text-lg font-semibold text-white">{cap.title}</h3>
              <p className="mt-3 text-sm leading-6 text-gray-400">{cap.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
