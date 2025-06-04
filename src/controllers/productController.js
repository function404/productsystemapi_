const ConflictError = require('../errors/conflictError')
const MissingValuesError = require('../errors/missingValuesError')
const NotFoundError = require('../errors/notFoundError')

const Category = require('../models/categoryModel')
const Product = require('../models/productModel')

const { buildLinks } = require('../utils/linksHelper')

class productController {
   async getAllProducts(req, res) {
      const products = await Product.findAll()
      const baseUrl = `${req.protocol}://${req.get('host')}/api`
      
      const result = products.map(p => ({
         product: p,
         _links: buildLinks(baseUrl, 'products', p.id)
      }))
      
      return res.status(200).json({
         count: products.length,
         items: result,
      })
   }

   async getProductsById(req, res) {
      const id = Number(req.params.id)
      if (!id) {
         throw new MissingValuesError({ id })
      }

      const product = await Product.findByPk(id)
      if (!product) {
         throw new NotFoundError(`Produto com ID: '${id}' não encontrado!`)
      }
      
      const baseUrl = `${req.protocol}://${req.get('host')}/api`
      return res.status(200).json({
         product,
         _links: buildLinks(baseUrl, 'products', product.id)
      })
   }

   async createProducts(req, res) {
      const { name, price, quantity, description, categoryId } = req.body
      if (!name || price == null || !quantity || !description || !categoryId) {
         throw new MissingValuesError({ name, price, quantity, description, categoryId })
      }

      const existingProduct = await Product.findOne({ where: { name }})
      if (existingProduct) {
         throw new ConflictError(`Produto com esse nome: '${name}' já existe!`)
      }

      const category = await Category.findByPk(categoryId)
      if (!category) {
         throw new NotFoundError(`ID: '${categoryId}' da categoria não encontrado!`)
      }

      const product = await Product.create({ name, price, quantity, description, categoryId })
      
      const baseUrl = `${req.protocol}://${req.get('host')}/api`
      return res.status(201).json({
         product,
         _links: buildLinks(baseUrl, 'products', product.id)
      })
   }

   async updateProducts(req, res) {
      const id = Number(req.params.id)
      const { name, price, quantity, description, categoryId } = req.body
      if (!id || !name || !price || quantity == null || !categoryId) {
         throw new MissingValuesError({ id, name, price, quantity, description, categoryId })
      }

      const product = await Product.findByPk(id)
      if (!product) {
         throw new NotFoundError(`Produto com ID: '${id}' não encontrado!`)
      }

      const category = await Category.findByPk(categoryId)
      if (!category) {
         throw new NotFoundError(`ID: '${categoryId}' da categoria não encontrado!`)
      }

      product.name = name
      product.price = price
      product.quantity = quantity
      product.description = description
      product.categoryId = categoryId
      await product.save()

      const baseUrl = `${req.protocol}://${req.get('host')}/api`
      return res.status(200).json({
         product,
         _links: buildLinks(baseUrl, 'categories', category.id)
      })
   }

   async deleteProducts(req, res) {
      const id = Number(req.params.id)
      if (!id) {
         throw new MissingValuesError({ id })
      }

      const product = await Product.findByPk(id)
      if (!product) {
         throw new NotFoundError(`Produto com ID: '${id}' não encontrado!`)
      }

      await product.destroy()

      const baseUrl = `${req.protocol}://${req.get('host')}/api`
      return res.status(200).json({
         message: `Produto ID: '${id}' deletado com sucesso!`,
         _links: buildLinks(baseUrl, 'products', product.id, ['POST', 'GET'])
      })
   }
}  

module.exports = (new productController())