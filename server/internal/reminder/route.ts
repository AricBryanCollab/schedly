import { protectRoute } from "@/internal/auth/config";
import { reminderController } from "@/internal/reminder/config";
import express from "express";

const router = express.Router();

router.use(protectRoute);

router.post("/calendar-item/:id", reminderController.createReminder);
router.get("/", reminderController.getRemindersByUser);
router.put("/:id", reminderController.updateReminder);
router.delete("/:id", reminderController.deleteReminder);

export default router;
