import { Router } from "express";
import categoryController from "../controllers/category.controllers";

const router = Router();

// router.get('/', categoryController.getCategories);

// router.get('/category', categoryController.getCategory);

router.post('/', categoryController.newCategory);

// router.put('/:id', categoryController.updateCategory);

// router.delete('/:id', categoryController.deleteCategory);

export { router };