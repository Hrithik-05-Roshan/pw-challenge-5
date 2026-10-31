/**
 * @file TimelineTab.tsx
 * @description Backwards milestone checklist with countdown dates, category chips,
 * and completion toggling.
 */

import React from "react";
import { Calendar, CheckCircle2, Trash2 } from "lucide-react";
import { EventPlan } from "@/types";
import { downloadICS } from "@/lib/export/ics";

interface TimelineTabProps {
  event: EventPlan;
  onToggleTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
}

export function TimelineTab({
  event,
  onToggleTask,
  onDeleteTask,
}: TimelineTabProps): React.ReactElement {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-xl font-bold text-slate-900 dark:text-white">
            Backwards Milestone Timeline
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Reverse-scheduled backwards from target celebration date ({event.date}). Automatically
            compresses under short lead times.
          </p>
        </div>
        <button
          onClick={() => downloadICS(event)}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.04] px-4 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 cursor-pointer"
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
              task.completed
                ? "opacity-60 bg-slate-50/40 dark:bg-white/[0.02]"
                : "hover:border-indigo-500/40 shadow-sm"
            }`}
          >
            <div className="flex items-center gap-3.5">
              <button
                onClick={() => onToggleTask(task.id)}
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
                    task.completed
                      ? "line-through text-slate-400 dark:text-slate-500"
                      : "text-slate-900 dark:text-white"
                  }`}
                >
                  {task.title}
                </p>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  Target Due:{" "}
                  <strong className="text-slate-700 dark:text-slate-300">{task.dueDate}</strong> •
                  Category: <span className="capitalize">{task.category}</span>
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
                onClick={() => onDeleteTask(task.id)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
                aria-label={`Delete task ${task.title}`}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
