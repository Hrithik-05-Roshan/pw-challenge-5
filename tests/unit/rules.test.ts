import { describe, it, expect } from "vitest";
import {
  calculateBudgetAllocation,
  handleBudgetReallocation,
  handleGuestCountChange,
  handleDateChange,
  calculateFeasibility,
  generateRisks,
  generateTimeline,
  generateExplainableRecommendations,
} from "@/lib/planner/rules";
import { EventPlan } from "@/types";

describe("Deterministic Rules Engine", () => {
  it("always sums budget allocations to exactly 100% of the total budget", () => {
    const totalBudget = 60000;
    const items = calculateBudgetAllocation("birthday", totalBudget, 80, 2, ["balanced"]);
    
    const sum = items.reduce((acc, curr) => acc + curr.plannedAmount, 0);
    expect(sum).toBe(totalBudget);
  });

  it("always maintains contingency between 5% and 10%", () => {
    const totalBudget = 2500000;
    const items = calculateBudgetAllocation("wedding", totalBudget, 350, 1, ["catering", "venue"]);
    
    const contingency = items.find((i) => i.category === "contingency");
    expect(contingency).toBeDefined();
    const percent = (contingency!.plannedAmount / totalBudget) * 100;
    expect(percent).toBeGreaterThanOrEqual(5);
    expect(percent).toBeLessThanOrEqual(10);
  });

  it("adjusts budget on budget cuts and produces an explicit before/after diff", () => {
    const oldBudget = 60000;
    const newBudget = 45000;
    const initialItems = calculateBudgetAllocation("birthday", oldBudget, 80, 2);

    const mockPlan: EventPlan = {
      id: "event-1",
      title: "Priya's 30th Birthday",
      eventType: "birthday",
      date: "2026-12-15",
      city: "Kolkata",
      cityTier: 2,
      guests: 80,
      budget: oldBudget,
      currency: "INR",
      priorities: ["balanced"],
      mode: "demo",
      createdAt: "2026-10-31",
      updatedAt: "2026-10-31",
      budgetItems: initialItems,
      tasks: [],
      vendors: [],
      guestsList: [],
      risks: [],
      recommendations: [],
      ideas: { themes: [], menus: [], activities: [], decor: [], playlists: [] },
    };

    const result = handleBudgetReallocation(mockPlan, newBudget);
    expect(result.previousBudget).toBe(60000);
    expect(result.newBudget).toBe(45000);
    expect(result.difference).toBe(-15000);
    expect(result.diffItems.length).toBeGreaterThan(0);
    expect(result.explanation).toContain("Budget reduced");
  });

  it("evaluates guest surge and calculates per-guest cost impact", () => {
    const mockPlan: EventPlan = {
      id: "event-1",
      title: "Priya's 30th Birthday",
      eventType: "birthday",
      date: "2026-12-15",
      city: "Kolkata",
      cityTier: 2,
      guests: 80,
      budget: 60000,
      currency: "INR",
      priorities: ["balanced"],
      mode: "demo",
      createdAt: "2026-10-31",
      updatedAt: "2026-10-31",
      budgetItems: calculateBudgetAllocation("birthday", 60000, 80, 2),
      tasks: [],
      vendors: [],
      guestsList: [],
      risks: [],
      recommendations: [],
      ideas: { themes: [], menus: [], activities: [], decor: [], playlists: [] },
    };

    const result = handleGuestCountChange(mockPlan, 110);
    expect(result.updatedGuests).toBe(110);
    expect(result.perGuestChange).toBe(30);
    expect(result.actionRequired).toContain("CRITICAL ACTION");
  });

  it("compresses timeline and flags urgent tasks when event date is close", () => {
    const mockPlan: EventPlan = {
      id: "event-2",
      title: "Community Fair",
      eventType: "community",
      date: "2026-11-10",
      city: "Bengaluru",
      cityTier: 1,
      guests: 300,
      budget: 150000,
      currency: "INR",
      priorities: ["entertainment"],
      mode: "demo",
      createdAt: "2026-10-31",
      updatedAt: "2026-10-31",
      budgetItems: [],
      tasks: [],
      vendors: [],
      guestsList: [],
      risks: [],
      recommendations: [],
      ideas: { themes: [], menus: [], activities: [], decor: [], playlists: [] },
    };

    const result = handleDateChange(mockPlan, "2026-11-10");
    expect(result.isCompressed).toBe(true);
    expect(result.riskNote).toContain("WARNING: Schedule compressed");
  });

  it("calculates feasibility and provides constructive trade-offs for tight budgets", () => {
    // 50,000 for 200 wedding guests in Tier 1 is extremely tight (250/guest vs 3375 benchmark)
    const report = calculateFeasibility(50000, 200, 1, "wedding");
    expect(report.isFeasible).toBe(false);
    expect(report.warnings.length).toBeGreaterThan(0);
    expect(report.tradeOffs.length).toBeGreaterThan(0);
  });

  it("generates contextual risks worded as possibilities", () => {
    const risks = generateRisks("wedding", 250, 1500000, 1, ["catering"]);
    expect(risks.length).toBe(5);
    risks.forEach((r) => {
      expect(["low", "medium", "high"]).toContain(r.likelihood);
      expect(["low", "medium", "high"]).toContain(r.severity);
      expect(r.preventiveAction.length).toBeGreaterThan(5);
      expect(r.backupPlan.length).toBeGreaterThan(5);
    });
  });

  it("generates a backwards timeline with sequential milestone tasks", () => {
    const tasks = generateTimeline("wedding", "2027-02-14", "2026-10-31");
    expect(tasks.length).toBeGreaterThan(4);
    expect(tasks[0].dueDate <= tasks[tasks.length - 1].dueDate).toBe(true);
  });

  it("generates explainable AI recommendations with structured reasoning and alternatives", () => {
    const recs = generateExplainableRecommendations("birthday", 60000, 80, 2, ["catering"], "INR");
    expect(recs.length).toBeGreaterThanOrEqual(3);
    recs.forEach((rec) => {
      expect(rec.recommendation).toBeDefined();
      expect(rec.reasoning).toBeDefined();
      expect(rec.expectedImpact).toBeDefined();
      expect(rec.alternativeOptions.length).toBeGreaterThanOrEqual(2);
      expect(rec.relevantEventContext).toBeDefined();
    });
  });
});
