import { JwtPayload } from "jsonwebtoken";
import { ValidationError } from "sequelize";
import CustomErrorClass from "../errors/custom-error.class";

import { compare, encrypt } from "../helpers/bcrypt.helper";
import { deleteFile } from "../helpers/delete-img.helper";
import { extractCredentials } from "../helpers/extract-credentials.helper";
import { generateJwt, validateJWT } from "../helpers/jwt.helper";
import { CustomError } from "../interfaces/error.interface";
import { UserResponse } from "../interfaces/response.interface";
import { categoryModel } from "../models/category.model";
import { passwordModel } from "../models/password.model";
import { userModel } from "../models/user.model";

class AuthService {
    /**
     * This method attempts to log in a user with the given credentials.
     * 
     * @param authHeader A string containing the email and password of the user encoded in base64.
     * @returns An object with the status, user data and token if the login is successful, or throws an error otherwise.
     * @throws {CustomErrorClass} If the email or password are incorrect or not found in the database.
     */
    async login(authHeader: string) {
        try {
            // Decode the authHeader and extract the email and password
            const { email, password } = extractCredentials(authHeader);

            // Find the user with the given email in the database
            const user: any = await userModel.findOne({ where: { email } });

            // If no user is found, throw an error with status 404
            if (!user) throw new CustomErrorClass('Usuario o contraseña incorrectos.', 404);

            // Compare the given password with the hashed password stored in the database
            const passwordMatch = compare(password, user.password);

            // If the passwords do not match, throw an error with status 404
            if (!passwordMatch) throw new CustomErrorClass('Usuario o contraseña incorrectos.', 404);

            // Generate a JSON Web Token (JWT) with some user data as payload
            const token = generateJwt(user.id, user.username, user.img);

            // Return an object with status OK and the user data and token
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
     * @throws {CustomErrorClass} When there's a validation error (status 422) or an unexpected error (status 500).
     */
    async register(name: string, username: string, email: string, password: string, img: string) {
        try {
            const passBcrypt = encrypt(password); //Encrypt the password
            const newUser: any = await userModel.create({ name, username, email, password: passBcrypt, img });

            const token = generateJwt(newUser.id, newUser.username, newUser.img); //Generate JWT
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

    async renewToken(token: string) {
        if (!token) {
            const message = 'Error en el token de acceso';
            const err = new Error(message) as CustomError;
            err.status = 401;
            throw err;
        }

        try {
            const { id, username, img } = validateJWT(token) as JwtPayload;
            const newToken = generateJwt(id, username, img);
            const user = await userModel.findByPk(id);
            return { status: 'OK', user, token: newToken };

        } catch (error) {
            if (error instanceof ValidationError) {
                const message = error.errors[0]?.message || 'Err al actualizar la contraseña';
                const err = new Error(message) as CustomError;
                err.status = 404;
                throw err;
            }
            throw new Error('Unexpected error');
        }
    }

    async deleteAccount(id: string) {
        try {
            const user: any = await userModel.findByPk(id);

            if (user.img !== 'uploads/user.png') {
                deleteFile(user.img)
            };

            await passwordModel.destroy({ where: { userId: id } });
            await categoryModel.destroy({ where: { userId: id } });
            await userModel.destroy({ where: { id } });

        } catch (error) {
            if (error instanceof ValidationError) {
                const message = error.errors[0]?.message || 'Err al actualizar la contraseña';
                const err = new Error(message) as CustomError;
                err.status = 404;
                throw err;
            }
            throw new Error('Unexpected error');
        }
    }
}

const authService = new AuthService();
export default authService;


