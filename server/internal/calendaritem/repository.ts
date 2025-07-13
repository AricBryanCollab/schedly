import { prisma } from "@/infrastructure/database/connectToDb";
import { DatabaseError } from "@/infrastructure/errors/customErrors";
import { CalendarItem } from "@/internal/calendaritem/dto";
import {
  CreateCalendarItemRequest,
  ICalendarItemRepository,
  UpdateCalendarItemRequest,
} from "@/internal/calendaritem/interface";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export class CalendarRepository implements ICalendarItemRepository {
  async createCalendarItem({
    userId,
    calendarItem,
  }: CreateCalendarItemRequest): Promise<CalendarItem> {
    try {
      const calendar = await prisma.calendarItem.create({
        data: {
          userId,
          ...calendarItem,
        },
      });
      return calendar;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        console.error(error.message);
        throw new DatabaseError("Database error at createCalendarItem method");
      }
      throw error;
    }
  }

  async getCalendarItemsByUser(userId: string): Promise<CalendarItem[]> {
    try {
      const calendarItems = await prisma.calendarItem.findMany({
        where: { userId },
      });

      return calendarItems;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        console.error(error.message);
        throw new DatabaseError(
          "Database error at getCalendarItemsByUser method"
        );
      }
      throw error;
    }
  }

  async updateCalendarItem({
    calendarId,
    calendarItem,
  }: UpdateCalendarItemRequest): Promise<CalendarItem> {
    try {
      const updated = await prisma.calendarItem.update({
        where: { id: calendarId },
        data: {
          ...calendarItem,
        },
      });
      return updated;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        console.error(error.message);
        throw new DatabaseError("Database error at updateCalendarItem method");
      }
      throw error;
    }
  }
  deleteCalendarItem(calendarId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async createNotification(userId: string, message: string): Promise<void> {
    try {
      await prisma.notification.create({
        data: {
          userId,
          message,
          createdAt: new Date(),
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        console.error(error.message);
        throw new DatabaseError("Database error at createNotification method");
      }
      throw error;
    }
  }
}
