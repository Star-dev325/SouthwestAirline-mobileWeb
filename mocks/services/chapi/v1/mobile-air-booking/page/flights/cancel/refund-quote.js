const viewCancelBoundRefundPage = require('mocks/templates/air-cancel/viewCancelBoundRefundPage');

module.exports = {
  path: '/chapi/v1/mobile-air-booking/page/flights/cancel/refund-quote/EMRCPT',
  method: 'POST',
  cache: false,
  status: (request, response) => response.status(200).send(viewCancelBoundRefundPage)
};
