const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)

const app = express()
const port = process.env.PORT || 3000

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
                forecast: weather,
                location: location.place,
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

app.listen(port, () => {
    console.log('Server is up on port 3000')
})