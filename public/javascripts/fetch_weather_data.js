const axios = require("axios");

const TOMORROWIO_API_KEY = require("../../secret/_tomorrowio_apikey.js");
const BASE_URL = "https://api.tomorrow.io/v4";

const getWeatherData = async (latitude, longitude) => {
  console.log("Fetching weather data...");
  try {
    const response = await axios.get(`${BASE_URL}/weather/realtime`, {
      params: {
        location: `${latitude},${longitude}`,
        units: "imperial",
        apikey: TOMORROWIO_API_KEY,
        // Add any other parameters you need here
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  } finally {
    console.log("Done fetching weather data.");
  }
};

module.exports = getWeatherData;
