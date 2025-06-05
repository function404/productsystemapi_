const Category = require('../models/categoryModel')
const Product  = require('../models/productModel')

const ConflictError = require('../errors/conflictError')
const ForbiddenError = require('../errors/forbiddenError')
const MissingValuesError = require('../errors/missingValuesError')
const NotFoundError = require('../errors/notFoundError')

const { buildLinks } = require('../utils/linksHelper')

class categoryController {
   async getAllCategories(req, res) {
      const categories = await Category.findAll()
      const baseUrl = `${req.protocol}://${req.get('host')}/api`

      const result = categories.map(c => ({
         category: c,
         _links:  buildLinks(baseUrl, 'categories', c.id)
      }))

      return res.status(200).json({
         count: categories.length,
         items: result,
      })
   }

   async getCategoriesById(req, res) {
      const id = Number(req.params.id)
      if (!id) {
         throw new MissingValuesError({ id })
      }

      const category = await Category.findByPk(id)
      if (!category) {
         throw new NotFoundError(`Categoria com ID: '${id}' não encontrada!`)
      }

      const baseUrl = `${req.protocol}://${req.get('host')}/api`
      return res.status(200).json({
         category,
         _links: buildLinks(baseUrl, 'categories', category.id)
      })
   }

   async createCategories(req, res) {
      const { name } = req.body
      if (!name) {
         throw new MissingValuesError({ name })
      }

      const existingCategory = await Category.findOne({ where: { name }})
      if (existingCategory) {
         throw new ConflictError(`Categoria com esse nome: '${name}' já existe`)
      }

      const category = await Category.create({ name })

      const baseUrl = `${req.protocol}://${req.get('host')}/api`
      return res.status(201).json({
         category,
         _links: buildLinks(baseUrl, 'categories', category.id)
      })
   }

   async updateCategories(req, res) {
      const id = Number(req.params.id)
      const { name } = req.body
      if (!id || !name) {
         throw new MissingValuesError({ id, name })
      }

      const category = await Category.findByPk(id)
      if (!category) {
         throw new NotFoundError(`Categoria com ID: '${id}' não encontrada!`)
      }

      const existingCategory = await Category.findOne({ where: { name }})
      if (existingCategory && existingCategory.id !== id) {
         throw new ConflictError(`Categoria com esse nome: '${name}' já existe`)
      }

      category.name = name
      await category.save()

      const baseUrl = `${req.protocol}://${req.get('host')}/api`
      return res.status(200).json({
         category,
         _links: buildLinks(baseUrl, 'categories', category.id)
      })
   }

   async deleteCategories(req, res) {
      const id = Number(req.params.id)
      if (!id) {
         throw new MissingValuesError({ id })
      }

      const category = await Category.findByPk(id)
      if (!category) {
         throw new NotFoundError(`Categoria com ID: '${id}' não encontrada!`)
      }

      const product = await Product.findAll({ where: { categoryId: id }})
      if (product.length > 0) {
         throw new ForbiddenError(`Categorias com produtos associados não podem ser excluídas!`)
      }

      await category.destroy()

      const baseUrl = `${req.protocol}://${req.get('host')}/api`
      return res.status(200).json({
         message: `Categoria ID: '${id}' deletada com sucesso!`,
         _links: buildLinks(baseUrl, 'categories', category.id, ['POST', 'GET'])
      })
   }
}

module.exports = (new categoryController())