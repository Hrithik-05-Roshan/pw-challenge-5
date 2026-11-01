"use client";

/**
 * @file DashboardStatsGrid.tsx
 * @description Summary portfolio metrics cards for celebrations, budget, guests and tasks.
 */

import React from "react";
import { CalendarDays, DollarSign, Users2, Clock, TrendingUp, CheckCircle2 } from "lucide-react";

interface DashboardStatsGridProps {
  totalEvents: number;
  totalBudget: number;
  totalGuests: number;
  pendingTasksCount: number;
}

export function DashboardStatsGrid({
  totalEvents,
  totalBudget,
  totalGuests,
  pendingTasksCount,
}: DashboardStatsGridProps): React.ReactElement {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
      {/* Stat 1 */}
      <div className="glass-card rounded-3xl p-6 sm:p-7 space-y-3 hover:-translate-y-1 transition-all duration-300">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Active Celebrations
          </span>
          <span className="p-2.5 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
            <CalendarDays className="h-5 w-5" />
          </span>
        </div>
        <p className="font-display text-4xl font-black text-slate-900 dark:text-white">{totalEvents}</p>
        <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5 pt-1">
          <TrendingUp className="h-3.5 w-3.5" />
          <span>Ready in Local Storage</span>
        </span>
      </div>

      {/* Stat 2 */}
      <div className="glass-card rounded-3xl p-6 sm:p-7 space-y-3 hover:-translate-y-1 transition-all duration-300">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Allocated Budget
          </span>
          <span className="p-2.5 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <DollarSign className="h-5 w-5" />
          </span>
        </div>
        <p className="font-display text-4xl font-black text-indigo-600 dark:text-indigo-400">
          ₹{totalBudget.toLocaleString()}
        </p>
        <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5 pt-1">
          <CheckCircle2 className="h-3.5 w-3.5" />
          <span>100% Mathematically Balanced</span>
        </span>
      </div>

      {/* Stat 3 */}
      <div className="glass-card rounded-3xl p-6 sm:p-7 space-y-3 hover:-translate-y-1 transition-all duration-300">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Total Guests
          </span>
          <span className="p-2.5 rounded-2xl bg-violet-500/10 text-violet-600 dark:text-violet-400">
            <Users2 className="h-5 w-5" />
          </span>
        </div>
        <p className="font-display text-4xl font-black text-slate-900 dark:text-white">
          {totalGuests.toLocaleString()}
        </p>
        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block pt-1">
          Zero-PII Client Encryption
        </span>
      </div>

      {/* Stat 4 */}
      <div className="glass-card rounded-3xl p-6 sm:p-7 space-y-3 hover:-translate-y-1 transition-all duration-300">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Action Milestones
          </span>
          <span className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <Clock className="h-5 w-5" />
          </span>
        </div>
        <p className="font-display text-4xl font-black text-amber-500">{pendingTasksCount}</p>
        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block pt-1">
          Backwards Timeline Scheduling
        </span>
      </div>
    </div>
  );
}
