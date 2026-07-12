

"use client";

export default function HeroButtons() {
  return (
    <div className="pointer-events-auto mt-4 flex justify-center gap-6">
      <button className="rounded-full bg-[#FF6A3D] px-8 py-4 font-semibold text-black transition duration-300 hover:scale-105 hover:bg-[#ff8a63]">
        Start Project
      </button>

      <button className="rounded-full border border-white/20 bg-white/5 px-8 py-4 font-semibold text-white backdrop-blur-xl transition duration-300 hover:border-[#FF6A3D] hover:bg-[#FF6A3D]/10">
        Watch Showreel
      </button>
    </div>
  );
}
