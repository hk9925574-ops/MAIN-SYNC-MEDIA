import Navbar from "@/components/navbar/Navbar";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#050506] text-white overflow-y-auto">
      <Navbar />
      
      <main className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24">
        
        {/* Left Column - Information */}
        <div className="flex-1 mt-12 lg:mt-24">
          <span className="text-[#D2FF00] font-mono text-xs tracking-widest uppercase border border-[#D2FF00]/30 px-3 py-1 rounded-full bg-[#D2FF00]/10">
            Book a Demo
          </span>
          <h1 className="text-6xl md:text-8xl font-bebas tracking-wide leading-[0.9] mt-8">
            Experience <br />
            <span className="text-white/50">The Future Of</span><br />
            Measurement
          </h1>
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
        </div>

        {/* Right Column - Form */}
        <div className="flex-1 lg:mt-12">
          <div className="border border-white/10 bg-white/5 p-8 md:p-12 rounded-3xl backdrop-blur-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#D2FF00]/5 blur-3xl rounded-full"></div>
            
            <form className="relative z-10 flex flex-col gap-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="firstName" className="font-mono text-xs tracking-widest text-white/50 uppercase">First Name</label>
                  <input 
                    type="text" 
                    id="firstName" 
                    className="bg-[#050506] border border-white/10 rounded-lg p-4 font-sans font-light text-white focus:outline-none focus:border-[#D2FF00] focus:ring-1 focus:ring-[#D2FF00]/50 transition-all duration-300" 
                    placeholder="John" 
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="lastName" className="font-mono text-xs tracking-widest text-white/50 uppercase">Last Name</label>
                  <input 
                    type="text" 
                    id="lastName" 
                    className="bg-[#050506] border border-white/10 rounded-lg p-4 font-sans font-light text-white focus:outline-none focus:border-[#D2FF00] focus:ring-1 focus:ring-[#D2FF00]/50 transition-all duration-300" 
                    placeholder="Doe" 
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="font-mono text-xs tracking-widest text-white/50 uppercase">Work Email</label>
                <input 
                  type="email" 
                  id="email" 
                  className="bg-[#050506] border border-white/10 rounded-lg p-4 font-sans font-light text-white focus:outline-none focus:border-[#D2FF00] focus:ring-1 focus:ring-[#D2FF00]/50 transition-all duration-300" 
                  placeholder="john@company.com" 
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="company" className="font-mono text-xs tracking-widest text-white/50 uppercase">Company Name</label>
                <input 
                  type="text" 
                  id="company" 
                  className="bg-[#050506] border border-white/10 rounded-lg p-4 font-sans font-light text-white focus:outline-none focus:border-[#D2FF00] focus:ring-1 focus:ring-[#D2FF00]/50 transition-all duration-300" 
                  placeholder="Acme Corp" 
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="interest" className="font-mono text-xs tracking-widest text-white/50 uppercase">Primary Interest</label>
                <select 
                  id="interest" 
                  className="bg-[#050506] border border-white/10 rounded-lg p-4 font-sans font-light text-white/70 focus:outline-none focus:border-[#D2FF00] focus:ring-1 focus:ring-[#D2FF00]/50 transition-all duration-300 appearance-none"
                >
                  <option value="">Select an option</option>
                  <option value="advertiser">Advertiser Solutions</option>
                  <option value="agency">Agency Solutions</option>
                  <option value="broadcaster">Broadcaster Solutions</option>
                  <option value="other">Other Inquiry</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="font-mono text-xs tracking-widest text-white/50 uppercase">Message (Optional)</label>
                <textarea 
                  id="message" 
                  rows={4}
                  className="bg-[#050506] border border-white/10 rounded-lg p-4 font-sans font-light text-white focus:outline-none focus:border-[#D2FF00] focus:ring-1 focus:ring-[#D2FF00]/50 transition-all duration-300 resize-none" 
                  placeholder="How can we help you?" 
                ></textarea>
              </div>

              <button 
                type="button" 
                className="mt-4 rounded-full border-none bg-[#D2FF00] px-8 py-4 text-sm font-mono uppercase tracking-widest text-[#050506] transition-all duration-300 hover:bg-white hover:shadow-[0_0_30px_rgba(210,255,0,0.4)] flex items-center justify-center gap-2 group w-full"
              >
                <span>Request Demo</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </button>

            </form>
          </div>
        </div>

      </main>
    </div>
  );
}
