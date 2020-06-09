const request = require('request')

forecast = (latitude, longitude, callback)=> {
    url = 'https://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&units=metric&appid=9e1710ffff3b26b6a3fb9872140463f2'
    
    request({url, json: true}, (error, { body })=> {
        if(error) {
            callback('unable to connect', undefined)
        } else {
            callback(undefined, body.name + " current temprature is " + body.main.temp+ " degree celsius")
        }
    })
}

module.exports = forecast