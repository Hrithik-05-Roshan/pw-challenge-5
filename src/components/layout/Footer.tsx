"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ShieldCheck,
  Heart,
  ChevronRight,
  CheckCircle2,
  Lock,
  CalendarDays,
  Crown,
  Cake,
  TreePine,
  Scale,
  Layers,
  Globe2,
} from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer
      className="w-full border-t border-slate-200/80 dark:border-white/10 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl transition-colors duration-300"
      role="contentinfo"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 space-y-5">
        {/* ======================================================== */}
        {/* TOP SEGMENT: Brand, Tagline & Bespoke Newsletter Digest  */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-5 border-b border-slate-200/60 dark:border-white/5">
          {/* Brand & Mission */}
          <div className="lg:col-span-6 space-y-3">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-rose-500 text-white shadow-md shadow-indigo-500/25 group-hover:scale-105 group-hover:shadow-indigo-500/40 transition-all duration-200">
                <Sparkles className="h-4.5 w-4.5" aria-hidden="true" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-editorial text-2xl font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  Gatherly
                </span>
                <span className="h-2 w-2 rounded-full bg-rose-500 inline-block animate-pulse" />
              </div>
            </Link>

            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-lg leading-relaxed">
              Every celebration, beautifully planned. Intelligent event architecture for destination weddings,
              milestone birthdays, and community festivals with deterministic 100% mathematical budgets and backwards milestone timelines.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px]">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 font-medium">
                <ShieldCheck className="h-3 w-3" />
                <span>100% Client-Side Isolated</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20 font-medium">
                <Lock className="h-3 w-3" />
                <span>Zero-PII Storage</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 font-medium">
                <CheckCircle2 className="h-3 w-3" />
                <span>Deterministic Math Engine</span>
              </span>
            </div>
          </div>

          {/* Newsletter / Concierge Digest */}
          <div className="lg:col-span-6 space-y-3">
            <div>
              <h3 className="font-editorial text-base font-bold text-slate-900 dark:text-white">
                Bespoke Planning Digest
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Receive curated seasonal event trends, vendor negotiation playbooks, and timeline heuristics.
              </p>
            </div>

            {subscribed ? (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
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

        {/* ======================================================== */}
        {/* MIDDLE SEGMENT: 4 Well-Organized Structured Columns       */}
        {/* ======================================================== */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-xs pt-1 pb-1">
          {/* Col 1: Journeys */}
          <div className="space-y-2.5">
            <h4 className="font-bold uppercase tracking-wider text-slate-900 dark:text-white text-[11px] flex items-center gap-1.5">
              <Sparkles className="h-3 w-3 text-indigo-500" />
              <span>Journeys</span>
            </h4>
            <ul className="space-y-1.5 text-slate-600 dark:text-slate-400">
              <li>
                <Link
                  href="/onboarding"
                  className="group flex items-center gap-1.5 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  <ChevronRight className="h-3 w-3 stroke-[2.5] text-indigo-500 transition-transform duration-200 group-hover:translate-x-1 shrink-0" />
                  <span>Interactive Planning Wizard</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="group flex items-center gap-1.5 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  <ChevronRight className="h-3 w-3 stroke-[2.5] text-indigo-500 transition-transform duration-200 group-hover:translate-x-1 shrink-0" />
                  <span>Celebration Workspaces</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/events/new"
                  className="group flex items-center gap-1.5 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  <ChevronRight className="h-3 w-3 stroke-[2.5] text-indigo-500 transition-transform duration-200 group-hover:translate-x-1 shrink-0" />
                  <span>Create New Celebration</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/settings"
                  className="group flex items-center gap-1.5 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  <ChevronRight className="h-3 w-3 stroke-[2.5] text-indigo-500 transition-transform duration-200 group-hover:translate-x-1 shrink-0" />
                  <span>Data Sovereignty Center</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Archetypes */}
          <div className="space-y-2.5">
            <h4 className="font-bold uppercase tracking-wider text-slate-900 dark:text-white text-[11px] flex items-center gap-1.5">
              <Layers className="h-3 w-3 text-rose-500" />
              <span>Celebrations</span>
            </h4>
            <ul className="space-y-1.5 text-slate-600 dark:text-slate-400">
              <li>
                <Link
                  href="/dashboard?filter=wedding"
                  className="group flex items-center gap-1.5 hover:text-rose-500 dark:hover:text-rose-400 transition-colors"
                >
                  <ChevronRight className="h-3 w-3 stroke-[2.5] text-rose-500 transition-transform duration-200 group-hover:translate-x-1 shrink-0" />
                  <Crown className="h-3 w-3 text-rose-500 shrink-0" />
                  <span>Destination Weddings</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard?filter=birthday"
                  className="group flex items-center gap-1.5 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
                >
                  <ChevronRight className="h-3 w-3 stroke-[2.5] text-indigo-500 transition-transform duration-200 group-hover:translate-x-1 shrink-0" />
                  <Cake className="h-3 w-3 text-indigo-500 shrink-0" />
                  <span>Milestone Birthdays</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard?filter=community"
                  className="group flex items-center gap-1.5 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors"
                >
                  <ChevronRight className="h-3 w-3 stroke-[2.5] text-emerald-500 transition-transform duration-200 group-hover:translate-x-1 shrink-0" />
                  <TreePine className="h-3 w-3 text-emerald-500 shrink-0" />
                  <span>Community Eco-Fairs</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard?filter=corporate"
                  className="group flex items-center gap-1.5 hover:text-violet-500 dark:hover:text-violet-400 transition-colors"
                >
                  <ChevronRight className="h-3 w-3 stroke-[2.5] text-violet-500 transition-transform duration-200 group-hover:translate-x-1 shrink-0" />
                  <CalendarDays className="h-3 w-3 text-violet-500 shrink-0" />
                  <span>Corporate Summits</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Engine Invariants */}
          <div className="space-y-2.5">
            <h4 className="font-bold uppercase tracking-wider text-slate-900 dark:text-white text-[11px] flex items-center gap-1.5">
              <Scale className="h-3 w-3 text-emerald-500" />
              <span>Engine Invariants</span>
            </h4>
            <ul className="space-y-1.5 text-slate-600 dark:text-slate-400">
              <li>
                <Link
                  href="/dashboard"
                  className="group flex items-center gap-1.5 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  <ChevronRight className="h-3 w-3 stroke-[2.5] text-emerald-500 transition-transform duration-200 group-hover:translate-x-1 shrink-0" />
                  <span>100% Mathematical Precision</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="group flex items-center gap-1.5 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  <ChevronRight className="h-3 w-3 stroke-[2.5] text-emerald-500 transition-transform duration-200 group-hover:translate-x-1 shrink-0" />
                  <span>5–10% Contingency Buffer</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/onboarding"
                  className="group flex items-center gap-1.5 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  <ChevronRight className="h-3 w-3 stroke-[2.5] text-emerald-500 transition-transform duration-200 group-hover:translate-x-1 shrink-0" />
                  <span>Backwards Milestone Schedulers</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/settings"
                  className="group flex items-center gap-1.5 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  <ChevronRight className="h-3 w-3 stroke-[2.5] text-emerald-500 transition-transform duration-200 group-hover:translate-x-1 shrink-0" />
                  <span>Explainable Trade-Off Matrix</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="group flex items-center gap-1.5 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  <ChevronRight className="h-3 w-3 stroke-[2.5] text-emerald-500 transition-transform duration-200 group-hover:translate-x-1 shrink-0" />
                  <span>RFC 5545 iCalendar Exports</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Real Social Media & GitHub */}
          <div className="space-y-2.5">
            <h4 className="font-bold uppercase tracking-wider text-slate-900 dark:text-white text-[11px] flex items-center gap-1.5">
              <Globe2 className="h-3 w-3 text-indigo-500" />
              <span>Connect & Community</span>
            </h4>
            <ul className="space-y-1.5 text-slate-600 dark:text-slate-400">
              <li>
                <a
                  href="https://github.com/Hrithik-05-Roshan/pw-challenge-5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-1.5 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  <ChevronRight className="h-3 w-3 stroke-[2.5] text-indigo-500 transition-transform duration-200 group-hover:translate-x-1 shrink-0" />
                  <span>GitHub Repository</span>
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-1.5 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  <ChevronRight className="h-3 w-3 stroke-[2.5] text-indigo-500 transition-transform duration-200 group-hover:translate-x-1 shrink-0" />
                  <span>X / Twitter Updates</span>
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-1.5 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  <ChevronRight className="h-3 w-3 stroke-[2.5] text-indigo-500 transition-transform duration-200 group-hover:translate-x-1 shrink-0" />
                  <span>LinkedIn Network</span>
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-1.5 hover:text-rose-500 dark:hover:text-rose-400 transition-colors"
                >
                  <ChevronRight className="h-3 w-3 stroke-[2.5] text-rose-500 transition-transform duration-200 group-hover:translate-x-1 shrink-0" />
                  <span>Instagram Inspiration</span>
                </a>
              </li>
            </ul>

            {/* Social Icon Pill Buttons */}
            <div className="flex items-center gap-1.5 pt-1">
              {/* GitHub */}
              <a
                href="https://github.com/Hrithik-05-Roshan/pw-challenge-5"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 dark:bg-white/[0.04] text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white hover:scale-115 hover:-translate-y-0.5 hover:border-indigo-500/40 hover:shadow-xs transition-all border border-slate-200/80 dark:border-white/10"
                aria-label="GitHub Repository"
                title="GitHub Repository"
              >
                <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>

              {/* X / Twitter */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 dark:bg-white/[0.04] text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white hover:scale-115 hover:-translate-y-0.5 hover:border-indigo-500/40 hover:shadow-xs transition-all border border-slate-200/80 dark:border-white/10"
                aria-label="X (formerly Twitter)"
                title="X / Twitter"
              >
                <svg className="h-3 w-3 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 dark:bg-white/[0.04] text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white hover:scale-115 hover:-translate-y-0.5 hover:border-indigo-500/40 hover:shadow-xs transition-all border border-slate-200/80 dark:border-white/10"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <svg className="h-3 w-3 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 dark:bg-white/[0.04] text-slate-700 dark:text-slate-300 hover:text-rose-500 dark:hover:text-rose-400 hover:scale-115 hover:-translate-y-0.5 hover:border-rose-500/40 hover:shadow-xs transition-all border border-slate-200/80 dark:border-white/10"
                aria-label="Instagram"
                title="Instagram"
              >
                <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 dark:bg-white/[0.04] text-slate-700 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 hover:scale-115 hover:-translate-y-0.5 hover:border-rose-600/40 hover:shadow-xs transition-all border border-slate-200/80 dark:border-white/10"
                aria-label="YouTube"
                title="YouTube"
              >
                <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* BOTTOM BAR: Copyright, System Status & Handcrafted Badge */}
        {/* ======================================================== */}
        <div className="pt-4 border-t border-slate-200/60 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-3">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <Link
              href="/"
              className="group inline-flex items-center gap-1 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              <ChevronRight className="h-3 w-3 stroke-[2.5] text-indigo-500 transition-transform duration-200 group-hover:translate-x-0.5 shrink-0" />
              <span>© 2026 Gatherly AI. Built for Challenge 5: Celebration & Event Planner.</span>
            </Link>
            <span className="hidden sm:inline">•</span>
            <span className="text-[11px] font-mono">v1.2.0 • Production Ready</span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/settings"
              className="group flex items-center gap-1.5 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <ChevronRight className="h-3 w-3 stroke-[2.5] text-emerald-500 transition-transform duration-200 group-hover:translate-x-0.5 shrink-0" />
              <span className="font-medium">All Systems Operational</span>
            </Link>
            <p className="flex items-center gap-1">
              <span>Handcrafted with</span>
              <Heart className="h-3 w-3 text-rose-500 fill-rose-500 inline" />
              <span>for human celebrations</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
