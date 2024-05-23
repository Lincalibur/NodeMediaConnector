const express = require('express');
const { TwitterApi } = require('twitter-api-v2');
const router = express.Router();
require('dotenv').config();

const client = new TwitterApi({
  appKey: process.env.TWITTER_APP_KEY,
  appSecret: process.env.TWITTER_APP_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
});

router.get('/tweetCountsRecentSearch/:query/:granularity', async (req, res) => {
  const query = req.params.query;
  const granularity = req.params.granularity;

  try {
    const result = await client.v2.get('tweets/counts/recent', {
      query,
      granularity
    });

    res.json(result.data);
  } catch (error) {
    console.error('Exception when calling tweetCountsRecentSearch:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
