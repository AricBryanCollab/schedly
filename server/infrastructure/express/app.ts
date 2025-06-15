import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

import { Request, Response } from "express";

export const startApp = () => {
  const app = express();

  app.use(cors());

  app.use(cookieParser());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use("/test", (_: Request, res: Response) => {
    res.json({ message: "Test message for this endpoint" });
  });

  return app;
};
