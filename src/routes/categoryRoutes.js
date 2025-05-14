const express = require('express')
const router = express.Router()

const tokenMiddlewares = require('../middlewares/authToken')

const categoryController = require('../controllers/categoryController')
router.use(tokenMiddlewares.validateToken)

router.post('/categories', categoryController.createCategories)
router.get('/categories', categoryController.getAllCategories)
router.get('/categories:id', categoryController.getCategoriesById)
router.put('/categories/:id', categoryController.updateCategories)
router.delete('/categories/:id', categoryController.deleteCategories)

module.exports = router