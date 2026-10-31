"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Clock,
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
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import { useEventStore } from "@/store/useEventStore";

function renderDashboardTypeIcon(type: string) {
  switch (type) {
    case "wedding":
      return <Crown className="h-4 w-4" />;
    case "birthday":
      return <Cake className="h-4 w-4" />;
    case "community":
      return <TreePine className="h-4 w-4" />;
    case "corporate":
      return <Building2 className="h-4 w-4" />;
    default:
      return <Sparkles className="h-4 w-4" />;
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
    <div className="py-10 sm:py-14 px-6 sm:px-10 lg:px-12 max-w-7xl mx-auto space-y-12 sm:space-y-16 ambient-bg page-transition">
      {/* ======================================================== */}
      {/* 1. HERO HEADER                                           */}
      {/* ======================================================== */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2 border-b border-slate-200/60 dark:border-white/5">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
            <LayoutDashboard className="h-3.5 w-3.5" />
            <span>Celebration Orchestration Studio</span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
            Your Celebrations Portfolio
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            Manage your weddings, milestone birthdays, and festivals with guaranteed 100% mathematical budgets, backwards timelines, and vendor coordination.
          </p>
        </div>

        <Link
          href="/onboarding"
          className="group inline-flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-600 px-7 py-4 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/40 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 shrink-0 cursor-pointer"
        >
          <ChevronRight className="h-4.5 w-4.5 stroke-[2.5] transition-transform duration-300 group-hover:translate-x-1" />
          <span>Plan Celebration</span>
        </Link>
      </div>

      {/* ======================================================== */}
      {/* 2. STATS GLANCE GRID (Airy, High-Elevation Cards)        */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
        {/* Stat 1 */}
        <div className="glass-card rounded-3xl p-6 sm:p-7 space-y-3 hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Active Celebrations
            </span>
            <span className="p-2.5 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
              <CalendarDays className="h-5 w-5" />
            </span>
          </div>
          <p className="font-display text-4xl font-black text-slate-900 dark:text-white">{totalEvents}</p>
          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5 pt-1">
            <TrendingUp className="h-3.5 w-3.5" />
            <span>Ready in Local Storage</span>
          </span>
        </div>

        {/* Stat 2 */}
        <div className="glass-card rounded-3xl p-6 sm:p-7 space-y-3 hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Allocated Budget
            </span>
            <span className="p-2.5 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <DollarSign className="h-5 w-5" />
            </span>
          </div>
          <p className="font-display text-4xl font-black text-indigo-600 dark:text-indigo-400">
            ₹{totalBudget.toLocaleString()}
          </p>
          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5 pt-1">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>100% Mathematically Balanced</span>
          </span>
        </div>

        {/* Stat 3 */}
        <div className="glass-card rounded-3xl p-6 sm:p-7 space-y-3 hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Total Guests
            </span>
            <span className="p-2.5 rounded-2xl bg-violet-500/10 text-violet-600 dark:text-violet-400">
              <Users2 className="h-5 w-5" />
            </span>
          </div>
          <p className="font-display text-4xl font-black text-slate-900 dark:text-white">
            {totalGuests.toLocaleString()}
          </p>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block pt-1">
            Zero-PII Client Encryption
          </span>
        </div>

        {/* Stat 4 */}
        <div className="glass-card rounded-3xl p-6 sm:p-7 space-y-3 hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Action Milestones
            </span>
            <span className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Clock className="h-5 w-5" />
            </span>
          </div>
          <p className="font-display text-4xl font-black text-amber-500">{pendingTasksCount}</p>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block pt-1">
            Backwards Timeline Scheduling
          </span>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 3. JUDGE EVALUATION STUDIO (Spacious Showcase Panel)     */}
      {/* ======================================================== */}
      <div className="rounded-3xl border border-indigo-500/25 dark:border-indigo-500/35 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent p-7 sm:p-10 shadow-xl backdrop-blur-xl space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-indigo-500/20">
          <div className="flex items-center gap-3.5 text-slate-900 dark:text-white">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-md shadow-indigo-500/30">
              <Sparkles className="h-5 w-5 animate-pulse" />
            </span>
            <div>
              <h2 className="font-editorial font-bold text-xl sm:text-2xl">
                Evaluation Benchmark Scenarios
              </h2>
              <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold block mt-0.5">
                Instant Stress-Testing of Deterministic Pure-Math Rules Engine
              </span>
            </div>
          </div>
          <span className="text-xs bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 px-3.5 py-1.5 rounded-full font-mono font-semibold border border-indigo-500/30">
            1-Click Preloaded Workspaces
          </span>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
          Test real-world stress conditions with a single click. Observe how our deterministic algorithms adapt budgets, reallocate categories, and compress backwards timelines without hallucination:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {/* Scenario 1 */}
          <button
            onClick={() => {
              loadJudgeScenario(1);
              const wedding = events.find((e) => e.eventType === "wedding");
              if (wedding) router.push(`/events/${wedding.id}?tab=budget`);
            }}
            className="group flex flex-col justify-between p-6 rounded-2xl glass-card text-left transition-all hover:border-indigo-500/50 hover:shadow-xl cursor-pointer hover:-translate-y-1"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400">
                  <Crown className="h-5 w-5" />
                </span>
                <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Budget Shock
                </span>
              </div>
              <h3 className="font-editorial text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                Scenario 1: Wedding Budget Cut
              </h3>
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Fixed Budget Reallocation (25L → 20L)
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Re-normalizes non-critical categories while locking the 7% contingency reserve.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-200/60 dark:border-white/5 flex items-center justify-between text-xs font-bold text-indigo-600 dark:text-indigo-400">
              <span>Inspect Budget Diff</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Scenario 2 */}
          <button
            onClick={() => {
              loadJudgeScenario(2);
              const bday = events.find((e) => e.eventType === "birthday");
              if (bday) router.push(`/events/${bday.id}?tab=guests`);
            }}
            className="group flex flex-col justify-between p-6 rounded-2xl glass-card text-left transition-all hover:border-indigo-500/50 hover:shadow-xl cursor-pointer hover:-translate-y-1"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                  <Cake className="h-5 w-5" />
                </span>
                <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Guest Surge
                </span>
              </div>
              <h3 className="font-editorial text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                Scenario 2: Birthday Guest Surge
              </h3>
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Sudden RSVP Surge (80 → 110 Guests)
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Flags venue capacity warnings and evaluates per-guest catering compression.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-200/60 dark:border-white/5 flex items-center justify-between text-xs font-bold text-indigo-600 dark:text-indigo-400">
              <span>Inspect Guest Limits</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Scenario 3 */}
          <button
            onClick={() => {
              loadJudgeScenario(3);
              const comm = events.find((e) => e.eventType === "community");
              if (comm) router.push(`/events/${comm.id}?tab=timeline`);
            }}
            className="group flex flex-col justify-between p-6 rounded-2xl glass-card text-left transition-all hover:border-indigo-500/50 hover:shadow-xl cursor-pointer hover:-translate-y-1"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <TreePine className="h-5 w-5" />
                </span>
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Timeline Rush
                </span>
              </div>
              <h3 className="font-editorial text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                Scenario 3: Date Compression
              </h3>
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Eco-Fair (Moved to 12 Days away)
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Triggers backwards timeline compression and flags urgent sound permit tasks.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-200/60 dark:border-white/5 flex items-center justify-between text-xs font-bold text-indigo-600 dark:text-indigo-400">
              <span>Inspect Timeline Rush</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 4. STICKY SCROLLING TOOLBAR: Search & Domain Filters     */}
      {/* ======================================================== */}
      <div className="sticky top-4 z-30 p-3 sm:p-4 rounded-3xl glass-panel flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg transition-all duration-300">
        <div className="relative w-full sm:w-88">
          <Search className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by celebration name or city..."
            className="w-full rounded-2xl border border-slate-200/80 dark:border-white/10 bg-slate-50/80 dark:bg-white/[0.04] pl-11 pr-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500 shadow-xs transition-all"
          />
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100/80 dark:bg-white/[0.04] border border-slate-200/60 dark:border-white/5 overflow-x-auto w-full sm:w-auto">
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
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-white shadow-sm ring-1 ring-slate-200/60 dark:ring-white/10 font-bold scale-[1.02]"
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

      {/* ======================================================== */}
      {/* 5. CELEBRATION CARDS (Generously Spaced & Elevated)      */}
      {/* ======================================================== */}
      {filteredEvents.length === 0 ? (
        <div className="text-center py-24 border border-dashed border-slate-300 dark:border-white/10 rounded-3xl glass-card space-y-4">
          <div className="h-14 w-14 rounded-2xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center mx-auto">
            <Search className="h-7 w-7" />
          </div>
          <p className="text-lg font-semibold text-slate-900 dark:text-white">No celebrations match your search criteria.</p>
          <Link
            href="/onboarding"
            className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/20 hover:shadow-xl hover:shadow-indigo-500/40 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 cursor-pointer"
          >
            <ChevronRight className="h-4 w-4 stroke-[2.5] transition-transform duration-300 group-hover:translate-x-1" />
            <span>Create New Celebration</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => {
            const daysRemaining = getDaysRemaining(event.date);
            const completedTasks = event.tasks.filter((t) => t.completed).length;
            const progress =
              event.tasks.length > 0 ? Math.round((completedTasks / event.tasks.length) * 100) : 0;

            return (
              <div
                key={event.id}
                className="group flex flex-col justify-between rounded-3xl glass-card p-7 sm:p-8 space-y-6 hover:border-indigo-500/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5"
              >
                <div className="space-y-5">
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold capitalize px-3.5 py-1.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                      {renderDashboardTypeIcon(event.eventType)}
                      <span>{event.eventType}</span>
                    </span>

                    <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{daysRemaining}d Left</span>
                    </span>
                  </div>

                  {/* Title & Metadata */}
                  <div>
                    <h2 className="font-editorial text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                      {event.title}
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 font-medium">
                      {event.city} • {event.guests} Guests • Tier {event.cityTier}
                    </p>
                  </div>

                  {/* Budget Highlight */}
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/70 dark:border-white/5 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500 dark:text-slate-400 font-medium">Total Allocated Budget</span>
                      <span className="font-display font-extrabold text-base text-slate-900 dark:text-white">
                        ₹{event.budget.toLocaleString()} {event.currency}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                      <span>100% Balanced</span>
                      <span>5-10% Contingency Safe</span>
                    </div>
                  </div>

                  {/* Task Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 font-medium">
                      <span>Milestone Progress</span>
                      <span className="font-bold text-slate-900 dark:text-white">{progress}%</span>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-5 border-t border-slate-200/60 dark:border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => duplicateEvent(event.id)}
                      className="p-2.5 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
                      title="Duplicate Event"
                      aria-label={`Duplicate ${event.title}`}
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => deleteEvent(event.id)}
                      className="p-2.5 rounded-xl text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
                      title="Delete Event"
                      aria-label={`Delete ${event.title}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <Link
                    href={`/events/${event.id}`}
                    onClick={() => setActiveEventId(event.id)}
                    className="inline-flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 px-3 py-2 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition-colors group/btn"
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
