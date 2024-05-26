const CartItems = require('../models/cartItems')


module.exports = {
    getCartItems: async (req, res) => {
        try{
            const selectedItems = await CartItems.find({})
            res.render('cart', {selectedItems})
        } catch(err){
            console.log(err)
        }
    },
    createCartItem: async (req,res) => {
        const newItem = new CartItems({name: req.body.name, price: req.body.price, image: req.body.image})
        try{
            await newItem.save()
            res.redirect('/cart')
        } catch(err) {
            res.redirect('/cart?error=true')
        }
    }
}