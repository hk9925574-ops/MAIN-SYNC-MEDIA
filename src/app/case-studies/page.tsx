"use client";

import Navbar from "@/components/navbar/Navbar";
import { motion } from "framer-motion";

export default function CaseStudiesPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
  };

  const cases = [
    {
      brand: "Global Automaker",
      category: "Cross-Media Reach",
      title: "Eliminating 30% Media Waste Across Linear & CTV",
      stat1: "+42%",
      stat1Label: "Incremental Reach",
      stat2: "-$1.2M",
      stat2Label: "Saved in Frequency Waste",
      desc: "By deploying SYNC's identity kernel, the brand realized they were hitting the same households 14x per week across Linear and CTV. Reallocating that budget drove a 42% lift in unique net-new households.",
      color: "#3FE0FF"
    },
    {
      brand: "Top 3 Streaming Service",
      category: "Outcome Attribution",
      title: "Connecting TV Ads Directly To App Subscriptions",
      stat1: "2.4x",
      stat1Label: "ROAS vs Baseline",
      stat2: "18%",
      stat2Label: "Lift in Sign-ups",
      desc: "The streaming giant needed to prove that their expensive Linear TV buys were driving actual app installs. SYNC matched ad logs directly to mobile app behaviors, proving a massive 2.4x return on ad spend within 72 hours of airing.",
      color: "#D2FF00"
    },
    {
      brand: "Tier-1 FMCG Conglomerate",
      category: "Media Optimisation",
      title: "Real-Time Budget Shifting During Live Sports",
      stat1: "15ms",
      stat1Label: "Decision Latency",
      stat2: "-22%",
      stat2Label: "Cost Per Acquisition",
      desc: "During the championship finals, the brand used SYNC's real-time API to shift budget from saturated broadcast feeds into highly targeted OTT inventory, dropping CPA by 22% while the game was still being played.",
      color: "#FF4B4B"
    }
  ];

  return (
    <div className="min-h-screen bg-[#050506] text-white overflow-x-hidden selection:bg-[#D2FF00]/30 selection:text-[#D2FF00]">
      <Navbar />
      
      <main className="pt-40 pb-32 px-6 md:px-12 max-w-7xl mx-auto">
        <motion.header 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-32 text-center"
        >
          <span className="text-[#D2FF00] font-mono text-xs tracking-widest uppercase border border-[#D2FF00]/30 px-3 py-1 rounded-full bg-[#D2FF00]/10 mb-8 inline-block">
            Case Studies
          </span>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bebas tracking-wide leading-[0.9] mt-6">
            Proven <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D2FF00] to-[#3FE0FF]">Impact</span>
          </h1>
          <p className="mt-10 text-xl md:text-2xl font-sans font-light text-white/60 max-w-3xl mx-auto leading-relaxed">
            See how leading brands, agencies, and networks are using SYNC to transform their cross-media strategies and eliminate billions in wasted spend.
          </p>
        </motion.header>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 gap-12"
        >
          {cases.map((study, index) => (
            <motion.article 
              key={index}
              variants={itemVariants}
              className="relative group rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden flex flex-col lg:flex-row hover:border-white/20 transition-all duration-500"
            >
              <div 
                className="absolute -inset-10 blur-[100px] opacity-0 group-hover:opacity-10 transition-opacity duration-1000 z-0"
                style={{ backgroundColor: study.color }}
              ></div>

              <div className="p-8 md:p-12 lg:w-2/3 relative z-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 mb-8">
                    <span 
                      className="font-mono text-xs tracking-widest uppercase px-3 py-1 rounded-full bg-white/5 border border-white/10"
                      style={{ color: study.color }}
                    >
                      {study.category}
                    </span>
                    <span className="font-mono text-xs text-white/50">{study.brand}</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bebas tracking-wide mb-6">{study.title}</h2>
                  <p className="font-sans font-light text-white/70 text-lg leading-relaxed max-w-2xl">
                    {study.desc}
                  </p>
                </div>
                
                <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap gap-12">
                  <div>
                    <div className="text-4xl font-bebas mb-1" style={{ color: study.color }}>{study.stat1}</div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-white/50">{study.stat1Label}</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bebas mb-1" style={{ color: study.color }}>{study.stat2}</div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-white/50">{study.stat2Label}</div>
                  </div>
                </div>
              </div>

              {/* Aesthetic Graphic Side */}
              <div className="lg:w-1/3 bg-[#050506]/50 min-h-[300px] border-t lg:border-t-0 lg:border-l border-white/10 relative overflow-hidden flex items-center justify-center p-8">
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/80 z-0"></div>
                <div className="relative z-10 w-full h-full flex flex-col gap-2 opacity-50 group-hover:opacity-100 transition-opacity duration-700 justify-center">
                  {/* Abstract bars representing stats */}
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full rounded-full" 
                      style={{ backgroundColor: study.color }}
                      initial={{ width: "10%" }}
                      whileInView={{ width: "85%" }}
                      transition={{ duration: 1.5, delay: 0.2, type: "spring" }}
                    />
                  </div>
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full rounded-full" 
                      style={{ backgroundColor: study.color }}
                      initial={{ width: "10%" }}
                      whileInView={{ width: "45%" }}
                      transition={{ duration: 1.5, delay: 0.4, type: "spring" }}
                    />
                  </div>
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full rounded-full" 
                      style={{ backgroundColor: study.color }}
                      initial={{ width: "10%" }}
                      whileInView={{ width: "95%" }}
                      transition={{ duration: 1.5, delay: 0.6, type: "spring" }}
                    />
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </main>
    </div>
  );
}
