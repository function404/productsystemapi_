const express = require('express')
const router = express.Router()

const tokenMiddlewares = require('../middlewares/tokenMiddleware')

const orderController = require('../controllers/orderController')
router.use(tokenMiddlewares.validateToken)

/**
 * @swagger
 * tags:
 *   name: Pedidos
 *   description: Gerenciamento de pedidos
*/

/**
 * @swagger
 * /api/orders/user:
 *   get:
 *     summary: Lista todos os pedidos do usuário autenticado
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de pedidos do usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   userId:
 *                     type: integer
 *                     example: 1
 *                   products:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                         name:
 *                           type: string
 *                         price:
 *                           type: string
 *                         quantity:
 *                           type: integer
 *                         description:
 *                           type: string
 *                         categoryId:
 *                           type: integer
 *                         order_products:
 *                           type: object
 *                           properties:
 *                             quantity:
 *                               type: integer
 *       500:
 *         description: Erro ao buscar os pedidos do usuário
*/
router.get('/orders/user', orderController.getOrderByUser)

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Busca um pedido pelo ID
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do pedido
 *     responses:
 *       200:
 *         description: Pedido encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 userId:
 *                   type: integer
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       price:
 *                         type: string
 *                       quantity:
 *                         type: integer
 *                       description:
 *                         type: string
 *                       categoryId:
 *                         type: integer
 *                       order_products:
 *                         type: object
 *                         properties:
 *                           quantity:
 *                             type: integer
 *       400:
 *         description: ID do pedido não informado
 *       403:
 *         description: Usuário não autorizado para ver esse pedido
 *       404:
 *         description: Pedido não encontrado
 *       500:
 *         description: Erro ao buscar o pedido pelo ID
*/
router.get('/orders/:id', orderController.getOrdersById)

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Cria um novo pedido
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: integer
 *                       example: 1
 *                     quantity:
 *                       type: integer
 *                       example: 8
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 userId:
 *                   type: integer
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       price:
 *                         type: string
 *                       quantity:
 *                         type: integer
 *                       description:
 *                         type: string
 *                       categoryId:
 *                         type: integer
 *                       order_products:
 *                         type: object
 *                         properties:
 *                           quantity:
 *                             type: integer
 *       400:
 *         description: Enviar a lista de produtos e quantidade ou não enviar produtos repitidos ou estoque insuficiente para o produto com ID
 *       404:
 *         description: Usuário não encontrado ou Produto(s) não encontrado(s) com ID
 *       500:
 *         description: Erro ao criar pedido
*/
router.post('/orders', orderController.createOrders)

/**
 * @swagger
 * /api/orders/{id}:
 *   delete:
 *     summary: Cancela (deleta) um pedido
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do pedido
 *     responses:
 *       200:
 *         description: Pedido cancelado com sucesso
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Pedido cancelado com sucesso!
 *       400:
 *         description: ID do pedido não informado
 *       403:
 *         description: Usuário não autorizado para deletar esse pedido
 *       404:
 *         description: Pedido não encontrado
 *       500:
 *         description: Erro ao cancelar pedido
*/
router.delete('/orders/:id', orderController.cancelOrders)

module.exports = router