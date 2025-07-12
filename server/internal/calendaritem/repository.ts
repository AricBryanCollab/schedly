import { CalendarItem } from "@/internal/calendaritem/dto";
import {
  ICalendarItemRepository,
  MutateCalendarItemRequest,
} from "@/internal/calendaritem/interface";

export class CalendarRepository implements ICalendarItemRepository {
  createCalendarItem({
    userId,
    calendarItem,
  }: MutateCalendarItemRequest): Promise<CalendarItem> {
    throw new Error("Method not implemented.");
  }
  getCalendarItemsByUser(userId: string): Promise<CalendarItem[]> {
    throw new Error("Method not implemented.");
  }
  updateCalendarItem({
    userId,
    calendarItem,
  }: MutateCalendarItemRequest): Promise<CalendarItem> {
    throw new Error("Method not implemented.");
  }
  deleteCalendarItem(userId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
