import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.conexion' // Conexion to DDBB.

export const passwordModel = sequelize.define('passwords', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});