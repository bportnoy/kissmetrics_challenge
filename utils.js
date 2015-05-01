var moment = require('moment');
require('twix');

var johnEpoch = moment().year(2009).startOf('year');

var utils = {

  //takes a moment.js object an converts it to JohnTime. Returns undefined if the moment is before the JohnTime epoch.
  toJohnTime: function(momentObject) {
    if (momentObject.isBefore(johnEpoch)) return undefined;
    return johnEpoch.twix(momentObject).count('days') - 1; //correct for 0 index JohnTime
  },

  //takes a JohnTime number and converts it to a moment.js object
  fromJohnTime: function(days) {
    var jeClone = johnEpoch.clone();
    jeClone.add(days, 'days');
    return jeClone;
  }

};


module.exports = utils;