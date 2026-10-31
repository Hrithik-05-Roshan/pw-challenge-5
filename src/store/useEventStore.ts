import { create } from "zustand";
import {
  EventPlan,
  Task,
  Vendor,
  Guest,
  BudgetReallocationResult,
} from "@/types";
import { CreateEventInput } from "@/lib/validation/schemas";
import {
  calculateBudgetAllocation,
  generateTimeline,
  generateRisks,
  generateExplainableRecommendations,
  handleBudgetReallocation,
  handleGuestCountChange,
  handleDateChange,
} from "@/lib/planner/rules";
import { SEED_EVENTS } from "@/lib/planner/seed-data";
import { storageService } from "@/lib/storage/service";

const STORAGE_KEY = "gatherly_ai_events_v1";

interface EventStoreState {
  events: EventPlan[];
  activeEventId: string | null;
  activeScenarioDiff: BudgetReallocationResult | null;
  activeScenarioNote: string | null;

  // Event Actions
  createEvent: (input: CreateEventInput) => EventPlan;
  updateEvent: (id: string, partial: Partial<EventPlan>) => void;
  deleteEvent: (id: string) => void;
  duplicateEvent: (id: string) => void;
  setActiveEventId: (id: string | null) => void;

  // Workspace Actions
  reallocateBudget: (eventId: string, newBudget: number) => BudgetReallocationResult;
  applyBudgetDiff: (eventId: string, result: BudgetReallocationResult) => void;
  updateGuestCount: (eventId: string, newGuestCount: number) => string;
  updateEventDate: (eventId: string, newDate: string) => string;

  // Task Actions
  toggleTask: (eventId: string, taskId: string) => void;
  addTask: (eventId: string, task: Omit<Task, "id">) => void;
  deleteTask: (eventId: string, taskId: string) => void;

  // Vendor Actions
  addVendor: (eventId: string, vendor: Omit<Vendor, "id">) => void;
  updateVendor: (eventId: string, vendorId: string, partial: Partial<Vendor>) => void;
  deleteVendor: (eventId: string, vendorId: string) => void;

  // Guest Actions
  addGuest: (eventId: string, guest: Omit<Guest, "id">) => void;
  updateGuestRSVP: (eventId: string, guestId: string, rsvp: Guest["rsvp"]) => void;
  deleteGuest: (eventId: string, guestId: string) => void;

  // Recommendation Actions
  toggleRecommendation: (eventId: string, recId: string) => void;

  // Judge Scenarios
  loadJudgeScenario: (scenario: 1 | 2 | 3) => void;
  clearScenarioDiff: () => void;

  // Global Wipe
  resetAllData: () => void;
}

