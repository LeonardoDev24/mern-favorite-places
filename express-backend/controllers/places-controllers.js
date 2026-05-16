const { validationResult } = require('express-validator')

const HttpError = require('../models/http-error')
const getCoordsForAddress = require('../util/location')
const Place = require('../models/place-model')
const User = require('../models/user-model')
// const mongoose = require('mongoose')

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

    // const session = await mongoose.startSession()
    // session.startTransaction()

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

        const user = await User.findById(creator)
        if (!user) {
            const error = new HttpError('We could not find user for provided ID',404)
            next(error)
            return
        }

        await createdPlace.save()
        user.places.push(createdPlace)
        await user.save()
        // await session.commitTransaction()

        res.status(201).json({place: createdPlace})

    } catch (err) {
        // await session.abortTransaction()
        const error = new HttpError('Something went wrong, please try again later',500)
        next(error)
        return
    }
}

const updatePlace = async (req,res,next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        console.error(errors)
        const error = new HttpError('Invalid input data, please check your info',422)
        next(error)
        return
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

const deletePlace = async (req,res,next) => {
    const placeId = req.params.placeId
    // const session = await mongoose.startSession()
    // session.startTransaction()
    try {
        const place = await Place.findById(placeId).populate('creator')
        if (!place) {
            const error = new HttpError('Could not find place for this ID',404)
            next(error)
            return
        }

        place.creator.places.pull(place)
        await place.deleteOne()
        await place.creator.save()
        // await session.commitTransaction()

        res.status(200).json({message: 'Deleted place'})
    } catch (err) {
        // await session.abortTransaction()
        const error = new HttpError('Something went wrong, could not delete place',500)
        next(error)
        return
    }
}

module.exports = {
    getPlaceById,
    getPlacesByUserId,
    createPlace,
    updatePlace,
    deletePlace
}