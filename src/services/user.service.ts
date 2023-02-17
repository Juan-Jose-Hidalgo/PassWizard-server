import { JwtPayload } from "jsonwebtoken";

import { TokenResponse, UserResponse } from "../interfaces/response.interface";
import { compare, encrypt } from "../helpers/bcrypt.helper";
import { generateJwt, validateJWT } from "../helpers/jwt.helper";
import { userModel } from "../models/user.model";

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
                throw {
                    status: 404,
                    message: 'Email o contraseña incorrectos.'
                }
            }

            // Generate JWT.
            const token = generateJwt(user.id, user.username);

            return { status: 'OK', user: user, token };

        } catch (error) {
            throw error;
        }
    }

    /**
     * Register a new user in the database.
     * 
     * Encripta su password y genera un nuevo JWT.
     * 
     * Returns a response of type UserResponse.
     * 
     * @param name ```string```
     * @param username ```string```
     * @param email ```string```
     * @param password ```string```
     * @returns ```Promise<UserResponse>```
     */
    async register(name: string, username: string, email: string, password: string, img: string | null): Promise<UserResponse> {
        try {
            const passBcrypt = encrypt(password); // Password encrypt.
            const newUser: any = await userModel.create({ name, username, email, password: passBcrypt, img });
            // Generate JWT.
            const token = generateJwt(newUser.id, newUser.username);
            return { status: 'OK', user: newUser, token };

        } catch (error: any) {
            throw {
                status: 400,
                message: error.errors[0].message
            };
        }
    }

    async renewToken(token: string): Promise<TokenResponse> {
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