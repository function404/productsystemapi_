const express = require('express')
const router = express.Router()

const tokenMiddlewares = require('../middlewares/tokenMiddleware')

const productController = require('../controllers/productController')
router.use(tokenMiddlewares.validateToken)

/**
 * @swagger
 * tags:
 *    name: Produtos
 *    description: Gerenciamento de produtos
*/

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Lista todos os produtos cadastrados
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de produtos
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
 *                   name:
 *                     type: string
 *                     example: intel
 *                   price:
 *                     type: string
 *                     example: "1799.99"
 *                   quantity:
 *                     type: integer
 *                     example: 10
 *                   description:
 *                     type: string
 *                     example: x
 *                   categoryId:
 *                     type: integer
 *                     example: 1
 *       500:
 *         description: Erro ao buscar produtos
*/
router.get('/products', productController.getAllProducts)

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Busca um produto pelo ID
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Produto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 price:
 *                   type: string
 *                 quantity:
 *                   type: integer
 *                 description:
 *                   type: string
 *                 categoryId:
 *                   type: integer
 *       400:
 *         description: ID do produto não informado
 *       404:
 *         description: Produto não encontrado
 *       500:
 *         description: Erro ao buscar produto pelo ID
*/
router.get('/products/:id', productController.getProductsById)

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Cria um novo produto
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - quantity
 *               - description
 *               - categoryId
 *             properties:
 *               name:
 *                 type: string
 *                 example: intel
 *               price:
 *                 type: decimal(10, 2)
 *                 example: 1799.99
 *               quantity:
 *                 type: integer
 *                 example: 10
 *               description:
 *                 type: string
 *                 example: x
 *               categoryId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: intel
 *                 price:
 *                   type: decimal(10, 2)
 *                   example: 1799.99
 *                 quantity:
 *                   type: integer
 *                   example: 10
 *                 description:
 *                   type: string
 *                   example: x
 *                 categoryId:
 *                   type: integer
 *                   example: 1
 *       400:
 *         description: Preencha todos os campos ou produto com esse nome já existe
 *       404:
 *         description: ID da categoria não encontrada
 *       500:
 *         description: Erro ao criar produto
*/
router.post('/products', productController.createProducts)

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Atualiza os dados de um produto
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do produto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Intel
 *               price:
 *                 type: decimal(10, 2)
 *                 example: 2199.99
 *               quantity:
 *                 type: integer
 *                 example: 20
 *               description:
 *                 type: string
 *                 example: Processador tope
 *               categoryId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Produto atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: Intel
 *                 price:
 *                   type: decimal(10, 2)
 *                   example: 2199.99
 *                 quantity:
 *                   type: integer
 *                   example: 20
 *                 description:
 *                   type: string
 *                   example: Processador tope
 *                 categoryId:
 *                   type: integer
 *                   example: 1
 *       400:
 *         description: Preencha todos os campos
 *       404:
 *         description: Produto não encontrado ou ID da categoria não encontrada
 *       500:
 *         description: Erro ao atualizar produto
*/
router.put('/products/:id', productController.updateProducts)

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Deleta um produto pelo ID
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Produto deletado com sucesso
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Produto deletado com sucesso!
 *       400:
 *         description: ID do produto não informado
 *       404:
 *         description: Produto não encontrado
 *       500:
 *         description: Erro ao deletar produto
*/
router.delete('/products/:id', productController.deleteProducts)

module.exports = router
