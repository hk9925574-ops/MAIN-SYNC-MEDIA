"use client";

export default function ScrollIndicator() {
  return (
    <a
      href="#services"
      className="pointer-events-auto mt-8 flex flex-col items-center transition hover:opacity-70"
    >
      <span className="mb-3 text-xs uppercase tracking-[0.4em] text-gray-500">
        Scroll
      </span>
      <div className="h-14 w-[2px] bg-gradient-to-b from-[#FF6A3D] to-transparent animate-pulse" />
    </a>
  );
}
