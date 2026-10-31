"use client";

import React, { useState } from "react";
import { Shield, Trash2, CheckCircle2 } from "lucide-react";
import { useEventStore } from "@/store/useEventStore";

export default function SettingsPage() {
  const resetAllData = useEventStore((s) => s.resetAllData);
  const [deleted, setDeleted] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDeleteAll = () => {
    resetAllData();
    setDeleted(true);
    setConfirmDelete(false);
    setTimeout(() => setDeleted(false), 3000);
  };

  return (
    <div className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--foreground)] tracking-tight">
          Settings & Privacy
        </h1>
        <p className="text-sm text-[var(--muted-foreground)]">
          Manage your interface preferences, privacy boundaries, and client-side data erasure.
        </p>
      </div>

      {/* Privacy Architecture Notice */}
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 space-y-4 shadow-sm">
        <h2 className="text-base font-bold text-[var(--foreground)] flex items-center gap-2">
          <Shield className="h-5 w-5 text-emerald-500" />
          <span>Zero-PII Storage Architecture</span>
        </h2>

        <div className="space-y-2 text-xs sm:text-sm text-[var(--muted-foreground)] leading-relaxed">
          <p>
            <strong>Client-Side Storage:</strong> Gatherly AI does not maintain centralized cloud user
            accounts or tracking databases. All event calculations, budgets, and attendee lists are
            persisted exclusively in your browser&apos;s origin-scoped <code>localStorage</code>.
          </p>
          <p>
            <strong>Guest Privacy:</strong> Attendee personal details (names, phone numbers, specific
            dietary requirements) are strictly isolated and <strong>NEVER</strong> transmitted over
            the network to any LLM or external provider.
          </p>
          <p>
            <strong>Disclaimer:</strong> As with any browser storage, <code>localStorage</code> is
            isolated per browser origin, but does not provide hardware or OS-level cryptographic
            enclaves. Avoid entering confidential payment credentials.
          </p>
        </div>
      </div>

      {/* Total Data Reset */}
      <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-6 space-y-4">
        <div>
          <h2 className="text-base font-bold text-rose-600 flex items-center gap-2">
            <Trash2 className="h-5 w-5" />
            <span>Delete All Client Data</span>
          </h2>
          <p className="text-xs text-[var(--muted-foreground)] mt-1">
            Instantly clears your entire local browser storage, removing all custom celebrations, tasks,
            and guest rosters, and re-initializing default sample seed states.
          </p>
        </div>

        {deleted && (
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 bg-emerald-500/10 p-3 rounded-lg">
            <CheckCircle2 className="h-4 w-4" />
            <span>All local browser data has been successfully wiped and reset.</span>
          </div>
        )}

        {!confirmDelete ? (
          <button
            onClick={() => setConfirmDelete(true)}
            className="rounded-lg bg-rose-600 px-4 py-2.5 text-xs font-semibold text-white shadow hover:bg-rose-700 transition-colors"
          >
            Delete All Data
          </button>
        ) : (
          <div className="flex items-center gap-3">
            <button
              onClick={handleDeleteAll}
              className="rounded-lg bg-rose-700 px-4 py-2 text-xs font-bold text-white shadow"
            >
              Confirm Permanent Erasure
            </button>
            <button
              onClick={() => setConfirmDelete(false)}
              className="rounded-lg border border-[var(--border)] px-4 py-2 text-xs font-semibold text-[var(--foreground)]"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
