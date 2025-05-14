const express = require('express')
const router = express.Router()

const tokenMiddlewares = require('../middlewares/authToken')

const orderController = require('../controllers/orderController')
router.use(tokenMiddlewares.validateToken)

router.get('/orders', orderController.getAllOrder)
router.get('/orders/:id', orderController.getOrdersById)
// router.post('/users', orderController.createUsers)
// router.put('/users/:id', orderController.updateUsers)
// router.delete('/users/:id', orderController.deleteUsers)

module.exports = router