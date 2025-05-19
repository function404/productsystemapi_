const User = require('../models/userModel')
const bcrypt = require('bcrypt')

const { buildLinks } = require('../utils/linksHelper')

const saltRounds = 10

class UserController {
   async getAllUsers(req, res) {
      try {
         const users = await User.findAll()
         const baseUrl = `${req.protocol}://${req.get('host')}/api`

         const result = users.map(u => ({
            user: u,
            _links:  buildLinks(baseUrl, 'users', u.id)
         }))

         return res.status(200).json({
            count: users.length,
            items: result,
            _links: buildLinks(baseUrl, 'users')
         })
      } catch (error) {
         res.status(500).json({ error:'Erro ao buscar todos os usuários!', message: error.message })
      }
   }

   async getUserById(req, res) {
      try {
         const { id } = req.params
         const idUser = Number(id)
         if (!idUser) {
            return res.status(400).json('ID do usuário não informado!')
         }
   
         const user = await User.findByPk(idUser)
   
         if (!user) {
            return res.status(404).json('Usuário não encontrado!')
         }
   
         const baseUrl = `${req.protocol}://${req.get('host')}/api`
         return res.status(200).json({
            user,
            _links: buildLinks(baseUrl, 'users', user.id)
         })
      } catch (error) {
         res.status(500).json({ error:'Erro ao buscar usuário por ID!', message: error.message })
      }
   }

   async createUsers(req, res) {
      try {
         const { name, email, password } = req.body
         if ( !name || !email || !password) {
            return res.status(400).json('Preencha todos os campos!')
         }
   
         const existingUser = await User.findOne({ where: { email } })
         if (existingUser) {
            return res.status(400).json('Email já cadastrado!')
         }
   
         const encryptedPassword = await bcrypt.hash(password, saltRounds)
   
         const user = await User
            .create({ name, email, password: encryptedPassword })
   
         const baseUrl = `${req.protocol}://${req.get('host')}/api`
         return res.status(201).json({
            user,
            _links: buildLinks(baseUrl, 'users', user.id)
         })
      } catch (error) {
         res.status(500).json({ error:'Erro ao criar usuário!', message: error.message })
      }
   }

   async updateUsers(req, res) {
      try {
         const { id } = req.params
         const { name, email, password } = req.body
         const idUser = Number(id) 
         if (!idUser) {
            return res.status(400).json('ID do usuário não informado!')
         }
         if (!name || !email || !password) {
            return res.status(400).json('Preencha todos os campos!')
         }

         const user = await User.findByPk(idUser)
         if (!user) {
            return res.status(404).json('Usuário não encontrado')
         }

         const existingUser = await User.findOne({ where: { email } })
         if (existingUser && existingUser.id !== idUser) {
            return res.status(400).json('Email já cadastrado!')
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
      } catch (error) {
         res.status(500).json('Erro ao atualizar usuário!', error.message)
      }
   }

   async deleteUsers(req, res) {
      try {
         const { id } = req.params
         const idUser = Number(id)
         if (!idUser) {
            return res.status(400).json('ID do usuário não informado!')
         }
         
         const user = await User.findByPk(idUser)
         if (!user) {
            return res.status(404).json('Usuário não encontrado!')
         }

         if (req.user === idUser) {
            return res.status(400).json('Você não pode deletar sua própria conta!')
         }

         await user.destroy()
         
         const baseUrl = `${req.protocol}://${req.get('host')}/api`
         return res.status(200).json({
            message: 'Usuário deletado com sucesso!',
            _links: buildLinks(baseUrl, 'users')
         })
      } catch (error) {
         res.status(500).json('Erro ao deletar usuário!', error.message)
      }
   }
}

module.exports = (new UserController())
