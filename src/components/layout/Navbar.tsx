"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, Plus, Moon, Sun, Menu, X } from "lucide-react";

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
    { href: "/", label: "Home" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/onboarding", label: "Plan Wizard" },
    { href: "/settings", label: "Settings" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/70 dark:border-white/10 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl transition-colors duration-300">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-18">
        {/* Brand */}
        <Link
          href="/"
          className="group flex items-center gap-3 focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-xl p-1 transition-transform duration-200 hover:scale-[1.01]"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-rose-500 text-white shadow-md shadow-indigo-500/20 group-hover:shadow-indigo-500/35 transition-all duration-300">
            <Sparkles className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" aria-hidden="true" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <span className="font-editorial text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                Gatherly
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-rose-500 inline-block animate-pulse" />
            </div>
            <span className="text-[11px] font-medium tracking-wide text-slate-500 dark:text-slate-400">
              Every celebration, beautifully planned.
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1.5 bg-slate-100/70 dark:bg-white/[0.04] p-1.5 rounded-2xl border border-slate-200/60 dark:border-white/5" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-white shadow-sm ring-1 ring-slate-200/50 dark:ring-white/10"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/5"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200/80 dark:border-white/10 bg-white/60 dark:bg-white/[0.04] text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? (
              <Sun className="h-4 w-4 text-amber-400 transition-transform duration-300 rotate-0 hover:rotate-90" />
            ) : (
              <Moon className="h-4 w-4 text-slate-700 transition-transform duration-300 hover:-rotate-12" />
            )}
          </button>

          {/* New Event CTA */}
          <Link
            href="/events/new"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-600 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/35 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            <span>Plan Celebration</span>
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200/80 dark:border-white/10 bg-white/60 dark:bg-white/[0.04] text-slate-700 dark:text-slate-200"
            aria-label="Toggle dark mode"
          >
            {isDark ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200/80 dark:border-white/10 bg-white/60 dark:bg-white/[0.04] text-slate-700 dark:text-slate-200"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="md:hidden border-b border-slate-200/80 dark:border-white/10 bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl px-5 py-5 space-y-4 animate-in slide-in-from-top-2 duration-200"
        >
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                  pathname === link.href
                    ? "bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400"
                    : "text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/events/new"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-600 px-4 py-3 text-sm font-bold text-white shadow-md"
            >
              <Plus className="h-4 w-4" aria-hidden="true" />
              <span>Plan Celebration</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
