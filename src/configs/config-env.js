require('dotenv').config();
module.exports = {
  PORT: process.env.PORT,
  HOST_SERVER_NAME: process.env.HOST_SERVER_NAME,
  DB_HOST: process.env.DB_HOST,
  JWT_SECRET: process.env.JWT_SECRET,
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD
}