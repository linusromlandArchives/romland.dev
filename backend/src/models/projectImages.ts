import { sequelize } from '../config/connection';
import { DataTypes } from 'sequelize';

const projectImages = sequelize.define('projectImages', {
    projectImagesID: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    projectImagesFileName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
});

export default projectImages;
