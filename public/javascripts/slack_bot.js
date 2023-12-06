const axios = require("axios");
const SLACK_TOKEN = require("../../secret/_slack_token.js");
const { resource } = require("../../app.js");

async function pushToSlack(weatherData, city) {
  const temperature = weatherData.data.values.temperature;
  console.log(`The current temperature in ${city} is ${temperature}°F.`);
  const message = `The current temperature in ${city} is ${temperature}°F.`;

  const url = "https://slack.com/api/chat.postMessage";
  try {
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
    console.log("Message sent to Slack", res.data.ok);
  } catch (err) {
    console.error("Error sending message to Slack:", err);
  }
}

module.exports = pushToSlack;

// pushToSlack().catch((err) => console.log(err));
