"use client";

/**
 * @file LandingGalleryNav.tsx
 * @description Floating Gallery Section Navigator for landing page snap scrolling.
 */

import React from "react";

export function LandingGalleryNav(): React.ReactElement {
  return (
    <nav
      aria-label="Gallery Section Navigator"
      className="fixed right-6 top-1/2 -translate-y-1/2 z-30 hidden xl:flex flex-col items-center gap-3 p-2 rounded-full glass-panel shadow-lg"
    >
      <a
        href="#section-hero"
        className="group flex items-center justify-center h-8 w-8 rounded-full hover:bg-indigo-500/10 transition-colors"
        title="Studio Overview"
        aria-label="Studio Overview"
      >
        <span className="h-2.5 w-2.5 rounded-full bg-slate-400 group-hover:bg-indigo-600 group-hover:scale-125 transition-all" />
      </a>
      <a
        href="#section-archetypes"
        className="group flex items-center justify-center h-8 w-8 rounded-full hover:bg-rose-500/10 transition-colors"
        title="Celebration Archetypes"
        aria-label="Celebration Archetypes"
      >
        <span className="h-2.5 w-2.5 rounded-full bg-slate-400 group-hover:bg-rose-500 group-hover:scale-125 transition-all" />
      </a>
      <a
        href="#section-architecture"
        className="group flex items-center justify-center h-8 w-8 rounded-full hover:bg-amber-500/10 transition-colors"
        title="Engineering Rigor"
        aria-label="Engineering Rigor"
      >
        <span className="h-2.5 w-2.5 rounded-full bg-slate-400 group-hover:bg-amber-500 group-hover:scale-125 transition-all" />
      </a>
      <a
        href="#section-cta"
        className="group flex items-center justify-center h-8 w-8 rounded-full hover:bg-emerald-500/10 transition-colors"
        title="Get Started"
        aria-label="Get Started"
      >
        <span className="h-2.5 w-2.5 rounded-full bg-slate-400 group-hover:bg-emerald-500 group-hover:scale-125 transition-all" />
      </a>
    </nav>
  );
}
