"use client";

/**
 * @file DashboardHeader.tsx
 * @description Header banner and primary creation CTA for the Dashboard page.
 */

import React from "react";
import Link from "next/link";
import { LayoutDashboard, ChevronRight } from "lucide-react";

export function DashboardHeader(): React.ReactElement {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2 border-b border-slate-200/60 dark:border-white/5">
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
          <LayoutDashboard className="h-3.5 w-3.5" />
          <span>Celebration Orchestration Studio</span>
        </div>
        <h1 className="font-editorial text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
          Your Celebrations Portfolio
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
          Manage your weddings, milestone birthdays, and festivals with guaranteed 100% mathematical budgets, backwards timelines, and vendor coordination.
        </p>
      </div>

      <Link
        href="/onboarding"
        className="group inline-flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-600 px-7 py-4 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/40 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 shrink-0 cursor-pointer"
      >
        <ChevronRight className="h-4.5 w-4.5 stroke-[2.5] transition-transform duration-300 group-hover:translate-x-1" />
        <span>Plan Celebration</span>
      </Link>
    </div>
  );
}
