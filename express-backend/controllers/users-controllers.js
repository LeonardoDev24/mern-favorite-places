const { validationResult } = require('express-validator')
const HttpError = require('../models/http-error')
const User = require('../models/user-model')

const DUMMY_USERS = [
    {
        id: 'u1',
        name: 'Max Schwarz',
        email: 'max.schwarz@email.com',
        password: '********'
    },
    {
        id: 'u2',
        name: 'Clark Kent',
        email: 'clark.kent@duck.com',
        password: '**********'
    }
]

const getUsers = (req,res,next) => {
    res.json({users: DUMMY_USERS})
}

const signup = async (req,res,next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        console.error(errors)
        const error = new HttpError('Invalid input data, please check your info',422)
        next(error)
        return
    }

    const { name, email, password } = req.body

    try {
        const existingUser = await User.findOne({ email: email})
        if (existingUser) {
            const error = new HttpError('User exists already, please login instead',422)
            next(error)
            return
        }
        
        const createdUser = new User({
            name,
            email,
            password,
            image: 'https://images.pexels.com/photos/20503680/pexels-photo-20503680.jpeg',
            places: 'p1'
        })

        await createdUser.save()
        res.status(201)
            .json({
                user: createdUser.toObject({getters: true})
            })
    } catch (err) {
        const error = new HttpError('Signing up failed, please try again later',500)
        next(error)
        return
    }
}

const login = async (req,res,next) => {
    const { email, password } = req.body

    try {
        const existingUser = await User.findOne({ email: email })
        if (!existingUser || existingUser.password !== password) {
            const error = new HttpError('Invalid credentials, could not log you in',401)
            next(error)
            return
        }
    } catch (err) {
        const error = new HttpError('Loggin in failed, please try again later',500)
        next(error)
        return
    }

    res.json({message: 'Logged in successfully!'})
}

module.exports = {
    getUsers,
    signup,
    login
}