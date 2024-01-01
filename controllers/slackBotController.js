require("dotenv").config();
const axios = require("axios");
const SLACK_TOKEN = process.env.SLACK_TOKEN;

async function pushToSlack(weatherData, city) {
  // Function to send message to Slack
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
      { headers: { authorization: `Bearer ${SLACK_TOKEN}` } },
      { timeout: 5000 }
    );
    console.log("Message sent to Slack", res.data.ok);
  } catch (err) {
    console.error("Error sending message to Slack:", err);
  }
}

module.exports = pushToSlack;

// pushToSlack().catch((err) => console.log(err));
