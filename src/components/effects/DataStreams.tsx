"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { CatmullRomLine } from "@react-three/drei";
import * as THREE from "three";
import { theme } from "@/lib/theme";

const ICON_COUNT = 6;
const ORBIT_RADIUS = 3;

function orbitPoint(index: number): [number, number, number] {
  const angle = (Math.PI * 2 * index) / ICON_COUNT;
  return [
    Math.cos(angle) * ORBIT_RADIUS,
    Math.sin(angle * 2) * 0.4,
    Math.sin(angle) * ORBIT_RADIUS,
  ];
}

const streams: [number, number, number][][] = Array.from(
  { length: ICON_COUNT },
  (_, i) => {
    const end = orbitPoint(i);
    const mid: [number, number, number] = [end[0] * 0.5, end[1] + 0.6, end[2] * 0.5];
    return [[0, 0, 0], mid, end];
  }
);

export default function DataStreams() {
  const group = useRef<THREE.Group>(null);

  const colors = useMemo(
    () => streams.map((_, i) => (i % 2 === 0 ? theme.ember : theme.violet)),
    []
  );

  useFrame(({ clock }) => {
    if (!group.current) return;
    group.current.rotation.y = clock.elapsedTime * 0.25;
  });

  return (
    <group ref={group}>
      {streams.map((points, index) => (
        <CatmullRomLine
          key={index}
          points={points}
          color={colors[index]}
          lineWidth={1.5}
          transparent
          opacity={0.35}
        />
      ))}
    </group>
  );
}
