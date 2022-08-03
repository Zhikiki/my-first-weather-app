function formatedDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

function showDefaultCityTemp(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#humidity").innerHTML = `Humidity: ${Math.round(
    response.data.main.humidity
  )}%`;
  document.querySelector("#wind").innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )}km/h`;
  console.log(response.data);
}

function showDefaultCity(city) {
  let apiKey = `da6d6b75abd767e257a129a08b4d0f5d`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showDefaultCityTemp);
}

function chosenCity(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#current-city");

  cityInput = document.querySelector("#city-input");
  cityElement.innerHTML = cityInput.value;

  let apiKey = `da6d6b75abd767e257a129a08b4d0f5d`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function showTemperature(response) {
  let currentTemp = Math.round(response.data.main.temp);
  let currentHumidity = Math.round(response.data.main.humidity);
  let currentWind = Math.round(response.data.wind.speed);

  let displayTemp = document.querySelector("#current-temp");
  displayTemp.innerHTML = `${currentTemp}`;

  let displayHumidity = document.querySelector("#humidity");
  displayHumidity.innerHTML = `Humidity: ${currentHumidity}%`;

  let displayWind = document.querySelector("#wind");
  displayWind.innerHTML = `Wind: ${currentWind}km/h`;
}

function showCurrentLocationWeather(response) {
  console.log(response.data);
  let currentLocationCity = response.data.name;
  let currentTemp = Math.round(response.data.main.temp);
  let currentHumidity = Math.round(response.data.main.humidity);
  let currentWind = Math.round(response.data.wind.speed);

  let displayCity = document.querySelector("#current-city");
  displayCity.innerHTML = `${currentLocationCity}`;

  let displayTemp = document.querySelector("#current-temp");
  displayTemp.innerHTML = `${currentTemp}`;

  let displayHumidity = document.querySelector("#humidity");
  displayHumidity.innerHTML = `Humidity: ${currentHumidity}%`;

  let displayWind = document.querySelector("#wind");
  displayWind.innerHTML = `Wind: ${currentWind}km/h`;
}

function showCurrentLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiKey = `da6d6b75abd767e257a129a08b4d0f5d`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCurrentLocationWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentLocation);
}

function convertToFahrenheit(event) {
  event.preventDefault();

  let temperatureElement = document.querySelector("#current-temp");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

function convertToCelsius(event) {
  event.preventDefault();

  let temperatureElement = document.querySelector("#current-temp");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round(((temperature - 32) * 5) / 9);
}

let dateElement = document.querySelector("#date");
let now = new Date();

dateElement.innerHTML = formatedDate(now);

let searchForm = document.querySelector("#search-city-form");
searchForm.addEventListener("submit", chosenCity);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let fahrenheitLink = document.querySelector("#link-fahrenheit");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#link-celsius");
celsiusLink.addEventListener("click", convertToCelsius);

showDefaultCity("Kiev");
