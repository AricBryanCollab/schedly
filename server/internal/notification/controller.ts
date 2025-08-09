import { CustomRequest } from "@/infrastructure/middleware/interface";
import { NotificationService } from "@/internal/notification/service";
import { NextFunction, Response } from "express";
0;

export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {
    this.getUserNotifications = this.getUserNotifications.bind(this);
    this.markNotificationAsRead = this.markNotificationAsRead.bind(this);
    this.markAllNotificationsAsRead =
      this.markAllNotificationsAsRead.bind(this);
  }

  async getUserNotifications(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      if (!req.user) {
        return next(new Error("User not authenticated"));
      }

      const userId = req.user.id;

      const notifications =
        await this.notificationService.getUserNotifications(userId);

      res.status(200).json(notifications);
    } catch (error) {
      next(error);
    }
  }

  async markNotificationAsRead(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const notifId = req.params.id;

      await this.notificationService.markNotificationAsRead(notifId);

      res.status(200).json({ message: "A notification was marked as read" });
    } catch (error) {
      next(error);
    }
  }
  async markAllNotificationsAsRead(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      if (!req.user) {
        return next(new Error("User not authenticated"));
      }
    } catch (error) {
      next(error);
    }
  }
}
