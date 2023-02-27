import { JwtPayload } from "jsonwebtoken";
import { ValidationError } from "sequelize";
import { sequelize } from "../database/database.conexion";
import CustomErrorClass from "../errors/custom-error.class";

import { compare, encrypt } from "../helpers/bcrypt.helper";
import { deleteFile } from "../helpers/delete-img.helper";
import { generateJwt, validateJWT } from "../helpers/jwt.helper";
import { CustomError } from "../interfaces/error.interface";
import { UserResponse } from "../interfaces/response.interface";
import { categoryModel } from "../models/category.model";
import { passwordModel } from "../models/password.model";
import { userModel } from "../models/user.model";

class UserService {


    async updateUser(id: string, name: string, username: string, email: string) {
        try {
            const [rowsUpdated, [updatedUser]] = await userModel.update(
                { name, username, email },
                { where: { id }, returning: true }
            );
            return { status: 'OK', user: updatedUser }
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

    async updateImage(id: string, img: string | undefined, olderImg: string) {

        if (img === undefined) {
            const message = 'Formato de imagen no permitido. Solo se admiten imágenes en formato .jpeg, .jpg o .png';
            const err = new Error(message) as CustomError;
            err.status = 415;
            throw err
        }

        try {
            if (olderImg !== 'uploads/user.png') {
                deleteFile(olderImg)
            };

            const [rowsUpdated, [updatedUser]] = await userModel.update({ img }, { where: { id }, returning: true });
            return { status: 'OK', user: updatedUser }

        } catch (error) {
            if (error instanceof ValidationError) {
                const message = error.errors[0]?.message || 'Error al actualizar la imagen de perfil.';
                const err = new Error(message) as CustomError;
                err.status = 404;
                throw err;
            }
            throw new Error('Unexpected error');
        }
    }

    async updateUserPassword(id: string, password: string): Promise<any> {
        try {
            password = encrypt(password); //Encrypt the password
            const user = await userModel.update({ password }, { where: { id } });
            return { status: 'OK', user }

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


    /**
    * Deletes an user account and all the related data from the database.
    * 
    * @param id The id of the user to be deleted.
    * @throws {CustomErrorClass} If the user data is invalid or not authorized.
    * @throws {Error} If an unexpected error occurs.
    */
    async deleteAccount(id: string) {
        // Start a managed transaction.
        const dbTransaction = await sequelize.transaction();

        try {
            // Find the user by id.
            const user: any = await userModel.findByPk(id);

            // Delete the user image file if it is not the default one.
            if (user.img !== 'uploads/user.png') deleteFile(user.img);

            // Create an array of promises to delete the passwords, categories and user records.
            const promises = [
                passwordModel.destroy({ where: { userId: id }, transaction: dbTransaction }),
                categoryModel.destroy({ where: { userId: id }, transaction: dbTransaction }),
                userModel.destroy({ where: { id }, transaction: dbTransaction }),
            ];

            // Execute the promises in parallel.
            await Promise.all(promises);

            // Commit the transaction.
            await dbTransaction.commit();

        } catch (error) {
            // Rollback the transaction.
            await dbTransaction.rollback();

            // Errors.
            if (error instanceof ValidationError) throw new CustomErrorClass(error.errors[0]?.message, 400);
            throw new Error('Unexpected error.');
        }
    }
}

const userService = new UserService();
export default userService;