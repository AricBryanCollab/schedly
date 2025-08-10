import { Notification } from "@/internal/notification/dto";

export interface INotificationRepository {
  getUserNotifications(userId: string): Promise<Notification[]>;
  markNotificationAsRead(notifId: string): Promise<Notification>;
  markAllNotificationsAsRead(userId: string): Promise<number>;
  deleteNotification(notifId: string, userId: string): Promise<void>;
}
