import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

import authRouter from "@/internal/auth/route";
import calendarRouter from "@/internal/calendaritem/route";
import notificationRouter from "@/internal/notification/route";
import reminderRouter from "@/internal/reminder/route";
import resetPasswordRouter from "@/internal/resetpassword/route";
import userRouter from "@/internal/user/route";

import { errorHandler } from "@/infrastructure/middleware/errorHandler";

export const startApp = () => {
  const app = express();

  app.use(cors());

  app.use(cookieParser());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // Core Routes
  app.use("/auth", authRouter);
  app.use("/reset-password", resetPasswordRouter);
  app.use("/users", userRouter);
  app.use("/calendar-item", calendarRouter);
  app.use("/notifications", notificationRouter);
  app.use("/reminders", reminderRouter);

  app.use(errorHandler);

  return app;
};
