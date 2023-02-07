import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.conexion' // Conexion to DDBB.

export const passwordModel = sequelize.define('passwords', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});