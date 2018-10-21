const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const yelp = require('yelp-fusion');

const app = express();
app.use(bodyParser.json());
app.use(morgan('dev'));

// app.use(express.static(__dirname));

const apiKey = 'FtVSQA7amcj-me9rNqO1QgHdTk7Vz98JchW16RRcxuD1kZZmrkJTqjN6Y_2trKRiROx1O5g09WYBGgyD6h5VoLwfFi5le5oHdTYr5pYelRpxUDOODJdopp89SevLW3Yx';

const searchRequest = {
  open_now:true,
  location: 'Redwood City, CA',
  radius: 15000,
  limit: 50
};

const client = yelp.client(apiKey);

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
};

client.search(searchRequest).then(response => {
  let pick = getRandomInt(response.jsonBody.businesses.length)
  let firstResult = response.jsonBody.businesses[pick];
  let prettyJson = "Randomly picked ID: " + pick.toString() + "<br><br>" + JSON.stringify(firstResult, null, 4);
  return prettyJson;
}).catch(e => {
  console.log(e);
}).then(prettyJson => {
  app.get('/', function(req, res) {
    res.send(prettyJson);
  });
});

app.listen(3000, function() {
  console.log('Listening on port 3000 now');
});


