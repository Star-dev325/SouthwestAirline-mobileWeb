const reaccomRoundTrip = require('mocks/templates/air-change/reaccomConfimationPageResponse');

module.exports = {
  path: '/chapi/v1/mobile-air-booking/page/flights/reaccom/purchase',
  method: 'PUT',
  cache: false,
  status: (request, response) => response.status(200).send(reaccomRoundTrip)
};
