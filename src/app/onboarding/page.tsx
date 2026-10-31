"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Heart,
  Sliders,
  DollarSign,
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
    watch,
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

  const selectedType = watch("eventType");
  const selectedPriorities = watch("priorities") || [];
  const currentBudget = watch("budget");
  const currentGuests = watch("guests");
  const currentCurrency = watch("currency");

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

  return (
    <div className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
      {/* Header & Prominent Demo Skip */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-[var(--border)] gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
            Interactive Planning Wizard
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--foreground)] tracking-tight">
            Create Your Celebration
          </h1>
        </div>

        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-500/20 transition-colors"
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span>Skip to Preloaded Demos</span>
        </Link>
      </div>

      {/* Stepper Indicator */}
      <nav aria-label="Wizard Steps" className="my-8">
        <ol className="flex items-center justify-between w-full">
          {[
            { num: 1, label: "Basics" },
            { num: 2, label: "Scale & Budget" },
            { num: 3, label: "Theme & Priorities" },
            { num: 4, label: "Special Needs" },
          ].map((step) => {
            const isDone = currentStep > step.num;
            const isCurrent = currentStep === step.num;
            return (
              <li
                key={step.num}
                className="flex flex-col items-center flex-1 relative text-center"
              >
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                    isCurrent
                      ? "bg-indigo-600 text-white ring-4 ring-indigo-500/20"
                      : isDone
                      ? "bg-emerald-500 text-white"
                      : "bg-[var(--secondary)] text-[var(--muted-foreground)]"
                  }`}
                  aria-current={isCurrent ? "step" : undefined}
                >
                  {isDone ? <CheckCircle2 className="h-4 w-4" /> : step.num}
                </div>
                <span className="text-[11px] font-medium text-[var(--foreground)] mt-2 hidden sm:block">
                  {step.label}
                </span>
              </li>
            );
          })}
        </ol>
      </nav>

      {/* Form Container */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8 shadow-sm">
          {/* STEP 1: BASICS */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <h2 className="text-xl font-bold text-[var(--foreground)] flex items-center gap-2">
                <Heart className="h-5 w-5 text-indigo-600" />
                <span>Step 1: Event Fundamentals</span>
              </h2>

              <div className="space-y-2">
                <label htmlFor="event-type" className="block text-sm font-semibold text-[var(--foreground)]">
                  What celebration are you planning?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: "wedding", label: "Wedding 💍" },
                    { id: "birthday", label: "Birthday 🎂" },
                    { id: "community", label: "Community 🎪" },
                    { id: "corporate", label: "Corporate 🏢" },
                  ].map((item) => (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => setValue("eventType", item.id as EventType, { shouldValidate: true })}
                      className={`py-3 px-3 rounded-xl border text-sm font-medium transition-all text-center ${
                        selectedType === item.id
                          ? "border-indigo-600 bg-indigo-500/10 text-indigo-600 font-bold ring-2 ring-indigo-500/20"
                          : "border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--secondary)]"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="title" className="block text-sm font-semibold text-[var(--foreground)]">
                  Event Title / Couple / Host Name
                </label>
                <input
                  id="title"
                  type="text"
                  {...register("title")}
                  aria-describedby={errors.title ? "title-error" : undefined}
                  className="w-full rounded-lg border border-[var(--input)] bg-[var(--background)] px-3.5 py-2.5 text-sm text-[var(--foreground)] focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g. Maya & Kabir's Sunset Wedding"
                />
                {errors.title && (
                  <p id="title-error" className="text-xs text-rose-500 font-medium">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="date" className="block text-sm font-semibold text-[var(--foreground)]">
                  Event Date
                </label>
                <input
                  id="date"
                  type="date"
                  {...register("date")}
                  aria-describedby={errors.date ? "date-error" : undefined}
                  className="w-full rounded-lg border border-[var(--input)] bg-[var(--background)] px-3.5 py-2.5 text-sm text-[var(--foreground)] focus:ring-2 focus:ring-indigo-500"
                />
                {errors.date && (
                  <p id="date-error" className="text-xs text-rose-500 font-medium">
                    {errors.date.message}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* STEP 2: SCALE & BUDGET */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <h2 className="text-xl font-bold text-[var(--foreground)] flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-indigo-600" />
                <span>Step 2: Location, Scale & Budget</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="city" className="block text-sm font-semibold text-[var(--foreground)]">
                    City / Destination
                  </label>
                  <input
                    id="city"
                    type="text"
                    {...register("city")}
                    className="w-full rounded-lg border border-[var(--input)] bg-[var(--background)] px-3.5 py-2.5 text-sm text-[var(--foreground)] focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g. Kolkata, Bengaluru, Udaipur"
                  />
                  {errors.city && (
                    <p className="text-xs text-rose-500 font-medium">{errors.city.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="cityTier" className="block text-sm font-semibold text-[var(--foreground)]">
                    City Tier Benchmark
                  </label>
                  <select
                    id="cityTier"
                    value={watch("cityTier")}
                    onChange={(e) =>
                      setValue("cityTier", parseInt(e.target.value) as CityTier, { shouldValidate: true })
                    }
                    className="w-full rounded-lg border border-[var(--input)] bg-[var(--background)] px-3.5 py-2.5 text-sm text-[var(--foreground)] focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value={1}>Tier 1 Metro (Mumbai, Delhi, Bengaluru)</option>
                    <option value={2}>Tier 2 Destination (Kolkata, Pune, Jaipur, Goa)</option>
                    <option value={3}>Tier 3 Town / Rural Regional</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="guests" className="block text-sm font-semibold text-[var(--foreground)]">
                    Estimated Guest Headcount
                  </label>
                  <input
                    id="guests"
                    type="number"
                    {...register("guests", { valueAsNumber: true })}
                    className="w-full rounded-lg border border-[var(--input)] bg-[var(--background)] px-3.5 py-2.5 text-sm text-[var(--foreground)] focus:ring-2 focus:ring-indigo-500"
                  />
                  {errors.guests && (
                    <p className="text-xs text-rose-500 font-medium">{errors.guests.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="currency" className="block text-sm font-semibold text-[var(--foreground)]">
                    Currency (Default INR)
                  </label>
                  <select
                    id="currency"
                    {...register("currency")}
                    className="w-full rounded-lg border border-[var(--input)] bg-[var(--background)] px-3.5 py-2.5 text-sm text-[var(--foreground)] focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="INR">INR (₹) - Indian Rupee</option>
                    <option value="USD">USD ($) - US Dollar</option>
                    <option value="EUR">EUR (€) - Euro</option>
                    <option value="GBP">GBP (£) - British Pound</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="budget" className="block text-sm font-semibold text-[var(--foreground)]">
                  Total Planned Budget ({currentCurrency})
                </label>
                <input
                  id="budget"
                  type="number"
                  step="1000"
                  {...register("budget", { valueAsNumber: true })}
                  className="w-full rounded-lg border border-[var(--input)] bg-[var(--background)] px-3.5 py-2.5 text-sm text-[var(--foreground)] focus:ring-2 focus:ring-indigo-500 font-mono text-base"
                />
                <div className="flex justify-between text-xs text-[var(--muted-foreground)]">
                  <span>Minimum ₹1,000</span>
                  <span className="font-semibold text-indigo-600">
                    ≈ {Math.round((currentBudget || 0) / (currentGuests || 1)).toLocaleString()}{" "}
                    {currentCurrency} / guest
                  </span>
                </div>
                {errors.budget && (
                  <p className="text-xs text-rose-500 font-medium">{errors.budget.message}</p>
                )}
              </div>
            </div>
          )}

          {/* STEP 3: THEME & PRIORITIES */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-fadeIn">
              <h2 className="text-xl font-bold text-[var(--foreground)] flex items-center gap-2">
                <Sliders className="h-5 w-5 text-indigo-600" />
                <span>Step 3: Priorities & Aesthetics</span>
              </h2>

              <div className="space-y-2">
                <label htmlFor="styleTheme" className="block text-sm font-semibold text-[var(--foreground)]">
                  Desired Style / Aesthetics Theme (Optional)
                </label>
                <input
                  id="styleTheme"
                  type="text"
                  {...register("styleTheme")}
                  className="w-full rounded-lg border border-[var(--input)] bg-[var(--background)] px-3.5 py-2.5 text-sm text-[var(--foreground)] focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g. Royal Marigold, Neon Glow, Rustic Boho"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-[var(--foreground)]">
                  Select Priority Categories (Higher weight allocated)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {[
                    { id: "catering", label: "Catering & Bar 🍽️" },
                    { id: "venue", label: "Stunning Venue 🏰" },
                    { id: "decor", label: "Florals & Decor 🌺" },
                    { id: "entertainment", label: "Music & Live Acts 🎵" },
                    { id: "photography", label: "Keepsake Photography 📸" },
                    { id: "balanced", label: "Evenly Balanced ⚖️" },
                  ].map((p) => {
                    const isSelected = selectedPriorities.includes(p.id as Priority);
                    return (
                      <button
                        type="button"
                        key={p.id}
                        onClick={() => togglePriority(p.id as Priority)}
                        className={`p-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                          isSelected
                            ? "border-indigo-600 bg-indigo-500/10 text-indigo-600 ring-2 ring-indigo-500/20"
                            : "border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--secondary)]"
                        }`}
                      >
                        {p.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: SPECIAL NEEDS & REVIEW */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-fadeIn">
              <h2 className="text-xl font-bold text-[var(--foreground)] flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-indigo-600" />
                <span>Step 4: Special Requirements & Review</span>
              </h2>

              <div className="space-y-2">
                <label
                  htmlFor="specialRequirements"
                  className="block text-sm font-semibold text-[var(--foreground)]"
                >
                  Special Requirements or Notes (Skippable)
                </label>
                <textarea
                  id="specialRequirements"
                  rows={3}
                  {...register("specialRequirements")}
                  className="w-full rounded-lg border border-[var(--input)] bg-[var(--background)] px-3.5 py-2.5 text-sm text-[var(--foreground)] focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g. Wheelchair access needed, acoustic volume limitations after 10 PM"
                />
              </div>

              {/* Plan Summary Card */}
              <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-4 space-y-2 text-xs">
                <h3 className="font-bold text-sm text-indigo-600 dark:text-indigo-400">
                  Ready to Generate Workspace
                </h3>
                <p className="text-[var(--foreground)]">
                  <strong>{watch("title")}</strong> • {watch("guests")} guests in {watch("city")}
                </p>
                <p className="text-[var(--muted-foreground)]">
                  Total Budget: {currentBudget?.toLocaleString()} {currentCurrency} with guaranteed 100%
                  category balance and 5-10% safety contingency.
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
              className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] px-4 py-2.5 text-sm font-semibold text-[var(--foreground)] hover:bg-[var(--secondary)]"
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
              className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow hover:bg-indigo-700"
            >
              <span>Next</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow hover:bg-indigo-700"
            >
              <Sparkles className="h-4 w-4" />
              <span>Generate Event Workspace</span>
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
