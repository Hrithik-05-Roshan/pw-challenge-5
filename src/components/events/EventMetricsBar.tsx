/**
 * @file EventMetricsBar.tsx
 * @description Quick-glance metrics bar summarizing countdown days, 100% balanced budget,
 * guest headcount scale, and operational readiness health score.
 */

import React from "react";
import { Clock, DollarSign, Users2, Sparkles } from "lucide-react";
import { EventPlan } from "@/types";

interface EventMetricsBarProps {
  event: EventPlan;
  daysRemaining: number;
  confirmedGuests: number;
  healthScore: number;
}

export function EventMetricsBar({
  event,
  daysRemaining,
  confirmedGuests,
  healthScore,
}: EventMetricsBarProps): React.ReactElement {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-5 border-t border-slate-200/70 dark:border-white/10">
      <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/5">
        <span className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
          <Clock className="h-5 w-5" />
        </span>
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Countdown
          </span>
          <p className="font-heading text-lg font-black text-slate-900 dark:text-white">
            {daysRemaining} Days Left
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/5">
        <span className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
          <DollarSign className="h-5 w-5" />
        </span>
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            100% Balanced Budget
          </span>
          <p className="font-heading text-lg font-black text-emerald-600 dark:text-emerald-400">
            ₹{event.budget.toLocaleString()} {event.currency}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/5">
        <span className="p-2.5 rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400">
          <Users2 className="h-5 w-5" />
        </span>
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Guest Scale
          </span>
          <p className="font-heading text-lg font-black text-slate-900 dark:text-white">
            {event.guests} Planned ({confirmedGuests} Confirmed)
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/5">
        <span className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
          <Sparkles className="h-5 w-5" />
        </span>
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Health Readiness
          </span>
          <p className="font-heading text-lg font-black text-amber-500">{healthScore}% Ready</p>
        </div>
      </div>
    </div>
  );
}
