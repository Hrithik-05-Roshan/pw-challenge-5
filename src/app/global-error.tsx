"use client";

/**
 * @file global-error.tsx
 * @description Next.js App Router Global Root Error Boundary.
 *
 * Handles critical exceptions that occur within the root layout itself, providing
 * an isolated HTML document skeleton so the application never displays a blank page.
 */

import React from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ reset }: GlobalErrorProps): React.ReactElement {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-white min-h-screen flex items-center justify-center p-6 font-sans">
        <div
          role="alert"
          aria-live="assertive"
          className="max-w-md w-full text-center space-y-6 p-8 rounded-3xl border border-white/10 bg-slate-900/90 shadow-2xl backdrop-blur-xl"
        >
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <AlertTriangle className="h-8 w-8" aria-hidden="true" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight">System Initialization Error</h1>
            <p className="text-sm text-slate-400 leading-relaxed">
              A critical error occurred while initializing the root layout. Please reload the workspace.
            </p>
          </div>

          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-indigo-700 active:scale-95 transition-all cursor-pointer"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            <span>Reload Application</span>
          </button>
        </div>
      </body>
    </html>
  );
}
