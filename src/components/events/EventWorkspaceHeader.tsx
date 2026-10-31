/**
 * @file EventWorkspaceHeader.tsx
 * @description Header component for Event Workspace displaying title, metadata badges,
 * date countdown, and multi-format export actions (.ICS, JSON, Print).
 */

import React from "react";
import {
  Calendar,
  Download,
  Printer,
  MapPin,
  ShieldCheck,
  Crown,
  Cake,
  TreePine,
  Building2,
  Sparkles,
} from "lucide-react";
import { EventPlan } from "@/types";
import { downloadICS } from "@/lib/export/ics";
import { downloadJSON } from "@/lib/export/json";

interface EventWorkspaceHeaderProps {
  event: EventPlan;
}

/**
 * Returns the contextual iconography corresponding to the celebration classification.
 */
function renderEventBadgeIcon(type: string): React.ReactElement {
  switch (type) {
    case "wedding":
      return <Crown className="h-3.5 w-3.5 text-indigo-600" />;
    case "birthday":
      return <Cake className="h-3.5 w-3.5 text-indigo-600" />;
    case "community":
      return <TreePine className="h-3.5 w-3.5 text-indigo-600" />;
    case "corporate":
      return <Building2 className="h-3.5 w-3.5 text-indigo-600" />;
    default:
      return <Sparkles className="h-3.5 w-3.5 text-indigo-600" />;
  }
}

export function EventWorkspaceHeader({ event }: EventWorkspaceHeaderProps): React.ReactElement {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold capitalize px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-500/20">
            {renderEventBadgeIcon(event.eventType)}
            <span>{event.eventType}</span>
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-white/5 px-2.5 py-1 rounded-full">
            <MapPin className="h-3 w-3 text-slate-400" />
            <span>
              {event.city} • Tier {event.cityTier}
            </span>
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
            <span>{event.mode === "ai-enhanced" ? "AI-Enhanced Mode" : "Deterministic Demo Mode"}</span>
          </span>
        </div>

        <h1 className="font-editorial text-3xl sm:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
          {event.title}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
          Target Celebration Date:{" "}
          <strong className="text-slate-800 dark:text-slate-200">{event.date}</strong> • Style Theme:{" "}
          <span className="text-indigo-600 dark:text-indigo-400 font-semibold">
            {event.styleTheme || "Bespoke Contemporary"}
          </span>
        </p>
      </div>

      {/* Export & Actions */}
      <div className="flex flex-wrap items-center gap-2.5">
        <button
          onClick={() => downloadICS(event)}
          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.04] px-4 py-2.5 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
          title="Download iCalendar file (.ics)"
        >
          <Calendar className="h-4 w-4 text-indigo-600" />
          <span>Export .ICS</span>
        </button>

        <button
          onClick={() => downloadJSON(event)}
          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.04] px-4 py-2.5 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
          title="Download full JSON workspace backup"
        >
          <Download className="h-4 w-4 text-violet-600" />
          <span>Export JSON</span>
        </button>

        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.04] px-4 py-2.5 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
          title="Print workspace plan"
        >
          <Printer className="h-4 w-4 text-rose-500" />
          <span>Print Plan</span>
        </button>
      </div>
    </div>
  );
}
