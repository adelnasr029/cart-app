

module.exports = {
    getCartItems: async (req, res) => {
        const cartItems = await db.collection('cartItems').find().toArray()
        res.render('cart', {selectedItems: cartItems})
    },
    createCartItem: async (req,res) => {
        db.collection('cartItems').insertOne({name: req.body.name, price: req.body.price, image: req.body.image})
        .then(result => {
            console.log('Item added to Cart')
        })
    }
}