import { NotificationRepository } from "@/internal/notification/repository";

export class NotificationService {
  constructor(
    private readonly notificationRepository: NotificationRepository
  ) {}

  async getUserNotifications(userId: string) {}

  async markNotificationAsRead(notifId: string) {}

  async markAllNotificationsAsRead(userId: string) {}
}
