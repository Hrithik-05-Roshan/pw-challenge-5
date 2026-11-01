"use client";

/**
 * @file DashboardJudgeScenarios.tsx
 * @description Benchmark scenario testing panel for hackathon evaluator stress-testing.
 */

import React from "react";
import { useRouter } from "next/navigation";
import { Sparkles, Crown, Cake, TreePine, ArrowRight } from "lucide-react";
import { EventPlan } from "@/types";

interface DashboardJudgeScenariosProps {
  events: EventPlan[];
  onLoadJudgeScenario: (scenario: 1 | 2 | 3) => void;
}

export function DashboardJudgeScenarios({
  events,
  onLoadJudgeScenario,
}: DashboardJudgeScenariosProps): React.ReactElement {
  const router = useRouter();

  return (
    <div className="rounded-3xl border border-indigo-500/25 dark:border-indigo-500/35 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent p-7 sm:p-10 shadow-xl backdrop-blur-xl space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-indigo-500/20">
        <div className="flex items-center gap-3.5 text-slate-900 dark:text-white">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-md shadow-indigo-500/30">
            <Sparkles className="h-5 w-5 animate-pulse" />
          </span>
          <div>
            <h2 className="font-editorial font-bold text-xl sm:text-2xl">
              Evaluation Benchmark Scenarios
            </h2>
            <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold block mt-0.5">
              Instant Stress-Testing of Deterministic Pure-Math Rules Engine
            </span>
          </div>
        </div>
        <span className="text-xs bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 px-3.5 py-1.5 rounded-full font-mono font-semibold border border-indigo-500/30">
          1-Click Preloaded Workspaces
        </span>
      </div>

      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
        Test real-world stress conditions with a single click. Observe how our deterministic algorithms adapt budgets, reallocate categories, and compress backwards timelines without hallucination:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
        {/* Scenario 1 */}
        <button
          type="button"
          onClick={() => {
            onLoadJudgeScenario(1);
            const wedding = events.find((e) => e.eventType === "wedding");
            if (wedding) router.push(`/events/${wedding.id}?tab=budget`);
          }}
          className="group flex flex-col justify-between p-6 rounded-2xl glass-card text-left transition-all hover:border-indigo-500/50 hover:shadow-xl cursor-pointer hover:-translate-y-1"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400">
                <Crown className="h-5 w-5" />
              </span>
              <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
                Budget Shock
              </span>
            </div>
            <h3 className="font-editorial text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">
              Scenario 1: Wedding Budget Cut
            </h3>
            <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Fixed Budget Reallocation (25L → 20L)
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Re-normalizes non-critical categories while locking the 7% contingency reserve.
            </p>
          </div>
          <div className="mt-5 pt-3 border-t border-slate-200/60 dark:border-white/5 flex items-center justify-between text-xs font-bold text-indigo-600 dark:text-indigo-400">
            <span>Inspect Budget Diff</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>

        {/* Scenario 2 */}
        <button
          type="button"
          onClick={() => {
            onLoadJudgeScenario(2);
            const bday = events.find((e) => e.eventType === "birthday");
            if (bday) router.push(`/events/${bday.id}?tab=guests`);
          }}
          className="group flex flex-col justify-between p-6 rounded-2xl glass-card text-left transition-all hover:border-indigo-500/50 hover:shadow-xl cursor-pointer hover:-translate-y-1"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                <Cake className="h-5 w-5" />
              </span>
              <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
                Guest Surge
              </span>
            </div>
            <h3 className="font-editorial text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">
              Scenario 2: Birthday Guest Surge
            </h3>
            <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Sudden RSVP Surge (80 → 110 Guests)
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Flags venue capacity warnings and evaluates per-guest catering compression.
            </p>
          </div>
          <div className="mt-5 pt-3 border-t border-slate-200/60 dark:border-white/5 flex items-center justify-between text-xs font-bold text-indigo-600 dark:text-indigo-400">
            <span>Inspect Guest Limits</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>

        {/* Scenario 3 */}
        <button
          type="button"
          onClick={() => {
            onLoadJudgeScenario(3);
            const comm = events.find((e) => e.eventType === "community");
            if (comm) router.push(`/events/${comm.id}?tab=timeline`);
          }}
          className="group flex flex-col justify-between p-6 rounded-2xl glass-card text-left transition-all hover:border-indigo-500/50 hover:shadow-xl cursor-pointer hover:-translate-y-1"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <TreePine className="h-5 w-5" />
              </span>
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
                Timeline Rush
              </span>
            </div>
            <h3 className="font-editorial text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">
              Scenario 3: Date Compression
            </h3>
            <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Eco-Fair (Moved to 12 Days away)
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Triggers backwards timeline compression and flags urgent sound permit tasks.
            </p>
          </div>
          <div className="mt-5 pt-3 border-t border-slate-200/60 dark:border-white/5 flex items-center justify-between text-xs font-bold text-indigo-600 dark:text-indigo-400">
            <span>Inspect Timeline Rush</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>
      </div>
    </div>
  );
}
