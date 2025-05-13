const database = require('../config/database')

class User {
   constructor() {
      this.model = database.define('user', {
         id: {
            type: database.Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
         },
         name: {
            type: database.Sequelize.STRING,
         },
         email: {
            type: database.Sequelize.STRING,
            unique: true,
         },
         password: {
            type: database.Sequelize.STRING,
         },
      })
   }
}

module.exports = (new User).model
