const dotenv = require("dotenv");

dotenv.config();

const env = process.env;

const development = {
  username: env.USER_NAME,
  password: env.DB_PASSWORD,
  database: env.DATABASE,
  host: env.DB_HOST,
  dialect: env.DB_DIALECT,
  port: env.DB_PORT,
  operatorsAliases: false,
};

const test = {
  username: env.USER_NAME,
  password: env.DB_PASSWORD,
  database: env.DATABASE,
  host: env.DB_HOST,
  dialect: env.DB_DIALECT,
  port: env.DB_PORT,
  operatorsAliases: false,
};

const production = {
  username: env.USER_NAME,
  password: env.DB_PASSWORD,
  database: env.DATABASE,
  host: env.DB_HOST,
  dialect: env.DB_DIALECT,
  port: env.DB_PORT,
  operatorsAliases: false,
};

module.exports = { development, test, production };
