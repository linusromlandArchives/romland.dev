//External Dependencies Import
import { DataTypes } from 'sequelize';

//Internal Dependencies Import
import { sequelize } from '../config/connection';

export const user = sequelize.define('user', {
    userID: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});
