import {
  NotFoundError,
  ValidationError,
} from "@/infrastructure/errors/customErrors";
import { NotificationRepository } from "@/internal/notification/repository";

export class NotificationService {
  constructor(
    private readonly notificationRepository: NotificationRepository
  ) {}

  async getUserNotifications(userId: string) {
    if (!userId) {
      throw new NotFoundError("User ID");
    }

    const notifications =
      await this.notificationRepository.getUserNotifications(userId);
    if (!notifications) {
      throw new Error("Failed to retrieve the user notifications");
    }

    return notifications;
  }

  async markNotificationAsRead(notifId: string) {
    if (!notifId) {
      throw new NotFoundError("Notification ID");
    }

    const notification =
      await this.notificationRepository.markNotificationAsRead(notifId);
    if (!notification) {
      throw new ValidationError("Failed to update the notification");
    }

    if (notification.isRead !== true) {
      throw new ValidationError("Failed to mark notification as read");
    }
  }

  async markAllNotificationsAsRead(userId: string) {}
}
