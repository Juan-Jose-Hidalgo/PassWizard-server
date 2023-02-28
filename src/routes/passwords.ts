import { Router } from "express";
import passwordController from "../controllers/password.controller";

const router = Router();

router.post('/', passwordController.createPassword);

router.put('/:id', passwordController.updatePassword);

router.delete('/:id', passwordController.deletePassword);

export { router };