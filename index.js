//Required imports from different javascript libraries
require('dotenv').config();
var window = require('window');
var express = require('express');
var os = require("os");
var app = express();
var ipAddr = require('ip');
var unirest = require('unirest');
const currIP = ipAddr.address();

//Create an empty object to store required data
var resObj = {};

//Use cors to allow required frontend functions
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));

//Gives the backend access to the frontend files
app.use(express.static('public'));

//Loads the html file
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

//Recieves the api request and displays the user's ip information
app.get("/api/whoami", (req, res) => {
  resObj["ipaddress"] = currIP;
  resObj["language"] = req.headers["accept-language"];
  resObj["software"] = req.headers["user-agent"];
  res.json(resObj);
});

//Receives the api request and displays the user's location information
app.get("/api/whereami", (req, res) => {
  //Lines 57 tp 67 are from https://rapidapi.com/blog/geolocation-backend-node-express/
  var location = unirest("GET",
    "https://ip-geolocation-ipwhois-io.p.rapidapi.com/json/"
  );
  location.headers({
    "x-rapidapi-host": "ip-geolocation-ipwhois-io.p.rapidapi.com",
    "x-rapidapi-key": "b4fec571d9msh5c370d5e9ec9cf7p1c90f2jsnf7bcdb3b4712"
  });
  location.end(function(result) {
    if (res.error) throw new Error(result.error);
    console.log(result.body);
    res.send(result.body);
  })
});


//Deploys the website to a local server
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
