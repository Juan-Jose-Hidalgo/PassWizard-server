import fs from 'fs';
import CustomErrorClass from '../errors/custom-error.class';

/**
 * Deletes a file by name
 * @param fileName The name of the file to delete
 * @throws A custom error with status 415 if the file does not exist or cannot be deleted
 */
export const deleteFile = (fileName: string) => {
    // Get the path of the file
    const path = fileName;
    // Delete the file using fs module
    fs.unlink(path, (err) => {
        if (err) throw new CustomErrorClass('Error al borrar la imagen', 415);
    });
}