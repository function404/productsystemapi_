const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

class authLogin {
   async login(req, res) {
      try {
         const { email, password } = req.body
         if (!email || !password) {
            return res.status(400).json('Preencha todos os campos!')
         }

         const user = await User.findOne({ where: { email} })
         if (!user) {
            return res.status(400).json('Usuário não encontrado!')
         }

         const isPaswordValid = await bcrypt.compare(password, user.password)
         if (!isPaswordValid) {
            return res.status(401).json('Senha inválida!')
         }

         const jwtToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" })

         const baseUrl = `${req.protocol}://${req.get('host')}/api`

         return res.status(200).json({ 
            message: 'Login realizado com sucesso!',
            token: jwtToken,
            _links: {
               self: { href: `${baseUrl}/login`, method: 'POST' },
               register: { href: `${baseUrl}/register`, method: 'POST' },
               categories: { href: `${baseUrl}/categories`, method: 'GET' },
               products: { href: `${baseUrl}/products`, method: 'GET' },
               users: { href: `${baseUrl}/users`, method: 'GET' },
               orders: { href: `${baseUrl}/orders/user`, method: 'GET' }
            }
         }) 
      } catch (error) {
         res.status(500).json('Erro ao fazer login!', error)
      }
   }
}

module.exports = (new authLogin())