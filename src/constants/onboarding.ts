/**
 * @file onboarding.ts
 * @description Centralized constants, inspiration templates, and presets for the Onboarding wizard.
 */

import { Crown, Cake, TreePine, Building2, Utensils, Store, Palette, Music, Camera, Scale } from "lucide-react";
import { EventType, Priority, CityTier } from "@/types";

export const DEFAULT_ONBOARDING_DATE = "2027-01-15";

export interface InspirationTemplate {
  name: string;
  tagline: string;
  data: {
    title: string;
    eventType: EventType;
    date: string;
    city: string;
    cityTier: CityTier;
    guests: number;
    budget: number;
    currency: "INR" | "USD" | "EUR" | "GBP";
    styleTheme: string;
    priorities: Priority[];
    dietaryPreferences: string[];
    specialRequirements: string;
  };
}

export const INSPIRATION_TEMPLATES: InspirationTemplate[] = [
  {
    name: "✨ Maya & Kabir's Sunset Nuptials",
    tagline: "Destination Luxury Wedding",
    data: {
      title: "Maya & Kabir's Sunset Nuptials",
      eventType: "wedding",
      date: "2027-02-14",
      city: "Udaipur",
      cityTier: 2,
      guests: 350,
      budget: 2500000,
      currency: "INR",
      styleTheme: "Royal Rajasthani Heritage",
      priorities: ["catering", "venue"],
      dietaryPreferences: ["100% Vegetarian", "Jain Friendly (No root veg)"],
      specialRequirements: "Heritage courtyard dinner with live Shehnai troupe and royal boat arrival.",
    },
  },
  {
    name: "🎂 Aarav's Retro 30th Birthday",
    tagline: "Intimate Milestone Bash",
    data: {
      title: "Aarav's Retro 30th Birthday Bash",
      eventType: "birthday",
      date: "2026-12-28",
      city: "Kolkata",
      cityTier: 2,
      guests: 80,
      budget: 150000,
      currency: "INR",
      styleTheme: "Neon Retro Glam",
      priorities: ["entertainment", "catering"],
      dietaryPreferences: ["Vegan Options", "Cocktail & Hors d'œuvres"],
      specialRequirements: "Rooftop lounge with vinyl DJ set and craft cocktail pairing.",
    },
  },
  {
    name: "🌿 Bengaluru Eco Harvest Festival",
    tagline: "Sustainable Community Fair",
    data: {
      title: "Bengaluru Eco Harvest & Crafts Fair",
      eventType: "community",
      date: "2027-03-20",
      city: "Bengaluru",
      cityTier: 1,
      guests: 600,
      budget: 450000,
      currency: "INR",
      styleTheme: "Contemporary Botanical",
      priorities: ["venue", "balanced"],
      dietaryPreferences: ["100% Vegetarian", "Zero-Waste Organic"],
      specialRequirements: "Composting stations, solar sound systems, and biodegradable stalls.",
    },
  },
];

export const THEME_PRESETS: string[] = [
  "Royal Rajasthani Heritage",
  "Contemporary Botanical",
  "Sunset Bohemian Beach",
  "Neon Retro Glam",
  "Minimalist Industrial",
  "Classic Formal White-Tie",
];

export const VENUE_PRESETS: string[] = [
  "Heritage Palace / Haveli",
  "Outdoor Lawn / Beachfront",
  "Grand Hotel Ballroom",
  "Rooftop Terrace Lounge",
  "Private Orchard / Villa",
];

export const DINING_PRESETS: string[] = [
  "Multi-Cuisine Grand Banquet",
  "Traditional Royal Plated Thali",
  "Live Street-Food & Chaat Counters",
  "Cocktail & Canapés Reception",
  "Farm-to-Table Organic Feast",
];

export const DIETARY_OPTIONS: string[] = [
  "100% Vegetarian",
  "Jain Friendly (No root veg)",
  "Vegan Options",
  "Halal Certified",
  "Gluten-Free Designated",
  "Nut-Free Safeguard",
];

export const CELEBRATION_TYPES = [
  { id: "wedding" as EventType, label: "Destination Wedding", icon: Crown, color: "text-rose-500", desc: "Multi-day nuptials & banquets" },
  { id: "birthday" as EventType, label: "Milestone Birthday", icon: Cake, color: "text-indigo-500", desc: "Intimate dinners & rooftop bashes" },
  { id: "community" as EventType, label: "Community Festival", icon: TreePine, color: "text-emerald-500", desc: "Cultural fairs & eco-harvests" },
  { id: "corporate" as EventType, label: "Corporate Summit", icon: Building2, color: "text-violet-500", desc: "Keynotes, galas & team offsites" },
];

export const PRIORITY_OPTIONS = [
  { id: "catering" as Priority, label: "Catering & Bar", icon: Utensils, desc: "Culinary & beverage excellence" },
  { id: "venue" as Priority, label: "Stunning Venue", icon: Store, desc: "Architectural setting & capacity" },
  { id: "decor" as Priority, label: "Florals & Decor", icon: Palette, desc: "Art direction & ambiance styling" },
  { id: "entertainment" as Priority, label: "Music & Live Acts", icon: Music, desc: "Performers, DJs & acoustic energy" },
  { id: "photography" as Priority, label: "Photography & Cinema", icon: Camera, desc: "Timeless heirloom captures" },
  { id: "balanced" as Priority, label: "Evenly Balanced", icon: Scale, desc: "Standard proportionate allocation" },
];

export const QUICK_BUDGET_PRESETS = [
  { label: "₹50,000", amount: 50000 },
  { label: "₹1,50,000", amount: 150000 },
  { label: "₹5,00,000", amount: 500000 },
  { label: "₹15,00,000", amount: 1500000 },
  { label: "₹25,00,000", amount: 2500000 },
];
