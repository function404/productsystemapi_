const database = require('../config/database')
const Category = require('./category')

class Product {
   constructor() {
      this.model = database.define('product', {
         id: {
            type: database.Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
         },
         name: {
            type: database.Sequelize.STRING,
            unique: true,
         },
         price: {
            type: database.Sequelize.DECIMAL(10, 2),
         },
         quantity: {
            type: database.Sequelize.INTEGER
         },
         description: {
            type: database.Sequelize.STRING
         },
         categoryId: {
            type: database.Sequelize.INTEGER,
            references: {
               model: Category,
               key: 'id',
            }
         }
      })
   }
}

module.exports = (new Product).model