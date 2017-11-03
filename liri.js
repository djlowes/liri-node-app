var keys = require("./keys.js");
var fs = require("fs");

console.log("--------------------------");
console.log("Twitter Keys and Access Tokens");
console.log(keys);
console.log("--------------------------");

var command = process.argv[2];

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
