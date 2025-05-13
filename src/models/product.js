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
         categoryId: {
            type: database.Sequelize.INTEGER,
            allowNull: false,
            references: {
               model: Category,
               key: 'id',
            }
         }
      })
      this.model.belongsTo(Category, { foreignKey: 'categoryId'})
      Category.hasMany(this.model, { foreignKey: 'categoryId' })
   }
}

module.exports = (new Product).model