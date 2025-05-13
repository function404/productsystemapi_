const Product = require('../models/product')

class productController {
   async getAllProducts(req, res) {
      try {
         const products = await Product.findAll()
         return res.json(products)
      } catch (err) {
         res.status(500).json('Erro ao buscar produtos!', err)
      }
   }
}  

module.exports = (new productController())
 