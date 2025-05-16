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
   
         return res.json(user)
      } catch (error) {
         res.status(500).json('Erro ao criar usuário!', error)
      }
   }
}

module.exports = (new authRegister())