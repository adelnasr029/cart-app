const express = require('express')
const router = express.Router()
const cartController = require('../controllers/cart')
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, cartController.getCartItems)
router.post('/', ensureAuth, cartController.createCartItem)
router.post('/increment', cartController.incrementItem)
router.delete('/delete/:id', cartController.deleteCartItem)


module.exports = router 

