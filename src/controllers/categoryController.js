const Category = require('../models/category')

class categoryController {
   async getAllCategories(req, res) {
      try {
         const categories = await Category.findAll()
         return res.json(categories)
      } catch (err) {
         res.status(500).json('Erro ao buscar categories!', err)
      }
   }
}

module.exports = (new categoryController())