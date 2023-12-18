jest.mock("axios");
const axios = require("axios");
const express = require("express");
const getWeatherData = require("../public/javascripts/fetch_weather_data.js");
const router = require("../routes/index.js");

const app = express();
app.use(express.json());
app.use(router);

let server;

beforeAll(() => {
  server = app.listen(3000);
});

afterAll((done) => {
  server.close(done);
});

describe("getWeatherData", () => {
  // Test for successful data fetching with detailed assertions
  it("fetches weather data successfully and returns correct format", async () => {
    const mockResponse = {
      data: {
        temperature: 68,
        humidity: 50,
      },
    };

    axios.get.mockResolvedValue(mockResponse);
    const data = await getWeatherData(45.5231, -122.6765);

    expect(data).toEqual(mockResponse.data);
    expect(data.temperature).toBe(68);
    expect(data.humidity).toBe(50);
  });

  // Test for handling different types of errors
  it("handles 404 error when the location is not found", async () => {
    axios.get.mockRejectedValue({ response: { status: 404 } });
    const data = await getWeatherData(0, 0); // Using unlikely coordinates

    expect(data).toBeNull();
  });

  // Test for fetching weather data for different coordinates
  it("fetches weather data for different coordinates", async () => {
    axios.get
      .mockResolvedValueOnce({ data: { temperature: 70 } }) // Mock response for first coordinates
      .mockResolvedValueOnce({ data: { temperature: 30 } }); // Mock response for second coordinates

    const data1 = await getWeatherData(40.7128, -74.006); // New York coordinates
    const data2 = await getWeatherData(34.0522, -118.2437); // Los Angeles coordinates

    expect(data1.temperature).toBe(70);
    expect(data2.temperature).toBe(30);
  });

  // Test using default parameters
  it("uses default parameters when none are provided", async () => {
    axios.get.mockResolvedValue({ data: { temperature: 68 } });
    const data = await getWeatherData();

    expect(data.temperature).toBe(68);
  });

  it("handles fetch error", async () => {
    axios.get.mockRejectedValue(new Error("Network Error"));
    const data = await getWeatherData(45.5231, -122.6765);

    expect(data).toBeNull();
  });
});
