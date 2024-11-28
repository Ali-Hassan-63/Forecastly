document.addEventListener("DOMContentLoaded", function() {
    const apiKey = '062ad0fe7b458223ddb9a7e85095d3b7'; // Replace with your OpenWeatherMap API key
    const weatherContainer = document.getElementById('weather');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        weatherContainer.innerHTML = "<p>Geolocation is not supported by this browser.</p>";
    }

    function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`)
            .then(response => response.json())
            .then(data => {
                displayWeather(data);
            })
            .catch(() => {
                weatherContainer.innerHTML = "<p>Failed to fetch weather data.</p>";
            });
    }

    function error() {
        weatherContainer.innerHTML = "<p>Unable to retrieve your location.</p>";
    }

    function displayWeather(data) {
        const weather = `
            <h2>${data.name}</h2>
            <p>${data.weather[0].description}</p>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;
        weatherContainer.innerHTML = weather;
    }
});
