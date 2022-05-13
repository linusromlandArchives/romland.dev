import { sequelize } from '../config/connection';
import { DataTypes } from 'sequelize';

export const programmingLanguage = sequelize.define('programmingLanguage', {
    programmingLanguageID: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    programmingLanguageName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    programmingLanguageDescription: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    programmingLanguageIcon: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    programmingLanguageURL: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});
