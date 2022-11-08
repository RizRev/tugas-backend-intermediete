const express = require('express')
const router = express.Router()
const OrderController = require('./../controllers/order')

router.get('/',OrderController.OrderController.getProduct)
router.post('/',OrderController.OrderController.insert)
router.put('/:id',OrderController.OrderController.update)
router.delete('/:id',OrderController.OrderController.delete)

module.exports = router