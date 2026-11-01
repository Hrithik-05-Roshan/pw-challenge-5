"use client";

/**
 * @file LandingArchetypes.tsx
 * @description Celebration archetypes showcase (Weddings, Birthdays, Community Festivals).
 */

import React from "react";
import { Crown, Cake, TreePine } from "lucide-react";

export function LandingArchetypes(): React.ReactElement {
  return (
    <section
      id="section-archetypes"
      className="snap-page-section relative overflow-hidden px-4 sm:px-6 lg:px-8 py-12 lg:py-16 border-t border-slate-200/80 dark:border-white/10 bg-slate-50/60 dark:bg-black/20"
    >
      <div className="mx-auto max-w-7xl w-full">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <h2 className="font-editorial text-sm font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Celebration Archetypes
          </h2>
          <p className="font-editorial text-3xl sm:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
            Tailored Intelligence for Every Occasion
          </p>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Every gathering has its own rhythm. Gatherly couples industry heuristics with genuine human hospitality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Wedding Card */}
          <div className="relative glass-card rounded-3xl p-7 space-y-4 overflow-hidden group">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-rose-500 via-amber-500 to-rose-400" />
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-white shadow-md shadow-rose-500/20 group-hover:scale-105 transition-transform duration-300">
              <Crown className="h-6 w-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">Dream Weddings</span>
              <h3 className="font-editorial text-2xl font-bold text-slate-900 dark:text-white mt-1">Multi-day & Nuptial Banquets</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              Multi-function schedules (Mehendi, Sangeet, Reception), high-capacity catering allocations, and a protected 7% contingency reserve shielding you from surprise fees.
            </p>
            <div className="pt-3 border-t border-slate-200/60 dark:border-white/5 flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
              <span>Scale: 50 to 1,500+ guests</span>
              <span className="text-rose-600 dark:text-rose-400">T-180d Timeline</span>
            </div>
          </div>

          {/* Birthday Card */}
          <div className="relative glass-card rounded-3xl p-7 space-y-4 overflow-hidden group">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
              <Cake className="h-6 w-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Milestone Birthdays</span>
              <h3 className="font-editorial text-2xl font-bold text-slate-900 dark:text-white mt-1">1st to 80th Milestone Bashes</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              Curated themes (Neon Retro, Bohemian Chic, Minimalist Garden) with high-energy entertainment, live cake tasting deadlines, and rush lead-time compression.
            </p>
            <div className="pt-3 border-t border-slate-200/60 dark:border-white/5 flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
              <span>Scale: 15 to 250 guests</span>
              <span className="text-indigo-600 dark:text-indigo-400">T-30d Timeline</span>
            </div>
          </div>

          {/* Community Event Card */}
          <div className="relative glass-card rounded-3xl p-7 space-y-4 overflow-hidden group">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500" />
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-300">
              <TreePine className="h-6 w-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Community Festivals</span>
              <h3 className="font-editorial text-2xl font-bold text-slate-900 dark:text-white mt-1">Eco-Fairs, Galas & Bazaars</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              Municipal permits, audio-visual sound limits, crowd security buffers, and automated monsoon rain contingency planning with generator backups.
            </p>
            <div className="pt-3 border-t border-slate-200/60 dark:border-white/5 flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
              <span>Scale: 100 to 2,000 attendees</span>
              <span className="text-emerald-600 dark:text-emerald-400">Permit Centric</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
