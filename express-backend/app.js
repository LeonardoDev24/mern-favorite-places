const express = require('express')
const bodyParser = require('body-parser')

const placesRoutes = require('./routes/places-routes')
const HttpError = require('./models/http-error')

const app = express()

app.use(bodyParser.json())

app.use('/api/places',placesRoutes)

app.use((req,res,next) => {
    const error = new HttpError('Could not find this resource',404)
    throw error
})

// Default error handler
app.use((error,req,res,next) =>{
    if (res.headerSent) {
        next(error)
    }
    res.status(error.code || 500)
    res.json({message: error.message || 'An unknown error occurred!'})
})

app.listen(4040)