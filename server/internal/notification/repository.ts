import { Notification } from "@/internal/notification/dto";
import { INotificationRepository } from "@/internal/notification/interface";

export class NotificationRepository implements INotificationRepository {
  getUserNotifications(userId: string): Promise<Notification> {
    throw new Error("Method not implemented.");
  }
  markNotificationAsRead(notifId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  markAllNotificationsAsRead(userId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
