import { UserInterface } from "./user.inteface";

export interface UserResponse {
    status: string;
    data: {
        user: UserInterface;
        token: string;
    }
}