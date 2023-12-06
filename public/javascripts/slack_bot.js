const axios = require("axios");
const SLACK_TOKEN = require("../../secret/_slack_token.js");
const getWeatherData = require("./fetch_weather_data.js");

async function pushToSlack() {
  const weatherData = await getWeatherData(); // Fetch the weather data

  if (weatherData) {
    const temperature = weatherData.data.values.temperature;
    console.log(`The current temperature in Portland is ${temperature}°F.`);
    const message = `The current temperature in Portland is ${temperature}°F.`; // Format your message

    const url = "https://slack.com/api/chat.postMessage";
    const res = await axios.post(
      url,
      {
        channel: "#test",
        text: message,
        username: "Peanut Bot",
        icon_emoji: ":bug:",
      },
      { headers: { authorization: `Bearer ${SLACK_TOKEN}` } }
    );

    // console.log("Done", res.data);
  } else {
    console.log("No weather data found.");
  }
}

pushToSlack().catch((err) => console.log(err));
