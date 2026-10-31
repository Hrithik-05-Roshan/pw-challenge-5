"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sliders,
  DollarSign,
  Crown,
  Cake,
  TreePine,
  Building2,
  Utensils,
  Store,
  Palette,
  Music,
  Camera,
  Scale,
  MapPin,
  CalendarDays,
  Users2,
  Compass,
} from "lucide-react";
import { CreateEventInputSchema, CreateEventInput } from "@/lib/validation/schemas";
import { useEventStore } from "@/store/useEventStore";
import { EventType, Priority, CityTier } from "@/types";

const DEFAULT_ONBOARDING_DATE = "2027-01-15";

export default function OnboardingPage() {
  const router = useRouter();
  const createEvent = useEventStore((s) => s.createEvent);

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<CreateEventInput>({
    resolver: zodResolver(CreateEventInputSchema),
    mode: "onChange",
    defaultValues: {
      title: "My Dream Celebration",
      eventType: "wedding",
      date: DEFAULT_ONBOARDING_DATE,
      city: "Mumbai",
      cityTier: 1,
      guests: 150,
      budget: 500000,
      currency: "INR",
      styleTheme: "Contemporary Botanical",
      priorities: ["catering", "venue"],
      dietaryPreferences: ["Vegetarian", "Vegan Options"],
      specialRequirements: "",
    },
  });

  const selectedType = useWatch({ control, name: "eventType" }) || "wedding";
  const selectedPriorities = useWatch({ control, name: "priorities" }) || [];
  const currentBudget = useWatch({ control, name: "budget" }) || 500000;
  const currentGuests = useWatch({ control, name: "guests" }) || 150;
  const currentCurrency = useWatch({ control, name: "currency" }) || "INR";
  const currentCityTier = useWatch({ control, name: "cityTier" }) || 1;
  const currentTitle = useWatch({ control, name: "title" }) || "My Dream Celebration";
  const currentCity = useWatch({ control, name: "city" }) || "Mumbai";

  const togglePriority = (p: Priority) => {
    const exists = selectedPriorities.includes(p);
    let next: Priority[];
    if (exists) {
      next = selectedPriorities.filter((item) => item !== p);
      if (next.length === 0) next = ["balanced"];
    } else {
      next = [...selectedPriorities.filter((item) => item !== "balanced"), p];
    }
    setValue("priorities", next, { shouldValidate: true });
  };

  const onSubmit = (data: CreateEventInput) => {
    const newEvent = createEvent(data);
    router.push(`/events/${newEvent.id}`);
  };

  const celebrationTypes = [
    { id: "wedding", label: "Wedding", icon: Crown, color: "text-rose-500" },
    { id: "birthday", label: "Birthday", icon: Cake, color: "text-indigo-500" },
    { id: "community", label: "Community", icon: TreePine, color: "text-emerald-500" },
    { id: "corporate", label: "Corporate", icon: Building2, color: "text-violet-500" },
  ];

  const priorityOptions = [
    { id: "catering", label: "Catering & Bar", icon: Utensils },
    { id: "venue", label: "Stunning Venue", icon: Store },
    { id: "decor", label: "Florals & Decor", icon: Palette },
    { id: "entertainment", label: "Music & Live Acts", icon: Music },
    { id: "photography", label: "Keepsake Photography", icon: Camera },
    { id: "balanced", label: "Evenly Balanced", icon: Scale },
  ];

  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto ambient-bg">
      {/* Header & Prominent Demo Skip */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-slate-200/80 dark:border-white/10 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Interactive Planning Wizard</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Create Your Celebration
          </h1>
        </div>

        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-xl border border-indigo-500/30 bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-500/20 transition-all shadow-sm"
        >
          <Compass className="h-4 w-4" />
          <span>Skip to Preloaded Demos</span>
        </Link>
      </div>

      {/* Stepper Indicator */}
      <nav aria-label="Wizard Steps" className="my-8">
        <ol className="flex items-center justify-between w-full">
          {[
            { num: 1, label: "Basics" },
            { num: 2, label: "Scale & Budget" },
            { num: 3, label: "Priorities" },
            { num: 4, label: "Review" },
          ].map((step) => {
            const isDone = currentStep > step.num;
            const isCurrent = currentStep === step.num;
            return (
              <li
                key={step.num}
                className="flex flex-col items-center flex-1 relative text-center"
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-2xl text-xs font-bold transition-all shadow-sm ${
                    isCurrent
                      ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white ring-4 ring-indigo-500/20 scale-110 shadow-indigo-500/30"
                      : isDone
                      ? "bg-emerald-500 text-white"
                      : "bg-slate-100 dark:bg-white/10 text-slate-500"
                  }`}
                  aria-current={isCurrent ? "step" : undefined}
                >
                  {isDone ? <CheckCircle2 className="h-5 w-5" /> : step.num}
                </div>
                <span className="font-heading text-xs font-bold text-slate-800 dark:text-slate-200 mt-2 hidden sm:block">
                  {step.label}
                </span>
              </li>
            );
          })}
        </ol>
      </nav>

      {/* Form Container */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="rounded-3xl glass-card p-6 sm:p-8 shadow-xl">
          {/* STEP 1: BASICS */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="font-heading text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
                <span className="p-2 rounded-xl bg-indigo-500/10 text-indigo-600">
                  <Crown className="h-5 w-5" />
                </span>
                <span>Step 1: Event Fundamentals</span>
              </h2>

              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  What celebration are you planning?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {celebrationTypes.map((item) => {
                    const Icon = item.icon;
                    const isSelected = selectedType === item.id;
                    return (
                      <button
                        type="button"
                        key={item.id}
                        onClick={() => setValue("eventType", item.id as EventType, { shouldValidate: true })}
                        className={`p-4 rounded-2xl border flex flex-col items-center justify-center transition-all cursor-pointer ${
                          isSelected
                            ? "border-indigo-600 bg-indigo-600/10 text-indigo-600 dark:text-white font-bold ring-2 ring-indigo-500/30 scale-105 shadow-sm"
                            : "border-slate-200 dark:border-white/10 bg-slate-50/60 dark:bg-white/[0.02] text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5"
                        }`}
                      >
                        <Icon className={`h-6 w-6 mb-2 ${isSelected ? "text-indigo-600 dark:text-indigo-400" : item.color}`} />
                        <span className="text-xs font-semibold">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="title" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Event Title / Couple / Host Name
                </label>
                <input
                  id="title"
                  type="text"
                  {...register("title")}
                  aria-describedby={errors.title ? "title-error" : undefined}
                  className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/60 px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500 shadow-sm"
                  placeholder="e.g. Maya & Kabir's Sunset Wedding"
                />
                {errors.title && (
                  <p id="title-error" className="text-xs text-rose-500 font-semibold">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label htmlFor="date" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <CalendarDays className="h-3.5 w-3.5 text-indigo-500" />
                  <span>Target Celebration Date</span>
                </label>
                <input
                  id="date"
                  type="date"
                  {...register("date")}
                  aria-describedby={errors.date ? "date-error" : undefined}
                  className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/60 px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 shadow-sm"
                />
                {errors.date && (
                  <p id="date-error" className="text-xs text-rose-500 font-semibold">
                    {errors.date.message}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* STEP 2: SCALE & BUDGET */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="font-heading text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
                <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600">
                  <DollarSign className="h-5 w-5" />
                </span>
                <span>Step 2: Location, Scale & Budget</span>
              </h2>

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
                    className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/60 px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 shadow-sm"
                    placeholder="e.g. Kolkata, Bengaluru, Udaipur"
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
                    className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/60 px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 shadow-sm"
                  >
                    <option value={1}>Tier 1 Metro (Mumbai, Delhi, Bengaluru)</option>
                    <option value={2}>Tier 2 Hub (Kolkata, Pune, Jaipur, Goa)</option>
                    <option value={3}>Tier 3 Town / Regional Destination</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="guests" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Users2 className="h-3.5 w-3.5 text-violet-500" />
                    <span>Estimated Guest Headcount</span>
                  </label>
                  <input
                    id="guests"
                    type="number"
                    {...register("guests", { valueAsNumber: true })}
                    className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/60 px-4 py-2.5 text-sm font-mono text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 shadow-sm"
                  />
                  {errors.guests && (
                    <p className="text-xs text-rose-500 font-semibold">{errors.guests.message}</p>
                  )}
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
                    <option value="INR">INR (₹) - Indian Rupee</option>
                    <option value="USD">USD ($) - US Dollar</option>
                    <option value="EUR">EUR (€) - Euro</option>
                    <option value="GBP">GBP (£) - British Pound</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="budget" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <DollarSign className="h-3.5 w-3.5 text-emerald-500" />
                  <span>Total Planned Budget ({currentCurrency})</span>
                </label>
                <input
                  id="budget"
                  type="number"
                  step="1000"
                  {...register("budget", { valueAsNumber: true })}
                  className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/60 px-4 py-3 text-base font-mono font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 shadow-sm"
                />
                <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 pt-1">
                  <span>Minimum ₹1,000</span>
                  <span className="font-bold text-indigo-600 dark:text-indigo-400">
                    ≈ ₹{Math.round((currentBudget || 0) / (currentGuests || 1)).toLocaleString()}{" "}
                    {currentCurrency} / guest
                  </span>
                </div>
                {errors.budget && (
                  <p className="text-xs text-rose-500 font-semibold">{errors.budget.message}</p>
                )}
              </div>
            </div>
          )}

          {/* STEP 3: THEME & PRIORITIES */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="font-heading text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
                <span className="p-2 rounded-xl bg-violet-500/10 text-violet-600">
                  <Sliders className="h-5 w-5" />
                </span>
                <span>Step 3: Priorities & Aesthetics</span>
              </h2>

              <div className="space-y-1.5">
                <label htmlFor="styleTheme" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Desired Style / Aesthetics Theme (Optional)
                </label>
                <input
                  id="styleTheme"
                  type="text"
                  {...register("styleTheme")}
                  className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/60 px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500 shadow-sm"
                  placeholder="e.g. Royal Marigold, Neon Retro, Rustic Botanical"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Select Priority Categories (Higher weight dynamically allocated)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {priorityOptions.map((p) => {
                    const Icon = p.icon;
                    const isSelected = selectedPriorities.includes(p.id as Priority);
                    return (
                      <button
                        type="button"
                        key={p.id}
                        onClick={() => togglePriority(p.id as Priority)}
                        className={`p-3.5 rounded-2xl border text-xs font-bold flex flex-col items-center justify-center transition-all cursor-pointer ${
                          isSelected
                            ? "border-indigo-600 bg-indigo-600/10 text-indigo-600 dark:text-white ring-2 ring-indigo-500/30 scale-105 shadow-sm"
                            : "border-slate-200 dark:border-white/10 bg-slate-50/60 dark:bg-white/[0.02] text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5"
                        }`}
                      >
                        <Icon className={`h-5 w-5 mb-1.5 ${isSelected ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400"}`} />
                        <span>{p.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: SPECIAL NEEDS & REVIEW */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="font-heading text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
                <span className="p-2 rounded-xl bg-amber-500/10 text-amber-600">
                  <Sparkles className="h-5 w-5" />
                </span>
                <span>Step 4: Special Requirements & Review</span>
              </h2>

              <div className="space-y-1.5">
                <label
                  htmlFor="specialRequirements"
                  className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300"
                >
                  Special Requirements or Notes (Skippable)
                </label>
                <textarea
                  id="specialRequirements"
                  rows={3}
                  {...register("specialRequirements")}
                  className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/60 px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500 shadow-sm"
                  placeholder="e.g. Need backup acoustic generator for outdoor garden curfew; Jain vegetarian options for 40 guests."
                />
              </div>

              {/* Plan Summary Card */}
              <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/5 dark:bg-indigo-500/10 p-5 space-y-2.5 text-xs">
                <h3 className="font-heading font-extrabold text-sm text-indigo-700 dark:text-indigo-300 flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  <span>Ready to Provision Celebration Workspace</span>
                </h3>
                <p className="text-slate-900 dark:text-white font-medium">
                  <strong>{currentTitle}</strong> • {currentGuests} guests in {currentCity} (Tier {currentCityTier})
                </p>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Total Planned Budget: <strong className="text-emerald-600 dark:text-emerald-400 font-mono">₹{currentBudget?.toLocaleString()} {currentCurrency}</strong> with guaranteed 100% mathematical balance and 5-10% contingency reserve locked.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Wizard Controls */}
        <div className="flex items-center justify-between pt-2">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={() => setCurrentStep((s) => s - 1)}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.04] px-5 py-3 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-all cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {currentStep < totalSteps ? (
            <button
              type="button"
              onClick={() => setCurrentStep((s) => s + 1)}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-3 text-xs font-bold text-white shadow-md shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all cursor-pointer"
            >
              <span>Continue</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-600 to-violet-600 px-7 py-3.5 text-xs font-bold text-white shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/45 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <Sparkles className="h-4 w-4" />
              <span>Generate Celebration Workspace</span>
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
