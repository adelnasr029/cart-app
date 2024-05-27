const express = require('express')
const router = express.Router()
const cartController = require('../controllers/cart')

router.get('/', cartController.getCartItems)
router.post('/', cartController.createCartItem)
router.delete('/delete/:id', cartController.deleteCartItem)


module.exports = router 

