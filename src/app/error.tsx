"use client";

/**
 * @file error.tsx
 * @description Next.js App Router Root Error Boundary.
 *
 * Catches unhandled runtime render exceptions and displays a graceful, accessible
 * recovery interface without exposing sensitive stack traces in production.
 */

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorProps): React.ReactElement {
  useEffect(() => {
    // Log exception safely to client telemetry/console
    if (process.env.NODE_ENV !== "production") {
      console.error("Gatherly AI Application Error:", error);
    }
  }, [error]);

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="flex min-h-[70vh] flex-col items-center justify-center text-center px-4 sm:px-6 py-12 space-y-6 ambient-bg"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 shadow-md">
        <AlertTriangle className="h-8 w-8" aria-hidden="true" />
      </div>

      <div className="space-y-2 max-w-md">
        <h1 className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Unexpected Studio Interruption
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          An unexpected error occurred while orchestrating this celebration workspace. Your local data remains safely preserved.
        </p>
        {error.digest && (
          <p className="text-[11px] font-mono text-slate-400 dark:text-slate-500 pt-1">
            Incident Digest: {error.digest}
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <button
          type="button"
          onClick={() => reset()}
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-indigo-700 active:scale-95 transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          <span>Try Again</span>
        </button>

        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/5 px-5 py-2.5 text-sm font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 active:scale-95 transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
          <Home className="h-4 w-4 text-slate-500" aria-hidden="true" />
          <span>Return to Dashboard</span>
        </Link>
      </div>
    </div>
  );
}
