import { ValidationError } from "sequelize";
import { sequelize } from "../database/database.conexion";
import CustomErrorClass from "../errors/custom-error.class";

import { encrypt } from "../helpers/bcrypt.helper";
import { deleteFile } from "../helpers/delete-img.helper";
import { updateUserSchema } from "../helpers/user-data-validate.helper";
import { CustomError } from "../interfaces/error.interface";
import { User } from "../interfaces/user-attributes.interface";
import { categoryModel } from "../models/category.model";
import { passwordModel } from "../models/password.model";
import { userModel } from "../models/user.model";

class UserService {
    /**
     * Updates an existing user in the database using a transaction.
     * 
     * @param user The user object to update.
     * @returns An object with the status and the updated user.
     * @throws {CustomErrorClass} If the user object is invalid or already exists.
     * @throws {Error} If an unexpected error occurs during the transaction.
     */
    async updateUser(user: User) {
        // Start a new transaction
        const transaction = await sequelize.transaction();
        try {
            // Validate the user object using a schema
            await updateUserSchema.validate(user);
            // Update the user in the database and get the updated row
            const [rowsUpdated, [updatedUser]] = await userModel.update(
                user,
                { where: { id: user.id }, returning: true, transaction }
            );
            // Commit the transaction
            await transaction.commit();

            return { status: 'OK', user: updatedUser }

        } catch (error) {
            // Rollback the transaction
            await transaction.rollback();
            // If the error is a validation error, throw a custom error with a 409 status code
            if (error instanceof ValidationError) throw new CustomErrorClass(error.errors[0]?.message, 409);
            // Otherwise, throw a generic error
            throw new Error('Error inesperado');
        }
    }

    /**
     * Updates the image of a user in the database and deletes the old image file if it exists.
     * 
     * @param id - The id of the user to update.
     * @param img - The new image path of the user.
     * @param olderImg - The old image path of the user.
     * @returns An object with the status and the updated user data.
     * @throws {CustomErrorClass} If img is undefined or invalid, or if there is a validation error when updating the user model.
     * @throws {Error} If there is an unexpected error during the update operation or the transaction rollback.
     */
    async updateImage(id: string, img: string | undefined, olderImg: string) {
        // Check if img is defined and valid
        if (img === undefined) throw new CustomErrorClass('Formato de imagen no permitido', 409);

        // Start a transaction to ensure atomicity
        const transaction = await sequelize.transaction();

        try {
            // Delete the old image file if it is not the default one
            if (olderImg !== 'uploads/user.png') deleteFile(olderImg);

            // Update the user model with the new image path and return the updated data
            const [rowsUpdated, [updatedUser]] = await userModel.update({ img }, { where: { id }, returning: true, transaction });

            // Commit the transaction if everything went well
            await transaction.commit();

            // Return an object with the status and the updated user data
            return { status: 'OK', user: updatedUser }

        } catch (error) {
            // Rollback the transaction if something went wrong
            await transaction.rollback();

            // Throw a custom error if there is a validation error when updating the user model
            if (error instanceof ValidationError) throw new CustomErrorClass(error.errors[0]?.message, 404);

            // Throw a generic error for any other unexpected error
            throw new Error('Unexpected error');
        }
    }

    /**
     * Updates the password of a user by its id.
     * 
     * @param id - The id of the user to update.
     * @param password - The new password for the user.
     * @returns A promise that resolves with an object containing the status and the updated user.
     * @throws A custom error if the validation fails or an unexpected error if something else goes wrong.
     */
    async updateUserPassword(id: string, password: string): Promise<any> {
        const transaction = await sequelize.transaction();

        try {
            password = encrypt(password); //Encrypt the password
            const user = await userModel.update({ password }, { where: { id }, transaction });
            await transaction.commit();
            return { status: 'OK', user }

        } catch (error) {
            await transaction.rollback();
            if (error instanceof ValidationError) throw new CustomErrorClass(error.errors[0]?.message, 404);
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