const API_KEY = '4c6286dcbca4c1ed8f9e08c0169b42c9';

async function fetchWeather() {
    const city = document.getElementById('city-input').value;
    const resultDiv = document.getElementById('weather-result');

    if (!city) return alert("Please enter a city name");

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        
        if (!response.ok) throw new Error("City not found");

        const data = await response.json();

        // 1. Fill in the details
        document.getElementById('city-name').innerText = data.name;
        document.getElementById('temp').innerText = Math.round(data.main.temp) + "°C";
        document.getElementById('humidity').innerText = data.main.humidity + "%";
        
        // 2. Explicitly state the weather condition
        document.getElementById('condition').innerText = `Current Condition: ${data.weather[0].description}`;

        // 3. MAKE VISIBLE: Only show the box now that we have data
        resultDiv.style.display = 'block';

    } catch (error) {
        resultDiv.style.display = 'none'; // Keep hidden if there's an error
        alert(error.message);
    }
}

// Attach function to button
document.getElementById('search-btn').addEventListener('click', fetchWeather);