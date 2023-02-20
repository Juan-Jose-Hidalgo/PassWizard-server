import { JwtPayload } from "jsonwebtoken";

import { compare, encrypt } from "../helpers/bcrypt.helper";
import { generateJwt, validateJWT } from "../helpers/jwt.helper";
import { userModel } from "../models/user.model";
import { UserResponse } from "../interfaces/response.interface";
import { ValidationError } from "sequelize";
import { CustomError } from "../interfaces/error.interface";

class UserService {
    /**
     * Checks if the email and password passed by parameter are found in the database.
     * 
     * If the email is found, it compares the encrypted password with the one passed by parameter.
     * 
     * If both data are correct, it generates a JWT and returns a response of type UserResponse.
     * 
     * @param email ```string```
     * @param password ```string```
     * @returns ```Promise<UserResponse>```
     */
    async login(email: string, password: string): Promise<UserResponse> {
        let cryptPass: boolean = false;
        try {
            const user: any = await userModel.findOne({ where: { email } });

            // Compare passwords.
            if (user !== null) cryptPass = compare(password, user?.password);

            // If any data is invalid, it throws an error.
            if (!cryptPass || user === null) {
                const message = 'Usuario o contraseña incorrectos.';
                const err = new Error(message) as CustomError;
                err.status = 404;
                throw err;
            }

            // Generate JWT.
            const token = generateJwt(user.id, user.username);

            return { status: 'OK', user, token };

        } catch (error) {
            throw error;
        }
    }

    /**
     * Registers a new user in the system.
     * 
     * @param name - The name of the user.
     * @param username - The username of the user.
     * @param email - The email address of the user.
     * @param password - The password of the user.
     * @param img - The URL of the user's profile image.
     * @returns An object containing the new user, a JWT token and a status message.
     * @throws {CustomError} When there's a validation error (status 422) or an unexpected error (status 500).
     */
    async register(name: string, username: string, email: string, password: string, img: string): Promise<any> {
        try {
            const passBcrypt = encrypt(password); //Encrypt the password
            const newUser: any = await userModel.create({ name, username, email, password: passBcrypt, img });

            const token = generateJwt(newUser.id, newUser.username); //Generate JWT
            return { status: 'OK', user: newUser, token }

        } catch (error) {
            if (error instanceof ValidationError) {
                const message = error.errors[0]?.message || 'Error en la validación del formulario';
                const err = new Error(message) as CustomError;
                err.status = 422;
                throw err;
            }

            throw new Error('Unexpected error');
        }
    }

    async updateUser(id: string, name: string, username: string, email: string) {
        try {
            const user = await userModel.update(
                { name, username, email },
                { where: { id } }
            );
            return { status: 'OK', user }
        } catch (error) {
            if (error instanceof ValidationError) {
                const message = error.errors[0]?.message || 'Error en la validación del formulario';
                const err = new Error(message) as CustomError;
                err.status = 409;
                throw err;
            }

            throw new Error('Unexpected error');
        }
    }

    async renewToken(token: string) {
        if (!token) {
            throw {
                status: 401,
                message: 'Error en el token.'
            }
        }

        try {
            const { id, username } = validateJWT(token) as JwtPayload;
            const newToken = generateJwt(id, username);
            return { status: 'OK', userId: id, username, token: newToken };

        } catch (error) {
            throw {
                status: 401,
                message: 'Token no válido'
            };
        }
    }
}

const userService = new UserService();
export default userService;