// TwitterAPI.js
// const fetch = require('node-fetch');
require('dotenv').config();

const API_KEY = process.env.TWITTER_API_KEY;

// Function to fetch tweets
async function fetchTweets(userID) {
  if (!API_KEY) {
    throw new Error('API key is missing. Set TWITTER_API_KEY in your .env file.');
  }

  if (!userID) {
    throw new Error('User ID is required to fetch tweets.');
  }

  const endpoint = `https://api.twitter.com/2/users/${userID}/tweets`;
  const headers = {
    'Authorization': `Bearer ${API_KEY}`
  };

  try {
    const response = await fetch(endpoint, { headers });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching tweets:', error);
    throw error;
  }
}

// Export the function
module.exports = fetchTweets;
