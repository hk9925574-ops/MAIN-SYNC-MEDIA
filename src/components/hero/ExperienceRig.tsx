"use client";

import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export function ExperienceRig() {
  const { camera, mouse } = useThree();

  useFrame(() => {
    // Smooth mouse-based parallax (stable)
    const x = THREE.MathUtils.lerp(camera.position.x, mouse.x * 0.6, 0.05);
    const y = THREE.MathUtils.lerp(camera.position.y, 1.2 + mouse.y * 0.3, 0.05);

    camera.position.set(x, y, camera.position.z);

    // Always look at center (important)
    camera.lookAt(0, 0, 0);
  });

  return null;
}
