import { JwtPayload } from "jsonwebtoken";
import { ValidationError } from "sequelize";
import CustomErrorClass from "../errors/custom-error.class";

import { compare, encrypt } from "../helpers/bcrypt.helper";
import { extractCredentials } from "../helpers/extract-credentials.helper";
import { generateJwt, validateJWT } from "../helpers/jwt.helper";
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
     * Registers a new user in the database and returns a JWT token and the user data.
     * 
     * @param name The name of the user.
     * @param username The username of the user. Must be unique.
     * @param email The email of the user. Must be valid and unique.
     * @param password The password of the user.
     * @param img The image URL of the user. Optional.
     * @returns An object with status, user and token properties if successful, or an error if not.
     * @throws {CustomErrorClass} If any validation error occurs in the user model schema.
     * @throws {Error} If any unexpected error occurs in the database or JWT generation process.
     */
    async register(name: string, username: string, email: string, password: string, img: string) {
        try {
            const passBcrypt = encrypt(password); //Encrypt the password
            const newUser: any = await userModel.create({ name, username, email, password: passBcrypt, img });

            const token = generateJwt(newUser.id, newUser.username, newUser.img); //Generate JWT
            return { status: 'OK', user: newUser, token }

        } catch (error) {
            if (error instanceof ValidationError) throw new CustomErrorClass(error.errors[0]?.message, 422);
            throw new Error('Error inesperado.');
        }
    }

    /**
     * Renews the JWT token of a user and returns it along with the user data.
     * 
     * @param token The current JWT token of the user. Must be valid.
     * @returns An object with status, user and token properties if successful, or an error if not.
     * @throws {CustomErrorClass} If the token is missing or invalid, or if any validation error occurs in finding the user by id.
     * @throws {Error} If any unexpected error occurs in the database or JWT generation process.
     */
    async renewToken(token: string) {
        // Check if the token is provided
        if (!token) throw new CustomErrorClass('Error en el token de acceso.', 401);

        try {
            // Decode the token and get the payload
            const { id, username, img } = validateJWT(token) as JwtPayload;

            // Generate a new token with the same payload
            const newToken = generateJwt(id, username, img);

            // Find the user by id in the database
            const user = await userModel.findByPk(id);

            return { status: 'OK', user, token: newToken };

        } catch (error) {
            // Handle validation errors or other errors
            if (error instanceof ValidationError) throw new CustomErrorClass(error.errors[0]?.message, 404);
            throw new Error('Error inesperado.');
        }
    }
}

const authService = new AuthService();
export default authService;


