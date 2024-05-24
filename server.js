require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const Item = require('./models/Item')
const app = express()
const port = process.env.PORT || 4000

//conncect to MongoDB
mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@experimental.fno2olz.mongodb.net/${process.env.MONGODB_DATABASE_NAME}?retryWrites=true&w=majority&appName=experimental`)
.then( () => console.log('MongoDb connected'))
.catch(err => console.log(err))
let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'resturant'

MongoClient.connect(dbConnectionStr)
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })

//middleware
app.use(cors())
app.use(express.static('public')) //tells server static folder location
//they work together help server to parse incoming req
app.use(express.urlencoded({extended: false}))//parse req of str&arr
app.use(express.json())//parse json req
app.set('view engine', 'ejs')

//Routes 
app.put('/add', (request, response) => {
    console.log(request.body)
    db.collection('menuItems').find({name: request.body.itemName})
    .then(result => {
        console.log('Team added')
    })
    .catch(error => console.error(error))

})
app.get('/', (req, res) => {
    res.render('index')
})

app.get('/item', async (req, res) => {
    const items = await Item.find({})
    res.render('item', {items})
})
app.get('/menu', async (req, res) => {
    const menuItems = await db.collection('menuItems').find().toArray()
    res.render('menu.ejs', {chairs: menuItems})
})
app.get('/cart', async (req, res) => {
    const cartItems = await db.collection('cartItems').find().toArray()
    res.render('cart.ejs', {selectedItems: cartItems})
})
//Create 
app.post('/item', async (req, res) => {
    const newItem = new Item(req.body)
    try {
        await newItem.save()
        res.redirect('/item')
    } catch(err) {
        res.redirect('/item?error=true')
    }
 })
app.post('/cart', async (req,res) => {
    db.collection('cartItems').insertOne({name: req.body.name, price: req.body.price, image: req.body.image})
    .then(result => {
        console.log('Item added to Cart')
    })
})
//Update 
app.post('/item/update/:id', async (req, res) => {
    const {id} = req.params 
    const {name, description}  = req.body
    try {
        await Item.findByIdAndUpdate(id, {name, description})
        res.redirect('/item')
    } catch(err) {
        res.redirect('/item?error=true')
    }
 })

 //Delete
app.delete('/item/delete/:id', async (req, res) => {
    const {id} = req.params 
    try {
        await Item.findByIdAndDelete(id)
        res.status(200).json({message: 'Item deleted successfully'})
    } catch(err) {
        res.redirect('/item?error=true')
    }
 })

//Start the server
app.listen(port, () => {
    console.log(`Server running on : http://localhost:${port}`)
})

 // add to db api 
// app.post('/addobj', (request, response) => {
//     db.collection('menuItems').insertMany([
//     {
//         "id": 1,
//         "name":" LD01 LOUNGE CHAIR",
//         "price": 200,
//         "image": "image/1.png"
//     },
//     {
//         "id": 2,
//         "name":" LD02 LOUNGE CHAIR",
//         "price": 250,
//         "image": "image/2.png"
//     },
//     {
//         "id": 3,
//         "name":" LD03 LOUNGE CHAIR",
//         "price": 290,
//         "image": "image/3.png"
//     },
//     {
//         "id": 4,
//         "name":" LD04 LOUNGE CHAIR",
//         "price": 200,
//         "image": "image/4.png"
//     },
//     {
//         "id": 5,
//         "name":" LD05 LOUNGE CHAIR",
//         "price": 300,
//         "image": "image/5.png"
//     },
//     {
//         "id": 6,
//         "name":" LD06 LOUNGE CHAIR",
//         "price": 200,
//         "image": "image/6.png"
//     },
//     {
//         "id": 7,
//         "name":" LD07 LOUNGE CHAIR",
//         "price": 200,
//         "image": "image/7.png"
//     },
//     {
//         "id": 8,
//         "name":" LD08 LOUNGE CHAIR",
//         "price": 200,
//         "image": "image/8.png"
//     }

// ])
//     .then(result => {
//         console.log('Todo Added')
//         response.redirect('/')
//     })
//     .catch(error => console.error(error))
// })