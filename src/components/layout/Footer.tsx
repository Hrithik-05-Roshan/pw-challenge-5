import React from "react";
import Link from "next/link";
import { Sparkles, Shield, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-[var(--border)] bg-[var(--card)] mt-auto" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-indigo-600 text-white">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="font-bold text-base text-[var(--foreground)]">Gatherly AI</span>
            </div>
            <p className="text-sm text-[var(--muted-foreground)] max-w-md">
              Every celebration, beautifully planned. Intelligent event architecture for weddings,
              birthdays, and community festivals with deterministic budgets, backwards timelines,
              and contextual risk planning.
            </p>
            <div className="flex items-center gap-2 text-xs text-[var(--muted-foreground)]">
              <Shield className="h-4 w-4 text-emerald-500" aria-hidden="true" />
              <span>Zero-PII transmission. 100% client-isolated guest privacy.</span>
            </div>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-[var(--foreground)] mb-3">
              Explore Journeys
            </h2>
            <ul className="space-y-2 text-sm text-[var(--muted-foreground)]">
              <li>
                <Link href="/onboarding" className="hover:text-indigo-600">
                  Planning Wizard
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-indigo-600">
                  Live Dashboard
                </Link>
              </li>
              <li>
                <Link href="/events/new" className="hover:text-indigo-600">
                  Create New Event
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-[var(--foreground)] mb-3">
              Integrity & Trust
            </h2>
            <ul className="space-y-2 text-sm text-[var(--muted-foreground)]">
              <li>
                <Link href="/settings" className="hover:text-indigo-600">
                  Privacy & Settings
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-indigo-600"
                >
                  GitHub Repository
                </a>
              </li>
              <li className="text-xs text-[var(--muted-foreground)]">
                MIT License | WCAG 2.2 AA
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-[var(--border)] pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[var(--muted-foreground)] gap-3">
          <p>© 2026 Gatherly AI. Built for Challenge 5: Celebration & Event Planner.</p>
          <p className="flex items-center gap-1">
            Engineered with <Heart className="h-3 w-3 text-rose-500 inline fill-current" /> for human celebrations.
          </p>
        </div>
      </div>
    </footer>
  );
}
