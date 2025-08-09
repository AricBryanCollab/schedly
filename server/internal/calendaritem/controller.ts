import { CustomRequest } from "@/infrastructure/middleware/interface";
import { CalendarService } from "@/internal/calendaritem/service";
import { NextFunction, Response } from "express";
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {
    this.createCalendarItem = this.createCalendarItem.bind(this);
    this.getCalendarItemsByUser = this.getCalendarItemsByUser.bind(this);
    this.updateCalendarItem = this.updateCalendarItem.bind(this);
    this.deleteCalendarItem = this.deleteCalendarItem.bind(this);
    this.highlightOn = this.highlightOn.bind(this);
    this.highlightOff = this.highlightOff.bind(this);
    this.getAllHighlightsByUser = this.getAllHighlightsByUser.bind(this);
  }

  async createCalendarItem(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      if (!req.user) {
        return next(new Error("User not authenticated"));
      }
      const userId = req.user.id;

      const calendarItem = req.body;

      const createdItem = await this.calendarService.createCalendarItem({
        userId,
        calendarItem,
      });

      res.status(201).json({
        message: "You have successfully added a calendar event",
        calendarItem: createdItem,
      });
    } catch (error) {
      next(error);
    }
  }

  async getCalendarItemsByUser(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      if (!req.user) {
        return next(new Error("User not authenticated"));
      }
      const userId = req.user.id;

      const calendarItems =
        await this.calendarService.getCalendarItemsByUser(userId);

      res.status(200).json(calendarItems);
    } catch (error) {
      next(error);
    }
  }

  async updateCalendarItem(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      if (!req.user) {
        return next(new Error("User not authenticated"));
      }
      const userId = req.user.id;
      const calendarId = req.params.id;
      const calendarItem = req.body;

      const updatedItem = await this.calendarService.updateCalendarItem({
        userId,
        calendarId,
        calendarItem,
      });

      res.status(200).json({
        message: "You have successfully updated the calendar event",
        calendarItem: updatedItem,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteCalendarItem(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      if (!req.user) {
        return next(new Error("User not authenticated"));
      }
      const userId = req.user.id;

      const calendarId = req.params.id;

      await this.calendarService.deleteCalendarItem(userId, calendarId);

      res.status(200).json({ message: "You have deleted a calendar event" });
    } catch (error) {
      next(error);
    }
  }

  async highlightOn(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return next(new Error("User not authenticated"));
      }
      const userId = req.user.id;

      const calendarId = req.params.id;

      const highlights = await this.calendarService.highlightOn(
        userId,
        calendarId
      );

      res
        .status(200)
        .json({ message: "You have highlighted an event", highlights });
    } catch (error) {
      next(error);
    }
  }

  async highlightOff(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return next(new Error("User not authenticated"));
      }
      const userId = req.user.id;

      const calendarId = req.params.id;

      const highlights = await this.calendarService.highlightOff(
        userId,
        calendarId
      );

      res.status(200).json({ highlights: highlights });
    } catch (error) {
      next(error);
    }
  }

  async getAllHighlightsByUser(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) {}
}
