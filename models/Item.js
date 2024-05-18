const mongoose = require('mongoose')
//force the data tht we're putting in the db to have some structure to have some validation to have some rules and criteria
const ItemSchema =  new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Item', ItemSchema)


//we are passing data through a blueprint before it gets to the db and that blueprint tells the db everything it needs to know in order to fetch data for us
//another thing the blueprint does think like an architect the architect look at the building and check it against the blueprint to assess if it meets the specification outlined in the blueprint or not
//the blueprint validates what has been done is correct and so mongoose contain a schema which is the blueprint and the blueprint validates the data that has been passed through it