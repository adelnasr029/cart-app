const MenuItems = require('../models/MenuItems')

module.exports = {
    getMenu: async (req, res) => {
        const chairs = await MenuItems.find({})
        console.log(chairs)
        res.render('menu.ejs', {chairs})
    },
}