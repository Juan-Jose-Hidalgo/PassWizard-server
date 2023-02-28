import { Router } from "express";
import userController from "../controllers/user.controllers";
import upload from "../middlewares/user-img.middleware";

const router = Router();

//* GET routes.
router.get('/:userId/get-categories', userController.getUserCategories);
router.get('/:userId/get-passwords', userController.getUserPasswords);

//* DELETE routes.
router.delete('/:id', userController.deleteUser);
router.delete('/:id/delete-account', userController.deleteAccount);

//* PATCH routes.
router.patch('/:id/update-img', upload, userController.updateImage);
router.patch('/:id/update-password', userController.updatePassword);


//* PUT routes.
router.put('/:id', userController.updateUser);


export { router };