/**
 * @file page.tsx
 * @description Landing & Showcase Overview Page for Gatherly AI.
 *
 * Implements a clean, decoupled composite architecture where each section
 * (Hero, Archetypes, Architecture Invariants, CTA, and Footer) is encapsulated
 * in a dedicated, single-responsibility component under src/components/landing/.
 */

import React from "react";
import { LandingGalleryNav } from "@/components/landing/LandingGalleryNav";
import { LandingHero } from "@/components/landing/LandingHero";
import { LandingArchetypes } from "@/components/landing/LandingArchetypes";
import { LandingArchitecture } from "@/components/landing/LandingArchitecture";
import { LandingCta } from "@/components/landing/LandingCta";
import { Footer } from "@/components/layout/Footer";

export default function LandingPage(): React.ReactElement {
  return (
    <div className="flex flex-col min-h-screen ambient-bg page-transition snap-scroll-container">
      {/* Floating Gallery Section Navigator */}
      <LandingGalleryNav />

      {/* Section 1: Hero Studio */}
      <LandingHero />

      {/* Section 2: Celebration Archetypes */}
      <LandingArchetypes />

      {/* Section 3: Engineering Architecture */}
      <LandingArchitecture />

      {/* Section 4: Call to Action */}
      <LandingCta />

      {/* Production-Grade Compact Footer exclusively on Home Page */}
      <Footer />
    </div>
  );
}
