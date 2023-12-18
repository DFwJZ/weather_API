// routes/index.js (or wherever your routes are defined)

require("dotenv").config();
const express = require("express");
const router = express.Router();
const weatherController = require("../controllers/weatherController.js"); // Import the controller

// Route to display the form
router.get("/", weatherController.displayForm);

// Route to handle form submission
router.post("/", weatherController.handleSubmit);

// Route to serve the Google Maps API script securely
router.get("/google-maps-api", weatherController.googleMapsApi);

module.exports = router;
