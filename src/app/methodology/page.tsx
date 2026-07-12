"use client";

import Navbar from "@/components/navbar/Navbar";
import { motion } from "framer-motion";

export default function MethodologyPage() {
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

  const steps = [
    {
      id: "01",
      title: "Data Ingestion & Normalisation",
      desc: "We ingest raw exposure logs directly from premium publishers, DSPs, and walled gardens via secure clean rooms. Our proprietary engine normalizes billions of unstructured data points—from CTV impressions to social engagements—into a unified taxonomy within milliseconds.",
      color: "#3FE0FF"
    },
    {
      id: "02",
      title: "Identity Resolution Kernel",
      desc: "Moving beyond fragile third-party cookies, our deterministic graph relies on authenticated household IDs and device graphs. We collapse fragmented user journeys across multiple screens into a single, persistent identity profile without compromising user privacy.",
      color: "#D2FF00"
    },
    {
      id: "03",
      title: "Cross-Media Deduplication",
      desc: "Once identities are resolved, our overlap engine mathematically isolates incremental reach. We map out precise intersection points between Linear TV, OTT, and Digital to reveal the true, unduplicated audience size and exact frequency thresholds.",
      color: "#FF4B4B"
    },
    {
      id: "04",
      title: "Outcome Attribution Modeling",
      desc: "We don't just measure reach. By bridging our exposure graph with offline sales data, app installs, and search behaviors, our machine learning models calculate the marginal contribution of every single ad exposure to your final business outcomes.",
      color: "#A855F7"
    }
  ];

  return (
    <div className="min-h-screen bg-[#050506] text-white overflow-x-hidden selection:bg-[#3FE0FF]/30 selection:text-[#3FE0FF]">
      <Navbar />
      
      <main className="pt-40 pb-32 px-6 md:px-12 max-w-7xl mx-auto">
        <motion.header 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-32 text-center"
        >
          <span className="text-[#3FE0FF] font-mono text-xs tracking-widest uppercase border border-[#3FE0FF]/30 px-3 py-1 rounded-full bg-[#3FE0FF]/10 mb-8 inline-block">
            Core Architecture
          </span>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bebas tracking-wide leading-[0.9] mt-6">
            The Science Of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3FE0FF] to-[#D2FF00]">Absolute Truth</span>
          </h1>
          <p className="mt-10 text-xl md:text-2xl font-sans font-light text-white/60 max-w-3xl mx-auto leading-relaxed">
            We built our measurement engine from the ground up to process reality at scale. Zero estimates, zero panels. Just pure, deterministic data science.
          </p>
        </motion.header>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative"
        >
          {/* Central Line connecting the steps visually */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent -translate-x-1/2"></div>

          <div className="space-y-12 md:space-y-0 relative">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div 
                  key={step.id} 
                  variants={itemVariants}
                  className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} mb-16 md:mb-32 relative`}
                >
                  {/* Content Box */}
                  <div className="flex-1 w-full">
                    <div className="border border-white/10 bg-white/5 p-10 md:p-14 rounded-3xl backdrop-blur-sm relative group overflow-hidden transition-colors duration-500 hover:border-white/20">
                      <div 
                        className="absolute top-0 right-0 w-64 h-64 blur-[100px] rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-700"
                        style={{ backgroundColor: step.color }}
                      ></div>
                      <div className="relative z-10">
                        <span 
                          className="font-mono text-4xl mb-6 block opacity-50"
                          style={{ color: step.color }}
                        >{step.id}</span>
                        <h2 className="text-3xl md:text-4xl font-bebas tracking-wide mb-4">{step.title}</h2>
                        <p className="font-sans font-light text-white/60 text-lg leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  </div>

                  {/* Center Node */}
                  <div className="hidden md:flex flex-col items-center justify-center w-12 h-12 relative z-10 shrink-0">
                    <div className="w-4 h-4 rounded-full bg-[#050506] border-2 z-10" style={{ borderColor: step.color }}></div>
                    <div className="absolute inset-0 rounded-full animate-ping opacity-30" style={{ backgroundColor: step.color }}></div>
                  </div>

                  {/* Abstract Graphic Side */}
                  <div className="flex-1 w-full h-64 rounded-3xl bg-white/5 border border-white/5 flex items-center justify-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/50 z-0"></div>
                    {/* Fake Data Visualization */}
                    <div className="w-full h-full flex items-center justify-center gap-1 opacity-40 group-hover:opacity-100 transition-opacity duration-700">
                      {Array.from({ length: 12 }).map((_, i) => (
                        <motion.div 
                          key={i}
                          className="w-1 md:w-2 rounded-full"
                          style={{ backgroundColor: step.color }}
                          animate={{ height: ["20%", "80%", "20%"] }}
                          transition={{ duration: 2 + Math.random(), repeat: Infinity, delay: Math.random() * 2 }}
                        />
                      ))}
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </div>
        </motion.div>

      </main>
    </div>
  );
}
