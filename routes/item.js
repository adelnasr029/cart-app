const express = require('express')
const router = express.Router()
const itemController = require('../controllers/item')

router.get('/', itemController.getItem )

router.post('/', itemController.createItem)
router.post('/item/update/:id', itemController.updateItem)
router.delete('/item/delete/:id', itemController.deleteItem)

module.exports = router