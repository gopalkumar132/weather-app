const request = require('request')

geocode = (location, callback)=> {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(location) +'.json?access_token=pk.eyJ1IjoiZ29wYWwxMzIiLCJhIjoiY2thdGs1dzZlMDI4bTJ4bzkzZmI0ZnlsYiJ9.ly0W2xTtZXsrWpdfayzqgQ'
    request({url, json: true} ,(error, { body })=> {
        if(error) {
            callback('unable to connect', undefined)
        }
        else if(body.features.length === 0) {
            callback("location doesn't matched! try Again!", undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                placename: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode