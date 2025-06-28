import { userController } from "@/internal/user/config";

import { upload } from "@/infrastructure/middleware/upload";
import { protectRoute } from "@/internal/auth/config";

import express from "express";

const router = express.Router();

router.put("/update", protectRoute, userController.updateUser);
router.put(
  "/update-profile-picture",
  protectRoute,
  upload.single("profilePic"),
  userController.updateUserProfilePic
);
router.delete("/delete", protectRoute, userController.deleteUser);
router.get("/", protectRoute, userController.getAllUsers);

export default router;
