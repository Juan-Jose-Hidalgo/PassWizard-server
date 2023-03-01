import { Router } from "express";
import { readdirSync } from 'fs'; //This import is necessary to read the files from the paths directory.

const PATH_ROUTER = `${__dirname}`; //__dirname returns the path to the current directory.
const router = Router();

/**
 * Clean up the names by removing the extension to use them as routes.
 * item.route.ts => item.route
 * 
 * @param fileName 
 * @returns returs filename without extension.
 */
const cleanFileName = (fileName: string) => {
    const file = fileName.split('.').shift();
    return file;
}

/**
 * It is in charge of reading how many and which files exist in the directory.
 */
readdirSync(PATH_ROUTER).filter((fileName) => {
    const cleanName = cleanFileName(fileName);

    //The index file is not a path, so it is of no interest.
    if (cleanName !== 'index') {
        //Dynamic import of route files.
        import(`./${cleanName}`)
            .then((moduleRouter) => {
                router.use(`/${cleanName}`, moduleRouter.router); //*moduleRouter.router is the router for each route file.
            });
    }
});

export { router };