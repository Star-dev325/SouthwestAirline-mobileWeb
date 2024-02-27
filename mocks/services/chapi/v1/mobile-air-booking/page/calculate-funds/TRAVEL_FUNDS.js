const rtfCalculateSuccess = require('mocks/templates/travelFunds/rtfCalculateSuccess');
const rtfCalculateSuccessRemainingBalance = require('mocks/templates/travelFunds/rtfCalculateSuccessRemainingBalance');

module.exports = {
  path: '/chapi/v1/mobile-air-booking/page/calculate-funds/TRAVEL_FUNDS',
  method: 'POST',
  cache: false,
  render: (req, res) => {
    const {
      body: { firstName, lastName }
    } = req;

    if (firstName === 'Apple' && lastName === 'Pay') {
      return res.json(rtfCalculateSuccessRemainingBalance);
    }

    return res.json(rtfCalculateSuccess);
  }
};
