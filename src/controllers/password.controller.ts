import { Request, Response } from 'express';
import { passwordModel } from '../models/password.model';

class PasswordController {
    /**
     * Creates a new password with a given user ID, category.
     * 
     * @param {Request} { body } - The request object with the body property.
     * @param {Response} res - The response object to send back the result.
     * @returns {void} Nothing.
     */
    async createPassword({ body }: Request, res: Response): Promise<void> {
        try {
            const { userId, categoryId, name, pass } = body;
            const password = await passwordModel.create({
                userId: `${userId}`, categoryId: `${categoryId}`, name: `${name}`, password: pass
            });
            res.status(200).send(password);

        } catch (error: any) {
            res.status(error?.status || 500).send({ status: 'Failed', message: error.message });
        }
    }

    /**
     * Updates an existing password with a given ID and and new values for pass, name and category ID.
     * 
     * @param {Request} { params, body } - The request object with the params and body properties.
     * @param {Response} res - The response object to send back the result.
     * @returns {void} Nothing.
     */
    async updatePassword({ params, body }: Request, res: Response): Promise<void> {
        try {
            const { id } = params;
            const { pass, name, categoryId } = body;
            const password = await passwordModel.update(
                { categoryId, name, password: pass },
                { where: { id } }
            );
            res.status(200).send(password);

        } catch (error: any) {
            res.status(error?.status || 500).send({ status: 'Failed', message: error.message });
        }
    }

    /**
     * Deletes an existing password with a given ID.
     * 
     * @param {Request} { params } - The request object with the params property.
     * @param {Response} res - The response object to send back the result.
     * @returns {void} Nothing.
     */
    async deletePassword({ params }: Request, res: Response): Promise<void> {
        try {
            const { id } = params;
            const password = await passwordModel.destroy({ where: { id } });
            res.status(200).send({ status: 'OK', data: password });

        } catch (error: any) {
            res.status(error?.status || 500).send({ status: 'Failed', message: error.message });
        }
    }
}

const passwordController = new PasswordController();
export default passwordController;