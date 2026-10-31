"use client";

import React, { useState } from "react";
import { Trash2, CheckCircle2, Lock, HardDrive } from "lucide-react";
import { useEventStore } from "@/store/useEventStore";

export default function SettingsPage() {
  const resetAllData = useEventStore((s) => s.resetAllData);
  const [deleted, setDeleted] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDeleteAll = () => {
    resetAllData();
    setDeleted(true);
    setConfirmDelete(false);
    setTimeout(() => setDeleted(false), 3500);
  };

  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto space-y-8 ambient-bg">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold text-indigo-700 dark:text-indigo-300">
          <HardDrive className="h-3.5 w-3.5" />
          <span>Privacy & Data Sovereignty</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Privacy & Storage Settings
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Inspect client-side storage boundaries, zero-PII guarantees, and execute complete browser data erasure.
        </p>
      </div>

      {/* Privacy Architecture Notice */}
      <div className="rounded-3xl glass-card p-6 sm:p-8 space-y-4 shadow-xl">
        <h2 className="font-heading text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
          <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <Lock className="h-5 w-5" />
          </span>
          <span>Zero-PII Storage Architecture</span>
        </h2>

        <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/5 space-y-1">
            <strong className="text-slate-900 dark:text-white block font-heading text-sm">Client-Side LocalStorage Isolation:</strong>
            <p>Gatherly AI does not maintain centralized cloud user databases. All event plans, budgets, and attendee rosters are persisted exclusively inside your browser&apos;s origin-scoped <code>localStorage</code>.</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20 space-y-1">
            <strong className="text-emerald-700 dark:text-emerald-300 block font-heading text-sm">Guest Privacy Guarantee:</strong>
            <p>Attendee names, phone numbers, and dietary requirements are strictly isolated and <strong>NEVER</strong> transmitted over the network or passed into LLM prompt contexts.</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20 space-y-1">
            <strong className="text-amber-700 dark:text-amber-300 block font-heading text-sm">Security Advisory:</strong>
            <p>While <code>localStorage</code> is origin-isolated, avoid storing confidential credit card numbers or government IDs. Export backups via the JSON download feature.</p>
          </div>
        </div>
      </div>

      {/* Total Data Reset */}
      <div className="rounded-3xl border border-rose-500/30 bg-rose-500/5 dark:bg-rose-500/10 p-6 sm:p-8 space-y-5 shadow-xl backdrop-blur-md">
        <div>
          <h2 className="font-heading text-lg font-bold text-rose-600 dark:text-rose-400 flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-rose-500/10 text-rose-600">
              <Trash2 className="h-5 w-5" />
            </span>
            <span>Permanent Client Data Erasure</span>
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
            Instantly clears your entire local browser storage, permanently removing all custom celebrations, tasks, and guest lists, and re-initializing sample seed demonstrations.
          </p>
        </div>

        {deleted && (
          <div className="flex items-center gap-2.5 text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-500/15 p-4 rounded-2xl border border-emerald-500/30">
            <CheckCircle2 className="h-4.5 w-4.5 text-emerald-600 shrink-0" />
            <span>All local browser data has been successfully wiped and reset.</span>
          </div>
        )}

        {!confirmDelete ? (
          <button
            onClick={() => setConfirmDelete(true)}
            className="rounded-xl bg-rose-600 px-5 py-3 text-xs font-bold text-white shadow-md shadow-rose-600/25 hover:bg-rose-700 transition-all cursor-pointer"
          >
            Delete All Local Data
          </button>
        ) : (
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleDeleteAll}
              className="rounded-xl bg-rose-700 px-5 py-3 text-xs font-bold text-white shadow-lg shadow-rose-700/30 hover:bg-rose-800 transition-all cursor-pointer"
            >
              Confirm Permanent Erasure
            </button>
            <button
              onClick={() => setConfirmDelete(false)}
              className="rounded-xl border border-slate-200 dark:border-white/10 px-4 py-3 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-all cursor-pointer"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
