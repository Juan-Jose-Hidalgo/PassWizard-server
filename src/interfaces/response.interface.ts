import { UserInterface } from "./models.interface";

interface AppResponse {
    status: string;
}

export interface TokenResponse extends AppResponse {
    userId: number;
    username: string;
    token: string;
}

export interface UserResponse extends AppResponse {
    user: UserInterface | UserInterface[];
    token?: string;
}
