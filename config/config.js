require('dotenv').config();

module.exports = {
    development: {
        username: process.env.DB_USERNAME || 'postgres',
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME || 'secondhand',
        host: process.env.DB_HOST || 'localhost',
        dialect: process.env.DB_DIALECT || 'postgres'
    },
    test: {
        username: process.env.CI_DB_USERNAME || 'postgres',
        password: process.env.CI_DB_PASSWORD,
        database: process.env.CI_DB_NAME || 'secondhand_test',
        host: process.env.CI_DB_HOST || 'localhost',
        dialect: process.env.CI_DB_DIALECT || 'postgres',
        logging: false
    },
    production: {
        username: process.env.PROD_DB_USERNAME,
        password: process.env.PROD_DB_PASSWORD,
        database: process.env.PROD_DB_NAME,
        host: process.env.PROD_DB_HOST,
        dialect: process.env.PROD_DB_DIALECT,
        logging: false,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    }
};
