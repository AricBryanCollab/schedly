import { CalendarData } from "@/app/home/(tabs)";
import { eachDayOfInterval, format } from "date-fns";

import { MarkedDates } from "react-native-calendars/src/types";

export function getMarkedDatesFromEvents(events: CalendarData<string>[]) {
  let marked: MarkedDates = {};

  events.forEach((event) => {
    const start = new Date(event.startDate);
    const end = new Date(event.endDate);

    const daysInRange = eachDayOfInterval({ start, end });

    daysInRange.forEach((date) => {
      const key = format(date, "yyyy-MM-dd");

      marked[key] = {
        selected: true,
        selectedColor: "#dedee9",
        selectedTextColor: "#0a0a0a",
      };
    });
  });

  return marked;
}
