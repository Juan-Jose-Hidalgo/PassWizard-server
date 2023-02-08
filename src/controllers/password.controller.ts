import { Request, Response } from 'express';
import { encrypt } from '../helpers/bcrypt.helper';
import { passwordModel } from '../models/password.model';

class PasswordController {

    async createPassword({ body }: Request, res: Response) {
        try {
            let { userId, categoryId, description, pass } = body;

            //* Encrypt password
            pass = encrypt(`${pass}`);

            const password = await passwordModel.create({
                userId: `${userId}`, categoryId: `${categoryId}`, description: `${description}`, password: pass
            });
            res.status(200).send(password);

        } catch (error: any) {
            console.log('Error', error);
            res.status(error?.status || 500).send({ status: 'Failed', data: { error: error.message || error } });
        }
    }

    async updatePassword({ params, body }: Request, res: Response) {
        try {
            const { id } = params;
            let { pass, description } = body;

            //* Encrypt password if it exists.
            if (pass) pass = encrypt(pass);

            const password = await passwordModel.update(
                { description, password: pass },
                { where: { id } }
            );
            res.status(200).send(password);

        } catch (error: any) {
            res.status(error?.status || 500).send({ status: 'Failed', data: { error: error.message || error } });
        }
    }

    async deletePassword({ params }: Request, res: Response) {
        try {
            const { id } = params;
            const password = await passwordModel.destroy({ where: { id } });
            res.status(200).send({ status: 'OK', data: password });

        } catch (error: any) {
            console.log('Error', error);
            res.status(error?.status || 500).send({ status: 'Failed', data: { error: error.message || error } });
        }
    }
}

const passwordController = new PasswordController();
export default passwordController;