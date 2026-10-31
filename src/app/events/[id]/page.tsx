"use client";

import React, { useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Calendar,
  Clock,
  DollarSign,
  ShieldCheck,
  Sparkles,
  PieChart,
  CheckCircle2,
  CheckSquare2,
  AlertTriangle,
  Download,
  Trash2,
  Edit3,
  LayoutDashboard,
  CalendarDays,
  Store,
  Users2,
  Lightbulb,
  Lock,
  Send,
  Printer,
  Crown,
  Cake,
  TreePine,
  Building2,
  PartyPopper,
  MapPin,
  Utensils,
  Music,
  Palette,
} from "lucide-react";
import { useEventStore } from "@/store/useEventStore";
import { Guest } from "@/types";
import { downloadICS } from "@/lib/export/ics";
import { downloadJSON } from "@/lib/export/json";

function renderEventBadgeIcon(type: string) {
  switch (type) {
    case "wedding":
      return <Crown className="h-3.5 w-3.5 text-indigo-600" />;
    case "birthday":
      return <Cake className="h-3.5 w-3.5 text-indigo-600" />;
    case "community":
      return <TreePine className="h-3.5 w-3.5 text-indigo-600" />;
    case "corporate":
      return <Building2 className="h-3.5 w-3.5 text-indigo-600" />;
    default:
      return <Sparkles className="h-3.5 w-3.5 text-indigo-600" />;
  }
}

