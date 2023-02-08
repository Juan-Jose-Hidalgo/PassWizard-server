import { Router } from "express";
import userController from "../controllers/user.controllers";

const router = Router();

router.get('/login', userController.login);

router.post('/register', userController.register);

router.get('/:id/renew-token', userController.renewToken);

router.put('/:id', userController.updateUser);

router.delete('/:id', userController.deleteUser);

export { router };