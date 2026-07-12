"use client";

import { useEffect, useRef, useState } from "react";

// Wraps a small per-card/per-row 3D scene so it only mounts (and starts its
// render loop) once it's actually near the viewport, and unmounts again
// once it scrolls well away. With six+ mini canvases now living in the
// Capabilities and Work sections, this keeps everything off the GPU until
// it's actually visible instead of running all of them at once.
export default function LazyCanvasMount({
  children,
  className,
  rootMargin = "200px",
}: {
  children: React.ReactNode;
  className?: string;
  rootMargin?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin, threshold: 0.01 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} className={className}>
      {visible ? children : null}
    </div>
  );
}
