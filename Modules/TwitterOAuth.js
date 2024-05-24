// // TwitterOAuth.js
// const { TwitterApi } = require('twitter-api-v2');
// const path = require('path');
// require('dotenv').config({ path: path.join(__dirname, '../APIKeys.env') });

// const client = new TwitterApi({
//   clientId: process.env.TWITTER_CLIENT_ID,
//   clientSecret: process.env.TWITTER_CLIENT_SECRET,
// });

// async function getAccessToken() {
//   const { url, codeVerifier, state } = client.generateOAuth2AuthLink(
//     process.env.TWITTER_CALLBACK_URL,
//     { scope: ['tweet.read', 'users.read', 'offline.access'] }
//   );

//   console.log('Please go to this URL and authorize the app:', url);

//   const authCode = await new Promise((resolve) => {
//     const readline = require('readline').createInterface({
//       input: process.stdin,
//       output: process.stdout,
//     });

//     readline.question('Paste the authorization code here: ', (code) => {
//       readline.close();
//       resolve(code);
//     });
//   });

//   const { client: loggedClient, accessToken, refreshToken, expiresIn } =
//     await client.loginWithOAuth2({
//       code: authCode,
//       codeVerifier,
//       redirectUri: process.env.TWITTER_CALLBACK_URL,
//     });

//   console.log('Access Token:', accessToken);
//   console.log('Refresh Token:', refreshToken);
//   console.log('Expires In:', expiresIn);

//   return loggedClient;
// }

// module.exports = {
//   getAccessToken,
// };
