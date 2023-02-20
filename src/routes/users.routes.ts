import { Router } from "express";
import userController from "../controllers/user.controllers";
import upload from "../middlewares/user-img.middleware";

const router = Router();

router.get('', userController.getUser);

router.get('/login', userController.login);

router.get('/:userId/get-passwords', userController.getUserPasswords);

router.get('/:userId/get-categories', userController.getUserCategories);

router.post('/register', upload, userController.register);

router.get('/renew-token', userController.renewToken);

router.put('/:id', userController.updateUser);

router.delete('/:id', userController.deleteUser);

export { router };