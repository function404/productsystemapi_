const Category = require('../models/category')

class categoryController {
   async getAllCategories(req, res) {
      try {
         const categories = await Category.findAll()
         return res.json(categories)
      } catch (err) {
         res.status(500).json('Erro ao buscar todas as categorias!', err)
      }
   }

   async getCategoriesById(req, res) {
      try {
         const { id } = req.params
         const idCategory = Number(id)
         if (!idCategory) {
            return res.status(400).json('ID da categoria não informado!')
         }
   
         const category = await Category.findByPk(idCategory)
   
         if (!category) {
            return res.status(400).json('Categoria não encontrada!')
         }
   
         return res.json(category)
      } catch (error) {
         res.status(500).json('Erro ao buscar a categoria pelo ID!', error)
      }
   }
}

module.exports = (new categoryController())