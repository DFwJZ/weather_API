jest.mock("axios");
const axios = require("axios");
const pushToSlack = require("../public/javascripts/slack_bot.js");

describe("pushToSlack", () => {
  let consoleSpy;

  beforeEach(() => {
    // Reset mocks before each test
    axios.post.mockReset();

    // Spy on console.error to check for error logging
    consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    // Restore original console.error behavior after each test
    consoleSpy.mockRestore();
  });

  it("successfully sends a message to Slack", async () => {
    // Mock axios to resolve with a successful response
    axios.post.mockResolvedValue({ data: { ok: true } });

    const temperatures = [70, 80, 90];
    const cities = ["TestCity1", "TestCity2", "TestCity3"];

    // Simulate concurrent Slack message sending
    const slackPromises = cities.map((city, index) => {
      const weatherData = {
        data: { values: { temperature: temperatures[index] } },
      };
      return pushToSlack(weatherData, city);
    });

    // Wait for all messages to be sent
    await Promise.all(slackPromises);

    // Check if axios.post was called correctly for each city
    slackPromises.forEach((_, index) => {
      expect(axios.post).toHaveBeenCalledWith(
        "https://slack.com/api/chat.postMessage",
        expect.objectContaining({
          text: expect.stringContaining(
            `The current temperature in ${cities[index]} is ${temperatures[index]}°F.`
          ),
        }),
        expect.objectContaining({
          headers: { authorization: expect.stringContaining("Bearer") },
        })
      );
    });
  });

  it("handles errors when sending a message to Slack", async () => {
    // Mock axios to reject with a network error
    axios.post.mockRejectedValue(new Error("Network Error"));

    await pushToSlack({ data: { values: { temperature: 0 } } }, "WrongCity");

    // Check if an error was logged to the console
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("Error sending message to Slack:"),
      expect.any(Error)
    );
    console.log(consoleSpy.mock.calls);
  });
});
