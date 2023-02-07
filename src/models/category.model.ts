import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.conexion' // Conexion to DDBB.
import { passwordModel } from './password.model';

export const categoryModel = sequelize.define('categories', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
});

//*Relationships

categoryModel.hasMany(passwordModel, {
    foreignKey: 'categoryId',
    sourceKey: 'id'
});

passwordModel.belongsTo(categoryModel, {
    foreignKey: 'categoryId',
    targetKey: 'id'
});