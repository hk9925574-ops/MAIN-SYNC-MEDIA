import GlobalScene from "@/components/GlobalScene";
import PlatformOverview from "@/components/sections/PlatformOverview";
import SolutionsOverview from "@/components/sections/SolutionsOverview";
import ContactSection from "@/components/sections/ContactSection";
import Navbar from "@/components/navbar/Navbar";

export default function Home() {
  return (
    <main className="relative w-full bg-[#050506] overflow-x-hidden selection:bg-[#D2FF00]/30 selection:text-[#D2FF00]">
      <Navbar />
      
      {/* 1. Hero Section with 3D Scene */}
      <div id="hero" className="relative w-full h-screen">
        <GlobalScene />
      </div>

      {/* 2. Platform Section */}
      <PlatformOverview />

      {/* 3. Solutions Section */}
      <SolutionsOverview />

      {/* 4. Contact Section */}
      <ContactSection />
      
    </main>
  );
}
