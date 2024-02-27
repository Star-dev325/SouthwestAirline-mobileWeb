const purchase = require('mocks/templates/car-reservation/08172185US0/purchase');

module.exports = {
  path: '/chapi/v1/mobile-misc/feature/cars/reservations',
  method: 'POST',
  cache: false,
  template: purchase
};
