const Category = require('../models/categoryModel')
const Product  = require('../models/productModel')

const { buildLinks } = require('../utils/linksHelper')

class categoryController {
   async getAllCategories(req, res) {
      try {
         const categories = await Category.findAll()
         const baseUrl = `${req.protocol}://${req.get('host')}/api`

         const result = categories.map(c => ({
            category: c,
            _links:  buildLinks(baseUrl, 'categories', c.id)
         }))

         return res.status(200).json({
            count: categories.length,
            items: result,
            _links: buildLinks(baseUrl, 'categories')
         })
      } catch (error) {
         res.status(500).json({ error:'Erro ao listar todas as categorias!', message: error.message })
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

         const baseUrl = `${req.protocol}://${req.get('host')}/api`
         return res.status(200).json({
            category,
            _links: buildLinks(baseUrl, 'categories', category.id)
         })
      } catch (error) {
         res.status(500).json({ error: 'Erro ao listar a categoria pelo ID!', message: error.message })
      }
   }

   async createCategories(req, res) {
      try {
         const { name } = req.body
         if (!name) {
            return res.status(400).json('Nome da categoria é obrigatório!')
         }
   
         const existingCategory = await Category.findOne({ where: { name }})
         if (existingCategory) {
            return res.status(400).json('Categoria com esse nome já existe!')
         }
   
         const category = await Category.create({ name })

         const baseUrl = `${req.protocol}://${req.get('host')}/api`
         return res.status(201).json({
            category,
            _links: buildLinks(baseUrl, 'categories', category)
         })
      } catch (error) {
         return res.status(500).json({ error: 'Erro ao criar categoria!', message: error.message })
      }
   }

   async updateCategories(req, res) {
      try {
         const id = Number(req.params.id)
         const { name } = req.body
         if (!id || !name) {
            res.status(400).json('Preencha todos os campos!')
         }

         const category = await Category.findByPk(id)
         if (!category) {
            return res.status(404),json('Categoria não encontrada!')
         }

         const existingCategory = await Category.findOne({ where: { name }})
         if (existingCategory && existingCategory.id !== id) {
            return res.status(400).json('Categoria com esse nome já existe!')
         }

         category.name = name
         await category.save()

         const baseUrl = `${req.protocol}://${req.get('host')}/api`
         return res.status(200).json({
            category,
            _links: buildLinks(baseUrl, 'categories', category.id)
         })
      } catch (error) {
         return res.status(500).json({ error: 'Erro ao atualizar categoria!', message: error.message })
      }
   }

   async deleteCategories(req, res) {
      try {
         const id = Number(req.params.id)
         if (!id) {
            return res.status(400).json('ID da categoria não informado!')
         }

         const category = await Category.findByPk(id)
         if (!category) {
            return res.status(404).json('Categoria não encontrada!')
         }

         const product = await Product.findAll({ where: { categoryId: id }})
         if (product.length > 0) {
            return res.status(400).json('Categoria com produtos associados não pode ser excluída!')
         }

         await category.destroy()

         const baseUrl = `${req.protocol}://${req.get('host')}/api`
         return res.status(200).json({
            message: 'Categoria deletada com sucesso!',
            _links: buildLinks(baseUrl, 'categories')
         })
      } catch (error) {
         return res.status(500).json({ error: 'Erro ao deletar categoria!', message: error.message })
      }
   }
}

module.exports = (new categoryController())