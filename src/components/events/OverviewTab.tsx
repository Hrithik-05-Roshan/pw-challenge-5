/**
 * @file OverviewTab.tsx
 * @description Overview tab displaying Readiness Health score, 100% budget strip,
 * and Explainable AI recommendation cards with decision rationale.
 */

import React from "react";
import { Edit3, Sparkles } from "lucide-react";
import { EventPlan } from "@/types";

interface OverviewTabProps {
  event: EventPlan;
  healthScore: number;
  completedTasks: number;
  totalSpentActual: number;
  budgetUtilization: number;
  confirmedGuests: number;
  onOpenReallocateModal: () => void;
  onToggleRecommendation: (recId: string) => void;
}

export function OverviewTab({
  event,
  healthScore,
  completedTasks,
  totalSpentActual,
  budgetUtilization,
  confirmedGuests,
  onOpenReallocateModal,
  onToggleRecommendation,
}: OverviewTabProps): React.ReactElement {
  return (
    <div className="space-y-6 tab-content-active">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Health & Readiness Card */}
        <div className="glass-card rounded-2xl p-6 space-y-4">
          <h2 className="font-heading text-base font-bold text-slate-900 dark:text-white flex items-center justify-between">
            <span>Event Readiness Health</span>
            <span className="text-indigo-600 dark:text-indigo-400 text-xl font-black">
              {healthScore}%
            </span>
          </h2>

          <div className="h-3 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
            <div
              className="bg-gradient-to-r from-indigo-600 via-violet-500 to-rose-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${healthScore}%` }}
            />
          </div>

          <div className="space-y-2.5 text-xs text-slate-500 dark:text-slate-400 pt-1">
            <div className="flex justify-between items-center">
              <span>Completed Action Items</span>
              <span className="font-bold text-slate-900 dark:text-white">
                {completedTasks} / {event.tasks.length}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>Actual Spend Tracked</span>
              <span className="font-bold text-slate-900 dark:text-white">
                ₹{totalSpentActual.toLocaleString()} {event.currency} ({budgetUtilization}%)
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>Confirmed Attendance</span>
              <span className="font-bold text-slate-900 dark:text-white">
                {confirmedGuests} / {event.guests} Guests
              </span>
            </div>
          </div>
        </div>

        {/* 100% Balanced Budget Breakdown */}
        <div className="md:col-span-2 glass-card rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-heading text-base font-bold text-slate-900 dark:text-white">
                Deterministic 100% Budget Distribution
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Mathematically locked: Sum of categories matches total budget with guaranteed 5-10%
                contingency.
              </p>
            </div>
            <button
              onClick={onOpenReallocateModal}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
            >
              <Edit3 className="h-3.5 w-3.5" />
              <span>Rebalance</span>
            </button>
          </div>

          {/* Multi-color category strip */}
          <div className="h-4 w-full rounded-full bg-slate-200 dark:bg-slate-800 flex overflow-hidden p-0.5 gap-0.5">
            {event.budgetItems.map((item, idx) => {
              const pct = (item.plannedAmount / event.budget) * 100;
              const colors = [
                "bg-indigo-600",
                "bg-violet-500",
                "bg-rose-500",
                "bg-amber-500",
                "bg-emerald-500",
                "bg-teal-500",
                "bg-pink-500",
                "bg-blue-500",
              ];
              return (
                <div
                  key={item.id}
                  className={`${colors[idx % colors.length]} h-full transition-all`}
                  style={{ width: `${pct}%` }}
                  title={`${item.name}: ${pct.toFixed(1)}%`}
                />
              );
            })}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs">
            {event.budgetItems.slice(0, 6).map((item, idx) => {
              const borderColors = [
                "border-indigo-500",
                "border-violet-500",
                "border-rose-500",
                "border-amber-500",
                "border-emerald-500",
                "border-teal-500",
              ];
              return (
                <div
                  key={item.id}
                  className={`flex flex-col border-l-2 ${borderColors[idx % borderColors.length]} pl-2.5 py-0.5`}
                >
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 truncate capitalize font-medium">
                    {item.name}
                  </span>
                  <span className="font-heading font-bold text-slate-900 dark:text-white">
                    ₹{item.plannedAmount.toLocaleString()}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Explainable AI Decision Cards */}
      <div className="glass-card rounded-2xl p-6 sm:p-7 space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-heading text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                <Sparkles className="h-4 w-4" />
              </span>
              <span>Explainable Decision Architecture</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Every significant recommendation details rationale, financial trade-offs, and evaluated
              alternatives.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {event.recommendations.map((rec) => (
            <div
              key={rec.id}
              className="rounded-2xl border border-indigo-500/20 bg-slate-50/60 dark:bg-white/[0.03] p-5 flex flex-col justify-between space-y-4 hover:border-indigo-500/40 transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-heading text-sm font-bold text-slate-900 dark:text-white">
                    {rec.title}
                  </h3>
                  <button
                    onClick={() => onToggleRecommendation(rec.id)}
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-full border transition-colors cursor-pointer ${
                      rec.applied
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                        : "bg-slate-100 dark:bg-white/5 text-slate-500 border-slate-200 dark:border-white/10"
                    }`}
                  >
                    {rec.applied ? "Applied" : "Optional"}
                  </button>
                </div>

                <div className="p-3 rounded-xl bg-indigo-500/5 dark:bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-700 dark:text-indigo-300 font-semibold leading-relaxed">
                  &ldquo;{rec.recommendation}&rdquo;
                </div>

                <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  <p>
                    <strong className="text-slate-900 dark:text-white">Reasoning:</strong>{" "}
                    {rec.reasoning}
                  </p>
                  <p>
                    <strong className="text-emerald-600 dark:text-emerald-400">
                      Financial Impact:
                    </strong>{" "}
                    {rec.expectedImpact}
                  </p>
                </div>
              </div>

              <div className="border-t border-slate-200/80 dark:border-white/10 pt-3 text-[11px] text-slate-500 dark:text-slate-400">
                <span className="font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                  Evaluated Alternatives:
                </span>
                <ul className="list-disc list-inside space-y-1">
                  {rec.alternativeOptions.map((opt, i) => (
                    <li key={i}>{opt}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
