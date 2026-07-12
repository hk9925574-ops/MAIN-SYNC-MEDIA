"use client";

import LazyCanvasMount from "@/components/effects/LazyCanvasMount";
import SectionMark from "@/components/effects/SectionMark";
import WorkFrame3D from "@/components/worlds/WorkFrame3D";
import { theme } from "@/lib/theme";

const work = [
  { label: "Aperture Skincare — Launch Film", tag: "Video / Post", color: theme.ember },
  { label: "Northline Athletics — Campaign", tag: "Photography / Social", color: theme.violet },
  { label: "Vantage Audio — Product Series", tag: "Video / AI Content", color: theme.champagne },
];

export default function Work() {
  return (
    <section id="work" className="relative bg-[#0B0710] px-6 py-28 md:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionMark label="Selected work" />
        <h2 className="max-w-2xl text-4xl font-black text-white md:text-5xl">Recent projects.</h2>

        <div className="mt-16 flex flex-col divide-y divide-white/10 border-y border-white/10">
          {work.map((item) => (
            <div
              key={item.label}
              className="group flex cursor-pointer items-center justify-between gap-6 py-8 transition hover:bg-[#FF6A3D]/[0.03]"
            >
              <div className="flex-1">
                <span className="text-xl font-semibold text-white transition group-hover:text-[#FF6A3D] md:text-2xl">
                  {item.label}
                </span>
                <div className="mt-2 text-sm tracking-widest text-gray-500 uppercase">{item.tag}</div>
              </div>
              <LazyCanvasMount className="h-24 w-32 shrink-0 transition-transform duration-300 group-hover:scale-110">
                <WorkFrame3D color={item.color} />
              </LazyCanvasMount>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
