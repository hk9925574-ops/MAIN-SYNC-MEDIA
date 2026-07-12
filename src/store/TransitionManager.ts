import { create } from 'zustand';
import * as THREE from 'three';
import gsap from 'gsap';
import { audioEngine } from '@/lib/AudioEngine';

export const SCENES = [
  'Birth of Signal',
  'Data Formation',
  'Media Intelligence',
  'Global Synchronization',
  'Cloud Distribution',
  'Worldwide Delivery',
  'Outcomes',
  'Future Vision'
];

interface TransitionState {
  currentSceneIndex: number;
  transitionProgress: number; // 0 to 1
  isTransitioning: boolean;
  cameraControlPoints: THREE.Vector3[];
  goToNextScene: () => void;
  goToPrevScene: () => void;
  loopToBeginning: () => void;
  setTransitionProgress: (progress: number) => void;
  setCameraControlPoints: (points: THREE.Vector3[]) => void;
}

export const useTransitionManager = create<TransitionState>((set, get) => ({
  currentSceneIndex: 0,
  transitionProgress: 0,
  isTransitioning: false,
  cameraControlPoints: [],

  goToNextScene: () => {
    const { currentSceneIndex, isTransitioning, setTransitionProgress } = get();
    if (isTransitioning || currentSceneIndex >= SCENES.length - 1) return;
    
    // Initialize/resume audio on first interaction
    audioEngine.init();
    const targetIndex = currentSceneIndex + 1;
    audioEngine.playTransitionSound(targetIndex);
    
    set({ isTransitioning: true });
    
    // Animate progress 0 -> 1 using GSAP
    let dummy = { p: 0 };
    gsap.to(dummy, {
      p: 1,
      duration: 2.0, // 2 second transition
      ease: "power2.inOut",
      onUpdate: () => setTransitionProgress(dummy.p),
      onComplete: () => {
        set({ isTransitioning: false, transitionProgress: 0 });
      }
    });

    // Swap the actual scene index exactly in the middle of the wipe (when progress is 0.5)
    setTimeout(() => {
      set({ currentSceneIndex: targetIndex });
    }, 1000);
  },

  goToPrevScene: () => {
    const { currentSceneIndex, isTransitioning, setTransitionProgress } = get();
    if (isTransitioning || currentSceneIndex <= 0) return;
    
    audioEngine.init();
    const targetIndex = currentSceneIndex - 1;
    audioEngine.playTransitionSound(targetIndex);
    
    set({ isTransitioning: true });
    
    let dummy = { p: 0 };
    gsap.to(dummy, {
      p: 1,
      duration: 2.0,
      ease: "power2.inOut",
      onUpdate: () => setTransitionProgress(dummy.p),
      onComplete: () => {
        set({ isTransitioning: false, transitionProgress: 0 });
      }
    });

    setTimeout(() => {
      set({ currentSceneIndex: targetIndex });
    }, 1000);
  },

  loopToBeginning: () => {
    const { isTransitioning, setTransitionProgress } = get();
    if (isTransitioning) return;
    
    audioEngine.init();
    audioEngine.playTransitionSound(0); // Resetting back to 0
    
    set({ isTransitioning: true });
    
    let dummy = { p: 0 };
    // A slightly faster, more aggressive wipe for the reset
    gsap.to(dummy, {
      p: 1,
      duration: 1.5,
      ease: "power4.inOut",
      onUpdate: () => setTransitionProgress(dummy.p),
      onComplete: () => {
        set({ isTransitioning: false, transitionProgress: 0 });
      }
    });

    setTimeout(() => {
      set({ currentSceneIndex: 0 }); // Reset back to Scene 1
    }, 750);
  },

  setTransitionProgress: (progress) => set({ transitionProgress: progress }),
  setCameraControlPoints: (points) => set({ cameraControlPoints: points }),
}));
