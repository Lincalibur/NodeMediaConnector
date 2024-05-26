const twitterAuth = require('./Modules/TwitterOauth');

async function testTwitterAuth() {
  try {
    console.log('Testing OAuth 1.0a - Request Token:');
    const requestToken = await twitterAuth.getOAuth1RequestToken();
    console.log('Request Token:', requestToken);

    // Simulating the process of redirecting to Twitter and receiving the verifier.
    // Replace 'YOUR_OAUTH_VERIFIER' with the actual verifier you get after authorizing.
    // const oauthVerifier = 'YOUR_OAUTH_VERIFIER';
    // console.log('Testing OAuth 1.0a - Access Token:');
    // const accessToken = await twitterAuth.getOAuth1AccessToken(oauthVerifier);
    // console.log('Access Token:', accessToken);

    console.log('\nTesting OAuth 2.0 - Bearer Token:');
    const bearerToken = await twitterAuth.getOAuth2BearerToken();
    console.log('Bearer Token:', bearerToken);

    console.log('\nTesting OAuth 2.0 - API Request:');
    // Replace 'YOUR_TWEET_ID' with the actual tweet ID you want to fetch
    const tweetData = await twitterAuth.makeOAuth2Request('tweets?ids=YOUR_TWEET_ID');
    console.log('Tweet Data:', tweetData);
  } catch (error) {
    console.error('Error in testTwitterAuth:', error);
  }
}

testTwitterAuth();
