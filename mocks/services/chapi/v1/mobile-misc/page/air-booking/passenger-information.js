const PassengerInformationBuilder = require('test/builders/apiResponse/v1/mobile-misc/page/air-booking/passengerInformationBuilder');

module.exports = {
  path: '/chapi/v1/mobile-misc/page/air-booking/passenger-information',
  method: 'GET',
  cache: false,
  template: () => new PassengerInformationBuilder().withContactMethodAsTEXT('1', '123456789').build()
};
