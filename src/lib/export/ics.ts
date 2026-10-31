import { EventPlan } from "@/types";

/**
 * Generates an RFC 5545 compliant iCalendar string for the event and its tasks
 */
export function generateICS(event: EventPlan): string {
  const formatDate = (dateStr: string) => {
    return dateStr.replace(/-/g, "") + "T090000Z";
  };

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Gatherly AI//Event Planner//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:event-${event.id}@gatherly.ai`,
    `DTSTAMP:${formatDate(event.createdAt ? event.createdAt.slice(0, 10) : event.date)}`,
    `DTSTART:${formatDate(event.date)}`,
    `DTEND:${formatDate(event.date)}`,
    `SUMMARY:${event.title}`,
    `DESCRIPTION:Planned with Gatherly AI (${event.eventType} for ${event.guests} guests in ${event.city})`,
    `LOCATION:${event.city}`,
    "STATUS:CONFIRMED",
    "END:VEVENT",
  ];

  // Add individual timeline tasks
  event.tasks.forEach((task) => {
    lines.push(
      "BEGIN:VEVENT",
      `UID:task-${task.id}@gatherly.ai`,
      `DTSTAMP:${formatDate(task.dueDate)}`,
      `DTSTART:${formatDate(task.dueDate)}`,
      `DTEND:${formatDate(task.dueDate)}`,
      `SUMMARY:[Gatherly Task] ${task.title}`,
      `DESCRIPTION:Category: ${task.category} | Priority: ${task.priority}`,
      `STATUS:${task.completed ? "COMPLETED" : "NEEDS-ACTION"}`,
      "END:VEVENT"
    );
  });

  lines.push("END:VCALENDAR");

  return lines.join("\r\n");
}

export function downloadICS(event: EventPlan): void {
  const icsContent = generateICS(event);
  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `${event.title.toLowerCase().replace(/\s+/g, "-")}-schedule.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
