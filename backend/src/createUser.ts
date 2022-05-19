//External Dependencies Import
import inquirer from 'inquirer';
import bcrypt from 'bcrypt';

//Local Dependencies Import
import { sequelize, createDatabase } from './config/connection';

import { user } from './models';

(async () => {
    console.log('This guide will help you create a new user in the database.');

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

    // Create db if it doesn't exist
    await createDatabase();

    // Validate connection
    await sequelize.authenticate();
    console.log('Connection has been established successfully to MySQL.');

    // Hash the password
    const hashedPassword = await bcrypt.hash(password.password, 10);

    // Create the user
    await user.create({
        username: username.username,
        password: hashedPassword,
    });

    console.log('User created successfully.');
    process.exit(0);
})();
