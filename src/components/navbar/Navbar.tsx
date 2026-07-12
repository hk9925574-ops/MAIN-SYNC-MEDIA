"use client";

import Link from "next/link";
import { useState } from "react";
import LazyCanvasMount from "@/components/effects/LazyCanvasMount";
import ApertureMark from "@/components/worlds/ApertureMark";

export default function Navbar() {
  const [hovered, setHovered] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const links = [
    {
      label: "Platform",
      href: "/#platform",
      dropdown: [
        { label: "Cross-Media Measurement", href: "/platform/cross-media-measurement" },
        { label: "Outcomes Measurement", href: "/platform/outcomes-measurement" },
        { label: "Media Optimisation", href: "/platform/media-optimisation" },
        { label: "Reporting & Diagnostics", href: "/platform/reporting-diagnostics" },
      ]
    },
    {
      label: "Solutions",
      href: "/#solutions",
      dropdown: [
        { label: "For Advertisers", href: "/solutions/advertisers" },
        { label: "For Agencies", href: "/solutions/agencies" },
        { label: "For Broadcasters", href: "/solutions/broadcasters" },
      ]
    },
    { label: "Methodology", href: "/methodology" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" },
  ];

  return (
    <header className="fixed top-0 left-0 z-50 w-full pointer-events-none">
      <nav className="mx-6 mt-6 flex h-20 items-center justify-between rounded-2xl border border-white/5 bg-[#050506]/30 px-10 backdrop-blur-md pointer-events-auto transition-all duration-500 hover:bg-[#050506]/60">
        <Link href="/"
          className="flex cursor-pointer items-center gap-3 group shrink-0"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <LazyCanvasMount className="h-9 w-9 shrink-0">
            <ApertureMark hovered={hovered} />
          </LazyCanvasMount>
          <h1 className="hidden xl:block text-2xl font-bebas tracking-[0.35em] text-white transition-colors duration-300 group-hover:text-[#D2FF00]">
            SYNCMEDIA
          </h1>
        </Link>

        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {links.map((link) => (
            <div 
              key={link.label}
              className="relative group"
              onMouseEnter={() => setActiveDropdown(link.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href={link.href}
                className="relative text-xs font-mono uppercase tracking-[0.1em] xl:tracking-[0.2em] text-white/50 transition duration-300 hover:text-[#D2FF00] py-4"
              >
                {link.label}
              </Link>
              
              {link.dropdown && activeDropdown === link.label && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-[#050506]/95 border border-white/10 rounded-xl backdrop-blur-xl p-2 flex flex-col gap-1 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300 z-50">
                  {link.dropdown.map((sublink) => (
                    <Link
                      key={sublink.label}
                      href={sublink.href}
                      className="px-4 py-3 text-[10px] md:text-xs font-mono text-white/70 uppercase tracking-wider hover:text-[#D2FF00] hover:bg-white/5 rounded-lg transition-colors"
                    >
                      {sublink.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <Link
          href="/#contact"
          className="shrink-0 rounded-full border border-[#D2FF00]/30 bg-transparent px-4 py-2 md:px-6 md:py-2 text-[10px] md:text-xs font-mono uppercase tracking-widest text-[#D2FF00] transition-all duration-300 hover:bg-[#D2FF00] hover:text-[#050506] hover:shadow-[0_0_20px_rgba(210,255,0,0.4)]"
        >
          Book a Demo
        </Link>
      </nav>
    </header>
  );
}
