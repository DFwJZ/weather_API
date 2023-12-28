// controllers/weatherController.js

const getWeatherData = require("../public/javascripts/fetch_weather_data");
const axios = require("axios");
const mu = require("../db/MongoUtils");
const pushToSlack = require("../public/javascripts/slack_bot");
const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;

// Function to display the form
const displayForm = async (req, res, next) => {
  try {
    const totalDocuments = await mu.countRequests();
    const history = await mu.findAllRequests();

    res.render("index", {
      weatherData: null,
      error: null,
      history: history,
      totalDocuments: totalDocuments,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// Function to handle form submission
const handleSubmit = async (req, res) => {
  const { city, latitude, longitude } = req.body;
  try {
    if (!isValidCityName(city)) {
      return res.status(400).send("Invalid city name");
    }

    const weatherData = await getWeatherData(latitude, longitude);
    if (weatherData) {
      await pushToSlack(weatherData, city);
    }

    await mu.insertRequest(city);
    const history = await mu.findAllRequests();
    const totalDocuments = await mu.countRequests();

    res.render("index", {
      weatherData: weatherData,
      city: city,
      error: null,
      history: history,
      totalDocuments: totalDocuments,
    });
  } catch (error) {
    const history = await mu.findAllRequests();
    const totalDocuments = await mu.countRequests();
    res.render("index", {
      weatherData: null,
      error: "Error fetching weather data",
      history: history,
      totalDocuments: totalDocuments,
    });
  }
};

// Function to serve the Google Maps API script
const googleMapsApi = async (req, res) => {
  const url = `https://maps.googleapis.com/maps/api/js?libraries=places&callback=initAutocomplete&key=${GOOGLE_PLACES_API_KEY}`;
  try {
    const response = await withTimeout(axios.get(url), 5000);
    res.send(response.data);
  } catch (error) {
    console.error("Error fetching from Google Maps API:", error);
    res.status(500).send("Error fetching data");
  }
};

// City Name Validation Function
function isValidCityName(city) {
  const regexPattern = /^[a-zA-Z\s,.'-]+$/;
  return regexPattern.test(city);
}

// Customized Timeout Function
function withTimeout(promise, ms) {
  let timeoutId;
  const timeoutPromise = new Promise((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(new Error(`Timed out after ${ms} ms.`));
    }, ms);
  });

  return Promise.race((promise, timeoutPromise)).finally(() => {
    clearTimeout(timeoutId); // needs to be cleared to avoid memory leaks
  });
}

module.exports = {
  displayForm,
  handleSubmit,
  googleMapsApi,
};
