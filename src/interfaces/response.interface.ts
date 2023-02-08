import { CategoryInterface, PasswordInterface, UserInterface } from "./models.interface";

export interface AppResponse {
    status: string;
    data: {
        category?: CategoryInterface | CategoryInterface[];
        password?: PasswordInterface | PasswordInterface[];
        user?: UserInterface;
        token?: string;
    }
}