import { protectRoute } from "@/internal/auth/config";
import { notificationController } from "@/internal/notification/config";
import express from "express";

const router = express.Router();

router.use(protectRoute);

router.get("/", notificationController.getUserNotifications);
router.put("/:id/read", notificationController.markNotificationAsRead);
router.put("/mark-all-read", notificationController.markAllNotificationsAsRead);
router.delete("/:id", notificationController.deleteNotification);

export default router;
