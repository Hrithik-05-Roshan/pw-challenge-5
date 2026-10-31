/**
 * @file GuestsTab.tsx
 * @description Zero-PII Client-Isolated Guest RSVP tracker with dietary summaries
 * and local roster management.
 */

import React, { useState } from "react";
import { Lock, Trash2, Utensils } from "lucide-react";
import { EventPlan, Guest } from "@/types";

interface GuestsTabProps {
  event: EventPlan;
  onAddGuest: (guest: Omit<Guest, "id">) => void;
  onUpdateGuestRSVP: (guestId: string, rsvp: Guest["rsvp"]) => void;
  onDeleteGuest: (guestId: string) => void;
}

export function GuestsTab({
  event,
  onAddGuest,
  onUpdateGuestRSVP,
  onDeleteGuest,
}: GuestsTabProps): React.ReactElement {
  const [newGuestName, setNewGuestName] = useState("");
  const [newGuestCategory, setNewGuestCategory] = useState<Guest["category"]>("family");
  const [newGuestDietary, setNewGuestDietary] = useState("");

  // Dietary counts aggregation
  const dietaryCounts = event.guestsList.reduce((acc, g) => {
    if (g.dietary && g.dietary.trim()) {
      acc[g.dietary] = (acc[g.dietary] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newGuestName.trim()) {
      onAddGuest({
        name: newGuestName.trim(),
        category: newGuestCategory,
        rsvp: "attending",
        plusOnes: 0,
        dietary: newGuestDietary.trim(),
      });
      setNewGuestName("");
      setNewGuestDietary("");
    }
  };

  return (
    <div className="space-y-6">
      {/* Privacy Banner */}
      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5 flex items-center justify-between text-xs text-emerald-800 dark:text-emerald-300 shadow-sm backdrop-blur-md">
        <div className="flex items-center gap-3">
          <span className="p-2 rounded-xl bg-emerald-500/20 text-emerald-600">
            <Lock className="h-5 w-5" />
          </span>
          <span>
            <strong className="block text-sm">Zero-PII Client-Isolated Guarantee:</strong>
            All guest names, dietary preferences, and contacts are stored strictly in your browser&apos;s
            LocalStorage. Never transmitted to third-party AI models.
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
            <span
              key={diet}
              className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-500/20"
            >
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
        <form onSubmit={handleAddSubmit} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
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
            type="submit"
            className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-500/20 cursor-pointer"
          >
            Add Guest to Roster
          </button>
        </form>

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
                  <td className="p-3.5 capitalize text-slate-500">{guest.category}</td>
                  <td className="p-3.5">
                    <select
                      value={guest.rsvp}
                      onChange={(e) =>
                        onUpdateGuestRSVP(guest.id, e.target.value as Guest["rsvp"])
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
                      onClick={() => onDeleteGuest(guest.id)}
                      className="p-1.5 text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
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
  );
}
