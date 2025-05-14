const database = require('../config/database')
const Order = require('./order')
const Product = require('./product')

class OrderProduct {
   constructor() {
      this.model = database.define('order_products', {
         id : {
            type: database.Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
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
         foreignKey: 'orderId',
         otherKey: 'productId',
      })
   }
}

module.exports = (new OrderProduct).model