const axios = require("axios");

const API_KEY = require("./secret/_tomorrowio_apikey.js");
const BASE_URL = "https://api.tomorrow.io/v4";

const getWeatherData = async (city) => {
  console.log("Fetching weather data...");
  try {
    const response = await axios.get(`${BASE_URL}/weather/realtime`, {
      params: {
        location: city,
        units: "imperial",
        apikey: API_KEY,
        // Add any other parameters you need here
      },
    });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
};

module.exports = getWeatherData;
