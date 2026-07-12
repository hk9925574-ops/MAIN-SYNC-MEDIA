"use client";

import { useEffect, useRef, useState } from "react";

export default function QuantumCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const requestRef = useRef<number>(undefined);
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });

  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      
      // Update small dot instantly
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    };

    // Check if hovering over clickable elements
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName.toLowerCase() === 'button' || target.closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", onMouseOver);

    const update = () => {
      // Lerp the ring towards the mouse
      ring.current.x += (mouse.current.x - ring.current.x) * 0.15;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.15;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%, -50%)`;
      }
      
      requestRef.current = requestAnimationFrame(update);
    };
    
    requestRef.current = requestAnimationFrame(update);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <>
      {/* Outer Spring Ring */}
      <div 
        ref={ringRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border transition-all duration-300 ease-out ${
          isHovering 
            ? 'w-12 h-12 border-[#D2FF00] bg-[#D2FF00]/10 backdrop-blur-sm scale-125' 
            : 'w-6 h-6 border-[#3FE0FF]/50 scale-100'
        }`}
        style={{ willChange: 'transform' }}
      />
      {/* Inner Precision Dot */}
      <div 
        ref={cursorRef}
        className={`fixed top-0 left-0 pointer-events-none z-[10000] rounded-full bg-white transition-all duration-300 ${
          isHovering ? 'w-1 h-1 bg-[#D2FF00] opacity-100' : 'w-1 h-1 opacity-100'
        }`}
        style={{ 
          willChange: 'transform', 
          boxShadow: isHovering ? '0 0 10px 2px rgba(210,255,0,0.5)' : '0 0 10px 2px rgba(63,224,255,0.3)' 
        }}
      />
    </>
  );
}
