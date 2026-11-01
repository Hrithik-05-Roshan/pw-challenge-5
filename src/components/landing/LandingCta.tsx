"use client";

/**
 * @file LandingCta.tsx
 * @description Final call-to-action banner driving users to the planning wizard or showcase.
 */

import React from "react";
import Link from "next/link";
import { Sparkles, ChevronRight } from "lucide-react";

export function LandingCta(): React.ReactElement {
  return (
    <section
      id="section-cta"
      className="snap-page-section relative overflow-hidden flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-16 lg:py-20 border-t border-slate-200/80 dark:border-white/10 bg-gradient-to-b from-indigo-500/5 via-transparent to-transparent"
    >
      <div className="mx-auto max-w-4xl w-full text-center space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold text-indigo-700 dark:text-indigo-300">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Ready in under 2 minutes • 100% Free & Client-Side Secure</span>
        </div>

        <h2 className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white tracking-tight">
          Plan your next memorable moment.
        </h2>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl mx-auto leading-relaxed">
          Experience the calm that comes with guaranteed 100% budget balance, 
          thoughtful vendor coordination, and backwards milestone clarity.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link
            href="/onboarding"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-600 px-8 py-3.5 text-sm sm:text-base font-bold text-white shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 cursor-pointer"
          >
            <ChevronRight className="h-4.5 w-4.5 stroke-[2.5] transition-transform duration-300 group-hover:translate-x-1" />
            <span>Launch Planning Wizard</span>
          </Link>

          <Link
            href="/dashboard"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-white/[0.04] px-7 py-3.5 text-sm sm:text-base font-semibold text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-xs cursor-pointer"
          >
            <ChevronRight className="h-4 w-4 stroke-[2.5] text-indigo-500 transition-transform duration-300 group-hover:translate-x-1" />
            <span>Explore Judge Showcase</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
