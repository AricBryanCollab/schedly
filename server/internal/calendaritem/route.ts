import { protectRoute } from "@/internal/auth/config";
import { calendarController } from "@/internal/calendaritem/config";
import express from "express";

const router = express.Router();

router.use(protectRoute);

router.post("/", calendarController.createCalendarItem);
router.get("/", calendarController.getCalendarItemsByUser);
router.put("/:id", calendarController.updateCalendarItem);
router.delete("/:id", calendarController.deleteCalendarItem);

router.put("/:id/highlights", calendarController.highlightOn);
router.delete("/:id/highlights", calendarController.highlightOff);
router.get("/highlights", calendarController.getAllHighlightsByUser);
export default router;
