const Product = require('../models/product')

class productController {
   async getAllProducts(req, res) {
      try {
         const products = await Product.findAll()
         return res.json(products)
      } catch (err) {
         res.status(500).json('Erro ao buscar todos os produtos!', err)
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
            return res.status(400).json('Produto não encontrado!')
         }
   
         return res.json(product)
      } catch (error) {
         res.status(500).json('Erro ao buscar o produto pelo ID!', error)
      }
   }
}  

module.exports = (new productController())
 