const express = require("express");
const router = express.Router();
const getWeatherData = require("../public/javascripts/fetch_weather_data.js");
const mu = require("../db/MongoUtils.js");
const GOOGLE_PLACES_API_KEY = require("../secret/_google_apikey.js");

// Route to display the form
router.get("/", async function (req, res, next) {
  try {
    const totalDocuments = await mu.countRequests(); // Count all documents
    const history = await mu.findAllRequests(); // Find requests

    res.render("index", {
      weatherData: null,
      error: null,
      history: history,
      totalDocuments: totalDocuments,
      apiKey: GOOGLE_PLACES_API_KEY,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// Route to handle form submission
router.post("/", async (req, res) => {
  // const city = req.body.city || "Portland";
  console.log("request body: ", req.body);
  const { city, latitude, longitude } = req.body;
  try {
    // const weatherData = await getWeatherData(city);
    const weatherData = await getWeatherData(latitude, longitude);

    await mu.insertRequest(city);
    const history = await mu.findAllRequests();
    const totalDocuments = await mu.countRequests(); // Get the updated count

    res.render("index", {
      weatherData: weatherData,
      error: null,
      history: history,
      totalDocuments: totalDocuments,
      apiKey: GOOGLE_PLACES_API_KEY,
    });
  } catch (error) {
    const history = await mu.findAllRequests();
    const totalDocuments = await mu.countRequests(); // Get the updated count even in case of error

    res.render("index", {
      weatherData: null,
      error: "Error fetching weather data",
      history: history,
      totalDocuments: totalDocuments,
      apiKey: GOOGLE_PLACES_API_KEY,
    });
  }
});

module.exports = router;
