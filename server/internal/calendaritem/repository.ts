import { prisma } from "@/infrastructure/database/connectToDb";
import { DatabaseError } from "@/infrastructure/errors/customErrors";
import { CalendarItem } from "@/internal/calendaritem/dto";
import {
  ICalendarItemRepository,
  MutateCalendarItemRequest,
} from "@/internal/calendaritem/interface";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export class CalendarRepository implements ICalendarItemRepository {
  async createCalendarItem({
    userId,
    calendarItem,
  }: MutateCalendarItemRequest): Promise<CalendarItem> {
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
