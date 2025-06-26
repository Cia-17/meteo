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


function displayForcast(){

    let days = [
        "Tue", 
        "Wed",
        "Thur", 
        "Fri", 
        "Sat"]

    let forecastHtml = "";

    days.forEach(function(day) {
        forecastHtml = forecastHtml + `
        <div class="weather-forecast-day">
        <div class="weather-forecast-date">${day}</div>
        <div class="weather-forecast-icon">🌤️</div>
        <div class="weather-forecast-temperatures">
        <div class="weather-forecast-temperature">
        <strong>15º</strong>
        </div>
        <div class="weather-forecast-temperature">9º</div>
        </div>
        </div>
    `;

    });

        
    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = forecastHtml

}


let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit)

searchCity("Tokyo")

displayForcast();




