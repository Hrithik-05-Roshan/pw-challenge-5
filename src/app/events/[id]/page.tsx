/**
 * @file page.tsx
 * @description Event Workspace Aggregate Page for Gatherly AI.
 *
 * Implements a clean, decoupled composite architecture where each tab and sub-feature
 * (Budget, Timeline, Vendors, Guests, Risks, Ideas, AI Architect) is encapsulated in
 * a dedicated, single-responsibility component.
 */

"use client";

import React, { useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  AlertTriangle,
  LayoutDashboard,
  PieChart,
  CalendarDays,
  Store,
  Users2,
  CheckSquare2,
  Lightbulb,
  Sparkles,
} from "lucide-react";
import { useEventStore } from "@/store/useEventStore";
import { EventWorkspaceHeader } from "@/components/events/EventWorkspaceHeader";
import { EventMetricsBar } from "@/components/events/EventMetricsBar";
import { OverviewTab } from "@/components/events/OverviewTab";
import { BudgetBreakdownTab } from "@/components/events/BudgetBreakdownTab";
import { TimelineTab } from "@/components/events/TimelineTab";
import { VendorsTab } from "@/components/events/VendorsTab";
import { GuestsTab } from "@/components/events/GuestsTab";
import { RisksTab } from "@/components/events/RisksTab";
import { EventIdeasTab } from "@/components/events/EventIdeasTab";
import { AIArchitectTab } from "@/components/events/AIArchitectTab";
import { BudgetReallocationModal } from "@/components/events/BudgetReallocationModal";

export default function EventWorkspacePage(): React.ReactElement {
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

  if (!event) {
    return (
      <div className="py-24 text-center max-w-md mx-auto space-y-5 ambient-bg">
        <div className="h-16 w-16 rounded-2xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center mx-auto">
          <AlertTriangle className="h-8 w-8" />
        </div>
        <h1 className="font-heading text-2xl font-black text-slate-900 dark:text-white">
          Celebration Not Found
        </h1>
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

  // Aggregate Metrics Calculations
  const completedTasks = event.tasks.filter((t) => t.completed).length;
  const taskProgress =
    event.tasks.length > 0 ? Math.round((completedTasks / event.tasks.length) * 100) : 0;

  const totalSpentActual = event.budgetItems.reduce((acc, i) => acc + (i.actualAmount || 0), 0);
  const budgetUtilization = Math.round((totalSpentActual / event.budget) * 100);

  const confirmedGuests = event.guestsList.filter((g) => g.rsvp === "attending").length;

  const today = new Date();
  const eventDate = new Date(event.date);
  const daysRemaining = Math.max(0, Math.ceil((eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));

  const healthScore = Math.min(
    100,
    Math.round(
      taskProgress * 0.4 +
        (event.vendors.filter((v) => v.status === "booked").length > 0 ? 30 : 10) +
        30
    )
  );

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
  ] as const;

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6 ambient-bg">
      {/* Workspace Header */}
      <div className="rounded-3xl glass-card p-6 sm:p-8 shadow-xl space-y-6">
        <EventWorkspaceHeader event={event} />
        <EventMetricsBar
          event={event}
          daysRemaining={daysRemaining}
          confirmedGuests={confirmedGuests}
          healthScore={healthScore}
        />
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
              <p className="text-amber-700 dark:text-amber-200 mt-0.5 leading-relaxed">
                {activeScenarioNote}
              </p>
            </div>
          </div>
          <button
            onClick={clearScenarioDiff}
            className="text-xs text-amber-800 dark:text-amber-300 font-bold hover:underline px-3 py-1 rounded-lg bg-amber-500/20 whitespace-nowrap cursor-pointer"
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

      {/* Tab Panels */}
      {activeTab === "overview" && (
        <OverviewTab
          event={event}
          healthScore={healthScore}
          completedTasks={completedTasks}
          totalSpentActual={totalSpentActual}
          budgetUtilization={budgetUtilization}
          confirmedGuests={confirmedGuests}
          onOpenReallocateModal={() => setShowReallocateModal(true)}
          onToggleRecommendation={(recId) => toggleRecommendation(event.id, recId)}
        />
      )}

      {activeTab === "budget" && (
        <BudgetBreakdownTab
          event={event}
          totalSpentActual={totalSpentActual}
          onOpenReallocateModal={() => setShowReallocateModal(true)}
        />
      )}

      {(activeTab === "timeline" || activeTab === "tasks") && (
        <TimelineTab
          event={event}
          onToggleTask={(taskId) => toggleTask(event.id, taskId)}
          onDeleteTask={(taskId) => deleteTask(event.id, taskId)}
        />
      )}

      {activeTab === "vendors" && (
        <VendorsTab
          event={event}
          onUpdateVendor={(vendorId, partial) => updateVendor(event.id, vendorId, partial)}
          onDeleteVendor={(vendorId) => deleteVendor(event.id, vendorId)}
        />
      )}

      {activeTab === "guests" && (
        <GuestsTab
          event={event}
          onAddGuest={(guest) => addGuest(event.id, guest)}
          onUpdateGuestRSVP={(guestId, rsvp) => updateGuestRSVP(event.id, guestId, rsvp)}
          onDeleteGuest={(guestId) => deleteGuest(event.id, guestId)}
        />
      )}

      {activeTab === "risks" && <RisksTab event={event} />}

      {activeTab === "ideas" && <EventIdeasTab event={event} />}

      {activeTab === "ai-planner" && <AIArchitectTab event={event} />}

      {/* Reallocation Modal */}
      {showReallocateModal && (
        <BudgetReallocationModal
          event={event}
          activeScenarioDiff={activeScenarioDiff}
          onCalculateDiff={(newBudget) => reallocateBudget(event.id, newBudget)}
          onConfirmReallocation={() => {
            if (activeScenarioDiff) {
              applyBudgetDiff(event.id, activeScenarioDiff);
              setShowReallocateModal(false);
            }
          }}
          onCancel={() => {
            clearScenarioDiff();
            setShowReallocateModal(false);
          }}
        />
      )}
    </div>
  );
}
