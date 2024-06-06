const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth') 
const homeController = require('../controllers/home')

const cartController = require('../controllers/cartController');

const { ensureAuth, ensureGuest } = require('../middleware/auth')


router.use(cartController.computeCartItemCount);


router.get('/', homeController.getIndex)
router.get('/ar',homeController.getIndexAr)
router.get('/login', authController.getLogin)
router.post('/login', authController.postLogin)
router.get('/logout', authController.logout)
router.get('/signup', authController.getSignup)
router.post('/signup', authController.postSignup)

module.exports = router