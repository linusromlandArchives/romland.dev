//External Dependencies import
import express from 'express';
import fileupload from 'express-fileupload';
import ip from 'ip';
import * as dotenv from 'dotenv';
import { Logger } from 'tslog';

//Configuring dotenv
dotenv.config();

//Internal dependencies import
import { sequelize, createDatabase } from './config/connection';

//Initialize logger
const log: Logger = new Logger();

//Variable Declarations
const port = process.env.PORT || 3000;

//Configuring express
const app = express();
app.use(fileupload());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes import
import apiRoutes from './routes/api.routes';
app.use('/api/', apiRoutes);

//Models import
import { programmingLanguage, project, projectImages } from './models/models';

//Add Frontend Build
//app.use('/', express.static(path.join(path.resolve(), '../frontend/dist')));

(async () => {
    try {
        // Create db if it doesn't exist
        await createDatabase();

        // Validate connection
        await sequelize.authenticate();
        log.info('Connection has been established successfully to MySQL.');

        // Establish relations
        project.belongsToMany(programmingLanguage, { through: 'projectProgrammingLanguage' });
        programmingLanguage.belongsToMany(project, { through: 'projectProgrammingLanguage' });

        projectImages.belongsTo(project, { foreignKey: 'projectID' });
        project.hasMany(projectImages, { foreignKey: 'projectID' });

        // Sync models
        await sequelize.sync({ alter: true });

        app.listen(port, () => {
            log.info(
                `\nApp running at:\n- Local: \x1b[36mhttp://localhost:${port}/\x1b[0m\n- Network \x1b[36mhttp://${ip.address()}:${port}/\x1b[0m\n\nTo run for production, run \x1b[36mnpm run start\x1b[0m`,
            );
        });
    } catch (error) {
        console.log(error);
    }
})();
