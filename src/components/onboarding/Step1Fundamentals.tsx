"use client";

/**
 * @file Step1Fundamentals.tsx
 * @description Wizard Step 1: Celebration archetype, event title, date and style theme presets.
 */

import React from "react";
import { UseFormRegister, UseFormSetValue, FieldErrors } from "react-hook-form";
import { Crown, CalendarDays, Palette } from "lucide-react";
import { CreateEventInput } from "@/lib/validation/schemas";
import { EventType } from "@/types";
import { CELEBRATION_TYPES, THEME_PRESETS } from "@/constants/onboarding";

interface Step1FundamentalsProps {
  register: UseFormRegister<CreateEventInput>;
  setValue: UseFormSetValue<CreateEventInput>;
  selectedType: EventType;
  currentStyleTheme: string;
  errors: FieldErrors<CreateEventInput>;
}

export function Step1Fundamentals({
  register,
  setValue,
  selectedType,
  currentStyleTheme,
  errors,
}: Step1FundamentalsProps): React.ReactElement {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200/70 dark:border-white/10">
        <div className="flex items-center gap-2.5">
          <span className="p-2 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
            <Crown className="h-5 w-5" />
          </span>
          <div>
            <h2 className="font-editorial text-xl font-bold text-slate-900 dark:text-white">
              Step 1: Event Fundamentals
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Select the celebration domain and craft the core host narrative.
            </p>
          </div>
        </div>
      </div>

      {/* Archetype Selector */}
      <div className="space-y-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          Celebration Domain
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {CELEBRATION_TYPES.map((item) => {
            const Icon = item.icon;
            const isSelected = selectedType === item.id;
            return (
              <button
                type="button"
                key={item.id}
                onClick={() => setValue("eventType", item.id, { shouldValidate: true })}
                className={`p-4 rounded-2xl border text-left flex items-start gap-3.5 transition-all cursor-pointer ${
                  isSelected
                    ? "border-indigo-600 bg-indigo-600/10 text-slate-900 dark:text-white ring-2 ring-indigo-500/30 scale-[1.01] shadow-sm"
                    : "border-slate-200 dark:border-white/10 bg-slate-50/60 dark:bg-white/[0.02] text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5"
                }`}
              >
                <div className={`p-2.5 rounded-xl ${isSelected ? "bg-indigo-600 text-white" : "bg-slate-100 dark:bg-white/10 " + item.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-sm font-bold text-slate-900 dark:text-white">{item.label}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{item.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Event Title */}
      <div className="space-y-1.5">
        <label htmlFor="title" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          Celebration Title / Host & Couple Name
        </label>
        <input
          id="title"
          type="text"
          {...register("title")}
          className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/60 px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500 shadow-xs"
          placeholder="e.g. Maya & Kabir's Sunset Nuptials"
        />
        {errors.title && (
          <p className="text-xs text-rose-500 font-semibold">{errors.title.message}</p>
        )}
      </div>

      {/* Target Date */}
      <div className="space-y-1.5">
        <label htmlFor="date" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
          <CalendarDays className="h-3.5 w-3.5 text-indigo-500" />
          <span>Target Celebration Date</span>
        </label>
        <input
          id="date"
          type="date"
          {...register("date")}
          className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/60 px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 shadow-xs"
        />
        {errors.date && (
          <p className="text-xs text-rose-500 font-semibold">{errors.date.message}</p>
        )}
      </div>

      {/* Aesthetic & Vibe Preset Chips */}
      <div className="space-y-2 pt-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
          <Palette className="h-3.5 w-3.5 text-rose-500" />
          <span>Aesthetic Theme / Vibe Presets</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {THEME_PRESETS.map((theme) => {
            const isMatch = currentStyleTheme === theme;
            return (
              <button
                key={theme}
                type="button"
                onClick={() => setValue("styleTheme", theme, { shouldValidate: true })}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isMatch
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "bg-slate-100 dark:bg-white/[0.04] text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200/70 dark:border-white/10"
                }`}
              >
                <span>{theme}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
