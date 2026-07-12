"use client";

import { useMemo, useState, useEffect } from "react";
import { Html, Float } from "@react-three/drei";
import { theme } from "@/lib/theme";

// Mock reach data — channels vs. de-duplicated reach %. Replace with real
// numbers whenever there's an API/data source to plug in.
const CHANNELS = [
  { label: "Linear TV", value: 78 },
  { label: "OTT", value: 64 },
  { label: "YouTube", value: 52 },
  { label: "Meta", value: 45 },
  { label: "Digital", value: 39 },
];

function useCountUp(target: number, durationMs = 1200) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let raf: number;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / durationMs);
      // Ease-out cubic for a snappier finish than linear.
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(target * eased);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs]);

  return value;
}

function BarRow({ label, value, delay }: { label: string; value: number; delay: number }) {
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  const animated = useCountUp(started ? value : 0);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
      <div
        style={{
          width: "88px",
          fontSize: "12px",
          letterSpacing: "0.05em",
          color: theme.paper,
          opacity: 0.75,
          textTransform: "uppercase",
          flexShrink: 0,
        }}
      >
        {label}
      </div>
      <div
        style={{
          flex: 1,
          height: "10px",
          background: theme.metalDark,
          borderRadius: "999px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          style={{
            width: `${animated}%`,
            height: "100%",
            borderRadius: "999px",
            background: `linear-gradient(90deg, ${theme.ember}, ${theme.violet})`,
            transition: "width 0.1s linear",
          }}
        />
      </div>
      <div
        style={{
          width: "40px",
          textAlign: "right",
          fontSize: "13px",
          color: theme.champagne,
          fontVariantNumeric: "tabular-nums",
          flexShrink: 0,
        }}
      >
        {animated.toFixed(0)}%
      </div>
    </div>
  );
}

function DashboardPanel() {
  const dedupedReach = useCountUp(83);

  return (
    <div
      style={{
        width: "420px",
        padding: "28px 28px 24px",
        background: `${theme.ink}E6`, // ~90% opacity over the void
        border: `1px solid ${theme.metal}`,
        borderRadius: "14px",
        boxShadow: `0 20px 60px -20px ${theme.void}, 0 0 40px -10px ${theme.violet}33`,
        backdropFilter: "blur(6px)",
        fontFamily: "inherit",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            fontSize: "11px",
            letterSpacing: "0.2em",
            color: theme.paper,
            opacity: 0.5,
            textTransform: "uppercase",
          }}
        >
          Cross-Media Reach
        </div>
        <div
          style={{
            fontSize: "11px",
            letterSpacing: "0.1em",
            color: theme.ember,
          }}
        >
          ● LIVE
        </div>
      </div>

      {CHANNELS.map((c, i) => (
        <BarRow key={c.label} label={c.label} value={c.value} delay={i * 150} />
      ))}

      <div
        style={{
          marginTop: "20px",
          paddingTop: "18px",
          borderTop: `1px solid ${theme.metal}`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <div style={{ fontSize: "10px", color: theme.paper, opacity: 0.5, letterSpacing: "0.15em", textTransform: "uppercase" }}>
            De-duplicated Reach
          </div>
          <div style={{ fontSize: "28px", color: theme.paper, fontWeight: 600, marginTop: "2px" }}>
            {dedupedReach.toFixed(0)}%
          </div>
        </div>
        <div
          style={{
            fontSize: "11px",
            color: theme.violet,
            padding: "6px 12px",
            border: `1px solid ${theme.violet}55`,
            borderRadius: "999px",
          }}
        >
          Unified Audience
        </div>
      </div>
    </div>
  );
}

export default function Scene9Analytics() {
  // Gentle drift values so the panel doesn't feel static in the 3D space.
  const floatConfig = useMemo(() => ({ speed: 0.8, rotationIntensity: 0.05, floatIntensity: 0.3 }), []);

  return (
    <group position={[0, 0, -160]}>
      <Float speed={floatConfig.speed} rotationIntensity={floatConfig.rotationIntensity} floatIntensity={floatConfig.floatIntensity}>
        <Html
          transform
          position={[0, 0.4, -5]}
          distanceFactor={6}
          style={{ pointerEvents: "none" }}
        >
          <DashboardPanel />
        </Html>
      </Float>

      <pointLight position={[0, 0, -5]} intensity={30} color={theme.violet} distance={20} />
      <pointLight position={[3, 2, -3]} intensity={20} color={theme.ember} distance={15} />
      <ambientLight intensity={0.15} />
    </group>
  );
}
