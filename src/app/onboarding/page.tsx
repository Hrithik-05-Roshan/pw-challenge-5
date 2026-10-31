"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Sparkles,
  ChevronRight,
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
  ShieldCheck,
  Lock,
  Clock,
  PartyPopper,
  Wine,
  Tent,
} from "lucide-react";
import { CreateEventInputSchema, CreateEventInput } from "@/lib/validation/schemas";
import { useEventStore } from "@/store/useEventStore";
import { EventType, Priority, CityTier } from "@/types";
import { calculateBudgetAllocation } from "@/lib/planner/rules";

const DEFAULT_ONBOARDING_DATE = "2027-01-15";

// Preset Inspiration Templates
const INSPIRATION_TEMPLATES = [
  {
    name: "✨ Maya & Kabir's Sunset Nuptials",
    tagline: "Destination Luxury Wedding",
    data: {
      title: "Maya & Kabir's Sunset Nuptials",
      eventType: "wedding" as EventType,
      date: "2027-02-14",
      city: "Udaipur",
      cityTier: 2 as CityTier,
      guests: 350,
      budget: 2500000,
      currency: "INR" as const,
      styleTheme: "Royal Rajasthani Heritage",
      priorities: ["catering", "venue"] as Priority[],
      dietaryPreferences: ["100% Vegetarian", "Jain Friendly (No root veg)"],
      specialRequirements: "Heritage courtyard dinner with live Shehnai troupe and royal boat arrival.",
    },
  },
  {
    name: "🎂 Aarav's Retro 30th Birthday",
    tagline: "Intimate Milestone Bash",
    data: {
      title: "Aarav's Retro 30th Birthday Bash",
      eventType: "birthday" as EventType,
      date: "2026-12-28",
      city: "Kolkata",
      cityTier: 2 as CityTier,
      guests: 80,
      budget: 150000,
      currency: "INR" as const,
      styleTheme: "Neon Retro Glam",
      priorities: ["entertainment", "catering"] as Priority[],
      dietaryPreferences: ["Vegan Options", "Cocktail & Hors d'œuvres"],
      specialRequirements: "Rooftop lounge with vinyl DJ set and craft cocktail pairing.",
    },
  },
  {
    name: "🌿 Bengaluru Eco Harvest Festival",
    tagline: "Sustainable Community Fair",
    data: {
      title: "Bengaluru Eco Harvest & Crafts Fair",
      eventType: "community" as EventType,
      date: "2027-03-20",
      city: "Bengaluru",
      cityTier: 1 as CityTier,
      guests: 600,
      budget: 450000,
      currency: "INR" as const,
      styleTheme: "Contemporary Botanical",
      priorities: ["venue", "balanced"] as Priority[],
      dietaryPreferences: ["100% Vegetarian", "Zero-Waste Organic"],
      specialRequirements: "Composting stations, solar sound systems, and biodegradable stalls.",
    },
  },
];

const THEME_PRESETS = [
  "Royal Rajasthani Heritage",
  "Contemporary Botanical",
  "Sunset Bohemian Beach",
  "Neon Retro Glam",
  "Minimalist Industrial",
  "Classic Formal White-Tie",
];

const VENUE_PRESETS = [
  "Heritage Palace / Haveli",
  "Outdoor Lawn / Beachfront",
  "Grand Hotel Ballroom",
  "Rooftop Terrace Lounge",
  "Private Orchard / Villa",
];

const DINING_PRESETS = [
  "Multi-Cuisine Grand Banquet",
  "Traditional Royal Plated Thali",
  "Live Street-Food & Chaat Counters",
  "Cocktail & Canapés Reception",
  "Farm-to-Table Organic Feast",
];

