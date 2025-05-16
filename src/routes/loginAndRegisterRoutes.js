const express = require('express')
const router = express.Router()

const registerMiddlewares = require('../middlewares/authRegister')
const loginMiddlewares = require('../middlewares/authLogin')

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
 *         description: Preencher todos os campos ou email ja cadastrado
 *       500:
 *         description: Erro ao criar usuário
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
 *         description: Usuário não encontrado ou dados ausentes
 *       401:
 *         description: Senha inválida
 *       500:
 *         description: Erro ao fazer login
*/
router.post('/login', loginMiddlewares.login)

module.exports = router