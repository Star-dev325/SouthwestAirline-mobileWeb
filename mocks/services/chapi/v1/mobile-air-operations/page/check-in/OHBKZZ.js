const ReservationBuilder = require('test/builders/apiResponse/v1/mobile-air-operations/page/check-in/checkInReservationBuilder');

module.exports = {
  path: '/chapi/v1/mobile-air-operations/page/check-in/OHBKZZ',
  method: 'GET',
  cache: false,
  template: () => new ReservationBuilder().build()
};
