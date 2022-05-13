import { sequelize } from '../config/connection';
import { DataTypes } from 'sequelize';

export const project = sequelize.define('project', {
    projectID: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
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
