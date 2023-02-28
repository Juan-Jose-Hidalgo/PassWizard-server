import { Request, Response } from 'express';
import { User } from '../interfaces/user-attributes.interface';
import { categoryModel } from '../models/category.model';
import { passwordModel } from '../models/password.model';
import { userModel } from '../models/user.model';
import userService from '../services/user.service';

class UserController {
    /**
     * Updates a user with the given data.
     * 
     * @param req - The request object containing the user id in params and the user data in body.
     * @param res - The response object to send back the updated user or an error message.
     */
    async updateUser(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const userId = Number.parseInt(id);
        const userData: User = { id: userId, ...req.body };

        try {
            const user = await userService.updateUser(userData);
            res.status(200).send(user);
        } catch (error: any) {
            res.status(error?.status || 500).send({ status: 'Failed', message: error.message || error });
        }
    }

    /**
     * Handles the request to update the image of a user and sends a response with the updated user data or an error message.
     * 
     * @param req - The request object with the user id in the params, the old image path in the body and the new image file in the file property.
     * @param res - The response object to send back to the client.
     * @returns void - The response is sent directly from this method.
     */
    async updateImage(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { olderImg } = req.body;
            const img = req.file?.path || undefined;

            const user = await userService.updateImage(id, img, olderImg);
            res.status(200).send(user);
        } catch (error: any) {
            res.status(error?.status || 500).send({ status: 'Failed', message: error.message || error });
        }
    }

    /**
     * Updates the password of a user by its id and sends a response.
     * 
     * @param req - The request object with the id in the params and the password in the body
     * @param res - The response object to send back the result
     */
    async updatePassword(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { password } = req.body;
            const user = await userService.updateUserPassword(id, password);
            res.status(200).send(user);

        } catch (error: any) {
            res.status(error?.status || 500).send({ status: 'Failed', message: error.message || error });
        }
    }

    /**
     * Deletes a user by its id and sends a response.
     * 
     * @param req - The request object with the id in the params
     * @param res - The response object to send back the result
     */
    async deleteUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const deletedUser = await userModel.destroy({ where: { id } });
            res.status(200).send({ status: 'OK', data: deletedUser });

        } catch (error: any) {
            res.status(error?.status || 500).send({ status: 'Failed', data: { error: error.message || error } });
        }
    }

    /**
     * Gets all the passwords of a user by its id and sends a response.
     * 
     * @param req - The request object with the user id in the params.
     * @param res - The response object to send back the result.
     */
    async getUserPasswords(req: Request, res: Response) {
        try {
            let { userId } = req.params;
            const passwords = await passwordModel.findAll({ where: { userId } });
            res.status(200).send({ status: 'OK', passwords });

        } catch (error: any) {
            res.status(error?.status || 500).send({ status: 'Failed', data: { error: error.message || error } });
        }
    }

    /**
     * Gets the user categories by user id.
     * 
     * @param req The request object
     * @param res The response object
     */
    async getUserCategories(req: Request, res: Response) {
        try {
            const { userId } = req.params;
            const categories = await categoryModel.findAll({ where: { userId } });
            res.status(200).send({ status: 'OK', categories });
        } catch (error: any) {
            res.status(error?.status || 500).send({ status: 'Failed', data: { error: error.message || error } });
        }
    }

    /**
     * Deletes an user account by id.
     * 
     * @param req The request object
     * @param res The response object
     */
    async deleteAccount(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await userService.deleteAccount(id);
            res.status(204).send();

        } catch (error: any) {
            res.status(error?.status || 500).send({ status: 'Failed', data: { error: error.message || error } });
        }
    }
}

const userController = new UserController();
export default userController;