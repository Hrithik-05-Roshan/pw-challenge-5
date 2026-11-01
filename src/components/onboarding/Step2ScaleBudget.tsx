"use client";

/**
 * @file Step2ScaleBudget.tsx
 * @description Wizard Step 2: City tier heuristics, guest headcount, currency and budget configuration.
 */

import React from "react";
import { UseFormRegister, UseFormSetValue, FieldErrors } from "react-hook-form";
import { DollarSign, MapPin, Users2 } from "lucide-react";
import { CreateEventInput } from "@/lib/validation/schemas";
import { CityTier } from "@/types";
import { QUICK_BUDGET_PRESETS } from "@/constants/onboarding";

interface Step2ScaleBudgetProps {
  register: UseFormRegister<CreateEventInput>;
  setValue: UseFormSetValue<CreateEventInput>;
  currentCityTier: number;
  currentGuests: number;
  currentCurrency: string;
  costPerGuest: number;
  currencySymbol: string;
  errors: FieldErrors<CreateEventInput>;
}

export function Step2ScaleBudget({
  register,
  setValue,
  currentCityTier,
  currentGuests,
  currentCurrency,
  costPerGuest,
  currencySymbol,
  errors,
}: Step2ScaleBudgetProps): React.ReactElement {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200/70 dark:border-white/10">
        <div className="flex items-center gap-2.5">
          <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <DollarSign className="h-5 w-5" />
          </span>
          <div>
            <h2 className="font-editorial text-xl font-bold text-slate-900 dark:text-white">
              Step 2: Location, Scale & Budget
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Configure geographic tier heuristics, guest scale, and total financial allocation.
            </p>
          </div>
        </div>
      </div>

      {/* Destination City & Tier */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label htmlFor="city" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-rose-500" />
            <span>City / Destination</span>
          </label>
          <input
            id="city"
            type="text"
            {...register("city")}
            className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/60 px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 shadow-xs"
            placeholder="e.g. Udaipur, Kolkata, Mumbai"
          />
          {errors.city && (
            <p className="text-xs text-rose-500 font-semibold">{errors.city.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="cityTier" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            City Tier Benchmark
          </label>
          <select
            id="cityTier"
            value={currentCityTier}
            onChange={(e) =>
              setValue("cityTier", parseInt(e.target.value) as CityTier, { shouldValidate: true })
            }
            className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/60 px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 shadow-xs"
          >
            <option value={1}>Tier 1 Metro (Mumbai, Delhi, Bengaluru)</option>
            <option value={2}>Tier 2 Hub (Udaipur, Kolkata, Jaipur, Goa)</option>
            <option value={3}>Tier 3 Town / Regional Destination</option>
          </select>
        </div>
      </div>

      {/* Guests & Currency */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label htmlFor="guests" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Users2 className="h-3.5 w-3.5 text-violet-500" />
              <span>Guest Headcount</span>
            </span>
            <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">{currentGuests} guests</span>
          </label>
          <input
            id="guests"
            type="number"
            min="2"
            max="10000"
            {...register("guests", { valueAsNumber: true })}
            className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/60 px-4 py-2.5 text-sm font-mono text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 shadow-xs"
          />
          <input
            type="range"
            min="20"
            max="1000"
            step="10"
            value={currentGuests || 150}
            aria-label="Guest count slider"
            onChange={(e) => setValue("guests", parseInt(e.target.value), { shouldValidate: true })}
            className="w-full accent-indigo-600 cursor-pointer"
          />
          {errors.guests && (
            <p className="text-xs text-rose-500 font-semibold">{errors.guests.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="currency" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Currency Format
          </label>
          <select
            id="currency"
            {...register("currency")}
            className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/60 px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 shadow-xs"
          >
            <option value="INR">INR (₹) - Indian Rupee</option>
            <option value="USD">USD ($) - US Dollar</option>
            <option value="EUR">EUR (€) - Euro</option>
            <option value="GBP">GBP (£) - British Pound</option>
          </select>
        </div>
      </div>

      {/* Planned Budget with Quick Chips */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label htmlFor="budget" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <DollarSign className="h-3.5 w-3.5 text-emerald-500" />
            <span>Total Planned Budget ({currentCurrency})</span>
          </label>
          <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">
            ≈ {currencySymbol}{costPerGuest.toLocaleString()} / guest
          </span>
        </div>

        <input
          id="budget"
          type="number"
          step="1000"
          {...register("budget", { valueAsNumber: true })}
          className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/60 px-4 py-3 text-base font-mono font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 shadow-xs"
        />

        {/* Quick Budget Chips */}
        <div className="flex flex-wrap gap-2 pt-1">
          {QUICK_BUDGET_PRESETS.map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => setValue("budget", preset.amount, { shouldValidate: true })}
              className="text-xs px-3 py-1 rounded-xl bg-slate-100 dark:bg-white/[0.04] hover:bg-emerald-500/10 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 border border-slate-200/80 dark:border-white/10 transition-all cursor-pointer font-mono"
            >
              {preset.label}
            </button>
          ))}
        </div>

        {errors.budget && (
          <p className="text-xs text-rose-500 font-semibold">{errors.budget.message}</p>
        )}
      </div>
    </div>
  );
}
