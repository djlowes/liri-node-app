//Dependencies
var keys = require("./keys.js");
var fs = require("fs");
var twitter = require('twitter');
var spotify = require('node-spotify-api');
var request = require('request');


// console.log("--------------------------");
// console.log("Twitter Keys and Access Tokens");
// console.log(keys);
// console.log("--------------------------");

//Select from 4 command options
var command = process.argv[2];

//Allows more than one word of text for command inputs
var query = process.argv.slice(3).join(" ");


//Determine which function to run
main();

function main() {
  switch (command) {
    case "my-tweets":
      tweets();
      break;

    case "spotify-this-song":
      spotify();
      break;

    case "movie-this":
      imdb();
      break;

    case "do-what-it-says":
      simon();
      break;
  }
}

//my-tweets
function tweets() {
  let client = new twitter({
    consumer_key: keys.twitterKeys.consumer_key,
    consumer_secret: keys.twitterKeys.consumer_secret,
    access_token_key: keys.twitterKeys.access_token_key,
    access_token_secret: keys.twitterKeys.access_token_secret
  });
  let params = {
    screen_name: 'djlowes',
    count: 20
  };
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error && response.statusCode === 200) {
      for (let i = 0; i < tweets.length; i++) {
        console.log(tweets[i].user.screen_name + ": " + tweets[i].text);
        log(tweets[i].user.screen_name + ": " + tweets[i].text);

      }
    } else {
      console.log("Tweets failed to load, this is the error: " + error);
      log("Tweets failed to load, this is the error: " + error);
    }
  });
}

// spotify-this-song
function spotify() {
  let spot = new spotify({
    id: keys.spotifyKeys.client_ID,
    secret: keys.spotifyKeys.client_Secret
  });
  if (!query) {
    query = "The Sign"
  }
  let params = {
    type: 'track',
    query: query
  };
  spot.search(params, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    console.log(data);
  });
}

// movie-this
function imdb() {
  if (!query) {
    query = 'Mr. Nobody.'
  }
  var queryURL = "https://www.omdbapi.com/?t=" + query + "&y=&plot=short&apikey=40e9cece";
  request.get(queryURL, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      // console.log(JSON.parse(body))
      console.log("Movie Title: " + JSON.parse(body).Title);
      log("Movie Title: " + JSON.parse(body).Title);
      console.log("Year Released: " + JSON.parse(body).Year);
      log("Year Released: " + JSON.parse(body).Year);
      console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
      log("IMDB Rating: " + JSON.parse(body).imdbRating);
      console.log("Rotten Tomatoes Score: " + JSON.parse(body).Ratings[1].Value);
      log("Rotten Tomatoes Score: " + JSON.parse(body).Ratings[1].Value);
      console.log("Country: " + JSON.parse(body).Country);
      log("Country: " + JSON.parse(body).Country);
      console.log("Language: " + JSON.parse(body).Language);
      log("Language: " + JSON.parse(body).Language);
      console.log("Plot: " + JSON.parse(body).Plot);
      log("Plot: " + JSON.parse(body).Plot);
      console.log("Actors: " + JSON.parse(body).Actors);
      log("Actors: " + JSON.parse(body).Actors);
    } else {
      console.log("Movie details failed to load, this is the error: " + error);
      log("----ERROR----Movie details failed to load, this is the error: " + error + "----END ERROR----");
    }
  })
}

//do-what-it-says
function simon() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (!error) {
      //console.log(data)
      var arr = data.split(",");
      command = arr[0];
      query = arr[1].replace(/\n$/, "");
      // console.log(arr)
      // console.log(query)
      // console.log(command)
      main();
    } else {
      return console.log("Simon says that there was an error with this request, this is the error: " + error);
      log("Simon says that there was an error with this request, this is the error: " + error);
    }
  });
}

//create a file called log.txt and log all results and errors
function log(text) {
    fs.appendFile("log.txt", text + "\n", function(error) {
        if (error) {
            console.log("Failed attempt to log text. This is the error: " + error );
        }
    });
}
