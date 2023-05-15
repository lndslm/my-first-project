function displayDate(date) {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[now.getMonth()];
  let monthDate = now.getDate();
  let hours = ("0" + now.getHours()).slice(-2);
  let minutes = ("0" + now.getMinutes()).slice(-2);
  let formattedDate = `${day} ${month} ${monthDate}, ${hours}:${minutes}`;
  return formattedDate;
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col">
              <div class="weather-forecast-date">${day}</div>
              <div class="weather-forecast-icon">⛅</div>
              <div class="weather-forecast-temperature">
                <span class="weather-forecast-temperature-max">6°</span>
                <span class="weather-forecast-temperature-min">-3°</span>
            </div>
            </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-name").value;
  searchCity(city);
}

function searchCity(city) {
  let apiKey = "d1a86552de255334f6117b348c4519bd";
  let units = "metric";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiURL).then(displayWeatherConditions);
}

function changeBackgroundColor(response) {
  let weatherBackgroundColor = document.getElementsByClassName("card");
  if (
    response.data.weather[0].icon === "01d" ||
    response.data.weather[0].icon === "01n"
  ) {
    weatherBackgroundColor.style.backgroundColor = "#ffffff";
  }
}

function getForecast(coord) {
  let latitude = coord.lat;
  let longitude = coord.lon;
  let apiKey = "d1a86552de255334f6117b348c4519bd";
  let units = "metric";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiURL).then(displayForecast);
}

function displayWeatherConditions(response) {
  celsiusTemperature = response.data.main.temp;
  document.querySelector("#current-temperature").innerHTML =
    Math.round(celsiusTemperature);
  celsiusLink.classList.add("active");
  farenheitLink.classList.remove("active");
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector(".sky").innerHTML =
    response.data.weather[0].description;
  let iconElement = document.querySelector("#weather-icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  changeBackgroundColor(response);
  getForecast(response.data.coord);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "d1a86552de255334f6117b348c4519bd";
  let units = "metric";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}
&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiURL).then(displayWeatherConditions);
}

function displayFarenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");
  let farenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(farenheitTemperature);
  celsiusLink.classList.remove("active");
  farenheitLink.classList.add("active");
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  celsiusLink.classList.add("active");
  farenheitLink.classList.remove("active");
}

let currentDate = document.querySelector(".date");
currentDate.innerHTML = displayDate(new Date());

let searchForm = document.querySelector("#search-city");
searchForm.addEventListener("submit", handleSubmit);

let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", handleSubmit);

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getPosition);

let farenheitLink = document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", displayFarenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

searchCity("Honolulu");
