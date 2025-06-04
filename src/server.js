const express = require('express')
const swaggerUi = require('swagger-ui-express')
require('dotenv').config()

const database = require('./config/database')

const swaggerOpt = require('./docs/swagger')

const tokenMiddlewares = require('./middlewares/tokenMiddleware')

require('./models/orderProductModel')
const userRoutes = require('./routes/userRoutes')
const loginAndRegister = require('./routes/loginAndRegisterRoutes')
const productRoutes = require('./routes/productRoutes')
const orderRoutes = require('./routes/orderRoutes')
const categoryRoutes = require('./routes/categoryRoutes')

const port = process.env.API_PORT || 3001

const app = express()
app.use(express.json())
app.get('/', (req, res) => {
   res.send('API de Avaliação Backend');
})

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerOpt))

app.use('/api', loginAndRegister)

app.use(tokenMiddlewares.validateToken)
app.use('/api', userRoutes)
app.use('/api', productRoutes)
app.use('/api', orderRoutes)
app.use('/api', categoryRoutes)

app.use((err, req, res, next) => {
   if (err.statusCode) {
      return res.status(err.statusCode).json({ message: err.message })
   }
   console.error(err)
   res.status(500).json({ message: 'Erro interno do servidor, verifique essa ação!' })
})

database.sync({ force: false })
   .then(() => {
      app.listen(Number(port), () => 
         console.log(`🚀 Servidor rodando na porta: ${port}`)
      )
   })
   .catch(error => {
      console.error('Erro ao sincronizar o banco de dados!:', error)
   })