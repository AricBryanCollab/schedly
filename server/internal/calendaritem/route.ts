import { protectRoute } from "@/internal/auth/config";
import { calendarController } from "@/internal/calendaritem/config";
import express from "express";

const router = express.Router();

router.use(protectRoute);

router.post("/", calendarController.createCalendarItem);
router.get("/", calendarController.getCalendarItemsByUser);
router.put("/:id", calendarController.updateCalendarItem);
router.delete("/:id", calendarController.deleteCalendarItem);

export default router;
