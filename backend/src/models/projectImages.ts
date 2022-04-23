import { sequelize } from '../config/connection';
import { DataTypes } from 'sequelize';
import { programmingLanguage } from './models';

export const projectImages = sequelize.define('projectImages', {
    projectImagesID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    projectImagesURL: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    programmingLanguageIcon: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    programmingLanguageProjectID: {
        type: DataTypes.INTEGER,
        references: {
            model: programmingLanguage,
            key: 'programmingLanguageID',
        },
    },
});
