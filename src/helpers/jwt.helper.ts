import jwt from 'jsonwebtoken';

const key = `${process.env.JWT_SECRET}`;

//Generate JWT.
export const generateJwt = (id: string, username: string, img: string) => {
    return jwt.sign({ id, username, img }, key, { expiresIn: 60 * 60 * 12 });
}

//Validate JWT.
export const validateJWT = (token: string) => jwt.verify(token, key);


