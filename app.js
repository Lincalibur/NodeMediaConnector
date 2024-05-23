const express = require('express');
require('dotenv').config();

const twitterRoutes = require('./twitter');
const spotifyRoutes = require('./spotify');

const app = express();
const port = 3000;

app.use('/twitter', twitterRoutes);
app.use('/spotify', spotifyRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
