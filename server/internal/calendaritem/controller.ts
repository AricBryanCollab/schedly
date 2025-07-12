import { CustomRequest } from "@/infrastructure/middleware/interface";
import { CalendarService } from "@/internal/calendaritem/service";
import { NextFunction, Request, Response } from "express";
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {
    this.createCalendarItem = this.createCalendarItem.bind(this);
    this.getCalendarItemsByUser = this.getCalendarItemsByUser.bind(this);
    this.updateCalendarItem = this.updateCalendarItem.bind(this);
    this.deleteCalendarItem = this.deleteCalendarItem.bind(this);
  }

  async createCalendarItem(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = req.user?.id!;

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
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      res.status(200).json("Get Calendar Items By User Endpoint");
    } catch (error) {
      next(error);
    }
  }

  async updateCalendarItem(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(200).json("Update Calendar Item Endpoint");
    } catch (error) {
      next(error);
    }
  }

  async deleteCalendarItem(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(200).json("Delete Calendar Item Endpoint");
    } catch (error) {
      next(error);
    }
  }
}
