import { AppResponse } from "../interfaces/response.interface";
import { categoryModel } from "../models/category.model";

class CategoryService {

    /**
     * Gets all the categories of an user and returns them in an array.
     * 
     * @param id ```string```
     * @returns ```Promise<AppResponse>```
     */
    async getCategories(id: string): Promise<AppResponse> {
        try {
            const userId = Number.parseInt(id);
            const category: any = await categoryModel.findAll({ where: { userId } });

            console.log('Category:', category);

            if (category.length === 0) {
                throw {
                    status: 404,
                    message: 'El usuario no tiene categorías.'
                }
            }

            return { status: 'OK', data: { category } };

        } catch (error) {
            throw error;
        }
    }

    /**
     * Search for a category by name and return it.
     * 
     * @param name ```string```
     * @returns ```Promise<AppResponse>```
     */
    async getCategory(name: string): Promise<AppResponse> {
        try {
            const category: any = await categoryModel.findOne({ where: { name } });

            if (category === null) {
                throw {
                    status: 404,
                    message: 'La categoría no existe.'
                }
            }

            return { status: 'OK', data: { category } };

        } catch (error) {
            throw error;
        }
    }
}

const categoryService = new CategoryService();
export default categoryService;