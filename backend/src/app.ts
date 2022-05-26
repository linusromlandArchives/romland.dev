//External Dependencies import
import express from 'express';
import flash from 'express-flash';
import fileupload from 'express-fileupload';
import session from 'express-session';
import ip from 'ip';
import * as dotenv from 'dotenv';
import { Logger } from 'tslog';
import path from 'path';
import history from 'connect-history-api-fallback';

//Configuring dotenv
dotenv.config();

//Internal dependencies import
import { sequelize, createDatabase } from './config/connection';
import { initializePassport, passport } from './config/passport';
import establishRelations from './config/relations';

//Initialize logger
const log: Logger = new Logger();

//Variable Declarations
const port = process.env.PORT || 3000;
const sessionSecret = (process.env.SESSION_SECRET as string) || 'secret';
const sessionOptions = {
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
};

//Configuring express
const app = express();
app.use(session(sessionOptions));
app.use(fileupload());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//Routes import
import apiRoutes from './routes/api.routes';
app.use('/api/', apiRoutes);

(async () => {
    try {
        // Create db if it doesn't exist
        await createDatabase();

        // Validate connection
        await sequelize.authenticate();
        log.info('Connection has been established successfully to MySQL.');

        // Establish relations
        await establishRelations();

        // Sync models
        await sequelize.sync();

        //Serve static files from the React app
        app.use(history());
        app.use('/', express.static(path.join(path.resolve(), '../frontend/dist')));

        //Initialize passport
        initializePassport();

        app.listen(port, () => {
            log.info(
                `\nApp running at:\n- Local: \x1b[36mhttp://localhost:${port}/\x1b[0m\n- Network \x1b[36mhttp://${ip.address()}:${port}/\x1b[0m\n\nTo run for production, run \x1b[36mnpm run start\x1b[0m`,
            );
        });
    } catch (error) {
        console.log(error);
    }
})();
