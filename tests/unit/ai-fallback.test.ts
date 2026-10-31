import { describe, it, expect } from "vitest";
import { GeminiPlannerService } from "@/lib/ai/provider";
import { PlanApiRequest } from "@/lib/validation/schemas";

describe("AI Provider & Fallback Architecture", () => {
  const sampleRequest: PlanApiRequest = {
    eventType: "birthday",
    title: "Aarav's 10th Birthday",
    date: "2026-11-20",
    city: "Delhi",
    cityTier: 1,
    guests: 40,
    budget: 35000,
    currency: "INR",
    priorities: ["entertainment"],
    specialRequirements: "Vegetarian cake requested",
  };

  it("works reliably offline without API key by falling back to deterministic mode", async () => {
    // Ensure no API key
    delete process.env.GEMINI_API_KEY;

    const planner = new GeminiPlannerService();
    const result = await planner.generatePlan(sampleRequest);

    expect(result.mode).toBe("demo");
    expect(result.overview).toContain("birthday");
    expect(result.recommendations.length).toBeGreaterThan(0);
    expect(result.ideas.themes.length).toBeGreaterThan(0);
  });

  it("validates that all recommendations follow the Explainable AI structure", async () => {
    const planner = new GeminiPlannerService();
    const result = await planner.generatePlan(sampleRequest);

    result.recommendations.forEach((rec) => {
      expect(rec.recommendation).toBeTruthy();
      expect(rec.reasoning).toBeTruthy();
      expect(rec.expectedImpact).toBeTruthy();
      expect(Array.isArray(rec.alternativeOptions)).toBe(true);
      expect(rec.relevantEventContext).toBeTruthy();
    });
  });
});
