import Navbar from "@/components/navbar/Navbar";

export default function AgenciesSolutionPage() {
  return (
    <div className="min-h-screen bg-[#050506] text-white overflow-y-auto">
      <Navbar />
      <main className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[80vh] text-center">
        <span className="text-[#D2FF00] font-mono text-xs tracking-widest uppercase border border-[#D2FF00]/30 px-3 py-1 rounded-full bg-[#D2FF00]/10 mb-8">
          For Agencies
        </span>
        <h1 className="text-5xl md:text-7xl font-bebas tracking-wide leading-[0.9]">
          Plan Smarter, <br /><span className="text-[#D2FF00]">Defend Recommendations</span>
        </h1>
        <p className="mt-8 text-xl font-sans font-light text-white/70 max-w-2xl leading-relaxed">
          Arm your planning teams with single-source truth. Build accurate frequency models, analyze audience overlap, and prove the incremental value of your strategies to clients.
        </p>
      </main>
    </div>
  );
}
