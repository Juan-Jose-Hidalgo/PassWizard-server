import { Router } from "express";
import userController from "../controllers/user.controllers";

const router = Router();

router.get('/login', userController.login);

router.get('/:userId/get-passwords', userController.getUserPasswords);

router.get('/:userId/get-categories', userController.getUserCategories);

router.post('/register', userController.register);

router.get('/renew-token', userController.renewToken);

router.put('/:id', userController.updateUser);

router.delete('/:id', userController.deleteUser);

export { router };