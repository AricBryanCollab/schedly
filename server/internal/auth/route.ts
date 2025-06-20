import express from "express";
import { authController } from "./config";

const router = express.Router();

router.post("/signup", authController.signUp);
router.post("/signin", authController.signIn);
router.post("/oauth", authController.oAuth);
router.post("/signout", authController.signOut);

export default router;
