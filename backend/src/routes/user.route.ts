import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { getUserProfile } from "../controllers/userControllers/user.controller";

const router = Router();

router.get("/profile", authMiddleware, getUserProfile);

export default router;
