function refreshWeather(response){
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let descriptionElement = document.querySelector("#description")
    let cityElement = document.querySelector("#weather-app-city")
    let humidityElement = document.querySelector("#humidity")
    let windSpeedElement = document.querySelector("#wind-speed")
    let timeElement = document.querySelector("#time")
    let date = new Date(response.data.time * 1000);
    let iconElement = document.querySelector("#icon")

    timeElement.innerHTML = formatDate(date)
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon"  />`
    windSpeedElement.innerHTML = `${response.data.wind.speed} km/h`
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    temperatureElement.innerHTML = Math.round(temperature)
    cityElement.innerHTML = response.data.city;
    descriptionElement.innerHTML = response.data.condition.description;
    
    getForecast(response.data.city);
}

function formatDate(date){
    let minutes = date.getMinutes()
    let hours = date.getHours()

    let days = [
        "Sunday", 
        "Monday", 
        "Tuesday", 
        "Wednesday",
        "Thursday", 
        "Friday", 
        "Saturday"]

    let day = days[date.getDay()]
    if (minutes<10){
        minutes = `0${minutes}`
    }

    return `${day} ${hours}:${minutes}`



    
}



function searchCity(city){
    //make api call and update ui
    let apiKey = "c33e6a2o22a07a65f728fe3b854t0bd9";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`
    axios.get(apiUrl).then(refreshWeather);

}



function handleSearchSubmit(event){
     event.preventDefault();
     let searchInput = document.querySelector("#search-form-input")
    
     searchCity(searchInput.value)
     
}

function formatDay(timestamp){
    let date = new Date(timestamp * 1000);
    let days = ["Sun", "Mon", "Tue","Wed", "Thu", "Fri", "Sat"]

    return days[date.getDay()];

}


function getForecast(city) {
  let apiKey = "c33e6a2o22a07a65f728fe3b854t0bd9";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}


function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
      <div class="weather-forecast-day">
        <div class="weather-forecast-date">${formatDay(day.time)}</div>

        <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature">
            <strong>${Math.round(day.temperature.maximum)}º</strong>
          </div>
          <div class="weather-forecast-temperature">${Math.round(
            day.temperature.minimum
          )}º</div>
        </div>
      </div>
    `;
    }
  });


        
    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = forecastHtml

}


let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit)

searchCity("Tokyo");

displayForecast();




