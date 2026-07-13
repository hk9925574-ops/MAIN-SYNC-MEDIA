"use client";

import { motion } from "framer-motion";

export default function ContactSection() {
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

  return (
    <section id="contact" className="relative w-full min-h-screen bg-[#050506] text-white py-32 px-6 md:px-12 border-t border-white/5 overflow-hidden">
      <motion.div 
        className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        
        {/* Left Column - Information */}
        <motion.div variants={itemVariants} className="flex-1 mt-12 lg:mt-24">
          <span className="text-[#D2FF00] font-mono text-xs tracking-widest uppercase border border-[#D2FF00]/30 px-3 py-1 rounded-full bg-[#D2FF00]/10">
            Book a Demo
          </span>
          <h2 className="text-6xl md:text-8xl font-bebas tracking-wide leading-[0.9] mt-8">
            Experience <br />
            <span className="text-white/50">The Future Of</span><br />
            Measurement
          </h2>
          <p className="mt-8 text-xl font-sans font-light text-white/70 max-w-md leading-relaxed">
            See exactly how SYNC can deduplicate your reach and connect your media to real business outcomes. 
          </p>
          
          <div className="mt-16 space-y-8">
            <div>
              <h3 className="font-mono text-xs tracking-widest text-[#D2FF00] mb-2 uppercase">Headquarters</h3>
              <p className="font-sans font-light text-white/70">
                123 Innovation Drive<br />
                Tech District, NY 10001
              </p>
            </div>
            <div>
              <h3 className="font-mono text-xs tracking-widest text-[#D2FF00] mb-2 uppercase">Inquiries</h3>
              <p className="font-sans font-light text-white/70">
                hello@syncmedia.io<br />
                +1 (555) 123-4567
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right Column - Form */}
        <motion.div variants={itemVariants} className="flex-1 lg:mt-12">
          <div className="border border-white/10 bg-white/5 p-8 md:p-12 rounded-3xl backdrop-blur-sm relative overflow-hidden group hover:border-[#D2FF00]/50 transition-colors duration-500">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#D2FF00]/5 blur-3xl rounded-full group-hover:bg-[#D2FF00]/10 transition-colors duration-500"></div>
            
            <form className="relative z-10 flex flex-col gap-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="firstName" className="font-mono text-xs tracking-widest text-white/50 uppercase">First Name</label>
                  <input 
                    type="text" 
                    id="firstName" 
                    className="bg-[#050506] border border-white/10 rounded-lg p-4 font-sans font-light text-white focus:outline-none focus:border-[#D2FF00] focus:ring-1 focus:ring-[#D2FF00]/50 transition-all duration-300 hover:bg-white/5" 
                    placeholder="John" 
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="lastName" className="font-mono text-xs tracking-widest text-white/50 uppercase">Last Name</label>
                  <input 
                    type="text" 
                    id="lastName" 
                    className="bg-[#050506] border border-white/10 rounded-lg p-4 font-sans font-light text-white focus:outline-none focus:border-[#D2FF00] focus:ring-1 focus:ring-[#D2FF00]/50 transition-all duration-300 hover:bg-white/5" 
                    placeholder="Doe" 
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="font-mono text-xs tracking-widest text-white/50 uppercase">Work Email</label>
                <input 
                  type="email" 
                  id="email" 
                  className="bg-[#050506] border border-white/10 rounded-lg p-4 font-sans font-light text-white focus:outline-none focus:border-[#D2FF00] focus:ring-1 focus:ring-[#D2FF00]/50 transition-all duration-300 hover:bg-white/5" 
                  placeholder="john@company.com" 
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="company" className="font-mono text-xs tracking-widest text-white/50 uppercase">Company Name</label>
                <input 
                  type="text" 
                  id="company" 
                  className="bg-[#050506] border border-white/10 rounded-lg p-4 font-sans font-light text-white focus:outline-none focus:border-[#D2FF00] focus:ring-1 focus:ring-[#D2FF00]/50 transition-all duration-300 hover:bg-white/5" 
                  placeholder="Acme Corp" 
                />
              </div>

              <button 
                type="button" 
                className="mt-4 rounded-full border-none bg-[#D2FF00] px-8 py-4 text-sm font-mono uppercase tracking-widest text-[#050506] transition-all duration-300 hover:bg-white hover:shadow-[0_0_30px_rgba(210,255,0,0.4)] flex items-center justify-center gap-2 group/btn w-full"
              >
                <span>Request Demo</span>
                <span className="transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
              </button>

            </form>
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
}
