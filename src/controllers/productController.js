const Category = require('../models/categoryModel')
const Product = require('../models/productModel')

const { buildLinks } = require('../utils/linksHelper')

class productController {
   async getAllProducts(req, res) {
      try {
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
      } catch (error) {
         res.status(500).json({ error:'Erro ao buscar todos os produtos!', message: error.message })
      }
   }

   async getProductsById(req, res) {
      try {
         const { id } = req.params
         const idProduct = Number(id)
         if (!idProduct) {
            return res.status(400).json('ID do produto não informado!')
         }
   
         const product = await Product.findByPk(idProduct)
         if (!product) {
            return res.status(404).json('Produto não encontrado!')
         }
         
         const baseUrl = `${req.protocol}://${req.get('host')}/api`
         return res.status(200).json({
            product,
            _links: buildLinks(baseUrl, 'products', product.id)
         })
      } catch (error) {
         res.status(500).json({ error: 'Erro ao buscar o produto pelo ID!', message: error.message })
      }
   }

   async createProducts(req, res) {
      try {
         const { name, price, quantity, description, categoryId } = req.body
         if (!name || price == null || !quantity || !description || !categoryId) {
            return res.status(400).json('Preencha todos os campos!')
         }

         const existingProduct = await Product.findOne({ where: { name }})
         if (existingProduct) {
            return res.status(400).json('Produto com esse nome já existe!')
         }

         const category = await Category.findByPk(categoryId)
         if (!category) {
            return res.status(404).json('ID da categoria não encontrada!')
         }

         const product = await Product.create({ name, price, quantity, description, categoryId })
         
         const baseUrl = `${req.protocol}://${req.get('host')}/api`
         return res.status(201).json({
            product,
            _links: buildLinks(baseUrl, 'products', product.id)
         })
      } catch (error) {
         res.status(500).json({ error:'Erro ao criar produto!', message: error.message })
      }
   }

   async updateProducts(req, res) {
      try {
         const id = Number(req.params.id)
         const { name, price, quantity, description, categoryId } = req.body
         if (!id || !name || !price || quantity == null || !categoryId) {
            return res.status(400).json('Preencha todos os campos!')
         }

         const product = await Product.findByPk(id)
         if (!product) {
            return res.status(404).json('Produto não encontrado!')
         }

         const category = await Category.findByPk(categoryId)
         if (!category) {
            return res.status(404).json('ID da categoria não encontrada')
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
      } catch (error) {
         return res.status(500).json({ error:'Erro ao atualizar produto!', message: error.message })
      }
   }

   async deleteProducts(req, res) {
      try {
         const id = Number(req.params.id)
         if (!id) {
            return res.status(400).json('ID do produto não informado!')
         }

         const product = await Product.findByPk(id)
         if (!product) {
            res.status(404).json('Produto não escontrado!')
         }

         await product.destroy()

         const baseUrl = `${req.protocol}://${req.get('host')}/api`
         return res.status(200).json({
            message: 'Produto deletado com sucesso!',
            _links: buildLinks(baseUrl, 'products', product.id, ['POST', 'GET'])
         })
         } catch (error) {
         return res.status(500).json({ error:'Erro ao deletar o produto!', message: error.message })
      }
   }
}  

module.exports = (new productController())
 