const Item = require('../models/Item')

module.exports = {
    getItem: async (req, res) => {
        const items = await Item.find({})
        res.render('item', {items})
    },
    createItem: async (req, res) => {
        const newItem = new Item(req.body)
        try {
            await newItem.save()
            res.redirect('/item')
        } catch(err) {
            res.redirect('/item?error=true')
        }
     },
    updateItem: async (req, res) => {
        const {id} = req.params 
        const {name, description}  = req.body
        try {
            await Item.findByIdAndUpdate(id, {name, description})
            res.redirect('/item')
        } catch(err) {
            res.redirect('/item?error=true')
        }
     },
    deleteItem: async (req, res) => {
        const {id} = req.params 
        try {
            await Item.findByIdAndDelete(id)
            res.status(200).json({message: 'Item deleted successfully'})
        } catch(err) {
            res.redirect('/item?error=true')
        }
     }
}