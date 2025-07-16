import { NotificationService } from "@/internal/notification/service";
import { NextFunction, Request, Response } from "express";

export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {
    this.getUserNotifications = this.getUserNotifications.bind(this);
    this.markNotificationAsRead = this.markNotificationAsRead.bind(this);
    this.markAllNotificationsAsRead =
      this.markAllNotificationsAsRead.bind(this);
  }

  async getUserNotifications(req: Request, res: Response, next: NextFunction) {
    res.status(200).json({ message: "Get User Notifications Endpoint" });
  }

  async markNotificationAsRead(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    res.status(200).json({ message: "Mark Notification As Read" });
  }

  async markAllNotificationsAsRead(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    res
      .status(200)
      .json({ message: "Mark All Notifications As Read Endpoint" });
  }
}
