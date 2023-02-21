import { Router } from "express";
import userController from "../controllers/user.controllers";
import upload from "../middlewares/user-img.middleware";

const router = Router();

//* GET routes.
router.get('', userController.getUser);

router.get('/login', userController.login);

router.get('/renew-token', userController.renewToken);

router.get('/:userId/get-categories', userController.getUserCategories);

router.get('/:userId/get-passwords', userController.getUserPasswords);

//* DELETE routes.
router.delete('/:id', userController.deleteUser);

//* PATCH routes.
router.patch('/:id/update-img', upload, userController.updateImage);

router.patch('/:id/update-password', userController.updatePassword);

//* POST routes.
router.post('/register', upload, userController.register);

//* PUT routes.
router.put('/:id', userController.updateUser);


export { router };