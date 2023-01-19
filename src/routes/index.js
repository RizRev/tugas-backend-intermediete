const express = require('express')
const router = express.Router()
const ProductRouter = require('../routes/products')
const OrderRouter = require('../routes/order')
const CategoryRouter = require('../routes/category')
const UsersRouter = require('../routes/users')
const BagRouter = require("./bag");


router
.use('/products', ProductRouter)
.use('/order',OrderRouter)
.use('/category',CategoryRouter)
.use("/bag", BagRouter)
.use('/users',UsersRouter)


module.exports = router
