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

    /**
     * Registers a new user with the given data and sends a response with the user object or an error message.
     * 
     * @param req The request object that contains the user data (name, username, email, password) and an optional image file.
     * @param res The response object that sends back the user object or an error message.
     * @returns A promise that resolves with a status code of 201 (created) and the user object if successful,
     * or rejects with a status code of 500 (internal server error) and an error message if failed.
     */
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

    /**
     * Renews the authentication token for the user and sends a response with the new token or an error message.
     * 
     * @param req The request object that contains the old token in the header (x-token).
     * @param res The response object that sends back the new token or an error message.
     * @returns A promise that resolves with a status code of 200 (ok) and the new token if successful,
     * or rejects with a status code of 500 (internal server error) and an error message if failed.
     */
    async renewToken(req: Request, res: Response) {
        try {
            const token = req.header('x-token');
            const newToken = await authService.renewToken(`${token}`);
            res.status(200).send(newToken);

        } catch (error: any) {
            res.status(error?.status || 500).send({ status: 'Failed', message: error.message });
        }
    }
}

const authController = new AuthController();
export default authController;