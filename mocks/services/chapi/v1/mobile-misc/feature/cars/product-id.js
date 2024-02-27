const carChapiProductId = require('mocks/templates/car-reservation/carChapiProductId');

module.exports = {
  path: '/chapi/v1/mobile-misc/feature/cars/product-id/:productId',
  method: 'GET',
  cache: false,
  template: carChapiProductId
};
