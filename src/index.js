function refreshWeather(response){
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    temperatureElement.innerHTML = Math.round(temperature)
    let cityElement = document.querySelector("#weather-app-city")
    cityElement.innerHTML = response.data.city;

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
