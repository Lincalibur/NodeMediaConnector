//This imports the .env file.
require('dotenv').config();
const { TwitterApi } = require('twitter-api-v2');
const readline = require('readline');

//This is for 'input' variable.
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


//This gets the Twitter(X) API.
const twitterClient = new TwitterApi(process.env.TWITTER_BEARER_TOKEN);

async function getTweets(username, count) {
    try {
      const user = await twitterClient.v2.userByUsername(username);
      const userId = user.data.id;
      const tweets = await twitterClient.v2.userTimelineByUsername(userId, { max_results: count });
      return tweets.data;
    } catch (error) {
      console.error('Error fetching tweets:', error); //Error handling for tweets.
      return null;
    }
};

//This gets Spotify API.
async function getSpotifyToken() {
    const fetch = await import('node-fetch').then(mod => mod.default);
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64'),
      },
      body: 'grant_type=client_credentials',
    });
  
    const data = await response.json();
    return data.access_token;
};

//This gets the songs from Spotify.
async function getSongDetails(songName) {
    const token = await getSpotifyToken();
    const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(songName)}&type=track&limit=1`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  
    const data = await response.json();
    if (data.tracks.items.length > 0) {
      const track = data.tracks.items[0];
      return {
        artists: track.artists.map(artist => artist.name).join(', '),
        song: track.name,
        preview_url: track.preview_url,
        album: track.album.name,
      };
    } else {
      return null;
    }
};

//This function is where the user inputs what they want.
function promptUser() {
    rl.question('Enter Twitter username: ', async (username) => {
      rl.question('Enter number of tweets: ', async (tweetCount) => {
        const tweets = await getTweets(username, tweetCount);
        console.log('Latest Tweets:');
        tweets.forEach(tweet => {
          console.log(`- ${tweet.text}`);
        });
  
        rl.question('Enter song name to search on Spotify: ', async (songName) => {
          const songDetails = await getSongDetails(songName);
          if (songDetails) {
            console.log(`\nSong Details:`);
            console.log(`- Artist(s): ${songDetails.artists}`);
            console.log(`- Song: ${songDetails.song}`);
            console.log(`- Preview URL: ${songDetails.preview_url}`);
            console.log(`- Album: ${songDetails.album}`);
          } else {
            console.log('Song not found.'); //If song does not exist.
          }
          rl.close();
        });
      });
    });
};

promptUser();