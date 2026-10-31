/**
 * @file EventIdeasTab.tsx
 * @description Curated celebration inspiration cards for themes, catering menus,
 * guest activities, and ambient soundtracks.
 */

import React from "react";
import { Palette, Utensils, PartyPopper, Music } from "lucide-react";
import { EventPlan } from "@/types";

interface EventIdeasTabProps {
  event: EventPlan;
}

export function EventIdeasTab({ event }: EventIdeasTabProps): React.ReactElement {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading text-xl font-bold text-slate-900 dark:text-white">
          Curated Celebration Inspiration
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Tailored concepts for themes, catering highlights, guest activities, and musical playlists.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl glass-card p-6 space-y-3.5">
          <h3 className="font-heading text-base font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
            <Palette className="h-4.5 w-4.5" />
            <span>Thematic Concepts</span>
          </h3>
          <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
            {event.ideas.themes.map((theme, i) => (
              <li
                key={i}
                className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 dark:bg-white/[0.02]"
              >
                <span className="h-2 w-2 rounded-full bg-indigo-600 shrink-0" />
                <span>{theme}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl glass-card p-6 space-y-3.5">
          <h3 className="font-heading text-base font-bold text-rose-500 flex items-center gap-2">
            <Utensils className="h-4.5 w-4.5" />
            <span>Catering & Food Highlights</span>
          </h3>
          <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
            {event.ideas.menus.map((menu, i) => (
              <li
                key={i}
                className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 dark:bg-white/[0.02]"
              >
                <span className="h-2 w-2 rounded-full bg-rose-500 shrink-0" />
                <span>{menu}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl glass-card p-6 space-y-3.5">
          <h3 className="font-heading text-base font-bold text-violet-500 flex items-center gap-2">
            <PartyPopper className="h-4.5 w-4.5" />
            <span>Guest Experiences & Icebreakers</span>
          </h3>
          <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
            {event.ideas.activities.map((act, i) => (
              <li
                key={i}
                className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 dark:bg-white/[0.02]"
              >
                <span className="h-2 w-2 rounded-full bg-violet-500 shrink-0" />
                <span>{act}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl glass-card p-6 space-y-3.5">
          <h3 className="font-heading text-base font-bold text-emerald-500 flex items-center gap-2">
            <Music className="h-4.5 w-4.5" />
            <span>Soundtrack & Playlist Vibes</span>
          </h3>
          <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
            {event.ideas.playlists.map((pl, i) => (
              <li
                key={i}
                className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 dark:bg-white/[0.02]"
              >
                <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
                <span>{pl}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
