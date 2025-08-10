import { ReminderRepository } from "@/internal/reminder/repository";

export class ReminderService {
  constructor(private readonly reminderRepository: ReminderRepository) {}

  async createReminders(calendarId: string, userId: string) {}

  async getRemindersByUser(userId: string) {}

  async updateRemidner(reminderId: string) {}

  async deleteReminder(reminderId: string) {}
}
