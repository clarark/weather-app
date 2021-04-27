function formatDate(now) {
    let hour = now.getHours();
    if (hour < 10) {
      hour =`0${hour}`;
    }
    let minutes = now.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    let dayIndex = now.getDay();
    
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[dayIndex];
  
    return `${day} ${hour}:${minutes}`;
  
  } 

  function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[day];
  }

  function displayForecast(response) {
    let forecast = response.data.daily;

    let forecastElement = document.querySelector("#forecast");

    let forecastHTML = `<div class="row">`;
    forecast.forEach(function(forecastDay, index) {
      if (index < 6){
      forecastHTML = forecastHTML +
      `
       <div class="col-2">
           <div class="weather-forecast-date">
               ${formatDay(forecastDay.dt)}
           </div>
           <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" width="42"/>
           <div class="weather-forecast-temperatures">
               <span class="weather-forecast-temperature-max">
                   ${Math.round(forecastDay.temp.max)}°
               </span>
               <span class="weather-forecast-temperature-min">
                   ${Math.round(forecastDay.temp.min)}°
               </span>
           </div>
       </div>
      `;
      }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
  
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "8eae015c5bbd359393dabf6e2f3a0e3e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
  
  function showTemperature(response) {
    let city = document.querySelector(".house");
    city.innerHTML = response.data.name;
    let temp = Math.round(response.data.main.temp);
    let newTemp = document.querySelector(".degree-number");
    newTemp.innerHTML = temp;
    let humidity = Math.round(response.data.main.humidity);
    let newHumidity = document.querySelector(".fu");
    newHumidity.innerHTML = `Humidity: ${humidity}%`;
    let wind = Math.round(response.data.wind.speed);
    let newWind = document.querySelector(".fi");
    newWind.innerHTML = `Wind: ${wind}km/h`;
    let description = response.data.weather[0].main;
    let newDescription = document.querySelector("#description");
    newDescription.innerHTML = description;
    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description);
    
    celsiusTemperature = response.data.main.temp;

    getForecast(response.data.coord);
  }

  
   
  function changeCity(city) {
    let currentCity = document.querySelector(".house");
    currentCity.innerHTML = city;
    let apiKey = "8eae015c5bbd359393dabf6e2f3a0e3e";
    let unit ="metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
    
    axios.get(apiUrl).then(showTemperature);
    }
  
    function handleSubmit(event){
    event.preventDefault();
    let input = document.querySelector(".input-text");
    let city = input.value;
  
    changeCity(city);
  
    }
  
    function geoApi() {
      navigator.geolocation.getCurrentPosition(showCurrentCity);
    }
  
    function showCurrentCity(position) {
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;
      let unit = "metric";
      let apiKey = "8eae015c5bbd359393dabf6e2f3a0e3e";
      let apiUrl= `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;
      
      axios.get(apiUrl).then(showTemperature);
    }

    function displayFahrenheitTemperature(event) {
      event.preventDefault();
      let temperatureElement = document.querySelector("#temperature");
      celsiusLink.classList.remove("active");
      fahrenheitLink.classList.add("active");
      let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
      temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
      
    }

    function displayCelsiusTemperature(event) {
      event.preventDefault();
      let temperatureElement = document.querySelector("#temperature");
      celsiusLink.classList.add("active");
      fahrenheitLink.classList.remove("active");
      temperatureElement. innerHTML = Math.round(celsiusTemperature);

    }


  let celsiusTemperature = null;

  let element = document.querySelector("form");
  element.addEventListener("submit", handleSubmit);

  let button = document.querySelector(".btn-success");
  button.addEventListener("click", geoApi);

  let date = document.querySelector(".cheese");
  let now = new Date();
  date.innerHTML = formatDate(now);

  let fahrenheitLink = document.querySelector("#fahrenheit-link");
  fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

  let celsiusLink = document.querySelector("#celsius-link");
  celsiusLink.addEventListener("click", displayCelsiusTemperature);
  
  changeCity("New York");

  displayForecast();
  