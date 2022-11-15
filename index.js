const express = require('express')
const bodyParser = require('body-parser')
const connection = require('./config/connection')
const app = express()


// set body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));

// route
const appRoute = require('')
app.use('/', appRoute)

// server
app.listen(3000, () => {
    console.log('Server berjalan di port 3000')
})
