import { Notification } from "@/internal/notification/dto";

export interface INotificationRepository {
  getUserNotifications(userId: string): Promise<Notification[]>;
  markNotificationAsRead(notifId: string): Promise<void>;
  markAllNotificationsAsRead(userId: string): Promise<void>;
}
