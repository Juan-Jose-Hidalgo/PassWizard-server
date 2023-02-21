import { Router } from "express";
import userController from "../controllers/user.controllers";
import upload from "../middlewares/user-img.middleware";

const router = Router();

router.get('', userController.getUser);

router.get('/login', userController.login);

router.get('/renew-token', userController.renewToken);

router.get('/:userId/get-categories', userController.getUserCategories);

router.get('/:userId/get-passwords', userController.getUserPasswords);

router.delete('/:id', userController.deleteUser);

router.patch('/:id/update-password', userController.updatePassword);

router.post('/register', upload, userController.register);

router.put('/:id', userController.updateUser);


export { router };