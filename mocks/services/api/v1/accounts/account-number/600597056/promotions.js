const UpcomingTripsPromotionsBuilder = require('test/builders/apiResponse/upcomingTripsPromotionsBuilder');

module.exports = {
  path: '/api/v1/accounts/account-number/600597056/promotions',
  method: 'GET',
  cache: false,
  template: () => new UpcomingTripsPromotionsBuilder().build()
};
