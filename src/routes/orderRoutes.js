const express = require('express')
const router = express.Router()

const orderController = require('../controllers/orderController')
// router.use(orderController.validateToken)

router.get('/orders', orderController.getAllOrder)
// router.get('/users/:id', orderController.getUserById)
// router.post('/users', orderController.createUsers)
// router.put('/users/:id', orderController.updateUsers)
// router.delete('/users/:id', orderController.deleteUsers)

module.exports = router