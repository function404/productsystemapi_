const ConflictError = require('../errors/conflictError')
const ForbiddenError = require('../errors/forbiddenError')
const MissingValuesError = require('../errors/missingValuesError')
const NotFoundError = require('../errors/notFoundError')

require('../models/orderProductModel')
const Order = require('../models/orderModel')
const OrderProduct = require('../models/orderProductModel')
const Product = require('../models/productModel')
const User = require('../models/userModel')

const { buildLinks } = require('../utils/linksHelper')

class orderController {
   async getOrderByUser(req, res){
      const userId = req.user
      const orders = await Order.findAll({ where: { userId },
         include: {
            model: Product,
            through: { attributes: ['quantity'] }
         }
      })
      const baseUrl = `${req.protocol}://${req.get('host')}/api`
      // Aqui eu precisei sobrescrever o link pra garantir que a lista apareça /orders/user 
      // Mostrando que para obter todos os pedidos por usuário a url precisa ser /orders/user
      const result = orders.map(order => {
         const links = buildLinks(baseUrl, 'orders', order.id, ['GET', 'POST', 'DELETE'])

         links.list = {
            href: `${baseUrl}/orders/user`,
            method: 'GET'
         }

         return {
            order,
            _links: links
         }
      })

      return res.status(200).json({
         count: result.length,
         result,
      })
   }

   async getOrdersById(req, res) {
      const id = Number(req.params.id)
      const userId = req.user
      if (!id) {
         throw new MissingValuesError({ id })
      }

      const order = await Order.findByPk(id, {
         include: {
            model: Product,
            through: { attributes: ['quantity'] }
         }
      })
      if (!order) {
         throw new NotFoundError(`Pedido ID: '${id}' não encontrado!`)
      }
      if (order.userId !== userId) {
         throw new ForbiddenError('Permissão negada! este pedido pertence a outro usuário.')
      }

      // Aqui fiz a mesma coisa, sobrescrevi o list pra orders/user tambem
      const baseUrl = `${req.protocol}://${req.get('host')}/api`

      const links = buildLinks(baseUrl, 'orders', order.id, ['GET', 'POST', 'DELETE'])
      links.list = {href: `${baseUrl}/order/user`, method: 'GET' }

      return res.status(200).json({
         order,
         _links: links
      })
   }

   async createOrders(req, res) {
      const userId = req.user
      const { products } = req.body
      // Verifica se o campo products foi enviado
      if (products === undefined) {
         throw new MissingValuesError({ products })
      }

      // products precisa ser array
      if (!Array.isArray(products)) {
         throw new MissingValuesError({}, 'O campo "products" deve ser uma lista (array) de produtos.')
      }

      // products não pode ser um array vazio
      if (products.length === 0) {
         throw new MissingValuesError({}, 'A lista "products" não pode estar vazia.')
      }

      // Validação de cada item do array
      for (const [index, item] of products.entries()) {
         if (typeof item !== 'object' || item === null) {
            throw new MissingValuesError({ [`products[${index}]`]: null }, `O item ${index + 1} deve ser um objeto com "productId" e "quantity".`)
         }

         const missingFields = {
            productId: item.productId,
            quantity: item.quantity,
         }

         const hasMissing = Object.values(missingFields).some(value => value == null)

         if (hasMissing) {
            throw new MissingValuesError(missingFields, `No item ${index + 1}, faltam campos obrigatórios.`)
         }
      }

      const productIds = products.map(i => i.productId)
      const findProducts = await Product.findAll({ where: { id: productIds } })

      // Verifica produtos duplicados
      const duplicates = productIds.filter((id, index) => productIds.indexOf(id) !== index)
      if (duplicates.length > 0) {
         throw new ConflictError(`Não envie produtos repetidos! ID: '${duplicates}'`)
      }

      // Verifica produtos inexistentes
      const foundIds = findProducts.map(p => p.id)
      const notFoundIds = productIds.filter(id => !foundIds.includes(id))
      if (notFoundIds.length > 0) {
         throw new NotFoundError(`Produto(s) ID: '${notFoundIds.join(', ')}' não encontrado(s)!`)
      }
      
      // verifica estoque sufiente do produto pedido
      await Promise.all(products.map(async (item) => {
         const product = findProducts.find(p => p.id === item.productId)
         const quantityRequested = item.quantity || 1

         if (product.quantity < quantityRequested) {
            throw new MissingValuesError({}, `Quantidade indisponível ID do produto: '${product.id}'. Quantidade disponível: '${product.quantity}'`)
         }
      }))

      // criação do pedido
      const order = await Order.create({ userId })

      const orderProducts = products.map((i) => ({
         orderId: order.id,
         productId: i.productId,
         quantity: i.quantity || 1,
      }))
      await OrderProduct.bulkCreate(orderProducts)

      // 9. Atualiza o estoque
      await Promise.all(products.map(async (item) => {
         const product = findProducts.find(p => p.id === item.productId)
         product.quantity -= item.quantity || 1
         await product.save()
      }))

      // 10. Busca pedido criado com produtos
      const createdOrder = await Order.findByPk(order.id, {
         include: {
            model: Product,
            through: {
               attributes: ['quantity']
            }
         }
      })

      // Aqui fiz a mesma coisa, sobrescrevi o list pra orders/user tambem
      const baseUrl = `${req.protocol}://${req.get('host')}/api`

      const links = buildLinks(baseUrl, 'orders', order.id, ['GET', 'POST', 'DELETE'])
      links.list = { href: `${baseUrl}/order/user`, method: 'GET' }

      return res.status(201).json({
         order: createdOrder,
         _links: links
      })
   }

   async cancelOrders(req, res) {
      const id = Number(req.params.id)
      const userId = req.user
      if (!id) {
         throw new MissingValuesError({ id })
      }

      const order = await Order.findByPk(id, {
         include: {
            model: Product,
            through: { attributes: ['quantity'] }
         }
      })
      if (!order) {
         throw new NotFoundError(`Pedido ID: '${id}' não encontrado!`)
      }
      if (order.userId !== userId) {
         throw new ForbiddenError('Permissão negada! Você não pode cancelar um pedido de outro usuário.')
      }

      await Promise.all(order.products.map(async (product) => {
         const quantityOrder = product.order_products.quantity
         product.quantity += quantityOrder
         await product.save()
      }))

      await OrderProduct.destroy({ where: { orderId: order.id }})         
      await order.destroy()

      const baseUrl = `${req.protocol}://${req.get('host')}/api`
      return res.status(200).json({
         message: `Pedido ID: '${id}' cancelado com sucesso!`,
         _links: buildLinks(baseUrl, 'orders', order.id, ['GET', 'POST'])
      })
   }
}

module.exports = (new orderController())