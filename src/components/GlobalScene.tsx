"use client";

import { Suspense, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, PerformanceMonitor, Html, useProgress } from "@react-three/drei";
import { EffectComposer, Bloom, ChromaticAberration } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";
import { COLORS } from "@/lib/colors";

// Components
import EngineCore from "./scenes/EngineCore";
import WipeTransition from "./effects/WipeTransition";
import WarpStreaks from "./effects/WarpStreaks";
import DataStreams from "./worlds/DataStreams";
import AIChip from "./worlds/AIChip";
import SyncOrb from "./worlds/SyncOrb";
import CloudNode from "./worlds/CloudNode";
import OrbitingMedia from "./worlds/OrbitingMedia";
import Outcomes from "./worlds/Outcomes";
import Aperture from "./worlds/Aperture";

import { useTransitionManager, SCENES } from "@/store/TransitionManager";

const sceneContent = [
  { title1: "The Signal", title2: "Originates.", color: "#D2FF00", desc: "A single point of truth in the noise.", btn: "Trace Data", action: "next" },
  { title1: "Data", title2: "Formation.", color: "#3FE0FF", desc: "Raw energy structures itself into coherent streams. Intelligence emerges from the noise.", btn: "Classify Streams", action: "next" },
  { title1: "Media", title2: "Intelligence.", color: "#D2FF00", desc: "Algorithms analyze and categorize media packets instantly across Linear TV, OTT, YouTube, Meta, and Digital.", btn: "Synchronize", action: "next" },
  { title1: "Global", title2: "Synchronization.", color: "#D2FF00", desc: "Duplicate identities collapse into a single confirmed reach. Cross-media matching becomes exact.", btn: "Distribute", action: "next" },
  { title1: "Cloud", title2: "Distribution.", color: "#3FE0FF", desc: "Validated data flows through the infrastructure.", btn: "Deliver", action: "next" },
  { title1: "Worldwide", title2: "Delivery.", color: "#D2FF00", desc: "The data lands on real screens. Verified and ready.", btn: "Track Outcomes", action: "next" },
  { title1: "Real", title2: "Outcomes.", color: "#FF4B4B", desc: "Connecting ad exposure directly to business results: search, commerce, and app behavior.", btn: "Look Forward", action: "next" },
  { title1: "Future", title2: "Vision.", color: "white", desc: "Looking forward. The aperture widens to what comes next.", btn: "Enter the System", action: "loop" }
];

// PREMIUM PRELOADER
function CustomLoader() {
  const { progress } = useProgress();
  return (
    <Html center zIndexRange={[100, 0]}>
      <div className="flex flex-col items-center justify-center pointer-events-none">
        <div className="text-[#3FE0FF] font-mono text-sm tracking-[0.3em] mb-4">
          INITIALIZING_ENGINE
        </div>
        <div className="w-64 h-px bg-white/10 relative overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-[#3FE0FF] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-4 text-white/50 text-[10px] font-mono tracking-widest">
          {progress.toFixed(0)}%
        </div>
      </div>
    </Html>
  );
}

