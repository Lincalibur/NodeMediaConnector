const axios = require('axios');
require('dotenv').config();

const getTwitterBearerToken = async () => {
  const token = Buffer.from(`${process.env.TWITTER_APP_KEY}:${process.env.TWITTER_APP_SECRET}`).toString('base64');

  try {
    const response = await axios.post(
      'https://api.twitter.com/oauth2/token',
      'grant_type=client_credentials',
      {
        headers: {
          Authorization: `Basic ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
      }
    );
    return response.data.access_token;
  } catch (error) {
    console.error('Error obtaining Twitter bearer token:', error.response.data);
    throw new Error('Unable to obtain Twitter bearer token');
  }
};

module.exports = { getTwitterBearerToken };
