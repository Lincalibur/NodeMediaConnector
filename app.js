// app.js
const express = require('express');
// const inquirer = require('inquirer');
// const fetch = require('node-fetch');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, 'APIKeys.env') });

const twitterRoutes = require('./Twitter_API_integration/TwitterAPI');
const spotifyRoutes = require('./Spotify_API_Integration/SpotifyAPI');

const app = express();
const port = 3000;

app.use(express.json());

async function promptUser() {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'username',
      message: 'Enter the Twitter username:',
    },
    {
      type: 'number',
      name: 'count',
      message: 'Enter the number of tweets to fetch:',
      validate(value) {
        if (value > 0) return true;
        return 'Please enter a positive number';
      },
    },
  ]);

  const { username, count } = answers;

  try {
    const tweets = await twitterRoutes.getTweets(username, count);
    console.log(JSON.stringify(tweets, null, 2));
  } catch (error) {
    console.error('Error fetching tweets:', error);
  }
}

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  promptUser();
});
