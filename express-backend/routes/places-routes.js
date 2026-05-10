const express = require('express')
const router = express.Router()

const placesControllers = require('../controllers/places-controllers')

router.get('/user/:userId',placesControllers.getPlaceByUserId)
router.get('/:placeId',placesControllers.getPlaceById)

module.exports = router