// TwitterAPI.js
const { getAccessToken } = require('./TwitterOAuth.js');

let clientPromise = getAccessToken();

async function getTweets(username, count) {
  try {
    const client = await clientPromise;
    const user = await client.v2.userByUsername(username);
    const userId = user.data.id;

    const tweets = await client.v2.userTimeline(userId, {
      max_results: count,
      exclude: 'replies,retweets',
    });

    return tweets.data;
  } catch (error) {
    throw new Error(`Error fetching tweets: ${error.message}`);
  }
}

module.exports = {
  getTweets,
};
