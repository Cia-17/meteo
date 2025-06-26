function refreshWeather(response){
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let descriptionElement = document.querySelector("#description")
    let cityElement = document.querySelector("#weather-app-city")
    let humidityElement = document.querySelector("#humidity")
    let windSpeedElement = document.querySelector("#wind-speed")
    let timeElement = document.querySelector("#time")
    let date = new Date(response.data.time * 1000);


    timeElement.innerHTML = formatDate(date)
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


let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit)

searchCity("Tokyo")
