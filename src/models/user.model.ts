import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.conexion' // Conexion to DDBB.
import { passwordModel } from './password.model';

export const userModel = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

//*Relationships

userModel.hasMany(passwordModel, {
    foreignKey: 'userId',
    sourceKey: 'id'
});

passwordModel.belongsTo(userModel, {
    foreignKey: 'userId',
    targetKey: 'id'
});