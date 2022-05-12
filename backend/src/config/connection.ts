//Dependencies import
import { Sequelize } from 'sequelize';
import mysql from 'mysql2';
import { Logger } from 'tslog';

//Initialize logger
const log: Logger = new Logger();

//MySQL Login Credintials
const MYSQLHOST = process.env.MYSQLHOST || 'localhost';
const MYSQLUSER = process.env.MYSQLUSER || 'root';
const MYSQLPASS = process.env.MYSQLPASS || '1234';
const MYSQLDB = process.env.MYSQLDB || 'testDB';

log.info(MYSQLPASS);

export const sequelize = new Sequelize(`mysql://${MYSQLUSER}:${MYSQLPASS}@${MYSQLHOST}:3306/${MYSQLDB}`, {
    logging: false,
});

export function createDatabase() {
    return new Promise<void>((resolve) => {
        // Open the connection to MySQL server
        const connection = mysql.createConnection({
            host: MYSQLHOST,
            user: MYSQLUSER,
            password: MYSQLPASS,
        });

        // Run create database statement
        connection.query(`CREATE DATABASE IF NOT EXISTS ${MYSQLDB}`, () => {
            log.info(`Database "${MYSQLDB}" was created successfully.`);
            resolve();
        });

        // Close the connection
        connection.end();
    });
}
