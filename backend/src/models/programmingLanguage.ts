import { sequelize } from '../config/connection';
import { DataTypes } from 'sequelize';

export const programmingLanguage = sequelize.define('programmingLanguage', {
    programmingLanguageID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    programmingLanguageName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
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
