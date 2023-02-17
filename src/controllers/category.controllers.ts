import { Request, Response } from 'express';
import categoryService from '../services/category.service';
import { categoryModel } from '../models/category.model';

class CategoryController {

    // async getCategories({ headers }: Request, res: Response) {
    //     try {
    //         const { id } = headers;
    //         console.log('Id:', id);
    //         const categories = await categoryService.getCategories(`${id}`)
    //         res.status(200).send({ status: 'Ok', data: { category: categories } });

    //     } catch (error: any) {
    //         res.status(error?.status || 500).send({ status: 'Failed', data: { error: error.message || error } });
    //     }
    // }

    // async getCategory({ headers }: Request, res: Response) {
    //     try {
    //         const { name } = headers;
    //         const category = await categoryService.getCategory(`${name}`);
    //         res.status(200).send(category);

    //     } catch (error: any) {
    //         res.status(error?.status || 500).send({ status: 'Failed', data: { error: error.message || error } });
    //     }
    // }

    async newCategory({ body }: Request, res: Response) {
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

    // async updateCategory({ params, body }: Request, res: Response) {
    //     try {
    //         const { id } = params;
    //         let { name } = body;
    //         name = `${id}_${name}`;

    //         const category = await categoryModel.update({ name }, { where: { userId: id } });
    //         res.status(200).send(category);

    //     } catch (error: any) {
    //         res.status(error?.status || 500).send({ status: 'Failed', data: { error: error.message || error } });
    //     }
    // }

    // async deleteCategory(req: Request, res: Response) {
    //     try {
    //         const { id } = req.params;
    //         const deletedUser = await categoryModel.destroy({ where: { id } });
    //         res.status(200).send({ status: 'OK', data: deletedUser });

    //     } catch (error: any) {
    //         res.status(error?.status || 500).send({ status: 'Failed', data: { error: error.message || error } });
    //     }
    // }
}

const categoryController = new CategoryController();
export default categoryController;