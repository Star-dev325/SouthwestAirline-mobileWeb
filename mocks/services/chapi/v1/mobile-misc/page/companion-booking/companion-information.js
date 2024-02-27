const CompanionInformationPageBuilder = require('test/builders/apiResponse/v1/mobile-misc/page/companion/companionInformationPageBuilder');

module.exports = {
  path: '/chapi/v1/mobile-misc/page/companion-booking/companion-information',
  method: 'GET',
  cache: false,
  render: (req, res) => res.json(new CompanionInformationPageBuilder().withSuffix('PHD').build())
};
