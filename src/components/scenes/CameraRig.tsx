"use client";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
export default function CameraRig() {
  const { camera, pointer } = useThree();
  const v = new THREE.Vector3();
  const target = new THREE.Vector3();
  useFrame((_, delta) => {
    // Calculate scroll offset manually (0 to 1), scoped to just the 9 scene
    // sections (each ~100vh). Must match useActiveSceneIndex's formula, or
    // the camera and the mounted scene disagree once Work/Contact scroll
    // starts stretching things - that's the "pages overlapping" bug.
    const maxScroll = window.innerHeight * 8; // TOTAL_SCENES - 1
    const offset = maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0;
    
    // The total distance we travel is along the Z axis, e.g. from 0 to -160
    const totalZ = -160;
    const targetZ = offset * totalZ;
    
    // Add some cinematic wobble and panning based on scroll and pointer
    const wobbleX = Math.sin(offset * Math.PI * 4) * 2;
    const wobbleY = Math.cos(offset * Math.PI * 4) * 1;
    
    // Smoothly interpolate camera position
    v.set(wobbleX + pointer.x * 2, 1 + wobbleY + pointer.y * 2, targetZ + 5);
    camera.position.lerp(v, 4 * delta);
    
    // Look slightly ahead on the path
    target.set(0, 1, targetZ - 10);
    
    // Extract current rotation
    const currentRot = new THREE.Quaternion().copy(camera.quaternion);
    
    // Calculate target rotation
    camera.lookAt(target);
    const targetRot = new THREE.Quaternion().copy(camera.quaternion);
    
    // Slerp back and apply
    camera.quaternion.copy(currentRot).slerp(targetRot, 4 * delta);
  });
  return null;
}
