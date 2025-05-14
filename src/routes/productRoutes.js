const express = require('express')
const router = express.Router()

const tokenMiddlewares = require('../middlewares/authToken')

const productController = require('../controllers/productController')
router.use(tokenMiddlewares.validateToken)

router.get('/products', productController.getAllProducts)
router.get('/products/:id', productController.getProductsById)
// router.post('/users', productController.createUsers)
// router.put('/users/:id', productController.updateUsers)
// router.delete('/users/:id', productController.deleteUsers)

module.exports = router
