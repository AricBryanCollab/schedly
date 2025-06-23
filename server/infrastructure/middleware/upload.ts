import { Request } from "express";
import multer from "multer";

import { storage } from "@/utils/uploads/multer";

export const upload = multer({
  storage: storage,
  fileFilter: (_: Request, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    const isMimeTypeValid = allowedTypes.includes(file.mimetype);
    if (isMimeTypeValid) {
      cb(null, true);
    } else {
      cb(
        new Error(
          `Invalid file type. Allowed types are: ${allowedTypes.join(", ")}`
        )
      );
    }
  },
  limits: {
    fileSize: 4 * 1024 * 1024,
  },
});
