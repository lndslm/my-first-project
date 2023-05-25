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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="col">
              <div class="weather-forecast-date">${formatDay(
                forecastDay.dt
              )}</div>
              <img src = "https://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png"
              alt = ""
              width = "42"
              />
              <div class="weather-forecast-temperature">
                <span class="weather-forecast-temperature-max">${Math.round(
                  forecastDay.temp.max
                )}°</span>
                <span class="weather-forecast-temperature-min">${Math.round(
                  forecastDay.temp.min
                )}°</span>
            </div>
            </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coord) {
  let latitude = coord.lat;
  let longitude = coord.lon;
  let apiKey = "d1a86552de255334f6117b348c4519bd";
  let units = "metric";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiURL).then(displayForecast);
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
    weatherBackgroundColor[0].style.backgroundImage = `linear-gradient(to top, rgb(255, 207, 84) 11.2%, rgb(255, 158, 27) 91.1%)`;
    weatherBackgroundColor[1].style.backgroundImage = `linear-gradient(to top, rgb(255, 207, 84) 11.2%, rgb(255, 158, 27) 91.1%)`;
  } else {
    if (
      response.data.weather[0].icon === "02d" ||
      response.data.weather[0].icon === "02n"
    ) {
      weatherBackgroundColor[0].style.backgroundImage = `linear-gradient(179deg,rgb(253, 220, 155) 26.2%,rgb(255, 215, 165) 48.5%)`;
      weatherBackgroundColor[1].style.backgroundImage = `linear-gradient(179deg,rgb(253, 220, 155) 26.2%,rgb(255, 215, 165) 48.5%)`;
    } else {
      if (
        response.data.weather[0].icon === "03d" ||
        response.data.weather[0].icon === "03n"
      ) {
        weatherBackgroundColor[0].style.backgroundImage = `linear-gradient(to top, #c4c5c7 0%, #dcdddf 52%, #ebebeb 100%)`;
        weatherBackgroundColor[1].style.backgroundImage = `linear-gradient(to top, #c4c5c7 0%, #dcdddf 52%, #ebebeb 100%)`;
      } else {
        if (
          response.data.weather[0].icon === "04d" ||
          response.data.weather[0].icon === "04n"
        ) {
          weatherBackgroundColor[0].style.backgroundImage = `linear-gradient(-180deg,rgba(0, 0, 0, 0.5) -20%,rgba(255, 255, 255, 0.5) 180%)`;
          weatherBackgroundColor[1].style.backgroundImage = `linear-gradient(-180deg,rgba(0, 0, 0, 0.5) -20%,rgba(255, 255, 255, 0.5) 180%)`;
        } else {
          if (
            response.data.weather[0].icon === "09d" ||
            response.data.weather[0].icon === "09n"
          ) {
            weatherBackgroundColor[0].style.backgroundImage = `linear-gradient(180.3deg,rgb(110, 136, 161) 5.5%,rgb(221, 221, 221) 150%)`;
            weatherBackgroundColor[1].style.backgroundImage = `linear-gradient(180.3deg,rgb(110, 136, 161) 5.5%,rgb(221, 221, 221) 150%)`;
          } else {
            if (
              response.data.weather[0].icon === "10d" ||
              response.data.weather[0].icon === "10n"
            ) {
              weatherBackgroundColor[0].style.backgroundImage = `linear-gradient(179.7deg,rgb(144, 175, 202) 2.9%,rgb(197, 214, 227) 97.1%)`;
              weatherBackgroundColor[1].style.backgroundImage = `linear-gradient(179.7deg,rgb(144, 175, 202) 2.9%,rgb(197, 214, 227) 97.1%)`;
            } else {
              if (
                response.data.weather[0].icon === "11d" ||
                response.data.weather[0].icon === "11n"
              ) {
                weatherBackgroundColor[0].style.backgroundImage = `linear-gradient(178.6deg,rgb(20, 36, 50) -130%,rgb(124, 143, 161) 83.8%)`;
                weatherBackgroundColor[1].style.backgroundImage = `linear-gradient(178.6deg,rgb(20, 36, 50) -130%,rgb(124, 143, 161) 83.8%)`;
              } else {
                if (
                  response.data.weather[0].icon === "13d" ||
                  response.data.weather[0].icon === "13n"
                ) {
                  weatherBackgroundColor[0].style.backgroundImage = `linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)`;
                  weatherBackgroundColor[1].style.backgroundImage = `linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)`;
                } else {
                  if (
                    response.data.weather[0].icon === "50d" ||
                    response.data.weather[0].icon === "50n"
                  ) {
                    weatherBackgroundColor[0].style.backgroundImage = `linear-gradient(to bottom,#d5d4d0 0%,#d5d4d0 1%,#eeeeec 31%,#efeeec 75%,#e9e9e7 100%)`;
                    weatherBackgroundColor[1].style.backgroundImage = `linear-gradient(to bottom,#d5d4d0 0%,#d5d4d0 1%,#eeeeec 31%,#efeeec 75%,#e9e9e7 100%)`;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

function displayWeatherConditions(response) {
  celsiusTemperature = response.data.main.temp;
  document.querySelector("#current-temperature").innerHTML =
    Math.round(celsiusTemperature);
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

let currentDate = document.querySelector(".date");
currentDate.innerHTML = displayDate(new Date());

let searchForm = document.querySelector("#search-city");
searchForm.addEventListener("submit", handleSubmit);

let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", handleSubmit);

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getPosition);

searchCity("Honolulu");
