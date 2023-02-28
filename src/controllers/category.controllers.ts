import { Request, Response } from 'express';
import { categoryModel } from '../models/category.model';

class CategoryController {
    /**
     * Creates a new category with a given name and user ID.
     * 
     * @param {Request} { body } - The request object with the body property.
     * @param {Response} res - The response object to send back the result.
     * @returns {void} Nothing.
     */
    async newCategory({ body }: Request, res: Response): Promise<void> {
        try {
            const categories = [];
            let { name, userId } = body;
            name = `${userId}_${name}`;
            const category = await categoryModel.create({ name, userId });
            categories.push(category);
            res.status(200).send({ status: 'OK', categories });

        } catch (error: any) {
            res.status(error?.status || 500).send({ status: 'Failed', data: { error: error.message || error } });
        }
    }
}

const categoryController = new CategoryController();
export default categoryController;