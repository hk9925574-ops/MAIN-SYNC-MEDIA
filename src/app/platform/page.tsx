import Navbar from "@/components/navbar/Navbar";

export default function PlatformPage() {
  return (
    <div className="min-h-screen bg-[#050506] text-white overflow-y-auto">
      <Navbar />
      
      <main className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        <header className="mb-24 mt-12">
          <span className="text-[#3FE0FF] font-mono text-xs tracking-widest uppercase border border-[#3FE0FF]/30 px-3 py-1 rounded-full bg-[#3FE0FF]/10">
            Platform Capabilities
          </span>
          <h1 className="text-6xl md:text-8xl font-bebas tracking-wide leading-[0.9] mt-8">
            Single-Source <br />
            <span className="text-[#D2FF00]">Cross-Media Measurement</span>
          </h1>
          <p className="mt-8 text-xl font-sans font-light text-white/70 max-w-2xl leading-relaxed">
            SYNC measures the same people across linear TV, OTT, YouTube, Meta and digital.
            We de-duplicate reach and frequency, then connect exposure to real business outcomes.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
          
          <section className="group relative">
            <div className="absolute -inset-4 bg-[#D2FF00]/5 blur-2xl rounded-3xl opacity-0 group-hover:opacity-100 transition duration-700"></div>
            <div className="relative border border-white/10 bg-white/5 p-8 rounded-3xl backdrop-blur-sm h-full flex flex-col">
              <h2 className="text-4xl font-bebas text-white mb-4">Deduplicated <br/><span className="text-[#D2FF00]">Reach</span></h2>
              <p className="font-sans font-light text-white/60 leading-relaxed">
                Understand exactly who you are reaching across screens. Stop paying to reach the same user on five different platforms. Our engine collapses multiple identities into a single confirmed view.
              </p>
              <div className="mt-auto pt-8 border-t border-white/10">
                <ul className="space-y-3 font-mono text-xs text-white/50 tracking-wider">
                  <li>+ LINEAR TV</li>
                  <li>+ OTT / CTV</li>
                  <li>+ YOUTUBE</li>
                  <li>+ META</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="group relative">
            <div className="absolute -inset-4 bg-[#3FE0FF]/5 blur-2xl rounded-3xl opacity-0 group-hover:opacity-100 transition duration-700"></div>
            <div className="relative border border-white/10 bg-white/5 p-8 rounded-3xl backdrop-blur-sm h-full flex flex-col">
              <h2 className="text-4xl font-bebas text-white mb-4">Outcomes <br/><span className="text-[#3FE0FF]">Measurement</span></h2>
              <p className="font-sans font-light text-white/60 leading-relaxed">
                Connect ad exposure directly to business results. Track search volume lift, commerce conversions, and app behavior immediately after verified delivery.
              </p>
              <div className="mt-auto pt-8 border-t border-white/10">
                <ul className="space-y-3 font-mono text-xs text-white/50 tracking-wider">
                  <li>+ SEARCH LIFT</li>
                  <li>+ COMMERCE CONVERSIONS</li>
                  <li>+ APP BEHAVIOR</li>
                  <li>+ FOOT TRAFFIC</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="group relative md:col-span-2">
            <div className="absolute -inset-4 bg-[#FF4B4B]/5 blur-2xl rounded-3xl opacity-0 group-hover:opacity-100 transition duration-700"></div>
            <div className="relative border border-white/10 bg-white/5 p-8 md:p-12 rounded-3xl backdrop-blur-sm h-full flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1">
                <h2 className="text-4xl md:text-5xl font-bebas text-white mb-4">Media <br/><span className="text-[#FF4B4B]">Optimisation</span></h2>
                <p className="font-sans font-light text-white/60 leading-relaxed max-w-xl">
                  Analyze frequency build-up and saturation points. Allocate cross-media budgets in real-time based on incremental audience contribution by channel, rather than siloed reporting.
                </p>
              </div>
              <div className="flex-1 w-full bg-[#050506] border border-white/10 rounded-2xl p-6 h-48 relative overflow-hidden flex items-end">
                {/* Fake bar chart for aesthetic */}
                <div className="flex justify-between w-full h-full items-end gap-2">
                  {[40, 70, 45, 90, 60, 100, 30].map((h, i) => (
                    <div key={i} className="w-full bg-[#FF4B4B]/20 rounded-t-sm relative group-hover:bg-[#FF4B4B]/40 transition-all duration-500" style={{ height: `${h}%` }}>
                      <div className="absolute top-0 left-0 right-0 h-1 bg-[#FF4B4B]"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
