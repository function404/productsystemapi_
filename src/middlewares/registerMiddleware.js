const bcrypt = require('bcrypt')

const ConflictError = require('../errors/conflictError')
const ForbiddenError = require('../errors/forbiddenError')
const MissingValuesError = require('../errors/missingValuesError')
const NotFoundError = require('../errors/notFoundError')

const User = require('../models/userModel')

const saltRounds = 10

class authRegister {
   async register(req, res) {
      const { name, email, password } = req.body
      if (!name || !email || !password) {
         throw new MissingValuesError({ name, email, password })
      }

      const existingUser = await User.findOne({ where: { email } })
      if (existingUser) {
         throw new ConflictError(`Email: '${email}' já cadastrado!`)
      }

      const encryptedPassword = await bcrypt.hash(password, saltRounds)
      const user = await User
         .create({ name, email, password: encryptedPassword })

      const baseUrl = `${req.protocol}://${req.get('host')}/api`

      return res.status(201).json({
         message: `Registro realizado com sucesso email: '${email}'!`,
         user,
         _links: {
            self: { href: `${baseUrl}/register`, method: 'POST' },
            login: { href: `${baseUrl}/login`, method: 'POST' },
            docs: { href: `${baseUrl}/docs`, method: 'GET' },
         }
      })
   }
}

module.exports = (new authRegister())