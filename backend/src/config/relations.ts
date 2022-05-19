//Models import
import { programmingLanguage, project, projectImages } from '../models';

export default async () => {
    // Establish relations
    await project.belongsToMany(programmingLanguage, { through: 'projectProgrammingLanguage', foreignKey: 'projectID' });
    await programmingLanguage.belongsToMany(project, { through: 'projectProgrammingLanguage', foreignKey: 'programmingLanguageID' });

    await projectImages.belongsTo(project, { foreignKey: 'projectID' });
    await project.hasMany(projectImages, { foreignKey: 'projectID' });
};
