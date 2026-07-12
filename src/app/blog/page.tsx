import Navbar from "@/components/navbar/Navbar";

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#050506] text-white overflow-y-auto">
      <Navbar />
      <main className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[80vh] text-center">
        <span className="text-white font-mono text-xs tracking-widest uppercase border border-white/30 px-3 py-1 rounded-full bg-white/10 mb-8">
          Blog & Insights
        </span>
        <h1 className="text-5xl md:text-7xl font-bebas tracking-wide leading-[0.9]">
          Industry <br /><span className="text-[#FF4B4B]">Insights</span>
        </h1>
        <p className="mt-8 text-xl font-sans font-light text-white/70 max-w-2xl leading-relaxed">
          The latest thoughts, product updates, and deep dives into the future of measurement from the SYNC team.
        </p>
      </main>
    </div>
  );
}
