//External Dependencies Import
import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';

//Internal Dependencies Import
import { sequelize } from '../config/connection';

const user = sequelize.define('user', {
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

user.addHook('beforeCreate', async (user: any) => {
    user.password = await bcrypt.hash(user.password, 10);
});

export default user;
