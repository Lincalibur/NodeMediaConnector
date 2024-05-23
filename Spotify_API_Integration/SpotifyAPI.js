const express = require('express');
const router = express.Router();
require('dotenv').config();
const axios = require('axios');

let spotifyAccessToken = null;

const getSpotifyAccessToken = async () => {
  const response = await axios.post('https://accounts.spotify.com/api/token', null, {
    params: {
      grant_type: 'client_credentials',
    },
    headers: {
      'Authorization': `Basic ${Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  spotifyAccessToken = response.data.access_token;
};

router.get('/search/:query', async (req, res) => {
  const query = req.params.query;

  try {
    if (!spotifyAccessToken) {
      await getSpotifyAccessToken();
    }

    const response = await axios.get('https://api.spotify.com/v1/search', {
      params: {
        q: query,
        type: 'track,artist,album',
        limit: 10,
      },
      headers: {
        'Authorization': `Bearer ${spotifyAccessToken}`,
      },
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
