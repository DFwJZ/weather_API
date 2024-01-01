require("dotenv").config();
const axios = require("axios");
const TOMORROWIO_API_KEY = process.env.TOMORROWIO_API_KEY;
const BASE_URL = "https://api.tomorrow.io/v4";

const getWeatherData = async (latitude = 45.5231, longitude = -122.6765) => {
  // Function to fetch weather data, default to Portland, OR
  console.log("Fetching weather data...");
  try {
    const response = await axios.get(
      `${BASE_URL}/weather/realtime`,
      {
        params: {
          location: `${latitude},${longitude}`, // Query parameters for TomorrowIO API request
          units: "imperial",
          apikey: TOMORROWIO_API_KEY,
          // Add any other parameters you need here
        },
      },
      { timeout: 5000 }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  } finally {
    console.log("Done fetching weather data.");
  }
};

module.exports = getWeatherData;
