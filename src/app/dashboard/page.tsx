"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Clock,
  Plus,
  Search,
  Trash2,
  Copy,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { useEventStore } from "@/store/useEventStore";

export default function DashboardPage() {
  const router = useRouter();
  const events = useEventStore((s) => s.events);
  const setActiveEventId = useEventStore((s) => s.setActiveEventId);
  const deleteEvent = useEventStore((s) => s.deleteEvent);
  const duplicateEvent = useEventStore((s) => s.duplicateEvent);
  const loadJudgeScenario = useEventStore((s) => s.loadJudgeScenario);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");

  // Summary Metrics
  const totalEvents = events.length;
  const totalBudget = events.reduce((sum, e) => sum + e.budget, 0);
  const totalGuests = events.reduce((sum, e) => sum + e.guests, 0);
  const pendingTasksCount = events.reduce(
    (count, e) => count + e.tasks.filter((t) => !t.completed).length,
    0
  );

  const filteredEvents = events.filter((e) => {
    const matchesSearch =
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === "all" || e.eventType === filterType;
    return matchesSearch && matchesFilter;
  });

  const getDaysRemaining = (dateStr: string) => {
    const today = new Date();
    const target = new Date(dateStr);
    const diffMs = target.getTime() - today.getTime();
    return Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
  };

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--foreground)]">
            Planner Dashboard
          </h1>
          <p className="text-sm text-[var(--muted-foreground)]">
            Monitor all your celebrations, budgets, timelines, and AI decision models.
          </p>
        </div>

        <Link
          href="/events/new"
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-indigo-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>New Celebration</span>
        </Link>
      </div>

      {/* JUDGE EXPERIENCE SPECIAL BANNER */}
      <div className="rounded-2xl border-2 border-indigo-500/30 bg-gradient-to-r from-indigo-500/10 via-violet-500/10 to-transparent p-5 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 text-indigo-600 dark:text-indigo-400 font-bold text-base">
            <Sparkles className="h-5 w-5" />
            <span>Judge Evaluation Experience (3 Live Scenarios)</span>
          </div>
          <span className="text-xs bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 px-2.5 py-1 rounded-full font-mono">
            Interactive AI Decision Models
          </span>
        </div>

        <p className="text-xs sm:text-sm text-[var(--muted-foreground)]">
          Explore realistic decision-making before-and-after models without inspecting raw source code:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
          <button
            onClick={() => {
              loadJudgeScenario(1);
              const wedding = events.find((e) => e.eventType === "wedding");
              if (wedding) router.push(`/events/${wedding.id}?tab=budget`);
            }}
            className="flex flex-col items-start p-3.5 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:border-indigo-500 text-left transition-all"
          >
            <span className="text-xs font-bold text-indigo-600">Scenario 1: Wedding Budget Cut</span>
            <span className="text-xs text-[var(--foreground)] font-medium mt-1">
              Fixed Budget Reallocation (25L → 20L)
            </span>
            <span className="text-[11px] text-[var(--muted-foreground)] mt-0.5">
              Inspect before/after category diff & food safeguards
            </span>
          </button>

          <button
            onClick={() => {
              loadJudgeScenario(2);
              const bday = events.find((e) => e.eventType === "birthday");
              if (bday) router.push(`/events/${bday.id}?tab=guests`);
            }}
            className="flex flex-col items-start p-3.5 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:border-indigo-500 text-left transition-all"
          >
            <span className="text-xs font-bold text-pink-600">Scenario 2: Birthday Guest Surge</span>
            <span className="text-xs text-[var(--foreground)] font-medium mt-1">
              Sudden RSVP Surge (80 → 110 Guests)
            </span>
            <span className="text-[11px] text-[var(--muted-foreground)] mt-0.5">
              Analyzes per-plate compression and venue limits
            </span>
          </button>

          <button
            onClick={() => {
              loadJudgeScenario(3);
              const comm = events.find((e) => e.eventType === "community");
              if (comm) router.push(`/events/${comm.id}?tab=timeline`);
            }}
            className="flex flex-col items-start p-3.5 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:border-indigo-500 text-left transition-all"
          >
            <span className="text-xs font-bold text-emerald-600">Scenario 3: Date Compression</span>
            <span className="text-xs text-[var(--foreground)] font-medium mt-1">
              Community Fair (Moved to 12 Days away)
            </span>
            <span className="text-[11px] text-[var(--muted-foreground)] mt-0.5">
              Automatic lead-time compression and urgent task flags
            </span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 sm:p-5">
          <span className="text-xs font-medium text-[var(--muted-foreground)]">Active Celebrations</span>
          <p className="text-2xl font-extrabold text-[var(--foreground)] mt-1">{totalEvents}</p>
        </div>

        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 sm:p-5">
          <span className="text-xs font-medium text-[var(--muted-foreground)]">Total Planned Budget</span>
          <p className="text-2xl font-extrabold text-indigo-600 mt-1">
            ₹{totalBudget.toLocaleString()}
          </p>
        </div>

        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 sm:p-5">
          <span className="text-xs font-medium text-[var(--muted-foreground)]">Total Guests Count</span>
          <p className="text-2xl font-extrabold text-[var(--foreground)] mt-1">
            {totalGuests.toLocaleString()}
          </p>
        </div>

        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 sm:p-5">
          <span className="text-xs font-medium text-[var(--muted-foreground)]">Pending Tasks</span>
          <p className="text-2xl font-extrabold text-amber-500 mt-1">{pendingTasksCount}</p>
        </div>
      </div>

      {/* Controls: Search & Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-3 h-4 w-4 text-[var(--muted-foreground)]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search events or cities..."
            className="w-full rounded-lg border border-[var(--input)] bg-[var(--card)] pl-9 pr-3 py-2 text-sm text-[var(--foreground)] focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1">
          {["all", "wedding", "birthday", "community", "corporate"].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold capitalize whitespace-nowrap transition-colors ${
                filterType === type
                  ? "bg-indigo-600 text-white"
                  : "border border-[var(--border)] bg-[var(--card)] text-[var(--muted-foreground)] hover:bg-[var(--secondary)]"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Events List */}
      {filteredEvents.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-[var(--border)] rounded-2xl bg-[var(--card)] space-y-4">
          <p className="text-sm text-[var(--muted-foreground)]">No celebrations found.</p>
          <Link
            href="/events/new"
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white"
          >
            <Plus className="h-4 w-4" />
            <span>Create One Now</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => {
            const daysRemaining = getDaysRemaining(event.date);
            const completedTasks = event.tasks.filter((t) => t.completed).length;
            const progress =
              event.tasks.length > 0 ? Math.round((completedTasks / event.tasks.length) * 100) : 0;

            return (
              <div
                key={event.id}
                className="flex flex-col justify-between rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-600">
                      {event.eventType}
                    </span>
                    <span className="text-xs font-semibold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {daysRemaining} Days Left
                    </span>
                  </div>

                  <div>
                    <h2 className="text-base font-bold text-[var(--foreground)]">{event.title}</h2>
                    <p className="text-xs text-[var(--muted-foreground)]">
                      {event.city} • {event.guests} Guests • {event.budget.toLocaleString()}{" "}
                      {event.currency}
                    </p>
                  </div>

                  {/* Task Progress */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-[var(--muted-foreground)]">
                      <span>Timeline Readiness</span>
                      <span className="font-semibold">{progress}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-[var(--secondary)] overflow-hidden">
                      <div
                        className="bg-indigo-600 h-full rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-4 mt-4 border-t border-[var(--border)] flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => duplicateEvent(event.id)}
                      className="p-1.5 rounded-md text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--secondary)]"
                      title="Duplicate Event"
                      aria-label={`Duplicate ${event.title}`}
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => deleteEvent(event.id)}
                      className="p-1.5 rounded-md text-rose-500 hover:bg-rose-500/10"
                      title="Delete Event"
                      aria-label={`Delete ${event.title}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <Link
                    href={`/events/${event.id}`}
                    onClick={() => setActiveEventId(event.id)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700 p-1"
                  >
                    <span>Open Workspace</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
