const express = require('express');
const app = express()
const cors = require('cors');
// const MongoClient = require('mongodb').MongoClient;
const connectDB = require('./config/database')


require('dotenv').config({path: './config/.env'}) //this line enables our app to see env var

//conncect to MongoDB
connectDB()

const homeRoute = require('./routes/home')
const itemRoute = require('./routes/item')
const menuRoute = require('./routes/menu')
const cartRoute = require('./routes/cart')
//middleware
app.use(cors())
app.use(express.static('public')) //tells server static folder location
app.use(express.urlencoded({extended: false}))//parse req of str&arr
app.use(express.json())//parse json req
app.set('view engine', 'ejs')

//Routes 
app.use('/', homeRoute)
app.use('/item', itemRoute)
app.use('/menu', menuRoute)
app.use('/cart', cartRoute)
//Start the server
const port = process.env.PORT || 4000
app.listen(port, () => {
    console.log(`Server running on : http://localhost:${port}`)
})

module.exports.MongoClient

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