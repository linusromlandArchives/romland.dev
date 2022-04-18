//External Dependencies import
import express from 'express';
import ip from 'ip';
import * as dotenv from 'dotenv';
import { Logger } from 'tslog';

//Initialize logger
const log: Logger = new Logger();

//Configuring dotenv
if (process.env.NODE_ENV === 'development') dotenv.config();

//Variable Declarations
const port = process.env.PORT || 3000;

//Configuring express
const app = express();
app.use(express.json());

//Routes import
import apiRoutes from './routes/apiRoutes';

app.use('/api/', apiRoutes);

//Add Frontend Build
//app.use('/', express.static(path.join(path.resolve(), '../frontend/dist')));

app.listen(port, () => {
    log.info(
        `\nApp running at:\n- Local: \x1b[36mhttp://localhost:${port}/\x1b[0m\n- Network \x1b[36mhttp://${ip.address()}:${port}/\x1b[0m\n\nTo run for production, run \x1b[36mnpm run start\x1b[0m`,
    );
});
