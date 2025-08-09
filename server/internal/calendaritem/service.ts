import {
  NotFoundError,
  ValidationError,
} from "@/infrastructure/errors/customErrors";
import {
  CreateCalendarItemRequest,
  UpdateCalendarItemRequest,
} from "@/internal/calendaritem/interface";
import { CalendarRepository } from "@/internal/calendaritem/repository";
export class CalendarService {
  constructor(private readonly calendarRepository: CalendarRepository) {}

  async createCalendarItem({
    userId,
    calendarItem,
  }: CreateCalendarItemRequest) {
    const {
      title,
      description,
      icon,
      startTime,
      endTime,
      isAllDay,
      isRecurrent,
      recurrenceRule,
      status,
    } = calendarItem;

    if (!userId) throw new NotFoundError("User ID");

    if (!title || typeof title !== "string")
      throw new ValidationError("Title is required");

    if (!icon) throw new ValidationError("Event category is not selected");

    if (!startTime) throw new ValidationError("Invalid start time");

    if (!endTime) throw new ValidationError("Invalid end time");

    if (typeof isAllDay !== "boolean")
      throw new ValidationError("isAllDay must be boolean");

    if (typeof isRecurrent !== "boolean")
      throw new ValidationError("isRecurrent must be boolean");

    const allowedStatus = ["PENDING", "INCOMING", "INPROGRESS", "COMPLETED"];
    if (!allowedStatus.includes(status))
      throw new ValidationError("Invalid status value");

    const createdItem = await this.calendarRepository.createCalendarItem({
      userId,
      calendarItem: {
        title,
        description,
        icon,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        isAllDay,
        isRecurrent,
        recurrenceRule,
        status,
      },
    });

    const notifMessage = `You have created an event: ${title}`;
    await this.calendarRepository.createNotification(userId, notifMessage);

    return createdItem;
  }

  async getCalendarItemsByUser(userId: string) {
    if (!userId) throw new NotFoundError("User ID");

    const calendarItems =
      await this.calendarRepository.getCalendarItemsByUser(userId);

    return calendarItems;
  }

  async updateCalendarItem({
    userId,
    calendarId,
    calendarItem,
  }: UpdateCalendarItemRequest) {
    if (!userId) throw new NotFoundError("User ID");

    if (!calendarId) throw new ValidationError("Calendar Item ID is required");

    const { title, startTime, endTime, isAllDay, isRecurrent, status } =
      calendarItem;

    if (!title || typeof title !== "string")
      throw new ValidationError("Title is required");

    if (!startTime) throw new ValidationError("Invalid start time");

    if (!endTime) throw new ValidationError("Invalid end time");

    if (new Date(endTime) <= new Date(startTime)) {
      throw new ValidationError("End time must be after start time");
    }

    if (typeof isAllDay !== "boolean")
      throw new ValidationError("isAllDay must be boolean");

    if (typeof isRecurrent !== "boolean")
      throw new ValidationError("isRecurrent must be boolean");

    const allowedStatus = ["PENDING", "INCOMING", "INPROGRESS", "COMPLETED"];
    if (!allowedStatus.includes(status))
      throw new ValidationError("Invalid status value");

    const updatedItem = await this.calendarRepository.updateCalendarItem({
      calendarId,
      calendarItem,
    });

    const notifMessage = `You have modified the event: ${calendarItem.title}`;

    await this.calendarRepository.createNotification(userId, notifMessage);

    return updatedItem;
  }

  async deleteCalendarItem(userId: string, calendarId: string) {
    if (!userId) throw new NotFoundError("User ID");

    if (!calendarId) throw new ValidationError("Calendar ID is required");

    await this.calendarRepository.deleteCalendarItem(calendarId);
  }
}
