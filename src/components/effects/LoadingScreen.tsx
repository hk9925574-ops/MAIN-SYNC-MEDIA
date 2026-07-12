"use client";

import { useEffect, useState } from "react";
import { useProgress } from "@react-three/drei";
import { theme } from "@/lib/theme";

export default function LoadingScreen() {
  const { progress, active } = useProgress();
  const [visible, setVisible] = useState(true);
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    // Only start the fade-out once loading is fully done AND we've held the
    // screen for a minimum time, so it doesn't just flash on fast connections.
    if (!active && progress >= 100) {
      const fadeTimer = setTimeout(() => setFadingOut(true), 400);
      const removeTimer = setTimeout(() => setVisible(false), 400 + 600);
      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(removeTimer);
      };
    }
  }, [active, progress]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center transition-opacity duration-600"
      style={{
        background: theme.void,
        opacity: fadingOut ? 0 : 1,
        transitionDuration: "600ms",
        pointerEvents: fadingOut ? "none" : "auto",
      }}
    >
      <div className="relative flex h-24 w-24 items-center justify-center">
        {/* Outer pulse rings */}
        <span
          className="absolute inline-block h-full w-full animate-ping rounded-full"
          style={{ background: `${theme.violet}33` }}
        />
        <span
          className="absolute inline-block h-2/3 w-2/3 animate-pulse rounded-full"
          style={{ background: `${theme.ember}40` }}
        />
        {/* Core mark */}
        <span
          className="relative block h-6 w-6 rounded-full"
          style={{
            background: `linear-gradient(135deg, ${theme.ember}, ${theme.violet})`,
            boxShadow: `0 0 24px 4px ${theme.violet}55`,
          }}
        />
      </div>

      <div
        className="mt-8 text-xs uppercase tracking-[0.3em]"
        style={{ color: `${theme.paper}99` }}
      >
        Syncing
      </div>

      <div
        className="mt-4 h-[2px] w-40 overflow-hidden rounded-full"
        style={{ background: `${theme.metal}66` }}
      >
        <div
          className="h-full rounded-full transition-[width] duration-200 ease-out"
          style={{
            width: `${progress}%`,
            background: `linear-gradient(90deg, ${theme.ember}, ${theme.violet})`,
          }}
        />
      </div>
    </div>
  );
}
