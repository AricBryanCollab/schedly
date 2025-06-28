import { userController } from "@/internal/user/config";
import express from "express";

const router = express.Router();

router.put("/update", userController.updateUser);
router.put("/update-profile-picture", userController.updateUserProfilePic);
router.delete("/delete", userController.deleteUser);
router.get("/", userController.getAllUsers);

export default router;
