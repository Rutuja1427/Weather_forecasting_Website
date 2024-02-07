const apiKey = "5c091e02493a21e92bc86cfa0e812cdd";

window.addEventListener('load', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude; 
            const lon = position.coords.longitude; 

            const apiKey = "5c091e02493a21e92bc86cfa0e812cdd";
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

            fetch(url)
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    weatherReport(data);
                })
                .catch((error) => {
                    console.error("Error fetching weather data:", error);
                  

                });
        });
    }
});
//Search button event listner
     const searchButton = document.getElementById('searchButton');
    searchButton.addEventListener('click', () => {
        const cityInput = document.getElementById('cityInput');
        const cityName = cityInput.value;

        if (cityName) {
            fetchWeatherByCity(cityName);
        }
    });



function fetchWeatherByCity(cityName) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

    fetch(url)
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        weatherReport(data);
    })
    .catch((error) => {
        console.error("Error fetching weather data:", error);
    });

// Fetch and display the forecast for the entered city
fetchForecast(cityName);
}

// ... (remaining functions like weatherReport, hourForecast, and dayForecast)





function weatherReport(data) {
    // Extract and display weather information in your UI
    const cityElement = document.getElementById('city');
    cityElement.innerText = data.name + ', ' + data.sys.country;

    const temperatureElement = document.getElementById('temperature');
    temperatureElement.innerText = Math.floor(data.main.temp - 273) + ' °C';

    const cloudsElement = document.getElementById('clouds');
    cloudsElement.innerText = data.weather[0].description;

    const iconElement = document.getElementById('img');
    let icon1 = data.weather[0].icon;
    let iconurl = `https://api.openweathermap.org/img/w/${icon1}.png`;
    iconElement.src = iconurl;

    // Fetch and display the forecast
    fetchForecast(data.name);
}
function fetchForecast(cityName) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`;

    fetch(url)
        .then((res) => res.json())
        .then((forecast) => {
            console.log(forecast);
            hourForecast(forecast);
            dayForecast(forecast);
        })
        .catch((error) => {
            console.error("Error fetching weather forecast data:", error);
        });
}


function hourForecast(forecast) {
    // Clear the existing content in the 'templist' element
    document.querySelector('.templist').innerHTML = '';

    for (let i = 0; i < 5; i++) {
        var date = new Date(forecast.list[i].dt * 1000);
        console.log(date.toLocaleTimeString(undefined, { timeZone: 'Asia/Kolkata' }).replace(':00', ''));

        // Create and populate elements for the hourly forecast
        let hourR = document.createElement('div');
        hourR.setAttribute('class', 'next');

        let div = document.createElement('div');
        let time = document.createElement('p');
        time.setAttribute('class', 'time');
        time.innerText = date.toLocaleTimeString(undefined, { timeZone: 'Asia/Kolkata' }).replace(':00', '');

        let temp = document.createElement('p');
        temp.innerText = Math.floor(forecast.list[i].main.temp_max - 273) + ' °C' + ' / ' + Math.floor(forecast.list[i].main.temp_min - 273) + ' °C';

        div.appendChild(time);
        div.appendChild(temp);

        let desc = document.createElement('p');
        desc.setAttribute('class', 'desc');
        desc.innerText = forecast.list[i].weather[0].description;

        hourR.appendChild(div);
        hourR.appendChild(desc);

        // Append the hourly forecast to the 'templist' element
        document.querySelector('.templist').appendChild(hourR);
    }
}

function dayForecast(forecast) {
    // Clear the existing content in the 'weekF' element
    document.querySelector('.weekF').innerHTML = '';

    for (let i = 8; i < forecast.list.length; i += 8) {
        console.log(forecast.list[i]);
        // Create and populate elements for the daily forecast
        let div = document.createElement('div');
        div.setAttribute('class', 'dayF');

        let day = document.createElement('p');
        day.setAttribute('class', 'date');
        day.innerText = new Date(forecast.list[i].dt * 1000).toDateString(undefined, { timeZone: 'Asia/Kolkata' });
        div.appendChild(day);

        let temp = document.createElement('p');
        temp.innerText = Math.floor(forecast.list[i].main.temp_max - 273) + ' °C' + ' / ' + Math.floor(forecast.list[i].main.temp_min - 273) + ' °C';
        div.appendChild(temp);

        let description = document.createElement('p');
        description.setAttribute('class', 'desc');
        description.innerText = forecast.list[i].weather[0].description;
        div.appendChild(description);

        // Append the daily forecast to the 'weekF' element
        document.querySelector('.weekF').appendChild(div);
    }
}

