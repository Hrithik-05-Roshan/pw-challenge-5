"use client";

/**
 * @file LandingStudioPreview.tsx
 * @description Interactive visual preview card simulating the workspace studio on the landing page.
 */

import React from "react";
import { Sparkles, Crown, CalendarDays, Users2, Lightbulb } from "lucide-react";

export function LandingStudioPreview(): React.ReactElement {
  return (
    <div className="relative glass-card rounded-3xl p-6 sm:p-7 shadow-2xl ring-1 ring-black/5 dark:ring-white/10">
      {/* Window header */}
      <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-white/10 pb-4 mb-5">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-rose-500/80 shadow-xs" />
          <span className="h-3 w-3 rounded-full bg-amber-500/80 shadow-xs" />
          <span className="h-3 w-3 rounded-full bg-emerald-500/80 shadow-xs" />
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300">
          <Sparkles className="h-3 w-3 text-indigo-500" />
          <span>gatherly.workspace</span>
        </div>
      </div>

      {/* Event Card Content */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Crown className="h-4 w-4 text-amber-500" />
              <h3 className="font-editorial text-lg font-bold text-slate-900 dark:text-white">
                Aarav & Meera&apos;s Royal Wedding
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
              Udaipur • 350 Guests • Destination Grandeur
            </p>
          </div>
          <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 shadow-xs">
            100% Balanced
          </span>
        </div>

        {/* Budget Allocation Bar */}
        <div className="space-y-2.5 p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/70 dark:border-white/5">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-600 dark:text-slate-400 font-medium">Total Allocated Budget</span>
            <span className="font-display font-extrabold text-sm text-slate-900 dark:text-white">₹25,00,000 INR</span>
          </div>
          
          <div className="h-3.5 w-full rounded-full bg-slate-200 dark:slate-800 flex overflow-hidden p-0.5 gap-0.5">
            <div className="bg-indigo-600 rounded-l-full h-full w-[40%]" title="Venue & Lodging (40%)" />
            <div className="bg-violet-500 h-full w-[28%]" title="Catering (28%)" />
            <div className="bg-pink-500 h-full w-[12%]" title="Decor & Florals (12%)" />
            <div className="bg-amber-500 h-full w-[8%]" title="Photography (8%)" />
            <div className="bg-emerald-500 rounded-r-full h-full w-[7%]" title="Contingency Reserve (7%)" />
          </div>

          <div className="flex justify-between text-[10px] text-slate-500 dark:text-slate-400 font-medium">
            <span>Venue & Lodging (40%)</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Contingency Reserve (7% Locked)</span>
          </div>
        </div>

        {/* Micro metric badges */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/70 dark:border-white/5">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
              <CalendarDays className="h-3.5 w-3.5 text-indigo-500" />
              <span>Timeline Schedule</span>
            </div>
            <p className="font-display font-bold text-sm text-slate-900 dark:text-white mt-1">T-120 Days</p>
            <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">On track for vendor freeze</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/70 dark:border-white/5">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
              <Users2 className="h-3.5 w-3.5 text-violet-500" />
              <span>Guest List Health</span>
            </div>
            <p className="font-display font-bold text-sm text-slate-900 dark:text-white mt-1">350 Tracked</p>
            <p className="text-[10px] text-indigo-600 dark:text-indigo-400 font-medium">Zero-PII local encryption</p>
          </div>
        </div>

        {/* Explainable AI callout */}
        <div className="p-3.5 rounded-2xl bg-indigo-500/5 dark:bg-indigo-500/10 border border-indigo-500/20 text-xs">
          <div className="flex items-center gap-1.5 text-indigo-700 dark:text-indigo-300 font-bold mb-1">
            <Lightbulb className="h-3.5 w-3.5 text-indigo-500" />
            <span>Bespoke Concierge Strategy</span>
          </div>
          <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
            Catering optimized to live Rajasthani food counters to reduce banquet labor overhead by 22% while boosting guest culinary interaction.
          </p>
        </div>
      </div>
    </div>
  );
}
