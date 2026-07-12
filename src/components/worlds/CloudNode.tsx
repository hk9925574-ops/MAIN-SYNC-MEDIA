"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { COLORS } from "@/lib/colors";
import { Edges } from "@react-three/drei";

export default function CloudNode() {
  const meshRef = useRef<THREE.Group>(null);
  
  // Generate a network mesh graph
  const { nodes, edges } = useMemo(() => {
    const n = [];
    const numNodes = 20;
    
    // Center node
    n.push(new THREE.Vector3(0, 0, 0));
    
    // Random nodes branching out
    for (let i = 1; i < numNodes; i++) {
      n.push(new THREE.Vector3(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 4
      ));
    }

    const e = [];
    // Connect nodes to center or nearest neighbor to form a tree/mesh
    for (let i = 1; i < numNodes; i++) {
      // Connect to a random previous node (preferring earlier ones to branch from center)
      const target = Math.floor(Math.random() * i);
      e.push([i, target]);
    }
    // Add some cross edges
    for (let i = 0; i < 5; i++) {
        const a = Math.floor(Math.random() * numNodes);
        const b = Math.floor(Math.random() * numNodes);
        if (a !== b) e.push([a, b]);
    }

    return { nodes: n, edges: e };
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (meshRef.current) {
        // Slow rotation of the whole mesh
        meshRef.current.rotation.y = time * 0.1;
        meshRef.current.rotation.x = Math.sin(time * 0.2) * 0.1;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Central Identity Point (carried from previous scene) */}
      <mesh position={[0, 0, 0]}>
        <circleGeometry args={[0.3, 32]} />
        <meshBasicMaterial color={COLORS.acidLime} />
      </mesh>

      {/* Network Mesh */}
      <group ref={meshRef}>
        {/* Edges */}
        {edges.map(([a, b], i) => {
            const start = nodes[a];
            const end = nodes[b];
            const points = [start, end];
            const lineGeom = new THREE.BufferGeometry().setFromPoints(points);
            
            return (
                <line key={`edge-${i}`}>
                    <primitive object={lineGeom} attach="geometry" />
                    <lineBasicMaterial color={COLORS.signalCyan} transparent opacity={0.3} />
                </line>
            );
        })}

        {/* Nodes */}
        {nodes.map((pos, i) => (
            i !== 0 && (
                <mesh key={`node-${i}`} position={pos}>
                    <boxGeometry args={[0.2, 0.2, 0.2]} />
                    <meshStandardMaterial color={COLORS.voidBlack} roughness={0.4} metalness={0.8} />
                    <Edges linewidth={1} threshold={15} color={COLORS.acidLime} opacity={0.6} transparent />
                </mesh>
            )
        ))}
      </group>
    </group>
  );
}
