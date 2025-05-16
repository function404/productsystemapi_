require('../models/orderProduct')
const Order = require('../models/order')
const OrderProduct = require('../models/orderProduct')
const Product = require('../models/product')
const User = require('../models/user')

class orderController {
   async getOrderByUser(req, res){
      try {
         const userId = req.user
         const orders = await Order.findAll({ where: { userId },
            include: {
               model: Product,
               through: { attributes: ['quantity'] }
            }
         })

         return res.json(orders)
      } catch (error) {
         res.status(500).json({ error:'Erro ao buscar todos os pedidos do usuário!', message: error.message })
      }
   }

   async getOrdersById(req, res) {
      try {
         const id = Number(req.params.id)
         const userId = req.user
         if (!id) {
            return res.status(400).json('ID do pedido não informado!')
         }
   
         const order = await Order.findByPk(id, {
            include: {
               model: Product,
               through: { attributes: ['quantity'] }
            }
         })
         if (!order) {
            return res.status(404).json('Pedido não encontrado!')
         }
         if (order.userId !== userId) {
            return res.status(403).json('Usuário não autorizado para ver esse pedido!')
         }
   
         return res.json(order)
      } catch (error) {
         res.status(500).json({ error:'Erro ao buscar o pedido pelo ID!', message: error.message})
      }
   }

   async createOrders(req, res) {
      try {
         const userId = req.user
         const items = req.body.products

         if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json('Envie a lista de produtos e quantidades!')
         }

         const user = await User.findByPk(userId)
         if (!user) {
            return res.status(404).json('Usuário não encontrado!')
         }

         const productIds = items.map((i) => i.productId)
         const products = await Product.findAll({ where: { id: productIds }})
         
         const checkDuplicateProducts = new Set(productIds)
         if (checkDuplicateProducts.size !== productIds.length) {
            return res.status(400).json('Não envie produtos repetidos!')
         }

         const foundIds = products.map((p) => p.id)
         const notFoundsIds = productIds.filter(id => !foundIds.includes(id))
         if (notFoundsIds.length > 0) {
            return res.status(404).json({error:`Produto(s) não encontrado(s): ID ${notFoundsIds.join(', ')}.`})
         }
         
         await Promise.all(items.map(async (item) => {
            const product = products.find(p => p.id === item.productId)
            const quantityRequested = item.quantity || 1

            if (product.quantity < quantityRequested) {
               throw new Error(`Estoque insuficiente para o produto: ${product.name}`)
            }
         }))

         const order = await Order.create({ userId })

         const orderProducts = items.map((i) => ({
            orderId: order.id,
            productId: i.productId,
            quantity: i.quantity || 1,
         }))
         await OrderProduct.bulkCreate(orderProducts)

         await Promise.all(items.map(async (item) => {
            const product = products.find(p => p.id === item.productId)
            product.quantity -= item.quantity || 1
            await product.save()
         }))

         const createdOrder = await Order.findByPk(order.id, {
            include: {
               model: Product,
               through: {
                  attributes: ['quantity']
               }
            }
         })

         return res.status(201).json(createdOrder)
      } catch (error) {
         return res.status(500).json({ error: 'Erro ao criar o pedido!', message: error.message })
      }
   }

   async cancelOrders(req, res) {
      try {
         const { id } = req.params
         const idOrder = Number(id)
         const userId = req.user
         if (!idOrder) {
            res.status(400).json('ID do pedido não informado!')
         }

         const order = await Order.findByPk(idOrder, {
            include: {
               model: Product,
               through: { attributes: ['quantity'] }
            }
         })
         if (!order) {
            return res.status(404).json('Pedido não encontrado!')
         }
         if (order.userId !== userId) {
            return res.status(403).json('Usuário não autorizado para deletar esse pedido!')
         }

         await Promise.all(order.products.map(async (product) => {
            const quantityOrder = product.order_products.quantity
            product.quantity += quantityOrder
            await product.save()
         }))

         await OrderProduct.destroy({ where: { orderId: order.id }})         
         await order.destroy()

         return res.status(200).json('Pedido cancelado com successo!')
      } catch (error) {
         res.status(500).json({ error:'Erro ao cancelar o pedido!', message: error.message })
      }
   }
}

module.exports = (new orderController())