//External Dependencies Import
import inquirer from 'inquirer';
import { Logger } from 'tslog';
import * as dotenv from 'dotenv';

//Configuring dotenv
dotenv.config();

//Internal Dependencies Import
import { sequelize, createDatabase } from './config/connection';
import establishRelations from './config/relations';

//Initialize logger
const log: Logger = new Logger();

//Models import
import { user } from './models';

(async () => {
    // Create db if it doesn't exist
    await createDatabase();

    // Validate connection
    await sequelize.authenticate();
    log.info('Connection has been established successfully to MySQL.');

    // Establish relations
    await establishRelations();

    log.info('This guide will help you create a new user in the database.');

    const username = await inquirer.prompt([
        {
            type: 'input',
            name: 'username',
            message: 'What is the username?',
        },
    ]);

    const password = await inquirer.prompt([
        {
            type: 'password',
            name: 'password',
            message: 'What is the password?',
        },
    ]);

    const passwordConfirm = await inquirer.prompt([
        {
            type: 'password',
            name: 'passwordConfirm',
            message: 'Confirm the password?',
        },
    ]);

    if (password.password !== passwordConfirm.passwordConfirm) {
        console.log('Passwords do not match');
        return;
    }

    // Create the user
    await user.create({
        username: username.username,
        password: password.password,
    });

    log.info('User created successfully.');
    process.exit(0);
})();
