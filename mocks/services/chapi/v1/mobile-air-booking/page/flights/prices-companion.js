const CompanionFlightPricingPageBuilder = require('test/builders/apiResponse/v1/mobile-misc/page/companion/companionFlightPricingPageBuilder');

module.exports = {
  path: '/chapi/v1/mobile-air-booking/page/flights/prices/K9ZTCX/companion',
  method: 'POST',
  cache: false,
  render: (req, res) => res.json(new CompanionFlightPricingPageBuilder().build())
};
