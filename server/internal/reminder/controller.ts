import { CustomRequest } from "@/infrastructure/middleware/interface";
import { ReminderService } from "@/internal/reminder/service";
import { NextFunction, Response } from "express";

export class ReminderController {
  constructor(private readonly reminderService: ReminderService) {
    this.createReminder = this.createReminder.bind(this);
    this.getRemindersByUser = this.getRemindersByUser.bind(this);
    this.updateReminder = this.updateReminder.bind(this);
    this.deleteReminder = this.deleteReminder.bind(this);
  }

  async createReminder(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return next(new Error("User not authenticated"));
      }
      const userId = req.user.id;

      const calendarId = req.params.id;

      const reminder = req.body;

      const newReminder = await this.reminderService.createReminders(
        userId,
        calendarId,
        reminder
      );

      res
        .status(200)
        .json({
          message: "A reminder has been created",
          reminder: newReminder,
        });
    } catch (error) {
      next(error);
    }
  }

  async getRemindersByUser(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      res.status(200).json({ message: "getRemindersByUser Endpoint!" });
    } catch (error) {
      next(error);
    }
  }

  async updateReminder(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      res.status(200).json({ message: "updateReminder Endpoint!" });
    } catch (error) {
      next(error);
    }
  }

  async deleteReminder(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      res.status(200).json({ message: "deleteReminder Endpoint!" });
    } catch (error) {
      next(error);
    }
  }
}
