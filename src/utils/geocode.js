const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoiam9obm55MjMiLCJhIjoiY2swbW9oaHNuMHA1YjNjbWppd2t5dGZlaCJ9.fnNtCQRn1qAILtbiblhsbw&limit=1'
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services!')
        } else if (body.features.length === 0) {
            callback('Unable to find location, try another search')
        } else {
            const { center, place_name } = body.features[0]
            callback(undefined, {
                latitude: center[1],
                longitude: center[0],
                location: place_name
            })
        }


    })
}

module.exports = geocode
