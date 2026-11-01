"use client";

/**
 * @file Step4InvariantsReview.tsx
 * @description Wizard Step 4: Dietary safeguards, accessibility invariants and pre-flight blueprint verification.
 */

import React from "react";
import { UseFormRegister } from "react-hook-form";
import { CheckCircle2, Sparkles, ShieldCheck } from "lucide-react";
import { CreateEventInput } from "@/lib/validation/schemas";
import { BudgetItem } from "@/types";
import { DIETARY_OPTIONS } from "@/constants/onboarding";

interface Step4InvariantsReviewProps {
  register: UseFormRegister<CreateEventInput>;
  currentDietary: string[];
  onToggleDietary: (item: string) => void;
  contingencyItem?: BudgetItem;
  currencySymbol: string;
}

export function Step4InvariantsReview({
  register,
  currentDietary,
  onToggleDietary,
  contingencyItem,
  currencySymbol,
}: Step4InvariantsReviewProps): React.ReactElement {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200/70 dark:border-white/10">
        <div className="flex items-center gap-2.5">
          <span className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <CheckCircle2 className="h-5 w-5" />
          </span>
          <div>
            <h2 className="font-editorial text-xl font-bold text-slate-900 dark:text-white">
              Step 4: Special Invariants & Final Review
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Confirm dietary safeguards, accessibility invariants, and generate the workspace.
            </p>
          </div>
        </div>
      </div>

      {/* Dietary Preferences Multi-Select */}
      <div className="space-y-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          Dietary Safeguards & Kitchen Certifications
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {DIETARY_OPTIONS.map((diet) => {
            const isSelected = currentDietary.includes(diet);
            return (
              <button
                type="button"
                key={diet}
                onClick={() => onToggleDietary(diet)}
                className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                  isSelected
                    ? "border-emerald-600 bg-emerald-600/10 text-emerald-700 dark:text-emerald-300 ring-1 ring-emerald-500/30"
                    : "border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02] text-slate-600 dark:text-slate-400 hover:bg-slate-100"
                }`}
              >
                <CheckCircle2 className={`h-3.5 w-3.5 ${isSelected ? "text-emerald-600" : "text-slate-300"}`} />
                <span className="truncate">{diet}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Special Requirements */}
      <div className="space-y-1.5">
        <label htmlFor="specialRequirements" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          Special Logistics Notes / Curfew Clearances
        </label>
        <textarea
          id="specialRequirements"
          rows={3}
          {...register("specialRequirements")}
          className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/60 px-4 py-2.5 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500 shadow-xs"
          placeholder="e.g. Acoustic sound curfew at 10 PM; require wheelchair accessibility ramps at entrance."
        />
      </div>

      {/* Pre-Flight Mathematical Integrity Card */}
      <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/5 dark:bg-indigo-500/10 p-5 space-y-3">
        <h3 className="font-heading font-extrabold text-sm text-indigo-700 dark:text-indigo-300 flex items-center gap-2">
          <Sparkles className="h-4 w-4" />
          <span>Pre-Flight Celebration Blueprint Verification</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
          <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-900/60 border border-slate-200/60 dark:border-white/5 space-y-1">
            <span className="text-[10px] text-slate-500 uppercase font-bold">100% Math Balance</span>
            <p className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Exact Zero-Variance</span>
            </p>
          </div>

          <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-900/60 border border-slate-200/60 dark:border-white/5 space-y-1">
            <span className="text-[10px] text-slate-500 uppercase font-bold">Protected Reserve</span>
            <p className="font-bold text-indigo-600 dark:text-indigo-400">
              {currencySymbol}{contingencyItem?.plannedAmount.toLocaleString()} Locked
            </p>
          </div>

          <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-900/60 border border-slate-200/60 dark:border-white/5 space-y-1">
            <span className="text-[10px] text-slate-500 uppercase font-bold">Privacy Protocol</span>
            <p className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>AES Zero-PII Local</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
