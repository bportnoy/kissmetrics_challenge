var Promise = require('bluebird');
var parseCSV = Promise.promisify(require('csv-parse'));
var fs = Promise.promisifyAll(require('fs'));
var _ = require('lodash');

var data = {};

var dataStore = {

  readCSV: function() {
    return new Promise(function(resolve, reject){
      return fs.readFileAsync(__dirname + '/metrics_over_time_view.csv')
      .then(function(csvFile){
        return parseCSV(csvFile, {columns: 
          ['metric_id','start_date','time_range_length','value','last_calculated_at','end_date']})
        .then(function(parsedCSV){
          //let's at least get constant time lookup by metric_id and limit how much iteration we do later
          _.each(parsedCSV, function(row){
            if (!data.hasOwnProperty(row.metric_id)){ //instantiate a new array for each metric key
              data[row.metric_id] = [];
            }
            data[row.metric_id].push(row);
          });//each
          resolve(true);// we're ready!
        });//parse
      });//readfile
    });//new promise
  },

  getMetric: function(metricId, start_date, time_range_length) {
    var metricArray = data[metricId];
    metricArray = _.filter(metricArray, {start_date: start_date.toString(),
                                            time_range_length: time_range_length.toString()});
    return metricArray.length ? metricArray[0] : undefined;
  }


};

module.exports = dataStore;