"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Sparkles, ArrowRight } from "lucide-react";
import { CreateEventInputSchema, CreateEventInput } from "@/lib/validation/schemas";
import { useEventStore } from "@/store/useEventStore";

const DEFAULT_EVENT_DATE = "2026-12-15";

export default function NewEventPage() {
  const router = useRouter();
  const createEvent = useEventStore((s) => s.createEvent);

  const {
    register,
    handleSubmit,
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

  const onSubmit = (data: CreateEventInput) => {
    const newEvent = createEvent(data);
    router.push(`/events/${newEvent.id}`);
  };

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto space-y-6">
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
          Fast Event Creator
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--foreground)]">
          Launch New Celebration
        </h1>
        <p className="text-sm text-[var(--muted-foreground)]">
          Instantly provisions a fully budgeted workspace with backwards timelines and safety buffers.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 space-y-5 shadow-sm"
      >
        <div className="space-y-1.5">
          <label htmlFor="title" className="block text-sm font-semibold text-[var(--foreground)]">
            Event Name
          </label>
          <input
            id="title"
            type="text"
            {...register("title")}
            placeholder="e.g. Diya's Graduation Soirée"
            className="w-full rounded-lg border border-[var(--input)] bg-[var(--background)] px-3.5 py-2.5 text-sm text-[var(--foreground)] focus:ring-2 focus:ring-indigo-500"
          />
          {errors.title && <p className="text-xs text-rose-500">{errors.title.message}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="eventType" className="block text-sm font-semibold text-[var(--foreground)]">
              Celebration Type
            </label>
            <select
              id="eventType"
              {...register("eventType")}
              className="w-full rounded-lg border border-[var(--input)] bg-[var(--background)] px-3.5 py-2.5 text-sm text-[var(--foreground)] focus:ring-2 focus:ring-indigo-500"
            >
              <option value="wedding">Wedding 💍</option>
              <option value="birthday">Birthday 🎂</option>
              <option value="community">Community Festival 🎪</option>
              <option value="corporate">Corporate 🏢</option>
              <option value="other">Other Celebration 🎉</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="date" className="block text-sm font-semibold text-[var(--foreground)]">
              Event Date
            </label>
            <input
              id="date"
              type="date"
              {...register("date")}
              className="w-full rounded-lg border border-[var(--input)] bg-[var(--background)] px-3.5 py-2.5 text-sm text-[var(--foreground)] focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="city" className="block text-sm font-semibold text-[var(--foreground)]">
              City / Location
            </label>
            <input
              id="city"
              type="text"
              {...register("city")}
              className="w-full rounded-lg border border-[var(--input)] bg-[var(--background)] px-3.5 py-2.5 text-sm text-[var(--foreground)] focus:ring-2 focus:ring-indigo-500"
            />
            {errors.city && <p className="text-xs text-rose-500">{errors.city.message}</p>}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="guests" className="block text-sm font-semibold text-[var(--foreground)]">
              Guest Count
            </label>
            <input
              id="guests"
              type="number"
              {...register("guests", { valueAsNumber: true })}
              className="w-full rounded-lg border border-[var(--input)] bg-[var(--background)] px-3.5 py-2.5 text-sm text-[var(--foreground)] focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="budget" className="block text-sm font-semibold text-[var(--foreground)]">
              Total Budget
            </label>
            <input
              id="budget"
              type="number"
              step="1000"
              {...register("budget", { valueAsNumber: true })}
              className="w-full rounded-lg border border-[var(--input)] bg-[var(--background)] px-3.5 py-2.5 text-sm text-[var(--foreground)] focus:ring-2 focus:ring-indigo-500 font-mono"
            />
            {errors.budget && <p className="text-xs text-rose-500">{errors.budget.message}</p>}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="currency" className="block text-sm font-semibold text-[var(--foreground)]">
              Currency
            </label>
            <select
              id="currency"
              {...register("currency")}
              className="w-full rounded-lg border border-[var(--input)] bg-[var(--background)] px-3.5 py-2.5 text-sm text-[var(--foreground)] focus:ring-2 focus:ring-indigo-500"
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
          className="w-full flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow hover:bg-indigo-700 transition-colors"
        >
          <Sparkles className="h-4 w-4" />
          <span>Generate Plan & Open Workspace</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
