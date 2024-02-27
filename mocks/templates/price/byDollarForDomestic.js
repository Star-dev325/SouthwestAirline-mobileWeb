const _ = require('lodash');
const byDollar = require('mocks/templates/price/byDollar');

module.exports = _.merge({}, byDollar, {
  flightPricingPage: {
    _meta: {
      internationalBooking: false
    }
  }
});
