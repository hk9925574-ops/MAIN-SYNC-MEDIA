"use client";

import { useState } from "react";
import { theme } from "@/lib/theme";

type Project = {
  title: string;
  category: string;
  gradient: string;
};

// Placeholder projects — swap `title`, `category`, and drop a real image/video
// into the card (see comment in ProjectCard) once real assets are ready.
const PROJECTS: Project[] = [
  { title: "Aperture Launch Film", category: "Brand Film", gradient: `linear-gradient(135deg, ${theme.ember}, ${theme.violet})` },
  { title: "Nova Streaming Campaign", category: "OTT / Digital", gradient: `linear-gradient(135deg, ${theme.violet}, ${theme.champagne})` },
  { title: "Command Series", category: "Documentary", gradient: `linear-gradient(135deg, ${theme.champagne}, ${theme.ember})` },
  { title: "Assembly Product Reveal", category: "Product Film", gradient: `linear-gradient(135deg, ${theme.ember}, ${theme.metalLight})` },
  { title: "Portal Rebrand", category: "Brand Identity", gradient: `linear-gradient(135deg, ${theme.metalLight}, ${theme.violet})` },
  { title: "Universe Live Event", category: "Live / Broadcast", gradient: `linear-gradient(135deg, ${theme.violet}, ${theme.ember})` },
];

function ProjectCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="pointer-events-auto cursor-pointer transition-transform duration-300"
      style={{
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
      }}
    >
      <div
        className="relative overflow-hidden rounded-xl transition-shadow duration-300"
        style={{
          aspectRatio: "16 / 10",
          background: project.gradient,
          boxShadow: hovered
            ? `0 20px 50px -15px ${theme.violet}55`
            : `0 10px 30px -15px ${theme.void}`,
        }}
      >
        {/* Placeholder thumbnail area — replace this div with a real
            <img src="..." /> or <video /> once assets are ready. */}
        <div
          className="absolute inset-0 flex items-center justify-center text-xs uppercase tracking-[0.2em] transition-opacity duration-300"
          style={{
            background: `${theme.void}33`,
            color: `${theme.paper}CC`,
            opacity: hovered ? 1 : 0.6,
          }}
        >
          View project
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <div style={{ color: theme.paper, fontSize: "15px", fontWeight: 500 }}>{project.title}</div>
        <div
          style={{
            color: `${theme.paper}80`,
            fontSize: "11px",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          {project.category}
        </div>
      </div>
    </div>
  );
}

export default function PortfolioGallery() {
  return (
    <div className="w-full max-w-5xl px-6">
      <div
        className="pointer-events-auto mb-10 text-center"
        style={{ color: theme.paper }}
      >
        <h2 className="text-5xl font-light tracking-widest text-white/90">SELECTED WORK</h2>
        <p className="mt-3 text-sm uppercase tracking-[0.2em]" style={{ color: `${theme.paper}80` }}>
          A sample of recent projects
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </div>
  );
}
