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

function searchCity(city) {
  let apiKey = "d1a86552de255334f6117b348c4519bd";
  let units = "metric";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiURL).then(displayWeatherConditions);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-name").value;
  searchCity(city);
}

function displayWeatherConditions(response) {
  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector(".sky").innerHTML = response.data.weather[0].main;
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

let currentDate = document.querySelector(".date");
currentDate.innerHTML = displayDate(new Date());

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getPosition);

let searchForm = document.querySelector("#search-city");
searchForm.addEventListener("submit", handleSubmit);

let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", handleSubmit);

searchCity("Honolulu");

//function showFarenheit(event) {
//event.preventDefault();
//let temperature = document.querySelector("#current-temperature");
//temperature.innerHTML = 64;
//}

//function showCelsius(event) {
//event.preventDefault();
//let temperature = document.querySelector("#current-temperature");
//temperature.innerHTML = 18;
//}

//let farenheitTemperature = document.querySelector("#farenheit-link");
//farenheitTemperature.addEventListener("click", showFarenheit);

//let celsiusTemperature = document.querySelector("#celsius-link");
//celsiusTemperature.addEventListener("click", showCelsius);
