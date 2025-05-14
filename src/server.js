const express = require('express')
const app = express()
require('dotenv').config()

const database = require('./config/database')
const port = process.env.API_PORT || 3001

const loginMiddlewares = require('./middlewares/authLogin')
const registerMiddlewares = require('./middlewares/authRegister')

require('./models/orderProduct')
const userRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productRoutes')
const orderRoutes = require('./routes/orderRoutes')
const categoryRoutes = require('./routes/categoryRoutes')

app.use(express.json())

app.post('/login', loginMiddlewares.login)
app.post('/register', registerMiddlewares.register)

app.use('/api', userRoutes)
app.use('/api', productRoutes)
app.use('/api', orderRoutes)
app.use('/api', categoryRoutes)

database.sync({ force: false })
   .then(() => {
      app.listen(Number(port), () => 
         console.log(`🚀 Servidor rodando na porta: ${port}`)
      )
   })
   .catch(error => {
      console.error('Erro ao sincronizar o banco de dados:', error)
   })