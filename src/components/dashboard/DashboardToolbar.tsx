"use client";

/**
 * @file DashboardToolbar.tsx
 * @description Sticky search input and event archetype category filter pill bar.
 */

import React from "react";
import { Search, Sparkles, Crown, Cake, TreePine, Building2 } from "lucide-react";

interface DashboardToolbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filterType: string;
  onFilterChange: (type: string) => void;
}

export function DashboardToolbar({
  searchQuery,
  onSearchChange,
  filterType,
  onFilterChange,
}: DashboardToolbarProps): React.ReactElement {
  const filterOptions = [
    { id: "all", label: "All Events", icon: Sparkles },
    { id: "wedding", label: "Weddings", icon: Crown },
    { id: "birthday", label: "Birthdays", icon: Cake },
    { id: "community", label: "Community", icon: TreePine },
    { id: "corporate", label: "Corporate", icon: Building2 },
  ];

  return (
    <div className="sticky top-4 z-30 p-3 sm:p-4 rounded-3xl glass-panel flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg transition-all duration-300">
      <div className="relative w-full sm:w-88">
        <Search className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" aria-hidden="true" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by celebration name or city..."
          aria-label="Search by celebration name or city"
          className="w-full rounded-2xl border border-slate-200/80 dark:border-white/10 bg-slate-50/80 dark:bg-white/[0.04] pl-11 pr-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500 shadow-xs transition-all"
        />
      </div>

      <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100/80 dark:bg-white/[0.04] border border-slate-200/60 dark:border-white/5 overflow-x-auto w-full sm:w-auto">
        {filterOptions.map((item) => {
          const Icon = item.icon;
          const isSelected = filterType === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onFilterChange(item.id)}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                isSelected
                  ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-white shadow-sm ring-1 ring-slate-200/60 dark:ring-white/10 font-bold scale-[1.02]"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/40 dark:hover:bg-white/5"
              }`}
            >
              <Icon className={`h-3.5 w-3.5 ${isSelected ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400"}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
