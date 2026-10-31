/**
 * @file VendorsTab.tsx
 * @description Vendor Directory & Evaluation Matrix distinguishing between
 * AI suggestions and user-entered vendor contacts.
 */

import React from "react";
import { Trash2 } from "lucide-react";
import { EventPlan, Vendor } from "@/types";

interface VendorsTabProps {
  event: EventPlan;
  onUpdateVendor: (vendorId: string, partial: Partial<Vendor>) => void;
  onDeleteVendor: (vendorId: string) => void;
}

export function VendorsTab({
  event,
  onUpdateVendor,
  onDeleteVendor,
}: VendorsTabProps): React.ReactElement {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-xl font-bold text-slate-900 dark:text-white">
            Vendor Directory & Evaluation Matrix
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Explicit separation between user-entered vendors and AI benchmark estimates.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {event.vendors.map((vendor) => (
          <div
            key={vendor.id}
            className={`rounded-2xl glass-card p-6 flex flex-col justify-between space-y-4 ${
              vendor.isAISuggestion ? "border-indigo-500/30" : ""
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                    vendor.isAISuggestion
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300"
                  }`}
                >
                  {vendor.isAISuggestion ? "AI Suggested Benchmark" : "User Sourced Vendor"}
                </span>
                <span
                  className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                    vendor.status === "booked"
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                      : vendor.status === "quoted"
                      ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                      : "bg-slate-100 dark:bg-white/10 text-slate-600"
                  }`}
                >
                  {vendor.status.replace("_", " ").toUpperCase()}
                </span>
              </div>

              <h3 className="font-heading text-base font-bold text-slate-900 dark:text-white">
                {vendor.name}
              </h3>

              {vendor.contactPerson && (
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Contact:{" "}
                  <strong className="text-slate-700 dark:text-slate-300">
                    {vendor.contactPerson}
                  </strong>{" "}
                  ({vendor.phone || "No phone"})
                </p>
              )}

              <p className="text-sm font-mono font-bold text-indigo-600 dark:text-indigo-400">
                Est. Cost: ₹{vendor.estimatedCost.toLocaleString()} {event.currency}
                {vendor.advancePaid ? ` (Advance: ₹${vendor.advancePaid.toLocaleString()})` : ""}
              </p>

              {vendor.notes && (
                <p className="text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-white/[0.03] p-3 rounded-xl border border-slate-200/60 dark:border-white/5">
                  {vendor.notes}
                </p>
              )}
            </div>

            <div className="border-t border-slate-200/80 dark:border-white/10 pt-3 flex items-center justify-between text-xs">
              <span className="text-slate-500 dark:text-slate-400 capitalize font-medium">
                Category: {vendor.category}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    onUpdateVendor(vendor.id, {
                      status: vendor.status === "booked" ? "quoted" : "booked",
                    })
                  }
                  className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                >
                  {vendor.status === "booked" ? "Mark Quoted" : "Mark Booked"}
                </button>
                {!vendor.isAISuggestion && (
                  <button
                    onClick={() => onDeleteVendor(vendor.id)}
                    className="p-1.5 text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
                    aria-label={`Delete vendor ${vendor.name}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
