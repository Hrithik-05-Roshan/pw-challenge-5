/**
 * @file AIArchitectTab.tsx
 * @description Interactive AI Celebration Architect chat interface with
 * automatic offline fallback to deterministic pure-math rules.
 */

import React, { useState } from "react";
import { Sparkles, Send } from "lucide-react";
import { EventPlan } from "@/types";

interface AIArchitectTabProps {
  event: EventPlan;
}

interface ChatMessage {
  role: "user" | "assistant";
  text: string;
  mode?: string;
}

export function AIArchitectTab({ event }: AIArchitectTabProps): React.ReactElement {
  const [plannerQuery, setPlannerQuery] = useState("");
  const [plannerMessages, setPlannerMessages] = useState<ChatMessage[]>([]);
  const [isPlanning, setIsPlanning] = useState(false);

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

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading text-xl font-bold text-slate-900 dark:text-white">
          AI Celebration Architect
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Interactive contextual assistant with automatic offline fallback to deterministic
          pure-math rules.
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
                &ldquo;What if I shift 15% budget from decor to catering?&rdquo; or &ldquo;Recommend
                rain backup equipment for outdoor event.&rdquo;
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
            className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/35 disabled:opacity-50 flex items-center gap-1.5 cursor-pointer"
          >
            <Send className="h-3.5 w-3.5" />
            <span>{isPlanning ? "Analyzing..." : "Ask"}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
