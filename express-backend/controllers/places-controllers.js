const { validationResult } = require('express-validator')

const HttpError = require('../models/http-error')
const getCoordsForAddress = require('../util/location')
const Place = require('../models/place-model')

const DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Empire State Building',
        description: 'One of the most famous sky scrapers in the world',
        location: {
            lat: 40.7484474,
            lng: -73.9871516
        },
        address: '20 W 34th St, New York NY 10001',
        creator: 'u1'
    }
]

const getPlaceById = async (req,res,next) => {
    const placeId = req.params.placeId
    try {
        const place = await Place.findById(placeId)
        if (!place) {
            const error = new HttpError('Could not find a place for the provided id',404)
            return next(error)
        }
        res.json({place: place.toObject({getters: true})})
    } catch (err) {
        const error = new HttpError('Something went wrong, could not find a place',500)
        return next(error)
    }
}

const getPlacesByUserId = async (req,res,next) => {
    const userId = req.params.userId

    try {
        const places = await Place.find({ creator: userId })
        if (!places || places.length === 0) {
            const error = new HttpError('Could not find a place for the provided user id',404)
            next(error)
            return
        }
        res.json({
            places: places.map(
                place => place.toObject({ getters:true })
            )
        })
    } catch (err) {
        const error = new HttpError('Fetching places failed, please try again later',500)
        next(error)
        return
    }
}

const createPlace = async (req,res,next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        console.error(errors)
        next(new HttpError('Invalid input data, please check your info',422))
    }

    const { title, description, address, creator } = req.body

    try {
        const coordinates = await getCoordsForAddress(address)

        const createdPlace = new Place({
            title,
            description,
            location: coordinates,
            address,
            creator,
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Atop_the_Rock_%288721964134%29.jpg/1280px-Atop_the_Rock_%288721964134%29.jpg'
        })

        await createdPlace.save()
        res.status(201).json({place: createdPlace})

    } catch (err) {
        const error = new HttpError('Something went wrong, please try again later',500)
        next(error)
        return
    }
}

const updatePlace = async (req,res,next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        console.error(errors)
        throw new HttpError('Invalid input data, please check your info',422)
    }

    const { title, description } = req.body
    const placeId = req.params.placeId

    try {
        const place = await Place.findById(placeId)
        place.title = title
        place.description = description
        await place.save()
        res.status(200).json({place: place.toObject({getters: true})})
    } catch (err) {
        const error = new HttpError('Something went wrong, could not update place',500)
        next(error)
        return
    }
}

const deletePlace = (req,res,next) => {
    const placeId = req.params.placeId
    const placeIndex = DUMMY_PLACES.findIndex(p => p.id === placeId)
    if (placeIndex < 0) {
        throw new HttpError('Could not find a place for the provided id',404)
    }

    DUMMY_PLACES.splice(placeIndex,1)
    res.status(200).json({message: 'Deleted place'})
}

module.exports = {
    getPlaceById,
    getPlacesByUserId,
    createPlace,
    updatePlace,
    deletePlace
}