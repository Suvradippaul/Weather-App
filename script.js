const cityField = document.getElementById('city');
const cityErrorMessage = document.getElementById('city-error-message');
const tempField = document.getElementById('temp');
const weatherField = document.getElementById('weather');
const humidityField = document.getElementById('humidity');
const pressureField = document.getElementById('pressure');
const windField = document.getElementById('wind');
const citySearchStatus = document.getElementById('city-error-message');

// Clears the input field, when refreshing the page.
cityField.value = '';
cityErrorMessage.innerHTML = '';

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
    cityErrorMessage.innerHTML = '';
    if (event.key === "Enter") {
        event.preventDefault();
        search();
    }
})

function search() {
    cityName = cityField.value;
    // For empty search clicks
    if(!cityName) {
      cityErrorMessage.classList.remove('hide');
      cityErrorMessage.innerHTML = 'Enter a city name';
      hideDetails();
      return;
    }
    console.log(cityName);
    fetchData(cityName);
}

function fetchData(cityName) {
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + KEY ;
    fetch(url)
    .then((response) => { return response.json()})
    .then((data) => {
      // Checking for cod !== 200 : As there could be other cod errors like 400, 401 etc.
      if (data.cod !== 200) {
        cityErrorMessage.classList.remove('hide');
        cityErrorMessage.innerHTML = 'City not found';
        hideDetails();
        return;
      }

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

function hideDetails() {
  temp = '';
  humidity = '';
  pressure = '';
  weather = '';
  windSpeed = '';
  tempField.innerHTML = '___';
  weatherField.innerHTML = '___';
  humidityField.innerHTML = '___';
  pressureField.innerHTML = '___';
  windField.innerHTML = '___';
}
