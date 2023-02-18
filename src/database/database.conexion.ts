import { Sequelize } from 'sequelize';

const db = `${process.env.DATABASE}`;
const user = `${process.env.USERDB}`;
const pass = `${process.env.PASSWORDDB}`;

export const sequelize = new Sequelize(db, user, pass, {
    host: 'localhost',
    dialect: 'postgres',
    logging: false,
});