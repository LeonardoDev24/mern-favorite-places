const express = require('express')
const router = express.Router()

const placesControllers = require('../controllers/places-controllers')

router.get('/user/:userId',placesControllers.getPlaceByUserId)
router.get('/:placeId',placesControllers.getPlaceById)
router.post('/',placesControllers.createPlace)
router.patch('/:placeId',placesControllers.updatePlace)

module.exports = router