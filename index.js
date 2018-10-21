const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const yelp = require('yelp-fusion');
const ejs = require('ejs');

const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs')

app.use(bodyParser.json());
app.use(morgan('dev'));


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

app.get('/', function (req, res) {

	client.search(searchRequest).then(response => {
		console.log(response.jsonBody)
	  return response.jsonBody.businesses;
	}).catch(e => {
	  console.log(e);
	}).then(results => {
  	let pick = getRandomInt(results.length)
	  let firstResult = results[pick];

	  let name = firstResult.name;
	  console.log(firstResult);
	  let photo = null;

	  //let prettyJson = JSON.stringify(firstResult, null, 4);
    res.render('index', {pick: pick, name: name, photo: photo, error: null});
	});
});

app.listen(3000, function() {
  console.log('Listening on port 3000 now');
});