export default function EventWorkspacePage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const eventId = params?.id as string;

  const events = useEventStore((s) => s.events);
  const activeScenarioDiff = useEventStore((s) => s.activeScenarioDiff);
  const activeScenarioNote = useEventStore((s) => s.activeScenarioNote);
  const clearScenarioDiff = useEventStore((s) => s.clearScenarioDiff);
  const reallocateBudget = useEventStore((s) => s.reallocateBudget);
  const applyBudgetDiff = useEventStore((s) => s.applyBudgetDiff);
  const toggleTask = useEventStore((s) => s.toggleTask);
  const deleteTask = useEventStore((s) => s.deleteTask);
  const updateVendor = useEventStore((s) => s.updateVendor);
  const deleteVendor = useEventStore((s) => s.deleteVendor);
  const addGuest = useEventStore((s) => s.addGuest);
  const updateGuestRSVP = useEventStore((s) => s.updateGuestRSVP);
  const deleteGuest = useEventStore((s) => s.deleteGuest);
  const toggleRecommendation = useEventStore((s) => s.toggleRecommendation);

  const event = events.find((e) => e.id === eventId);

  const tabParam = searchParams?.get("tab");
  const [selectedTab, setSelectedTab] = useState<string | null>(null);
  const activeTab = selectedTab || tabParam || "overview";

  // Reallocation modal state
  const [showReallocateModal, setShowReallocateModal] = useState(false);
  const [newBudgetInput, setNewBudgetInput] = useState<number>(event?.budget || 0);

  // New item inputs
  const [newGuestName, setNewGuestName] = useState("");
  const [newGuestCategory, setNewGuestCategory] = useState<Guest["category"]>("family");
  const [newGuestDietary, setNewGuestDietary] = useState("");

  // AI chat / planner state
  const [plannerQuery, setPlannerQuery] = useState("");
  const [plannerMessages, setPlannerMessages] = useState<
    { role: "user" | "assistant"; text: string; mode?: string }[]
  >([]);
  const [isPlanning, setIsPlanning] = useState(false);

  if (!event) {
    return (
      <div className="py-24 text-center max-w-md mx-auto space-y-5 ambient-bg">
        <div className="h-16 w-16 rounded-2xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center mx-auto">
          <AlertTriangle className="h-8 w-8" />
        </div>
        <h1 className="font-heading text-2xl font-black text-slate-900 dark:text-white">Celebration Not Found</h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          The requested celebration plan could not be located in your browser storage.
        </p>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-indigo-500/25"
        >
          Return to Dashboard
        </Link>
      </div>
    );
  }

  // Calculations
  const completedTasks = event.tasks.filter((t) => t.completed).length;
  const taskProgress =
    event.tasks.length > 0 ? Math.round((completedTasks / event.tasks.length) * 100) : 0;

  const totalSpentActual = event.budgetItems.reduce((acc, i) => acc + (i.actualAmount || 0), 0);
  const budgetUtilization = Math.round((totalSpentActual / event.budget) * 100);

  const confirmedGuests = event.guestsList.filter((g) => g.rsvp === "attending").length;

  // Days remaining
  const today = new Date();
  const eventDate = new Date(event.date);
  const daysRemaining = Math.max(0, Math.ceil((eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));

  // Overall Readiness Health Score
  const healthScore = Math.min(
    100,
    Math.round(taskProgress * 0.4 + (event.vendors.filter((v) => v.status === "booked").length > 0 ? 30 : 10) + 30)
  );

  // Tab definitions with modern Lucide icons
  const tabs = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "budget", label: "Budget (100%)", icon: PieChart },
    { id: "timeline", label: "Timeline", icon: CalendarDays },
    { id: "vendors", label: "Vendors", icon: Store },
    { id: "guests", label: "Guests", icon: Users2 },
    { id: "tasks", label: "Tasks", icon: CheckSquare2 },
    { id: "risks", label: "Risks & Contingency", icon: AlertTriangle },
    { id: "ideas", label: "Themes & Ideas", icon: Lightbulb },
    { id: "ai-planner", label: "AI Architect", icon: Sparkles },
  ];

  // Reallocate handler
  const handleReallocateClick = () => {
    reallocateBudget(event.id, newBudgetInput);
  };

  const handleConfirmReallocation = () => {
    if (activeScenarioDiff) {
      applyBudgetDiff(event.id, activeScenarioDiff);
      setShowReallocateModal(false);
    }
  };

  // Submit AI Planner Message
  const handleSendPlannerMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!plannerQuery.trim()) return;

    const userMsg = plannerQuery.trim();
    setPlannerQuery("");
    setPlannerMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setIsPlanning(true);

    try {
      const res = await fetch("/api/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventType: event.eventType,
          title: event.title,
          date: event.date,
          city: event.city,
          cityTier: event.cityTier,
          guests: event.guests,
          budget: event.budget,
          currency: event.currency,
          priorities: event.priorities,
          specialRequirements: userMsg,
        }),
      });

      if (!res.ok) throw new Error("API call failed");
      const data = await res.json();

      setPlannerMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: data.overview || "Plan generated successfully.",
          mode: data.mode,
        },
      ]);
    } catch {
      // Deterministic client fallback
      setPlannerMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: `[Demo Mode / Deterministic Fallback] Evaluated query '${userMsg}' against stored context for ${event.guests} guests in ${event.city}. Contingency buffer of ₹${Math.round(event.budget * 0.07).toLocaleString()} remains safely guarded. Recommended action: Lock vendor quotes at current per-plate threshold to prevent day-of price drift.`,
          mode: "demo",
        },
      ]);
    } finally {
      setIsPlanning(false);
    }
  };

  // Dietary counts
  const dietaryCounts = event.guestsList.reduce((acc, g) => {
    if (g.dietary && g.dietary.trim()) {
      acc[g.dietary] = (acc[g.dietary] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6 ambient-bg">
      {/* Workspace Header */}
      <div className="rounded-3xl glass-card p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold capitalize px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-500/20">
                {renderEventBadgeIcon(event.eventType)}
                <span>{event.eventType}</span>
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-white/5 px-2.5 py-1 rounded-full">
                <MapPin className="h-3 w-3 text-slate-400" />
                <span>{event.city} • Tier {event.cityTier}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                <span>{event.mode === "ai-enhanced" ? "AI-Enhanced Mode" : "Deterministic Demo Mode"}</span>
              </span>
            </div>

            <h1 className="font-editorial text-3xl sm:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
              {event.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
              Target Celebration Date: <strong className="text-slate-800 dark:text-slate-200">{event.date}</strong> • Style Theme: <span className="text-indigo-600 dark:text-indigo-400 font-semibold">{event.styleTheme || "Bespoke Contemporary"}</span>
            </p>
          </div>

          {/* Export & Actions */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => downloadICS(event)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.04] px-4 py-2.5 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 shadow-sm transition-all hover:scale-105 active:scale-95"
              title="Download iCalendar file (.ics)"
            >
              <Calendar className="h-4 w-4 text-indigo-600" />
              <span>Export .ICS</span>
            </button>

            <button
              onClick={() => downloadJSON(event)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.04] px-4 py-2.5 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 shadow-sm transition-all hover:scale-105 active:scale-95"
              title="Download full JSON workspace backup"
            >
              <Download className="h-4 w-4 text-violet-600" />
              <span>Export JSON</span>
            </button>

            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.04] px-4 py-2.5 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 shadow-sm transition-all hover:scale-105 active:scale-95"
              title="Print workspace plan"
            >
              <Printer className="h-4 w-4 text-rose-500" />
              <span>Print Plan</span>
            </button>
          </div>
        </div>

        {/* Quick Glance Metrics Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-5 border-t border-slate-200/70 dark:border-white/10">
          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/5">
            <span className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
              <Clock className="h-5 w-5" />
            </span>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Countdown</span>
              <p className="font-heading text-lg font-black text-slate-900 dark:text-white">{daysRemaining} Days Left</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/5">
            <span className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <DollarSign className="h-5 w-5" />
            </span>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">100% Balanced Budget</span>
              <p className="font-heading text-lg font-black text-emerald-600 dark:text-emerald-400">
                ₹{event.budget.toLocaleString()} {event.currency}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/5">
            <span className="p-2.5 rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400">
              <Users2 className="h-5 w-5" />
            </span>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Guest Scale</span>
              <p className="font-heading text-lg font-black text-slate-900 dark:text-white">
                {event.guests} Planned ({confirmedGuests} Confirmed)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/5">
            <span className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Sparkles className="h-5 w-5" />
            </span>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Health Readiness</span>
              <p className="font-heading text-lg font-black text-amber-500">{healthScore}% Ready</p>
            </div>
          </div>
        </div>
      </div>

      {/* Active Scenario Alert Banner if triggered */}
      {activeScenarioNote && (
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 dark:bg-amber-500/15 p-4 sm:p-5 flex items-start justify-between gap-4 text-xs shadow-md backdrop-blur-md">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
            <div>
              <span className="font-heading text-sm font-bold text-amber-800 dark:text-amber-300 block">
                Active Decision Scenario Notice
              </span>
              <p className="text-amber-700 dark:text-amber-200 mt-0.5 leading-relaxed">{activeScenarioNote}</p>
            </div>
          </div>
          <button
            onClick={clearScenarioDiff}
            className="text-xs text-amber-800 dark:text-amber-300 font-bold hover:underline px-3 py-1 rounded-lg bg-amber-500/20 whitespace-nowrap"
          >
            Dismiss Notice
          </button>
        </div>
      )}

      {/* Elevated Pill Tabs Navigation */}
      <div className="p-1.5 rounded-2xl bg-slate-100/80 dark:bg-white/[0.04] border border-slate-200/70 dark:border-white/5 overflow-x-auto shadow-sm">
        <nav className="flex items-center gap-1.5 min-w-max" aria-label="Workspace Tabs">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/30 font-bold scale-[1.02]"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/5"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon className={`h-4 w-4 ${isActive ? "text-white" : "text-slate-400"}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* ========================================== */}
      {/* TAB CONTENT: OVERVIEW */}
      {/* ========================================== */}
      {activeTab === "overview" && (
        <div className="space-y-6 tab-content-active">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Health & Readiness Card */}
            <div className="glass-card rounded-2xl p-6 space-y-4">
              <h2 className="font-heading text-base font-bold text-slate-900 dark:text-white flex items-center justify-between">
                <span>Event Readiness Health</span>
                <span className="text-indigo-600 dark:text-indigo-400 text-xl font-black">{healthScore}%</span>
              </h2>

              <div className="h-3 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-indigo-600 via-violet-500 to-rose-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${healthScore}%` }}
                />
              </div>

              <div className="space-y-2.5 text-xs text-slate-500 dark:text-slate-400 pt-1">
                <div className="flex justify-between items-center">
                  <span>Completed Action Items</span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {completedTasks} / {event.tasks.length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Actual Spend Tracked</span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    ₹{totalSpentActual.toLocaleString()} {event.currency} ({budgetUtilization}%)
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Confirmed Attendance</span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {confirmedGuests} / {event.guests} Guests
                  </span>
                </div>
              </div>
            </div>

            {/* 100% Balanced Budget Breakdown */}
            <div className="md:col-span-2 glass-card rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-heading text-base font-bold text-slate-900 dark:text-white">
                    Deterministic 100% Budget Distribution
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Mathematically locked: Sum of categories matches total budget with guaranteed 5-10% contingency.
                  </p>
                </div>
                <button
                  onClick={() => setShowReallocateModal(true)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  <Edit3 className="h-3.5 w-3.5" />
                  <span>Rebalance</span>
                </button>
              </div>

              {/* Multi-color category strip */}
              <div className="h-4 w-full rounded-full bg-slate-200 dark:bg-slate-800 flex overflow-hidden p-0.5 gap-0.5">
                {event.budgetItems.map((item, idx) => {
                  const pct = (item.plannedAmount / event.budget) * 100;
                  const colors = [
                    "bg-indigo-600",
                    "bg-violet-500",
                    "bg-rose-500",
                    "bg-amber-500",
                    "bg-emerald-500",
                    "bg-teal-500",
                    "bg-pink-500",
                    "bg-blue-500",
                  ];
                  return (
                    <div
                      key={item.id}
                      className={`${colors[idx % colors.length]} h-full transition-all`}
                      style={{ width: `${pct}%` }}
                      title={`${item.name}: ${pct.toFixed(1)}%`}
                    />
                  );
                })}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs">
                {event.budgetItems.slice(0, 6).map((item, idx) => {
                  const borderColors = [
                    "border-indigo-500",
                    "border-violet-500",
                    "border-rose-500",
                    "border-amber-500",
                    "border-emerald-500",
                    "border-teal-500",
                  ];
                  return (
                    <div key={item.id} className={`flex flex-col border-l-2 ${borderColors[idx % borderColors.length]} pl-2.5 py-0.5`}>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 truncate capitalize font-medium">
                        {item.name}
                      </span>
                      <span className="font-heading font-bold text-slate-900 dark:text-white">
                        ₹{item.plannedAmount.toLocaleString()}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Explainable AI Decision Cards */}
          <div className="glass-card rounded-2xl p-6 sm:p-7 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-heading text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                    <Sparkles className="h-4 w-4" />
                  </span>
                  <span>Explainable Decision Architecture</span>
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Every significant recommendation details rationale, financial trade-offs, and evaluated alternatives.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {event.recommendations.map((rec) => (
                <div
                  key={rec.id}
                  className="rounded-2xl border border-indigo-500/20 bg-slate-50/60 dark:bg-white/[0.03] p-5 flex flex-col justify-between space-y-4 hover:border-indigo-500/40 transition-all"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-heading text-sm font-bold text-slate-900 dark:text-white">{rec.title}</h3>
                      <button
                        onClick={() => toggleRecommendation(event.id, rec.id)}
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-full border transition-colors ${
                          rec.applied
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                            : "bg-slate-100 dark:bg-white/5 text-slate-500 border-slate-200 dark:border-white/10"
                        }`}
                      >
                        {rec.applied ? "Applied" : "Optional"}
                      </button>
                    </div>

                    <div className="p-3 rounded-xl bg-indigo-500/5 dark:bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-700 dark:text-indigo-300 font-semibold leading-relaxed">
                      &ldquo;{rec.recommendation}&rdquo;
                    </div>

                    <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      <p>
                        <strong className="text-slate-900 dark:text-white">Reasoning:</strong> {rec.reasoning}
                      </p>
                      <p>
                        <strong className="text-emerald-600 dark:text-emerald-400">Financial Impact:</strong> {rec.expectedImpact}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-slate-200/80 dark:border-white/10 pt-3 text-[11px] text-slate-500 dark:text-slate-400">
                    <span className="font-bold text-slate-700 dark:text-slate-300 block mb-1.5">Evaluated Alternatives:</span>
                    <ul className="list-disc list-inside space-y-1">
                      {rec.alternativeOptions.map((opt, i) => (
                        <li key={i}>{opt}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* TAB CONTENT: BUDGET */}
      {/* ========================================== */}
      {activeTab === "budget" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-heading text-xl font-bold text-slate-900 dark:text-white">
                Comprehensive 100% Budget Allocator
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Guaranteed mathematical 100% distribution with mandatory 5-10% contingency safety margin.
              </p>
            </div>

            <button
              onClick={() => setShowReallocateModal(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/35 transition-all"
            >
              <Edit3 className="h-4 w-4" />
              <span>Simulate Budget Cut / Increase</span>
            </button>
          </div>

          {/* Accessible Data Table View */}
          <div className="rounded-2xl glass-card overflow-hidden shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-100/80 dark:bg-white/[0.04] text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200/80 dark:border-white/10">
                  <tr>
                    <th scope="col" className="p-4">Category</th>
                    <th scope="col" className="p-4 text-right">Planned ({event.currency})</th>
                    <th scope="col" className="p-4 text-right">Estimated</th>
                    <th scope="col" className="p-4 text-right">Actual Spent</th>
                    <th scope="col" className="p-4 text-right">Variance</th>
                    <th scope="col" className="p-4">Decision Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/80 dark:divide-white/5 text-slate-800 dark:text-slate-200">
                  {event.budgetItems.map((item) => {
                    const variance = item.plannedAmount - (item.actualAmount || 0);
                    return (
                      <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
                        <td className="p-4 font-bold capitalize flex items-center gap-2.5">
                          <span className="h-2.5 w-2.5 rounded-full bg-indigo-600" />
                          <span>{item.name}</span>
                        </td>
                        <td className="p-4 text-right font-mono font-bold">
                          ₹{item.plannedAmount.toLocaleString()}
                        </td>
                        <td className="p-4 text-right font-mono text-slate-500">
                          ₹{item.estimatedAmount.toLocaleString()}
                        </td>
                        <td className="p-4 text-right font-mono font-bold text-indigo-600 dark:text-indigo-400">
                          ₹{(item.actualAmount || 0).toLocaleString()}
                        </td>
                        <td
                          className={`p-4 text-right font-mono font-bold ${
                            variance < 0 ? "text-rose-500" : "text-emerald-600 dark:text-emerald-400"
                          }`}
                        >
                          {variance >= 0 ? `+₹${variance.toLocaleString()}` : `-₹${Math.abs(variance).toLocaleString()}`}
                        </td>
                        <td className="p-4 text-xs text-slate-500 dark:text-slate-400">
                          {item.notes || "Standard baseline distribution"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot className="bg-slate-100/90 dark:bg-white/[0.06] font-bold border-t border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white">
                  <tr>
                    <td className="p-4 font-black">Total Guaranteed</td>
                    <td className="p-4 text-right font-mono font-black text-indigo-600 dark:text-indigo-400 text-sm">
                      ₹{event.budget.toLocaleString()} {event.currency}
                    </td>
                    <td className="p-4 text-right font-mono">
                      ₹{event.budgetItems
                        .reduce((sum, i) => sum + i.estimatedAmount, 0)
                        .toLocaleString()}
                    </td>
                    <td className="p-4 text-right font-mono text-emerald-600 dark:text-emerald-400">
                      ₹{totalSpentActual.toLocaleString()}
                    </td>
                    <td className="p-4 text-right font-mono">
                      +₹{(event.budget - totalSpentActual).toLocaleString()}
                    </td>
                    <td className="p-4 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      100% Exact Invariant (0% Drift)
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* TAB CONTENT: TIMELINE */}
      {/* ========================================== */}
      {activeTab === "timeline" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-heading text-xl font-bold text-slate-900 dark:text-white">
                Backwards Milestone Timeline
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Reverse-scheduled backwards from target celebration date ({event.date}). Automatically compresses under short lead times.
              </p>
            </div>
            <button
              onClick={() => downloadICS(event)}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.04] px-4 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10"
            >
              <Calendar className="h-4 w-4 text-indigo-600" />
              <span>Sync to Calendar (.ics)</span>
            </button>
          </div>

          <div className="space-y-3">
            {event.tasks.map((task) => (
              <div
                key={task.id}
                className={`flex items-center justify-between p-4 sm:p-5 rounded-2xl glass-card transition-all ${
                  task.completed ? "opacity-60 bg-slate-50/40 dark:bg-white/[0.02]" : "hover:border-indigo-500/40 shadow-sm"
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <button
                    onClick={() => toggleTask(event.id, task.id)}
                    className={`flex h-6 w-6 items-center justify-center rounded-lg border transition-all cursor-pointer ${
                      task.completed
                        ? "border-emerald-500 bg-emerald-500 text-white"
                        : "border-slate-300 dark:border-white/20 hover:border-indigo-500"
                    }`}
                    aria-label={`Toggle completion of ${task.title}`}
                  >
                    {task.completed && <CheckCircle2 className="h-4 w-4" />}
                  </button>
                  <div>
                    <p
                      className={`text-sm font-bold ${
                        task.completed ? "line-through text-slate-400 dark:text-slate-500" : "text-slate-900 dark:text-white"
                      }`}
                    >
                      {task.title}
                    </p>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      Target Due: <strong className="text-slate-700 dark:text-slate-300">{task.dueDate}</strong> • Category: <span className="capitalize">{task.category}</span>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full ${
                      task.priority === "high"
                        ? "bg-rose-500/10 text-rose-600 border border-rose-500/20"
                        : "bg-amber-500/10 text-amber-600 border border-amber-500/20"
                    }`}
                  >
                    {task.priority} Priority
                  </span>
                  <button
                    onClick={() => deleteTask(event.id, task.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
                    aria-label={`Delete task ${task.title}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* TAB CONTENT: VENDORS */}
      {/* ========================================== */}
      {activeTab === "vendors" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-heading text-xl font-bold text-slate-900 dark:text-white">
                Vendor Directory & Evaluation Matrix
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Explicit separation between user-entered vendors and AI benchmark estimates.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {event.vendors.map((vendor) => (
              <div
                key={vendor.id}
                className={`rounded-2xl glass-card p-6 flex flex-col justify-between space-y-4 ${
                  vendor.isAISuggestion ? "border-indigo-500/30" : ""
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                        vendor.isAISuggestion
                          ? "bg-indigo-600 text-white shadow-sm"
                          : "bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      {vendor.isAISuggestion ? "AI Suggested Benchmark" : "User Sourced Vendor"}
                    </span>
                    <span
                      className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                        vendor.status === "booked"
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                          : vendor.status === "quoted"
                          ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                          : "bg-slate-100 dark:bg-white/10 text-slate-600"
                      }`}
                    >
                      {vendor.status.replace("_", " ").toUpperCase()}
                    </span>
                  </div>

                  <h3 className="font-heading text-base font-bold text-slate-900 dark:text-white">{vendor.name}</h3>

                  {vendor.contactPerson && (
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Contact: <strong className="text-slate-700 dark:text-slate-300">{vendor.contactPerson}</strong> ({vendor.phone || "No phone"})
                    </p>
                  )}

                  <p className="text-sm font-mono font-bold text-indigo-600 dark:text-indigo-400">
                    Est. Cost: ₹{vendor.estimatedCost.toLocaleString()} {event.currency}
                    {vendor.advancePaid ? ` (Advance: ₹${vendor.advancePaid.toLocaleString()})` : ""}
                  </p>

                  {vendor.notes && (
                    <p className="text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-white/[0.03] p-3 rounded-xl border border-slate-200/60 dark:border-white/5">
                      {vendor.notes}
                    </p>
                  )}
                </div>

                <div className="border-t border-slate-200/80 dark:border-white/10 pt-3 flex items-center justify-between text-xs">
                  <span className="text-slate-500 dark:text-slate-400 capitalize font-medium">
                    Category: {vendor.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        updateVendor(event.id, vendor.id, {
                          status: vendor.status === "booked" ? "quoted" : "booked",
                        })
                      }
                      className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      {vendor.status === "booked" ? "Mark Quoted" : "Mark Booked"}
                    </button>
                    {!vendor.isAISuggestion && (
                      <button
                        onClick={() => deleteVendor(event.id, vendor.id)}
                        className="p-1.5 text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors"
                        aria-label={`Delete vendor ${vendor.name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* TAB CONTENT: GUESTS */}
      {/* ========================================== */}
      {activeTab === "guests" && (
        <div className="space-y-6">
          {/* Privacy Banner */}
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5 flex items-center justify-between text-xs text-emerald-800 dark:text-emerald-300 shadow-sm backdrop-blur-md">
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-xl bg-emerald-500/20 text-emerald-600">
                <Lock className="h-5 w-5" />
              </span>
              <span>
                <strong className="block text-sm">Zero-PII Client-Isolated Guarantee:</strong>
                All guest names, dietary preferences, and contacts are stored strictly in your browser&apos;s LocalStorage. Never transmitted to third-party AI models.
              </span>
            </div>
          </div>

          {/* Dietary Summary Chips */}
          {Object.keys(dietaryCounts).length > 0 && (
            <div className="flex flex-wrap items-center gap-2 p-4 rounded-2xl glass-card">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 mr-2 flex items-center gap-1.5">
                <Utensils className="h-4 w-4 text-indigo-500" />
                Dietary Summary:
              </span>
              {Object.entries(dietaryCounts).map(([diet, count]) => (
                <span key={diet} className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-500/20">
                  <span>{diet}</span>
                  <span className="h-4 w-4 rounded-full bg-indigo-600 text-white text-[10px] flex items-center justify-center font-bold">
                    {count}
                  </span>
                </span>
              ))}
            </div>
          )}

          <div className="rounded-2xl glass-card p-6 space-y-5">
            <h2 className="font-heading text-lg font-bold text-slate-900 dark:text-white">
              Guest RSVP Management
            </h2>

            {/* Quick Add Guest Form */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <input
                type="text"
                placeholder="Guest Name (e.g. Rohini Sen)"
                value={newGuestName}
                onChange={(e) => setNewGuestName(e.target.value)}
                className="rounded-xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/60 px-3.5 py-2.5 text-xs text-slate-900 dark:text-white"
              />
              <select
                value={newGuestCategory}
                onChange={(e) => setNewGuestCategory(e.target.value as Guest["category"])}
                className="rounded-xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/60 px-3.5 py-2.5 text-xs text-slate-900 dark:text-white"
              >
                <option value="family">Family</option>
                <option value="friend">Friend</option>
                <option value="colleague">Colleague</option>
                <option value="vip">VIP</option>
              </select>
              <input
                type="text"
                placeholder="Dietary Note (e.g. Vegetarian, Jain)"
                value={newGuestDietary}
                onChange={(e) => setNewGuestDietary(e.target.value)}
                className="rounded-xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/60 px-3.5 py-2.5 text-xs text-slate-900 dark:text-white"
              />
              <button
                type="button"
                onClick={() => {
                  if (newGuestName.trim()) {
                    addGuest(event.id, {
                      name: newGuestName.trim(),
                      category: newGuestCategory,
                      rsvp: "attending",
                      plusOnes: 0,
                      dietary: newGuestDietary.trim(),
                    });
                    setNewGuestName("");
                    setNewGuestDietary("");
                  }
                }}
                className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-500/20"
              >
                Add Guest to Roster
              </button>
            </div>

            {/* Guest Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-100/80 dark:bg-white/[0.04] text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200/80 dark:border-white/10">
                  <tr>
                    <th className="p-3.5">Name</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">RSVP Status</th>
                    <th className="p-3.5">Dietary Requirement</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/80 dark:divide-white/5 text-slate-800 dark:text-slate-200">
                  {event.guestsList.map((guest) => (
                    <tr key={guest.id} className="hover:bg-slate-50 dark:hover:bg-white/[0.02]">
                      <td className="p-3.5 font-bold">{guest.name}</td>
                      <td className="p-3.5 capitalize text-slate-500">
                        {guest.category}
                      </td>
                      <td className="p-3.5">
                        <select
                          value={guest.rsvp}
                          onChange={(e) =>
                            updateGuestRSVP(event.id, guest.id, e.target.value as Guest["rsvp"])
                          }
                          className="rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 px-2.5 py-1 text-xs font-semibold"
                        >
                          <option value="attending">Attending</option>
                          <option value="declined">Declined</option>
                          <option value="tentative">Tentative</option>
                          <option value="invited">Invited</option>
                        </select>
                      </td>
                      <td className="p-3.5 text-slate-600 dark:text-slate-300">
                        {guest.dietary ? (
                          <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/10 text-xs">
                            {guest.dietary}
                          </span>
                        ) : (
                          "Standard Menu"
                        )}
                      </td>
                      <td className="p-3.5 text-right">
                        <button
                          onClick={() => deleteGuest(event.id, guest.id)}
                          className="p-1.5 text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors"
                          aria-label={`Remove guest ${guest.name}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* TAB CONTENT: RISKS & CONTINGENCY */}
      {/* ========================================== */}
      {activeTab === "risks" && (
        <div className="space-y-6">
          <div>
            <h2 className="font-heading text-xl font-bold text-slate-900 dark:text-white">
              Contextual Risk & Contingency Matrix
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Actionable operational mitigations formulated against weather, density, and supplier dependencies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {event.risks.map((risk) => (
              <div
                key={risk.id}
                className="rounded-2xl glass-card p-6 space-y-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-heading text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0" />
                    <span>{risk.title}</span>
                  </h3>
                  <div className="flex gap-1.5">
                    <span className="text-[10px] font-bold uppercase px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                      Likelihood: {risk.likelihood}
                    </span>
                    <span className="text-[10px] font-bold uppercase px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                      Severity: {risk.severity}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 text-xs leading-relaxed">
                  <div className="p-3 rounded-xl bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20">
                    <strong className="text-emerald-700 dark:text-emerald-300 block mb-0.5">Preventive Action Plan:</strong>
                    <span className="text-slate-700 dark:text-slate-200">{risk.preventiveAction}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-indigo-500/5 dark:bg-indigo-500/10 border border-indigo-500/20">
                    <strong className="text-indigo-700 dark:text-indigo-300 block mb-0.5">Day-Of Backup Contingency:</strong>
                    <span className="text-slate-700 dark:text-slate-200">{risk.backupPlan}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* TAB CONTENT: THEMES & IDEAS */}
      {/* ========================================== */}
      {activeTab === "ideas" && (
        <div className="space-y-6">
          <div>
            <h2 className="font-heading text-xl font-bold text-slate-900 dark:text-white">
              Curated Celebration Inspiration
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Tailored concepts for themes, catering highlights, guest activities, and musical playlists.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl glass-card p-6 space-y-3.5">
              <h3 className="font-heading text-base font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
                <Palette className="h-4.5 w-4.5" />
                <span>Thematic Concepts</span>
              </h3>
              <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                {event.ideas.themes.map((theme, i) => (
                  <li key={i} className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 dark:bg-white/[0.02]">
                    <span className="h-2 w-2 rounded-full bg-indigo-600 shrink-0" />
                    <span>{theme}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl glass-card p-6 space-y-3.5">
              <h3 className="font-heading text-base font-bold text-rose-500 flex items-center gap-2">
                <Utensils className="h-4.5 w-4.5" />
                <span>Catering & Food Highlights</span>
              </h3>
              <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                {event.ideas.menus.map((menu, i) => (
                  <li key={i} className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 dark:bg-white/[0.02]">
                    <span className="h-2 w-2 rounded-full bg-rose-500 shrink-0" />
                    <span>{menu}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl glass-card p-6 space-y-3.5">
              <h3 className="font-heading text-base font-bold text-violet-500 flex items-center gap-2">
                <PartyPopper className="h-4.5 w-4.5" />
                <span>Guest Experiences & Icebreakers</span>
              </h3>
              <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                {event.ideas.activities.map((act, i) => (
                  <li key={i} className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 dark:bg-white/[0.02]">
                    <span className="h-2 w-2 rounded-full bg-violet-500 shrink-0" />
                    <span>{act}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl glass-card p-6 space-y-3.5">
              <h3 className="font-heading text-base font-bold text-emerald-500 flex items-center gap-2">
                <Music className="h-4.5 w-4.5" />
                <span>Soundtrack & Playlist Vibes</span>
              </h3>
              <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                {event.ideas.playlists.map((pl, i) => (
                  <li key={i} className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 dark:bg-white/[0.02]">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
                    <span>{pl}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* TAB CONTENT: AI PLANNER */}
      {/* ========================================== */}
      {activeTab === "ai-planner" && (
        <div className="space-y-6">
          <div>
            <h2 className="font-heading text-xl font-bold text-slate-900 dark:text-white">
              AI Celebration Architect
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Interactive contextual assistant with automatic offline fallback to deterministic pure-math rules.
            </p>
          </div>

          <div className="rounded-3xl glass-card p-6 sm:p-7 space-y-4 shadow-xl">
            <div className="space-y-3 min-h-[180px] max-h-[380px] overflow-y-auto p-4 rounded-2xl bg-slate-50/70 dark:bg-black/30 border border-slate-200/60 dark:border-white/5">
              {plannerMessages.length === 0 ? (
                <div className="text-center py-10 space-y-2">
                  <div className="h-10 w-10 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center mx-auto">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Ask any planning strategy or scenario adjustment:
                  </p>
                  <p className="text-[11px] text-slate-400 max-w-sm mx-auto">
                    &ldquo;What if I shift 15% budget from decor to catering?&rdquo; or &ldquo;Recommend rain backup equipment for outdoor event.&rdquo;
                  </p>
                </div>
              ) : (
                plannerMessages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
                  >
                    <div
                      className={`rounded-2xl px-4 py-3 max-w-xl text-xs leading-relaxed shadow-sm ${
                        msg.role === "user"
                          ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white"
                          : "bg-white dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-white/10"
                      }`}
                    >
                      {msg.mode && (
                        <span className="block text-[10px] font-bold text-indigo-500 dark:text-indigo-400 mb-1">
                          [{msg.mode === "ai-enhanced" ? "AI Enhanced (Gemini)" : "Deterministic Demo Engine"}]
                        </span>
                      )}
                      <p>{msg.text}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            <form onSubmit={handleSendPlannerMessage} className="flex gap-2">
              <input
                type="text"
                value={plannerQuery}
                onChange={(e) => setPlannerQuery(e.target.value)}
                placeholder="Ask the AI Celebration Architect..."
                className="flex-1 rounded-xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/60 px-4 py-2.5 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                disabled={isPlanning}
                className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/35 disabled:opacity-50 flex items-center gap-1.5"
              >
                <Send className="h-3.5 w-3.5" />
                <span>{isPlanning ? "Analyzing..." : "Ask"}</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* REALLOCATION MODAL */}
      {/* ========================================== */}
      {showReallocateModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-md"
        >
          <div className="rounded-3xl glass-card p-6 sm:p-7 max-w-lg w-full space-y-4 shadow-2xl border border-slate-200 dark:border-white/10">
            <h3 className="font-heading text-lg font-black text-slate-900 dark:text-white">
              Simulate Budget Shock Rebalance
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Adjust your total budget to see deterministic before-and-after reallocations across categories while strictly safeguarding the 5-10% contingency safety margin.
            </p>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                New Target Budget ({event.currency})
              </label>
              <input
                type="number"
                value={newBudgetInput}
                onChange={(e) => setNewBudgetInput(parseInt(e.target.value) || 0)}
                className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/60 px-4 py-2.5 text-sm font-mono font-bold text-slate-900 dark:text-white"
              />
            </div>

            <button
              onClick={handleReallocateClick}
              className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-500/25 hover:shadow-indigo-500/40"
            >
              Calculate Deterministic Diff
            </button>

            {/* Diff Preview */}
            {activeScenarioDiff && (
              <div className="space-y-3 pt-3 border-t border-slate-200/80 dark:border-white/10 text-xs">
                <p className="text-slate-800 dark:text-slate-200 font-semibold leading-relaxed">
                  {activeScenarioDiff.explanation}
                </p>

                <div className="max-h-52 overflow-y-auto space-y-1.5 text-xs">
                  {activeScenarioDiff.diffItems.map((item) => (
                    <div
                      key={item.category}
                      className="flex justify-between items-center p-2 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/5"
                    >
                      <span className="capitalize font-bold text-slate-800 dark:text-slate-200">{item.category}</span>
                      <span className="font-mono">
                        ₹{item.previousPlanned.toLocaleString()} →{" "}
                        <strong className="text-indigo-600 dark:text-indigo-400">
                          ₹{item.newPlanned.toLocaleString()}
                        </strong>
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2.5 pt-2">
                  <button
                    onClick={handleConfirmReallocation}
                    className="flex-1 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-emerald-500/20 hover:bg-emerald-700"
                  >
                    Accept & Commit Diff
                  </button>
                  <button
                    onClick={() => {
                      clearScenarioDiff();
                      setShowReallocateModal(false);
                    }}
                    className="flex-1 rounded-xl border border-slate-200 dark:border-white/10 px-4 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
