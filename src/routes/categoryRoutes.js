const express = require('express')
const router = express.Router()

const categoryController = require('../controllers/categoryController')
// router.use(categoryController.validateToken)

router.get('/orders', categoryController.getAllCategories)
// router.get('/users/:id', categoryController.getUserById)
// router.post('/users', categoryController.createUsers)
// router.put('/users/:id', categoryController.updateUsers)
// router.delete('/users/:id', categoryController.deleteUsers)

module.exports = router