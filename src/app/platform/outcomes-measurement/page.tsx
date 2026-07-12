import Navbar from "@/components/navbar/Navbar";

export default function OutcomesMeasurementPage() {
  return (
    <div className="min-h-screen bg-[#050506] text-white overflow-y-auto">
      <Navbar />
      <main className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[80vh] text-center">
        <span className="text-[#D2FF00] font-mono text-xs tracking-widest uppercase border border-[#D2FF00]/30 px-3 py-1 rounded-full bg-[#D2FF00]/10 mb-8">
          Platform Feature
        </span>
        <h1 className="text-5xl md:text-7xl font-bebas tracking-wide leading-[0.9]">
          Outcomes <br /><span className="text-[#D2FF00]">Measurement</span>
        </h1>
        <p className="mt-8 text-xl font-sans font-light text-white/70 max-w-2xl leading-relaxed">
          Connect ad exposure directly to business results. Track search volume lift, commerce conversions, and app behavior immediately after verified delivery.
        </p>
      </main>
    </div>
  );
}
