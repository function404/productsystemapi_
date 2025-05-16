const database = require('../config/database')

class Category {
   constructor() {
      this.model = database.define('category', {
         id: {
            type: database.Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
         },
         name: {
            type: database.Sequelize.STRING,
            unique: true
         }
      })
   }
}

module.exports = (new Category).model