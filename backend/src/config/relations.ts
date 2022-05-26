//Models import
import { programmingLanguage, project, projectImages } from '../models';

/**
 * @description Function that establishes the relations between the models
 */
export default async () => {
    // Establish Many-to-Many relationship between programmingLanguage and project
    await project.belongsToMany(programmingLanguage, { through: 'projectProgrammingLanguage', foreignKey: 'projectID' });
    await programmingLanguage.belongsToMany(project, { through: 'projectProgrammingLanguage', foreignKey: 'programmingLanguageID' });

    // Establish One-to-Many relationship between project and projectImages
    await projectImages.belongsTo(project, { foreignKey: 'projectID' });
    await project.hasMany(projectImages, { foreignKey: 'projectID' });
};
