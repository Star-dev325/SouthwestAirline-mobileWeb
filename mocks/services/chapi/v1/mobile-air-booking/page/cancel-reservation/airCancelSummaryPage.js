const viewCancelReservationPageCANMIX = require('mocks/templates/air-cancel/viewCancelReservationPageCANMIX');
const viewCancelReservationPageEMRCPT = require('mocks/templates/air-cancel/viewCancelReservationPageEMRCPT');

module.exports = [
  {
    path: '/chapi/v1/mobile-air-booking/page/cancel-reservation/CANMIX',
    method: 'GET',
    cache: false,
    status: (request, response) => response.status(200).send(viewCancelReservationPageCANMIX)
  },
  {
    path: '/chapi/v1/mobile-air-booking/page/cancel-reservation/EMRCPT',
    method: 'GET',
    cache: false,
    status: (request, response) => response.status(200).send(viewCancelReservationPageEMRCPT)
  }
];
