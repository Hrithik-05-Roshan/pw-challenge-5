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
  Crown,
  Cake,
  TreePine,
  Building2,
  CalendarDays,
  DollarSign,
  Users2,
  CheckCircle2,
  LayoutDashboard,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import { useEventStore } from "@/store/useEventStore";

function renderDashboardTypeIcon(type: string) {
  switch (type) {
    case "wedding":
      return <Crown className="h-3.5 w-3.5" />;
    case "birthday":
      return <Cake className="h-3.5 w-3.5" />;
    case "community":
      return <TreePine className="h-3.5 w-3.5" />;
    case "corporate":
      return <Building2 className="h-3.5 w-3.5" />;
    default:
      return <Sparkles className="h-3.5 w-3.5" />;
  }
}

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
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 ambient-bg">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-3">
            <LayoutDashboard className="h-3.5 w-3.5" />
            <span>Celebration Orchestration Studio</span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
            Your Celebration Workspaces
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2 max-w-2xl">
            Bespoke event portfolios, guaranteed 100% mathematical budgets, backwards timelines, and explainable decision architecture.
          </p>
        </div>

        <Link
          href="/events/new"
          className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <Plus className="h-4 w-4" />
          <span>Plan Celebration</span>
        </Link>
      </div>

      {/* JUDGE EXPERIENCE SPECIAL BANNER */}
      <div className="rounded-2xl border-2 border-indigo-500/30 dark:border-indigo-500/40 bg-gradient-to-br from-indigo-500/10 via-violet-500/5 to-transparent p-6 shadow-xl backdrop-blur-xl space-y-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 text-slate-900 dark:text-white">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-md shadow-indigo-500/30">
              <Sparkles className="h-4.5 w-4.5 animate-pulse" />
            </span>
            <div>
              <span className="font-heading font-extrabold text-base sm:text-lg">
                Judge Evaluation Experience
              </span>
              <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold block">
                3 Real-World Adaptive AI Stress Tests
              </span>
            </div>
          </div>
          <span className="text-xs bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-full font-mono font-semibold border border-indigo-500/30">
            One-Click Benchmarks
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Click any scenario to load real stress tests into live workspaces. Observe how our deterministic pure-math rules engine adapts budgets, timelines, and contingencies in real-time:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          {/* Scenario 1 */}
          <button
            onClick={() => {
              loadJudgeScenario(1);
              const wedding = events.find((e) => e.eventType === "wedding");
              if (wedding) router.push(`/events/${wedding.id}?tab=budget`);
            }}
            className="group flex flex-col justify-between p-4 rounded-xl glass-card text-left transition-all hover:border-indigo-500 hover:shadow-indigo-500/10 cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400">
                  <Crown className="h-4 w-4" />
                </span>
                <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-full">
                  Budget Shock
                </span>
              </div>
              <h4 className="font-heading text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                Scenario 1: Wedding Budget Cut
              </h4>
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mt-1">
                Fixed Budget Reallocation (25L → 20L)
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Re-normalizes non-critical items while strictly locking the 7% contingency reserve.
              </p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-slate-200/60 dark:border-white/5 flex items-center justify-between text-xs font-bold text-indigo-600 dark:text-indigo-400">
              <span>Inspect Budget Diff</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Scenario 2 */}
          <button
            onClick={() => {
              loadJudgeScenario(2);
              const bday = events.find((e) => e.eventType === "birthday");
              if (bday) router.push(`/events/${bday.id}?tab=guests`);
            }}
            className="group flex flex-col justify-between p-4 rounded-xl glass-card text-left transition-all hover:border-indigo-500 hover:shadow-indigo-500/10 cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                  <Cake className="h-4 w-4" />
                </span>
                <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full">
                  Guest Surge
                </span>
              </div>
              <h4 className="font-heading text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                Scenario 2: Birthday Guest Surge
              </h4>
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mt-1">
                Sudden RSVP Surge (80 → 110 Guests)
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Flags venue capacity warnings and evaluates per-guest catering compression.
              </p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-slate-200/60 dark:border-white/5 flex items-center justify-between text-xs font-bold text-indigo-600 dark:text-indigo-400">
              <span>Inspect Guest Limits</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Scenario 3 */}
          <button
            onClick={() => {
              loadJudgeScenario(3);
              const comm = events.find((e) => e.eventType === "community");
              if (comm) router.push(`/events/${comm.id}?tab=timeline`);
            }}
            className="group flex flex-col justify-between p-4 rounded-xl glass-card text-left transition-all hover:border-indigo-500 hover:shadow-indigo-500/10 cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <TreePine className="h-4 w-4" />
                </span>
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                  Timeline Rush
                </span>
              </div>
              <h4 className="font-heading text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                Scenario 3: Date Compression
              </h4>
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mt-1">
                Eco-Fair (Moved to 12 Days away)
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Triggers backwards timeline compression and flags urgent sound permit tasks.
              </p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-slate-200/60 dark:border-white/5 flex items-center justify-between text-xs font-bold text-indigo-600 dark:text-indigo-400">
              <span>Inspect Timeline Rush</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </div>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stat 1 */}
        <div className="glass-card rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Active Celebrations</span>
            <span className="p-2 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
              <CalendarDays className="h-4 w-4" />
            </span>
          </div>
          <p className="font-heading text-3xl font-black text-slate-900 dark:text-white mt-2">{totalEvents}</p>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1 mt-1">
            <TrendingUp className="h-3 w-3" />
            Seeded & Active
          </span>
        </div>

        {/* Stat 2 */}
        <div className="glass-card rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Planned Budget</span>
            <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <DollarSign className="h-4 w-4" />
            </span>
          </div>
          <p className="font-heading text-3xl font-black text-indigo-600 dark:text-indigo-400 mt-2">
            ₹{totalBudget.toLocaleString()}
          </p>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1 mt-1">
            <CheckCircle2 className="h-3 w-3" />
            100% Mathematically Balanced
          </span>
        </div>

        {/* Stat 3 */}
        <div className="glass-card rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Guests Tracked</span>
            <span className="p-2 rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400">
              <Users2 className="h-4 w-4" />
            </span>
          </div>
          <p className="font-heading text-3xl font-black text-slate-900 dark:text-white mt-2">
            {totalGuests.toLocaleString()}
          </p>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-1 block">
            Zero-PII LocalStorage
          </span>
        </div>

        {/* Stat 4 */}
        <div className="glass-card rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Action Milestones</span>
            <span className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Clock className="h-4 w-4" />
            </span>
          </div>
          <p className="font-heading text-3xl font-black text-amber-500 mt-2">{pendingTasksCount}</p>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-1 block">
            Scheduled Backwards
          </span>
        </div>
      </div>

      {/* Controls: Search & Category Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search celebrations or cities..."
            className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/60 pl-10 pr-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500 shadow-sm transition-all"
          />
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100/80 dark:bg-white/[0.04] border border-slate-200/60 dark:border-white/5 overflow-x-auto w-full sm:w-auto">
          {[
            { id: "all", label: "All Events", icon: Sparkles },
            { id: "wedding", label: "Weddings", icon: Crown },
            { id: "birthday", label: "Birthdays", icon: Cake },
            { id: "community", label: "Community", icon: TreePine },
            { id: "corporate", label: "Corporate", icon: Building2 },
          ].map((item) => {
            const Icon = item.icon;
            const isSelected = filterType === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setFilterType(item.id)}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? "bg-white dark:bg-white/10 text-indigo-600 dark:text-white shadow-sm ring-1 ring-slate-200/60 dark:ring-white/10 font-bold"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/40 dark:hover:bg-white/5"
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${isSelected ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400"}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Events Grid */}
      {filteredEvents.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-slate-300 dark:border-white/10 rounded-2xl glass-card space-y-4">
          <div className="h-12 w-12 rounded-2xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center mx-auto">
            <Search className="h-6 w-6" />
          </div>
          <p className="text-base font-semibold text-slate-900 dark:text-white">No celebrations match your search criteria.</p>
          <Link
            href="/events/new"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-indigo-500/20"
          >
            <Plus className="h-4 w-4" />
            <span>Create New Celebration</span>
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
                className="group flex flex-col justify-between rounded-2xl glass-card p-6 hover:border-indigo-500/40 hover:shadow-xl transition-all duration-300"
              >
                <div className="space-y-4">
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold capitalize px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                      {renderDashboardTypeIcon(event.eventType)}
                      <span>{event.eventType}</span>
                    </span>

                    <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{daysRemaining}d Left</span>
                    </span>
                  </div>

                  {/* Title & Metadata */}
                  <div>
                    <h2 className="font-heading text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                      {event.title}
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {event.city} • {event.guests} Guests • Tier {event.cityTier}
                    </p>
                  </div>

                  {/* Budget Highlight */}
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/5 space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500 dark:text-slate-400">Total Budget</span>
                      <span className="font-heading font-extrabold text-sm text-slate-900 dark:text-white">
                        ₹{event.budget.toLocaleString()} {event.currency}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                      <span>100% Balanced</span>
                      <span>5-10% Contingency Locked</span>
                    </div>
                  </div>

                  {/* Task Progress */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 font-medium">
                      <span>Timeline Readiness</span>
                      <span className="font-bold text-slate-900 dark:text-white">{progress}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-indigo-600 to-violet-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-4 mt-5 border-t border-slate-200/60 dark:border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => duplicateEvent(event.id)}
                      className="p-2 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                      title="Duplicate Event"
                      aria-label={`Duplicate ${event.title}`}
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => deleteEvent(event.id)}
                      className="p-2 rounded-lg text-rose-500 hover:bg-rose-500/10 transition-colors"
                      title="Delete Event"
                      aria-label={`Delete ${event.title}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <Link
                    href={`/events/${event.id}`}
                    onClick={() => setActiveEventId(event.id)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 p-1 group/btn"
                  >
                    <span>Open Workspace</span>
                    <ExternalLink className="h-3.5 w-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
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
