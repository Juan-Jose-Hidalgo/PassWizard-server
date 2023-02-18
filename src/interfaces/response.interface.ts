import { Error } from "sequelize";
import { UserInterface } from "./models.interface";

interface AppResponse {
    status: string;
    message?: string; //Error message.
}

export interface TokenResponse extends AppResponse {
    userId: number;
    username: string;
    token: string;
}

export interface UserResponse extends AppResponse {
    user: UserInterface;
    token?: string;
}
