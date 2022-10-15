require('dotenv').config()

exports.handler = async (event, context) => {
    const city = event.queryStringParameters.cityName
    const API_KEY = process.env.API_KEY
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
    const response = await fetch(url)
    const data = await response.json()
    return {
        statusCode : 200,
        body : JSON.stringify(
            {
                res : data
            }
        )
    }
}