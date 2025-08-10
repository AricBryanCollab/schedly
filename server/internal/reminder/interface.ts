import { Reminder } from "@/internal/reminder/dto";

export interface IReminderRepository {
  createReminder(calendarId: string, userId: string): Promise<Reminder>;
  getRemindersByUSer(userId: string): Promise<Reminder[]>;
  updateReminder(reminderId: string): Promise<Reminder>;
  deleteReminder(reminderId: string): Promise<void>;
}
