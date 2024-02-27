const domesticCheckInWithinOneHour = require('mocks/templates/reservation/V3L3J5/chapiDomesticCheckInWithinOneHour');

module.exports = {
  path: '/chapi/v1/mobile-air-operations/page/check-in/V3L3J5',
  method: 'GET',
  cache: false,
  status: (req, res) => {
    res.status(400).send(domesticCheckInWithinOneHour);
  }
};
