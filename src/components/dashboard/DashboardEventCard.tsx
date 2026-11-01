"use client";

/**
 * @file DashboardEventCard.tsx
 * @description Individual celebration portfolio card with metrics, progress bar and quick actions.
 */

import React from "react";
import Link from "next/link";
import {
  Clock,
  Copy,
  Trash2,
  ExternalLink,
  Crown,
  Cake,
  TreePine,
  Building2,
  Sparkles,
} from "lucide-react";
import { EventPlan } from "@/types";

interface DashboardEventCardProps {
  event: EventPlan;
  daysRemaining: number;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
  onSelect: (id: string) => void;
}

function renderEventTypeIcon(type: string): React.ReactElement {
  switch (type) {
    case "wedding":
      return <Crown className="h-4 w-4" />;
    case "birthday":
      return <Cake className="h-4 w-4" />;
    case "community":
      return <TreePine className="h-4 w-4" />;
    case "corporate":
      return <Building2 className="h-4 w-4" />;
    default:
      return <Sparkles className="h-4 w-4" />;
  }
}

export function DashboardEventCard({
  event,
  daysRemaining,
  onDuplicate,
  onDelete,
  onSelect,
}: DashboardEventCardProps): React.ReactElement {
  const completedTasks = event.tasks.filter((t) => t.completed).length;
  const progress =
    event.tasks.length > 0 ? Math.round((completedTasks / event.tasks.length) * 100) : 0;

  return (
    <div className="group flex flex-col justify-between rounded-3xl glass-card p-7 sm:p-8 space-y-6 hover:border-indigo-500/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5">
      <div className="space-y-5">
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold capitalize px-3.5 py-1.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
            {renderEventTypeIcon(event.eventType)}
            <span>{event.eventType}</span>
          </span>

          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            <span>{daysRemaining}d Left</span>
          </span>
        </div>

        {/* Title & Metadata */}
        <div>
          <h2 className="font-editorial text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">
            {event.title}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 font-medium">
            {event.city} • {event.guests} Guests • Tier {event.cityTier}
          </p>
        </div>

        {/* Budget Highlight */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/70 dark:border-white/5 space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500 dark:text-slate-400 font-medium">Total Allocated Budget</span>
            <span className="font-display font-extrabold text-base text-slate-900 dark:text-white">
              ₹{event.budget.toLocaleString()} {event.currency}
            </span>
          </div>

          <div className="flex items-center justify-between text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
            <span>100% Balanced</span>
            <span>5-10% Contingency Safe</span>
          </div>
        </div>

        {/* Task Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 font-medium">
            <span>Milestone Progress</span>
            <span className="font-bold text-slate-900 dark:text-white">{progress}%</span>
          </div>
          <div className="h-2.5 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
            <div
              className="bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Card Actions */}
      <div className="pt-5 border-t border-slate-200/60 dark:border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => onDuplicate(event.id)}
            className="p-2.5 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
            title="Duplicate Event"
            aria-label={`Duplicate ${event.title}`}
          >
            <Copy className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => onDelete(event.id)}
            className="p-2.5 rounded-xl text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
            title="Delete Event"
            aria-label={`Delete ${event.title}`}
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        <Link
          href={`/events/${event.id}`}
          onClick={() => onSelect(event.id)}
          className="inline-flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 px-3 py-2 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition-colors group/btn"
        >
          <span>Open Workspace</span>
          <ExternalLink className="h-3.5 w-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
