const express = require("express");
const router = express.Router();
const getWeatherData = require("../fetch_weather_data"); // adjust the path as necessary
const mu = require("../db/MongoUtils.js");

// Route to display the form
router.get("/", async function (req, res, next) {
  try {
    const totalDocuments = await mu.countRequests(); // Count all documents
    const history = await mu.findAllRequests(); // Find requests

    res.render("index", {
      weatherData: null,
      error: null,
      history: history,
      totalDocuments: totalDocuments, // Include totalDocuments here
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// Route to handle form submission
router.post("/", async (req, res) => {
  const city = req.body.city || "Portland, OR";
  try {
    const weatherData = await getWeatherData(city);
    await mu.insertRequest(city);
    const history = await mu.findAllRequests();
    const totalDocuments = await mu.countRequests(); // Get the updated count

    res.render("index", {
      weatherData: weatherData,
      error: null,
      history: history,
      totalDocuments: totalDocuments, // Include totalDocuments here
    });
  } catch (error) {
    const history = await mu.findAllRequests();
    const totalDocuments = await mu.countRequests(); // Get the updated count even in case of error

    res.render("index", {
      weatherData: null,
      error: "Error fetching weather data",
      history: history,
      totalDocuments: totalDocuments, // Include totalDocuments here
    });
  }
});

module.exports = router;
