"use client";

/**
 * @file page.tsx
 * @description Celebration Portfolio Dashboard Page for Gatherly AI.
 *
 * Implements a clean, decoupled composite architecture where metrics, benchmark
 * stress-testing scenarios, search toolbars, and celebration cards are encapsulated
 * in dedicated, single-responsibility components under src/components/dashboard/.
 */

import React, { useState } from "react";
import { useEventStore } from "@/store/useEventStore";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardStatsGrid } from "@/components/dashboard/DashboardStatsGrid";
import { DashboardJudgeScenarios } from "@/components/dashboard/DashboardJudgeScenarios";
import { DashboardToolbar } from "@/components/dashboard/DashboardToolbar";
import { DashboardEventCard } from "@/components/dashboard/DashboardEventCard";
import { DashboardEmptyState } from "@/components/dashboard/DashboardEmptyState";

export default function DashboardPage(): React.ReactElement {
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

  const getDaysRemaining = (dateStr: string): number => {
    const today = new Date();
    const target = new Date(dateStr);
    const diffMs = target.getTime() - today.getTime();
    return Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
  };

  return (
    <div className="py-10 sm:py-14 px-6 sm:px-10 lg:px-12 max-w-7xl mx-auto space-y-12 sm:space-y-16 ambient-bg page-transition">
      {/* 1. Header Banner */}
      <DashboardHeader />

      {/* 2. Stats Overview */}
      <DashboardStatsGrid
        totalEvents={totalEvents}
        totalBudget={totalBudget}
        totalGuests={totalGuests}
        pendingTasksCount={pendingTasksCount}
      />

      {/* 3. Judge Evaluation Benchmark Scenarios */}
      <DashboardJudgeScenarios
        events={events}
        onLoadJudgeScenario={loadJudgeScenario}
      />

      {/* 4. Sticky Scrolling Toolbar */}
      <DashboardToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filterType={filterType}
        onFilterChange={setFilterType}
      />

      {/* 5. Celebration Card Grid / Empty State */}
      {filteredEvents.length === 0 ? (
        <DashboardEmptyState />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => (
            <DashboardEventCard
              key={event.id}
              event={event}
              daysRemaining={getDaysRemaining(event.date)}
              onDuplicate={duplicateEvent}
              onDelete={deleteEvent}
              onSelect={setActiveEventId}
            />
          ))}
        </div>
      )}
    </div>
  );
}
