import express from "express";
import { authController } from "./config";

const router = express.Router();

router.post("/signup", authController.signUp);
router.post("/signin", authController.signIn);
router.post("/oauth-signup/:provider", authController.oAuthSignUp);
router.post("/oauth-signin/:provider", authController.oAuthSignIn);
router.post("/signout", authController.signOut);
router.post("/verify-otp", authController.verifySignUp);

export default router;
