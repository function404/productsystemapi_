const Order = require('../models/order')

class orderController {
   async getAllOrder(req, res) {
      try {
         const orders = await Order.findAll()
         return res.json(orders)
      } catch (err) {
         res.status(500).json('Erro ao buscar pedidos!', err)
      }
   }
}

module.exports = (new orderController())