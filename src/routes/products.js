const express = require('express')
const router = express.Router()
const {ProductController} = require('../controllers/products')
const {validateStock} = require('../helpers/stock')
const { protect } = require('../middleware/auth')
const upload = require('../middleware/upload')
const {hitCache,clearCache} = require("../middleware/redis")

// router.get('/:Order',ProductController.ProductController.getTransactions)
router.get('/:id',protect,hitCache, ProductController.getProductDetail)
router.get('/', ProductController.getProduct)
// router.post('/',ProductController.ProductController.insert)
router.post('/',upload.single('photo'), ProductController.insert)
router.put('/:id',protect,clearCache, ProductController.update)
router.delete('/:id',protect,clearCache, ProductController.delete)
// router.get('/search', ProductController.ProductController.searchProductname)

module.exports = router
