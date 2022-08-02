function createOption(optionName) {
  const option = document.createElement("option");
  option.value = optionName;
  option.innerHTML = optionName;
  return option;
}

function addCities() {
  const location = document.getElementById("citySelect");
  location.appendChild(createOption("Copenhagen"));
  location.appendChild(createOption("London"));
  location.appendChild(createOption("Berlin"));
  location.appendChild(createOption("Aarhus"));
  location.appendChild(createOption("Delhi"));
  location.appendChild(createOption("Mumbai"));
}

function getAndSaveCurrentLocation() {
  if (navigator.geolocation) {
    function locationSuccess(position) {
      localStorage.setItem("latitude", position.coords.latitude);
      localStorage.setItem("longitude", position.coords.longitude);
    }
    const location = navigator.geolocation.getCurrentPosition(locationSuccess);
  }
}

function convertUnixToLocalTime(unixTime) {
  // Create a new JavaScript Date object based on the timestamp
  // multiplied by 1000 so that the argument is in milliseconds, not seconds.
  const date = new Date(unixTime * 1000);
  // Hours part from the timestamp
  const hours = date.getHours();
  // Minutes part from the timestamp
  const minutes = "0" + date.getMinutes();
  // Seconds part from the timestamp
  const seconds = "0" + date.getSeconds();

  // Will display time in 10:30:23 format
  const formattedTime =
    hours + ":" + minutes.substring(-2) + ":" + seconds.substring(-2);

  return formattedTime;
}

function displayWeather(weatherJson, unit = "standard") {
  const city = document.getElementById("city");
  city.innerHTML = `${weatherJson.name}, ${weatherJson.sys.country}`;

  const temperature = document.getElementById("temperature");
  const measurementUnit = getMeasurementUnits(unit);
  temperature.innerHTML = `${weatherJson.main.temp} ${measurementUnit.tempUnit}`;

  //icon &desc
  document.getElementById(
    "weather-icon"
  ).innerHTML = `${weatherJson.weather[0].icon}  ${weatherJson.weather[0].description}`;

  //windspeed
  document.getElementById(
    "wind-speed"
  ).innerHTML = `Wind speed- ${weatherJson.wind.speed}  ${measurementUnit.windSpeedUnit}`;

  //cloudy
  document.getElementById(
    "cloudy"
  ).innerHTML = `Cloudiness - ${weatherJson.clouds.all}%`;

  //sunrise
  document.getElementById(
    "sunrise"
  ).innerHTML = `Sunrise - ${convertUnixToLocalTime(weatherJson.sys.sunrise)}`;

  //sunset
  document.getElementById(
    "sunset"
  ).innerHTML = `Sunset - ${convertUnixToLocalTime(weatherJson.sys.sunset)}`;
}

function getMeasurementUnits(unit) {
  let unitValues;
  switch (unit) {
    case "standard": {
      unitValues = { tempUnit: "K", windSpeedUnit: "m/s" };
      break;
    }
    case "metric": {
      unitValues = { tempUnit: "&#8451;", windSpeedUnit: "m/s" };
      break;
    }
    case "imperial": {
      unitValues = { tempUnit: "&#x2109;", windSpeedUnit: "miles/hr" };
      break;
    }
  }
  return unitValues;
}

//get weather response &  call display weather
function getWeather(url) {
  fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      const units = url.searchParams.get("units");
      units === null
        ? displayWeather(responseJson)
        : displayWeather(responseJson, units);
    })
    .catch(function (error) {
      console.log("error in getting weather -", error);
    });
}

function getCityCordinates(cityName) {
  const url = new URL("http://api.openweathermap.org/geo/1.0/direct");
  const params = { q: cityName, appid: "d0f7f52a8d8826a66f6fb66fca963bc0" };

  Object.keys(params).forEach((key) =>
    url.searchParams.append(key, params[key])
  );

  fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      //console.log(responseJson[0].lat, responseJson[0].lon);
      displayOSMap(responseJson[0].lat, responseJson[0].lon);
    })
    .catch((error) => {
      console.log("error in getting city cordinates", error);
    });
}

function btnWeatherClick() {
  const city = document.getElementById("citySelect");
  const unit = document.getElementById("temp-unit-select");
  // alert(city.value + " " + unit.value);
  const urlCity = new URL("https://api.openweathermap.org/data/2.5/weather"),
    params = {
      q: city.value,
      appid: "d0f7f52a8d8826a66f6fb66fca963bc0",
      units: unit.value,
    };
  Object.keys(params).forEach((key) =>
    urlCity.searchParams.append(key, params[key])
  );
  getWeather(urlCity);
  getCityCordinates(city.value);
}

function pageLoad() {
  addCities();
  getAndSaveCurrentLocation();

  const btnWeather = document.getElementById("btn-weather");
  btnWeather.addEventListener("click", btnWeatherClick);

  const latitude = localStorage.getItem("latitude");
  const longitude = localStorage.getItem("longitude");

  if (latitude && longitude) {
    const url = new URL("https://api.openweathermap.org/data/2.5/weather"),
      params = {
        lat: latitude,
        lon: longitude,
        appid: "d0f7f52a8d8826a66f6fb66fca963bc0",
        units: "metric",
      };
    Object.keys(params).forEach((key) =>
      url.searchParams.append(key, params[key])
    );
    getWeather(url);
    displayOSMap(latitude, longitude);
  }
}

function displayOSMap(latitude, longitude) {
  document.getElementById("weathermap").innerHTML =
    "<div id='map' style='width: 100%; height: 100%;'></div>";
  let mapOptions = {
    center: [latitude, longitude],
    zoom: 10,
  };

  let map = new L.map("map", mapOptions);

  let layer = new L.TileLayer(
    "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  );
  map.addLayer(layer);

  let marker = new L.Marker([latitude, longitude]);
  marker.addTo(map);
}
pageLoad();
