const request = require('request')

const forecast = (longtitude, latitude, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=040f1874710b3c9a745666f1d5b372c0'

    request({url, json: true}, (error, { body }) => {
        if(error)
        {
            callback('Unable to connect to weather service!', undefined)
        }
        else if(body.message)
        {
            callback(body.message, undefined)
        }
        else
        {
            callback(undefined, 'There is ' + body.main.temp + ' degress of temp and humidity level is ' + body.main.humidity + '. '+ body.weather[0].description + '. Now this is the updated string command code!')
        }
        
    })
}




module.exports = forecast