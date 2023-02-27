import { Request, Response } from 'express';
import { categoryModel } from '../models/category.model';
import { passwordModel } from '../models/password.model';
import { userModel } from '../models/user.model';
import userService from '../services/user.service';

class UserController {
   
    async getUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const user = await userModel.findByPk(id);
            res.status(200).send({ status: 'Ok', user });

        } catch (error: any) {
            res.status(error?.status || 500).send({ status: 'Failed', message: error.message || error });
        }
    }

    async updateImage(req: Request, res: Response) {
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

    async updateUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { name, username, email } = req.body;

            const user = await userService.updateUser(id, name, username, email);
            res.status(200).send(user);

        } catch (error: any) {
            res.status(error?.status || 500).send({ status: 'Failed', message: error.message || error });
        }
    }

    async deleteUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const deletedUser = await userModel.destroy({ where: { id } });
            res.status(200).send({ status: 'OK', data: deletedUser });

        } catch (error: any) {
            res.status(error?.status || 500).send({ status: 'Failed', data: { error: error.message || error } });
        }
    }

    async getUserPasswords(req: Request, res: Response) {
        try {
            let { userId } = req.params;
            const passwords = await passwordModel.findAll({ where: { userId } });
            res.status(200).send({ status: 'OK', passwords });

        } catch (error: any) {
            res.status(error?.status || 500).send({ status: 'Failed', data: { error: error.message || error } });
        }
    }

    async getUserCategories(req: Request, res: Response) {
        try {
            const { userId } = req.params;
            const categories = await categoryModel.findAll({ where: { userId } });
            res.status(200).send({ status: 'OK', categories });
        } catch (error: any) {
            res.status(error?.status || 500).send({ status: 'Failed', data: { error: error.message || error } });
        }
    }

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