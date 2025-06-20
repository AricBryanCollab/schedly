import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

import authRouter from "@/internal/auth/route";

import { errorHandler } from "@/infrastructure/middleware/errorHandler";

export const startApp = () => {
  const app = express();

  app.use(cors());

  app.use(cookieParser());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // Core Routes
  app.use("/auth", authRouter);

  app.use(errorHandler);

  return app;
};
