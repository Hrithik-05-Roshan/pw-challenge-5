"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sparkles,
  ChevronRight,
  Moon,
  Sun,
  Menu,
  X,
  Home,
  LayoutDashboard,
  Wand2,
  Settings,
  Crown,
  Cake,
  TreePine,
  ShieldCheck,
} from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    if (root.classList.contains("dark")) {
      root.classList.remove("dark");
      root.removeAttribute("data-theme");
      try {
        localStorage.setItem("gatherly-theme", "light");
      } catch {
        // storage disabled or unavailable
      }
      setIsDark(false);
    } else {
      root.classList.add("dark");
      root.setAttribute("data-theme", "dark");
      try {
        localStorage.setItem("gatherly-theme", "dark");
      } catch {
        // storage disabled or unavailable
      }
      setIsDark(true);
    }
  };

  const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/dashboard", label: "Workspaces", icon: LayoutDashboard },
    { href: "/onboarding", label: "Plan Wizard", icon: Wand2 },
    { href: "/settings", label: "Data & Privacy", icon: Settings },
  ];

  const scenarioLinks = [
    { href: "/dashboard?filter=wedding", label: "Weddings", icon: Crown, color: "text-rose-500" },
    { href: "/dashboard?filter=birthday", label: "Birthdays", icon: Cake, color: "text-indigo-500" },
    { href: "/dashboard?filter=community", label: "Community", icon: TreePine, color: "text-emerald-500" },
  ];

  return (
    <>
      {/* ======================================================== */}
      {/* DESKTOP LEFT SIDEBAR (Fixed to left of entire screen)   */}
      {/* ======================================================== */}
      <aside
        className="hidden md:flex flex-col fixed left-0 top-0 bottom-0 w-64 lg:w-72 bg-white/90 dark:bg-slate-950/90 backdrop-blur-2xl border-r border-slate-200/80 dark:border-white/10 z-40 p-6 overflow-y-auto justify-between transition-colors duration-300"
        aria-label="Sidebar Navigation"
      >
        {/* Top Segment: Brand & Primary Action */}
        <div className="space-y-6">
          {/* Brand Mark */}
          <Link
            href="/"
            className="group flex items-center gap-3 focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-xl p-1 transition-transform duration-200 hover:scale-[1.01]"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-rose-500 text-white shadow-md shadow-indigo-500/25 group-hover:shadow-indigo-500/40 transition-all duration-300">
              <Sparkles className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" aria-hidden="true" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-editorial text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                  Gatherly
                </span>
                <span className="h-2 w-2 rounded-full bg-rose-500 inline-block animate-pulse" />
              </div>
              <span className="text-[11px] font-medium tracking-wide text-slate-500 dark:text-slate-400">
                Celebration Concierge
              </span>
            </div>
          </Link>

          {/* Quick CTA with '>' icon and hover effect */}
          <Link
            href="/onboarding"
            className="group w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-600 px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/20 hover:shadow-xl hover:shadow-indigo-500/40 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 cursor-pointer"
          >
            <ChevronRight className="h-4.5 w-4.5 stroke-[2.5] transition-transform duration-300 group-hover:translate-x-1 shrink-0" aria-hidden="true" />
            <span>Plan Celebration</span>
          </Link>

          {/* Primary Nav Menu */}
          <nav className="space-y-6 pt-2" aria-label="Main Menu">
            <div>
              <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                Workspace
              </p>
              <div className="space-y-1">
                {navLinks.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                        isActive
                          ? "bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 font-bold ring-1 ring-indigo-500/20 shadow-xs"
                          : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-white/5"
                      }`}
                      aria-current={isActive ? "page" : undefined}
                    >
                      <Icon className={`h-4.5 w-4.5 ${isActive ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400"}`} />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Event Archetypes */}
            <div>
              <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                Celebration Types
              </p>
              <div className="space-y-1">
                {scenarioLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-white/5 transition-all"
                    >
                      <Icon className={`h-4 w-4 ${item.color}`} />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </nav>
        </div>

        {/* Bottom Segment: Theme & Privacy */}
        <div className="pt-6 border-t border-slate-200/80 dark:border-white/10 space-y-4">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-slate-200/80 dark:border-white/10 bg-slate-50 dark:bg-white/[0.03] text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 transition-all text-xs font-semibold cursor-pointer"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            <span className="flex items-center gap-2">
              {isDark ? (
                <Sun className="h-4 w-4 text-amber-400 transition-transform duration-300" />
              ) : (
                <Moon className="h-4 w-4 text-slate-700 transition-transform duration-300" />
              )}
              <span>{isDark ? "Dark Appearance" : "Light Appearance"}</span>
            </span>
            <span className="text-[10px] font-mono text-slate-400">{isDark ? "Dark" : "Light"}</span>
          </button>

          {/* Zero-PII Badge */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">
            <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
            <span>Zero-PII Client-Side Privacy</span>
          </div>
        </div>
      </aside>

      {/* ======================================================== */}
      {/* MOBILE TOP BAR (Visible only on < md screens)            */}
      {/* ======================================================== */}
      <header className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border-b border-slate-200/80 dark:border-white/10 z-40 flex items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-rose-500 text-white shadow-xs">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="font-editorial text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            Gatherly
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200/80 dark:border-white/10 bg-slate-50 dark:bg-white/[0.04] text-slate-700 dark:text-slate-200"
            aria-label="Toggle dark mode"
          >
            {isDark ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200/80 dark:border-white/10 bg-slate-50 dark:bg-white/[0.04] text-slate-700 dark:text-slate-200"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation drawer"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-start animate-in fade-in duration-200"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="w-72 bg-white dark:bg-slate-950 h-full p-6 shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-left duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200/80 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <span className="font-editorial text-xl font-bold text-slate-900 dark:text-white">
                    Gatherly
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  aria-label="Close navigation"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <Link
                href="/onboarding"
                onClick={() => setMobileMenuOpen(false)}
                className="group w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-600 px-4 py-3 text-sm font-bold text-white shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                <ChevronRight className="h-4 w-4 stroke-[2.5] transition-transform duration-300 group-hover:translate-x-1" />
                <span>Plan Celebration</span>
              </Link>

              <div className="space-y-1">
                {navLinks.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-semibold ${
                        isActive
                          ? "bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 font-bold"
                          : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5"
                      }`}
                    >
                      <Icon className="h-4.5 w-4.5 text-slate-400" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-200/80 dark:border-white/10">
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-500/10 text-xs text-emerald-700 dark:text-emerald-400 font-medium">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                <span>Zero-PII Client-Side Privacy</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
