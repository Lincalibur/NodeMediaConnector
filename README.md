# Node.js App with Twitter, Spotify

## Overview

This Node.js application interacts with the Twitter, Spotify, and OMDb APIs to retrieve and display specific information based on user input from the terminal. The application reads commands from the terminal and from a text file, processes these commands by making API calls, and outputs the results in a specified format.

## Features

1. **Print Latest Tweets**: Fetch and display the latest tweets from a specified Twitter user.
2. **Spotify Song Lookup**: Retrieve and display information about a song from Spotify.

## Requirements

### Twitter API Integration

- **Command**: `node app.js tweets <username> <count>`
- **Description**: Fetches the latest tweets from the specified username, limited to the number of tweets specified.
- **Output**: A JSON object containing an array of the most recent tweets.

### Spotify API Integration

- **Command**: `node app.js spotify <song name>`
- **Description**: Performs a Spotify lookup for the specified song.
- **Output**: A JSON object containing the artist(s), song title, preview link, and album.

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/Lincalibur/WPR381-Assignment1.git

