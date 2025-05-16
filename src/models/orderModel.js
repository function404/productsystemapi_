const database = require('../config/database')
const User = require('./userModel')

class Order {
   constructor() {
      this.model = database.define('order', {
         id: {
            type: database.Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
         },
         userId: {
            type: database.Sequelize.INTEGER,
            references: {
               model: User,
               key: 'id'
            }
         },
      })
   }
}

module.exports = (new Order).model