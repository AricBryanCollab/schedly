export interface NotificationDTO {
  id: string;
  userId: string;
  message: string;
  isRead: boolean;
  createdAt: Date | string;
}
