import { CategoryInterface } from "./category-interface";
import { UserInterface } from "./user.inteface";

export interface AppResponse {
    status: string;
    data: {
        category?: CategoryInterface | CategoryInterface[];
        user?: UserInterface;
        token?: string;
    }
}