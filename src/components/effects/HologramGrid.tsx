"use client";

import { theme } from "@/lib/theme";

export default function HologramGrid() {
  return (
    <gridHelper args={[40, 80, theme.ember, "#3A1F12"]} position={[0, -2.2, 0]} />
  );
}
