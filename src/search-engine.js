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

function chosenCity(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#current-city");

  cityInput = document.querySelector("#city-input");
  cityElement.innerHTML = cityInput.value;

  let apiKey = `da6d6b75abd767e257a129a08b4d0f5d`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
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

let searchForm = document.querySelector("#search-city-form");
searchForm.addEventListener("submit", chosenCity);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
