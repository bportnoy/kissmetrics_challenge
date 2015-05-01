var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');

var app = express();

//load bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//logging so we have something nice to look at
app.use(logger('dev'));

//development port - not worrying about dev/production logic
app.set('port', 8000);


