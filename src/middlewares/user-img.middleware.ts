import crypto from 'crypto';
import multer, { FileFilterCallback } from "multer";
import path from 'path';
import { NextFunction, Request, Response } from "express";

const IMAGE_MIMETYPES: string[] = ["image/jpeg", "image/jpg", "image/png"];
const MAX_IMAGE_SIZE: number = 1024 * 1024;

/**
 * Middleware function for handling image uploads using Multer.
 * 
 * @param req The Express request object.
 * @param res The Express response object.
 * @param next The next middleware function.
 * @returns void
 */
const uploadImage = (req: Request, res: Response, next: NextFunction): void => {
    return multer({
        storage: multer.diskStorage({
            destination: 'uploads',
            filename: (req: Request, file, callback) => {
                const uuid = crypto.randomUUID();
                callback(null, uuid + path.extname(file.originalname));
            },
        }),
        limits: { fileSize: MAX_IMAGE_SIZE },
        fileFilter: (req: Request, file: Express.Multer.File, callback: FileFilterCallback) => {
            const isImage = IMAGE_MIMETYPES.includes(file.mimetype);
            callback(null, isImage);
        },
    }).single('img')(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            // The uploaded image exceeded the maximum size.
            return res.status(400).send({ status: 'Failed', message: 'The maximum allowed size is 1MB.' });
        }

        if (err) {
            // An error occurred during the image upload process.
            return res.status(400).send({ status: 'Failed', message: err.message });
        }

        // Move on to the next middleware function.
        next();
    });
};

export default uploadImage;