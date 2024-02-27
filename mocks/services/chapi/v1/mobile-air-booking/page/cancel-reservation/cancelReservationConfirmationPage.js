const cancelReservationConfirmationPageCANMIX = require('mocks/templates/air-cancel/cancelReservationConfirmationPageCANMIX');
const cancelReservationConfirmationPageEMRCPT = require('mocks/templates/air-cancel/cancelReservationConfirmationPageEMRCPT');

module.exports = [
  {
    path: '/chapi/v1/mobile-air-booking/page/cancel-reservation/CANMIX',
    method: 'DELETE',
    cache: false,
    render: (req, res) => res.json(cancelReservationConfirmationPageCANMIX)
  },
  {
    path: '/chapi/v1/mobile-air-booking/page/cancel-reservation/EMRCPT',
    method: 'DELETE',
    cache: false,
    render: (req, res) => res.json(cancelReservationConfirmationPageEMRCPT)
  }
];
