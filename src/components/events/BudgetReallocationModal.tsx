/**
 * @file BudgetReallocationModal.tsx
 * @description Interactive budget shock simulator allowing organizers to model
 * budget cuts or increases with immediate before/after transparent diffs.
 */

import React, { useState } from "react";
import { BudgetReallocationResult, EventPlan } from "@/types";

interface BudgetReallocationModalProps {
  event: EventPlan;
  activeScenarioDiff: BudgetReallocationResult | null;
  onCalculateDiff: (newBudget: number) => void;
  onConfirmReallocation: () => void;
  onCancel: () => void;
}

export function BudgetReallocationModal({
  event,
  activeScenarioDiff,
  onCalculateDiff,
  onConfirmReallocation,
  onCancel,
}: BudgetReallocationModalProps): React.ReactElement {
  const [newBudgetInput, setNewBudgetInput] = useState<number>(event.budget);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-md"
    >
      <div className="rounded-3xl glass-card p-6 sm:p-7 max-w-lg w-full space-y-4 shadow-2xl border border-slate-200 dark:border-white/10">
        <h3 className="font-heading text-lg font-black text-slate-900 dark:text-white">
          Simulate Budget Shock Rebalance
        </h3>
        <p className="text-xs text-slate-600 dark:text-slate-300">
          Adjust your total budget to see deterministic before-and-after reallocations across
          categories while strictly safeguarding the 5-10% contingency safety margin.
        </p>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
            New Target Budget ({event.currency})
          </label>
          <input
            type="number"
            value={newBudgetInput}
            onChange={(e) => setNewBudgetInput(parseInt(e.target.value) || 0)}
            className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/60 px-4 py-2.5 text-sm font-mono font-bold text-slate-900 dark:text-white"
          />
        </div>

        <button
          onClick={() => onCalculateDiff(newBudgetInput)}
          className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-500/25 hover:shadow-indigo-500/40 cursor-pointer"
        >
          Calculate Deterministic Diff
        </button>

        {/* Diff Preview */}
        {activeScenarioDiff && (
          <div className="space-y-3 pt-3 border-t border-slate-200/80 dark:border-white/10 text-xs">
            <p className="text-slate-800 dark:text-slate-200 font-semibold leading-relaxed">
              {activeScenarioDiff.explanation}
            </p>

            <div className="max-h-52 overflow-y-auto space-y-1.5 text-xs">
              {activeScenarioDiff.diffItems.map((item) => (
                <div
                  key={item.category}
                  className="flex justify-between items-center p-2 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/5"
                >
                  <span className="capitalize font-bold text-slate-800 dark:text-slate-200">
                    {item.category}
                  </span>
                  <span className="font-mono">
                    ₹{item.previousPlanned.toLocaleString()} →{" "}
                    <strong className="text-indigo-600 dark:text-indigo-400">
                      ₹{item.newPlanned.toLocaleString()}
                    </strong>
                  </span>
                </div>
              ))}
            </div>

            <div className="flex gap-2.5 pt-2">
              <button
                onClick={onConfirmReallocation}
                className="flex-1 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-emerald-500/20 hover:bg-emerald-700 cursor-pointer"
              >
                Accept & Commit Diff
              </button>
              <button
                onClick={onCancel}
                className="flex-1 rounded-xl border border-slate-200 dark:border-white/10 px-4 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
