const express = require('express')
const { check } = require('express-validator')
const router = express.Router()

const placesControllers = require('../controllers/places-controllers')
const fileUpload = require('../middlewares/file-upload')

router.get('/user/:userId',placesControllers.getPlacesByUserId)
router.get('/:placeId',placesControllers.getPlaceById)
router.post(
    '/',
    fileUpload.single('image'),
    check('title').not().isEmpty(), 
    check('description').isLength({min: 5}),
    check('address').not().isEmpty(),
    placesControllers.createPlace
)
router.patch(
    '/:placeId',
    check('title').not().isEmpty(),
    check('description').isLength({min: 5}),
    placesControllers.updatePlace
)
router.delete('/:placeId',placesControllers.deletePlace)

module.exports = router