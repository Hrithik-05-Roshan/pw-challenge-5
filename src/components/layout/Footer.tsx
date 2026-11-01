"use client";

/**
 * @file Footer.tsx
 * @description Production-grade responsive footer for Gatherly AI.
 *
 * Implements a modular, decoupled architecture composing newsletter subscription,
 * categorized directory links, trust markers, and operational health badges.
 */

import React from "react";
import { FooterNewsletter } from "./footer/FooterNewsletter";
import { FooterDirectory } from "./footer/FooterDirectory";
import { FooterBottomBar } from "./footer/FooterBottomBar";

export function Footer(): React.ReactElement {
  return (
    <footer
      className="w-full border-t border-slate-200/80 dark:border-white/10 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl transition-colors duration-300"
      role="contentinfo"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 space-y-5">
        <FooterNewsletter />
        <FooterDirectory />
        <FooterBottomBar />
      </div>
    </footer>
  );
}
