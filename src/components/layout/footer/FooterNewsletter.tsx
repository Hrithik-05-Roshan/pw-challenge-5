"use client";

/**
 * @file FooterNewsletter.tsx
 * @description Newsletter subscription and brand mission module for Gatherly AI footer.
 */

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, ShieldCheck, Lock, CheckCircle2, ChevronRight } from "lucide-react";

export function FooterNewsletter(): React.ReactElement {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-5 border-b border-slate-200/60 dark:border-white/5">
      {/* Brand & Mission */}
      <div className="lg:col-span-6 space-y-2.5">
        <Link href="/" className="inline-flex items-center gap-2 group min-h-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-rose-500 text-white shadow-md shadow-indigo-500/25 group-hover:scale-105 transition-all duration-200">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-editorial text-xl font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              Gatherly
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-rose-500 inline-block animate-pulse" />
          </div>
        </Link>

        <p className="text-xs text-slate-600 dark:text-slate-400 max-w-lg leading-relaxed">
          Every celebration, beautifully planned. Intelligent event architecture for destination weddings,
          milestone birthdays, and community festivals with deterministic 100% mathematical budgets and backwards milestone timelines.
        </p>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center gap-2 pt-0.5 text-[11px]">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 font-medium">
            <ShieldCheck className="h-3 w-3 shrink-0" />
            <span>100% Client-Side Isolated</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20 font-medium">
            <Lock className="h-3 w-3 shrink-0" />
            <span>Zero-PII Storage</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 font-medium">
            <CheckCircle2 className="h-3 w-3 shrink-0" />
            <span>Deterministic Math Engine</span>
          </span>
        </div>
      </div>

      {/* Newsletter / Concierge Digest */}
      <div className="lg:col-span-6 space-y-2">
        <div>
          <h3 className="font-editorial text-sm font-bold text-slate-900 dark:text-white">
            Bespoke Planning Digest
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Receive curated seasonal event trends, vendor negotiation playbooks, and timeline heuristics.
          </p>
        </div>

        {subscribed ? (
          <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
            <span>You&apos;re subscribed to the Bespoke Planning Digest! Check your inbox soon.</span>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address..."
              required
              aria-label="Email address for planning digest"
              className="flex-1 rounded-xl border border-slate-200/80 dark:border-white/10 bg-slate-50 dark:bg-white/[0.03] px-3.5 py-2 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500 shadow-xs"
            />
            <button
              type="submit"
              className="group inline-flex items-center justify-center gap-1 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 cursor-pointer shrink-0"
            >
              <ChevronRight className="h-3.5 w-3.5 stroke-[2.5] transition-transform duration-200 group-hover:translate-x-0.5" />
              <span>Subscribe</span>
            </button>
          </form>
        )}

        <p className="text-[11px] text-slate-400 dark:text-slate-500">
          Zero spam. We respect your inbox just like your private event data.
        </p>
      </div>
    </div>
  );
}
