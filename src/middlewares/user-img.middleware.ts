import crypto from 'crypto';
import multer, { FileFilterCallback } from "multer";
import path from 'path';
import { NextFunction, Request, Response } from "express";

const MIMETYPES = ["image/jpeg", "image/jpg", "image/png"];
const maxSize = 1024 * 1024;


//Store the image and rename it.
const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req: Request, file, callback) => {
        const uuid = crypto.randomUUID();
        callback(null, uuid + path.extname(file.originalname));
    },
});

//Check if the file is an image.
const fileFilter = (req: Request, file: Express.Multer.File, callback: FileFilterCallback) => {
    if (MIMETYPES.includes(file.mimetype)) return callback(null, true);
    return callback(null, false);
}

const upload = (req: Request, res: Response, next: NextFunction) => {
    return multer({
        storage,
        limits: { fileSize: maxSize },
        fileFilter,
    }).single('img')(req, res, (err) => {
        //Image size limit exceeded.
        if (err instanceof multer.MulterError) {
            return res.status(400).send({ status: 'Failed', message: 'El tamaño máximo permitido es de 1MB.' })
        }

        //Mimetypes format not allowed.
        if (!req.file) {
            return res.status(400).send({ status: 'Failed', message: 'Solo se aceptan los siguientes formatos: .jpeg, .jpg o .png' });
        };

        //Other errors.
        if (err) return res.status(400).send({ status: 'Failed', message: err.message });
        next();
    });
}

export default upload;