import { Router } from "express";
import { register } from "../controllers/authControllers/auth.controller";
import { login } from "../controllers/authControllers/login.controller";

const router = Router();

router.post("/register", register);
router.post("/login", login);

export default router;
