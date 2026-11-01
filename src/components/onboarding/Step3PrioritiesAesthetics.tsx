"use client";

/**
 * @file Step3PrioritiesAesthetics.tsx
 * @description Wizard Step 3: Priority category allocation weights, venue setting and dining style preferences.
 */

import React from "react";
import { UseFormSetValue, Control } from "react-hook-form";
import { Sliders, Tent, Wine } from "lucide-react";
import { CreateEventInput } from "@/lib/validation/schemas";
import { Priority } from "@/types";
import { PRIORITY_OPTIONS, VENUE_PRESETS, DINING_PRESETS } from "@/constants/onboarding";

interface Step3PrioritiesAestheticsProps {
  selectedPriorities: Priority[];
  onTogglePriority: (priority: Priority) => void;
  setValue: UseFormSetValue<CreateEventInput>;
  control: Control<CreateEventInput>;
}

export function Step3PrioritiesAesthetics({
  selectedPriorities,
  onTogglePriority,
  setValue,
  control,
}: Step3PrioritiesAestheticsProps): React.ReactElement {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200/70 dark:border-white/10">
        <div className="flex items-center gap-2.5">
          <span className="p-2 rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400">
            <Sliders className="h-5 w-5" />
          </span>
          <div>
            <h2 className="font-editorial text-xl font-bold text-slate-900 dark:text-white">
              Step 3: Priorities, Venue & Dining
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Dynamically weight category budgets and define celebration ambiance.
            </p>
          </div>
        </div>
      </div>

      {/* Priority Category Buttons */}
      <div className="space-y-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          Select Priority Categories (Higher dynamic weight allocation)
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {PRIORITY_OPTIONS.map((p) => {
            const Icon = p.icon;
            const isSelected = selectedPriorities.includes(p.id);
            return (
              <button
                type="button"
                key={p.id}
                onClick={() => onTogglePriority(p.id)}
                className={`p-3.5 rounded-2xl border text-xs font-bold flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                  isSelected
                    ? "border-indigo-600 bg-indigo-600/10 text-indigo-600 dark:text-white ring-2 ring-indigo-500/30 scale-[1.02] shadow-xs"
                    : "border-slate-200 dark:border-white/10 bg-slate-50/60 dark:bg-white/[0.02] text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5"
                }`}
              >
                <Icon className={`h-5 w-5 mb-1.5 ${isSelected ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400"}`} />
                <span className="font-semibold">{p.label}</span>
                <span className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">{p.desc}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Venue Setting Preference */}
      <div className="space-y-2 pt-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
          <Tent className="h-3.5 w-3.5 text-amber-500" />
          <span>Venue Ambience Preference</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {VENUE_PRESETS.map((venue) => (
            <button
              key={venue}
              type="button"
              onClick={() => {
                const curNotes = (control._formValues.specialRequirements || "").replace(/Venue Setting: [^;]+;? ?/, "");
                setValue("specialRequirements", `Venue Setting: ${venue}; ${curNotes}`.trim());
              }}
              className="px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-100 dark:bg-white/[0.04] text-slate-700 dark:text-slate-300 hover:bg-indigo-500/10 hover:text-indigo-600 border border-slate-200/80 dark:border-white/10 transition-all cursor-pointer"
            >
              {venue}
            </button>
          ))}
        </div>
      </div>

      {/* Dining Style Preference */}
      <div className="space-y-2 pt-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
          <Wine className="h-3.5 w-3.5 text-rose-500" />
          <span>Culinary & Hospitality Style</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {DINING_PRESETS.map((dining) => (
            <button
              key={dining}
              type="button"
              onClick={() => {
                const curNotes = (control._formValues.specialRequirements || "").replace(/Dining Style: [^;]+;? ?/, "");
                setValue("specialRequirements", `Dining Style: ${dining}; ${curNotes}`.trim());
              }}
              className="px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-100 dark:bg-white/[0.04] text-slate-700 dark:text-slate-300 hover:bg-rose-500/10 hover:text-rose-600 border border-slate-200/80 dark:border-white/10 transition-all cursor-pointer"
            >
              {dining}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
