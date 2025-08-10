import { IReminderRepository } from "@/internal/reminder/interface";
import { Reminder } from "./dto";

export class ReminderRepository implements IReminderRepository {
  createReminder(calendarId: string, userId: string): Promise<Reminder> {
    throw new Error("Method not implemented.");
  }
  getRemindersByUSer(userId: string): Promise<Reminder[]> {
    throw new Error("Method not implemented.");
  }
  updateReminder(reminderId: string): Promise<Reminder> {
    throw new Error("Method not implemented.");
  }
  deleteReminder(reminderId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
