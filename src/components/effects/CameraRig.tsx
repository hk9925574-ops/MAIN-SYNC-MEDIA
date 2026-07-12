"use client";

import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import useStoryProgress from "./useStoryProgress";
import { STORY_STATES } from "./story";

const LOOK_TARGET = new THREE.Vector3(1.6, 0, 0);

export default function CameraRig() {
  const { camera } = useThree();
  const index = useStoryProgress();

  const target = new THREE.Vector3();

  useFrame(() => {
    const state = STORY_STATES[index];

    target.set(
      state.camera.x,
      state.camera.y,
      state.camera.z
    );

    camera.position.lerp(target, 0.06);
    camera.lookAt(LOOK_TARGET);
  });

  return null;
}