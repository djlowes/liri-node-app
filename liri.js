var keys = require("./keys.js");
var fs = require("fs");
var twitter = require('twitter');
var spotify = require('node-spotify-api');


// console.log("--------------------------");
// console.log("Twitter Keys and Access Tokens");
// console.log(keys);
// console.log("--------------------------");

var command = process.argv[2];
var movieName = "";

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
      for (let i=0; i<tweets.length; i++) {
        console.log(tweets[i].user.screen_name + ": " + tweets[i].text);
      }
    }
    else {
      console.log("Tweets failed to load, this is ther error: " + error)
    }
  });
}

// spotify-this-song
let client = new spotify({
    id: keys.spotifyKeys.clientID,
    secret: keys.spotifyKeys.clientSecret
});

  spotify.search({ type: 'track', query: command }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }

  console.log(data);
  });
}
