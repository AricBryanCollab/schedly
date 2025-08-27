import { Reminder } from "@/internal/reminder/dto";
import { CalendarItem, OffsetDuration } from "@prisma/client";

export interface IReminderRepository {
  createReminder(
    calendarId: string,
    offset: number,
    offsetType: OffsetDuration
  ): Promise<Reminder>;
  getRemindersByUser(userId: string): Promise<Reminder[]>;
  updateReminder(reminderId: string): Promise<Reminder>;
  deleteReminder(reminderId: string): Promise<void>;
  findCalendarItem(calendarItemId: string): Promise<CalendarItem | null>;
}
