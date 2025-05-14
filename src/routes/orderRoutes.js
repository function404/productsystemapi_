const express = require('express')
const router = express.Router()

const tokenMiddlewares = require('../middlewares/authToken')

const orderController = require('../controllers/orderController')
router.use(tokenMiddlewares.validateToken)

router.post('/orders', orderController.createOrders)
router.get('/orders/user', orderController.getOrderByUser)
router.get('/orders/:id', orderController.getOrdersById)
router.delete('/orders/:id', orderController.deleteUsers)

module.exports = router