// INVESTOR OVERDRIVE: Clean, premium, enterprise metrics
function InvestorMetricsHUD() {
  const { currentSceneIndex } = useTransitionManager();

  // Dynamic metrics per scene
  const getMetrics = () => {
    switch (currentSceneIndex) {
      case 0:
        return [
          { label: "SIGNAL ORIGIN", value: "DETECTED" },
          { label: "LATENCY", value: "< 2ms" }
        ];
      case 1:
        return [
          { label: "DATA PACKETS", value: "STRUCTURING" },
          { label: "THROUGHPUT", value: "1.2 TB/s" }
        ];
      case 2:
        return [
          { label: "CLASSIFYING", value: "ACTIVE" },
          { label: "CHANNELS", value: "5 CONFIRMED" }
        ];
      case 3:
        return [
          { label: "DUPLICATES", value: "COLLAPSING" },
          { label: "IDENTITY", value: "SYNCED" }
        ];
      case 4:
        return [
          { label: "DISTRIBUTION", value: "ROUTING" },
          { label: "NODE MESH", value: "OPTIMIZED" }
        ];
      case 5:
        return [
          { label: "DELIVERY", value: "CONFIRMED" },
          { label: "ENDPOINTS", value: "REACHED" }
        ];
      case 6:
        return [
          { label: "REAL-WORLD ACTION", value: "REGISTERED" },
          { label: "OUTCOME", value: "VERIFIED" }
        ];
      case 7:
        return [
          { label: "SYSTEM STATUS", value: "EXPANDING" },
          { label: "HORIZON", value: "OPEN" }
        ];
      default:
        return [
          { label: "GLOBAL UPTIME", value: "99.999%" }
        ];
    }
  };

  const metrics = getMetrics();

  return (
    <div className="absolute bottom-24 right-8 text-right opacity-80 pointer-events-none hidden md:block">
      <div className="flex flex-col gap-4">
        {metrics.map((m, i) => (
          <div key={i} className="flex flex-col items-end">
            <span className="text-[9px] text-white/50 tracking-[0.2em]">{m.label}</span>
            <span className="text-sm font-light tracking-wider text-white mix-blend-plus-lighter">{m.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DynamicAberration() {
  const { transitionProgress } = useTransitionManager();
  
  // Create a violent glitch effect that peaks in the middle of the transition (progress = 0.5)
  // When progress is 0.5, offset is maximum
  const intensity = Math.sin(transitionProgress * Math.PI) * 0.05; 
  
  return (
    <ChromaticAberration
      blendFunction={BlendFunction.NORMAL}
      offset={new THREE.Vector2(intensity, intensity)}
    />
  );
}

function CameraController() {
  const { currentSceneIndex, transitionProgress } = useTransitionManager();
  
  useFrame((state, delta) => {
    // Camera spline logic based on scene index
    let targetPos = new THREE.Vector3();
    if (currentSceneIndex === 0) targetPos.set(0, 1, 4); // Birth of Signal
    else if (currentSceneIndex === 1) targetPos.set(0, 0, 5); // Data Formation
    else if (currentSceneIndex === 2) targetPos.set(0, 1, 6); // Media Intelligence
    else if (currentSceneIndex === 3) targetPos.set(0, 0, 5); // Global Synchronization
    else if (currentSceneIndex === 4) targetPos.set(0, 2, 7); // Cloud Distribution
    else if (currentSceneIndex === 5) targetPos.set(0, 0, 5); // Worldwide Delivery
    else if (currentSceneIndex === 6) targetPos.set(0, 0, 5); // Outcomes
    else if (currentSceneIndex === 7) {
      targetPos.set(0, 0, 2 - (transitionProgress * 3.0)); // Future Vision push-through
    }

    // Base lerp
    state.camera.position.lerp(targetPos, 0.05);
    
    // Camera Earthquake Recoil during transition
    if (transitionProgress > 0) {
      const intensity = Math.sin(transitionProgress * Math.PI) * 0.2;
      const time = state.clock.elapsedTime * 50.0;
      state.camera.position.x += (Math.sin(time) * intensity);
      state.camera.position.y += (Math.cos(time * 1.3) * intensity);
      state.camera.position.z += (Math.sin(time * 0.8) * intensity);
    }
    
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

import Magnetic from "@/components/effects/Magnetic";

export default function GlobalScene() {
  const { currentSceneIndex, goToNextScene, goToPrevScene, loopToBeginning, isTransitioning } = useTransitionManager();

  // Scroll logic removed for standard page scrolling
  useEffect(() => {
    // We now rely on standard page scrolling. 
    // The user can use the buttons to cycle through the 3D scenes.
  }, []);

  return (
    <div className="relative w-full h-screen bg-[#050506]">
      <div className="absolute inset-0 w-full h-full z-0">
        <Canvas
          shadows
          dpr={[1, 1.5]}
          camera={{ position: [0, 1, 8], fov: 45, near: 0.1, far: 50 }}
          gl={{ toneMapping: THREE.ACESFilmicToneMapping, powerPreference: "high-performance" }}
        >
          <PerformanceMonitor onChange={() => {}} />

          <color attach="background" args={[COLORS.voidBlack]} />
          <fogExp2 attach="fog" args={[COLORS.voidBlack, 0.02]} />

          <ambientLight intensity={0.2} />

          <Suspense fallback={<CustomLoader />}>
            <Environment preset="studio" environmentIntensity={0.8} />
          </Suspense>

          <Suspense fallback={<CustomLoader />}>
            {/* SCENE CONDITIONAL RENDERS */}
            {currentSceneIndex === 0 && <EngineCore />}
            {currentSceneIndex === 1 && <DataStreams />}
            {currentSceneIndex === 2 && <AIChip />}
            {currentSceneIndex === 3 && <SyncOrb />}
            {currentSceneIndex === 4 && <CloudNode />}
            {currentSceneIndex === 5 && <OrbitingMedia />}
            {currentSceneIndex === 6 && <Outcomes />}
            {currentSceneIndex === 7 && <Aperture />}

            {/* Note: ReactiveParticles removed for visual clarity (No decorative background particles) */}
            <WarpStreaks count={100} />
            <CameraController />
            <WipeTransition />

            {/* Post Processing */}
            <EffectComposer>
              <Bloom luminanceThreshold={0.7} mipmapBlur intensity={0.4} />
              <DynamicAberration />
            </EffectComposer>
          </Suspense>
        </Canvas>
      </div>

      {/* Gradient fade to seamlessly blend with the next section */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#050506] to-transparent z-20 pointer-events-none"></div>

      {/* HTML OVERLAY */}
      <div className="relative z-10 w-full h-screen pointer-events-none flex flex-col justify-between p-8 pt-32">
        
        <InvestorMetricsHUD />

        <main className="max-w-2xl mt-auto mb-32 pointer-events-auto relative h-64">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSceneIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bottom-0 left-0 space-y-6"
            >
              <h2 className="text-5xl md:text-7xl font-bebas text-white tracking-wide leading-[0.9]">
                {sceneContent[currentSceneIndex].title1} <br/>
                <span style={{ color: sceneContent[currentSceneIndex].color }}>
                  {sceneContent[currentSceneIndex].title2}
                </span>
              </h2>
              <p className="text-white/70 text-lg max-w-md font-sans font-light leading-relaxed">
                {sceneContent[currentSceneIndex].desc}
              </p>
              <div className="pt-2">
                <Magnetic strength={0.2}>
                  <button 
                    onClick={sceneContent[currentSceneIndex].action === "next" ? goToNextScene : loopToBeginning} 
                    className="btn-scene group hover-trigger"
                    style={{ color: sceneContent[currentSceneIndex].color, borderColor: sceneContent[currentSceneIndex].color }}
                  >
                    <span className="relative z-10">{sceneContent[currentSceneIndex].btn}</span>
                    <div className="absolute inset-0 bg-current opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                  </button>
                </Magnetic>
              </div>
            </motion.div>
          </AnimatePresence>
        </main>

        <footer className="flex justify-between items-end w-full">
          <div className="flex gap-2">
            {SCENES.map((scene, idx) => (
              <div 
                key={idx}
                className={`h-1 rounded-full transition-all duration-500 ${
                  idx === currentSceneIndex ? 'w-8 bg-white' : 'w-2 bg-white/20'
                }`}
              />
            ))}
          </div>
          <div className="flex gap-4">
             <button onClick={goToPrevScene} className="text-xs text-white/50 tracking-widest hover:text-white pointer-events-auto">PREV</button>
             <p className="text-xs text-white/30 tracking-widest">SECURE CONNECTION</p>
          </div>
        </footer>
      </div>

      <style>{`
        .btn-scene {
          margin-top: 2rem;
          padding: 0.75rem 1.5rem;
          border: 1px solid currentColor;
          border-radius: 9999px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-size: 0.875rem;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          background: transparent;
        }
        .btn-scene:hover {
          background: currentColor;
          color: #050506;
          box-shadow: 0 0 20px currentColor;
        }
      `}</style>
    </div>
  );
}
