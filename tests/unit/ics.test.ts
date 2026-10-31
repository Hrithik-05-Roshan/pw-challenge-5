import { describe, it, expect } from "vitest";
import { generateICS } from "@/lib/export/ics";
import { EventPlan } from "@/types";

describe("iCalendar Export", () => {
  const mockPlan: EventPlan = {
    id: "event-test-ics",
    title: "Diwali Gala Evening",
    eventType: "community",
    date: "2026-11-08",
    city: "Mumbai",
    cityTier: 1,
    guests: 200,
    budget: 250000,
    currency: "INR",
    priorities: ["entertainment"],
    mode: "demo",
    createdAt: "2026-10-31",
    updatedAt: "2026-10-31",
    budgetItems: [],
    tasks: [
      {
        id: "t1",
        title: "Confirm Lighting & Stage Decor",
        category: "decoration",
        dueDate: "2026-11-04",
        priority: "high",
        completed: false,
      },
    ],
    vendors: [],
    guestsList: [],
    risks: [],
    recommendations: [],
    ideas: { themes: [], menus: [], activities: [], decor: [], playlists: [] },
  };

  it("produces valid RFC 5545 formatted string", () => {
    const ics = generateICS(mockPlan);

    expect(ics).toContain("BEGIN:VCALENDAR");
    expect(ics).toContain("VERSION:2.0");
    expect(ics).toContain("SUMMARY:Diwali Gala Evening");
    expect(ics).toContain("LOCATION:Mumbai");
    expect(ics).toContain("SUMMARY:[Gatherly Task] Confirm Lighting & Stage Decor");
    expect(ics).toContain("END:VCALENDAR");
  });
});
