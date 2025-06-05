const express = require('express')
const router = express.Router()

const registerMiddlewares = require('../middlewares/registerMiddleware')
const loginMiddlewares = require('../middlewares/loginMiddleware')

/**
 * @swagger
 * tags:
 *   name: Autenticação
 *   description: Endpoints de login e cadastro de usuário
*/

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Registra um novo usuário
 *     tags: [Autenticação]
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
 *         description: Preencher todos os campos obrigatórios
 *       409:
 *         description: Email já cadastrado
 *       500:
 *         description: Erro interno ao criar usuário
*/
router.post('/register', registerMiddlewares.register)

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Autentica o usuário e retorna um token JWT
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: J@gmail.com
 *               password:
 *                 type: string
 *                 example: 123123
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Preencha todos o campos obrigatórios, senha inválida
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro interno ao fazer login
*/
router.post('/login', loginMiddlewares.login)

module.exports = router