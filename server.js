// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp", (req, res) => {
  const userDate = new Date();
  res.json({  unix: userDate.getTime(), utc: userDate.toUTCString() })

});

const isDate = userInput => {
  const regEx = /^\d{4}-\d{2}-\d{2}$/

  if(regEx.test(userInput) && new Date(userInput) !== "Invalid Date") {
  return true;
  }
}

const isTimestamp = userInput => !isNaN(userInput)

app.get("/api/timestamp/:date_string", function (req, res) {

  let userDate, unix, utc;
  const userInput = req.params.date_string
  
  if(isDate(userInput)) {
    userDate = new Date(userInput);
   
    unix = userDate.getTime()
    utc = userDate.toUTCString()
    }

  else if(isTimestamp(userInput)) {
    userDate = new Date(userInput)
  
    unix = userInput;
    utc = new Date(unix * 1000).toUTCString();

  }  
  
  res.json({  unix , utc  })
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 4000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});