import {
  NotFoundError,
  ValidationError,
} from "@/infrastructure/errors/customErrors";
import { ReminderRepository } from "@/internal/reminder/repository";
import { Reminder } from "./dto";

export class ReminderService {
  constructor(private readonly reminderRepository: ReminderRepository) {}

  async createReminders(
    userId: string,
    calendarId: string,
    reminder: Reminder
  ) {
    if (!userId) throw new NotFoundError("User ID");

    const { offset, offsetType } = reminder;

    if (!offset || !offsetType) {
      throw new ValidationError("Offset and Offset Type are required");
    }

    const calendarItem =
      await this.reminderRepository.findCalendarItem(calendarId);

    if (!calendarItem) {
      throw new Error("Calendar item not found or not authorized");
    }

    const newReminder = await this.reminderRepository.createReminder(
      calendarId,
      offset,
      offsetType
    );

    return newReminder;
  }

  async getRemindersByUser(userId: string) {}

  async updateRemidner(reminderId: string) {}

  async deleteReminder(reminderId: string) {}
}
