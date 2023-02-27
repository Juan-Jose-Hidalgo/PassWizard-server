import { CustomError } from "../interfaces/error.interface";

export default class CustomErrorClass implements CustomError {
    message: string;
    status: number;
    name: string;

    constructor(message: string, status: number) {
        this.message = message;
        this.status = status;
        this.name = 'CustomError';
    }
}
