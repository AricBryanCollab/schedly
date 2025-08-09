import { NotFoundError } from "@/infrastructure/errors/customErrors";
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

  async markNotificationAsRead(notifId: string) {}

  async markAllNotificationsAsRead(userId: string) {}
}
