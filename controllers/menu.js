const MenuItems = require('../models/MenuItems')

module.exports = {
    getMenu: async (req, res) => {
        const chairs = await MenuItems.find({})
        res.render('menu.ejs', {chairs})
    },
}