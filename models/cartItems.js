const mongoose = require('mongoose')


const cartSchema = new mongoose.Schema({
    name : {
        type: String
    },
    price: {
        type: Number
    },
    image: {
        type: String
    }
}, {
    collection: "cartItems"
})

module.exports = mongoose.model('CartItems', cartSchema)