const swaggerJSDoc = require('swagger-jsdoc')

const options = {
   definition: {
      openapi: '3.0.0',
      info: {
         title: 'API Gerenciamento de Produtos',
         version: '1.0.0',
         description: 'Documentção da API de Gerenciamento de Produtos e pedidos com Node.js, Express e Sequelize'
      },
      severs: [
         {
            url: 'https://localhost:3001',
         }
      ],
   },
   apis: ['./src/routes/*.js']
}

const swaggerOpt = swaggerJSDoc(options)

module.exports = swaggerOpt