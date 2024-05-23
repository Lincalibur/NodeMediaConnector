# Node.js App with Twitter, Spotify, and OMDb Integration

## Overview

This Node.js application interacts with the Twitter, Spotify, and OMDb APIs to retrieve and display specific information based on user input from the terminal. The application reads commands from the terminal and from a text file, processes these commands by making API calls, and outputs the results in a specified format.

## Features

1. **Print Latest Tweets**: Fetch and display the latest tweets from a specified Twitter user.
2. **Spotify Song Lookup**: Retrieve and display information about a song from Spotify.
3. **OMDb Movie Details**: Fetch and display details about a movie from the OMDb database.
4. **Read Query from File**: Read a command and query from a file and execute the corresponding function.

## Requirements

### Twitter API Integration

- **Command**: `node app.js tweets <username> <count>`
- **Description**: Fetches the latest tweets from the specified username, limited to the number of tweets specified.
- **Output**: A JSON object containing an array of the most recent tweets.

### Spotify API Integration

- **Command**: `node app.js spotify <song name>`
- **Description**: Performs a Spotify lookup for the specified song.
- **Output**: A JSON object containing the artist(s), song title, preview link, and album.

### OMDb API Integration

- **Command**: `node app.js movie <movie name>`
- **Description**: Queries the OMDb API for details about the specified movie.
- **Output**: A JSON object containing the title, year, IMDb rating, language, and other details.

### File Query Integration

- **Command**: `node app.js do-what-it-says`
- **Description**: Reads a command and query from `random.txt` and executes the corresponding function.
- **Output**: Depends on the command and query found in the file.

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/Lincalibur/WPR381-Assignment1.git
   cd your-repo-name

