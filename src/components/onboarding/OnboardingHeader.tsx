"use client";

/**
 * @file OnboardingHeader.tsx
 * @description Header banner and quick inspiration loader for the planning wizard.
 */

import React from "react";
import Link from "next/link";
import { Sparkles, Compass, ChevronRight, PartyPopper } from "lucide-react";
import { INSPIRATION_TEMPLATES, InspirationTemplate } from "@/constants/onboarding";

interface OnboardingHeaderProps {
  onApplyInspiration: (template: InspirationTemplate) => void;
}

export function OnboardingHeader({ onApplyInspiration }: OnboardingHeaderProps): React.ReactElement {
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-200/80 dark:border-white/10 gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold text-indigo-700 dark:text-indigo-300">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Interactive Celebration Architect</span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
            Design Your Celebration
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
            Configure every dimension of your celebration with guaranteed 100% mathematical budgets, backwards timelines, and client-side zero-PII security.
          </p>
        </div>

        <Link
          href="/dashboard"
          className="group inline-flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-xl border border-indigo-500/30 bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-sm shrink-0 cursor-pointer"
        >
          <Compass className="h-4 w-4" />
          <span>Skip to Preloaded Demos</span>
          <ChevronRight className="h-3.5 w-3.5 stroke-[2.5] transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Quick Inspiration Fill Pills */}
      <div className="p-4 rounded-2xl glass-card border border-indigo-500/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
          <PartyPopper className="h-4 w-4 text-indigo-500 shrink-0" />
          <span>Quick-Load Inspiration:</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {INSPIRATION_TEMPLATES.map((tmpl) => (
            <button
              key={tmpl.name}
              type="button"
              onClick={() => onApplyInspiration(tmpl)}
              className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-indigo-500/15 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-300 border border-slate-200/80 dark:border-white/10 hover:border-indigo-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>{tmpl.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
