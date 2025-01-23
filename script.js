testbox = document.querySelector("div")

async function fetchWeatherData(location) {
    try {
        const weatherData = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=VENFDCFLZ7L85WKJVKW4BXRPC`, {mode: 'cors'})
        if (!weatherData.ok) {
            throw new Error("Invalid Location")
        } else {
            return jsonData = await weatherData.json()
        }
    } catch(error) {
        alert(error)
    }
    
}

async function sortWeatherData(weatherData) {
    console.log(weatherData)
    const location = weatherData.resolvedAddress
    const conditions = weatherData.currentConditions.conditions
    const temp = weatherData.currentConditions.temp
    const icon = weatherData.currentConditions.icon
    const humidity = weatherData.currentConditions.humidity
    const wind = weatherData.currentConditions.windspeed

    const obj = {location: location, conditions: conditions, temp: temp, icon: icon, humidity: humidity, windspeed: wind}
    console.log(obj)
    return obj;
}

function displayInfo(object) {
    const forecaseIcon = document.querySelector(".forecastIcon")
    const forecast = document.querySelector(".forecast")
    const temp = document.querySelector(".temp")
    const location = document.querySelector(".location")
    const percentage = document.querySelector(".percentage")
    const windspeed = document.querySelector(".windspeed")

    console.log(object)

    forecast.textContent = object.conditions
    temp.textContent = `${object.temp}°F`
    location.textContent = object.location
    forecaseIcon.src = `images/WeatherIcons/${object.icon}.svg`
    percentage.textContent = `${object.humidity}%`
    windspeed.textContent = `${object.windspeed} mph`
}

const searchBtn = document.querySelector("button")

searchBtn.addEventListener("click", () => {
    handleClick();
})

const inputField = document.querySelector(".searchbar")

inputField.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        handleClick();
    }
})


async function handleClick() {
    const searchQuery = document.querySelector(".searchbar").value
    const weatherObject = await fetchWeatherData(searchQuery).then(response => {
        object = sortWeatherData(response)
        return object;
    })
    displayInfo(weatherObject)
}

async function defaultLocation() {
    const weatherObject = await fetchWeatherData("Miami").then(response => {
        object = sortWeatherData(response)
        return object;
    })
    displayInfo(weatherObject)
}

defaultLocation();




