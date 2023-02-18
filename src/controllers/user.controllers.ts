import { Request, Response } from 'express';
import { encrypt } from '../helpers/bcrypt.helper';
import { categoryModel } from '../models/category.model';
import { passwordModel } from '../models/password.model';
import { userModel } from '../models/user.model';
import userService from '../services/user.service';

class UserController {

    async login({ headers }: Request, res: Response) {
        try {
            const { email, password } = headers;
            const user: any = await userService.login(`${email}`, `${password}`);
            res.status(200).send(user);

        } catch (error: any) {
            res.status(error?.status || 500).send({ status: 'Failed', message: error.message || error });
        }
    }

    async register(req: Request, res: Response) {
        try {
            const { name, username, email, password } = req.body;
            const img = req.file?.path || 'uploads/user.png';
            const newUser = await userService.register(name, username, email, password, img);
            res.status(201).send(newUser);

        } catch (error: any) {
            console.log('Error', error);
            res.status(error?.status || 500).send({ status: 'Failed', message: error || error });
        }
    }

    async updateUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { username, email } = req.body;
            let { password } = req.body;

            if (password) password = encrypt(password);

            const updatedUser = await userModel.update(
                { username, email, password },
                { where: { id } }
            );
            res.status(200).send(updatedUser);

        } catch (error: any) {
            res.status(error?.status || 500).send({ status: 'Failed', data: { error: error.message || error } });
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

    async renewToken(req: Request, res: Response) {
        try {
            const token = req.header('x-token');
            const newToken = await userService.renewToken(`${token}`);
            res.status(200).send(newToken);

        } catch (error: any) {
            res.status(error?.status || 500).send({ status: 'Failed', data: { error: error.message || error } });
        }
    }
}

const userController = new UserController();
export default userController;