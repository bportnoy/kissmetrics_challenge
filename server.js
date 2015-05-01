var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');

var dataStore = require('./data');
var router = require('./routes');

var app = express();

//load bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//logging so we have something nice to look at
app.use(logger('dev'));

//development port - not worrying about dev/production logic
app.set('port', 8000);

app.use(router);

//read the data, then begin listening
dataStore.readCSV().then(function(success){
  if (success){
    app.listen(app.get('port'), function() {
      console.log('✔ Express server listening on port ' + app.get('port'));
    });
  } else {
    console.log('Error parsing CSV, the API will now exit.');
  }
});

