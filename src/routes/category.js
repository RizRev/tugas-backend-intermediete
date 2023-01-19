const express = require('express')
const { roleToko, protect } = require('../middleware/auth')
const router = express.Router()
const {CategoryController} = require('./../controllers/category')

router.get('/',protect,roleToko,CategoryController.getProduct)
router.post('/',protect,roleToko,CategoryController.insert)
router.put('/:id',roleToko,CategoryController.update)
router.delete('/:id',roleToko,CategoryController.delete)

module.exports = router