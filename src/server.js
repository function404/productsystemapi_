const express = require('express')
const database = require('./config/database')

require('./models/orderProduct')

const userRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productRoutes')
const orderRoutes = require('./routes/orderRoutes')
const categoryRoutes = require('./routes/categoryRoutes')

const port = 3001
const app = express()
app.use(express.json())

app.use('/user', userRoutes)
app.use('/product', productRoutes)
app.use('/order', orderRoutes)
app.use('/category', categoryRoutes)

database.sync({ force: true })
   .then(() => {
      app.listen(Number(port), () => 
         console.log(`🚀 Servidor rodando na porta: ${port}`)
      )
   })
   .catch(error => {
      console.error('Erro ao sincronizar o banco de dados:', error)
   })