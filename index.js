const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(express.static(__dirname));



app.listen(3000, function() {
  console.log('Listening on port 3000 now');
});
