const rtfLookUpResponse = require('mocks/templates/travelFunds/rtfLookUpSuccess');

module.exports = {
  path: '/chapi/v1/mobile-air-booking/page/view-fund/TRAVEL_FUNDS',
  method: 'POST',
  cache: false,
  render: (req, res) => res.json(rtfLookUpResponse)
};
