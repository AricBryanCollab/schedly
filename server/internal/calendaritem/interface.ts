import { CalendarItem } from "@/internal/calendaritem/dto";

export interface ICalendarItemRepository {
  createCalendarItem({
    userId,
    calendarItem,
  }: CreateCalendarItemRequest): Promise<CalendarItem>;

  getCalendarItemsByUser(userId: string): Promise<CalendarItem[]>;

  updateCalendarItem({
    calendarId,
    calendarItem,
  }: UpdateCalendarItemRequest): Promise<CalendarItem>;

  deleteCalendarItem(calendarId: string): Promise<void>;

  createNotification(userId: string, message: string): Promise<void>;
}

export interface CreateCalendarItemRequest {
  userId: string;
  calendarItem: Omit<CalendarItem, "id" | "createdAt" | "updatedAt">;
}

export interface UpdateCalendarItemRequest {
  userId?: string;
  calendarId: string;
  calendarItem: Omit<CalendarItem, "id" | "createdAt" | "updatedAt">;
}
