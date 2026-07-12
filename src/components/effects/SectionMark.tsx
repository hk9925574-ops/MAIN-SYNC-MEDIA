"use client";

import LazyCanvasMount from "./LazyCanvasMount";
import ApertureMark from "@/components/worlds/ApertureMark";

export default function SectionMark({ label }: { label: string }) {
  return (
    <div className="mb-3 flex items-center gap-3">
      <LazyCanvasMount className="h-7 w-7 shrink-0">
        <ApertureMark />
      </LazyCanvasMount>
      <p className="text-sm tracking-[0.4em] text-[#FF6A3D] uppercase">{label}</p>
    </div>
  );
}
