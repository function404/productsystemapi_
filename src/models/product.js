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
            allowNull: false
         },
         price: {
            type: database.Sequelize.DECIMAL(10, 2),
            allowNull: false
         },
         quantity: {
            type: database.Sequelize.INTEGER
         },
         categoryId: {
            type: database.Sequelize.INTEGER,
            allowNull: false,
            references: {
               model: Category,
               key: 'id',
            }
         }
      })
   }
}

module.exports = (new Product).model