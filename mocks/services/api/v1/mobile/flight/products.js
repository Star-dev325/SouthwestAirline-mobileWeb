const FlightShoppingSearchBuilder = require('test/builders/apiResponse/v1/mobile/flights/flightShoppingSearchBuilder');

module.exports = {
  path: '/api/v1/mobile/flights/products',
  method: 'GET',
  cache: false,
  template: (params, query) => {
    const currencyType = query['currency-type'];
    const departureDate = query['departure-date'];
    const returnDate = query['departure-date2'];
    const isRoundTrips = !!returnDate;

    return new FlightShoppingSearchBuilder(currencyType).withTrips(isRoundTrips, departureDate, returnDate).build();
  }
};
