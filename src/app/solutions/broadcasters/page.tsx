import Navbar from "@/components/navbar/Navbar";

export default function BroadcastersSolutionPage() {
  return (
    <div className="min-h-screen bg-[#050506] text-white overflow-y-auto">
      <Navbar />
      <main className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[80vh] text-center">
        <span className="text-[#FF4B4B] font-mono text-xs tracking-widest uppercase border border-[#FF4B4B]/30 px-3 py-1 rounded-full bg-[#FF4B4B]/10 mb-8">
          For Broadcasters
        </span>
        <h1 className="text-5xl md:text-7xl font-bebas tracking-wide leading-[0.9]">
          Prove Real <br /><span className="text-[#FF4B4B]">Inventory Value</span>
        </h1>
        <p className="mt-8 text-xl font-sans font-light text-white/70 max-w-2xl leading-relaxed">
          Show advertisers exactly how your premium linear and OTT inventory drives incremental reach and hard business outcomes over digital alternatives.
        </p>
      </main>
    </div>
  );
}
