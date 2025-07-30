import { CalendarData } from "@/app/home/(tabs)";

export function getUpcomingEvents(events: CalendarData<string>[]) {
  return events
    .slice()
    .sort(
      (a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    )
    .slice(0, 3);
}
