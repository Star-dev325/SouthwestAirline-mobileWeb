const reaccomRoundTrip = require('mocks/templates/air-change/reaccomShoppingPageResponse');

module.exports = {
  path: '/chapi/v1/mobile-air-booking/page/flights/reaccom/shopping',
  method: 'POST',
  cache: false,
  status: (request, response) => response.status(200).send(reaccomRoundTrip)
};
