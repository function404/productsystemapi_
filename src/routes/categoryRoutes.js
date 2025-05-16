const express = require('express')
const router = express.Router()

const tokenMiddlewares = require('../middlewares/authToken')

const categoryController = require('../controllers/categoryController')
router.use(tokenMiddlewares.validateToken)

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Gerenciamento de categorias
*/

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Cria uma nova categoria
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Eletrônicos
 *     responses:
 *       201:
 *         description: Categoria criada com sucesso
 *       400:
 *         description: Nome da categoria é obrigatório ou categoria já existe
 *       500:
 *         description: Erro interno ao criar categoria
 */
router.post('/categories', categoryController.createCategories)

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Lista todas as categorias
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Lista de categorias
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *       500:
 *         description: Erro ao listar as categorias
 */
router.get('/categories', categoryController.getAllCategories)

/**
 * @swagger
 * /api/categories/{id}:
 *   get:
 *     summary: Lista uma categoria pelo ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da categoria
 *     responses:
 *       200:
 *         description: Lista a categoria pelo ID
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *       400:
 *         description: ID inválido ou categoria não encontrada
 *       500:
 *         description: Erro ao buscar a categoria
 */
router.get('/categories/:id', categoryController.getCategoriesById)

/**
 * @swagger
 * /api/categories/{id}:
 *   put:
 *     summary: Atualiza uma categoria existente
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da categoria
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Roupas
 *     responses:
 *       200:
 *         description: Categoria atualizada com sucesso
 *       400:
 *         description: Nome inválido ou categoria já existe
 *       404:
 *         description: Categoria não encontrada
 *       500:
 *         description: Erro ao atualizar categoria
 */
router.put('/categories/:id', categoryController.updateCategories)

/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     summary: Deleta uma categoria
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da categoria
 *     responses:
 *       200:
 *         description: Categoria deletada com sucesso
 *       400:
 *         description: ID inválido ou categoria com produtos associados
 *       404:
 *         description: Categoria não encontrada
 *       500:
 *         description: Erro ao deletar categoria
 */
router.delete('/categories/:id', categoryController.deleteCategories)

module.exports = router