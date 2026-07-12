import Navbar from "@/components/navbar/Navbar";

export default function ReportingDiagnosticsPage() {
  return (
    <div className="min-h-screen bg-[#050506] text-white overflow-y-auto">
      <Navbar />
      <main className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[80vh] text-center">
        <span className="text-[#A78BFA] font-mono text-xs tracking-widest uppercase border border-[#A78BFA]/30 px-3 py-1 rounded-full bg-[#A78BFA]/10 mb-8">
          Platform Feature
        </span>
        <h1 className="text-5xl md:text-7xl font-bebas tracking-wide leading-[0.9]">
          Reporting & <br /><span className="text-[#A78BFA]">Diagnostics</span>
        </h1>
        <p className="mt-8 text-xl font-sans font-light text-white/70 max-w-2xl leading-relaxed">
          Deep dive into the granular data. Powerful analytics and visualization tools that give you full transparency into campaign performance across all touchpoints.
        </p>
      </main>
    </div>
  );
}
