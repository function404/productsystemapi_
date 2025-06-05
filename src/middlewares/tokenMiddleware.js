const jwt = require('jsonwebtoken')
require('dotenv').config()

const UnauthorizedError = require('../errors/unauthorizedError')
class AuthToken {
   async validateToken(req, res, next) {
      const authHeader = req.headers.authorization
      const token = authHeader && authHeader.split(' ')[1]
   
      if (!token) {
         throw new UnauthorizedError('Não autorizado! O token não foi enviado')
      }
   
      try {
         const payload = jwt.verify(token, process.env.JWT_SECRET_KEY)
         req.user = payload.id
         next()
      } catch (error) {
         throw new UnauthorizedError('Não autorizado! O token está inválido')
      }
   }
}

module.exports = (new AuthToken());