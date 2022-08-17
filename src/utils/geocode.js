
const request = require('postman-request')

const geocode = (address, callback) => {
    const reqLatLong = {
        url: 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1Ijoiam9ydXBhY3MiLCJhIjoiY2tvNTlxN2I1MWh2djJvbnMyeGVwaGtwdSJ9.E18Vhhjw06smDANbaqJ3Sw&limit=1',
        time: true,
        json: true
    }

    request(reqLatLong, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location service')
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.')
        } else {
            const latlong = body.features[0].center
            const latitude = latlong[1]
            const longitude = latlong[0]
            const place = body.features[0].place_name
            callback(undefined, {latitude, longitude, place})
        }
    });
}

module.exports = geocode;
