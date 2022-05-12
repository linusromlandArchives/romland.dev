import { sequelize } from '../config/connection';
import { DataTypes } from 'sequelize';

export const projectImages = sequelize.define('projectImages', {
    projectImagesID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    projectImagesFileName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
});
