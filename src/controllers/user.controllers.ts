import { Request, Response } from 'express';
import { encrypt } from '../helpers/bcrypt.helper';
import { userModel } from '../models/user.model';
import userService from '../services/user.service';


class UserController {

    async login({ headers }: Request, res: Response) {
        try {
            const { email, password } = headers;
            const user: any = await userService.login(`${email}`, `${password}`);
            res.status(200).send(user);

        } catch (error: any) {
            res.status(error?.status || 500).send({ status: 'Failed', data: { error: error.message || error } });
        }
    }

    async register({ body }: Request, res: Response) {
        try {
            const { name, username, email, password } = body;
            const newUser = await userService.register(name, username, email, password);
            res.status(200).send(newUser);

        } catch (error: any) {
            console.log('Error', error);
            res.status(error?.status || 500).send({ status: 'Failed', data: { error: error.message || error } });
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

    async renewToken(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const user: any = await userService.renewToken(id);
            res.status(200).send({ status: 'OK', data: user });

        } catch (error: any) {
            res.status(error?.status || 500).send({ status: 'Failed', data: { error: error.message || error } });
        }
    }
}

const userController = new UserController();
export default userController;