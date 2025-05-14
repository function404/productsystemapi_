const User = require("../models/user")
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
            return res.status(400).json('Senha inválida!')
         }

         const jwtToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" })

         return res.status(200).json({ token: jwtToken }) 
      } catch (error) {
         res.status(500).json('Erro ao fazer login!', error)
      }
   }
}

module.exports = (new authLogin())