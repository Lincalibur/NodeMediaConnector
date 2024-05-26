require('dotenv').config();
const OAuth = require('oauth-1.0a');
const crypto = require('crypto');
const axios = require('axios');
const btoa = require('btoa');

const oauth1 = OAuth({
  consumer: {
    key: process.env.TWITTER_API_KEY,
    secret: process.env.TWITTER_API_KEY_SECRET,
  },
  signature_method: 'HMAC-SHA1',
  hash_function(base_string, key) {
    return crypto.createHmac('sha1', key).update(base_string).digest('base64');
  },
});

async function getOAuth1RequestToken() {
  const requestData = {
    url: 'https://api.twitter.com/oauth/request_token',
    method: 'POST',
  };

  try {
    const response = await axios({
      method: requestData.method,
      url: requestData.url,
      headers: oauth1.toHeader(oauth1.authorize(requestData)),
    });
    console.log('OAuth 1.0a Request Token Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error in getOAuth1RequestToken:', error);
    throw error;
  }
}

async function getOAuth1AccessToken(oauthVerifier) {
  const requestData = {
    url: 'https://api.twitter.com/oauth/access_token',
    method: 'POST',
    data: { oauth_verifier: oauthVerifier },
  };

  try {
    const response = await axios({
      method: requestData.method,
      url: requestData.url,
      headers: oauth1.toHeader(oauth1.authorize(requestData)),
    });
    console.log('OAuth 1.0a Access Token Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error in getOAuth1AccessToken:', error);
    throw error;
  }
}

async function getOAuth2BearerToken() {
  const consumerKey = process.env.TWITTER_API_KEY;
  const consumerSecret = process.env.TWITTER_API_KEY_SECRET;
  const bearerToken = btoa(`${consumerKey}:${consumerSecret}`);

  try {
    const response = await axios({
      method: 'POST',
      url: 'https://api.twitter.com/oauth2/token',
      headers: {
        'Authorization': `Basic ${bearerToken}`,
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      data: 'grant_type=client_credentials',
    });
    console.log('OAuth 2.0 Bearer Token Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error in getOAuth2BearerToken:', error);
    throw error;
  }
}

async function makeOAuth2Request(endpoint) {
  const bearerToken = process.env.TWITTER_BEARER_TOKEN;

  try {
    const response = await axios({
      method: 'GET',
      url: `https://api.twitter.com/2/${endpoint}`,
      headers: {
        'Authorization': `Bearer ${bearerToken}`,
      },
    });
    console.log('OAuth 2.0 API Request Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error in makeOAuth2Request:', error);
    throw error;
  }
}

module.exports = {
  getOAuth1RequestToken,
  getOAuth1AccessToken,
  getOAuth2BearerToken,
  makeOAuth2Request,
};
