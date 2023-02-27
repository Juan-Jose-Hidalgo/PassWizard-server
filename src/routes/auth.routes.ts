import { Router } from "express";
import authController from "../controllers/auth.controllers";

const router = Router();

router.get('/login', authController.login);
router.get('/renew-token', authController.renewToken);

export { router }