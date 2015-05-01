var moment = require('moment');
var _ = require('lodash');
var dataStore = require('./data');
var utils = require('./utils');



var api = function(req, res){
  
  var query = req.query;
  var duration = query.duration || 1;
  var metricId = req.params.metricId;
  var full = true;
  var momentObject;

  if (query.full === 'false') full = false; //the poor man's if won't work here

  if (!query.date) duration = 30; //if there's no specific day provided, we'll default to delivering a month 

  delete query.duration;
  delete query.full;

  console.log(req.query);

  try{

    //moment really doesn't like strings to set the date object
    _.each(query, function(param, key){
      query[key] = parseInt(param);
    });

    momentObject = moment().set(query);
    //if there's no date, we want the last day of the month
    console.log(momentObject.toString());
    if (!query.date) momentObject.endOf('month');
    console.log(momentObject.toString());

  } catch (err){
    res.status(400).send('Invalid query string.');
    return;
  }

  var start_date = utils.toJohnTime(momentObject);


  var metric = dataStore.getMetric(metricId, start_date, duration);

  if (!metric) metric = null; //a result: null will be more informative than an empty object coming back

  if (full){
    res.status(200).send({result: metric});
  } else {
    if (metric === undefined) res.status(200).send({result: null});
    else res.status(200).send({result: metric.value});
  }

};

module.exports = api;


