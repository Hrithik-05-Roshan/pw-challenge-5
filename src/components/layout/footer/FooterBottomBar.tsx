"use client";

/**
 * @file FooterBottomBar.tsx
 * @description Copyright, version, operational status, and human touch badge for Gatherly AI footer.
 */

import React from "react";
import Link from "next/link";
import { ChevronRight, Heart } from "lucide-react";

export function FooterBottomBar(): React.ReactElement {
  return (
    <div className="pt-3.5 border-t border-slate-200/60 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-2.5">
      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
        <Link
          href="/"
          className="group inline-flex items-center gap-1 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors min-h-0 py-0.5"
        >
          <ChevronRight className="h-3 w-3 stroke-[2.5] text-indigo-500 transition-transform duration-200 group-hover:translate-x-0.5 shrink-0" />
          <span>© 2026 Gatherly AI. Built for Challenge 5: Celebration & Event Planner.</span>
        </Link>
        <span className="hidden sm:inline">•</span>
        <span className="text-[11px] font-mono">v1.2.0 • Production Ready</span>
      </div>

      <div className="flex items-center gap-3">
        <Link
          href="/settings"
          className="group inline-flex items-center gap-1.5 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors min-h-0 py-0.5"
        >
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <ChevronRight className="h-3 w-3 stroke-[2.5] text-emerald-500 transition-transform duration-200 group-hover:translate-x-0.5 shrink-0" />
          <span className="font-medium">All Systems Operational</span>
        </Link>
        <p className="inline-flex items-center gap-1">
          <span>Handcrafted with</span>
          <Heart className="h-3 w-3 text-rose-500 fill-rose-500 inline" />
          <span>for human celebrations</span>
        </p>
      </div>
    </div>
  );
}
