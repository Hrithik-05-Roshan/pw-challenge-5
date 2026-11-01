"use client";

/**
 * @file LandingHero.tsx
 * @description Hero introduction section with editorial typography, CTA links and trust markers.
 */

import React from "react";
import Link from "next/link";
import { Sparkles, ChevronRight, ShieldCheck, CheckCircle2, Clock } from "lucide-react";
import { LandingStudioPreview } from "./LandingStudioPreview";

export function LandingHero(): React.ReactElement {
  return (
    <section
      id="section-hero"
      className="snap-page-section relative overflow-hidden px-4 sm:px-6 lg:px-8 py-12 lg:py-16"
    >
      <div className="mx-auto max-w-7xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Copy */}
          <div className="lg:col-span-7 space-y-7 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/25 bg-indigo-500/10 dark:bg-indigo-500/15 px-4 py-2 text-xs font-semibold text-indigo-700 dark:text-indigo-300 shadow-xs backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-rose-500 animate-ping" />
              <Sparkles className="h-3.5 w-3.5 text-indigo-500" aria-hidden="true" />
              <span className="tracking-wide">Every Celebration, Bespoke & Planned</span>
            </div>

            {/* Main Headline with Editorial Serif & Human Warmth */}
            <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.08]">
              Every celebration, <br />
              <span className="shimmer-text italic font-serif font-normal">beautifully planned.</span>
            </h1>

            {/* Tagline & Subtitle */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Bespoke event architecture for weddings, milestone birthdays, and community festivals. 
              Guaranteed <strong className="text-slate-900 dark:text-white font-semibold">100% mathematical budget precision</strong>, 
              backwards milestone timelines, explainable vendor decisions, and absolute zero-PII guest privacy.
            </p>

            {/* Primary CTAs with '>' icon and hover effect */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/onboarding"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-600 px-8 py-4 text-sm sm:text-base font-bold text-white shadow-xl shadow-indigo-500/25 hover:shadow-2xl hover:shadow-indigo-500/40 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 cursor-pointer"
              >
                <ChevronRight className="h-4.5 w-4.5 stroke-[2.5] transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                <span>Start Planning Wizard</span>
              </Link>

              <Link
                href="/dashboard"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-white/[0.04] px-7 py-4 text-sm sm:text-base font-semibold text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 backdrop-blur-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-sm cursor-pointer"
              >
                <ChevronRight className="h-4 w-4 stroke-[2.5] text-indigo-500 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                <span>Explore Showcase Events</span>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-y-3 gap-x-8 pt-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <span className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-500" aria-hidden="true" />
                Zero-PII Client-Side Privacy
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-indigo-500" aria-hidden="true" />
                Deterministic 100% Math Guarantee
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-amber-500" aria-hidden="true" />
                Backwards Milestone Schedule
              </span>
            </div>
          </div>

          {/* Right Interactive Studio Card */}
          <div className="lg:col-span-5" aria-hidden="true">
            <LandingStudioPreview />
          </div>
        </div>
      </div>
    </section>
  );
}
