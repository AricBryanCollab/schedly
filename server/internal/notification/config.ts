import { NotificationController } from "@/internal/notification/controller";
import { NotificationRepository } from "@/internal/notification/repository";
import { NotificationService } from "@/internal/notification/service";

const notificationRepository = new NotificationRepository();

const notificationService = new NotificationService(notificationRepository);

export const notificationController = new NotificationController(
  notificationService
);
