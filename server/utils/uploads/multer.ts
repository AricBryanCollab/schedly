import { Request } from "express";
import multer from "multer";
import path from "path";

export const storage = multer.diskStorage({
  destination: function (req: Request, file, cb) {
    cb(null, "assets/");
  },
  filename: function (_: Request, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
