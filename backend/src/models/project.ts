import { sequelize } from '../config/connection';
import { DataTypes } from 'sequelize';

export const project = sequelize.define('project', {
    projectID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    projectName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    projectDescription: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    projectSourceCodeURL: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    projectURL: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});
