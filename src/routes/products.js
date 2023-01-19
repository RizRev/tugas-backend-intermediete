const express = require('express')
const router = express.Router()
const {ProductController} = require('../controllers/products')
const {validateStock} = require('../helpers/stock')
const { protect } = require('../middleware/auth')
const upload = require('../middleware/upload')
// const {hitCache,clearCache} = require("../middleware/redis")

// router.get('/:Order',ProductController.ProductController.getTransactions)
router.get('/:id',ProductController.getProductDetail)
router.get('/',protect, ProductController.getProduct)
router.get('/seller/:id',protect, ProductController.getProductSeller)

// router.post('/',ProductController.ProductController.insert)
router.post('/',upload,protect, ProductController.insert)
router.put('/:id',upload, ProductController.update)
router.delete('/:id', ProductController.delete)
// router.get('/search', ProductController.ProductController.searchProductname)

module.exports = router
