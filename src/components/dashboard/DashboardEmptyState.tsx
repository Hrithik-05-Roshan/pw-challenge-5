"use client";

/**
 * @file DashboardEmptyState.tsx
 * @description Empty state UI displayed when no celebrations match user filter criteria.
 */

import React from "react";
import Link from "next/link";
import { Search, ChevronRight } from "lucide-react";

export function DashboardEmptyState(): React.ReactElement {
  return (
    <div className="text-center py-24 border border-dashed border-slate-300 dark:border-white/10 rounded-3xl glass-card space-y-4">
      <div className="h-14 w-14 rounded-2xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center mx-auto">
        <Search className="h-7 w-7" aria-hidden="true" />
      </div>
      <p className="text-lg font-semibold text-slate-900 dark:text-white">
        No celebrations match your search criteria.
      </p>
      <Link
        href="/onboarding"
        className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/20 hover:shadow-xl hover:shadow-indigo-500/40 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 cursor-pointer"
      >
        <ChevronRight className="h-4 w-4 stroke-[2.5] transition-transform duration-300 group-hover:translate-x-1" />
        <span>Create New Celebration</span>
      </Link>
    </div>
  );
}
