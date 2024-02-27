const CarVendorsMobile = require('test/builders/apiResponse/v1/content-delivery/query/carVendorsMobile');

module.exports = {
  path: '/v1/content-delivery/query/car-vendors',
  method: 'GET',
  cache: false,
  template: () => new CarVendorsMobile().build()
};
