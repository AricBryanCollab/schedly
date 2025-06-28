import express from "express";

const router = express.Router();

router.put("/update");
router.put("/update-profile-picture");
router.delete("/delete");
router.get("/");

export default router;
