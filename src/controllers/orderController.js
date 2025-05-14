const Order = require('../models/order')
const OrderProduct = require('../models/orderProduct')
const Product = require('../models/product')

class orderController {
   async getOrderByUser(req, res){
      try {
         const userId = req.user
         const orders = await Order.findAll({ where: { userId }})

         return res.json(orders)
      } catch (error) {
         res.status(500).json('Erro ao buscar todos os pedidos do usuário!', error)
      }
   }

   async getOrdersById(req, res) {
      try {
         const { id } = Number(req.params.id)
         const userId = req.user
         if (!id) {
            return res.status(400).json('ID do pedido não informado!')
         }
   
         const order = await Order.findByPk(id)
         if (!order) {
            return res.status(400).json('Pedido não encontrado!')
         }
         if (order.userId !== userId) {
            return res.status(403).json('Usuário não autorizado para ver esse pedido!')
         }
   
         return res.json(order)
      } catch (error) {
         res.status(500).json('Erro ao buscar o pedido pelo ID!', error)
      }
   }

   async createOrders(req, res) {
      try {
         const userId = req.body
         const items = req.body.products

         if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json('Envie a lista de produtos e quantidades!')
         }

         const ids = items.map(i => i.productId)
         const products = await Product.findAll({ where: { id: ids} })
         if (!products.length !== ids.length) {
            return res.status(400).json('Algum produto não foi econtrado!')
         }

         const order = await Order.create({ userId })

         const orderProducts = items.map(i => ({
            orderId: order.id,
            productId: i.productId,
            quantity:  i.quantity || 1
         }))
         await OrderProduct.bulkCreate(orderProducts)

         const completeOrder = await Order.findByPk(order.id)
         return res.status(201).json(completeOrder)
      } catch (error) {
         return res.status(500).json('Erro ao criar o pedido!', error)
      }
   }

   async cancelOrders(req, res) {
      try {
         const id = Number(req.params.id)
         const userId = req.user
         if (!id) {
            res.status(404).json('ID do pedido não informado!')
         }

         const order = await Order.findByPk(id)
         if (!order) {
            return res.status(404).json('Pedido não encontrado!')
         }
         if (order.userId !== userId) {
            return res.status(403).json('Usuário não autorizado para ver esse pedido!')
         }
         
         order.destroy()
         return res.json('Pedido cancelado com successo!')
      } catch (error) {
         res.status(500).json('Erro ao cancelar o pedido!', error)
      }
   }
}

module.exports = (new orderController())