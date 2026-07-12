"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { audioEngine } from "@/lib/AudioEngine";

export default function ReactiveParticles({ count = 1500 }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const { viewport, camera } = useThree();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  // Particle base positions and swarm properties
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const radius = Math.random() * 15 + 2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      
      const size = Math.random() * 0.05 + 0.02;
      temp.push({ 
        position: new THREE.Vector3(x, y, z),
        velocity: new THREE.Vector3().randomDirection().multiplyScalar(0.05),
        baseRadius: radius,
        size, 
        speed: Math.random() * 0.02 + 0.01,
      });
    }
    return temp;
  }, [count]);

  const pointerPosition = useRef(new THREE.Vector3());
  const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
  const raycaster = new THREE.Raycaster();
  const prevPointer = useRef(new THREE.Vector2(0,0));
  const center = new THREE.Vector3(0,0,0);

  useFrame((state, delta) => {
    raycaster.setFromCamera(state.pointer, camera);
    raycaster.ray.intersectPlane(plane, pointerPosition.current);

    const mouseVelocity = new THREE.Vector2(state.pointer.x - prevPointer.current.x, state.pointer.y - prevPointer.current.y).length();
    prevPointer.current.copy(state.pointer);

    // Audio Doppler Effect
    const pitchMultiplier = Math.min(mouseVelocity * 10, 1.0);
    audioEngine.setDronePitch(pitchMultiplier);

    if (meshRef.current) {
      const time = state.clock.elapsedTime;

      particles.forEach((particle, i) => {
        // 1. Swarm Attraction to Orbit
        const dirToCenter = center.clone().sub(particle.position).normalize();
        
        // Use squared distance for performance
        const distSqToCenter = particle.position.distanceToSquared(center);
        const baseRadSq = particle.baseRadius * particle.baseRadius;
        
        // Tangent vector to create orbiting motion (cross product with up vector)
        const orbitDir = new THREE.Vector3(0, 1, 0).cross(dirToCenter).normalize();
        
        // Add some noise to the orbit
        const noiseDir = new THREE.Vector3(
          Math.sin(time + i),
          Math.cos(time * 0.8 + i),
          Math.sin(time * 1.2 + i)
        ).multiplyScalar(0.5);

        // Combine orbital forces
        const swarmForce = orbitDir.add(noiseDir).normalize().multiplyScalar(particle.speed);
        
        // Pull back to base radius if it wanders too far (use squared comparisons)
        if (distSqToCenter > baseRadSq * 1.5) particle.velocity.add(dirToCenter.multiplyScalar(0.02));
        if (distSqToCenter < baseRadSq * 0.5) particle.velocity.sub(dirToCenter.multiplyScalar(0.02));

        // 2. Mouse Repulsion (Shockwave)
        const distSqToMouse = particle.position.distanceToSquared(pointerPosition.current);
        const radiusSq = 16.0; // 4.0 squared
        if (distSqToMouse < radiusSq) {
          const distToMouse = Math.sqrt(distSqToMouse);
          const force = (1.0 - distToMouse / 4.0) * (mouseVelocity * 30 + 0.1);
          const repulseDir = particle.position.clone().sub(pointerPosition.current).normalize();
          particle.velocity.add(repulseDir.multiplyScalar(force));
        }

        // Apply forces
        particle.velocity.add(swarmForce.multiplyScalar(0.1));
        particle.velocity.clampLength(0, 0.5); // Max speed limit
        particle.position.add(particle.velocity);
        
        // Friction
        particle.velocity.multiplyScalar(0.95);

        dummy.position.copy(particle.position);
        dummy.scale.set(particle.size, particle.size, particle.size);
        dummy.updateMatrix();
        meshRef.current!.setMatrixAt(i, dummy.matrix);
      });
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#00E5FF" transparent opacity={0.5} />
    </instancedMesh>
  );
}
