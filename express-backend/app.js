require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const fs = require('fs')

const placesRoutes = require('./routes/places-routes')
const usersRoutes = require('./routes/users-routes')
const HttpError = require('./models/http-error')

const app = express()

app.use(bodyParser.json())

app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin','http://127.0.0.1:3000')
    res.setHeader('Access-Control-Allow-Headers','*')
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, PATCH, DELETE')
    next()
})

app.use('/api/places',placesRoutes)
app.use('/api/users',usersRoutes)

app.use((req,res,next) => {
    const error = new HttpError('Could not find this resource',404)
    throw error
})

// Default error handler
app.use((error,req,res,next) =>{
    if (req.file) {
        fs.unlink(req.file.path,(err) => {
            console.error(err)
        })
    }
    if (res.headerSent) {
        next(error)
    }
    res.status(error.code || 500)
    res.json({message: error.message || 'An unknown error occurred!'})
})

mongoose.connect('mongodb://localhost:27017/FavPlaces')
    .then(() => {
        app.listen(4040,() => {
            console.info('Connection successfully!')
        })
    })
    .catch(error => console.log(error.message))