const HttpError = require('../models/http-error')

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

const getPlaceById = (req,res,next) => {
    const placeId = req.params.placeId
    const place = DUMMY_PLACES.find(p => p.id === placeId)
    if (!place) {
        throw new HttpError('Could not find a place for the provided id',404)
    }
    res.json({place})
}

const getPlacesByUserId = (req,res,next) => {
    const userId = req.params.userId
    const places = DUMMY_PLACES.filter(p => p.creator === userId)
    if (places.length === 0) {
        const error = new HttpError('Could not find a place for the provided user id',404)
        next(error)
        return
    }
    res.json({places})
}

const createPlace = (req,res,next) => {
    const { title, description, coordinates, address, creator } = req.body
    const createdPlace = {
        id: Math.floor(Math.random()*10000),
        title,
        description,
        location: coordinates,
        address,
        creator
    }
    DUMMY_PLACES.push(createdPlace)
    res.status(201).json({place: createdPlace})
}

const updatePlace = (req,res,next) => {
    const { title, description } = req.body
    const placeId = req.params.placeId

    const updatedPlace = { ...DUMMY_PLACES.find(p => p.id === placeId) }
    const placeIndex = DUMMY_PLACES.findIndex(p => p.id === placeId)
    if (placeIndex < 0) {
        throw new HttpError('Could not find a place for the provided id',404)
    }

    updatedPlace.title = title
    updatedPlace.description= description
    DUMMY_PLACES[placeIndex] = updatedPlace

    res.status(200).json({place: updatedPlace})
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