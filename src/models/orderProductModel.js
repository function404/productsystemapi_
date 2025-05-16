const database = require('../config/database')
const Order = require('./orderModel')
const Product = require('./productModel')

class OrderProduct {
   constructor() {
      this.model = database.define('order_products', {
         id : {
            type: database.Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
         },
         quantity: {
            type: database.Sequelize.INTEGER,
            defaultValue: 1
         },
         orderId: {
            type: database.Sequelize.INTEGER,
            allowNull: false,
            references: {
               model: Order,
               key: 'id'
            }
         },
         productId: {
            type: database.Sequelize.INTEGER,
            allowNull: false,
            references: {
               model: Product,
               key: 'id'
            }
         }
      })

      Order.belongsToMany(Product, {
         through: this.model,
         foreignKey: 'orderId',
         otherKey: 'productId',
      })
      Product.belongsToMany(Order, {
         through: this.model,
         foreignKey: 'productId',
         otherKey: 'orderId',
      })
   }
}

module.exports = (new OrderProduct).model