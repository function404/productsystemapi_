const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const MissingValuesError = require('../errors/missingValuesError')
const NotFoundError = require('../errors/notFoundError')

const User = require('../models/userModel')

class authLogin {
   async login(req, res) {
      const { email, password } = req.body
      if (!email || !password) {
         throw new MissingValuesError({ email, password })
      }

      const user = await User.findOne({ where: { email} })
      if (!user) {
         throw new NotFoundError(`Usuário não encontrado!`)
      }

      const isPaswordValid = await bcrypt.compare(password, user.password)
      if (!isPaswordValid) {
         throw new MissingValuesError({}, 'Senha incorreta!')
      }

      const jwtToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" })

      const baseUrl = `${req.protocol}://${req.get('host')}/api`

      return res.status(200).json({ 
         message: `Login realizado com sucesso email: '${email}'!`,
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
   }
}

module.exports = (new authLogin())