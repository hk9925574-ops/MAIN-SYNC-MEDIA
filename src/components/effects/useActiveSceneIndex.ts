"use client";

import { useEffect, useState } from "react";

// Must match the number of <SceneN /> entries in GlobalScene.tsx and the
// totalZ math in CameraRig.tsx (scenes sit at z = 0, -20, -40 ... -20*(N-1)).
export const TOTAL_SCENES = 9;

/**
 * Tracks which scene the camera is currently closest to, based on the same
 * scroll-offset math CameraRig uses to drive camera.position.z. This lets
 * GlobalScene mount only the scenes near the camera instead of all 9 at
 * once, without changing the camera path or visuals of the active scenes.
 *
 * State only updates when the *rounded* index actually changes, so this does
 * not cause a re-render on every scroll pixel - just at most 8 times for a
 * full scroll from top to bottom.
 */
export default function useActiveSceneIndex(): number {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let ticking = false;

    const computeIndex = () => {
      // Only the 9 scene sections (each ~100vh) drive the camera/index.
      // Sections after them (Work, Contact) must NOT stretch this fraction,
      // or the camera lags behind and the wrong scene shows under the text
      // for later sections (looks like pages overlapping).
      const maxScroll = window.innerHeight * (TOTAL_SCENES - 1);
      const offset = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      const rawIndex = offset * (TOTAL_SCENES - 1);
      const clamped = Math.min(TOTAL_SCENES - 1, Math.max(0, rawIndex));
      return Math.round(clamped);
    };

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const nextIndex = computeIndex();
        setActiveIndex((prev) => (prev === nextIndex ? prev : nextIndex));
        ticking = false;
      });
    };

    // Set correct index immediately (e.g. on refresh mid-scroll) instead of
    // waiting for the first scroll event.
    setActiveIndex(computeIndex());

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return activeIndex;
}
