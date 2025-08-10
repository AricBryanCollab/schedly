import { prisma } from "@/infrastructure/database/connectToDb";
import { DatabaseError } from "@/infrastructure/errors/customErrors";
import { Notification } from "@/internal/notification/dto";
import { INotificationRepository } from "@/internal/notification/interface";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export class NotificationRepository implements INotificationRepository {
  async getUserNotifications(userId: string): Promise<Notification[]> {
    try {
      const notifications = await prisma.notification.findMany({
        where: { userId },
      });

      return notifications;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        console.error(error.message);
        throw new DatabaseError(
          "Database error at getUserNotifications method"
        );
      }
      throw error;
    }
  }
  async markNotificationAsRead(notifId: string): Promise<Notification> {
    try {
      const notification = await prisma.notification.update({
        where: { id: notifId },
        data: { isRead: true },
      });

      return notification;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        console.error(error.message);
        throw new DatabaseError(
          "Database error at markNotificationAsRead method"
        );
      }
      throw error;
    }
  }
  async markAllNotificationsAsRead(userId: string): Promise<number> {
    try {
      const { count } = await prisma.notification.updateMany({
        where: { userId, isRead: false },
        data: { isRead: true },
      });

      return count;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        console.error(error.message);
        throw new DatabaseError(
          "Database error at markAllNotificationsAsRead method"
        );
      }
      throw error;
    }
  }

  async deleteNotification(notifId: string, userId: string): Promise<void> {
    try {
      await prisma.notification.delete({
        where: { id: notifId, userId },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        console.error(error.message);
        throw new DatabaseError("Database error at deleteNotification method");
      }
    }
  }
}
