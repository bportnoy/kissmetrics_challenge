##Kissmetrics Challenge API Instructions

To begin, clone this repo to your local drive. Then:

* Run `npm install`
* Then, `npm start` to start the server, which will listen on port 8000.

###Accessing the API

####Definition
`GET`
`http://localhost:8000/api/:metricId`
Where :metricId is the numerical identifier of the metric you would like to access.

#####Query Options
*`year` - The year component of the start date for which you would like to request a metric. (REQUIRED)
*`month` - The month component of the start date for which you would like to request a metric, 0-11 (January = 0, December = 11) (REQUIRED)
*`date` - The day component of the start date for which you would like to request a metric, 1-31. If no `date` is provided, defaults to 1 (the first day of the requested month).
*`duration` - The length of time in days, beginning on the specific start date, for which you would like to request a metric. If a `date` is provided, defaults to 1. If no `date` is provided, defaults to 30.
*`full` - Boolean, defaults to true. If true, returns the full record from our stores. If false, returns the value of the metric only.

#####Response
Responds with a JSON object with the requested data at the `result` key. If no metric is found that matches your request, the response will be `{result: null}`.

#####Example Request
`curl -X GET http://localhost:8000/api/119?month=6&year=2014&date=20&full=false`
#####Example Response
`{
    "result": "1.98466e+07"
}`
#####Example Request
`curl -X GET http://localhost:8000/api/113?month=2&year=2015`
#####Example Response
`{
"result": {
  "metric_id": "113",
  "start_date": "2281",
  "time_range_length": "30",
  "value": "79508",
  "last_calculated_at": "1430292783",
  "end_date": "2308"
  }
}`
#####Example Request
`curl -X GET http://localhost:8000/api/113?month=2&year=2015&date=1&duration=30`
#####Example Response
`{
"result": null
}`