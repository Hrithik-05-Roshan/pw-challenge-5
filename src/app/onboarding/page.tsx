"use client";

/**
 * @file page.tsx
 * @description Multi-Step Plan Wizard Page for Gatherly AI.
 *
 * Implements a clean, decoupled composite architecture where each wizard step
 * (Fundamentals, Scale & Budget, Priorities & Aesthetics, Invariants & Review)
 * and the Live Blueprint Studio are encapsulated in dedicated, single-responsibility
 * components under src/components/onboarding/.
 */

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { CreateEventInputSchema, CreateEventInput } from "@/lib/validation/schemas";
import { useEventStore } from "@/store/useEventStore";
import { EventType, Priority, CityTier } from "@/types";
import { calculateBudgetAllocation } from "@/lib/planner/rules";
import { DEFAULT_ONBOARDING_DATE, InspirationTemplate } from "@/constants/onboarding";
import { OnboardingHeader } from "@/components/onboarding/OnboardingHeader";
import { OnboardingStepper } from "@/components/onboarding/OnboardingStepper";
import { Step1Fundamentals } from "@/components/onboarding/Step1Fundamentals";
import { Step2ScaleBudget } from "@/components/onboarding/Step2ScaleBudget";
import { Step3PrioritiesAesthetics } from "@/components/onboarding/Step3PrioritiesAesthetics";
import { Step4InvariantsReview } from "@/components/onboarding/Step4InvariantsReview";
import { LiveBlueprintStudio } from "@/components/onboarding/LiveBlueprintStudio";

export default function OnboardingPage(): React.ReactElement {
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

  const selectedType = (useWatch({ control, name: "eventType" }) || "wedding") as EventType;
  const rawPriorities = useWatch({ control, name: "priorities" });
  const selectedPriorities = useMemo(() => (rawPriorities || []) as Priority[], [rawPriorities]);
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
      selectedType,
      validBudget,
      validGuests,
      validTier,
      validPrio
    );
  }, [selectedType, currentBudget, currentGuests, currentCityTier, selectedPriorities]);

  const contingencyItem = liveBudgetItems.find((b) => b.category === "contingency");
  const costPerGuest = Math.round(Number(currentBudget || 0) / Math.max(1, Number(currentGuests || 1)));

  const togglePriority = (p: Priority): void => {
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

  const toggleDietary = (item: string): void => {
    const exists = currentDietary.includes(item);
    const next = exists ? currentDietary.filter((d) => d !== item) : [...currentDietary, item];
    setValue("dietaryPreferences", next, { shouldValidate: true });
  };

  const applyInspiration = (template: InspirationTemplate): void => {
    reset(template.data);
  };

  const onSubmit = (data: CreateEventInput): void => {
    const newEvent = createEvent(data);
    router.push(`/events/${newEvent.id}`);
  };

  const currencySymbol = currentCurrency === "INR" ? "₹" : currentCurrency === "USD" ? "$" : currentCurrency === "EUR" ? "€" : "£";

  return (
    <div className="py-6 sm:py-10 px-4 sm:px-6 lg:px-8 xl:px-12 max-w-7xl 2xl:max-w-[1520px] mx-auto ambient-bg w-full min-h-screen space-y-8">
      {/* 1. Top Header & Inspiration Quick-Load Bar */}
      <OnboardingHeader onApplyInspiration={applyInspiration} />

      {/* 2. Progress Stepper Bar */}
      <OnboardingStepper currentStep={currentStep} onStepClick={setCurrentStep} />

      {/* 3. Main Interactive Dual-Column Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Left Column: Form Steps */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="rounded-3xl glass-card p-6 sm:p-8 shadow-xl space-y-6">
              {currentStep === 1 && (
                <Step1Fundamentals
                  register={register}
                  setValue={setValue}
                  selectedType={selectedType}
                  currentStyleTheme={currentStyleTheme}
                  errors={errors}
                />
              )}

              {currentStep === 2 && (
                <Step2ScaleBudget
                  register={register}
                  setValue={setValue}
                  currentCityTier={currentCityTier}
                  currentGuests={currentGuests}
                  currentCurrency={currentCurrency}
                  costPerGuest={costPerGuest}
                  currencySymbol={currencySymbol}
                  errors={errors}
                />
              )}

              {currentStep === 3 && (
                <Step3PrioritiesAesthetics
                  selectedPriorities={selectedPriorities}
                  onTogglePriority={togglePriority}
                  setValue={setValue}
                  control={control}
                />
              )}

              {currentStep === 4 && (
                <Step4InvariantsReview
                  register={register}
                  currentDietary={currentDietary}
                  onToggleDietary={toggleDietary}
                  contingencyItem={contingencyItem}
                  currencySymbol={currencySymbol}
                />
              )}
            </div>

            {/* Wizard Navigation Controls */}
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

        {/* Right Column: Sticky Live Blueprint Studio */}
        <LiveBlueprintStudio
          currentCityTier={currentCityTier}
          currentTitle={currentTitle}
          currentCity={currentCity}
          currentGuests={currentGuests}
          currentDate={currentDate}
          currentBudget={currentBudget}
          currentCurrency={currentCurrency}
          currencySymbol={currencySymbol}
          liveBudgetItems={liveBudgetItems}
          contingencyItem={contingencyItem}
        />
      </div>
    </div>
  );
}
