const request = require('request')

const forecast = (lat,lon, callback) =>{
    const url = 'https://api.darksky.net/forecast/f9e35f39dec764915ba6bb2b362d11ee/'+ lat + ',' + lon +'?units=si'
    request({url, json: true},(error, {body}) => {
        if(error) {
            callback('Unable to connect to the location service!')
        }else if(body.code){
            callback("Unable to find a location!")
        }else{
            const { temperature, precipProbability, humidity, windSpeed} = body.currently
            callback(undefined, 'It is currently ' + temperature + ' degree outside. There is ' + 
            precipProbability + ' chance of rain. Humidity is ' + humidity + ' and wind blow with ' + windSpeed +' km/h')
        }
    })
}

module.exports = forecast


