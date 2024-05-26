// Function to get Spotify Bearer Token that is used for authorization.
async function getSpotifyToken() {
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
  }
  
  // Export the function
  module.exports = {
    getSpotifyToken,
  };
  