"use client";

import { motion } from "framer-motion";

export default function SolutionsOverview() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 }
    }
  };

  const itemLeftVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
  };

  const itemRightVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
  };

  return (
    <section id="solutions" className="relative w-full min-h-screen bg-[#050506] text-white py-32 px-6 md:px-12 border-t border-white/5 overflow-hidden">
      <motion.div 
        className="max-w-7xl mx-auto relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.header variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { type: "spring" } } }} className="mb-24 text-center flex flex-col items-center">
          <span className="text-[#D2FF00] font-mono text-xs tracking-widest uppercase border border-[#D2FF00]/30 px-3 py-1 rounded-full bg-[#D2FF00]/10">
            Tailored Solutions
          </span>
          <h2 className="text-6xl md:text-8xl font-bebas tracking-wide leading-[0.9] mt-8">
            Built For <br />
            <span className="text-white">Modern Advertising</span>
          </h2>
          <p className="mt-8 text-xl font-sans font-light text-white/70 max-w-2xl leading-relaxed">
            Whether you are an advertiser, agency, or broadcaster, SYNC provides one honest view of audiences and business impact.
          </p>
        </motion.header>

        <div className="flex flex-col gap-12">
          
          <motion.div variants={itemLeftVariants} className="relative group overflow-hidden border border-white/10 rounded-3xl bg-white/5 backdrop-blur-sm flex flex-col md:flex-row items-center hover:border-[#3FE0FF]/50 transition-colors duration-500">
            <div className="p-12 md:p-16 flex-1 relative z-10">
              <span className="text-[#3FE0FF] font-mono text-xs tracking-widest mb-6 block">01 / ADVERTISERS</span>
              <h3 className="text-4xl md:text-6xl font-bebas text-white mb-6 leading-none">Understand True <br/><span className="text-[#3FE0FF]">Media Delivery</span></h3>
              <p className="font-sans font-light text-white/70 leading-relaxed text-lg mb-8 max-w-md">
                Stop relying on siloed platform reports. See exactly what your media is delivering across all screens, deduplicate your reach, and connect every dollar spent to real-world outcomes.
              </p>
            </div>
            <div className="flex-1 w-full h-64 md:h-full relative overflow-hidden bg-[#0a0f18] flex items-center justify-center border-l border-white/10">
              <div className="absolute inset-0 bg-[#3FE0FF]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="w-48 h-48 rounded-full border border-[#3FE0FF]/30 animate-[spin_10s_linear_infinite] flex items-center justify-center">
                <div className="w-32 h-32 rounded-full border border-[#3FE0FF]/50 animate-[spin_6s_linear_infinite_reverse]"></div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemRightVariants} className="relative group overflow-hidden border border-white/10 rounded-3xl bg-white/5 backdrop-blur-sm flex flex-col md:flex-row-reverse items-center hover:border-[#D2FF00]/50 transition-colors duration-500">
            <div className="p-12 md:p-16 flex-1 relative z-10">
              <span className="text-[#D2FF00] font-mono text-xs tracking-widest mb-6 block">02 / AGENCIES</span>
              <h3 className="text-4xl md:text-6xl font-bebas text-white mb-6 leading-none">Plan Smarter, <br/><span className="text-[#D2FF00]">Defend Recommendations</span></h3>
              <p className="font-sans font-light text-white/70 leading-relaxed text-lg mb-8 max-w-md">
                Arm your planning teams with single-source truth. Build accurate frequency models, analyze audience overlap, and prove the incremental value of your strategies to clients.
              </p>
            </div>
            <div className="flex-1 w-full h-64 md:h-full relative overflow-hidden bg-[#0a1005] flex items-center justify-center border-r border-white/10">
              <div className="absolute inset-0 bg-[#D2FF00]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="w-full h-full flex flex-col justify-center px-12 gap-2 opacity-50">
                <div className="w-full h-px bg-[#D2FF00]/50"></div>
                <div className="w-3/4 h-px bg-[#D2FF00]/50"></div>
                <div className="w-5/6 h-px bg-[#D2FF00]/50"></div>
                <div className="w-1/2 h-px bg-[#D2FF00]/50"></div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemLeftVariants} className="relative group overflow-hidden border border-white/10 rounded-3xl bg-white/5 backdrop-blur-sm flex flex-col md:flex-row items-center hover:border-[#FF4B4B]/50 transition-colors duration-500">
            <div className="p-12 md:p-16 flex-1 relative z-10">
              <span className="text-[#FF4B4B] font-mono text-xs tracking-widest mb-6 block">03 / BROADCASTERS</span>
              <h3 className="text-4xl md:text-6xl font-bebas text-white mb-6 leading-none">Prove Real <br/><span className="text-[#FF4B4B]">Inventory Value</span></h3>
              <p className="font-sans font-light text-white/70 leading-relaxed text-lg mb-8 max-w-md">
                Show advertisers exactly how your premium linear and OTT inventory drives incremental reach and hard business outcomes over digital alternatives.
              </p>
            </div>
            <div className="flex-1 w-full h-64 md:h-full relative overflow-hidden bg-[#140505] flex items-center justify-center border-l border-white/10">
              <div className="absolute inset-0 bg-[#FF4B4B]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="grid grid-cols-4 gap-2 opacity-50 w-32 h-32">
                {Array.from({length: 16}).map((_, i) => (
                  <motion.div 
                    key={i} 
                    className={`bg-[#FF4B4B] ${i % 3 === 0 ? 'opacity-100' : 'opacity-20'}`}
                    animate={{ scale: [1, 1.2, 1], opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
                  />
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}
