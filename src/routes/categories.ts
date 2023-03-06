import { Router } from "express";
import categoryController from "../controllers/category.controllers";

const router = Router();

router.post('/', categoryController.newCategory);

export { router };