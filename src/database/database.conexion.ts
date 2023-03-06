import { Sequelize } from 'sequelize';

const db = `${process.env.PGDATABASE}`;
const user = `${process.env.PGUSER}`;
const pass = `${process.env.PGPASSWORD}`;
const host = `${process.env.PGHOST}`;
const port = `${process.env.PGPORT}`;

export const sequelize = new Sequelize(`postgresql://${user}:${pass}@${host}:${port}/${db}`, {
    dialect: 'postgres',
    logging: false
});