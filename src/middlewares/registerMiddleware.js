const User = require('../models/userModel')
const bcrypt = require('bcrypt')

const saltRounds = 10

class authRegister {
   async register(req, res) {
      try {
         const { name, email, password } = req.body
   
         if (!name || !email || !password) {
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
            _links: {
               self: { href: `${baseUrl}/register`, method: 'POST' },
               login: { href: `${baseUrl}/login`, method: 'POST' },
               docs: { href: `${baseUrl}/docs`, method: 'GET' },
            }
         })
      } catch (error) {
         res.status(500).json('Erro ao criar usuário!', error)
      }
   }
}

module.exports = (new authRegister())