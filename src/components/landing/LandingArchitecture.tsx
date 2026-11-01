"use client";

/**
 * @file LandingArchitecture.tsx
 * @description Architecture, mathematical invariants and security cards bento grid.
 */

import React from "react";
import { PieChart, CalendarDays, Lightbulb, Lock, AlertTriangle, FileDown } from "lucide-react";

export function LandingArchitecture(): React.ReactElement {
  return (
    <section
      id="section-architecture"
      className="snap-page-section relative overflow-hidden px-4 sm:px-6 lg:px-8 py-12 lg:py-16 border-t border-slate-200/80 dark:border-white/10"
    >
      <div className="mx-auto max-w-7xl w-full">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <h2 className="font-editorial text-sm font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Handcrafted Architecture
          </h2>
          <p className="font-editorial text-3xl sm:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
            Why Celebrants Trust Gatherly
          </p>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            No generic hallucinations. Every decision is underpinned by mathematical logic and human warmth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Bento 1: 100% Math Invariant */}
          <div className="glass-card rounded-3xl p-6 space-y-3">
            <div className="h-10 w-10 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <PieChart className="h-5 w-5" />
            </div>
            <h3 className="font-editorial text-lg font-bold text-slate-900 dark:text-white">
              Deterministic 100% Budget Invariant
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              Every rupee is mathematically accounted for. Never throws hallucinated arithmetic summing to 125%. Locks a non-negotiable 5–10% contingency safety reserve.
            </p>
          </div>

          {/* Bento 2: Backwards Timelines */}
          <div className="glass-card rounded-3xl p-6 space-y-3">
            <div className="h-10 w-10 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <CalendarDays className="h-5 w-5" />
            </div>
            <h3 className="font-editorial text-lg font-bold text-slate-900 dark:text-white">
              Backwards Milestone Timeline
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              Schedules deadlines backwards from the celebration date. If lead time is under 14 days, algorithms automatically compress milestones and flag rush vendor tasks.
            </p>
          </div>

          {/* Bento 3: Explainable Decisions */}
          <div className="glass-card rounded-3xl p-6 space-y-3">
            <div className="h-10 w-10 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Lightbulb className="h-5 w-5" />
            </div>
            <h3 className="font-editorial text-lg font-bold text-slate-900 dark:text-white">
              Explainable Decision Cards
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              No black-box recommendations. Every suggestion includes rationale, financial trade-offs, estimated savings, and evaluated fallback alternatives.
            </p>
          </div>

          {/* Bento 4: Zero-PII Privacy */}
          <div className="glass-card rounded-3xl p-6 space-y-3">
            <div className="h-10 w-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Lock className="h-5 w-5" />
            </div>
            <h3 className="font-editorial text-lg font-bold text-slate-900 dark:text-white">
              Zero-PII Privacy Architecture
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              Guest names, phone numbers, and dietary requirements live strictly in your browser&apos;s LocalStorage. Never transmitted to third-party AI models.
            </p>
          </div>

          {/* Bento 5: Contextual Weather & Risks */}
          <div className="glass-card rounded-3xl p-6 space-y-3">
            <div className="h-10 w-10 rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <h3 className="font-editorial text-lg font-bold text-slate-900 dark:text-white">
              Contextual Risk Analysis
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              Detects monsoon weather exposure, budget-per-guest tier discrepancies, and tight lead times before they compromise your celebration.
            </p>
          </div>

          {/* Bento 6: Universal Calendar Export */}
          <div className="glass-card rounded-3xl p-6 space-y-3">
            <div className="h-10 w-10 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center">
              <FileDown className="h-5 w-5" />
            </div>
            <h3 className="font-editorial text-lg font-bold text-slate-900 dark:text-white">
              RFC 5545 iCalendar Sync
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              One-click export to Google Calendar, Apple Calendar, and Microsoft Outlook. Plus complete JSON backup portability at any time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
