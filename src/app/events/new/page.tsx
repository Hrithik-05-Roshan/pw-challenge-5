"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Sparkles,
  ArrowRight,
  Crown,
  Cake,
  TreePine,
  Building2,
  PartyPopper,
  MapPin,
  CalendarDays,
  Users2,
  DollarSign,
} from "lucide-react";
import { CreateEventInputSchema, CreateEventInput } from "@/lib/validation/schemas";
import { useEventStore } from "@/store/useEventStore";
import { EventType } from "@/types";

const DEFAULT_EVENT_DATE = "2026-12-15";

export default function NewEventPage() {
  const router = useRouter();
  const createEvent = useEventStore((s) => s.createEvent);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CreateEventInput>({
    resolver: zodResolver(CreateEventInputSchema),
    defaultValues: {
      title: "",
      eventType: "birthday",
      date: DEFAULT_EVENT_DATE,
      city: "Kolkata",
      cityTier: 2,
      guests: 60,
      budget: 50000,
      currency: "INR",
      styleTheme: "Festive Elegance",
      priorities: ["catering"],
      specialRequirements: "",
    },
  });

  const selectedType = useWatch({ control, name: "eventType" }) || "birthday";

  const onSubmit = (data: CreateEventInput) => {
    const newEvent = createEvent(data);
    router.push(`/events/${newEvent.id}`);
  };

  const eventTypes = [
    { id: "wedding", label: "Wedding", icon: Crown, color: "text-rose-500" },
    { id: "birthday", label: "Birthday", icon: Cake, color: "text-indigo-500" },
    { id: "community", label: "Community", icon: TreePine, color: "text-emerald-500" },
    { id: "corporate", label: "Corporate", icon: Building2, color: "text-violet-500" },
    { id: "other", label: "Other", icon: PartyPopper, color: "text-amber-500" },
  ];

  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto space-y-8 ambient-bg">
      <div className="space-y-2 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold text-indigo-700 dark:text-indigo-300">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Instant Workspace Provisioning</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
          Launch New Celebration
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Instantly generates a mathematically balanced 100% budget, backwards milestone timeline, and contextual risk plan.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-3xl glass-card p-6 sm:p-8 space-y-6 shadow-xl"
      >
        {/* Event Type Grid Selector */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Select Celebration Domain
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {eventTypes.map((item) => {
              const Icon = item.icon;
              const isSelected = selectedType === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setValue("eventType", item.id as EventType, { shouldValidate: true })}
                  className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? "border-indigo-600 bg-indigo-600/10 text-indigo-600 dark:text-white font-bold ring-2 ring-indigo-500/30 scale-105"
                      : "border-slate-200 dark:border-white/10 bg-slate-50/60 dark:bg-white/[0.02] text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5"
                  }`}
                >
                  <Icon className={`h-5 w-5 mb-1.5 ${isSelected ? "text-indigo-600 dark:text-indigo-400" : item.color}`} />
                  <span className="text-xs">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Title Input */}
        <div className="space-y-1.5">
          <label htmlFor="title" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Celebration Name
          </label>
          <input
            id="title"
            type="text"
            {...register("title")}
            placeholder="e.g. Diya's Graduation Soirée, Sharma Family Sangeet"
            className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/60 px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500 shadow-sm"
          />
          {errors.title && <p className="text-xs text-rose-500 font-semibold">{errors.title.message}</p>}
        </div>

        {/* Date & Location */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="date" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5 text-indigo-500" />
              <span>Target Celebration Date</span>
            </label>
            <input
              id="date"
              type="date"
              {...register("date")}
              className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/60 px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 shadow-sm"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="city" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-rose-500" />
              <span>City / Destination</span>
            </label>
            <input
              id="city"
              type="text"
              {...register("city")}
              placeholder="e.g. Mumbai, Udaipur, Kolkata"
              className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/60 px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 shadow-sm"
            />
            {errors.city && <p className="text-xs text-rose-500 font-semibold">{errors.city.message}</p>}
          </div>
        </div>

        {/* Guests & City Tier */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="guests" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Users2 className="h-3.5 w-3.5 text-violet-500" />
              <span>Expected Guest Headcount</span>
            </label>
            <input
              id="guests"
              type="number"
              {...register("guests", { valueAsNumber: true })}
              className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/60 px-4 py-2.5 text-sm font-mono text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 shadow-sm"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="cityTier" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              City Tier Benchmark
            </label>
            <select
              id="cityTier"
              {...register("cityTier", { valueAsNumber: true })}
              className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/60 px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 shadow-sm"
            >
              <option value={1}>Tier 1 Metro (Mumbai, Delhi, Bengaluru)</option>
              <option value={2}>Tier 2 Hub (Kolkata, Pune, Jaipur, Goa)</option>
              <option value={3}>Tier 3 Town / Regional Destination</option>
            </select>
          </div>
        </div>

        {/* Budget & Currency */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="budget" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <DollarSign className="h-3.5 w-3.5 text-emerald-500" />
              <span>Planned Budget</span>
            </label>
            <input
              id="budget"
              type="number"
              step="1000"
              {...register("budget", { valueAsNumber: true })}
              className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/60 px-4 py-2.5 text-sm font-mono font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 shadow-sm"
            />
            {errors.budget && <p className="text-xs text-rose-500 font-semibold">{errors.budget.message}</p>}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="currency" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Currency
            </label>
            <select
              id="currency"
              {...register("currency")}
              className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/60 px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 shadow-sm"
            >
              <option value="INR">INR (₹)</option>
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-600 to-violet-600 px-6 py-4 text-sm font-bold text-white shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
        >
          <Sparkles className="h-4.5 w-4.5" />
          <span>Generate Plan & Open Workspace</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
