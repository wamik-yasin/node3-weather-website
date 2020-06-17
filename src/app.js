const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geoCode')
const forecast = require('./utils/forecast')

const app = express()
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Wamik Yasin'
    }) 
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Wamik Yasin'
    }) 
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        text: 'Contact for help',
        name: 'Wamik Yasin'
    }) 
})

app.get('/weather', (req, res) => {
    if(!req.query.address)
    {
        return res.send({
            error: 'Please provide address!'
        })
    }

    geoCode(req.query.address, (error, data) => {
        if(error)
        {
            return res.send({error})
        }
        
        forecast(-75.7088, 44.1545, (error, data1) => {
            if(error)
            {
                return res.send({error})
            }
    
            res.send({
                data,
                data1
            })
          })
    })


    // res.send({
    //     forecast: 'Sunny day',
    //     location: req.query.address
    // })
})

app.get('/products', (req, res) => {

    if(!req.query.search)
    {
        return res.send({
            error: 'Provide search term'
        })
    }

    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Wamik Yasin',
        text: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Wamik Yasin',
        text: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up and running at port 3000')
})