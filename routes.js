var router = require('express').Router();
var api = require('./api');

router.route('/api/:metricId').get(api);

module.exports = router;