const express = require('express')
const router = express.Router()

const tokenMiddlewares = require('../middlewares/tokenMiddleware')

const userController = require('../controllers/userController')
router.use(tokenMiddlewares.validateToken)

/**
 * @swagger
 * tags:
 *    name: Usuários
 *    description: Grenciamento do usuários
*/

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Lista todos os usuários cadastrados
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários
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
 *                   email:
 *                     type: string
 *                   password:
 *                     type: string
 *       500:
 *         description: Erro ao buscar usuários
*/
router.get('/users', userController.getAllUsers)

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Busca um usuário pelo ID
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string
 *       400:
 *         description: ID do usuário não informado
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro ao buscar usuário
*/
router.get('/users/:id', userController.getUserById)

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Usuários]
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
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: J
 *               email:
 *                 type: string
 *                 example: J@gmail.com
 *               password:
 *                 type: string
 *                 example: 123123
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                   example: J
 *                 email:
 *                   type: string
 *                   example: J@gmail.com
 *                 password:
 *                   type: string
 *                   example: $6f$32$...
 *       400:
 *         description: Preencher todos os campos ou email ja cadastrado
 *       500:
 *         description: Erro ao criar usuário
*/
router.post('/users', userController.createUsers)

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Atualiza os dados de um usuário
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Jota
 *               email:
 *                 type: string
 *                 example: J@gmail.com
 *               password:
 *                 type: string
 *                 example: 123123
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                   example: Jota
 *                 email:
 *                   type: string
 *                   example: J@gmail.com
 *                 password:
 *                   type: string
 *                   example: $6f$32$...
 *       400:
 *         description: ID do usuário não informado ou preencha todos os campos ou email já cadastrado
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro ao atualizar usuário
*/
router.put('/users/:id', userController.updateUsers)

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Deleta um usuário pelo ID
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário deletado com sucesso
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Usuário deletado com sucesso!
 *       400:
 *         description: ID do usuário não informado ou você não pode deletar sua própria conta
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro ao deletar usuário
*/
router.delete('/users/:id', userController.deleteUsers)

module.exports = router
