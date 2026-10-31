import React from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  PieChart,
  CheckCircle2,
  Clock,
  ChevronDown,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 sm:py-24 lg:py-28 bg-[var(--background)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3.5 py-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Deterministic AI Architecture • Zero Hallucinations</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[var(--foreground)] leading-[1.15]">
                Plan Less. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
                  Celebrate More.
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-[var(--muted-foreground)] max-w-2xl mx-auto lg:mx-0">
                Gatherly AI organizes your weddings, birthdays, and community festivals with
                mathematically guaranteed 100% budget allocation, backwards milestone timelines, and
                contextual risk contingencies.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/onboarding"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-6 py-3.5 text-base font-semibold text-white shadow-sm hover:bg-indigo-700 transition-colors"
                >
                  <span>Start Planning</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>

                <Link
                  href="/dashboard"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--card)] px-6 py-3.5 text-base font-semibold text-[var(--foreground)] hover:bg-[var(--secondary)] transition-colors"
                >
                  <span>Explore Demo</span>
                </Link>
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-6 pt-4 text-xs text-[var(--muted-foreground)]">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-emerald-500" aria-hidden="true" />
                  No credit card or login needed
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-indigo-500" aria-hidden="true" />
                  100% Client-side Guest Privacy
                </span>
              </div>
            </div>

            {/* Right Interactive Mockup (CSS & SVG Visuals) */}
            <div className="lg:col-span-5" aria-hidden="true">
              <div className="relative rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-xl">
                {/* Mockup Header */}
                <div className="flex items-center justify-between border-b border-[var(--border)] pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-rose-500" />
                    <span className="h-3 w-3 rounded-full bg-amber-500" />
                    <span className="h-3 w-3 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-xs font-mono text-[var(--muted-foreground)]">
                    workspace.gatherly.ai
                  </span>
                </div>

                {/* Mockup Content */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-[var(--foreground)]">
                        Priya&apos;s 30th Birthday Bash
                      </h3>
                      <p className="text-xs text-[var(--muted-foreground)]">Kolkata • 80 Guests</p>
                    </div>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded">
                      Budget 100% Balanced
                    </span>
                  </div>

                  {/* Budget Progress Bar */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-medium">
                      <span>Total Allocation</span>
                      <span className="font-semibold">₹60,000 INR</span>
                    </div>
                    <div className="h-3 w-full rounded-full bg-slate-200 dark:bg-slate-800 flex overflow-hidden">
                      <div className="bg-indigo-600 h-full w-[35%]" title="Catering 35%" />
                      <div className="bg-violet-500 h-full w-[20%]" title="Venue 20%" />
                      <div className="bg-pink-500 h-full w-[15%]" title="Decor 15%" />
                      <div className="bg-amber-500 h-full w-[12%]" title="Entertainment 12%" />
                      <div className="bg-emerald-500 h-full w-[8%]" title="Contingency 8%" />
                      <div className="bg-slate-400 h-full w-[10%]" title="Other 10%" />
                    </div>
                    <div className="flex justify-between text-[10px] text-[var(--muted-foreground)]">
                      <span>Catering (35%)</span>
                      <span>Contingency Reserve (8%)</span>
                    </div>
                  </div>

                  {/* Mini Cards */}
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <div className="rounded-lg border border-[var(--border)] p-2.5 bg-[var(--secondary)]/40">
                      <span className="text-[10px] uppercase text-[var(--muted-foreground)]">
                        Timeline Status
                      </span>
                      <p className="text-xs font-semibold text-[var(--foreground)] flex items-center gap-1 mt-0.5">
                        <Clock className="h-3.5 w-3.5 text-indigo-500" />
                        T-48 Days (On Track)
                      </p>
                    </div>
                    <div className="rounded-lg border border-[var(--border)] p-2.5 bg-[var(--secondary)]/40">
                      <span className="text-[10px] uppercase text-[var(--muted-foreground)]">
                        Safety Reserve
                      </span>
                      <p className="text-xs font-semibold text-emerald-600 flex items-center gap-1 mt-0.5">
                        <ShieldCheck className="h-3.5 w-3.5" />
                        ₹4,800 Buffer
                      </p>
                    </div>
                  </div>

                  {/* AI Explainable Card Mock */}
                  <div className="rounded-lg border border-indigo-500/20 bg-indigo-500/5 p-3 text-xs space-y-1">
                    <div className="flex items-center gap-1.5 font-semibold text-indigo-600 dark:text-indigo-400">
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>Explainable AI Recommendation</span>
                    </div>
                    <p className="text-[11px] text-[var(--muted-foreground)]">
                      Live street food counters chosen over seated dinner to reduce labor cost by 22%
                      while boosting guest energy.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works (3 Steps) */}
      <section className="py-16 sm:py-20 bg-[var(--card)] border-y border-[var(--border)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-[var(--foreground)]">
              How Gatherly AI Works
            </h2>
            <p className="text-sm sm:text-base text-[var(--muted-foreground)] mt-2">
              Three seamless steps from initial dream to flawless day-of celebration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-xl border border-[var(--border)] p-6 bg-[var(--background)] space-y-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold text-lg">
                1
              </span>
              <h3 className="text-lg font-bold text-[var(--foreground)]">Define Your Parameters</h3>
              <p className="text-sm text-[var(--muted-foreground)]">
                Input your event type, guest headcount, location tier, budget, and top priority
                categories in our keyboard-friendly wizard.
              </p>
            </div>

            <div className="rounded-xl border border-[var(--border)] p-6 bg-[var(--background)] space-y-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold text-lg">
                2
              </span>
              <h3 className="text-lg font-bold text-[var(--foreground)]">
                Hybrid Intelligence Engine
              </h3>
              <p className="text-sm text-[var(--muted-foreground)]">
                Deterministic algorithms guarantee 100% budget sums with built-in contingency, while
                Gemini 2.5 Flash layers contextual reasoning.
              </p>
            </div>

            <div className="rounded-xl border border-[var(--border)] p-6 bg-[var(--background)] space-y-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold text-lg">
                3
              </span>
              <h3 className="text-lg font-bold text-[var(--foreground)]">Manage & Adapt</h3>
              <p className="text-sm text-[var(--muted-foreground)]">
                Dynamic workspace adapts in real-time to budget cuts, guest count surges, or date
                shifts with transparent before/after diffs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Features */}
      <section className="py-16 sm:py-24 bg-[var(--background)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl font-bold tracking-tight text-[var(--foreground)]">
              Engineered for Real-World Celebrations
            </h2>
            <p className="text-sm sm:text-base text-[var(--muted-foreground)] mt-2">
              Every feature solves actual event organizer stress points.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Bento 1: Exact 100% Budgeting */}
            <div className="md:col-span-2 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8 space-y-3">
              <div className="h-10 w-10 rounded-lg bg-indigo-500/10 text-indigo-600 flex items-center justify-center">
                <PieChart className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold text-[var(--foreground)]">
                Deterministic 100% Budgeting Invariant
              </h3>
              <p className="text-sm text-[var(--muted-foreground)]">
                Unlike vague LLM estimates, our mathematical allocator guarantees every single rupee
                or dollar is accounted for. A mandatory 5% to 10% safety contingency buffer protects
                you from day-of financial shocks.
              </p>
            </div>

            {/* Bento 2: Explainable AI */}
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8 space-y-3">
              <div className="h-10 w-10 rounded-lg bg-violet-500/10 text-violet-600 flex items-center justify-center">
                <Sparkles className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold text-[var(--foreground)]">
                Explainable AI Architecture
              </h3>
              <p className="text-sm text-[var(--muted-foreground)]">
                Every suggestion comes with recommendation, reasoning, expected impact, and
                evaluated alternatives rather than an unexplained black box.
              </p>
            </div>

            {/* Bento 3: Backwards Milestones */}
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8 space-y-3">
              <div className="h-10 w-10 rounded-lg bg-pink-500/10 text-pink-600 flex items-center justify-center">
                <Clock className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold text-[var(--foreground)]">
                Backwards Milestone Schedule
              </h3>
              <p className="text-sm text-[var(--muted-foreground)]">
                Reverse-engineered schedules (T-90, T-60, T-30, day-of) automatically compress and
                flag urgent tasks if planning on short notice.
              </p>
            </div>

            {/* Bento 4: Zero-PII Privacy */}
            <div className="md:col-span-2 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8 space-y-3">
              <div className="h-10 w-10 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold text-[var(--foreground)]">
                Zero Guest PII Transmitted to AI
              </h3>
              <p className="text-sm text-[var(--muted-foreground)]">
                Your guest names, contact numbers, and dietary requirements are strictly confined to
                your browser&apos;s local storage. Zero personal attendee data is ever transmitted to
                any external LLM provider.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Illustrative Testimonials */}
      <section className="py-16 bg-[var(--card)] border-y border-[var(--border)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
              User Personas
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-[var(--foreground)] mt-1">
              Celebrated by Diverse Organizers
            </h2>
            <p className="text-xs text-[var(--muted-foreground)] mt-1">
              (Illustrative user personas reflecting actual testing workflows)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-xl border border-[var(--border)] p-6 bg-[var(--background)] space-y-3">
              <p className="text-sm text-[var(--muted-foreground)] italic">
                &ldquo;When we had to trim our wedding budget from 25L to 20L, Gatherly AI didn&apos;t
                just slash everything blindly. It showed a clear before/after diff that protected our
                catering while finding savings in floral rentals.&rdquo;
              </p>
              <div className="pt-2">
                <p className="text-xs font-bold text-[var(--foreground)]">Aarav & Meera</p>
                <p className="text-[11px] text-[var(--muted-foreground)]">
                  Newlyweds • Udaipur Heritage Wedding
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-[var(--border)] p-6 bg-[var(--background)] space-y-3">
              <p className="text-sm text-[var(--muted-foreground)] italic">
                &ldquo;30 extra friends RSVPed to Priya&apos;s 30th birthday at the last minute. The
                guest surge assistant immediately flagged the per-plate compression and gave me the
                exact numbers to call the caterer with.&rdquo;
              </p>
              <div className="pt-2">
                <p className="text-xs font-bold text-[var(--foreground)]">Rohan Sen</p>
                <p className="text-[11px] text-[var(--muted-foreground)]">
                  Host • Kolkata Birthday Party
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-[var(--border)] p-6 bg-[var(--background)] space-y-3">
              <p className="text-sm text-[var(--muted-foreground)] italic">
                &ldquo;Planning a 500-attendee eco-fair requires ironclad contingency. Having an
                automated backwards timeline export directly to .ics on my phone was an absolute
                lifesaver.&rdquo;
              </p>
              <div className="pt-2">
                <p className="text-xs font-bold text-[var(--foreground)]">Kavitha Nair</p>
                <p className="text-[11px] text-[var(--muted-foreground)]">
                  Coordinator • Bengaluru Cultural Festival
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20 bg-[var(--background)]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-[var(--foreground)]">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-[var(--muted-foreground)] mt-2">
              Everything you need to know about our privacy and planning logic.
            </p>
          </div>

          <div className="space-y-4">
            <details className="group rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 sm:p-5">
              <summary className="flex cursor-pointer items-center justify-between font-semibold text-[var(--foreground)] text-sm sm:text-base list-none">
                <span>Does Gatherly AI work without an API key or internet connection?</span>
                <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
              </summary>
              <p className="text-sm text-[var(--muted-foreground)] mt-3 leading-relaxed">
                Yes! Gatherly AI is built with an offline-first deterministic rules engine. If no
                Gemini API key is configured or the network fails, it automatically operates in Demo
                Mode with full budgeting math, risk generation, and backwards schedules.
              </p>
            </details>

            <details className="group rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 sm:p-5">
              <summary className="flex cursor-pointer items-center justify-between font-semibold text-[var(--foreground)] text-sm sm:text-base list-none">
                <span>Are vendor recommendations actual sponsored listings?</span>
                <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
              </summary>
              <p className="text-sm text-[var(--muted-foreground)] mt-3 leading-relaxed">
                No. In strict accordance with our honesty rules, Gatherly AI does not invent fake
                verified vendor listings. The app clearly distinguishes user-entered vendors from
                AI-suggested vendor TYPES (e.g., &ldquo;Boutique Heritage Courtyard Type&rdquo;) with
                negotiation checklists.
              </p>
            </details>

            <details className="group rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 sm:p-5">
              <summary className="flex cursor-pointer items-center justify-between font-semibold text-[var(--foreground)] text-sm sm:text-base list-none">
                <span>Where is my event and guest data stored?</span>
                <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
              </summary>
              <p className="text-sm text-[var(--muted-foreground)] mt-3 leading-relaxed">
                All event plans, guest lists, and budgets are saved purely inside your browser&apos;s
                localStorage. We operate no cloud tracking databases. You can export everything as
                JSON or use the &ldquo;Delete all data&rdquo; button in Settings for instant total
                erasure.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-indigo-600 text-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Every celebration deserves to be beautifully planned.
          </h2>
          <p className="text-indigo-100 text-base max-w-xl mx-auto">
            Test the live planner immediately with pre-loaded scenarios or craft your own custom
            celebration in under two minutes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/onboarding"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3.5 text-base font-semibold text-indigo-700 shadow-sm hover:bg-indigo-50 transition-colors"
            >
              <span>Start Planning Now</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/dashboard"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg border border-white/40 bg-indigo-700 px-6 py-3.5 text-base font-semibold text-white hover:bg-indigo-800 transition-colors"
            >
              <span>Explore Seeded Demos</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
