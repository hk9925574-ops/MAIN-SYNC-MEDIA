"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { theme } from "@/lib/theme";

export type IconKind = "video" | "photo" | "post" | "audio" | "ai" | "cloud";

type Props = {
  kind: IconKind;
  color: string;
  boost?: number;
};

function Spin({ children, speed = 0.4 }: { children: React.ReactNode; speed?: number }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * speed;
  });
  return <group ref={ref}>{children}</group>;
}

function FilmReel({ color, boost = 1 }: { color: string; boost?: number }) {
  const holes = Array.from({ length: 6 });
  return (
    <Spin speed={0.6 * boost}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.75, 0.14, 16, 48]} />
        <meshStandardMaterial color={theme.metal} metalness={0.8} roughness={0.35} />
      </mesh>
      {holes.map((_, i) => {
        const a = (i / holes.length) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(a) * 0.42, 0, Math.sin(a) * 0.42]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.13, 0.13, 0.1, 16]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} />
          </mesh>
        );
      })}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.12, 20]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} />
      </mesh>
    </Spin>
  );
}

function Camera({ color, boost = 1 }: { color: string; boost?: number }) {
  return (
    <Spin speed={0.35 * boost}>
      <mesh>
        <boxGeometry args={[1.1, 0.7, 0.5]} />
        <meshStandardMaterial color={theme.metal} metalness={0.7} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0, 0.35]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.32, 0.32, 0.35, 24]} />
        <meshStandardMaterial color={theme.metalDark} metalness={0.85} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0, 0.55]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.32, 0.045, 12, 32]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[-0.25, 0.42, 0]}>
        <boxGeometry args={[0.3, 0.16, 0.3]} />
        <meshStandardMaterial color={theme.metalDark} metalness={0.7} roughness={0.4} />
      </mesh>
    </Spin>
  );
}

function Clapperboard({ color, boost = 1 }: { color: string; boost?: number }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) ref.current.rotation.z = -0.15 + Math.sin(state.clock.elapsedTime * 1.4) * 0.12;
  });
  return (
    <Spin speed={0.3 * boost}>
      <mesh position={[0, -0.15, 0]}>
        <boxGeometry args={[1.1, 0.75, 0.08]} />
        <meshStandardMaterial color={theme.metal} metalness={0.5} roughness={0.5} />
      </mesh>
      {[-0.32, 0, 0.32].map((x, i) => (
        <mesh key={i} position={[x, 0.28, 0.01]} rotation={[0, 0, i % 2 === 0 ? 0.5 : -0.5]}>
          <boxGeometry args={[0.16, 0.4, 0.06]} />
          <meshStandardMaterial color={i % 2 === 0 ? color : "#F5EFE8"} emissive={i % 2 === 0 ? color : "#000000"} emissiveIntensity={0.4} />
        </mesh>
      ))}
      <group ref={ref} position={[0, 0.22, 0]}>
        <mesh position={[0, 0.05, 0]}>
          <boxGeometry args={[1.14, 0.22, 0.09]} />
          <meshStandardMaterial color={theme.metalDark} metalness={0.5} roughness={0.5} />
        </mesh>
      </group>
    </Spin>
  );
}

function Waveform({ color, boost = 1 }: { color: string; boost?: number }) {
  const bars = 12;
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.children.forEach((child, i) => {
      const t = state.clock.elapsedTime * 2 + i * 0.5;
      child.scale.y = 0.4 + Math.abs(Math.sin(t)) * 1.1;
    });
  });
  return (
    <Spin speed={0.25 * boost}>
      <group ref={ref}>
        {Array.from({ length: bars }).map((_, i) => {
          const a = (i / bars) * Math.PI * 2;
          return (
            <mesh key={i} position={[Math.cos(a) * 0.7, 0, Math.sin(a) * 0.7]}>
              <boxGeometry args={[0.08, 0.5, 0.08]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.55} />
            </mesh>
          );
        })}
      </group>
    </Spin>
  );
}

function AIChip({ color, boost = 1 }: { color: string; boost?: number }) {
  const lines = Array.from({ length: 4 });
  return (
    <Spin speed={0.45 * boost}>
      <mesh>
        <boxGeometry args={[0.85, 0.85, 0.14]} />
        <meshStandardMaterial color={theme.metal} metalness={0.6} roughness={0.4} />
      </mesh>
      {lines.map((_, i) => (
        <mesh key={`h-${i}`} position={[0, -0.32 + i * 0.21, 0.08]}>
          <boxGeometry args={[0.6, 0.03, 0.02]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} />
        </mesh>
      ))}
      <mesh rotation={[0, 0, Math.PI / 4]}>
        <torusGeometry args={[0.65, 0.02, 8, 32]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} />
      </mesh>
    </Spin>
  );
}

function CloudNetwork({ color, boost = 1 }: { color: string; boost?: number }) {
  const nodes = [
    [0.5, 0.25, 0],
    [-0.55, 0.15, 0.1],
    [0.1, -0.4, -0.2],
    [-0.15, 0.45, -0.3],
  ];
  return (
    <Spin speed={0.3 * boost}>
      <mesh>
        <sphereGeometry args={[0.42, 16, 16]} />
        <meshStandardMaterial color={theme.metal} metalness={0.3} roughness={0.6} />
      </mesh>
      {nodes.map((p, i) => (
        <group key={i}>
          <mesh position={p as [number, number, number]}>
            <sphereGeometry args={[0.09, 12, 12]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
          </mesh>
          <line>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                args={[new Float32Array([0, 0, 0, p[0], p[1], p[2]]), 3]}
              />
            </bufferGeometry>
            <lineBasicMaterial color={color} transparent opacity={0.4} />
          </line>
        </group>
      ))}
    </Spin>
  );
}

export default function CapabilityIcon3D({ kind, color, boost = 1 }: Props) {
  switch (kind) {
    case "video":
      return <FilmReel color={color} boost={boost} />;
    case "photo":
      return <Camera color={color} boost={boost} />;
    case "post":
      return <Clapperboard color={color} boost={boost} />;
    case "audio":
      return <Waveform color={color} boost={boost} />;
    case "ai":
      return <AIChip color={color} boost={boost} />;
    case "cloud":
      return <CloudNetwork color={color} boost={boost} />;
    default:
      return null;
  }
}
