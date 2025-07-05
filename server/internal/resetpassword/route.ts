import { resetPasswordController } from "@/internal/resetpassword/config";
import express from "express";

const router = express.Router();

router.post("/request", resetPasswordController.requestResetPassword);
router.post("/verify-otp", resetPasswordController.verifyResetCode);
router.put("/update", resetPasswordController.updatePassword);

export default router;
