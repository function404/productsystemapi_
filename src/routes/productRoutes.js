const express = require('express')
const router = express.Router()

const productController = require('../controllers/productController')
// router.use(productController.validateToken)

router.get('/orders', productController.getAllProducts)
// router.get('/users/:id', productController.getUserById)
// router.post('/users', productController.createUsers)
// router.put('/users/:id', productController.updateUsers)
// router.delete('/users/:id', productController.deleteUsers)

module.exports = router
