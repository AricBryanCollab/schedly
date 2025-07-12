import { CalendarItem } from "@/internal/calendaritem/dto";

export interface ICalendarItemRepository {
  createCalendarItem({
    userId,
    calendarItem,
  }: MutateCalendarItemRequest): Promise<CalendarItem>;

  getCalendarItemsByUser(userId: string): Promise<CalendarItem[]>;

  updateCalendarItem({
    userId,
    calendarItem,
  }: MutateCalendarItemRequest): Promise<CalendarItem>;

  deleteCalendarItem(userId: string): Promise<void>;

  createNotification(userId: string, message: string): Promise<void>;
}

export interface MutateCalendarItemRequest {
  userId: string;
  calendarItem: Omit<CalendarItem, "id" | "createdAt" | "updatedAt">;
}
