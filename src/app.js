const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)

const app = express()

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Setup handlebars engine and views location
app.set('view engine', 'hbs') // handlebars setup
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Joel Pascual'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Joel'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Joel Here'
    })
})

app.get('/weather', (req, res) => {
    const { address } = req.query

    if (!address){
        res.send ({
            error: "You must provide an address"
        })
        return
    }

    geocode(address, (error, location) => {
        if (error){
            res.send ({
                error: error
            })
            return;
        }

        forecast(location, (error, weather) => {
            if (error) {
                res.send ({
                    error: error
                })
                return;
            }

            res.send({
                forecast: weather.current.weather_descriptions[0] + '. It is currently ' + weather.current.temperature + ' degrees out. There is ' + weather.current.precip + ' chance of rain',
                location: weather.location.name + ', ' + weather.location.region + ', ' + weather.location.country,
                address: address,
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        message: 'Help article not found',
        title: 'Help',
        name: 'Joel Here'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        message: 'Page not found',
        title: 'Page not found',
        name: 'Joel Here'
    })
})

// app.com
// app.com/help
// app.com/about

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})