const HttpError = require('../models/http-error')

async function getCoordsForAddress(address) {
    const response = await fetch(
        `https://api.mapbox.com/search/geocode/v6/forward?q=${encodeURIComponent(address)}&access_token=${process.env.MAPBOX_ACCESS_TOKEN}`
    )

    if (!response.ok) {
        const error = new HttpError('Could not find a location for the specified address.', 422)
        throw error
    }

    const data = await response.json()

    if (!data.features || data.features.length === 0) {
        throw new HttpError('Could not find location.',404)
    }

    const [lng,lat] = data.features[0].geometry.coordinates
    const coordinates = {lat,lng}
    return coordinates
}

module.exports = getCoordsForAddress
