const Sequelize = require('sequelize')
require('dotenv').config()

class Database extends Sequelize {
   constructor() {
      super(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
         host: process.env.DB_HOST,
         dialect: process.env.DB_DIALECT,
         logging: process.env.DB_LOGGING === 'true',
      });
   }
}

module.exports = new Database();