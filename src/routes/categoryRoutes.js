const express = require('express')
const router = express.Router()

const categoryController = require('../controllers/categoryController')

/**
 * @swagger
 * tags:
 *   name: Categorias
 *   description: Gerenciamento de categorias
*/

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Lista todas as categorias
 *     tags: [Categorias]
 *     security:
 *       - bearerAuth: []
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
 *         description: Erro interno ao listar as categorias
*/
router.get('/categories', categoryController.getAllCategories)

/**
 * @swagger
 * /api/categories/{id}:
 *   get:
 *     summary: Lista uma categoria pelo ID
 *     tags: [Categorias]
 *     security:
 *       - bearerAuth: []
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
 *         description: ID do produto não informado
 *       404:
 *         description: Categoria não encontrada
 *       500:
 *         description: Erro interno ao buscar a categoria
*/
router.get('/categories/:id', categoryController.getCategoriesById)

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Cria uma nova categoria
 *     tags: [Categorias]
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
 *             properties:
 *               name:
 *                 type: string
 *                 example: Eletrônicos
 *     responses:
 *       201:
 *         description: Categoria criada com sucesso
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
 *                     example: Eletrônicos
 *       400:
 *         description: Preencha campos obrigatórios
 *       409:
 *         description: Nome da categoria já existe
 *       500:
 *         description: Erro interno ao criar categoria
*/
router.post('/categories', categoryController.createCategories)

/**
 * @swagger
 * /api/categories/{id}:
 *   put:
 *     summary: Atualiza uma categoria existente
 *     tags: [Categorias]
 *     security:
 *       - bearerAuth: []
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
 *                 example: Celulares
 *     responses:
 *       200:
 *         description: Categoria atualizada com sucesso
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
 *                     example: Processadores
 *       400:
 *         description: Preencha campos obrigatórios
 *       404:
 *         description: Categoria não encontrada
 *       409:
 *         description: Nome inválido ou categoria já existe
 *       500:
 *         description: Erro interno ao atualizar categoria
*/
router.put('/categories/:id', categoryController.updateCategories)

/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     summary: Deleta uma categoria
 *     tags: [Categorias]
 *     security:
 *       - bearerAuth: []
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
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Categoria deletada com sucesso!
 *       400:
 *         description: Preencha campos obrigatórios
 *       403:
 *         description: Categorias com produtos associados não podem ser excluídas
 *       404:
 *         description: Categoria não encontrada
 *       500:
 *         description: Erro interno ao deletar categoria
*/
router.delete('/categories/:id', categoryController.deleteCategories)

module.exports = router