import fs from 'fs';
import CustomErrorClass from '../errors/custom-error.class';


/**
 * Deletes a file from the uploads folder
 * @param fileName The name of the file to delete
 * @throws {CustomErrorClass} If there is an error while deleting the file
 */
export const deleteFile = (fileName: string) => {
    // Use fs.unlink to delete the file asynchronously
    fs.unlink(fileName, (err) => {
        if (err) throw new CustomErrorClass('Error al borrar la imagen', 415);
    });
};