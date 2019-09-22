const path = require('path')
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express()

//setup directories for the templates and for the public folders
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

// setup for the engine and views for he hbs packet
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

//routes
app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Nikola'
    })
})

app.get('/about',(req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Nikola'
    })
})

app.get('/help', (req, res) =>{
    res.render('help', {
        helpText:'There is no help for you',
        title: "Help",
        name: 'Nikola'
    })
})
app.get('/weather', (req, res) =>{
    if (!req.query.address){
        return res.send({
            'error': 'you have to provide address'
        });
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send( { error })
        }

        forecast(latitude, longitude, (error, forecastData) =>{
            if(error) {
                return res.send({error})
            }

            res.send({
                address: req.query.address,
                location,
                forecast: forecastData
            })
        })
    });
});

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        message: 'Help article not found',
        name: 'nikola'
    })
})

app.get('*',(req, res) =>{
    res.render('error', {
        title:' 404',
        message:'Page not found',
        name:'nikola'
    })
})

//start the server
app.listen(3300, () => {
    console.log('resver is up on port 3300')
});