import jwt from 'jsonwebtoken';

export const generateJwt = (id: string) => {
    const key = `${process.env.JWT_SECRET}`;
    return jwt.sign({ id }, key, { expiresIn: 60 * 60 * 12 });
}