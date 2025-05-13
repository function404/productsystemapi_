const Order = require('../models/order')

class orderController {
   async getAllOrder(req, res) {
      try {
         const orders = await Order.findAll()
         return res.json(orders)
      } catch (err) {
         res.status(500).json('Erro ao buscar todos os pedidos!', err)
      }
   }

   async getOrdersById(req, res) {
      try {
         const { id } = req.params
         const idOrder = Number(id)
         if (!idOrder) {
            return res.status(400).json('ID do pedido não informado!')
         }
   
         const order = await Order.findByPk(idOrder)
   
         if (!order) {
            return res.status(400).json('Pedido não encontrado!')
         }
   
         return res.json(order)
      } catch (error) {
         res.status(500).json('Erro ao buscar o pedido pelo ID!', error)
      }
   }
}

module.exports = (new orderController())