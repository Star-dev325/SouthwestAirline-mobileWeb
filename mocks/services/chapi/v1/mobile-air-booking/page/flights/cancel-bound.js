const viewCancelBoundReservationPage = require('mocks/templates/air-cancel/viewCancelBoundReservationPage');
const viewCancelBoundConfirmationPage = require('mocks/templates/air-cancel/viewCancelBoundConfirmationPage');

module.exports = [
  {
    path: '/chapi/v1/mobile-air-booking/page/flights/cancel-bound/EMRCPT',
    method: 'GET',
    cache: false,
    status: (request, response) => response.status(200).send(viewCancelBoundReservationPage)
  },
  {
    path: '/chapi/v1/mobile-air-booking/page/flights/cancel-bound/EMRCPT',
    method: 'PUT',
    cache: false,
    status: (request, response) => response.status(200).send(viewCancelBoundConfirmationPage)
  }
];
