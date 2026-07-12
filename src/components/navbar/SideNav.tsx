"use client";

import useActiveSceneIndex, { TOTAL_SCENES } from "@/components/effects/useActiveSceneIndex";

const SCENE_LABELS = [
  "Birth of Signal",
  "Data Formation",
  "Media Intelligence",
  "Global Synchronization",
  "Cloud Distribution",
  "Worldwide Delivery",
  "Real Outcomes",
  "Future Vision"
];

function scrollToScene(index: number) {
  // Must match the scroll-scoping in useActiveSceneIndex
  const maxScroll = window.innerHeight * (TOTAL_SCENES - 1);
  const fraction = index / (TOTAL_SCENES - 1);
  window.scrollTo({ top: fraction * maxScroll, behavior: "smooth" });
}

export default function SideNav() {
  const activeIndex = useActiveSceneIndex();

  return (
    <nav
      className="fixed right-6 top-1/2 z-50 hidden -translate-y-1/2 flex-col items-end gap-5 md:flex"
      aria-label="Scene navigation"
    >
      {Array.from({ length: TOTAL_SCENES }, (_, index) => {
        const isActive = index === activeIndex;
        const label = SCENE_LABELS[index] ?? `Scene ${index + 1}`;

        return (
          <button
            key={index}
            onClick={() => scrollToScene(index)}
            className="group flex items-center gap-4"
            aria-label={`Go to ${label}`}
            aria-current={isActive ? "true" : undefined}
          >
            <span
              className={`text-[10px] font-mono uppercase tracking-[0.2em] transition-all duration-300 ${
                isActive ? 'text-[#D2FF00]' : 'text-white/0 group-hover:text-white/50'
              }`}
            >
              {label}
            </span>
            <span
              className="block rounded-full transition-all duration-300"
              style={{
                width: isActive ? "8px" : "4px",
                height: isActive ? "8px" : "4px",
                background: isActive ? '#D2FF00' : 'rgba(255, 255, 255, 0.2)',
                boxShadow: isActive ? '0 0 10px 2px rgba(210, 255, 0, 0.4)' : "none",
              }}
            />
          </button>
        );
      })}
    </nav>
  );
}
