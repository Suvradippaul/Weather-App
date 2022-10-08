const cityField = document.getElementById('city');
const cityErrorMessage = document.getElementById('city-error-message');
const tempField = document.getElementById('temp');
const weatherField = document.getElementById('weather');
const humidityField = document.getElementById('humidity');
const pressureField = document.getElementById('pressure');
const windField = document.getElementById('wind');

let cityName = "";
let temp = "";
let humidity = "";
let pressure = "";
let weather = "";
let windSpeed = "";

// use your own API Key
const KEY = '5313e5a818e901ec38916f96eab76e8d';

cityField.addEventListener("keyup", function(event) {
    cityErrorMessage.classList.add("hide");
    if (event.key === "Enter") {
        event.preventDefault();
        search();
    }
})

function search() {
    cityName = cityField.value;
    console.log(cityName);
    fetchData(cityName);
}

function fetchData(cityName) {
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + KEY ;
    fetch(url)
    .then((response) => { return response.json()})
    .then((data) => {
        if(data.cod === "404") {
            cityErrorMessage.classList.remove("hide");
            return;
        };

        console.log(data);
        temp = data.main["temp"];
        // converting Kelvin to Celsius upto 2 decimal digits
        temp = Math.round((temp - 273.15));
        humidity = data.main["humidity"];
        pressure = data.main["pressure"];
        iconId = data.weather[0]["icon"];
        weather = data.weather[0]["main"];
        // converting wind speed from m/s to km/hr
        windSpeed = (data.wind["speed"] * 3.6).toFixed(2);
        showDetails();
    })
}

function showDetails() {
    tempField.innerHTML = temp + '&#176;' + 'C';
    weatherField.innerHTML = weather;
    humidityField.innerHTML = humidity + '%';
    pressureField.innerHTML = pressure + ' mb';
    windField.innerHTML = windSpeed + ' km/h';
}