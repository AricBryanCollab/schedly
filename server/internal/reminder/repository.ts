import { prisma } from "@/infrastructure/database/connectToDb";

import { DatabaseError } from "@/infrastructure/errors/customErrors";
import { IReminderRepository } from "@/internal/reminder/interface";
import { CalendarItem, OffsetDuration, Reminder } from "@prisma/client";
import { PrismaClientInitializationError } from "@prisma/client/runtime/library";

export class ReminderRepository implements IReminderRepository {
  async createReminder(
    calendarId: string,
    offset: number,
    offsetType: OffsetDuration
  ): Promise<Reminder> {
    try {
      return await prisma.reminder.create({
        data: {
          calendarItemId: calendarId,
          offset,
          offsetType,
          isSent: false,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientInitializationError) {
        console.error(error.message);
        throw new DatabaseError("Database error at createReminder method");
      }
      throw error;
    }
  }
  getRemindersByUser(userId: string): Promise<Reminder[]> {
    throw new Error("Method not implemented.");
  }
  updateReminder(reminderId: string): Promise<Reminder> {
    throw new Error("Method not implemented.");
  }
  deleteReminder(reminderId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async findCalendarItem(calendarItemId: string): Promise<CalendarItem | null> {
    try {
      return await prisma.calendarItem.findFirst({
        where: { id: calendarItemId },
      });
    } catch (error) {
      if (error instanceof PrismaClientInitializationError) {
        console.error(error.message);
        throw new DatabaseError("Database error at findCalendarItem method");
      }
      throw error;
    }
  }
}
