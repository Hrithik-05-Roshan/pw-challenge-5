import React from "react";
import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import {
  Sparkles,
  ChevronRight,
  ShieldCheck,
  PieChart,
  CheckCircle2,
  Clock,
  CalendarDays,
  Crown,
  Cake,
  TreePine,
  FileDown,
  Lock,
  Lightbulb,
  AlertTriangle,
  Users2,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen ambient-bg page-transition snap-scroll-container">
      {/* Floating Gallery Section Navigator (Gallery photo-swipe indicator) */}
      <nav
        aria-label="Gallery Section Navigator"
        className="fixed right-6 top-1/2 -translate-y-1/2 z-30 hidden xl:flex flex-col items-center gap-3 p-2 rounded-full glass-panel shadow-lg"
      >
        <a
          href="#section-hero"
          className="group flex items-center justify-center h-8 w-8 rounded-full hover:bg-indigo-500/10 transition-colors"
          title="Studio Overview"
          aria-label="Studio Overview"
        >
          <span className="h-2.5 w-2.5 rounded-full bg-slate-400 group-hover:bg-indigo-600 group-hover:scale-125 transition-all" />
        </a>
        <a
          href="#section-archetypes"
          className="group flex items-center justify-center h-8 w-8 rounded-full hover:bg-rose-500/10 transition-colors"
          title="Celebration Archetypes"
          aria-label="Celebration Archetypes"
        >
          <span className="h-2.5 w-2.5 rounded-full bg-slate-400 group-hover:bg-rose-500 group-hover:scale-125 transition-all" />
        </a>
        <a
          href="#section-architecture"
          className="group flex items-center justify-center h-8 w-8 rounded-full hover:bg-amber-500/10 transition-colors"
          title="Engineering Rigor"
          aria-label="Engineering Rigor"
        >
          <span className="h-2.5 w-2.5 rounded-full bg-slate-400 group-hover:bg-amber-500 group-hover:scale-125 transition-all" />
        </a>
        <a
          href="#section-cta"
          className="group flex items-center justify-center h-8 w-8 rounded-full hover:bg-emerald-500/10 transition-colors"
          title="Get Started"
          aria-label="Get Started"
        >
          <span className="h-2.5 w-2.5 rounded-full bg-slate-400 group-hover:bg-emerald-500 group-hover:scale-125 transition-all" />
        </a>
      </nav>

      {/* ======================================================== */}
      {/* SECTION 1: HERO STUDIO (Snaps to full view)              */}
      {/* ======================================================== */}
      <section
        id="section-hero"
        className="snap-page-section relative overflow-hidden px-4 sm:px-6 lg:px-8 py-12 lg:py-16"
      >
        <div className="mx-auto max-w-7xl w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-7 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/25 bg-indigo-500/10 dark:bg-indigo-500/15 px-4 py-2 text-xs font-semibold text-indigo-700 dark:text-indigo-300 shadow-xs backdrop-blur-md">
                <span className="flex h-2 w-2 rounded-full bg-rose-500 animate-ping" />
                <Sparkles className="h-3.5 w-3.5 text-indigo-500" aria-hidden="true" />
                <span className="tracking-wide">Every Celebration, Bespoke & Planned</span>
              </div>

              {/* Main Headline with Editorial Serif & Human Warmth */}
              <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.08]">
                Every celebration, <br />
                <span className="shimmer-text italic font-serif font-normal">beautifully planned.</span>
              </h1>

              {/* Tagline & Subtitle */}
              <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Bespoke event architecture for weddings, milestone birthdays, and community festivals. 
                Guaranteed <strong className="text-slate-900 dark:text-white font-semibold">100% mathematical budget precision</strong>, 
                backwards milestone timelines, explainable vendor decisions, and absolute zero-PII guest privacy.
              </p>

              {/* Primary CTAs with '>' icon and hover effect */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/onboarding"
                  className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-600 px-8 py-4 text-sm sm:text-base font-bold text-white shadow-xl shadow-indigo-500/25 hover:shadow-2xl hover:shadow-indigo-500/40 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 cursor-pointer"
                >
                  <ChevronRight className="h-4.5 w-4.5 stroke-[2.5] transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                  <span>Start Planning Wizard</span>
                </Link>

                <Link
                  href="/dashboard"
                  className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-white/[0.04] px-7 py-4 text-sm sm:text-base font-semibold text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 backdrop-blur-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-sm cursor-pointer"
                >
                  <ChevronRight className="h-4 w-4 stroke-[2.5] text-indigo-500 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                  <span>Explore Showcase Events</span>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-y-3 gap-x-8 pt-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
                <span className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-500" aria-hidden="true" />
                  Zero-PII Client-Side Privacy
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-indigo-500" aria-hidden="true" />
                  Deterministic 100% Math Guarantee
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-amber-500" aria-hidden="true" />
                  Backwards Milestone Schedule
                </span>
              </div>
            </div>

            {/* Right Interactive Studio Card */}
            <div className="lg:col-span-5" aria-hidden="true">
              <div className="relative glass-card rounded-3xl p-6 sm:p-7 shadow-2xl ring-1 ring-black/5 dark:ring-white/10">
                {/* Window header */}
                <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-white/10 pb-4 mb-5">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-rose-500/80 shadow-xs" />
                    <span className="h-3 w-3 rounded-full bg-amber-500/80 shadow-xs" />
                    <span className="h-3 w-3 rounded-full bg-emerald-500/80 shadow-xs" />
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300">
                    <Sparkles className="h-3 w-3 text-indigo-500" />
                    <span>gatherly.workspace</span>
                  </div>
                </div>

                {/* Event Card Content */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <Crown className="h-4 w-4 text-amber-500" />
                        <h3 className="font-editorial text-lg font-bold text-slate-900 dark:text-white">
                          Aarav & Meera&apos;s Royal Wedding
                        </h3>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
                        Udaipur • 350 Guests • Destination Grandeur
                      </p>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 shadow-xs">
                      100% Balanced
                    </span>
                  </div>

                  {/* Budget Allocation Bar */}
                  <div className="space-y-2.5 p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/70 dark:border-white/5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-600 dark:text-slate-400 font-medium">Total Allocated Budget</span>
                      <span className="font-display font-extrabold text-sm text-slate-900 dark:text-white">₹25,00,000 INR</span>
                    </div>
                    
                    <div className="h-3.5 w-full rounded-full bg-slate-200 dark:bg-slate-800 flex overflow-hidden p-0.5 gap-0.5">
                      <div className="bg-indigo-600 rounded-l-full h-full w-[40%]" title="Venue & Lodging (40%)" />
                      <div className="bg-violet-500 h-full w-[28%]" title="Catering (28%)" />
                      <div className="bg-pink-500 h-full w-[12%]" title="Decor & Florals (12%)" />
                      <div className="bg-amber-500 h-full w-[8%]" title="Photography (8%)" />
                      <div className="bg-emerald-500 rounded-r-full h-full w-[7%]" title="Contingency Reserve (7%)" />
                    </div>

                    <div className="flex justify-between text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                      <span>Venue & Lodging (40%)</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Contingency Reserve (7% Locked)</span>
                    </div>
                  </div>

                  {/* Micro metric badges */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/70 dark:border-white/5">
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                        <CalendarDays className="h-3.5 w-3.5 text-indigo-500" />
                        <span>Timeline Schedule</span>
                      </div>
                      <p className="font-display font-bold text-sm text-slate-900 dark:text-white mt-1">T-120 Days</p>
                      <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">On track for vendor freeze</p>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/70 dark:border-white/5">
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                        <Users2 className="h-3.5 w-3.5 text-violet-500" />
                        <span>Guest List Health</span>
                      </div>
                      <p className="font-display font-bold text-sm text-slate-900 dark:text-white mt-1">350 Tracked</p>
                      <p className="text-[10px] text-indigo-600 dark:text-indigo-400 font-medium">Zero-PII local encryption</p>
                    </div>
                  </div>

                  {/* Explainable AI callout */}
                  <div className="p-3.5 rounded-2xl bg-indigo-500/5 dark:bg-indigo-500/10 border border-indigo-500/20 text-xs">
                    <div className="flex items-center gap-1.5 text-indigo-700 dark:text-indigo-300 font-bold mb-1">
                      <Lightbulb className="h-3.5 w-3.5 text-indigo-500" />
                      <span>Bespoke Concierge Strategy</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                      Catering optimized to live Rajasthani food counters to reduce banquet labor overhead by 22% while boosting guest culinary interaction.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 2: CELEBRATION ARCHETYPES (Snaps to full view)   */}
      {/* ======================================================== */}
      <section
        id="section-archetypes"
        className="snap-page-section relative overflow-hidden px-4 sm:px-6 lg:px-8 py-12 lg:py-16 border-t border-slate-200/80 dark:border-white/10 bg-slate-50/60 dark:bg-black/20"
      >
        <div className="mx-auto max-w-7xl w-full">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <h2 className="font-editorial text-sm font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Celebration Archetypes
            </h2>
            <p className="font-editorial text-3xl sm:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
              Tailored Intelligence for Every Occasion
            </p>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              Every gathering has its own rhythm. Gatherly couples industry heuristics with genuine human hospitality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Wedding Card */}
            <div className="relative glass-card rounded-3xl p-7 space-y-4 overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-rose-500 via-amber-500 to-rose-400" />
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-white shadow-md shadow-rose-500/20 group-hover:scale-105 transition-transform duration-300">
                <Crown className="h-6 w-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">Dream Weddings</span>
                <h3 className="font-editorial text-2xl font-bold text-slate-900 dark:text-white mt-1">Multi-day & Nuptial Banquets</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                Multi-function schedules (Mehendi, Sangeet, Reception), high-capacity catering allocations, and a protected 7% contingency reserve shielding you from surprise fees.
              </p>
              <div className="pt-3 border-t border-slate-200/60 dark:border-white/5 flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                <span>Scale: 50 to 1,500+ guests</span>
                <span className="text-rose-600 dark:text-rose-400">T-180d Timeline</span>
              </div>
            </div>

            {/* Birthday Card */}
            <div className="relative glass-card rounded-3xl p-7 space-y-4 overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
                <Cake className="h-6 w-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Milestone Birthdays</span>
                <h3 className="font-editorial text-2xl font-bold text-slate-900 dark:text-white mt-1">1st to 80th Milestone Bashes</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                Curated themes (Neon Retro, Bohemian Chic, Minimalist Garden) with high-energy entertainment, live cake tasting deadlines, and rush lead-time compression.
              </p>
              <div className="pt-3 border-t border-slate-200/60 dark:border-white/5 flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                <span>Scale: 15 to 250 guests</span>
                <span className="text-indigo-600 dark:text-indigo-400">T-30d Timeline</span>
              </div>
            </div>

            {/* Community Event Card */}
            <div className="relative glass-card rounded-3xl p-7 space-y-4 overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500" />
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-300">
                <TreePine className="h-6 w-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Community Festivals</span>
                <h3 className="font-editorial text-2xl font-bold text-slate-900 dark:text-white mt-1">Eco-Fairs, Galas & Bazaars</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                Municipal permits, audio-visual sound limits, crowd security buffers, and automated monsoon rain contingency planning with generator backups.
              </p>
              <div className="pt-3 border-t border-slate-200/60 dark:border-white/5 flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                <span>Scale: 100 to 2,000 attendees</span>
                <span className="text-emerald-600 dark:text-emerald-400">Permit Centric</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 3: ENGINEERING ARCHITECTURE (Snaps to full view) */}
      {/* ======================================================== */}
      <section
        id="section-architecture"
        className="snap-page-section relative overflow-hidden px-4 sm:px-6 lg:px-8 py-12 lg:py-16 border-t border-slate-200/80 dark:border-white/10"
      >
        <div className="mx-auto max-w-7xl w-full">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <h2 className="font-editorial text-sm font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Handcrafted Architecture
            </h2>
            <p className="font-editorial text-3xl sm:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
              Why Celebrants Trust Gatherly
            </p>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              No generic hallucinations. Every decision is underpinned by mathematical logic and human warmth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Bento 1: 100% Math Invariant */}
            <div className="glass-card rounded-3xl p-6 space-y-3">
              <div className="h-10 w-10 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <PieChart className="h-5 w-5" />
              </div>
              <h3 className="font-editorial text-lg font-bold text-slate-900 dark:text-white">
                Deterministic 100% Budget Invariant
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                Every rupee is mathematically accounted for. Never throws hallucinated arithmetic summing to 125%. Locks a non-negotiable 5–10% contingency safety reserve.
              </p>
            </div>

            {/* Bento 2: Backwards Timelines */}
            <div className="glass-card rounded-3xl p-6 space-y-3">
              <div className="h-10 w-10 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                <CalendarDays className="h-5 w-5" />
              </div>
              <h3 className="font-editorial text-lg font-bold text-slate-900 dark:text-white">
                Backwards Milestone Timeline
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                Schedules deadlines backwards from the celebration date. If lead time is under 14 days, algorithms automatically compress milestones and flag rush vendor tasks.
              </p>
            </div>

            {/* Bento 3: Explainable Decisions */}
            <div className="glass-card rounded-3xl p-6 space-y-3">
              <div className="h-10 w-10 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <Lightbulb className="h-5 w-5" />
              </div>
              <h3 className="font-editorial text-lg font-bold text-slate-900 dark:text-white">
                Explainable Decision Cards
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                No black-box recommendations. Every suggestion includes rationale, financial trade-offs, estimated savings, and evaluated fallback alternatives.
              </p>
            </div>

            {/* Bento 4: Zero-PII Privacy */}
            <div className="glass-card rounded-3xl p-6 space-y-3">
              <div className="h-10 w-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Lock className="h-5 w-5" />
              </div>
              <h3 className="font-editorial text-lg font-bold text-slate-900 dark:text-white">
                Zero-PII Privacy Architecture
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                Guest names, phone numbers, and dietary requirements live strictly in your browser&apos;s LocalStorage. Never transmitted to third-party AI models.
              </p>
            </div>

            {/* Bento 5: Contextual Weather & Risks */}
            <div className="glass-card rounded-3xl p-6 space-y-3">
              <div className="h-10 w-10 rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <h3 className="font-editorial text-lg font-bold text-slate-900 dark:text-white">
                Contextual Risk Analysis
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                Detects monsoon weather exposure, budget-per-guest tier discrepancies, and tight lead times before they compromise your celebration.
              </p>
            </div>

            {/* Bento 6: Universal Calendar Export */}
            <div className="glass-card rounded-3xl p-6 space-y-3">
              <div className="h-10 w-10 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                <FileDown className="h-5 w-5" />
              </div>
              <h3 className="font-editorial text-lg font-bold text-slate-900 dark:text-white">
                RFC 5545 iCalendar Sync
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                One-click export to Google Calendar, Apple Calendar, and Microsoft Outlook. Plus complete JSON backup portability at any time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 4: CALL TO ACTION & FOOTER (Snaps to full view)  */}
      {/* ======================================================== */}
      <section
        id="section-cta"
        className="snap-page-section relative overflow-hidden flex flex-col justify-between border-t border-slate-200/80 dark:border-white/10 bg-gradient-to-b from-indigo-500/5 via-transparent to-transparent"
      >
        {/* Top/Center: Elevated Celebration CTA Card */}
        <div className="mx-auto max-w-5xl w-full text-center px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-6 my-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold text-indigo-700 dark:text-indigo-300">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Ready in under 2 minutes • 100% Free & Client-Side Secure</span>
          </div>

          <h2 className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white tracking-tight">
            Plan your next memorable moment.
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Experience the calm that comes with guaranteed 100% budget balance, 
            thoughtful vendor coordination, and backwards milestone clarity.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/onboarding"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-600 px-8 py-3.5 text-sm sm:text-base font-bold text-white shadow-xl shadow-indigo-500/25 hover:shadow-2xl hover:shadow-indigo-500/40 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 cursor-pointer"
            >
              <ChevronRight className="h-4.5 w-4.5 stroke-[2.5] transition-transform duration-300 group-hover:translate-x-1" />
              <span>Launch Planning Wizard</span>
            </Link>

            <Link
              href="/dashboard"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-white/[0.04] px-7 py-3.5 text-sm sm:text-base font-semibold text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-sm cursor-pointer"
            >
              <ChevronRight className="h-4 w-4 stroke-[2.5] text-indigo-500 transition-transform duration-300 group-hover:translate-x-1" />
              <span>Explore Judge Showcase</span>
            </Link>
          </div>
        </div>

        {/* Bottom: Gatherly Footer cleanly docked at bottom of screen with balanced spacing */}
        <Footer />
      </section>
    </div>
  );
}
