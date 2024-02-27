const UpcomingTripsBuilder = require('test/builders/apiResponse/v1/accounts/account-number/600597056/upcomingTripsBuilder');

module.exports = {
  path: '/api/v1/accounts/account-number/600597056/upcoming-trips',
  method: 'GET',
  cache: false,
  template: () => new UpcomingTripsBuilder().build()
};
