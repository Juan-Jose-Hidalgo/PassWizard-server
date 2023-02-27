import { Request, Response } from "express";
import authService from "../services/auth.service";

class AuthController {
    /**
     * Handles the login request from the client and sends back the user data and token if successful.
     * 
     * @param req The request object from the client, containing the authorization header with the email and password encoded in base64.
     * @param res The response object to send back to the client, containing the status code and data or error message.
     */
    async login(req: Request, res: Response) {
        try {
            const user: any = await authService.login(req.headers.authorization!);
            res.status(200).send(user);

        } catch (error: any) {
            res.status(error?.status || 500).send({ status: 'Failed', message: error.message || error });
        }
    }

    async register(req: Request, res: Response) {
        try {
            const { name, username, email, password } = req.body;
            const img = req.file?.path || 'uploads/user.png';
            const newUser = await authService.register(name, username, email, password, img);
            res.status(201).send(newUser);

        } catch (error: any) {
            res.status(error?.status || 500).send({ status: 'Failed', message: error.message });
        }
    }

    async renewToken(req: Request, res: Response) {
        try {
            const token = req.header('x-token');
            const newToken = await authService.renewToken(`${token}`);
            res.status(200).send(newToken);

        } catch (error: any) {
            res.status(error?.status || 500).send({ status: 'Failed', data: { error: error.message || error } });
        }
    }

    async deleteAccount(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await authService.deleteAccount(id);
            res.status(204).send();

        } catch (error: any) {
            res.status(error?.status || 500).send({ status: 'Failed', data: { error: error.message || error } });
        }
    }
}

const authController = new AuthController();
export default authController;