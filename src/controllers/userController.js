const bcrypt = require('bcrypt')

const ConflictError = require('../errors/conflictError')
const ForbiddenError = require('../errors/forbiddenError')
const MissingValuesError = require('../errors/missingValuesError')
const NotFoundError = require('../errors/notFoundError')

const User = require('../models/userModel')
const Order = require('../models/orderModel')

const { buildLinks } = require('../utils/linksHelper')

const saltRounds = 10

class UserController {
   async getAllUsers(req, res) {
      const users = await User.findAll()
      const baseUrl = `${req.protocol}://${req.get('host')}/api`

      const result = users.map(u => ({
         user: u,
         _links:  buildLinks(baseUrl, 'users', u.id)
      }))

      return res.status(200).json({
         count: users.length,
         items: result,
      })
   }

   async getUserById(req, res) {
      const id = Number(req.params.id)
      if (!id) {
         throw new MissingValuesError({ id })
      }

      const user = await User.findByPk(id)
      if (!user) {
         throw new NotFoundError(`Usuário com ID: '${id}' não encontrado!`)
      }

      const baseUrl = `${req.protocol}://${req.get('host')}/api`
      return res.status(200).json({
         user,
         _links: buildLinks(baseUrl, 'users', user.id)
      })
   }

   async createUsers(req, res) {
      const { name, email, password } = req.body
      if (!name || !email || !password) {
         throw new MissingValuesError({ name, email, password })
      }

      const existingUser = await User.findOne({ where: { email } })
      if (existingUser) {
         throw new ConflictError(`Email: '${email}' já cadastrado`)
      }

      const encryptedPassword = await bcrypt.hash(password, saltRounds)

      const user = await User
         .create({ name, email, password: encryptedPassword })

      const baseUrl = `${req.protocol}://${req.get('host')}/api`
      return res.status(201).json({
         user,
         _links: buildLinks(baseUrl, 'users', user.id)
      })
   }

   async updateUsers(req, res) {
      const { id } = req.params
      const idUser = Number(id)
      const { name, email, password } = req.body

      if (!idUser || !name || !email || !password) {
         throw new MissingValuesError({ idUser, name, email, password })
      }

      const user = await User.findByPk(idUser)
      if (!user) {
         throw new NotFoundError(`Usuário com ID: '${id}' não encontrado!`)
      }

      const existingUser = await User.findOne({ where: { email } })
      if (existingUser && existingUser.id !== idUser) {
         throw new ConflictError(`Email: '${email}' já cadastrado`)
      }

      user.name = name
      user.email = email
      user.password = password

      const encryptedPassword = await bcrypt.hash(password, saltRounds)
      user.password = encryptedPassword
      await user.save()

      const baseUrl = `${req.protocol}://${req.get('host')}/api`
      return res.status(200).json({
         user,
         _links: buildLinks(baseUrl, 'users', user.id)
      })
   }

   async deleteUsers(req, res) {
      const id = Number(req.params.id)
      if (!id) {
         throw new MissingValuesError({ id })
      }
      
      const user = await User.findByPk(id)
      if (!user) {
         throw new NotFoundError(`Usuário com ID: '${id}' não encontrado!`)
      }

      if (req.user === id) {
         throw new ForbiddenError('Usuário não autorizado para deletar a própria conta!')
      }

      const userOrder = await Order.findAll({ where: { userId: id }})
      if (userOrder.length > 0) {
         throw new ForbiddenError('Este usuário possui pedidos ativos. Cancele-os antes de deletar a conta.')
      }

      await user.destroy()
      
      const baseUrl = `${req.protocol}://${req.get('host')}/api`
      return res.status(200).json({
         message: `Usuário ID: '${id}' deletado com sucesso!`,
         _links: buildLinks(baseUrl, 'users', user.id, ['POST', 'GET'])
      })
   }
}

module.exports = (new UserController())