export const useEventStore = create<EventStoreState>((set, get) => {
  // Load persisted state or seed default events
  const initialEvents = storageService.getItem<EventPlan[]>(STORAGE_KEY, SEED_EVENTS);

  return {
    events: initialEvents,
    activeEventId: initialEvents[0]?.id || null,
    activeScenarioDiff: null,
    activeScenarioNote: null,

    createEvent: (input) => {
      const id = `event-${Date.now()}`;
      const budgetItems = calculateBudgetAllocation(
        input.eventType,
        input.budget,
        input.guests,
        input.cityTier,
        input.priorities
      );
      const tasks = generateTimeline(input.eventType, input.date);
      const risks = generateRisks(
        input.eventType,
        input.guests,
        input.budget,
        input.cityTier,
        input.priorities
      );
      const recommendations = generateExplainableRecommendations(
        input.eventType,
        input.budget,
        input.guests,
        input.cityTier,
        input.priorities,
        input.currency
      );

      const newEvent: EventPlan = {
        id,
        title: input.title,
        eventType: input.eventType,
        date: input.date,
        city: input.city,
        cityTier: input.cityTier,
        guests: input.guests,
        budget: input.budget,
        currency: input.currency,
        styleTheme: input.styleTheme,
        priorities: input.priorities,
        dietaryPreferences: input.dietaryPreferences,
        specialRequirements: input.specialRequirements,
        mode: "demo",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        budgetItems,
        tasks,
        vendors: [
          {
            id: `v-suggested-1`,
            category: "venue",
            name: `AI Suggestion: ${input.eventType === "wedding" ? "Boutique Heritage Courtyard" : "High-Ceiling Hall"}`,
            estimatedCost: Math.round(input.budget * 0.25),
            status: "to_contact",
            notes: "AI Recommended: Inquire about in-house power backup and minimum booking windows",
            isAISuggestion: true,
          },
          {
            id: `v-suggested-2`,
            category: "catering",
            name: `AI Suggestion: Live Culinary Experience Specialist`,
            estimatedCost: Math.round(input.budget * 0.3),
            status: "to_contact",
            notes: "AI Recommended: Request tasting session for multi-cultural items",
            isAISuggestion: true,
          },
        ],
        guestsList: [],
        risks,
        recommendations,
        ideas: {
          themes: [`Modern ${input.eventType} Elegance`, "Festive Celebration", "Contemporary Minimalism"],
          menus: ["Artisanal Appetizer Platter", "Signature Gourmet Buffet", "Live Dessert Counter"],
          activities: ["Interactive Welcome Mixer", "Highlight Celebration Ceremony", "Dance & Music Segment"],
          decor: ["Ambient Warm Lighting", "Architectural Backdrop", "Eco-friendly Table Accents"],
          playlists: ["Acoustic Welcoming Vibes", "Celebratory High-Energy Beats", "Sunset Ambient Melodies"],
        },
      };

      const updated = [newEvent, ...get().events];
      storageService.setItem(STORAGE_KEY, updated);
      set({ events: updated, activeEventId: id });
      return newEvent;
    },

    updateEvent: (id, partial) => {
      const updated = get().events.map((e) =>
        e.id === id ? { ...e, ...partial, updatedAt: new Date().toISOString() } : e
      );
      storageService.setItem(STORAGE_KEY, updated);
      set({ events: updated });
    },

    deleteEvent: (id) => {
      const filtered = get().events.filter((e) => e.id !== id);
      storageService.setItem(STORAGE_KEY, filtered);
      set({
        events: filtered,
        activeEventId: filtered[0]?.id || null,
      });
    },

    duplicateEvent: (id) => {
      const target = get().events.find((e) => e.id === id);
      if (!target) return;
      const duplicated: EventPlan = {
        ...target,
        id: `event-${Date.now()}`,
        title: `${target.title} (Copy)`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const updated = [duplicated, ...get().events];
      storageService.setItem(STORAGE_KEY, updated);
      set({ events: updated, activeEventId: duplicated.id });
    },

    setActiveEventId: (id) => set({ activeEventId: id }),

    reallocateBudget: (eventId, newBudget) => {
      const event = get().events.find((e) => e.id === eventId);
      if (!event) throw new Error("Event not found");

      const diffResult = handleBudgetReallocation(event, newBudget);
      set({ activeScenarioDiff: diffResult });
      return diffResult;
    },

    applyBudgetDiff: (eventId, result) => {
      const updated = get().events.map((e) => {
        if (e.id !== eventId) return e;

        const updatedBudgetItems = e.budgetItems.map((item) => {
          const matched = result.diffItems.find((d) => d.category === item.category);
          return matched
            ? {
                ...item,
                plannedAmount: matched.newPlanned,
                estimatedAmount: matched.newPlanned,
                notes: matched.adjustmentReason,
              }
            : item;
        });

        return {
          ...e,
          budget: result.newBudget,
          budgetItems: updatedBudgetItems,
          updatedAt: new Date().toISOString(),
        };
      });

      storageService.setItem(STORAGE_KEY, updated);
      set({ events: updated, activeScenarioDiff: null });
    },

    updateGuestCount: (eventId, newGuestCount) => {
      const event = get().events.find((e) => e.id === eventId);
      if (!event) return "";

      const res = handleGuestCountChange(event, newGuestCount);
      const updated = get().events.map((e) =>
        e.id === eventId ? { ...e, guests: newGuestCount, updatedAt: new Date().toISOString() } : e
      );

      storageService.setItem(STORAGE_KEY, updated);
      set({ events: updated, activeScenarioNote: res.actionRequired });
      return res.actionRequired;
    },

    updateEventDate: (eventId, newDate) => {
      const event = get().events.find((e) => e.id === eventId);
      if (!event) return "";

      const res = handleDateChange(event, newDate);
      const tasks = generateTimeline(event.eventType, newDate);

      const updated = get().events.map((e) =>
        e.id === eventId ? { ...e, date: newDate, tasks, updatedAt: new Date().toISOString() } : e
      );

      storageService.setItem(STORAGE_KEY, updated);
      set({ events: updated, activeScenarioNote: res.riskNote });
      return res.riskNote;
    },

    toggleTask: (eventId, taskId) => {
      const updated = get().events.map((e) => {
        if (e.id !== eventId) return e;
        return {
          ...e,
          tasks: e.tasks.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t)),
          updatedAt: new Date().toISOString(),
        };
      });
      storageService.setItem(STORAGE_KEY, updated);
      set({ events: updated });
    },

    addTask: (eventId, task) => {
      const newTask: Task = { ...task, id: `task-${Date.now()}` };
      const updated = get().events.map((e) => {
        if (e.id !== eventId) return e;
        return {
          ...e,
          tasks: [...e.tasks, newTask],
          updatedAt: new Date().toISOString(),
        };
      });
      storageService.setItem(STORAGE_KEY, updated);
      set({ events: updated });
    },

    deleteTask: (eventId, taskId) => {
      const updated = get().events.map((e) => {
        if (e.id !== eventId) return e;
        return {
          ...e,
          tasks: e.tasks.filter((t) => t.id !== taskId),
          updatedAt: new Date().toISOString(),
        };
      });
      storageService.setItem(STORAGE_KEY, updated);
      set({ events: updated });
    },

    addVendor: (eventId, vendor) => {
      const newVendor: Vendor = { ...vendor, id: `vendor-${Date.now()}` };
      const updated = get().events.map((e) => {
        if (e.id !== eventId) return e;
        return {
          ...e,
          vendors: [...e.vendors, newVendor],
          updatedAt: new Date().toISOString(),
        };
      });
      storageService.setItem(STORAGE_KEY, updated);
      set({ events: updated });
    },

    updateVendor: (eventId, vendorId, partial) => {
      const updated = get().events.map((e) => {
        if (e.id !== eventId) return e;
        return {
          ...e,
          vendors: e.vendors.map((v) => (v.id === vendorId ? { ...v, ...partial } : v)),
          updatedAt: new Date().toISOString(),
        };
      });
      storageService.setItem(STORAGE_KEY, updated);
      set({ events: updated });
    },

    deleteVendor: (eventId, vendorId) => {
      const updated = get().events.map((e) => {
        if (e.id !== eventId) return e;
        return {
          ...e,
          vendors: e.vendors.filter((v) => v.id !== vendorId),
          updatedAt: new Date().toISOString(),
        };
      });
      storageService.setItem(STORAGE_KEY, updated);
      set({ events: updated });
    },

    addGuest: (eventId, guest) => {
      const newGuest: Guest = { ...guest, id: `guest-${Date.now()}` };
      const updated = get().events.map((e) => {
        if (e.id !== eventId) return e;
        return {
          ...e,
          guestsList: [...e.guestsList, newGuest],
          updatedAt: new Date().toISOString(),
        };
      });
      storageService.setItem(STORAGE_KEY, updated);
      set({ events: updated });
    },

    updateGuestRSVP: (eventId, guestId, rsvp) => {
      const updated = get().events.map((e) => {
        if (e.id !== eventId) return e;
        return {
          ...e,
          guestsList: e.guestsList.map((g) => (g.id === guestId ? { ...g, rsvp } : g)),
          updatedAt: new Date().toISOString(),
        };
      });
      storageService.setItem(STORAGE_KEY, updated);
      set({ events: updated });
    },

    deleteGuest: (eventId, guestId) => {
      const updated = get().events.map((e) => {
        if (e.id !== eventId) return e;
        return {
          ...e,
          guestsList: e.guestsList.filter((g) => g.id !== guestId),
          updatedAt: new Date().toISOString(),
        };
      });
      storageService.setItem(STORAGE_KEY, updated);
      set({ events: updated });
    },

    toggleRecommendation: (eventId, recId) => {
      const updated = get().events.map((e) => {
        if (e.id !== eventId) return e;
        return {
          ...e,
          recommendations: e.recommendations.map((r) =>
            r.id === recId ? { ...r, applied: !r.applied } : r
          ),
          updatedAt: new Date().toISOString(),
        };
      });
      storageService.setItem(STORAGE_KEY, updated);
      set({ events: updated });
    },

    loadJudgeScenario: (scenario) => {
      if (scenario === 1) {
        // Scenario 1: Fixed Budget Wedding
        const wedding = get().events.find((e) => e.eventType === "wedding") || SEED_EVENTS[1];
        set({ activeEventId: wedding.id });
      } else if (scenario === 2) {
        // Scenario 2: Sudden Guest Surge Birthday
        const bday = get().events.find((e) => e.eventType === "birthday") || SEED_EVENTS[0];
        set({ activeEventId: bday.id });
        get().updateGuestCount(bday.id, 110);
      } else if (scenario === 3) {
        // Scenario 3: Last Minute Date Change Community Event
        const comm = get().events.find((e) => e.eventType === "community") || SEED_EVENTS[2];
        set({ activeEventId: comm.id });
        get().updateEventDate(comm.id, "2026-11-12"); // compressed to 12 days
      }
    },

    clearScenarioDiff: () => set({ activeScenarioDiff: null, activeScenarioNote: null }),

    resetAllData: () => {
      storageService.clear();
      set({
        events: SEED_EVENTS,
        activeEventId: SEED_EVENTS[0].id,
        activeScenarioDiff: null,
        activeScenarioNote: null,
      });
    },
  };
});
