const express = require('express')
const router = express.Router()

const tokenMiddlewares = require('../middlewares/authToken')

const productController = require('../controllers/productController')
router.use(tokenMiddlewares.validateToken)

router.post('/products', productController.createProducts)
router.get('/products', productController.getAllProducts)
router.get('/products/:id', productController.getProductsById)
router.put('/products/:id', productController.updateProducts)
router.delete('/products/:id', productController.createProducts)

module.exports = router
