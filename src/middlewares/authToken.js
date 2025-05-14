const jwt = require('jsonwebtoken')
require('dotenv').config()

class AuthToken {
   async validateToken(req, res, next) {
      const authHeader = req.headers.authorization
      const token = authHeader && authHeader.split(' ')[1]
   
      if (!token) {
         return res.status(401).json('Token não enviado!')
      }
   
      try {
         const payload = jwt.verify(token, process.env.JWT_SECRET_KEY)
         req.user = payload.id
         next()
      } catch (error) {
         return res.status(401).json('Token inválido!', error)
      }
   }
}

module.exports = (new AuthToken());