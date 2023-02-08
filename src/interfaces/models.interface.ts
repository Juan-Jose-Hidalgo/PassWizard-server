interface Model {
    id: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface CategoryInterface extends Model {
    name: string;
}

export interface UserInterface extends Model {
    name: string;
    username: string;
    email: string;
    password: string;
}

export interface PasswordInterface extends Model {
    userId: number;
    categoryId: number;
    description: string;
    password: string;
}