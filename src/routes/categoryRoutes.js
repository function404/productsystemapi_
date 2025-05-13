const express = require('express')
const router = express.Router()

const categoryController = require('../controllers/categoryController')
// router.use(categoryController.validateToken)

router.get('/categories', categoryController.getAllCategories)
router.get('/categories:id', categoryController.getCategoriesById)
// router.post('/users', categoryController.createUsers)
// router.put('/users/:id', categoryController.updateUsers)
// router.delete('/users/:id', categoryController.deleteUsers)

module.exports = router