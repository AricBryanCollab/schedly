import { userController } from "@/internal/user/config";

import { upload } from "@/infrastructure/middleware/upload";
import { protectRoute } from "@/internal/auth/config";

import express from "express";

const router = express.Router();

router.use(protectRoute);

router.put("/:id/update", userController.updateUser);
router.put(
  "/:id/update-profile-picture",
  upload.single("profilePic"),
  userController.updateUserProfilePic
);
router.delete("/delete/:id", userController.deleteUser);
router.get("/", userController.getAllUsers);

export default router;
