import fs from 'fs';
import { CustomError } from '../interfaces/error.interface';

export const deleteFile = (fileName: string) => {
    const path = fileName;
    fs.unlink(path, (err) => {
        if (err) {
            const err = new Error() as CustomError;
            err.status = 415;
            throw err
        }
        console.log(`El archivo ${fileName} ha sido eliminado.`);
    });
}