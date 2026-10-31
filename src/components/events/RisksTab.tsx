/**
 * @file RisksTab.tsx
 * @description Contextual Risk & Contingency Matrix displaying likelihood, severity,
 * preventive actions, and day-of backup plans.
 */

import React from "react";
import { AlertTriangle } from "lucide-react";
import { EventPlan } from "@/types";

interface RisksTabProps {
  event: EventPlan;
}

export function RisksTab({ event }: RisksTabProps): React.ReactElement {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading text-xl font-bold text-slate-900 dark:text-white">
          Contextual Risk & Contingency Matrix
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Actionable operational mitigations formulated against weather, density, and supplier
          dependencies.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {event.risks.map((risk) => (
          <div key={risk.id} className="rounded-2xl glass-card p-6 space-y-4">
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-heading text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0" />
                <span>{risk.title}</span>
              </h3>
              <div className="flex gap-1.5">
                <span className="text-[10px] font-bold uppercase px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                  Likelihood: {risk.likelihood}
                </span>
                <span className="text-[10px] font-bold uppercase px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                  Severity: {risk.severity}
                </span>
              </div>
            </div>

            <div className="space-y-2 text-xs leading-relaxed">
              <div className="p-3 rounded-xl bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20">
                <strong className="text-emerald-700 dark:text-emerald-300 block mb-0.5">
                  Preventive Action Plan:
                </strong>
                <span className="text-slate-700 dark:text-slate-200">{risk.preventiveAction}</span>
              </div>
              <div className="p-3 rounded-xl bg-indigo-500/5 dark:bg-indigo-500/10 border border-indigo-500/20">
                <strong className="text-indigo-700 dark:text-indigo-300 block mb-0.5">
                  Day-Of Backup Contingency:
                </strong>
                <span className="text-slate-700 dark:text-slate-200">{risk.backupPlan}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
