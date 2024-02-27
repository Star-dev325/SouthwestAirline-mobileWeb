const CarStationsMobile = require('test/builders/apiResponse/v1/content-delivery/query/carStationsMobile');

module.exports = {
  path: '/v1/content-delivery/query/car-stations',
  method: 'GET',
  cache: false,
  template: () => new CarStationsMobile().build()
};
