import { Router } from "express";
import authController from "../controllers/auth.controllers";
import upload from "../middlewares/user-img.middleware";

const router = Router();

router.get('/login', authController.login);
router.get('/renew-token', authController.renewToken);
router.post('/register', upload, authController.register);

export { router }