/**
 * @file json.ts
 * @description JSON backup serialization and client-side download utility.
 */

import { EventPlan } from "@/types";

/**
 * Triggers a client-side download of the complete event workspace in JSON format.
 *
 * @param event - The event plan to download as backup
 */
export function downloadJSON(event: EventPlan): void {
  const jsonContent = JSON.stringify(event, null, 2);
  const blob = new Blob([jsonContent], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `${event.title.toLowerCase().replace(/\s+/g, "-")}-plan.json`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
