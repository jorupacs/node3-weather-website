const { METHODS } = require('http')
const request = require('postman-request')

const forecast = ({latitude, longitude, location}, callback) => {
    const reqWeather = {
        url: 'http://api.weatherstack.com/current?access_key=94dc664a2b11f4fce9e14f20b1182074&query=' + latitude + ',' + longitude + '&units=f',
        time: true,
        json: true
    }
    
    request(reqWeather, (error, { body }) => {

        if (body.error) {
            callback('Unable to find location')
        } else {
            callback(undefined, body)            
        }
    });
}

module.exports = forecast;