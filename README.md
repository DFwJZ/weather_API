# Weather Dashboard and Slack Integration

This project is a weather dashboard that allows users to request weather data for any city. The data is fetched from Tomorrow.io's API and displayed on a web page. Additionally, the project includes functionality to send weather updates to a Slack channel.

## Features

- Real-time Weather Data: Fetch and display current weather conditions for any city.
- Request History: Store and display a history of weather data requests in MongoDB.
- Slack Notifications: Automatically send weather updates to a Slack channel.
- User-friendly Dashboard: Easy-to-navigate web interface for interacting with the application.

## Technologies Used

- Backend: Node.js, Express.js
- Semi-Frontend: EJS (Embedded JavaScript templates)
- Database: MongoDB
- HTTP Client: Axios for API requests
- APIs: Tomorrow.io for weather data, Slack API for notification, google places API for extracting geographical information.

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
    cd weather_API
    ```
3. Install dependencies:
   ```bash
    npm install
    ```
4. Set up your own API keys and tokens:

    Place all tokens and apiKeys in `.env` file.

### Running the Application
1. Start the server
    ```bash
    node app.js # or your main server file
    ```
2. Access the web application at `http://localhost:3000/`

3. To send default weather data to Slack through CLI, uncomment 
    ```javascript
    pushToSlack().catch((err) => console.log(err));
    ``` 
    then run below to send the weather info to slack:
    ```bash
    node slack_bot.js
    ```

### Usage

- Dashboard: Enter a city name to view its current weather.
- History: View the last 10 weather data requests on the dashboard.
- Slack Bot: Customize `slack_bot.js` to change the default city or Slack channel for notifications.