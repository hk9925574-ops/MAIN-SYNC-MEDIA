"use client";

import { useEffect, useState } from "react";

export default function useStoryProgress() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const max = document.body.scrollHeight - window.innerHeight;

      const p = scrollY / max;

      if (p < 0.33) setIndex(0);
      else if (p < 0.66) setIndex(1);
      else setIndex(2);
    };

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return index;
}