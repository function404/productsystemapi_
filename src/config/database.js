const Sequelize = require('sequelize');

class Database extends Sequelize {
   constructor() {
      super('gestaoDeProdutos', 'root', '', {
         host: 'localhost',
         dialect: 'mysql',
         logging: true,
      });
   }
}

module.exports = new Database();