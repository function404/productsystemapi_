const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const saltRounds = 10
const JWT_SECRET_KEY = 'functionss'

class UserController {
   async getUsers(req, res) {
      try {
         const users = await User.findAll()
         return res.json(users)
      } catch (error) {
         res.status(500).json('Erro ao buscar usuários!', error)
      }
   }

   async getUserById(req, res) {
      try {
         const { id } = req.params
         const idUser = Number(id)
         if (!idUser) {
            return res.status(400).json('ID não informado!')
         }
   
         const user = await User.findByPk(idUser)
   
         if (!user) {
            return res.status(400).json('Usuário não encontrado!')
         }
   
         return res.json(user)
      } catch (error) {
         res.status(500).json('Erro ao buscar usuário por ID!', error)
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
   
         return res.json(user)
      } catch (error) {
         res.status(500).json('Erro ao criar usuário!', error)
      }
   }

   async updateUsers(req, res) {
      try {
         const { id } = req.params
         const { name, email, password } = req.body
         const idUser = Number(id)
         if ( !idUser || !name || !email || !password) {
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
         user.save()

         return res.status(200).json(user)  
      } catch (error) {
         res.status(500).json('Erro ao atualizar usuário!', error)
      }
      
   }

   async deleteUsers(req, res) {
      try {
         const { id } = req.params
         const idUser = Number(id)
         if (!idUser) {
            return res.status(404).json('ID não informado!')
         }
         
         const user = await User.findByPk(idUser)
         if (!user) {
            return res.status(404).json('Usuário não encontrado!')
         }

         if (req.user === idUser) {
            return res.status(400).json('Você não pode deletar sua própria conta!')
         }

         user.destroy()
         return res.status(200).json('Usuário e tarefas associadas deletados com sucesso!')   
      } catch (error) {
         res.status(500).json('Erro ao deletar usuário!', error)
      }
      
   }

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
            return res.status(400).json('Senha inválida!')
         }

         const jwtToken = jwt.sign({ id: user.id }, JWT_SECRET_KEY, { expiresIn: "1h" })

         return res.status(200).json({ token: jwtToken }) 
      } catch (error) {
         res.status(500).json('Erro ao fazer login!', error)
      }
      
   }

   async validateToken(req, res, next) {
      const authHeader = req.headers.authorization
      const token = authHeader && authHeader.split(' ')[1]
   
      if (!token) {
         return res.status(401).json('Token não enviado!')
      }
   
      try {
         const payload = jwt.verify(token, JWT_SECRET_KEY)
         req.user = payload.id
         next()
      } catch (error) {
         return res.status(401).json('Token inválido!', error)
      }
   }
}

module.exports = (new UserController())