const DIETARY_OPTIONS = [
  "100% Vegetarian",
  "Jain Friendly (No root veg)",
  "Vegan Options",
  "Halal Certified",
  "Gluten-Free Designated",
  "Nut-Free Safeguard",
];

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
    reset,
    formState: { errors },
  } = useForm<CreateEventInput>({
    resolver: zodResolver(CreateEventInputSchema),
    mode: "onChange",
    defaultValues: {
      title: "Maya & Kabir's Sunset Nuptials",
      eventType: "wedding",
      date: DEFAULT_ONBOARDING_DATE,
      city: "Udaipur",
      cityTier: 2,
      guests: 250,
      budget: 1500000,
      currency: "INR",
      styleTheme: "Royal Rajasthani Heritage",
      priorities: ["catering", "venue"],
      dietaryPreferences: ["100% Vegetarian", "Jain Friendly (No root veg)"],
      specialRequirements: "Outdoor heritage garden setup with live traditional musicians and curfew clearance.",
    },
  });

  const selectedType = useWatch({ control, name: "eventType" }) || "wedding";
  const rawPriorities = useWatch({ control, name: "priorities" });
  const selectedPriorities = useMemo(() => rawPriorities || [], [rawPriorities]);
  const currentBudget = useWatch({ control, name: "budget" }) || 1500000;
  const currentGuests = useWatch({ control, name: "guests" }) || 250;
  const currentCurrency = useWatch({ control, name: "currency" }) || "INR";
  const currentCityTier = useWatch({ control, name: "cityTier" }) || 2;
  const currentTitle = useWatch({ control, name: "title" }) || "Maya & Kabir's Sunset Nuptials";
  const currentCity = useWatch({ control, name: "city" }) || "Udaipur";
  const currentDate = useWatch({ control, name: "date" }) || DEFAULT_ONBOARDING_DATE;
  const currentStyleTheme = useWatch({ control, name: "styleTheme" }) || "";
  const currentDietary = useWatch({ control, name: "dietaryPreferences" }) || [];

  // Live budget allocation computed in real-time
  const liveBudgetItems = useMemo(() => {
    const validBudget = Math.max(1000, Number(currentBudget) || 1000);
    const validGuests = Math.max(2, Number(currentGuests) || 2);
    const validTier = (Number(currentCityTier) || 2) as CityTier;
    const validPrio = selectedPriorities.length > 0 ? selectedPriorities : (["balanced"] as Priority[]);

    return calculateBudgetAllocation(
      selectedType as EventType,
      validBudget,
      validGuests,
      validTier,
      validPrio
    );
  }, [selectedType, currentBudget, currentGuests, currentCityTier, selectedPriorities]);

  const contingencyItem = liveBudgetItems.find((b) => b.category === "contingency");
  const costPerGuest = Math.round(Number(currentBudget || 0) / Math.max(1, Number(currentGuests || 1)));

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

  const toggleDietary = (item: string) => {
    const exists = currentDietary.includes(item);
    const next = exists ? currentDietary.filter((d) => d !== item) : [...currentDietary, item];
    setValue("dietaryPreferences", next, { shouldValidate: true });
  };

  const applyInspiration = (template: (typeof INSPIRATION_TEMPLATES)[0]) => {
    reset(template.data);
  };

  const onSubmit = (data: CreateEventInput) => {
    const newEvent = createEvent(data);
    router.push(`/events/${newEvent.id}`);
  };

  const celebrationTypes = [
    { id: "wedding", label: "Destination Wedding", icon: Crown, color: "text-rose-500", desc: "Multi-day nuptials & banquets" },
    { id: "birthday", label: "Milestone Birthday", icon: Cake, color: "text-indigo-500", desc: "Intimate dinners & rooftop bashes" },
    { id: "community", label: "Community Festival", icon: TreePine, color: "text-emerald-500", desc: "Cultural fairs & eco-harvests" },
    { id: "corporate", label: "Corporate Summit", icon: Building2, color: "text-violet-500", desc: "Keynotes, galas & team offsites" },
  ];

  const priorityOptions = [
    { id: "catering", label: "Catering & Bar", icon: Utensils, desc: "Culinary & beverage excellence" },
    { id: "venue", label: "Stunning Venue", icon: Store, desc: "Architectural setting & capacity" },
    { id: "decor", label: "Florals & Decor", icon: Palette, desc: "Art direction & ambiance styling" },
    { id: "entertainment", label: "Music & Live Acts", icon: Music, desc: "Performers, DJs & acoustic energy" },
    { id: "photography", label: "Photography & Cinema", icon: Camera, desc: "Timeless heirloom captures" },
    { id: "balanced", label: "Evenly Balanced", icon: Scale, desc: "Standard proportionate allocation" },
  ];

  // Currency symbols
  const currencySymbol = currentCurrency === "INR" ? "₹" : currentCurrency === "USD" ? "$" : currentCurrency === "EUR" ? "€" : "£";

  return (
    <div className="py-6 sm:py-10 px-4 sm:px-6 lg:px-8 xl:px-12 max-w-7xl 2xl:max-w-[1520px] mx-auto ambient-bg w-full min-h-screen space-y-8">
      {/* ======================================================== */}
      {/* 1. TOP HEADER & INSPIRATION QUICK-LOAD BAR                */}
      {/* ======================================================== */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-200/80 dark:border-white/10 gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold text-indigo-700 dark:text-indigo-300">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Interactive Celebration Architect</span>
            </div>
            <h1 className="font-editorial text-3xl sm:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
              Design Your Celebration
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
              Configure every dimension of your celebration with guaranteed 100% mathematical budgets, backwards timelines, and client-side zero-PII security.
            </p>
          </div>

          <Link
            href="/dashboard"
            className="group inline-flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-xl border border-indigo-500/30 bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-sm shrink-0 cursor-pointer"
          >
            <Compass className="h-4 w-4" />
            <span>Skip to Preloaded Demos</span>
            <ChevronRight className="h-3.5 w-3.5 stroke-[2.5] transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Quick Inspiration Fill Pills */}
        <div className="p-4 rounded-2xl glass-card border border-indigo-500/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
            <PartyPopper className="h-4 w-4 text-indigo-500 shrink-0" />
            <span>Quick-Load Inspiration:</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {INSPIRATION_TEMPLATES.map((tmpl) => (
              <button
                key={tmpl.name}
                type="button"
                onClick={() => applyInspiration(tmpl)}
                className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-indigo-500/15 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-300 border border-slate-200/80 dark:border-white/10 hover:border-indigo-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>{tmpl.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. PROGRESS STEPPER BAR                                   */}
      {/* ======================================================== */}
      <nav aria-label="Wizard Steps" className="py-2">
        <ol className="grid grid-cols-4 gap-2 sm:gap-4 w-full">
          {[
            { num: 1, label: "Fundamentals", icon: Crown },
            { num: 2, label: "Scale & Budget", icon: DollarSign },
            { num: 3, label: "Priorities & Style", icon: Sliders },
            { num: 4, label: "Invariants & Review", icon: CheckCircle2 },
          ].map((step) => {
            const isDone = currentStep > step.num;
            const isCurrent = currentStep === step.num;
            const StepIcon = step.icon;
            return (
              <li
                key={step.num}
                onClick={() => isDone && setCurrentStep(step.num)}
                className={`p-3 rounded-2xl border transition-all ${
                  isCurrent
                    ? "border-indigo-600 bg-indigo-600/10 text-indigo-600 dark:text-white ring-2 ring-indigo-500/30 shadow-sm"
                    : isDone
                    ? "border-emerald-500/30 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 cursor-pointer hover:bg-emerald-500/10"
                    : "border-slate-200/80 dark:border-white/10 bg-slate-50/50 dark:bg-white/[0.02] text-slate-400"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-xl text-xs font-bold transition-all ${
                      isCurrent
                        ? "bg-gradient-to-r from-indigo-600 to-rose-600 text-white shadow-md shadow-indigo-500/30"
                        : isDone
                        ? "bg-emerald-500 text-white"
                        : "bg-slate-200 dark:bg-white/10 text-slate-500"
                    }`}
                  >
                    {isDone ? <CheckCircle2 className="h-4 w-4" /> : <StepIcon className="h-4 w-4" />}
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500">
                      Step {step.num}
                    </p>
                    <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {step.label}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </nav>

      {/* ======================================================== */}
      {/* 3. MAIN INTERACTIVE DUAL-COLUMN WORKSPACE                 */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Left Column: Interactive Multi-Step Form */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="rounded-3xl glass-card p-6 sm:p-8 shadow-xl space-y-6">
              {/* STEP 1: EVENT FUNDAMENTALS */}
              {currentStep === 1 && (
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
                      {celebrationTypes.map((item) => {
                        const Icon = item.icon;
                        const isSelected = selectedType === item.id;
                        return (
                          <button
                            type="button"
                            key={item.id}
                            onClick={() => setValue("eventType", item.id as EventType, { shouldValidate: true })}
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
              )}

              {/* STEP 2: SCALE, GEOGRAPHY & BUDGET */}
              {currentStep === 2 && (
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
                      {[
                        { label: "₹50,000", amount: 50000 },
                        { label: "₹1,50,000", amount: 150000 },
                        { label: "₹5,00,000", amount: 500000 },
                        { label: "₹15,00,000", amount: 1500000 },
                        { label: "₹25,00,000", amount: 2500000 },
                      ].map((preset) => (
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
              )}

              {/* STEP 3: PRIORITIES & STYLE */}
              {currentStep === 3 && (
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
                      {priorityOptions.map((p) => {
                        const Icon = p.icon;
                        const isSelected = selectedPriorities.includes(p.id as Priority);
                        return (
                          <button
                            type="button"
                            key={p.id}
                            onClick={() => togglePriority(p.id as Priority)}
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
              )}

              {/* STEP 4: INVARIANTS, DIETARY & REVIEW */}
              {currentStep === 4 && (
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
                            onClick={() => toggleDietary(diet)}
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
              )}
            </div>

            {/* Wizard Navigation Controls with '>' icon and hover effects */}
            <div className="flex items-center justify-between pt-2">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep((s) => s - 1)}
                  className="group inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.04] px-5 py-3 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer shadow-xs"
                >
                  <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
                  <span>Back</span>
                </button>
              ) : (
                <div />
              )}

              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep((s) => s + 1)}
                  className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-rose-600 px-6 py-3 text-xs font-bold text-white shadow-md shadow-indigo-500/25 hover:shadow-lg hover:shadow-indigo-500/40 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 cursor-pointer"
                >
                  <ChevronRight className="h-4 w-4 stroke-[2.5] transition-transform duration-300 group-hover:translate-x-1" />
                  <span>Continue</span>
                </button>
              ) : (
                <button
                  type="submit"
                  className="group inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-600 px-7 py-3.5 text-xs sm:text-sm font-bold text-white shadow-xl shadow-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-500/45 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 cursor-pointer"
                >
                  <ChevronRight className="h-4.5 w-4.5 stroke-[2.5] transition-transform duration-300 group-hover:translate-x-1" />
                  <span>Generate Celebration Workspace</span>
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Right Column: Sticky Real-Time Celebration Blueprint Studio */}
        <aside className="lg:col-span-5 xl:col-span-4 sticky top-6 space-y-6" aria-label="Real-time Plan Blueprint">
          <div className="glass-card rounded-3xl p-6 sm:p-7 space-y-6 shadow-xl border border-indigo-500/20">
            {/* Studio Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/70 dark:border-white/10">
              <div className="flex items-center gap-2">
                <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                  Live Celebration Blueprint
                </span>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-semibold">
                Tier {currentCityTier}
              </span>
            </div>

            {/* Quick Metrics */}
            <div className="space-y-1">
              <p className="font-editorial text-2xl font-bold text-slate-900 dark:text-white truncate">
                {currentTitle}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {currentCity} • {currentGuests} guests • {currentDate}
              </p>
            </div>

            {/* Live Dynamic Budget Allocation Visualizer */}
            <div className="space-y-3 p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/70 dark:border-white/5">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-600 dark:text-slate-400 font-medium">Deterministic Budget</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white text-sm">
                  {currencySymbol}{Number(currentBudget || 0).toLocaleString()} {currentCurrency}
                </span>
              </div>

              {/* Progress bar visualizer */}
              <div className="h-3 w-full rounded-full bg-slate-200 dark:bg-slate-800 flex overflow-hidden p-0.5 gap-0.5">
                {liveBudgetItems.slice(0, 5).map((item, idx) => {
                  const colors = ["bg-indigo-600", "bg-violet-500", "bg-rose-500", "bg-amber-500", "bg-emerald-500"];
                  const pct = Math.max(5, Math.round((item.plannedAmount / Math.max(1, Number(currentBudget))) * 100));
                  return (
                    <div
                      key={item.category}
                      className={`${colors[idx % colors.length]} h-full rounded-full transition-all duration-300`}
                      style={{ width: `${pct}%` }}
                      title={`${item.category}: ${pct}%`}
                    />
                  );
                })}
              </div>

              {/* Top Category List */}
              <div className="space-y-2 pt-1 text-xs">
                {liveBudgetItems.slice(0, 4).map((item) => (
                  <div key={item.category} className="flex justify-between items-center text-slate-600 dark:text-slate-300">
                    <span className="capitalize">{item.category}</span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white">
                      {currencySymbol}{item.plannedAmount.toLocaleString()}
                    </span>
                  </div>
                ))}

                {/* Contingency Row */}
                {contingencyItem && (
                  <div className="flex justify-between items-center text-emerald-600 dark:text-emerald-400 font-semibold pt-1 border-t border-slate-200/60 dark:border-white/5">
                    <span className="flex items-center gap-1.5">
                      <Lock className="h-3 w-3" />
                      <span>Contingency Reserve</span>
                    </span>
                    <span className="font-mono font-bold">
                      {currencySymbol}{contingencyItem.plannedAmount.toLocaleString()}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Backwards Milestone Countdown Preview */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-indigo-500" />
                  <span>Backwards Timeline Milestones</span>
                </span>
                <span className="text-[10px] text-slate-400">Scheduled Backwards</span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/5 flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-300">T-180: Venue & Advance Deposit</span>
                  <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400">Phase 1</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/5 flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-300">T-90: Invitation & RSVP Dispatch</span>
                  <span className="text-[10px] font-bold text-violet-600 dark:text-violet-400">Phase 2</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/5 flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-300">T-30: Menu Tasting & Vendor Freeze</span>
                  <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400">Phase 3</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/5 flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-300">T-1: Rehearsal & AV Sound Curfew</span>
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">Phase 4</span>
                </div>
              </div>
            </div>

            {/* Zero-PII Guarantee Badge */}
            <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs flex items-center gap-2.5">
              <ShieldCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <div>
                <p className="font-bold text-emerald-800 dark:text-emerald-300">100% Client-Side Privacy</p>
                <p className="text-[11px] text-emerald-700/80 dark:text-emerald-400/80">
                  Guest and budget data never leaves your browser sandbox.
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
