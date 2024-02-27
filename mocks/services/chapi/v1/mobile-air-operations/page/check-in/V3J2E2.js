const internationalCheckInWithin90Mins = require('mocks/templates/reservation/V3J2E2/chapiInternationalCheckInWithin90Mins');

module.exports = {
  path: '/chapi/v1/mobile-air-operations/page/check-in/V3J2E2',
  method: 'GET',
  cache: false,
  status: (req, res) => {
    res.status(400).send(internationalCheckInWithin90Mins);
  }
};
