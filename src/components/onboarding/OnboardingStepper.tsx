"use client";

/**
 * @file OnboardingStepper.tsx
 * @description 4-step interactive progress navigation indicator for the planning wizard.
 */

import React from "react";
import { Crown, DollarSign, Sliders, CheckCircle2 } from "lucide-react";

interface OnboardingStepperProps {
  currentStep: number;
  onStepClick: (step: number) => void;
}

export function OnboardingStepper({
  currentStep,
  onStepClick,
}: OnboardingStepperProps): React.ReactElement {
  const steps = [
    { num: 1, label: "Fundamentals", icon: Crown },
    { num: 2, label: "Scale & Budget", icon: DollarSign },
    { num: 3, label: "Priorities & Style", icon: Sliders },
    { num: 4, label: "Invariants & Review", icon: CheckCircle2 },
  ];

  return (
    <nav aria-label="Wizard Steps" className="py-2">
      <ol className="grid grid-cols-4 gap-2 sm:gap-4 w-full">
        {steps.map((step) => {
          const isDone = currentStep > step.num;
          const isCurrent = currentStep === step.num;
          const StepIcon = step.icon;
          return (
            <li
              key={step.num}
              onClick={() => isDone && onStepClick(step.num)}
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
  );
}
