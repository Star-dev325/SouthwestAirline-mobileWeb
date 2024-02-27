const rtfCalculateSuccess = require('mocks/templates/travelFunds/rtfCalculateSuccess');
const airChangeApplyTravelFunds = require('mocks/templates/travelFunds/airChangeApplyTravelFunds');

module.exports = {
  path: '/chapi/v1/mobile-air-booking/page/change/calculate-funds/TRAVEL_FUNDS',
  method: 'POST',
  cache: false,
  render: (req, res) => {
    const {
      body: { firstName, lastName }
    } = req;

    if (firstName === 'Apple' && lastName === 'Pay') {
      return res.json(airChangeApplyTravelFunds);
    }

    return res.json(rtfCalculateSuccess);
  }
};
