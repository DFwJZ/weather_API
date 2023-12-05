# Weather Dashboard and Slack Integration

This project is a weather dashboard that allows users to request weather data for any city. The data is fetched from Tomorrow.io's API and displayed on a web page. Additionally, the project includes functionality to send weather updates to a Slack channel.

## Features

- Fetch and display weather data for any specified city.
- Store request history in MongoDB.
- Display request history on the dashboard.
- Send weather data notifications to a Slack channel.

## Technologies Used

- Node.js
- Express.js
- EJS (Embedded JavaScript templates)
- MongoDB
- Axios
- Slack API

## Setup and Installation

### Prerequisites

- Node.js and npm installed.
- MongoDB running on your local machine or a MongoDB Atlas account.
- Get API key/tokens from [Slack API](https://api.slack.com/) and [Tomorrow.io](https://app.tomorrow.io/).

### Installation

1. Clone the repository:
    ```bash
    ## if using HTTPS
    git clone https://github.com/DFwJZ/weather_API.git

    ## if using SSH
    git clone git@github.com:DFwJZ/weather_API.git
    ```
2. Navigate to the project directory:
    ```bash
    cd weather-dashboard-slack-integration
    ```
3. Install dependencies:
   ```bash
    npm install
    ```
4. Set up your own API keys and tokens:

    Place your Tomorrow.io API key in 
    `./secret/_tomorrowio_apikey.js`
    Place your Slack API token in 
    `./secret/_slack_token.js`

### Running the Application
1. Start the server
    ```bash
    node app.js # or your main server file
    ```
2. Access the web application at `http://localhost:3000/`

3. To send wather data to Slack, run:
    ```bash
    node slack_bot.js
    ```

### Usage

- Enter a city name in the input field on the dashboard and submit to see the current weather data for that city.
- The dashboard displays a history of the last 10 weather data requests.
- The `slack_bot.js` script sends the current weather data of Portland to a specified Slack channel.