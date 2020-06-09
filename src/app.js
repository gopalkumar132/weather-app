const express = require('express')
const path = require('path')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// define path for Express config
const statciPathDir = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlerbar and view location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(statciPathDir))

app.get('', (req, res)=> {
    res.render('index', {
        title: 'Weather',
        name: 'Use this site to get your weather'
    })
})

app.get('/about', (req, res)=> {
    res.render('about', {
        title: 'About Us'
    })
})

app.get('/help', (req, res)=> {
    res.render('help', {
        title: 'Help',
        helpText: 'This is some helpfull text'
    })
})

app.get('/help/*', (req, res)=> {
    res.render('404page', {
        title: '404',
        erroMessage: 'Help Article Not Found'
    })
})

app.get('/weather', (req, res)=> {
    if(!req.query.location) {
        res.send({
            error: 'You Must provide a location'
        })
    } else {
        geocode(req.query.location, (error, {latitude, longitude, placename}={})=> {
            if(error) {
                res.send({
                    error: error
                })
            } else {
                forecast(latitude, longitude, (error, data)=> {
                    if(error) {
                        res.send({
                            error: error
                        })
                    } else {
                        res.send({
                            data: data,
                            placename: placename
                        })
                    }
                })
            }
        })
    }
})

app.get('*', (req, res)=> {
    res.render('404page', {
        title: '404',
        erroMessage: 'Page Not Found'
    })
})


app.listen(3000, ()=> {
    console.log('Server is running on port: 3000')
})