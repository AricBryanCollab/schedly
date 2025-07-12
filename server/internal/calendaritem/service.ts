import {
  NotFoundError,
  ValidationError,
} from "@/infrastructure/errors/customErrors";
import { MutateCalendarItemRequest } from "@/internal/calendaritem/interface";
import { CalendarRepository } from "@/internal/calendaritem/repository";
export class CalendarService {
  constructor(private readonly calendarRepository: CalendarRepository) {}

  async createCalendarItem({
    userId,
    calendarItem,
  }: MutateCalendarItemRequest) {
    const {
      title,
      description,
      startTime,
      endTime,
      isAllDay,
      isRecurrent,
      recurrenceRule,
      isHighlighted,
      status,
    } = calendarItem;

    if (!userId) throw new NotFoundError("User not found");

    if (!title || typeof title !== "string")
      throw new ValidationError("Title is required");

    if (!startTime) throw new ValidationError("Invalid start time");

    if (!endTime) throw new ValidationError("Invalid end time");

    if (typeof isAllDay !== "boolean")
      throw new ValidationError("isAllDay must be boolean");

    if (typeof isRecurrent !== "boolean")
      throw new ValidationError("isRecurrent must be boolean");

    if (typeof isHighlighted !== "boolean")
      throw new ValidationError("isHighlighted must be boolean");

    const allowedStatus = ["PENDING", "INCOMING", "INPROGRESS", "COMPLETED"];
    if (!allowedStatus.includes(status))
      throw new ValidationError("Invalid status value");

    const createdItem = await this.calendarRepository.createCalendarItem({
      userId,
      calendarItem: {
        title,
        description,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        isAllDay,
        isRecurrent,
        recurrenceRule,
        isHighlighted,
        status,
      },
    });

    const notifMessage = `You have created an event: ${title}`;
    await this.calendarRepository.createNotification(userId, notifMessage);

    return createdItem;
  }

  async getCalendarItemsByUser() {}

  async updateCalendarItem() {}

  async deleteCalendarItem() {}
}
