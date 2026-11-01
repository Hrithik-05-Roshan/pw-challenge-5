"use client";

/**
 * @file LiveBlueprintStudio.tsx
 * @description Real-time reactive celebration blueprint panel displaying live budget splits and backwards milestones.
 */

import React from "react";
import { Clock, Lock, ShieldCheck } from "lucide-react";
import { BudgetItem } from "@/types";

interface LiveBlueprintStudioProps {
  currentCityTier: number;
  currentTitle: string;
  currentCity: string;
  currentGuests: number;
  currentDate: string;
  currentBudget: number;
  currentCurrency: string;
  currencySymbol: string;
  liveBudgetItems: BudgetItem[];
  contingencyItem?: BudgetItem;
}

export function LiveBlueprintStudio({
  currentCityTier,
  currentTitle,
  currentCity,
  currentGuests,
  currentDate,
  currentBudget,
  currentCurrency,
  currencySymbol,
  liveBudgetItems,
  contingencyItem,
}: LiveBlueprintStudioProps): React.ReactElement {
  return (
    <aside className="lg:col-span-5 xl:col-span-4 sticky top-6 space-y-6" aria-label="Real-time Plan Blueprint">
      <div className="glass-card rounded-3xl p-6 sm:p-7 space-y-6 shadow-xl border border-indigo-500/20">
        {/* Studio Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200/70 dark:border-white/10">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Live Celebration Blueprint
            </span>
          </div>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-semibold">
            Tier {currentCityTier}
          </span>
        </div>

        {/* Quick Metrics */}
        <div className="space-y-1">
          <p className="font-editorial text-2xl font-bold text-slate-900 dark:text-white truncate">
            {currentTitle}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {currentCity} • {currentGuests} guests • {currentDate}
          </p>
        </div>

        {/* Live Dynamic Budget Allocation Visualizer */}
        <div className="space-y-3 p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/70 dark:border-white/5">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-600 dark:text-slate-400 font-medium">Deterministic Budget</span>
            <span className="font-mono font-bold text-slate-900 dark:text-white text-sm">
              {currencySymbol}{Number(currentBudget || 0).toLocaleString()} {currentCurrency}
            </span>
          </div>

          {/* Progress bar visualizer */}
          <div className="h-3 w-full rounded-full bg-slate-200 dark:bg-slate-800 flex overflow-hidden p-0.5 gap-0.5">
            {liveBudgetItems.slice(0, 5).map((item, idx) => {
              const colors = ["bg-indigo-600", "bg-violet-500", "bg-rose-500", "bg-amber-500", "bg-emerald-500"];
              const pct = Math.max(5, Math.round((item.plannedAmount / Math.max(1, Number(currentBudget))) * 100));
              return (
                <div
                  key={item.category}
                  className={`${colors[idx % colors.length]} h-full rounded-full transition-all duration-300`}
                  style={{ width: `${pct}%` }}
                  title={`${item.category}: ${pct}%`}
                />
              );
            })}
          </div>

          {/* Top Category List */}
          <div className="space-y-2 pt-1 text-xs">
            {liveBudgetItems.slice(0, 4).map((item) => (
              <div key={item.category} className="flex justify-between items-center text-slate-600 dark:text-slate-300">
                <span className="capitalize">{item.category}</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">
                  {currencySymbol}{item.plannedAmount.toLocaleString()}
                </span>
              </div>
            ))}

            {/* Contingency Row */}
            {contingencyItem && (
              <div className="flex justify-between items-center text-emerald-600 dark:text-emerald-400 font-semibold pt-1 border-t border-slate-200/60 dark:border-white/5">
                <span className="flex items-center gap-1.5">
                  <Lock className="h-3 w-3" />
                  <span>Contingency Reserve</span>
                </span>
                <span className="font-mono font-bold">
                  {currencySymbol}{contingencyItem.plannedAmount.toLocaleString()}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Backwards Milestone Countdown Preview */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-indigo-500" />
              <span>Backwards Timeline Milestones</span>
            </span>
            <span className="text-[10px] text-slate-400">Scheduled Backwards</span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/5 flex items-center justify-between">
              <span className="text-slate-600 dark:text-slate-300">T-180: Venue & Advance Deposit</span>
              <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400">Phase 1</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/5 flex items-center justify-between">
              <span className="text-slate-600 dark:text-slate-300">T-90: Invitation & RSVP Dispatch</span>
              <span className="text-[10px] font-bold text-violet-600 dark:text-violet-400">Phase 2</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/5 flex items-center justify-between">
              <span className="text-slate-600 dark:text-slate-300">T-30: Menu Tasting & Vendor Freeze</span>
              <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400">Phase 3</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/5 flex items-center justify-between">
              <span className="text-slate-600 dark:text-slate-300">T-1: Rehearsal & AV Sound Curfew</span>
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">Phase 4</span>
            </div>
          </div>
        </div>

        {/* Zero-PII Guarantee Badge */}
        <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs flex items-center gap-2.5">
          <ShieldCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <div>
            <p className="font-bold text-emerald-800 dark:text-emerald-300">100% Client-Side Privacy</p>
            <p className="text-[11px] text-emerald-700/80 dark:text-emerald-400/80">
              Guest and budget data never leaves your browser sandbox.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
