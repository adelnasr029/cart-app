
const CartItems = require('../models/cartItems')

async function computeCartItemCount(req, res, next) {
    try {
        const userId = req.session.userId;
        const cart = await CartItems.countDocuments({userId:req.user.id})
        const itemCount = cart ? cart : 0;
        res.locals.cartItemCount = itemCount;
        next();
    } catch (err) {
        console.error('Error computing cart item count:', err);
        next(err);
    }
}

module.exports = { computeCartItemCount };