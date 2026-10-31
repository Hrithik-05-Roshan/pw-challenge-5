"use client";

import React, { useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Calendar,
  Clock,
  DollarSign,
  Users,
  ShieldCheck,
  Sparkles,
  PieChart,
  CheckCircle2,
  AlertTriangle,
  Download,
  Trash2,
  Edit3,
  FileText,
} from "lucide-react";
import { useEventStore } from "@/store/useEventStore";
import { Guest } from "@/types";
import { downloadICS } from "@/lib/export/ics";
import { downloadJSON } from "@/lib/export/json";

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
      <div className="py-20 text-center max-w-md mx-auto space-y-4">
        <h1 className="text-xl font-bold text-[var(--foreground)]">Event Not Found</h1>
        <p className="text-sm text-[var(--muted-foreground)]">
          The requested celebration plan could not be located in your browser storage.
        </p>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white"
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

  // Tab definitions
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "budget", label: "Budget" },
    { id: "timeline", label: "Timeline" },
    { id: "vendors", label: "Vendors" },
    { id: "guests", label: "Guests" },
    { id: "tasks", label: "Tasks" },
    { id: "risks", label: "Risks & Contingency" },
    { id: "ideas", label: "Ideas & Themes" },
    { id: "ai-planner", label: "AI Planner" },
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
          text: `[Demo Mode / Offline Fallback] Evaluated query '${userMsg}' against stored context for ${event.guests} guests in ${event.city}. Contingency buffer of ₹${Math.round(event.budget * 0.08).toLocaleString()} remains safely guarded. Recommended action: Lock vendor quotes at current per-plate threshold.`,
          mode: "demo",
        },
      ]);
    } finally {
      setIsPlanning(false);
    }
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
      {/* Workspace Header */}
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-500/10 px-2.5 py-0.5 rounded-full">
                {event.eventType}
              </span>
              <span className="text-xs text-[var(--muted-foreground)]">
                {event.city} • Tier {event.cityTier}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                <ShieldCheck className="h-3 w-3" />
                {event.mode === "ai-enhanced" ? "AI-Enhanced" : "Demo Mode"}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--foreground)] mt-1 tracking-tight">
              {event.title}
            </h1>
          </div>

          {/* Export & Actions */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => downloadICS(event)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-xs font-semibold text-[var(--foreground)] hover:bg-[var(--secondary)] transition-colors"
              title="Download iCalendar file (.ics)"
            >
              <Calendar className="h-3.5 w-3.5 text-indigo-500" />
              <span>Export .ICS</span>
            </button>

            <button
              onClick={() => downloadJSON(event)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-xs font-semibold text-[var(--foreground)] hover:bg-[var(--secondary)] transition-colors"
              title="Download full JSON workspace backup"
            >
              <Download className="h-3.5 w-3.5 text-indigo-500" />
              <span>Export JSON</span>
            </button>

            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-xs font-semibold text-[var(--foreground)] hover:bg-[var(--secondary)] transition-colors"
              title="Print workspace plan"
            >
              <FileText className="h-3.5 w-3.5 text-indigo-500" />
              <span>Print View</span>
            </button>
          </div>
        </div>

        {/* Quick Glance Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-[var(--border)]">
          <div className="flex items-center gap-2.5">
            <Clock className="h-4 w-4 text-indigo-500" />
            <div>
              <span className="text-[10px] uppercase text-[var(--muted-foreground)]">Countdown</span>
              <p className="text-xs font-bold text-[var(--foreground)]">{daysRemaining} Days Left</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <DollarSign className="h-4 w-4 text-emerald-500" />
            <div>
              <span className="text-[10px] uppercase text-[var(--muted-foreground)]">Total Budget</span>
              <p className="text-xs font-bold text-[var(--foreground)]">
                {event.budget.toLocaleString()} {event.currency}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Users className="h-4 w-4 text-violet-500" />
            <div>
              <span className="text-[10px] uppercase text-[var(--muted-foreground)]">Guest Scale</span>
              <p className="text-xs font-bold text-[var(--foreground)]">
                {event.guests} Planned ({confirmedGuests} Confirmed)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Sparkles className="h-4 w-4 text-amber-500" />
            <div>
              <span className="text-[10px] uppercase text-[var(--muted-foreground)]">Health Score</span>
              <p className="text-xs font-bold text-[var(--foreground)]">{healthScore}% Ready</p>
            </div>
          </div>
        </div>
      </div>

      {/* Active Scenario Alert Banner if triggered */}
      {activeScenarioNote && (
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 flex items-start justify-between gap-3 text-xs">
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
            <div>
              <span className="font-bold text-amber-700 dark:text-amber-400">
                Decision Intelligence Notice:
              </span>
              <p className="text-amber-800 dark:text-amber-300 mt-0.5">{activeScenarioNote}</p>
            </div>
          </div>
          <button
            onClick={clearScenarioDiff}
            className="text-xs text-amber-700 dark:text-amber-300 font-bold hover:underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Tabs Navigation */}
      <div className="border-b border-[var(--border)] overflow-x-auto">
        <nav className="flex space-x-6 pb-px" aria-label="Workspace Tabs">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`whitespace-nowrap py-3 px-1 text-xs sm:text-sm font-semibold border-b-2 transition-all ${
                  isActive
                    ? "border-indigo-600 text-indigo-600"
                    : "border-transparent text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:border-slate-300"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* TAB CONTENT: OVERVIEW */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Health & Readiness Card */}
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 space-y-4">
              <h2 className="text-base font-bold text-[var(--foreground)] flex items-center justify-between">
                <span>Event Health & Readiness</span>
                <span className="text-indigo-600 text-lg font-extrabold">{healthScore}%</span>
              </h2>

              <div className="h-3 w-full rounded-full bg-[var(--secondary)] overflow-hidden">
                <div
                  className="bg-indigo-600 h-full rounded-full transition-all"
                  style={{ width: `${healthScore}%` }}
                />
              </div>

              <div className="space-y-2 text-xs text-[var(--muted-foreground)]">
                <div className="flex justify-between">
                  <span>Completed Tasks</span>
                  <span className="font-semibold text-[var(--foreground)]">
                    {completedTasks} / {event.tasks.length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Actual Spend Tracked</span>
                  <span className="font-semibold text-[var(--foreground)]">
                    {totalSpentActual.toLocaleString()} {event.currency} ({budgetUtilization}%)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Confirmed Attendance</span>
                  <span className="font-semibold text-[var(--foreground)]">
                    {confirmedGuests} Guests
                  </span>
                </div>
              </div>
            </div>

            {/* Guaranteed Budget Ring Overview */}
            <div className="md:col-span-2 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-[var(--foreground)] flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-indigo-600" />
                  <span>100% Balanced Budget Breakdown</span>
                </h2>
                <button
                  onClick={() => setShowReallocateModal(true)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-500/10 px-2.5 py-1 rounded-md"
                >
                  <Edit3 className="h-3.5 w-3.5" />
                  <span>Reallocate Budget</span>
                </button>
              </div>

              {/* Progress visual */}
              <div className="h-4 w-full rounded-full bg-[var(--secondary)] flex overflow-hidden">
                {event.budgetItems.map((item, idx) => {
                  const pct = (item.plannedAmount / event.budget) * 100;
                  const colors = [
                    "bg-indigo-600",
                    "bg-violet-500",
                    "bg-pink-500",
                    "bg-amber-500",
                    "bg-emerald-500",
                    "bg-cyan-500",
                    "bg-rose-500",
                    "bg-blue-500",
                    "bg-slate-500",
                    "bg-emerald-600",
                  ];
                  return (
                    <div
                      key={item.id}
                      className={`${colors[idx % colors.length]} h-full`}
                      style={{ width: `${pct}%` }}
                      title={`${item.name}: ${pct.toFixed(0)}%`}
                    />
                  );
                })}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 text-xs">
                {event.budgetItems.slice(0, 6).map((item) => (
                  <div key={item.id} className="flex flex-col border-l-2 border-indigo-500 pl-2">
                    <span className="text-[11px] text-[var(--muted-foreground)] truncate">
                      {item.name}
                    </span>
                    <span className="font-bold text-[var(--foreground)]">
                      {item.plannedAmount.toLocaleString()} {event.currency}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Explainable AI Decision Cards */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-[var(--foreground)] flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-indigo-600" />
                  <span>Explainable Decision Architecture</span>
                </h2>
                <p className="text-xs text-[var(--muted-foreground)]">
                  Every significant recommendation exposes reasoning, expected impact, and alternatives.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {event.recommendations.map((rec) => (
                <div
                  key={rec.id}
                  className="rounded-xl border border-indigo-500/20 bg-[var(--background)] p-4 flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm font-bold text-[var(--foreground)]">{rec.title}</h3>
                      <button
                        onClick={() => toggleRecommendation(event.id, rec.id)}
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          rec.applied
                            ? "bg-emerald-500/10 text-emerald-600"
                            : "bg-[var(--secondary)] text-[var(--muted-foreground)]"
                        }`}
                      >
                        {rec.applied ? "Applied" : "Optional"}
                      </button>
                    </div>

                    <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
                      &ldquo;{rec.recommendation}&rdquo;
                    </p>

                    <div className="space-y-1 text-[11px] text-[var(--muted-foreground)]">
                      <p>
                        <strong>Reasoning:</strong> {rec.reasoning}
                      </p>
                      <p>
                        <strong>Expected Impact:</strong> {rec.expectedImpact}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-[var(--border)] pt-2 text-[10px] text-[var(--muted-foreground)]">
                    <span className="font-semibold block mb-1">Evaluated Alternatives:</span>
                    <ul className="list-disc list-inside space-y-0.5">
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

      {/* TAB CONTENT: BUDGET */}
      {activeTab === "budget" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-[var(--foreground)]">Comprehensive Budget Allocator</h2>
              <p className="text-xs text-[var(--muted-foreground)]">
                Guaranteed mathematical 100% distribution with mandatory 5-10% contingency safety margin.
              </p>
            </div>

            <button
              onClick={() => setShowReallocateModal(true)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow hover:bg-indigo-700"
            >
              <Edit3 className="h-4 w-4" />
              <span>Simulate Budget Cut / Increase</span>
            </button>
          </div>

          {/* Accessible Data Table View */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-[var(--secondary)]/60 text-[var(--foreground)] font-semibold border-b border-[var(--border)]">
                  <tr>
                    <th scope="col" className="p-3 sm:p-4">Category</th>
                    <th scope="col" className="p-3 sm:p-4 text-right">Planned ({event.currency})</th>
                    <th scope="col" className="p-3 sm:p-4 text-right">Estimated</th>
                    <th scope="col" className="p-3 sm:p-4 text-right">Actual Spent</th>
                    <th scope="col" className="p-3 sm:p-4 text-right">Variance</th>
                    <th scope="col" className="p-3 sm:p-4">Logic & Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)] text-[var(--foreground)]">
                  {event.budgetItems.map((item) => {
                    const variance = item.plannedAmount - (item.actualAmount || 0);
                    return (
                      <tr key={item.id} className="hover:bg-[var(--secondary)]/30 transition-colors">
                        <td className="p-3 sm:p-4 font-semibold capitalize flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-indigo-600" />
                          <span>{item.name}</span>
                        </td>
                        <td className="p-3 sm:p-4 text-right font-mono font-medium">
                          {item.plannedAmount.toLocaleString()}
                        </td>
                        <td className="p-3 sm:p-4 text-right font-mono text-[var(--muted-foreground)]">
                          {item.estimatedAmount.toLocaleString()}
                        </td>
                        <td className="p-3 sm:p-4 text-right font-mono font-bold text-indigo-600">
                          {(item.actualAmount || 0).toLocaleString()}
                        </td>
                        <td
                          className={`p-3 sm:p-4 text-right font-mono font-semibold ${
                            variance < 0 ? "text-rose-500" : "text-emerald-600"
                          }`}
                        >
                          {variance >= 0 ? `+${variance.toLocaleString()}` : variance.toLocaleString()}
                        </td>
                        <td className="p-3 sm:p-4 text-xs text-[var(--muted-foreground)]">
                          {item.notes || "Standard baseline distribution"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot className="bg-[var(--secondary)]/80 font-bold border-t border-[var(--border)]">
                  <tr>
                    <td className="p-3 sm:p-4">Total Sum Guaranteed</td>
                    <td className="p-3 sm:p-4 text-right font-mono text-indigo-600">
                      {event.budget.toLocaleString()} {event.currency}
                    </td>
                    <td className="p-3 sm:p-4 text-right font-mono">
                      {event.budgetItems
                        .reduce((sum, i) => sum + i.estimatedAmount, 0)
                        .toLocaleString()}
                    </td>
                    <td className="p-3 sm:p-4 text-right font-mono text-emerald-600">
                      {totalSpentActual.toLocaleString()}
                    </td>
                    <td className="p-3 sm:p-4 text-right font-mono">
                      +{(event.budget - totalSpentActual).toLocaleString()}
                    </td>
                    <td className="p-3 sm:p-4 text-xs font-normal text-emerald-600">
                      100% Balanced (Zero Drift)
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: TIMELINE */}
      {activeTab === "timeline" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-[var(--foreground)]">Backwards Milestone Timeline</h2>
              <p className="text-xs text-[var(--muted-foreground)]">
                Reverse-scheduled backwards from {event.date}. Milestones automatically compress on short notice.
              </p>
            </div>
            <button
              onClick={() => downloadICS(event)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-xs font-semibold text-[var(--foreground)] hover:bg-[var(--secondary)]"
            >
              <Calendar className="h-4 w-4 text-indigo-600" />
              <span>Sync to Calendar (.ics)</span>
            </button>
          </div>

          <div className="space-y-3">
            {event.tasks.map((task) => (
              <div
                key={task.id}
                className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                  task.completed
                    ? "border-[var(--border)] bg-[var(--secondary)]/20 opacity-70"
                    : "border-indigo-500/20 bg-[var(--card)] shadow-sm"
                }`}
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleTask(event.id, task.id)}
                    className={`flex h-6 w-6 items-center justify-center rounded border transition-colors ${
                      task.completed
                        ? "border-emerald-500 bg-emerald-500 text-white"
                        : "border-[var(--border)] hover:border-indigo-500"
                    }`}
                    aria-label={`Toggle completion of ${task.title}`}
                  >
                    {task.completed && <CheckCircle2 className="h-4 w-4" />}
                  </button>
                  <div>
                    <p
                      className={`text-sm font-semibold ${
                        task.completed ? "line-through text-[var(--muted-foreground)]" : "text-[var(--foreground)]"
                      }`}
                    >
                      {task.title}
                    </p>
                    <span className="text-xs text-[var(--muted-foreground)]">
                      Target Due: {task.dueDate} • Category: {task.category}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                      task.priority === "high"
                        ? "bg-rose-500/10 text-rose-600"
                        : "bg-amber-500/10 text-amber-600"
                    }`}
                  >
                    {task.priority}
                  </span>
                  <button
                    onClick={() => deleteTask(event.id, task.id)}
                    className="p-1 rounded text-[var(--muted-foreground)] hover:text-rose-500"
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

      {/* TAB CONTENT: VENDORS */}
      {activeTab === "vendors" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-[var(--foreground)]">Vendor Directory & Checklists</h2>
              <p className="text-xs text-[var(--muted-foreground)]">
                Strict distinction between user-entered vendors and AI-suggested vendor types.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {event.vendors.map((vendor) => (
              <div
                key={vendor.id}
                className={`rounded-2xl border p-5 flex flex-col justify-between space-y-4 ${
                  vendor.isAISuggestion
                    ? "border-indigo-500/30 bg-gradient-to-br from-indigo-500/5 to-transparent"
                    : "border-[var(--border)] bg-[var(--card)]"
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        vendor.isAISuggestion
                          ? "bg-indigo-600 text-white"
                          : "bg-[var(--secondary)] text-[var(--foreground)]"
                      }`}
                    >
                      {vendor.isAISuggestion ? "AI Suggested Vendor Type" : "User-Entered Vendor"}
                    </span>
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded ${
                        vendor.status === "booked"
                          ? "bg-emerald-500/10 text-emerald-600"
                          : vendor.status === "quoted"
                          ? "bg-amber-500/10 text-amber-600"
                          : "bg-slate-500/10 text-slate-600"
                      }`}
                    >
                      {vendor.status.replace("_", " ").toUpperCase()}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[var(--foreground)]">{vendor.name}</h3>

                  {vendor.contactPerson && (
                    <p className="text-xs text-[var(--muted-foreground)]">
                      Contact: {vendor.contactPerson} ({vendor.phone || "No phone"})
                    </p>
                  )}

                  <p className="text-xs font-mono font-bold text-indigo-600">
                    Est. Cost: ₹{vendor.estimatedCost.toLocaleString()} {event.currency}
                    {vendor.advancePaid ? ` (Advance: ₹${vendor.advancePaid.toLocaleString()})` : ""}
                  </p>

                  {vendor.notes && (
                    <p className="text-xs text-[var(--muted-foreground)] bg-[var(--secondary)]/40 p-2 rounded-lg">
                      {vendor.notes}
                    </p>
                  )}
                </div>

                <div className="border-t border-[var(--border)] pt-3 flex items-center justify-between text-xs">
                  <span className="text-[var(--muted-foreground)] capitalize">
                    Category: {vendor.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() =>
                        updateVendor(event.id, vendor.id, {
                          status: vendor.status === "booked" ? "quoted" : "booked",
                        })
                      }
                      className="text-indigo-600 hover:underline font-semibold"
                    >
                      {vendor.status === "booked" ? "Mark Quoted" : "Mark Booked"}
                    </button>
                    {!vendor.isAISuggestion && (
                      <button
                        onClick={() => deleteVendor(event.id, vendor.id)}
                        className="p-1 text-rose-500 hover:bg-rose-500/10 rounded"
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

      {/* TAB CONTENT: GUESTS */}
      {activeTab === "guests" && (
        <div className="space-y-6">
          {/* Privacy Banner */}
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 flex items-center justify-between text-xs text-emerald-800 dark:text-emerald-300">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0" />
              <span>
                <strong>Zero Guest PII Transmitted:</strong> All guest names, dietary preferences, and
                contacts are stored exclusively in your browser&apos;s localStorage and never transmitted to
                any AI model.
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 space-y-4">
            <h2 className="text-base font-bold text-[var(--foreground)]">Guest RSVP Roster</h2>

            {/* Quick Add Guest Form */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
              <input
                type="text"
                placeholder="Guest Name"
                value={newGuestName}
                onChange={(e) => setNewGuestName(e.target.value)}
                className="rounded-lg border border-[var(--input)] bg-[var(--background)] px-3 py-2 text-xs"
              />
              <select
                value={newGuestCategory}
                onChange={(e) => setNewGuestCategory(e.target.value as Guest["category"])}
                className="rounded-lg border border-[var(--input)] bg-[var(--background)] px-3 py-2 text-xs"
              >
                <option value="family">Family</option>
                <option value="friend">Friend</option>
                <option value="colleague">Colleague</option>
                <option value="vip">VIP</option>
              </select>
              <input
                type="text"
                placeholder="Dietary Note (e.g. Vegetarian)"
                value={newGuestDietary}
                onChange={(e) => setNewGuestDietary(e.target.value)}
                className="rounded-lg border border-[var(--input)] bg-[var(--background)] px-3 py-2 text-xs"
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
                className="rounded-lg bg-indigo-600 px-3 py-2 text-xs font-semibold text-white shadow hover:bg-indigo-700"
              >
                Add Guest
              </button>
            </div>

            {/* Guest Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[var(--secondary)] text-[var(--foreground)] font-semibold">
                  <tr>
                    <th className="p-3">Name</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">RSVP Status</th>
                    <th className="p-3">Dietary Preference</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  {event.guestsList.map((guest) => (
                    <tr key={guest.id} className="hover:bg-[var(--secondary)]/20">
                      <td className="p-3 font-semibold">{guest.name}</td>
                      <td className="p-3 capitalize text-[var(--muted-foreground)]">
                        {guest.category}
                      </td>
                      <td className="p-3">
                        <select
                          value={guest.rsvp}
                          onChange={(e) =>
                            updateGuestRSVP(event.id, guest.id, e.target.value as Guest["rsvp"])
                          }
                          className="rounded border border-[var(--input)] bg-[var(--card)] px-2 py-1 text-xs font-medium"
                        >
                          <option value="attending">Attending</option>
                          <option value="declined">Declined</option>
                          <option value="tentative">Tentative</option>
                          <option value="invited">Invited</option>
                        </select>
                      </td>
                      <td className="p-3 text-[var(--muted-foreground)]">
                        {guest.dietary || "None"}
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => deleteGuest(event.id, guest.id)}
                          className="text-rose-500 hover:text-rose-700"
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

      {/* TAB CONTENT: RISKS & CONTINGENCY */}
      {activeTab === "risks" && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-bold text-[var(--foreground)]">
              Contextual Risk & Contingency Matrix
            </h2>
            <p className="text-xs text-[var(--muted-foreground)]">
              All scenarios are formulated as actionable possibilities rather than arbitrary predictions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {event.risks.map((risk) => (
              <div
                key={risk.id}
                className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-bold text-[var(--foreground)] flex items-center gap-1.5">
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                    <span>{risk.title}</span>
                  </h3>
                  <div className="flex gap-1">
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-amber-500/10 text-amber-600">
                      Likelihood: {risk.likelihood}
                    </span>
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-rose-500/10 text-rose-600">
                      Severity: {risk.severity}
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs">
                  <p className="text-[var(--foreground)]">
                    <strong className="text-emerald-600">Preventive Action:</strong>{" "}
                    {risk.preventiveAction}
                  </p>
                  <p className="text-[var(--foreground)]">
                    <strong className="text-indigo-600">Day-Of Backup Plan:</strong>{" "}
                    {risk.backupPlan}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: IDEAS & THEMES */}
      {activeTab === "ideas" && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-bold text-[var(--foreground)]">Curated Inspiration & Ideas</h2>
            <p className="text-xs text-[var(--muted-foreground)]">
              Tailored concepts for themes, catering menus, experiential activities, and playlists.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 space-y-3">
              <h3 className="text-sm font-bold text-indigo-600">Thematic Concepts</h3>
              <ul className="space-y-1.5 text-xs text-[var(--foreground)]">
                {event.ideas.themes.map((theme, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
                    <span>{theme}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 space-y-3">
              <h3 className="text-sm font-bold text-pink-600">Catering Highlights</h3>
              <ul className="space-y-1.5 text-xs text-[var(--foreground)]">
                {event.ideas.menus.map((menu, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-pink-600" />
                    <span>{menu}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 space-y-3">
              <h3 className="text-sm font-bold text-violet-600">Guest Activities & Icebreakers</h3>
              <ul className="space-y-1.5 text-xs text-[var(--foreground)]">
                {event.ideas.activities.map((act, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-violet-600" />
                    <span>{act}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 space-y-3">
              <h3 className="text-sm font-bold text-emerald-600">Soundtrack & Playlist Vibes</h3>
              <ul className="space-y-1.5 text-xs text-[var(--foreground)]">
                {event.ideas.playlists.map((pl, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                    <span>{pl}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: AI PLANNER */}
      {activeTab === "ai-planner" && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-bold text-[var(--foreground)]">AI Celebration Architect</h2>
            <p className="text-xs text-[var(--muted-foreground)]">
              Ask questions or simulate adjustments with context-aware decision outputs.
            </p>
          </div>

          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 space-y-4">
            <div className="space-y-3 min-h-[160px] max-h-[350px] overflow-y-auto p-3 rounded-xl bg-[var(--background)]">
              {plannerMessages.length === 0 ? (
                <p className="text-xs text-[var(--muted-foreground)] text-center py-8">
                  Ask any planning question: &ldquo;What if I want to switch to a cocktail buffet?&rdquo; or
                  &ldquo;Recommend cost trade-offs for 100 guests.&rdquo;
                </p>
              ) : (
                plannerMessages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
                  >
                    <div
                      className={`rounded-xl px-4 py-2.5 max-w-xl text-xs ${
                        msg.role === "user"
                          ? "bg-indigo-600 text-white"
                          : "bg-[var(--secondary)] text-[var(--foreground)]"
                      }`}
                    >
                      {msg.mode && (
                        <span className="block text-[10px] font-bold text-indigo-500 mb-1">
                          [{msg.mode === "ai-enhanced" ? "AI Enhanced" : "Deterministic Demo"}]
                        </span>
                      )}
                      <p className="leading-relaxed">{msg.text}</p>
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
                placeholder="Type your celebration planning prompt..."
                className="flex-1 rounded-lg border border-[var(--input)] bg-[var(--background)] px-3.5 py-2 text-xs text-[var(--foreground)] focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                disabled={isPlanning}
                className="rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow hover:bg-indigo-700 disabled:opacity-50"
              >
                {isPlanning ? "Analyzing..." : "Send"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* REALLOCATION MODAL */}
      {showReallocateModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
        >
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 max-w-lg w-full space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-[var(--foreground)]">
              Simulate Budget Reallocation
            </h3>
            <p className="text-xs text-[var(--muted-foreground)]">
              Adjust your total budget to see deterministic before-and-after reallocations across categories.
            </p>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[var(--foreground)]">
                New Target Budget ({event.currency})
              </label>
              <input
                type="number"
                value={newBudgetInput}
                onChange={(e) => setNewBudgetInput(parseInt(e.target.value) || 0)}
                className="w-full rounded-lg border border-[var(--input)] bg-[var(--background)] px-3 py-2 text-sm font-mono"
              />
            </div>

            <button
              onClick={handleReallocateClick}
              className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-700"
            >
              Calculate Diff
            </button>

            {/* Diff Preview */}
            {activeScenarioDiff && (
              <div className="space-y-3 pt-2 border-t border-[var(--border)] text-xs">
                <p className="text-[var(--foreground)] font-medium">
                  {activeScenarioDiff.explanation}
                </p>

                <div className="max-h-48 overflow-y-auto space-y-1 text-[11px]">
                  {activeScenarioDiff.diffItems.map((item) => (
                    <div
                      key={item.category}
                      className="flex justify-between p-1.5 rounded bg-[var(--secondary)]/40"
                    >
                      <span className="capitalize font-semibold">{item.category}</span>
                      <span>
                        {item.previousPlanned.toLocaleString()} →{" "}
                        <strong className="text-indigo-600">
                          {item.newPlanned.toLocaleString()}
                        </strong>
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={handleConfirmReallocation}
                    className="flex-1 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-700"
                  >
                    Accept & Apply Diff
                  </button>
                  <button
                    onClick={() => {
                      clearScenarioDiff();
                      setShowReallocateModal(false);
                    }}
                    className="flex-1 rounded-lg border border-[var(--border)] px-3 py-2 text-xs font-semibold hover:bg-[var(--secondary)]"
                  >
                    Reject Diff
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
