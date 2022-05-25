//External Dependencies Import
import { DataTypes } from 'sequelize';

//Local Dependencies Import
import { sequelize } from '../config/connection';

const project = sequelize.define('project', {
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
    projectVisible: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    projectFeatured: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
});

project.addHook('afterUpdate', async (project: any) => {
    if (project.changed('projectVisible') && project.projectVisible) project.projectFeatured = false;
});

export default project;
