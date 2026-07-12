import Navbar from "@/components/navbar/Navbar";

export default function AdvertisersSolutionPage() {
  return (
    <div className="min-h-screen bg-[#050506] text-white overflow-y-auto">
      <Navbar />
      <main className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[80vh] text-center">
        <span className="text-[#3FE0FF] font-mono text-xs tracking-widest uppercase border border-[#3FE0FF]/30 px-3 py-1 rounded-full bg-[#3FE0FF]/10 mb-8">
          For Advertisers
        </span>
        <h1 className="text-5xl md:text-7xl font-bebas tracking-wide leading-[0.9]">
          Understand True <br /><span className="text-[#3FE0FF]">Media Delivery</span>
        </h1>
        <p className="mt-8 text-xl font-sans font-light text-white/70 max-w-2xl leading-relaxed">
          Stop relying on siloed platform reports. See exactly what your media is delivering across all screens, deduplicate your reach, and connect every dollar spent to real-world outcomes.
        </p>
      </main>
    </div>
  );
}
