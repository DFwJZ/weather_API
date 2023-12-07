require("dotenv").config();
const express = require("express");
const axios = require("axios");
const router = express.Router();
const getWeatherData = require("../public/javascripts/fetch_weather_data.js");
const mu = require("../db/MongoUtils.js");
const pushToSlack = require("../public/javascripts/slack_bot.js");
const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;

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

    if (weatherData) {
      await pushToSlack(weatherData, city);
    }

    await mu.insertRequest(city);
    const history = await mu.findAllRequests();
    const totalDocuments = await mu.countRequests(); // Get the updated count

    res.render("index", {
      weatherData: weatherData,
      city: city,
      error: null,
      history: history,
      totalDocuments: totalDocuments,
    });
  } catch (error) {
    const history = await mu.findAllRequests();
    const totalDocuments = await mu.countRequests(); // Get the updated count even in case of error

    res.render("index", {
      weatherData: null,
      error: "Error fetching weather data",
      history: history,
      totalDocuments: totalDocuments,
    });
  }
});

// Route to serve the Google Maps API script securely, proxy to filter API key
router.get("/google-maps-api", async (req, res) => {
  const url = `https://maps.googleapis.com/maps/api/js?libraries=places&callback=initAutocomplete&key=${GOOGLE_PLACES_API_KEY}`;
  try {
    const response = await axios.get(url);
    res.send(response.data);
  } catch (error) {
    console.error("Error fetching from Google Maps API:", error);
    res.status(500).send("Error fetching data");
  }
});

module.exports = router;
