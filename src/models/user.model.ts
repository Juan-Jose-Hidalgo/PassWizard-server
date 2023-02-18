import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.conexion' // Conexion to DDBB.
import { categoryModel } from './category.model';
import { passwordModel } from './password.model';

export const userModel = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    img: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
});

//*Relationships

userModel.hasMany(categoryModel, {
    foreignKey: 'userId',
    sourceKey: 'id'
});

passwordModel.belongsTo(userModel, {
    foreignKey: 'userId',
    targetKey: 'id'
})

userModel.hasMany(passwordModel, {
    foreignKey: 'userId',
    sourceKey: 'id'
});

passwordModel.belongsTo(userModel, {
    foreignKey: 'userId',
    targetKey: 'id'
});