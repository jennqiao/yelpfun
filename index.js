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
	  return response.jsonBody.businesses;
	}).catch(e => {
	  console.log(e);
	}).then(results => {
  	let pick = getRandomInt(results.length);
	  let firstResult = results[pick];
	  let pick_id = firstResult.id;
	  let name = firstResult.name;

	  client.business(firstResult.alias).then(response => {
		  return response.jsonBody;
		}).catch(e => {
		  console.log(e);
		}).then(result => {
			console.log(result)
			let photo = result.photos[0];
			let address = result.location.display_address;
			let hours = JSON.stringify(result.hours, null, 4);

    	res.render('index', {pick: pick, name: name, photo: photo, address: address, hours: hours, error: null});
		});
	});
});

app.listen(3000, function() {
  console.log('Listening on port 3000 now');
});
