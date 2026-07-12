// Shared palette for the SyncMedia site — 3D scene + UI both read from here.
// Moving off cyan-on-black (generic "AI dashboard" default) to a warm,
// film/production-grade palette: think tally-light red-orange + violet sync-pulse,
// against a warm near-black instead of pure void black.
export const theme = {
  void: "#0B0710",      // background
  ink: "#1B1224",        // panel/card surfaces
  ember: "#FF6A3D",      // primary accent — record-light energy
  violet: "#A855F7",     // secondary accent — the "sync" pulse/connection color
  champagne: "#F2C879",  // tertiary highlight — used sparingly for rim light
  paper: "#F5EFE8",      // primary text, warm off-white (not pure white)
  fog: "#1A0F14",
  // Metal tones for the 3D scene. Earlier passes used near-black hexes
  // (#100C09, #15100C, etc.) for the housing/blades — against the near-black
  // void background that left almost no tonal range for lights to reveal
  // curvature, so everything read as a flat silhouette. These are lighter
  // warm charcoals so the same key/rim lights actually produce visible
  // gradients across the metal surfaces.
  metal: "#3A2E22",       // primary metal — blades, bezel, gear hub
  metalDark: "#241C15",   // recessed metal — barrel interior, screws
  metalLight: "#4A3B2C",  // raised/highlighted metal edges
} as const;
